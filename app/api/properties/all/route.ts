import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { addLocationSlugToProperties } from "@/lib/property-location-helper";
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
    "5bhk": "5 BHK",
  };
  return mapping[filterValue] || null;
}

// GET - Get all published properties with optional filters (no location required)
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
    const propertyTypeFilter = searchParams.get("propertyType");
    const projectStatusFilter = searchParams.get("projectStatus");
    const configurationFilters = searchParams.getAll("configuration");
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10))); // Default 50, max 100
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10));

    // Build query - start with base filters
    let query = supabase
      .from("properties_v2")
      .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, is_published, created_at, updated_at")
      .eq("is_published", true); // Only published properties

    // Apply property type filter
    if (propertyTypeFilter) {
      const mappedType = mapPropertyTypeFilter(propertyTypeFilter);
      if (mappedType && isValidPropertyType(mappedType)) {
        query = query.eq("property_type", mappedType);
      }
    }

    // Apply project status filter
    if (projectStatusFilter) {
      const mappedStatus = mapProjectStatusFilter(projectStatusFilter);
      if (mappedStatus && isValidProjectStatus(mappedStatus)) {
        query = query.eq("project_status", mappedStatus);
      }
    }

    // Apply configuration filters (multiple)
    if (configurationFilters.length > 0) {
      const mappedConfigs = configurationFilters
        .map(mapConfigurationFilter)
        .filter((config): config is string => config !== null && isValidConfiguration(config));
      
      if (mappedConfigs.length > 0) {
        // Use .in() for multiple configuration values
        query = query.in("configuration", mappedConfigs);
      }
    }

    // Order and paginate
    // Fetch limit + 1 to check if there are more properties without a separate count query
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit); // Fetch limit + 1

    // Execute query with timeout
    const queryPromise = query;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
    );

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }

    // Check if there are more properties (if we got limit + 1, there are more)
    const hasMore = (data || []).length > limit;
    const propertiesToReturn = (data || []).slice(0, limit);

    // Convert snake_case to camelCase
    const mappedProperties = propertiesToReturn.map((prop: any) => supabaseToProperty(prop as any));

    // Add locationSlug to all properties
    const propertiesWithLocation = await addLocationSlugToProperties(mappedProperties, supabase);

    return NextResponse.json(
      { 
        properties: propertiesWithLocation,
        total: propertiesWithLocation.length,
        hasMore,
        limit,
        offset
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/properties/all:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

