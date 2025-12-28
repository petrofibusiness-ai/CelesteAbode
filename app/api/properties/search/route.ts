import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
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
    const propertyTypeFilter = searchParams.get("propertyType");
    const projectStatusFilter = searchParams.get("projectStatus");
    const configurationFilters = searchParams.getAll("configuration");
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
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

    // Build query - start with base filters
    let query = supabase
      .from("properties")
      .select("id, slug, project_name, developer, location, location_category, property_type, project_status, configuration, hero_image, is_published, created_at, updated_at")
      .eq("location_category", locationCategory) // MANDATORY: Location filter
      .eq("is_published", true); // Only published properties

    // Apply property type filter if provided
    if (propertyTypeFilter && propertyTypeFilter !== "all") {
      const propertyTypeEnum = mapPropertyTypeFilter(propertyTypeFilter);
      if (propertyTypeEnum && isValidPropertyType(propertyTypeEnum)) {
        query = query.eq("property_type", propertyTypeEnum);
      } else {
        return NextResponse.json(
          { error: "Invalid property type" },
          { status: 400 }
        );
      }
    }

    // Apply project status filter if provided
    if (projectStatusFilter && projectStatusFilter !== "all") {
      const projectStatusEnum = mapProjectStatusFilter(projectStatusFilter);
      if (projectStatusEnum && isValidProjectStatus(projectStatusEnum)) {
        query = query.eq("project_status", projectStatusEnum);
      } else {
        return NextResponse.json(
          { error: "Invalid project status" },
          { status: 400 }
        );
      }
    }

    // Note: Configuration filtering will be done after fetching due to array overlap complexity

    // Order and paginate
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
    );

    const { data, error } = await Promise.race([query, timeoutPromise]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }

    // Filter by configuration if needed (array overlap - property must contain at least one selected config)
    let filteredData = data || [];
    if (configurationFilters.length > 0) {
      const validConfigurations = configurationFilters
        .map(mapConfigurationFilter)
        .filter((config): config is string => config !== null && isValidConfiguration(config));
      
      if (validConfigurations.length > 0) {
        filteredData = filteredData.filter((property: any) => {
          const propertyConfigs = property.configuration || [];
          // Check if property's configuration array contains any of the selected configurations
          return validConfigurations.some(config => propertyConfigs.includes(config));
        });
      }
    }

    // Convert snake_case to camelCase
    const mappedProperties = filteredData.map((prop: any) => supabaseToProperty(prop as any));

    return NextResponse.json(
      { 
        properties: mappedProperties,
        filters: {
          location: locationCategory,
          propertyType: propertyTypeFilter || "all",
          projectStatus: projectStatusFilter || "all",
          configuration: configurationFilters,
        },
        limit,
        offset,
        total: mappedProperties.length,
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

