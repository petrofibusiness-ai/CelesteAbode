import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase-server";
import { Property } from "@/types/property";
import { supabaseToProperty, propertyToSupabase } from "@/lib/supabase-property-mapper";
import { validatePropertyData } from "@/lib/validation";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { logAuditEntry, getRequestMetadata } from "@/lib/audit-log";

// Query timeout: 30 seconds
const QUERY_TIMEOUT = 30000;

// GET - List all properties with pagination
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.ADMIN_READ);
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

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    // Get Supabase admin client to bypass RLS and see all properties
    // Admin needs to see all properties (published and unpublished) regardless of RLS policies
    const supabase = getSupabaseAdminClient();

    // Fetch ALL properties with pagination - no filter on is_published
    // Admin should see both published and draft properties
    const { data, error, count } = await supabase
      .from("properties_v2")
      .select("id, slug, project_name, developer, location, location_id, locality_id, project_status, is_published, hero_image, created_at, updated_at", { count: 'exact' })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties" },
        { status: 500 }
      );
    }

    // Fetch all unique location IDs
    const locationIds = [...new Set((data || []).map((p: any) => p.location_id).filter(Boolean))];
    
    // Fetch location slugs for all properties
    const locationSlugMap = new Map<string, string>();
    if (locationIds.length > 0) {
      const { data: locationsData } = await supabase
        .from("locations_v2")
        .select("id, slug")
        .in("id", locationIds);
      
      (locationsData || []).forEach((loc: any) => {
        locationSlugMap.set(loc.id, loc.slug);
      });
    }

    // Convert snake_case to camelCase and add location slug
    const properties = (data || []).map((item: any) => {
      const property = supabaseToProperty(item);
      // Add locationSlug to property for URL generation
      if (item.location_id && locationSlugMap.has(item.location_id)) {
        (property as any).locationSlug = locationSlugMap.get(item.location_id);
      }
      return property;
    });

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new property
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let propertyId: string | null = null;

  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.ADMIN_WRITE);
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

    // Parse and validate request body
    const body = await request.json();

    // Input validation
    const validationErrors = validatePropertyData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Get request metadata for audit log
    const requestMetadata = getRequestMetadata(request);

    // Prepare property data
    const property: Omit<Property, "id" | "createdAt" | "updatedAt"> = {
      slug: body.slug.trim().toLowerCase(),
      projectName: body.projectName.trim(),
      developer: body.developer.trim(),
      location: body.location.trim(),
      locationId: body.locationId || null, // FK to locations_v2 (required)
      localityId: body.localityId || null, // FK to localities (optional)
      propertyType: body.propertyType || null,
      reraId: body.reraId?.trim() || undefined,
      projectStatus: body.projectStatus || null,
      possessionDate: body.possessionDate?.trim() || undefined,
      configuration: Array.isArray(body.configuration) ? body.configuration : [],
      sizes: body.sizes.trim(),
      description: body.description.trim(),
      heroImage: body.heroImage.trim(),
      brochureUrl: body.brochureUrl?.trim() || undefined,
      images: Array.isArray(body.images) ? body.images.filter((url: string) => url && url.trim()) : [],
      videos: Array.isArray(body.videos) ? body.videos : [],
      amenities: Array.isArray(body.amenities) ? body.amenities.filter((a: string) => a && typeof a === 'string' && a.trim() !== '') : [],
      price: body.price?.trim() || undefined,
      seo: body.seo && typeof body.seo === 'object' ? body.seo : {},
      isPublished: body.isPublished === true,
    };

    // Validate hero image URL
    if (!property.heroImage || !property.heroImage.startsWith('http')) {
      return NextResponse.json(
        { error: "Hero image must be a valid URL" },
        { status: 400 }
      );
    }

    // Convert camelCase to snake_case for Supabase
    const supabaseProperty = propertyToSupabase(property);

    // Use admin client (service role) for write operations to bypass RLS
    // Authentication is already verified above, so this is safe
    const supabase = getSupabaseAdminClient();

    // Insert into Supabase with timeout protection
    const insertPromise = supabase
      .from("properties_v2")
      .insert([supabaseProperty])
      .select()
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([insertPromise, timeoutPromise]) as any;

    if (error) {
      console.error("Supabase error:", error);
      
      // Handle specific Supabase errors
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: `A property with slug "${property.slug}" already exists` },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: error.message || "Failed to create property in database" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Property created but no data returned" },
        { status: 500 }
      );
    }

    propertyId = data.id;

    // Convert snake_case back to camelCase
    const createdProperty = supabaseToProperty(data);

    // Audit log
    await logAuditEntry({
      table_name: 'properties_v2',
      operation: 'CREATE',
      record_id: data.id,
      user_id: user.id,
      user_email: user.email,
      new_values: supabaseProperty,
      ...requestMetadata,
    });

    const duration = Date.now() - startTime;
    // Property created successfully in ${duration}ms

    return NextResponse.json({ property: createdProperty }, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    
    // If property was created but audit log failed, still return success
    // but log the audit failure
    if (propertyId) {
      console.error("Property created but audit log failed:", propertyId);
    }

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
