import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";

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
      .from("properties")
      .select("id, slug, project_name, developer, location, project_status, hero_image, is_published, created_at, updated_at")
      // NO .eq("is_published", true) filter - we want ALL properties
      .order("created_at", { ascending: false }); // Newest first

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
    );

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error) {
      console.error("Supabase error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }

    console.log(`Fetched ${data?.length || 0} properties from database`);
    
    // Debug: Log all properties with their publish status
    if (data && data.length > 0) {
      console.log("Properties found:", data.map((p: any) => ({
        name: p.project_name,
        slug: p.slug,
        is_published: p.is_published
      })));
      console.log("Total properties:", data.length);
      console.log("Published count:", data.filter((p: any) => p.is_published === true).length);
      console.log("Unpublished count:", data.filter((p: any) => p.is_published === false).length);
    } else {
      console.log("No properties found in database!");
    }

    // Convert snake_case to camelCase - DO NOT filter by is_published
    const properties = (data || []).map((prop, index) => {
      try {
        const mapped = supabaseToProperty(prop as any);
        console.log(`Mapped property ${index + 1}: ${mapped.projectName}, isPublished: ${mapped.isPublished}`);
        return mapped;
      } catch (err) {
        console.error(`Error mapping property at index ${index}:`, err);
        console.error(`Property data:`, JSON.stringify(prop, null, 2));
        return null;
      }
    }).filter((prop): prop is NonNullable<typeof prop> => prop !== null);
    
    console.log(`Converted ${properties.length} properties for response`);
    console.log(`Properties being returned:`, properties.map(p => ({ name: p.projectName, isPublished: p.isPublished })));

    return NextResponse.json(
      { properties },
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

