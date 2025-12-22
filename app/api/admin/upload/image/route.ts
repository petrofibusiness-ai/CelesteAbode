import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadImageToR2, uploadHeroImageToR2 } from "@/lib/r2-upload";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting for uploads
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.UPLOAD);
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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const propertySlug = formData.get("propertySlug") as string;
    const isHero = formData.get("isHero") === "true";

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

    // Validate property slug
    if (!propertySlug || propertySlug.trim() === "") {
      return NextResponse.json(
        { error: "Property slug is required" },
        { status: 400 }
      );
    }

    // Upload to R2
    const result = isHero
      ? await uploadHeroImageToR2(file, propertySlug)
      : await uploadImageToR2(file, propertySlug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.url, key: result.key });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

