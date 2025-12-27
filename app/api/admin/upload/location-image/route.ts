import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadLocationHeroImageToR2, uploadLocationCelesteAbodeImageToR2 } from "@/lib/r2-upload";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      console.error("Location image upload: Unauthorized - no user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    console.log("Location image upload: User authenticated:", user.email);

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

    // Upload to R2
    const result = imageType === "celeste-abode"
      ? await uploadLocationCelesteAbodeImageToR2(file, locationSlug)
      : await uploadLocationHeroImageToR2(file, locationSlug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.url, key: result.key });
  } catch (error) {
    console.error("Location image upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

