import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Property IDs that have at least one inventory line whose `configuration_label`
 * matches one of the given labels (e.g. filter chips: 2 BHK, 3 BHK).
 * Uses `property_inventory_dashboard_rows` (published projects + PLC lines).
 */
export async function getPropertyIdsWithAnyConfigurationLabels(
  supabase: Pick<SupabaseClient, "from">,
  labels: string[]
): Promise<{ ids: string[]; error: Error | null }> {
  if (labels.length === 0) {
    return { ids: [], error: null };
  }

  const { data, error } = await supabase
    .from("property_inventory_dashboard_rows")
    .select("property_id")
    .not("line_id", "is", null)
    .in("configuration_label", labels);

  if (error) {
    return { ids: [], error: new Error(error.message) };
  }

  const seen = new Set<string>();
  for (const row of data || []) {
    const id = (row as { property_id?: string }).property_id;
    if (id) seen.add(id);
  }
  return { ids: [...seen], error: null };
}
