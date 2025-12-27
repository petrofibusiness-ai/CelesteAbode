import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const locationSlug = formData.get("locationSlug") as string;
    const imageType = formData.get("imageType") as string; // "hero" or "celeste-abode"

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

    // Sanitize location slug
    const sanitizedSlug = locationSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    // Determine object key based on image type
    let objectKey: string;
    if (imageType === "celeste-abode") {
      objectKey = `${sanitizedSlug}/${sanitizedSlug}_celeste-abode.${fileExtension}`;
    } else {
      objectKey = `${sanitizedSlug}/${sanitizedSlug}_hero.${fileExtension}`;
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    // Construct public URL
    const publicUrl = `${R2_PUBLIC_URL}/${objectKey}`;

    return NextResponse.json({ url: publicUrl, key: objectKey });
  } catch (error) {
    console.error("Location image upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

