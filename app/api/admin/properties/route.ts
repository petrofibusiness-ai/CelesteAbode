import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase-server";
import { Property } from "@/types/property";
import { supabaseV3ToProperty, propertyToSupabaseV3 } from "@/lib/supabase-property-mapper";
import { validatePropertyData } from "@/lib/validation";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { logAuditEntry, getRequestMetadata } from "@/lib/audit-log";
import { verifyCSRFToken } from "@/lib/csrf";
import { validateQueryParams, validateJSONBody, PropertyFilterSchema, PropertyDataSchema } from "@/lib/validation-schemas";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";
import { revalidatePropertyCaches, revalidatePropertyAPIs } from "@/lib/cache-revalidation";
import { sanitizeProjectNameSearch } from "@/lib/property-listing-search";

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

    // Parse and validate query parameters
    let filters;
    try {
      const rawParams = {
        page: request.nextUrl.searchParams.get('page'),
        limit: request.nextUrl.searchParams.get('limit'),
        search: request.nextUrl.searchParams.get('search'),
        published: request.nextUrl.searchParams.get('published'),
        t: request.nextUrl.searchParams.get('t'),
        _t: request.nextUrl.searchParams.get('_t'),
      };
      filters = validateQueryParams(PropertyFilterSchema, rawParams);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/properties',
        metadata: { error: error instanceof Error ? error.message : 'Invalid parameters' },
      });

      return NextResponse.json(
        { error: 'Invalid query parameters' },
        { status: 400 }
      );
    }

    const { page, limit, search } = filters;
    const offset = (page - 1) * limit;
    const searchTerm = search ? sanitizeProjectNameSearch(search).replace(/,/g, " ") : "";

    // Get Supabase admin client to bypass RLS and see all properties
    // Admin needs to see all properties (published and unpublished) regardless of RLS policies
    const supabase = getSupabaseAdminClient();

    // Fetch ALL properties with pagination - no filter on is_published
    // Admin should see both published and draft properties
    let query = supabase
      .from("properties_v3")
      .select(
        "id, slug, project_name, developer, location, location_id, locality_id, project_status, featured, is_published, hero_image, hero_image_alt, brochure_url, floor_plans, images, project_snapshot, location_advantage, created_at, updated_at",
        { count: "exact" }
      )
      .order("featured", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (searchTerm) {
      const escaped = searchTerm.replace(/"/g, '""');
      const pattern = `"%${escaped}%"`;
      query = query.or(
        `project_name.ilike.${pattern},developer.ilike.${pattern},location.ilike.${pattern},slug.ilike.${pattern}`
      );
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

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
      const property = supabaseV3ToProperty(item);
      // Defensive fallback: keep brochure URL even if mapper input shape changes.
      if (!property.brochureUrl && typeof item.brochure_url === "string" && item.brochure_url.trim()) {
        property.brochureUrl = item.brochure_url.trim();
      }
      // Add locationSlug to property for URL generation
      if (item.location_id && locationSlugMap.has(item.location_id)) {
        (property as any).locationSlug = locationSlugMap.get(item.location_id);
      }
      return property;
    });

    const propertyIds = properties.map((p) => p.id).filter((id): id is string => Boolean(id));
    const linesByPropertyId = new Map<
      string,
      Array<{ configuration: string; sizeSqft: string; priceCr: string }>
    >();

    if (propertyIds.length > 0) {
      const { data: invRows, error: invError } = await supabase
        .from("property_inventory_dashboard_rows")
        .select("property_id, line_id, configuration_label, size_sqft, price_cr, sort_order")
        .in("property_id", propertyIds)
        .order("sort_order", { ascending: true, nullsFirst: false });

      if (!invError && invRows) {
        for (const row of invRows as Array<{
          property_id: string;
          line_id: string | null;
          configuration_label: string | null;
          size_sqft: string | null;
          price_cr: string | null;
        }>) {
          if (!row.line_id) continue;
          const pid = row.property_id;
          const bucket = linesByPropertyId.get(pid) ?? [];
          bucket.push({
            configuration: String(row.configuration_label ?? "").trim(),
            sizeSqft: String(row.size_sqft ?? "").trim(),
            priceCr: String(row.price_cr ?? "").trim(),
          });
          linesByPropertyId.set(pid, bucket);
        }
      }
    }

    for (const property of properties) {
      if (property.id) {
        property.messagingInventoryLines = linesByPropertyId.get(property.id) ?? [];
      }
    }

    // Response metadata (removed debug log for production)

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
        'Cache-Control': 'private, no-store, no-cache, must-revalidate',
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

    // CSRF token validation
    const csrfToken = request.headers.get('x-csrf-token');
    const isValidCSRF = await verifyCSRFToken(csrfToken);

    if (!isValidCSRF) {
      await logSecurityEvent('CSRF_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/properties',
      });

      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      );
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
    let validatedData;
    try {
      const body = await request.json();
      validatedData = validateJSONBody(PropertyDataSchema, body);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/properties',
        metadata: { error: error instanceof Error ? error.message : 'Invalid input' },
      });

      return NextResponse.json(
        { error: 'Invalid input data', details: error instanceof Error ? error.message : 'Validation failed' },
        { status: 400 }
      );
    }

    // Get request metadata for audit log
    const requestMetadata = getRequestMetadata(request);

    // Prepare property data
    const property: Omit<Property, "id" | "createdAt" | "updatedAt"> = {
      slug: validatedData.slug.trim().toLowerCase(),
      projectName: validatedData.projectName.trim(),
      developer: validatedData.developer.trim(),
      location: validatedData.location.trim(),
      locationId: validatedData.locationId || null,
      localityId: validatedData.localityId || null,
      propertyType: validatedData.propertyType || null,
      reraId: validatedData.reraId?.trim() || undefined,
      projectStatus: validatedData.projectStatus || null,
      possessionDate: validatedData.possessionDate?.trim() || undefined,
      configuration: null,
      projectSnapshot: (validatedData.projectSnapshot || [])
        .map((s) => String(s).trim())
        .filter((s) => s.length > 0),
      whyBlock: {
        title: validatedData.whyBlock?.title?.trim() || undefined,
        points: (validatedData.whyBlock?.points || [])
          .map((p) => String(p).trim())
          .filter((p) => p.length > 0),
      },
      floorPlanUrl: validatedData.floorPlanUrl?.trim() || null,
      locationAdvantage: validatedData.locationAdvantage || [],
      mapLink: validatedData.mapLink ?? null,
      description: validatedData.description.trim(),
      heroImage: validatedData.heroImage.trim(),
      heroImageAlt: validatedData.heroImageAlt?.trim() || undefined,
      brochureUrl: validatedData.brochureUrl?.trim() || undefined,
      images: Array.isArray(validatedData.images) ? validatedData.images.filter((url: string) => url && url.trim()) : [],
      videos: Array.isArray(validatedData.videos)
        ? validatedData.videos
            .filter((v: any) => v && v.src)
            .map((v: any) => ({
              title: (v.title || "").trim(),
              src: v.src.trim(),
              thumbnail: (v.thumbnail || "").trim(),
            }))
        : [],
      amenities: Array.isArray(validatedData.amenities) ? validatedData.amenities.filter((a: string) => a && typeof a === "string" && a.trim() !== "") : [],
      priceMin: validatedData.priceMin ?? undefined,
      priceMax: validatedData.priceMax ?? undefined,
      priceUnit: validatedData.priceUnit?.trim() || undefined,
      seo: validatedData.seo && typeof validatedData.seo === "object" ? validatedData.seo : {},
      featured: validatedData.featured === true,
      isPublished: validatedData.isPublished === true,
    };

    // Validate hero image URL
    if (!property.heroImage || !property.heroImage.startsWith('http')) {
      return NextResponse.json(
        { error: "Hero image must be a valid URL" },
        { status: 400 }
      );
    }

    // Convert camelCase to snake_case for Supabase
    const supabaseProperty = propertyToSupabaseV3(property);

    // Use admin client (service role) for write operations to bypass RLS
    // Authentication is already verified above, so this is safe
    const supabase = getSupabaseAdminClient();

    // Insert into Supabase with timeout protection
    const insertPromise = supabase
      .from("properties_v3")
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
    const createdProperty = supabaseV3ToProperty(data);

    // Audit log
    await logAuditEntry({
      table_name: 'properties_v3',
      operation: 'CREATE',
      record_id: data.id,
      user_id: user.id,
      user_email: user.email,
      new_values: supabaseProperty,
      ...requestMetadata,
    });

    // Revalidate caches after property creation
    // Fetch location slug for proper cache invalidation
    let locationSlug: string | undefined;
    if (property.locationId) {
      const { data: locationData } = await supabase
        .from("locations_v2")
        .select("slug")
        .eq("id", property.locationId)
        .single();
      locationSlug = locationData?.slug;
    }
    
    await revalidatePropertyCaches(property.slug, locationSlug);
    await revalidatePropertyAPIs();

    const duration = Date.now() - startTime;
    // Property created successfully in ${duration}ms

    return NextResponse.json(
      { property: createdProperty },
      {
        status: 201,
        headers: {
          'Cache-Control': 'private, no-store, no-cache, must-revalidate',
        },
      }
    );
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
