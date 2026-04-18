import type { PropertyInventoryRow } from "@/types/property-listing";

/** Service-role Supabase client shape from `getSupabaseAdminClient` (no runtime import). */
type AdminSupabase = ReturnType<
  typeof import("@/lib/supabase-server").getSupabaseAdminClient
>;

export const FETCH_LINES_CAP = 15_000;
export const MAX_SEARCH_Q = 200;
export const DEFAULT_INVENTORY_PER_PAGE = 10;

/** Row shape from `property_inventory_dashboard_rows` (view or table). */
export interface DashboardViewRow {
  line_id: string | null;
  property_id: string;
  size_sqft: string | null;
  configuration_label: string | null;
  price_cr: string | null;
  sort_order: number | null;
  line_created_at?: string | null;
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

export function groupRowsByPropertyInOrder(rows: DashboardViewRow[]): DashboardViewRow[][] {
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

export function normalizeSearchQ(raw: string | null): string {
  if (!raw || typeof raw !== "string") return "";
  return raw.trim().slice(0, MAX_SEARCH_Q);
}

export function propertyGroupMatchesQuery(group: DashboardViewRow[], qLower: string): boolean {
  if (!qLower) return true;
  return group.some((row) => {
    const hay = [
      row.project_name,
      row.location_label,
      row.slug,
      row.configuration_label,
      row.size_sqft,
      row.price_cr,
      row.inventory_towers,
      row.possession_date,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(qLower);
  });
}

export type InventoryLineFilter = "all" | "with_lines" | "no_lines";

export function filterPropertyGroups(
  groups: DashboardViewRow[][],
  opts: {
    searchQLower: string;
    locationId: string | null;
    lineFilter: InventoryLineFilter;
  }
): DashboardViewRow[][] {
  let out = groups;
  const { searchQLower, locationId, lineFilter } = opts;

  if (searchQLower.length > 0) {
    out = out.filter((g) => propertyGroupMatchesQuery(g, searchQLower));
  }

  if (locationId) {
    out = out.filter((g) => (g[0]?.location_id || "") === locationId);
  }

  if (lineFilter === "with_lines") {
    out = out.filter((g) => g.some((r) => Boolean(r.line_id)));
  } else if (lineFilter === "no_lines") {
    out = out.filter((g) => g.every((r) => !r.line_id));
  }

  return out;
}

export function rowToInventoryItem(
  row: DashboardViewRow,
  locationSlug: string,
  propertySerial: number
): PropertyInventoryRow {
  return {
    propertySerial,
    ...(row.line_id ? { id: row.line_id } : {}),
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

export async function locationSlugMapForRows(
  supabase: AdminSupabase,
  rows: DashboardViewRow[]
): Promise<Map<string, string>> {
  const ids = [...new Set(rows.map((r) => r.location_id).filter((id): id is string => Boolean(id)))];
  const map = new Map<string, string>();
  if (ids.length === 0) return map;
  const { data } = await supabase.from("locations_v2").select("id, slug").in("id", ids);
  (data || []).forEach((loc: { id: string; slug: string }) => map.set(loc.id, loc.slug));
  return map;
}

export async function fetchInventoryDashboardRows(
  supabase: AdminSupabase
): Promise<{ rows: DashboardViewRow[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("property_inventory_dashboard_rows")
    .select("*")
    .order("property_created_at", { ascending: false })
    .order("property_id", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("line_id", { ascending: true })
    .limit(FETCH_LINES_CAP);

  if (error) {
    return { rows: [], error: new Error(error.message) };
  }
  return { rows: (data || []) as DashboardViewRow[], error: null };
}

export function buildPagedInventoryItems(
  pageGroups: DashboardViewRow[][],
  slugByLocationId: Map<string, string>,
  startSerial: number
): PropertyInventoryRow[] {
  const items: PropertyInventoryRow[] = [];
  let serial = startSerial;
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
  return items;
}
