// Helper function to add locationSlug to properties
import { Property } from "@/types/property";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Adds locationSlug to an array of properties by fetching location slugs from locations_v2
 * This is a batch operation that efficiently fetches all location slugs in one query
 * 
 * @param properties - Array of properties (with locationId)
 * @param supabase - Supabase client instance
 * @returns Array of properties with locationSlug added
 */
export async function addLocationSlugToProperties(
  properties: Property[],
  supabase: SupabaseClient
): Promise<Property[]> {
  if (!properties || properties.length === 0) {
    return properties;
  }

  // Get all unique location IDs
  const locationIds = [...new Set(
    properties
      .map(p => p.locationId)
      .filter((id): id is string => Boolean(id))
  )];

  if (locationIds.length === 0) {
    return properties;
  }

  // Fetch all location slugs in one query
  const { data: locationsData } = await supabase
    .from("locations_v2")
    .select("id, slug")
    .in("id", locationIds);

  // Create a map of location_id -> slug
  const locationSlugMap = new Map<string, string>();
  (locationsData || []).forEach((loc: any) => {
    locationSlugMap.set(loc.id, loc.slug);
  });

  // Add locationSlug to each property
  return properties.map((property) => {
    if (property.locationId && locationSlugMap.has(property.locationId)) {
      return {
        ...property,
        locationSlug: locationSlugMap.get(property.locationId)!,
      } as Property & { locationSlug: string };
    }
    return property;
  });
}

/**
 * Adds locationSlug to a single property by fetching location slug from locations_v2
 * 
 * @param property - Property object (with locationId)
 * @param supabase - Supabase client instance
 * @returns Property with locationSlug added
 */
export async function addLocationSlugToProperty(
  property: Property,
  supabase: SupabaseClient
): Promise<Property & { locationSlug?: string }> {
  if (!property.locationId) {
    return property;
  }

  const { data: locationData } = await supabase
    .from("locations_v2")
    .select("slug")
    .eq("id", property.locationId)
    .single();

  if (locationData?.slug) {
    return {
      ...property,
      locationSlug: locationData.slug,
    };
  }

  return property;
}

