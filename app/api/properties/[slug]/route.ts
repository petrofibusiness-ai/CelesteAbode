import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { addLocationSlugToProperty } from "@/lib/property-location-helper";

// Query timeout: 10 seconds
const QUERY_TIMEOUT = 10000;

// GET - Get property by slug (public endpoint, only returns published properties)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
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

    // Get Supabase admin client to fetch location slug (needs to bypass RLS for location lookup)
    const supabase = getSupabaseAdminClient();

    const { slug } = await params;

    if (!slug || slug.trim() === "") {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // Fetch property from Supabase - only published properties (RLS enforced)
    // Select only needed columns for better performance
    const queryPromise = supabase
      .from("properties_v2")
      .select("id, slug, project_name, developer, location, location_id, locality_id, rera_id, project_status, possession_date, configuration, sizes, description, hero_image, brochure_url, images, videos, amenities, price, seo, created_at, updated_at")
      .eq("slug", slug.toLowerCase().trim())
      .eq("is_published", true) // Only published properties
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

    if (error || !data) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Convert snake_case to camelCase
    const property = supabaseToProperty(data);

    // Add locationSlug to property
    const propertyWithLocation = await addLocationSlugToProperty(property, supabase);

    return NextResponse.json({ property: propertyWithLocation }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    
    if (error instanceof Error && error.message === 'Query timeout') {
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
