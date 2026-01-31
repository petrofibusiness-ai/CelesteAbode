// Create draft property (staged flow)
// Returns property ID immediately, allowing uploads to proceed
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { propertyToSupabase, supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkDistributedRateLimit, DISTRIBUTED_RATE_LIMITS } from "@/lib/redis-rate-limit";
import { getRateLimitIdentifier } from "@/lib/rate-limit";
import { verifyCSRFToken } from "@/lib/csrf";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";
import { z } from "zod";

const QUERY_TIMEOUT = 10000; // 10 seconds for draft creation

const DraftPropertySchema = z.object({
  slug: z.string().min(1).max(200),
  projectName: z.string().min(1).max(500),
  developer: z.string().min(1).max(500),
  location: z.string().min(1).max(500),
  locationId: z.string().uuid(),
  localityId: z.string().uuid().optional().nullable(),
  propertyType: z.string().optional().nullable(),
  reraId: z.string().max(100).optional(),
  projectStatus: z.string().optional().nullable(),
  possessionDate: z.string().max(100).optional(),
  configuration: z.array(z.string()).max(50).optional(),
  sizes: z.string().min(1).max(200),
  description: z.string().min(1).max(50000),
  price: z.string().max(100).optional(),
  amenities: z.array(z.string()).min(1).max(100),
  seo: z.record(z.any()).optional(),
  isPublished: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  const correlationId = crypto.randomUUID();
  const startTime = Date.now();

  try {
    // Authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", correlationId },
        { status: 401, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    // CSRF validation
    const csrfToken = request.headers.get('x-csrf-token');
    const isValidCSRF = await verifyCSRFToken(csrfToken);
    if (!isValidCSRF) {
      await logSecurityEvent('CSRF_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/properties/draft',
        metadata: { correlationId },
      });

      return NextResponse.json(
        { error: "CSRF token validation failed", correlationId },
        { status: 403, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = await checkDistributedRateLimit(
      `${rateLimitId}:property-create`,
      DISTRIBUTED_RATE_LIMITS.PROPERTY_CREATE
    );

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.error, correlationId },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'X-Correlation-ID': correlationId,
          },
        }
      );
    }

    // Parse and validate request body (lightweight validation for draft)
    let body: z.infer<typeof DraftPropertySchema>;
    try {
      const rawBody = await request.json();
      body = DraftPropertySchema.parse(rawBody);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/properties/draft',
        metadata: {
          correlationId,
          error: error instanceof Error ? error.message : 'Validation failed',
        },
      });

      return NextResponse.json(
        {
          error: "Invalid input data",
          details: error instanceof z.ZodError ? error.errors : undefined,
          correlationId,
        },
        { status: 400, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    const supabase = getSupabaseAdminClient();

    // Create draft property (without media URLs)
    const draftProperty = {
      slug: body.slug.trim().toLowerCase(),
      project_name: body.projectName.trim(),
      developer: body.developer.trim(),
      location: body.location.trim(),
      location_id: body.locationId,
      locality_id: body.localityId || null,
      property_type: body.propertyType || null,
      rera_id: body.reraId?.trim() || null,
      project_status: body.projectStatus || null,
      possession_date: body.possessionDate?.trim() || null,
      configuration: body.propertyType === 'Commercial' ? null : (body.configuration || []),
      sizes: body.sizes.trim(),
      description: body.description.trim(),
      hero_image: '', // Will be set after upload
      brochure_url: null,
      images: [],
      videos: [],
      amenities: body.amenities.filter((a: string) => a && a.trim() !== ''),
      price: body.price?.trim() || null,
      seo: body.seo || {},
      is_published: false, // Drafts are never published
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert with timeout
    const insertPromise = supabase
      .from("properties_v2")
      .insert([draftProperty])
      .select("id, slug")
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([insertPromise, timeoutPromise]) as any;

    if (error) {
      console.error(`[DRAFT_CREATE] Error creating draft`, {
        correlationId,
        error: error.message,
      });

      if (error.code === '23505') {
        return NextResponse.json(
          {
            error: `A property with slug "${body.slug}" already exists`,
            correlationId,
          },
          { status: 409, headers: { 'X-Correlation-ID': correlationId } }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to create draft property",
          correlationId,
        },
        { status: 500, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    const duration = Date.now() - startTime;

    console.log(`[DRAFT_CREATE] Draft created`, {
      correlationId,
      propertyId: data.id,
      slug: data.slug,
      duration: `${duration}ms`,
    });

    return NextResponse.json(
      {
        propertyId: data.id,
        slug: data.slug,
        correlationId,
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'X-Correlation-ID': correlationId,
          'Cache-Control': 'private, no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error(`[DRAFT_CREATE] Unexpected error`, {
      correlationId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    if (error instanceof Error && error.message === 'Query timeout') {
      return NextResponse.json(
        {
          error: "Request timeout. Please try again.",
          correlationId,
        },
        { status: 504, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        correlationId,
      },
      { status: 500, headers: { 'X-Correlation-ID': correlationId } }
    );
  }
}

