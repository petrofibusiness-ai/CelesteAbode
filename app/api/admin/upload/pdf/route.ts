import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadBrochureToR2 } from "@/lib/r2-upload";
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
    const propertySlug = formData.get("propertySlug") as string || formData.get("projectSlug") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Validate file size (10 MB limit)
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `PDF file size must be less than 10 MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)} MB` },
        { status: 400 }
      );
    }

    if (!propertySlug || propertySlug.trim() === "") {
      return NextResponse.json(
        { error: "Property slug is required" },
        { status: 400 }
      );
    }

    // Upload to R2
    const result = await uploadBrochureToR2(file, propertySlug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      url: result.url, 
      key: result.key
    });
  } catch (error) {
    console.error("PDF upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

