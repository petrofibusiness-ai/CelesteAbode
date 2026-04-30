import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseV3ToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { addLocationSlugToProperties } from "@/lib/property-location-helper";

// Query timeout: 10 seconds
const QUERY_TIMEOUT = 10000;

// Valid location categories
const VALID_CATEGORIES = ["noida", "greater-noida", "yamuna-expressway", "ghaziabad"];

// GET - Get properties by location category (public endpoint, only returns published properties)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
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

    // Get Supabase admin client for public pages to bypass RLS and avoid JWT expiration issues
    const supabase = getSupabaseAdminClient();

    const { category } = await params;
    const normalizedCategory = category.toLowerCase().trim();

    // Validate category
    if (!VALID_CATEGORIES.includes(normalizedCategory)) {
      return NextResponse.json(
        { error: "Invalid location category" },
        { status: 400 }
      );
    }

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '6', 10)));
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10));

    // First, get the location ID from locations_v2 by slug
    const { data: locationData } = await supabase
      .from("locations_v2")
      .select("id")
      .eq("slug", normalizedCategory)
      .eq("is_published", true)
      .single();

    if (!locationData) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Fetch properties from Supabase with pagination - optimized query (no count to speed up)
    // Fetch limit + 1 to check if there are more properties without a separate count query
    const queryPromise = supabase
      .from("properties_v3")
      .select(
        "id, slug, project_name, developer, location, location_id, locality_id, project_status, description, hero_image, hero_image_alt, is_published, created_at, updated_at"
      )
      .eq("location_id", locationData.id) // Filter by location_id instead of location_category
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit); // Fetch limit + 1 to check for more

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
    const properties = (data || []).slice(0, limit); // Return only the requested limit

    // Convert snake_case to camelCase
    const mappedProperties = properties.map((prop: any) => supabaseV3ToProperty(prop as any));

    // Add locationSlug to all properties (though they should all have the same location)
    const propertiesWithLocation = await addLocationSlugToProperties(mappedProperties, supabase);

    return NextResponse.json(
      { 
        properties: propertiesWithLocation, 
        category: normalizedCategory,
        limit,
        offset,
        hasMore
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'Cache-Control': 'public, s-maxage=10, max-age=10', // Cache for 10 seconds (reduced from 60s + 300s stale)
          'Cache-Tag': `api-properties-location,properties,location-${normalizedCategory}`,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching properties by location:", error);
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


