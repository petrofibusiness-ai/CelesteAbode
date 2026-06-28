import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseV3ToProperty } from "@/lib/supabase-property-mapper";
import { fetchLocalitiesByLocationId } from "@/lib/fetch-localities";
import { getFeaturedStaticPropertiesForLocation } from "@/lib/featured-static-properties";
import type { Property } from "@/types/property";

const LISTING_SELECT =
  "id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, description, hero_image, hero_image_alt, featured, is_published, created_at, updated_at, images, amenities";

export type LocationListingPropertyTypeFilter = "all" | "apartments" | "residential" | "commercial";

export function propertyMatchesListingTypeFilter(
  property: Pick<Property, "propertyType">,
  filter: LocationListingPropertyTypeFilter
): boolean {
  if (filter === "all") return true;
  if (filter === "apartments") return property.propertyType === "Apartment/Flats";
  if (filter === "residential") {
    return property.propertyType === "Apartment/Flats" || property.propertyType === "Villas";
  }
  if (filter === "commercial") return property.propertyType === "Commercial";
  return true;
}

export async function fetchLocationListingData(
  locationSlug: string,
  options: { propertyTypeFilter?: LocationListingPropertyTypeFilter; limit?: number } = {}
) {
  const { propertyTypeFilter = "all", limit = 6 } = options;
  const supabase = getSupabaseAdminClient();

  const { data: locationData } = await supabase
    .from("locations_v2")
    .select("id, slug")
    .eq("slug", locationSlug)
    .eq("is_published", true)
    .single();

  if (!locationData?.id) {
    return {
      location: null as { id: string; slug: string } | null,
      localities: [] as Array<{ value: string; label: string }>,
      properties: [] as Property[],
      totalCount: 0,
    };
  }

  const localities = await fetchLocalitiesByLocationId(locationData.id);

  let propertiesQuery = supabase
    .from("properties_v3")
    .select(LISTING_SELECT)
    .eq("location_id", locationData.id)
    .eq("is_published", true)
    .order("featured", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  let countQuery = supabase
    .from("properties_v3")
    .select("id", { count: "exact", head: true })
    .eq("location_id", locationData.id)
    .eq("is_published", true);

  if (propertyTypeFilter === "apartments") {
    propertiesQuery = propertiesQuery.eq("property_type", "Apartment/Flats");
    countQuery = countQuery.eq("property_type", "Apartment/Flats");
  } else if (propertyTypeFilter === "residential") {
    propertiesQuery = propertiesQuery.in("property_type", ["Apartment/Flats", "Villas"]);
    countQuery = countQuery.in("property_type", ["Apartment/Flats", "Villas"]);
  } else if (propertyTypeFilter === "commercial") {
    propertiesQuery = propertiesQuery.eq("property_type", "Commercial");
    countQuery = countQuery.eq("property_type", "Commercial");
  }

  const [{ data: propertiesData, error }, { count: totalPropertiesCount }] = await Promise.all([
    propertiesQuery,
    countQuery,
  ]);

  if (error) {
    console.error(`Error fetching properties for location "${locationSlug}":`, error);
  }

  const dbProperties: Property[] = (propertiesData || []).map((prop) => {
    const property = supabaseV3ToProperty(prop);
    return {
      ...property,
      locationSlug: locationData.slug,
    };
  });

  const featuredStatic = getFeaturedStaticPropertiesForLocation(locationSlug).filter((p) =>
    propertyMatchesListingTypeFilter(p, propertyTypeFilter)
  );

  const properties = [...featuredStatic, ...dbProperties].slice(0, limit);
  const totalCount = (totalPropertiesCount ?? dbProperties.length) + featuredStatic.length;

  return {
    location: locationData,
    localities,
    properties,
    totalCount,
  };
}
