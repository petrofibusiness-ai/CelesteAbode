// Cloudinary upload for images and videos
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  success: boolean;
  error?: string;
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImageToCloudinary(
  file: File | Buffer,
  folder: string = "celeste-abode/properties"
): Promise<CloudinaryUploadResult> {
  try {
    if (!process.env.CLOUDINARY_URL) {
      return {
        success: false,
        url: "",
        publicId: "",
        error: "Cloudinary not configured",
      };
    }

    // Convert File to Buffer if needed
    let buffer: Buffer;
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      buffer = file;
    }

    // Upload to Cloudinary
    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          format: "auto",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            resolve({
              success: false,
              url: "",
              publicId: "",
              error: error.message,
            });
          } else if (result) {
            resolve({
              success: true,
              url: result.secure_url,
              publicId: result.public_id,
            });
          } else {
            resolve({
              success: false,
              url: "",
              publicId: "",
              error: "Unknown error",
            });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      url: "",
      publicId: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Upload video to Cloudinary
 */
export async function uploadVideoToCloudinary(
  file: File | Buffer,
  folder: string = "celeste-abode/properties/videos"
): Promise<CloudinaryUploadResult> {
  try {
    if (!process.env.CLOUDINARY_URL) {
      return {
        success: false,
        url: "",
        publicId: "",
        error: "Cloudinary not configured",
      };
    }

    // Convert File to Buffer if needed
    let buffer: Buffer;
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      buffer = file;
    }

    // Upload to Cloudinary
    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "video",
          format: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            resolve({
              success: false,
              url: "",
              publicId: "",
              error: error.message,
            });
          } else if (result) {
            resolve({
              success: true,
              url: result.secure_url,
              publicId: result.public_id,
            });
          } else {
            resolve({
              success: false,
              url: "",
              publicId: "",
              error: "Unknown error",
            });
          }
        });
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return {
      success: false,
      url: "",
      publicId: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

