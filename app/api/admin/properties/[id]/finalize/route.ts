// Finalize property after uploads complete
// Updates property with media URLs and marks as ready
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { propertyToSupabase, supabaseToProperty } from "@/lib/supabase-property-mapper";
import { checkDistributedRateLimit, DISTRIBUTED_RATE_LIMITS } from "@/lib/redis-rate-limit";
import { getRateLimitIdentifier } from "@/lib/rate-limit";
import { verifyCSRFToken } from "@/lib/csrf";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";
import { logAuditEntry, getRequestMetadata } from "@/lib/audit-log";
import { revalidatePropertyCaches, revalidatePropertyAPIs } from "@/lib/cache-revalidation";
import { z } from "zod";

const QUERY_TIMEOUT = 15000; // 15 seconds for finalization

const FinalizePropertySchema = z.object({
  heroImage: z.string().url().optional(),
  brochureUrl: z.string().url().optional().nullable(),
  images: z.array(z.string().url()).max(100).optional(),
  videos: z.array(z.object({
    title: z.string().max(500),
    src: z.string().url(),
    thumbnail: z.string().url().optional(),
  })).max(20).optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        endpoint: '/api/admin/properties/[id]/finalize',
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
      `${rateLimitId}:property-update`,
      DISTRIBUTED_RATE_LIMITS.PROPERTY_UPDATE
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

    const { id } = await params;

    // Parse and validate request body
    let body: z.infer<typeof FinalizePropertySchema>;
    try {
      const rawBody = await request.json();
      body = FinalizePropertySchema.parse(rawBody);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/properties/[id]/finalize',
        metadata: {
          correlationId,
          propertyId: id,
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

    // Fetch existing property
    const fetchPromise = supabase
      .from("properties_v2")
      .select("*")
      .eq("id", id)
      .single();

    const fetchTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data: existingData, error: fetchError } = await Promise.race([
      fetchPromise,
      fetchTimeoutPromise,
    ]) as any;

    if (fetchError || !existingData) {
      return NextResponse.json(
        {
          error: "Property not found",
          correlationId,
        },
        { status: 404, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    // Prepare update (only media fields)
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (body.heroImage !== undefined) {
      updateData.hero_image = body.heroImage;
    }
    if (body.brochureUrl !== undefined) {
      updateData.brochure_url = body.brochureUrl;
    }
    if (body.images !== undefined) {
      updateData.images = body.images.filter((url: string) => url && url.trim());
    }
    if (body.videos !== undefined) {
      updateData.videos = body.videos.filter((v: any) => v && v.src && v.title);
    }
    if (body.isPublished !== undefined) {
      updateData.is_published = body.isPublished;
    }

    // Update property
    const updatePromise = supabase
      .from("properties_v2")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    const updateTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data: updatedData, error: updateError } = await Promise.race([
      updatePromise,
      updateTimeoutPromise,
    ]) as any;

    if (updateError) {
      console.error(`[FINALIZE] Error updating property`, {
        correlationId,
        propertyId: id,
        error: updateError.message,
      });

      return NextResponse.json(
        {
          error: "Failed to finalize property",
          correlationId,
        },
        { status: 500, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    const property = supabaseToProperty(updatedData);

    // Revalidate caches after property finalization
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

    // Audit log
    const requestMetadata = getRequestMetadata(request);
    await logAuditEntry({
      table_name: 'properties_v2',
      operation: 'UPDATE',
      record_id: id,
      user_id: user.id,
      user_email: user.email,
      changes: updateData,
      old_values: existingData,
      new_values: updatedData,
      ...requestMetadata,
    });

    // Revalidate caches after property finalization
    const property = supabaseToProperty(existingData);
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

    console.log(`[FINALIZE] Property finalized`, {
      correlationId,
      propertyId: id,
      duration: `${duration}ms`,
    });

    return NextResponse.json(
      {
        property,
        correlationId,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'X-Correlation-ID': correlationId,
          'Cache-Control': 'private, no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error(`[FINALIZE] Unexpected error`, {
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

