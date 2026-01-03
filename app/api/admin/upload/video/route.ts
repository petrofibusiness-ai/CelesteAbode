import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadVideoToR2 } from "@/lib/r2-upload";
import { verifyCSRFToken } from "@/lib/csrf";
import { validateUploadedFile, sanitizeFilename, COMMON_CONFIGS } from "@/lib/file-upload-validator";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";

// Increase timeout for large video uploads (up to 5 minutes)
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
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
        endpoint: '/api/admin/upload/video',
      });

      return NextResponse.json(
        { error: "CSRF token validation failed" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const propertySlug = formData.get("propertySlug") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate video using enhanced validator
    const validation = await validateUploadedFile(file, COMMON_CONFIGS.VIDEO);
    if (!validation.valid) {
      await logSecurityEvent('FILE_UPLOAD_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/upload/video',
        metadata: { reason: validation.error, fileName: file.name },
      });

      return NextResponse.json(
        { error: validation.error || "Video validation failed" },
        { status: 400 }
      );
    }

    // Validate property slug
    if (!propertySlug || propertySlug.length > 255) {
      return NextResponse.json(
        { error: "Invalid property slug" },
        { status: 400 }
      );
    }

    // Sanitize filename
    const sanitized = sanitizeFilename(file.name);

    // Upload to R2
    const result = await uploadVideoToR2(file, propertySlug);

    if (!result.success) {
      console.error("[INTERNAL] Video upload to R2 failed:", result.error);
      return NextResponse.json(
        { error: "An error occurred while processing your request" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.url,
      key: result.key,
    });
  } catch (error) {
    console.error("[INTERNAL] Video upload error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

