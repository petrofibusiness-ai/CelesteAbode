import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadVideoToR2 } from "@/lib/r2-upload";

// Increase timeout for large video uploads (up to 5 minutes)
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const propertySlug = formData.get("propertySlug") as string;

    console.log("Video upload request received:", {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      propertySlug: propertySlug,
    });

    if (!file) {
      console.error("No file provided in video upload request");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate video type
    if (!file.type.startsWith("video/")) {
      console.error(`Invalid file type for video upload: ${file.type}`);
      return NextResponse.json(
        { error: `File must be a video. Received type: ${file.type}` },
        { status: 400 }
      );
    }

    // Validate file size (50 MB limit)
    const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
    if (file.size > maxSize) {
      console.error(`Video file too large: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      return NextResponse.json(
        { error: `Video file is too large. Maximum size is 50 MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)} MB.` },
        { status: 400 }
      );
    }

    // Validate property slug
    if (!propertySlug || propertySlug.trim() === "") {
      console.error("Property slug missing in video upload request");
      return NextResponse.json(
        { error: "Property slug is required" },
        { status: 400 }
      );
    }

    console.log(`Starting video upload to R2 for property: ${propertySlug}`);

    // Upload to R2
    const result = await uploadVideoToR2(file, propertySlug);

    if (!result.success) {
      console.error("Video upload to R2 failed:", result.error);
      return NextResponse.json(
        { error: result.error || "Upload failed" },
        { status: 500 }
      );
    }

    console.log("Video upload successful:", {
      url: result.url,
      key: result.key,
    });

    return NextResponse.json({
      url: result.url,
      key: result.key,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

