import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import type { PropertyInventoryRow } from "@/types/property-listing";

const QUERY_TIMEOUT = 10000;
/** Max lines fetched before grouping by property (safety cap). */
const FETCH_LINES_CAP = 15_000;
const DEFAULT_PER_PAGE = 10;

/** Row shape from view `property_inventory_dashboard_rows` (snake_case). */
interface DashboardViewRow {
  line_id: string;
  property_id: string;
  size_sqft: string | null;
  configuration_label: string | null;
  price_cr: string | null;
  sort_order: number | null;
  slug: string;
  project_name: string;
  location_label: string;
  location_id: string | null;
  locality_id: string | null;
  hero_image: string;
  hero_image_alt: string | null;
  possession_date: string | null;
  inventory_towers: string | null;
  property_created_at: string;
}

function rowToInventoryItem(
  row: DashboardViewRow,
  locationSlug: string,
  propertySerial: number
): PropertyInventoryRow {
  return {
    propertySerial,
    id: row.line_id,
    propertyId: row.property_id,
    slug: row.slug,
    projectName: row.project_name,
    locationLabel: row.location_label,
    locationId: row.location_id,
    localityId: row.locality_id,
    heroImage: row.hero_image,
    heroImageAlt: row.hero_image_alt ?? undefined,
    inventoryTowers: row.inventory_towers ?? "",
    possessionDate: row.possession_date ?? "",
    configuration: row.configuration_label ?? "",
    sizeSqft: row.size_sqft ?? "",
    priceCr: row.price_cr ?? "",
    sortOrder: row.sort_order ?? 0,
    locationSlug,
  };
}

/** Preserve API row order: first row of each property defines property sequence. */
function groupRowsByPropertyInOrder(rows: DashboardViewRow[]): DashboardViewRow[][] {
  const order: string[] = [];
  const map = new Map<string, DashboardViewRow[]>();
  for (const r of rows) {
    let bucket = map.get(r.property_id);
    if (!bucket) {
      bucket = [];
      map.set(r.property_id, bucket);
      order.push(r.property_id);
    }
    bucket.push(r);
  }
  return order.map((id) => map.get(id)!);
}

async function locationSlugMapForRows(
  supabase: ReturnType<typeof getSupabaseAdminClient>,
  rows: DashboardViewRow[]
): Promise<Map<string, string>> {
  const ids = [...new Set(rows.map((r) => r.location_id).filter((id): id is string => Boolean(id)))];
  const map = new Map<string, string>();
  if (ids.length === 0) return map;
  const { data } = await supabase.from("locations_v2").select("id, slug").in("id", ids);
  (data || []).forEach((loc: { id: string; slug: string }) => map.set(loc.id, loc.slug));
  return map;
}

export async function GET(request: NextRequest) {
  try {
    const rateLimitId = getRateLimitIdentifier(request);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.error },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
          },
        }
      );
    }

    const supabase = getSupabaseAdminClient();
    const searchParams = request.nextUrl.searchParams;
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("perPage") || String(DEFAULT_PER_PAGE), 10)));
    const requestedPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const ordered = supabase
      .from("property_inventory_dashboard_rows")
      .select("*")
      .order("property_created_at", { ascending: false })
      .order("property_id", { ascending: true })
      .order("sort_order", { ascending: true })
      .order("line_id", { ascending: true })
      .limit(FETCH_LINES_CAP);

    const mkTimeout = () =>
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
      );

    const { data, error } = await Promise.race([ordered, mkTimeout()]);

    if (error) {
      console.error("property-listings query error:", error);
      const hint =
        /property_inventory_dashboard_rows|property_listing_configurations/i.test(error.message || "")
          ? " Run sql/property_listing_configurations.sql in Supabase if this is the first deploy."
          : "";
      return NextResponse.json(
        { error: "Failed to fetch inventory rows", details: error.message + hint },
        { status: 500 }
      );
    }

    const rows = (data || []) as DashboardViewRow[];
    const groups = groupRowsByPropertyInOrder(rows);
    const totalProperties = groups.length;
    const totalPages = Math.max(1, Math.ceil(totalProperties / perPage));
    const page = Math.min(requestedPage, totalPages);
    const start = (page - 1) * perPage;
    const pageGroups = groups.slice(start, start + perPage);

    const pageRowsFlat = pageGroups.flat();
    const slugByLocationId = await locationSlugMapForRows(supabase, pageRowsFlat);

    const items: PropertyInventoryRow[] = [];
    let serial = start + 1;
    for (const group of pageGroups) {
      const propertySerial = serial;
      serial += 1;
      for (const row of group) {
        items.push(
          rowToInventoryItem(
            row,
            (row.location_id && slugByLocationId.get(row.location_id)) || "",
            propertySerial
          )
        );
      }
    }

    return NextResponse.json(
      {
        items,
        pagination: {
          page,
          perPage,
          totalProperties,
          totalPages,
        },
        editModeAvailable: Boolean(process.env.PROPERTY_LISTINGS_EDIT_SECRET?.trim()),
      },
      {
        headers: {
          "Cache-Control": "private, no-store, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (e) {
    console.error("GET /api/property-listings:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
