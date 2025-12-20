import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadImageToR2, uploadHeroImageToR2 } from "@/lib/r2-upload";

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

