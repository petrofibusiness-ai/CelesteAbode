// Generate signed URLs for direct R2 uploads
// Prevents large files from passing through API routes
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { verifyCSRFToken } from "@/lib/csrf";
import { generateSignedUploadUrl, GenerateSignedUrlParams } from "@/lib/r2-signed-urls";
import { checkDistributedRateLimit, DISTRIBUTED_RATE_LIMITS } from "@/lib/redis-rate-limit";
import { getRateLimitIdentifier } from "@/lib/rate-limit";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";
import { validateUploadedFile, COMMON_CONFIGS } from "@/lib/file-upload-validator";
import { z } from "zod";

const SignedUrlRequestSchema = z.object({
  propertyId: z.string().uuid(),
  propertySlug: z.string().min(1).max(255),
  fileName: z.string().min(1).max(255),
  fileType: z.enum(["hero", "brochure", "image", "video"]),
  contentType: z.string(),
  fileSize: z.number().min(100).max(500 * 1024 * 1024), // 100 bytes to 500MB
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
        { status: 401 }
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
        endpoint: '/api/admin/upload/signed-url',
        metadata: { correlationId },
      });

      return NextResponse.json(
        { error: "CSRF token validation failed", correlationId },
        { status: 403 }
      );
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = await checkDistributedRateLimit(
      `${rateLimitId}:upload-url`,
      DISTRIBUTED_RATE_LIMITS.UPLOAD_URL_GENERATE
    );

    if (!rateLimit.success) {
      await logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/upload/signed-url',
        metadata: { correlationId, rateLimitError: rateLimit.error },
      });

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

    // Parse and validate request body
    let body: z.infer<typeof SignedUrlRequestSchema>;
    try {
      const rawBody = await request.json();
      body = SignedUrlRequestSchema.parse(rawBody);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/upload/signed-url',
        metadata: {
          correlationId,
          error: error instanceof Error ? error.message : 'Validation failed',
        },
      });

      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error instanceof z.ZodError ? error.errors : undefined,
          correlationId,
        },
        { status: 400, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    // Validate file type and size based on fileType
    const configMap = {
      hero: COMMON_CONFIGS.IMAGE,
      brochure: COMMON_CONFIGS.PDF,
      image: COMMON_CONFIGS.IMAGE,
      video: COMMON_CONFIGS.VIDEO,
    };

    const config = configMap[body.fileType];
    if (!config.allowedMimes.includes(body.contentType)) {
      return NextResponse.json(
        {
          error: `Invalid content type for ${body.fileType}. Allowed: ${config.allowedMimes.join(', ')}`,
          correlationId,
        },
        { status: 400, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    if (body.fileSize > config.maxSize) {
      const maxMB = Math.round(config.maxSize / (1024 * 1024));
      return NextResponse.json(
        {
          error: `File size exceeds maximum of ${maxMB}MB for ${body.fileType}`,
          correlationId,
        },
        { status: 400, headers: { 'X-Correlation-ID': correlationId } }
      );
    }

    // Generate signed URL
    const signedUrlParams: GenerateSignedUrlParams = {
      propertyId: body.propertyId,
      propertySlug: body.propertySlug,
      fileName: body.fileName,
      fileType: body.fileType,
      contentType: body.contentType,
      fileSize: body.fileSize,
    };

    const signedUrl = await generateSignedUploadUrl(signedUrlParams);

    const duration = Date.now() - startTime;

    // Log success
    console.log(`[UPLOAD_URL] Generated signed URL`, {
      correlationId,
      propertyId: body.propertyId,
      fileType: body.fileType,
      duration: `${duration}ms`,
    });

    return NextResponse.json(
      {
        ...signedUrl,
        correlationId,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'X-Correlation-ID': correlationId,
        },
      }
    );
  } catch (error) {
    console.error(`[UPLOAD_URL] Error generating signed URL`, {
      correlationId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Failed to generate upload URL",
        correlationId,
      },
      {
        status: 500,
        headers: { 'X-Correlation-ID': correlationId },
      }
    );
  }
}

