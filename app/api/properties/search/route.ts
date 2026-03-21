import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { addLocationSlugToProperties } from "@/lib/property-location-helper";
import { slugToLocationCategory } from "@/lib/location-slug";
import { PROPERTY_TYPES, PROJECT_STATUSES, CONFIGURATIONS, isValidPropertyType, isValidProjectStatus, isValidConfiguration } from "@/lib/property-enums";

// Query timeout: 10 seconds
const QUERY_TIMEOUT = 10000;

/**
 * Map filter value to database enum value
 */
function mapPropertyTypeFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    "apartments": "Apartment/Flats",
    "villas": "Villas",
    "plots": "Plots/Lands",
    "commercial": "Commercial",
  };
  return mapping[filterValue] || null;
}

function mapProjectStatusFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    "new-launch": "New Launch",
    "under-construction": "Under Construction",
    "ready-to-move": "Ready to Move",
  };
  return mapping[filterValue] || null;
}

function mapConfigurationFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    "2bhk": "2 BHK",
    "2bhk-study": "2 BHK + Study",
    "3bhk": "3 BHK",
    "3bhk-study": "3 BHK + Study",
    "4bhk": "4 BHK",
    "5bhk": "5 BHK",
  };
  return mapping[filterValue] || null;
}

// GET - Search properties with filters (public endpoint, only returns published properties)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting for public endpoint
    const rateLimitId = getRateLimitIdentifier(request);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.error },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      );
    }

    // Get Supabase admin client
    const supabase = getSupabaseAdminClient();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const locationSlug = searchParams.get("location");
    const localityFilters = searchParams.getAll("locality"); // Support multiple locality filters
    const propertyTypeFilter = searchParams.get("propertyType");
    const projectStatusFilter = searchParams.get("projectStatus");
    // Don't process configuration filters if Commercial is selected
    const configurationFilters = propertyTypeFilter === "commercial" ? [] : searchParams.getAll("configuration");
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '6', 10)));
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10));

    // VALIDATION: Location is MANDATORY
    if (!locationSlug || locationSlug.trim() === "") {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 }
      );
    }

    // Convert location slug to enum value
    const locationCategory = slugToLocationCategory(locationSlug.toLowerCase().trim());
    if (!locationCategory) {
      return NextResponse.json(
        { error: "Invalid location category" },
        { status: 400 }
      );
    }

    // First, get the location ID from locations_v2 by slug
    const { data: locationData } = await supabase
      .from("locations_v2")
      .select("id")
      .eq("slug", locationSlug.toLowerCase().trim())
      .eq("is_published", true)
      .single();

    if (!locationData) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Build query - start with base filters
    // Filter order: location_id (mandatory) → locality_id (optional) → other filters
    let query = supabase
      .from("properties_v2")
    .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
      .eq("location_id", locationData.id) // MANDATORY: Location filter using location_id
      .eq("is_published", true); // Only published properties

    let countQuery = supabase
      .from("properties_v2")
      .select("id, configuration", { count: "exact" })
      .eq("location_id", locationData.id)
      .eq("is_published", true);

    // Apply locality filter if provided (optional, but must belong to the location)
    if (localityFilters.length > 0) {
      // Fetch locality IDs from localities table using slugs
      const { data: localitiesData } = await supabase
        .from("localities")
        .select("id")
        .eq("location_id", locationData.id) // Ensure localities belong to this location
        .in("slug", localityFilters.map(s => s.toLowerCase().trim()));

      if (localitiesData && localitiesData.length > 0) {
        const localityIds = localitiesData.map(loc => loc.id);
        query = query.in("locality_id", localityIds);
        countQuery = countQuery.in("locality_id", localityIds);
      } else {
        // If no valid localities found, return empty results
        return NextResponse.json(
          { 
            properties: [],
            filters: {
              location: locationSlug,
              locality: localityFilters,
              propertyType: propertyTypeFilter || "all",
              projectStatus: projectStatusFilter || "all",
              configuration: configurationFilters,
            },
            limit,
            offset,
            total: 0,
            totalCount: 0,
          },
          {
            headers: {
              'X-RateLimit-Remaining': rateLimit.remaining.toString(),
              'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
              'Cache-Control': 'public, s-maxage=10, max-age=10',
              'Cache-Tag': 'api-properties-search,properties',
            },
          }
        );
      }
    }

    // Apply property type filter if provided
    if (propertyTypeFilter && propertyTypeFilter !== "all") {
      if (propertyTypeFilter === "residential") {
        query = query.in("property_type", ["Apartment/Flats", "Villas"]);
        countQuery = countQuery.in("property_type", ["Apartment/Flats", "Villas"]);
      } else {
        const propertyTypeEnum = mapPropertyTypeFilter(propertyTypeFilter);
        if (propertyTypeEnum && isValidPropertyType(propertyTypeEnum)) {
          query = query.eq("property_type", propertyTypeEnum);
          countQuery = countQuery.eq("property_type", propertyTypeEnum);
        } else {
          return NextResponse.json(
            { error: "Invalid property type" },
            { status: 400 }
          );
        }
      }
    }

    // Apply project status filter if provided
    if (projectStatusFilter && projectStatusFilter !== "all") {
      const projectStatusEnum = mapProjectStatusFilter(projectStatusFilter);
      if (projectStatusEnum && isValidProjectStatus(projectStatusEnum)) {
        query = query.eq("project_status", projectStatusEnum);
        countQuery = countQuery.eq("project_status", projectStatusEnum);
      } else {
        return NextResponse.json(
          { error: "Invalid project status" },
          { status: 400 }
        );
      }
    }

    // Note: Configuration filtering will be done after fetching due to array overlap complexity

    // Order and paginate
    // Fetch limit + 1 to check if there are more properties without a separate count query
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit); // Fetch limit + 1

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
    );

    const [{ data, error }, { data: countData, error: countError }] = await Promise.all([
      Promise.race([query, timeoutPromise]),
      Promise.race([countQuery, timeoutPromise]),
    ]) as any;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }
    if (countError) {
      console.error("Supabase count query error:", countError);
    }

    // Filter by configuration if needed (array overlap - property must contain at least one selected config)
    let filteredData = data || [];
    if (configurationFilters.length > 0) {
      const validConfigurations = configurationFilters
        .map(mapConfigurationFilter)
        .filter((config): config is string => config !== null && isValidConfiguration(config));
      
      if (validConfigurations.length > 0) {
        filteredData = filteredData.filter((property: any) => {
          // Skip Commercial properties (NULL configuration) when filtering by configuration
          if (!property.configuration || property.configuration.length === 0) {
            return false;
          }
          const propertyConfigs = property.configuration;
          // Check if property's configuration array contains any of the selected configurations
          return validConfigurations.some(config => propertyConfigs.includes(config));
        });
      }
    }

    let totalCount = typeof countData?.length === "number" ? countData.length : 0;
    if (configurationFilters.length > 0) {
      const validConfigurations = configurationFilters
        .map(mapConfigurationFilter)
        .filter((config): config is string => config !== null && isValidConfiguration(config));

      if (validConfigurations.length > 0) {
        totalCount = (countData || []).filter((property: any) => {
          if (!property.configuration || property.configuration.length === 0) return false;
          return validConfigurations.some((config) => property.configuration.includes(config));
        }).length;
      }
    }

    // Check if there are more properties (if we got limit + 1, there are more)
    const hasMore = filteredData.length > limit;
    const propertiesToReturn = filteredData.slice(0, limit); // Return only the requested limit

    // Convert snake_case to camelCase
    const mappedProperties = propertiesToReturn.map((prop: any) => supabaseToProperty(prop as any));

    // Add locationSlug to all properties
    const propertiesWithLocation = await addLocationSlugToProperties(mappedProperties, supabase);

    return NextResponse.json(
      { 
        properties: propertiesWithLocation,
        filters: {
          location: locationSlug,
          locality: localityFilters,
          propertyType: propertyTypeFilter || "all",
          projectStatus: projectStatusFilter || "all",
          configuration: configurationFilters,
        },
        limit,
        offset,
        total: propertiesWithLocation.length,
        totalCount,
        hasMore
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error("Error searching properties:", error);
    if (error instanceof Error && error.message === "Query timeout") {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

