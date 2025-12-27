// Cloudflare R2 upload utility using AWS S3-compatible API
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";

// R2 Configuration
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

export interface R2UploadResult {
  url: string;
  success: boolean;
  error?: string;
  key?: string; // R2 object key (path)
}

/**
 * Sanitize filename to remove special characters
 */
function sanitizeFilename(filename: string): string {
  // Keep original filename but remove path separators and dangerous characters
  return filename
    .replace(/^.*[\\\/]/, "") // Remove path
    .replace(/[^a-zA-Z0-9._-]/g, "_") // Replace special chars with underscore
    .toLowerCase();
}

/**
 * Get content type based on file extension
 */
function getContentType(filename: string, fileType: string): string {
  // Use file type if available, otherwise infer from extension
  if (fileType) return fileType;

  const ext = filename.toLowerCase().split(".").pop();
  const contentTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif",
    gif: "image/gif",
    pdf: "application/pdf",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
  };
  return contentTypes[ext || ""] || "application/octet-stream";
}

/**
 * Upload file to Cloudflare R2
 * @param file - File to upload
 * @param propertySlug - Property slug for folder organization
 * @param fileType - Type of file: 'hero', 'brochure', 'image', 'video', 'location-hero', 'location-celeste-abode'
 * @returns Upload result with public URL
 */
export async function uploadToR2(
  file: File,
  propertySlug: string,
  fileType: "hero" | "brochure" | "image" | "video" | "location-hero" | "location-celeste-abode"
): Promise<R2UploadResult> {
  try {
    // Validate configuration
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      return {
        success: false,
        url: "",
        error: "R2 configuration is missing. Please check environment variables.",
      };
    }

    // Validate property slug
    if (!propertySlug || propertySlug.trim() === "") {
      return {
        success: false,
        url: "",
        error: "Property slug is required for file organization.",
      };
    }

    // Sanitize property slug
    const sanitizedSlug = propertySlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    // Get file extension
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    // Determine folder structure and filename based on file type
    let objectKey: string;
    switch (fileType) {
      case "hero":
        // Format: {slug}/{slug}_hero.{ext}
        objectKey = `${sanitizedSlug}/${sanitizedSlug}_hero.${fileExtension}`;
        break;
      case "brochure":
        // Format: {slug}/{slug}_brochure.{ext}
        objectKey = `${sanitizedSlug}/${sanitizedSlug}_brochure.${fileExtension}`;
        break;
      case "image":
        // Format: {slug}/images/{slug}_{originalFilename}
        const imageFilename = sanitizeFilename(file.name);
        objectKey = `${sanitizedSlug}/images/${sanitizedSlug}_${imageFilename}`;
        break;
      case "video":
        // Format: {slug}/videos/{slug}_{originalFilename}
        const videoFilename = sanitizeFilename(file.name);
        objectKey = `${sanitizedSlug}/videos/${sanitizedSlug}_${videoFilename}`;
        console.log(`Video upload - Object key: ${objectKey}, File: ${file.name}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        break;
      case "location-hero":
        // Format: {slug}/{slug}_hero.{ext}
        objectKey = `${sanitizedSlug}/${sanitizedSlug}_hero.${fileExtension}`;
        break;
      case "location-celeste-abode":
        // Format: {slug}/{slug}_celeste-abode.{ext}
        objectKey = `${sanitizedSlug}/${sanitizedSlug}_celeste-abode.${fileExtension}`;
        break;
      default:
        const defaultFilename = sanitizeFilename(file.name);
        objectKey = `${sanitizedSlug}/${sanitizedSlug}_${defaultFilename}`;
    }

    // Convert File to Buffer
    console.log(`Converting file to buffer: ${file.name}, Type: ${fileType}`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`Buffer created: ${(buffer.length / 1024 / 1024).toFixed(2)}MB`);

    // Get content type
    const contentType = getContentType(file.name, file.type);
    console.log(`Content type: ${contentType}`);

    // Upload to R2
    console.log(`Uploading to R2: Bucket=${R2_BUCKET_NAME}, Key=${objectKey}`);
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: objectKey,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(command);
    console.log(`R2 upload successful for ${fileType}: ${objectKey}`);

    // Construct public URL
    // Format: https://pub-xxxxx.r2.dev/[object-key] (public R2 URL)
    // Or use custom domain if R2_PUBLIC_URL is set
    let publicUrl: string;
    if (R2_PUBLIC_URL && R2_PUBLIC_URL.trim() !== "") {
      // Use configured public R2 URL (e.g., https://pub-xxxxx.r2.dev)
      // Remove trailing slash and append object key
      const baseUrl = R2_PUBLIC_URL.trim().replace(/\/$/, "");
      publicUrl = `${baseUrl}/${objectKey}`;
    } else {
      // Fallback: Use R2 storage URL (not recommended for production)
      // This format includes bucket name in path
      publicUrl = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET_NAME}/${objectKey}`;
      console.warn("R2_PUBLIC_URL not set. Using storage URL. Please set R2_PUBLIC_URL in .env.local");
    }

    return {
      success: true,
      url: publicUrl,
      key: objectKey,
    };
  } catch (error) {
    console.error("R2 upload error:", error);
    return {
      success: false,
      url: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Upload hero image to R2
 */
export async function uploadHeroImageToR2(
  file: File,
  propertySlug: string
): Promise<R2UploadResult> {
  return uploadToR2(file, propertySlug, "hero");
}

/**
 * Upload brochure PDF to R2
 */
export async function uploadBrochureToR2(
  file: File,
  propertySlug: string
): Promise<R2UploadResult> {
  return uploadToR2(file, propertySlug, "brochure");
}

/**
 * Upload gallery image to R2
 */
export async function uploadImageToR2(
  file: File,
  propertySlug: string
): Promise<R2UploadResult> {
  return uploadToR2(file, propertySlug, "image");
}

/**
 * Upload video to R2
 */
export async function uploadVideoToR2(
  file: File,
  propertySlug: string
): Promise<R2UploadResult> {
  return uploadToR2(file, propertySlug, "video");
}

/**
 * Upload location hero image to R2
 */
export async function uploadLocationHeroImageToR2(
  file: File,
  locationSlug: string
): Promise<R2UploadResult> {
  return uploadToR2(file, locationSlug, "location-hero");
}

/**
 * Upload location Celeste Abode image to R2
 */
export async function uploadLocationCelesteAbodeImageToR2(
  file: File,
  locationSlug: string
): Promise<R2UploadResult> {
  return uploadToR2(file, locationSlug, "location-celeste-abode");
}

/**
 * Derive R2 object key from a public URL
 * Removes the public base URL to get the object key
 * @param url - The public R2 URL (e.g., "https://pub-xxxxx.r2.dev/slug/file.jpg")
 * @returns The R2 object key (e.g., "slug/file.jpg")
 */
export function deriveR2KeyFromUrl(url: string): string | null {
  try {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return null;
    }

    // Get R2 public URL base (without trailing slash)
    const r2PublicUrl = (R2_PUBLIC_URL || "").trim().replace(/\/$/, "");
    
    // If R2_PUBLIC_URL is set, try to match it first
    if (r2PublicUrl && url.startsWith(r2PublicUrl)) {
      const key = url.replace(r2PublicUrl, "").replace(/^\//, "");
      return key || null;
    }

    // Try to extract from URL pattern (works for both R2_PUBLIC_URL and direct R2 URLs)
    // Pattern: https://pub-xxxxx.r2.dev/path/to/file
    // Pattern: https://account-id.r2.cloudflarestorage.com/bucket/path/to/file
    try {
      const urlObj = new URL(url);
      let pathname = urlObj.pathname;
      
      // Remove leading slash
      pathname = pathname.replace(/^\//, "");
      
      // If pathname contains bucket name (storage URL pattern), remove it
      // Pattern: bucket-name/path/to/file -> path/to/file
      if (R2_BUCKET_NAME && pathname.startsWith(R2_BUCKET_NAME + "/")) {
        pathname = pathname.replace(R2_BUCKET_NAME + "/", "");
      }
      
      return pathname || null;
    } catch {
      // If URL parsing fails, try simple string extraction
      // Extract everything after the domain
      const match = url.match(/https?:\/\/[^\/]+(?:\/(.+))?$/);
      if (match && match[1]) {
        return match[1];
      }
      return null;
    }
  } catch (error) {
    console.error("Error deriving R2 key from URL:", error);
    return null;
  }
}

/**
 * Delete a single R2 object by its key
 * @param key - The R2 object key (e.g., "slug/file.jpg")
 * @returns Result indicating success or failure
 */
export async function deleteR2ObjectByKey(key: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Validate configuration
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      return {
        success: false,
        error: "R2 configuration is missing. Please check environment variables.",
      };
    }

    // Validate key
    if (!key || key.trim() === "") {
      return {
        success: false,
        error: "Object key is required for deletion.",
      };
    }

    const normalizedKey = key.trim();
    console.log(`Deleting R2 object with key: ${normalizedKey}`);

    // Delete the object
    const deleteCommand = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: normalizedKey,
    });

    await r2Client.send(deleteCommand);
    console.log(`Successfully deleted R2 object: ${normalizedKey}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(`Failed to delete R2 object ${key}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Delete all objects in R2 with a given prefix
 * Used for cleaning up all assets belonging to a property
 * @param prefix - The prefix to match (e.g., "property-slug/")
 * @returns Result with count of deleted objects and any errors
 */
export async function deleteR2ObjectsByPrefix(prefix: string): Promise<{
  success: boolean;
  deletedCount: number;
  error?: string;
}> {
  try {
    // Validate configuration
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      return {
        success: false,
        deletedCount: 0,
        error: "R2 configuration is missing. Please check environment variables.",
      };
    }

    // Validate prefix
    if (!prefix || prefix.trim() === "") {
      return {
        success: false,
        deletedCount: 0,
        error: "Prefix is required for deletion.",
      };
    }

    // Ensure prefix ends with / for proper matching
    const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
    
    console.log(`Deleting R2 objects with prefix: ${normalizedPrefix}`);

    let deletedCount = 0;
    let continuationToken: string | undefined;

    // R2 doesn't support folder deletion, so we need to:
    // 1. List all objects with the prefix
    // 2. Delete each object individually
    do {
      // List objects with the prefix
      const listCommand = new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        Prefix: normalizedPrefix,
        ContinuationToken: continuationToken,
      });

      const listResponse = await r2Client.send(listCommand);
      const objects = listResponse.Contents || [];

      if (objects.length === 0) {
        console.log(`No objects found with prefix: ${normalizedPrefix}`);
        break;
      }

      // Delete each object
      for (const object of objects) {
        if (!object.Key) continue;

        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: object.Key,
          });

          await r2Client.send(deleteCommand);
          deletedCount++;
          console.log(`Deleted R2 object: ${object.Key}`);
        } catch (deleteError) {
          console.error(`Failed to delete object ${object.Key}:`, deleteError);
          // Continue deleting other objects even if one fails
        }
      }

      // Check if there are more objects to list
      continuationToken = listResponse.NextContinuationToken;
    } while (continuationToken);

    console.log(`Successfully deleted ${deletedCount} objects with prefix: ${normalizedPrefix}`);
    
    return {
      success: true,
      deletedCount,
    };
  } catch (error) {
    console.error("R2 delete error:", error);
    return {
      success: false,
      deletedCount: 0,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

