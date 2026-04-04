import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { buildPropertyListingHighlights } from "@/lib/property-listing-highlights";
import { normalizeAmenities } from "@/lib/amenity-normalize";
import type { PropertyListingItem } from "@/types/property-listing";
import { isUuid } from "@/lib/uuid";
import { sanitizeProjectNameSearch } from "@/lib/property-listing-search";

const QUERY_TIMEOUT = 10000;

/** Only columns needed for cards + filters; no SELECT * */
const LISTING_SELECT =
  "id, slug, project_name, location, location_id, locality_id, property_type, hero_image, hero_image_alt, price_min, price_max, price_unit, sizes, amenities, created_at";

interface ListingRow {
  id: string;
  slug: string;
  project_name: string;
  location: string;
  location_id: string | null;
  locality_id: string | null;
  property_type: string | null;
  hero_image: string;
  hero_image_alt: string | null;
  price_min: string | number | null;
  price_max: string | number | null;
  price_unit: string | null;
  sizes: string;
  amenities: string[] | null;
}

function rowToItem(row: ListingRow, locationSlug: string): PropertyListingItem {
  const amenities = normalizeAmenities(row.amenities);
  return {
    id: row.id,
    slug: row.slug,
    projectName: row.project_name,
    locationLabel: row.location,
    locationId: row.location_id,
    localityId: row.locality_id,
    propertyType: row.property_type,
    heroImage: row.hero_image,
    heroImageAlt: row.hero_image_alt ?? undefined,
    priceMin: row.price_min != null ? Number(row.price_min) : null,
    priceMax: row.price_max != null ? Number(row.price_max) : null,
    priceUnit: row.price_unit ?? undefined,
    sizes: row.sizes ?? "",
    amenities,
    highlights: buildPropertyListingHighlights({
      amenities: row.amenities,
      sizes: undefined,
      propertyType: row.property_type ?? undefined,
    }),
    locationSlug,
  };
}

/** Limit ILIKE metacharacters in free-text size search. */
function sanitizeSizesSearch(raw: string): string {
  return raw.trim().replace(/[%_\\]/g, " ").replace(/\s+/g, " ").slice(0, 120);
}

const PRICE_FILTER_FULL_MIN = 0;
const PRICE_FILTER_FULL_MAX = 200_000_000;

function parsePriceBound(v: string | null): number | undefined {
  if (v == null || v === "") return undefined;
  const n = Math.round(Number(v));
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.min(n, 9_999_999_999_999);
}

function isFullPriceRange(min: number, max: number): boolean {
  return min <= PRICE_FILTER_FULL_MIN && max >= PRICE_FILTER_FULL_MAX;
}

async function locationSlugMapForRows(
  supabase: ReturnType<typeof getSupabaseAdminClient>,
  rows: ListingRow[]
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

    let locationId = searchParams.get("locationId");
    const localityId = searchParams.get("localityId");
    const qRaw = searchParams.get("q") ?? searchParams.get("search") ?? "";
    const q = sanitizeProjectNameSearch(qRaw);

    if (locationId && !isUuid(locationId)) {
      return NextResponse.json({ error: "Invalid locationId" }, { status: 400 });
    }
    if (localityId && !isUuid(localityId)) {
      return NextResponse.json({ error: "Invalid localityId" }, { status: 400 });
    }

    if (localityId && !locationId) {
      const { data: locRow, error: locErr } = await supabase
        .from("localities")
        .select("location_id")
        .eq("id", localityId)
        .eq("is_published", true)
        .maybeSingle();

      if (locErr || !locRow?.location_id) {
        return NextResponse.json({ error: "Locality not found" }, { status: 404 });
      }
      locationId = locRow.location_id;
    }

    if (locationId && localityId) {
      const { data: verify } = await supabase
        .from("localities")
        .select("id")
        .eq("id", localityId)
        .eq("location_id", locationId)
        .eq("is_published", true)
        .maybeSingle();

      if (!verify) {
        return NextResponse.json(
          { error: "Locality does not belong to the selected location" },
          { status: 400 }
        );
      }
    }

    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));

    let query = supabase
      .from("properties_v2")
      .select(LISTING_SELECT)
      .eq("is_published", true);

    let countQuery = supabase
      .from("properties_v2")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true);

    if (locationId) {
      query = query.eq("location_id", locationId);
      countQuery = countQuery.eq("location_id", locationId);
    }
    if (localityId) {
      query = query.eq("locality_id", localityId);
      countQuery = countQuery.eq("locality_id", localityId);
    }

    if (q) {
      const pattern = `%${q}%`;
      query = query.ilike("project_name", pattern);
      countQuery = countQuery.ilike("project_name", pattern);
    }

    const fMin = parsePriceBound(searchParams.get("priceMin"));
    const fMax = parsePriceBound(searchParams.get("priceMax"));
    const priceMinEff = fMin ?? PRICE_FILTER_FULL_MIN;
    const priceMaxEff = fMax ?? PRICE_FILTER_FULL_MAX;
    if (!isFullPriceRange(priceMinEff, priceMaxEff)) {
      const lo = Math.min(priceMinEff, priceMaxEff);
      const hi = Math.max(priceMinEff, priceMaxEff);
      const orMin = `price_min.is.null,price_min.lte.${hi}`;
      const orMax = `price_max.is.null,price_max.gte.${lo}`;
      const orHasPrice = "price_min.not.is.null,price_max.not.is.null";
      query = query.or(orMin).or(orMax).or(orHasPrice);
      countQuery = countQuery.or(orMin).or(orMax).or(orHasPrice);
    }

    const sizesQ = sanitizeSizesSearch(searchParams.get("sizesQ") ?? "");
    if (sizesQ.length > 0) {
      const pattern = `%${sizesQ}%`;
      query = query.ilike("sizes", pattern);
      countQuery = countQuery.ilike("sizes", pattern);
    }

    const propertyType = searchParams.get("propertyType")?.trim().slice(0, 120) ?? "";
    if (propertyType) {
      query = query.eq("property_type", propertyType);
      countQuery = countQuery.eq("property_type", propertyType);
    }

    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

    const mkTimeout = () =>
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
      );

    const [{ data, error }, { count: countResult, error: countError }] = await Promise.all([
      Promise.race([query, mkTimeout()]),
      Promise.race([countQuery, mkTimeout()]),
    ]);

    if (error) {
      console.error("property-listings query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }
    if (countError) {
      console.error("property-listings count error:", countError);
    }

    const rows = (data || []) as ListingRow[];
    const slugByLocationId = await locationSlugMapForRows(supabase, rows);

    const items: PropertyListingItem[] = rows.map((row) =>
      rowToItem(row, (row.location_id && slugByLocationId.get(row.location_id)) || "")
    );

    const totalCount =
      typeof countResult === "number" && countResult >= 0 ? countResult : items.length;
    const hasMore = offset + items.length < totalCount;

    return NextResponse.json(
      {
        items,
        totalCount,
        hasMore,
        limit,
        offset,
        resolvedLocationId: locationId,
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
