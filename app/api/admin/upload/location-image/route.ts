import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth-guard";
import { uploadLocationHeroImageToR2, uploadLocationCelesteAbodeImageToR2 } from "@/lib/r2-upload";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";

export async function POST(request: NextRequest) {
  try {
    // Strict authentication check
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const locationSlug = formData.get("locationSlug") as string;
    const imageType = formData.get("imageType") as "hero" | "celeste-abode";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate image type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate location slug
    if (!locationSlug || locationSlug.trim() === "") {
      return NextResponse.json(
        { error: "Location slug is required" },
        { status: 400 }
      );
    }

    // Validate image type parameter
    if (!imageType || !["hero", "celeste-abode"].includes(imageType)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    // Upload to R2
    const result = imageType === "celeste-abode"
      ? await uploadLocationCelesteAbodeImageToR2(file, locationSlug)
      : await uploadLocationHeroImageToR2(file, locationSlug);

    if (!result.success) {
      // Log failed upload
      await logSecurityEvent(request, "FILE_UPLOAD_FAILED", {
        user_id: user?.id || 'unknown',
        file_type: 'location_image',
        image_type: imageType,
        location_slug: locationSlug,
        error: result.error || 'Unknown error'
      });

      return NextResponse.json(
        { error: result.error || "Upload failed" },
        { status: 500 }
      );
    }

    // Log successful upload
    await logSecurityEvent(request, "FILE_UPLOAD_SUCCESS", {
      user_id: user?.id || 'unknown',
      file_type: 'location_image',
      image_type: imageType,
      location_slug: locationSlug
    });

    return NextResponse.json({ url: result.url, key: result.key });
  } catch (error) {
    console.error("Location image upload error:", error);

    // Log security event for unhandled errors
    await logSecurityEvent(request, "FILE_UPLOAD_FAILED", {
      error: error instanceof Error ? error.message : 'Unknown error',
      file_type: 'location_image'
    });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

