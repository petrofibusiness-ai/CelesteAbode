// Cloudflare R2 upload for PDFs (brochures)
// Using the Supabase storage URL pattern from the codebase

export interface CloudflareUploadResult {
  url: string;
  success: boolean;
  error?: string;
}

/**
 * Upload PDF to Cloudflare R2 via Supabase Storage
 * This uses the same bucket pattern as the existing brochure URL
 */
export async function uploadPDFToCloudflare(
  file: File,
  projectSlug: string
): Promise<CloudflareUploadResult> {
  try {
    // Get Supabase client
    const { supabaseAdmin } = await import("@/lib/supabase");
    
    if (!supabaseAdmin) {
      return {
        success: false,
        url: "",
        error: "Supabase not configured",
      };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedSlug = projectSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const fileName = `${sanitizedSlug}_brochure_${timestamp}.pdf`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage (which uses Cloudflare R2)
    const { data, error } = await supabaseAdmin.storage
      .from("Celesta_Abode") // Bucket name from existing URL
      .upload(fileName, fileBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) {
      console.error("Cloudflare upload error:", error);
      return {
        success: false,
        url: "",
        error: error.message,
      };
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("Celesta_Abode")
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return {
      success: false,
      url: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

