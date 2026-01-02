import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { addLocationSlugToProperties } from "@/lib/property-location-helper";

// Query timeout: 10 seconds
const QUERY_TIMEOUT = 10000;

// GET - Get all properties (public endpoint - shows all properties including unpublished)
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

    // Get Supabase admin client to bypass RLS and fetch all properties
    // Note: This allows showing all properties (published and unpublished) on the dashboard
    const supabase = getSupabaseAdminClient();

    // Fetch ALL properties - NO filter on is_published
    // This explicitly fetches both published and unpublished properties
    const queryPromise = supabase
      .from("properties_v2")
      .select("id, slug, project_name, developer, location, location_id, locality_id, project_status, hero_image, is_published, created_at, updated_at")
      // NO .eq("is_published", true) filter - we want ALL properties
      .order("created_at", { ascending: false }); // Newest first

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

    // Convert snake_case to camelCase - DO NOT filter by is_published
    const properties = (data || []).map((prop) => {
      try {
        return supabaseToProperty(prop as any);
      } catch (err) {
        console.error(`Error mapping property:`, err);
        return null;
      }
    }).filter((prop): prop is NonNullable<typeof prop> => prop !== null);
    
    // Add locationSlug to all properties
    const propertiesWithLocation = await addLocationSlugToProperties(properties, supabase);

    return NextResponse.json(
      { properties: propertiesWithLocation },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

