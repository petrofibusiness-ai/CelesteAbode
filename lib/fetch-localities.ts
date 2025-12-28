import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { Locality } from "@/types/location";

/**
 * Fetch localities for a given location_id from the localities table
 * Returns array of {value: slug, label: name} format
 */
export async function fetchLocalitiesByLocationId(locationId: string): Promise<Locality[]> {
  const supabase = getSupabaseAdminClient();
  
  const { data, error } = await supabase
    .from("localities")
    .select("id, slug, name")
    .eq("location_id", locationId)
    .eq("is_published", true)
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error fetching localities:", error);
    return [];
  }

  return data.map((locality) => ({
    value: locality.slug,
    label: locality.name,
  }));
}

/**
 * Fetch localities for a given location slug
 * First fetches the location to get its ID, then fetches localities
 */
export async function fetchLocalitiesByLocationSlug(locationSlug: string): Promise<Locality[]> {
  const supabase = getSupabaseAdminClient();
  
  // First, get the location ID
  const { data: locationData } = await supabase
    .from("locations_v2")
    .select("id")
    .eq("slug", locationSlug)
    .eq("is_published", true)
    .single();

  if (!locationData) {
    return [];
  }

  return fetchLocalitiesByLocationId(locationData.id);
}

