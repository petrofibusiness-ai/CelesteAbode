import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadImageToR2, uploadHeroImageToR2, uploadFloorPlanImageToR2 } from "@/lib/r2-upload";
import { verifyCSRFToken } from "@/lib/csrf";
import { validateUploadedFile, sanitizeFilename, COMMON_CONFIGS } from "@/lib/file-upload-validator";
import { validateJSONBody } from "@/lib/validation-schemas";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";
import { z } from "zod";

const ImageUploadParamsSchema = z.object({
  propertySlug: z.string().max(255),
  isHero: z.enum(["true", "false"]).optional(),
});

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
        endpoint: '/api/admin/upload/image',
      });

      return NextResponse.json(
        { error: "CSRF token validation failed" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const propertySlug = formData.get("propertySlug") as string;
    const isHero = formData.get("isHero") === "true";
    const isFloorPlan = formData.get("kind") === "floorPlan";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file
    const validation = await validateUploadedFile(file, COMMON_CONFIGS.IMAGE);
    if (!validation.valid) {
      await logSecurityEvent('FILE_UPLOAD_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/upload/image',
        metadata: { reason: validation.error, fileName: file.name },
      });

      return NextResponse.json(
        { error: validation.error || "File validation failed" },
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

    // Upload image
    let uploadResult;
    if (isHero) {
      uploadResult = await uploadHeroImageToR2(file, propertySlug);
    } else if (isFloorPlan) {
      uploadResult = await uploadFloorPlanImageToR2(file, propertySlug);
    } else {
      uploadResult = await uploadImageToR2(file, propertySlug);
    }

    if (!uploadResult.success) {
      console.error("[INTERNAL] Image upload failed:", uploadResult.error);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error("[INTERNAL] Image upload error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

