// R2 Signed URL generation for direct client uploads
// Prevents large files from passing through API routes (fixes 413 errors)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { sanitizeFilename } from "./file-upload-validator";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

// Initialize S3 client for R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export interface SignedUploadUrl {
  uploadUrl: string;
  publicUrl: string;
  key: string;
  expiresIn: number; // seconds
}

export interface GenerateSignedUrlParams {
  propertyId: string;
  propertySlug: string;
  fileName: string;
  fileType: "hero" | "brochure" | "image" | "video";
  contentType: string;
  fileSize: number;
}

/**
 * Generate signed URL for direct client upload to R2
 * Files upload directly from browser to R2, bypassing API routes
 */
export async function generateSignedUploadUrl(
  params: GenerateSignedUrlParams
): Promise<SignedUploadUrl> {
  const { propertyId, propertySlug, fileName, fileType, contentType, fileSize } = params;

  // Validate configuration
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    throw new Error("R2 configuration is missing");
  }

  // Sanitize inputs
  const sanitizedSlug = propertySlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const sanitizedFileName = sanitizeFilename(fileName);
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

  // Generate object key based on file type
  let objectKey: string;
  const timestamp = Date.now();
  
  switch (fileType) {
    case "hero":
      objectKey = `${sanitizedSlug}/${propertyId}_hero_${timestamp}.${fileExtension}`;
      break;
    case "brochure":
      objectKey = `${sanitizedSlug}/${propertyId}_brochure_${timestamp}.${fileExtension}`;
      break;
    case "image":
      objectKey = `${sanitizedSlug}/images/${propertyId}_${timestamp}_${sanitizedFileName}`;
      break;
    case "video":
      objectKey = `${sanitizedSlug}/videos/${propertyId}_${timestamp}_${sanitizedFileName}`;
      break;
    default:
      throw new Error(`Invalid file type: ${fileType}`);
  }

  // Create PutObject command
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
    ContentType: contentType,
    ContentLength: fileSize,
    // Add metadata for tracking
    Metadata: {
      propertyId,
      propertySlug: sanitizedSlug,
      fileType,
      uploadedAt: new Date().toISOString(),
    },
  });

  // Generate presigned URL (valid for 1 hour)
  const expiresIn = 3600; // 1 hour
  // Workaround for AWS SDK type mismatch between client-s3 and s3-request-presigner
  // This is a known issue with AWS SDK v3 type definitions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadUrl: string = await (getSignedUrl as any)(r2Client, command, { expiresIn });

  // Construct public URL
  const baseUrl = R2_PUBLIC_URL.trim().replace(/\/$/, "");
  const publicUrl = `${baseUrl}/${objectKey}`;

  return {
    uploadUrl,
    publicUrl,
    key: objectKey,
    expiresIn,
  };
}

/**
 * Verify uploaded file exists in R2
 */
export async function verifyFileUploaded(key: string): Promise<boolean> {
  try {
    const { HeadObjectCommand } = await import("@aws-sdk/client-s3");
    const command = new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });
    await r2Client.send(command);
    return true;
  } catch {
    return false;
  }
}

