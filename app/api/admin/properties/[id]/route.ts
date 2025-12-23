import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty, propertyToSupabase } from "@/lib/supabase-property-mapper";
import { deleteR2ObjectsByPrefix, deleteR2ObjectByKey, deriveR2KeyFromUrl } from "@/lib/r2-upload";
import { validatePropertyData } from "@/lib/validation";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { logAuditEntry, getRequestMetadata } from "@/lib/audit-log";

// Query timeout: 30 seconds
const QUERY_TIMEOUT = 30000;

// GET - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.ADMIN_READ);
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

    const { id } = await params;

    // Get Supabase client with user context (respects RLS)
    const supabase = await getSupabaseServerClient();

    const queryPromise = supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

    if (error) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Convert snake_case to camelCase
    const property = supabaseToProperty(data);

    return NextResponse.json({ property });
  } catch (error) {
    console.error("Error fetching property:", error);
    
    if (error instanceof Error && error.message === 'Query timeout') {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update property
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  let oldValues: any = null;

  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.ADMIN_WRITE);
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

    const { id } = await params;
    const body = await request.json();

    // Get request metadata for audit log
    const requestMetadata = getRequestMetadata(request);

    // Use admin client (service role) for write operations to bypass RLS
    // Authentication is already verified above, so this is safe
    const supabase = getSupabaseAdminClient();

    // Handle partial updates (e.g., just isPublished)
    if (body.hasOwnProperty('isPublished') && Object.keys(body).length === 1) {
      // Only updating isPublished - no asset sync needed
      const updateData = {
        is_published: body.isPublished === true,
        updated_at: new Date().toISOString(),
      };

      const queryPromise = supabase
        .from("properties")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
      });

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Failed to update property" },
          { status: 500 }
        );
      }

      const property = supabaseToProperty(data);

      // Audit log
      await logAuditEntry({
        table_name: 'properties',
        operation: 'UPDATE',
        record_id: id,
        user_id: user.id,
        user_email: user.email,
        changes: { is_published: body.isPublished },
        old_values: { is_published: !body.isPublished },
        new_values: updateData,
        ...requestMetadata,
      });

      return NextResponse.json({ property });
    }

    // Full update - implement asset synchronization
    // Step 1: Fetch existing property record
    const fetchPromise = supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    const fetchTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data: existingData, error: fetchError } = await Promise.race([fetchPromise, fetchTimeoutPromise]) as any;

    if (fetchError || !existingData) {
      console.error("Error fetching existing property:", fetchError);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    oldValues = existingData;
    const existingProperty = supabaseToProperty(existingData);

    // Input validation for full update
    const validationErrors = validatePropertyData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Step 2: Extract existing asset URLs
    const existingAssets: string[] = [];
    
    if (existingProperty.heroImage) {
      existingAssets.push(existingProperty.heroImage);
    }
    if (existingProperty.brochureUrl) {
      existingAssets.push(existingProperty.brochureUrl);
    }
    if (existingProperty.images && Array.isArray(existingProperty.images)) {
      existingAssets.push(...existingProperty.images);
    }
    if (existingProperty.videos && Array.isArray(existingProperty.videos)) {
      existingProperty.videos.forEach((video) => {
        if (video.src) {
          existingAssets.push(video.src);
        }
      });
    }

    // Step 3: Extract updated asset URLs
    const updatedAssets: string[] = [];
    
    if (body.heroImage) {
      updatedAssets.push(body.heroImage);
    }
    if (body.brochureUrl) {
      updatedAssets.push(body.brochureUrl);
    }
    if (body.images && Array.isArray(body.images)) {
      updatedAssets.push(...body.images);
    }
    if (body.videos && Array.isArray(body.videos)) {
      body.videos.forEach((video: { src?: string }) => {
        if (video.src) {
          updatedAssets.push(video.src);
        }
      });
    }

    // Step 4: Detect removed assets
    const removedAssets = existingAssets.filter(
      (url) => !updatedAssets.includes(url)
    );

    // Step 5: Delete removed assets from R2
    const deletedCount = { count: 0 };
    const deletionErrors: string[] = [];

    for (const removedUrl of removedAssets) {
      const r2PublicUrl = process.env.R2_PUBLIC_URL || "";
      const isR2Asset = r2PublicUrl && removedUrl.includes(r2PublicUrl) || 
                       removedUrl.includes("r2.dev") || 
                       removedUrl.includes("r2.cloudflarestorage.com");

      if (isR2Asset) {
        const r2Key = deriveR2KeyFromUrl(removedUrl);
        if (r2Key) {
          const deleteResult = await deleteR2ObjectByKey(r2Key);
          
          if (deleteResult.success) {
            deletedCount.count++;
          } else {
            deletionErrors.push(`Failed to delete ${r2Key}: ${deleteResult.error}`);
          }
        }
      }
    }

    if (deletionErrors.length > 0) {
      console.warn(`Some asset deletions failed:`, deletionErrors);
    }

    // Step 6: Filter amenities before conversion
    if (body.amenities && Array.isArray(body.amenities)) {
      body.amenities = body.amenities.filter((a: string) => a && typeof a === 'string' && a.trim() !== '');
    }

    // Step 7: Update database with final asset state
    const supabaseProperty = propertyToSupabase(body);
    const updateData = {
      ...supabaseProperty,
      updated_at: new Date().toISOString(),
    };

    const updatePromise = supabase
      .from("properties")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    const updateTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([updatePromise, updateTimeoutPromise]) as any;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update property" },
        { status: 500 }
      );
    }

    const property = supabaseToProperty(data);

    // Calculate changes for audit log
    const changes: Record<string, any> = {};
    const updateDataRecord = updateData as Record<string, any>;
    Object.keys(updateDataRecord).forEach(key => {
      const oldVal = oldValues as Record<string, any> | null;
      if (oldVal && oldVal[key] !== updateDataRecord[key]) {
        changes[key] = { old: oldVal[key], new: updateDataRecord[key] };
      }
    });

    // Audit log
    await logAuditEntry({
      table_name: 'properties',
      operation: 'UPDATE',
      record_id: id,
      user_id: user.id,
      user_email: user.email,
      changes,
      old_values: oldValues,
      new_values: updateData,
      ...requestMetadata,
    });

    const duration = Date.now() - startTime;
    console.log(`Property updated: ${property.projectName} (${deletedCount.count} assets deleted, ${duration}ms)`);

    return NextResponse.json({ 
      property,
      deletedAssets: deletedCount.count,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    
    if (error instanceof Error && error.message === 'Query timeout') {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  let oldValues: any = null;

  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.ADMIN_WRITE);
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

    const { id } = await params;

    // Get request metadata for audit log
    const requestMetadata = getRequestMetadata(request);

    // Use admin client (service role) for write operations to bypass RLS
    // Authentication is already verified above, so this is safe
    const supabase = getSupabaseAdminClient();

    // Step 1: Fetch the property record to get the slug
    const fetchPromise = supabase
      .from("properties")
      .select("slug, *")
      .eq("id", id)
      .single();

    const fetchTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data: propertyData, error: fetchError } = await Promise.race([fetchPromise, fetchTimeoutPromise]) as any;

    if (fetchError || !propertyData) {
      console.error("Error fetching property:", fetchError);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    oldValues = propertyData;

    // Step 2: Extract and validate the slug
    const slug = propertyData.slug;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      console.error("Invalid slug in property record");
      return NextResponse.json(
        { error: "Invalid property slug" },
        { status: 400 }
      );
    }

    const normalizedSlug = slug.toLowerCase().trim();

    // Step 3: Delete all R2 objects with prefix {slug}/
    const r2DeleteResult = await deleteR2ObjectsByPrefix(normalizedSlug);

    if (!r2DeleteResult.success) {
      console.error("Failed to delete R2 assets:", r2DeleteResult.error);
      console.warn(`Warning: Some R2 assets may not have been deleted: ${r2DeleteResult.error}`);
    }

    // Step 4: Delete the property record from the database
    const deletePromise = supabase
      .from("properties")
      .delete()
      .eq("id", id);

    const deleteTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { error: deleteError } = await Promise.race([deletePromise, deleteTimeoutPromise]) as any;

    if (deleteError) {
      console.error("Supabase error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete property from database" },
        { status: 500 }
      );
    }

    // Audit log
    await logAuditEntry({
      table_name: 'properties',
      operation: 'DELETE',
      record_id: id,
      user_id: user.id,
      user_email: user.email,
      old_values: oldValues,
      ...requestMetadata,
    });

    const duration = Date.now() - startTime;
    console.log(`Property deleted: ${id} (slug: ${normalizedSlug}, ${r2DeleteResult.deletedCount} assets, ${duration}ms)`);
    
    return NextResponse.json({ 
      success: true,
      deletedAssets: r2DeleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    
    if (error instanceof Error && error.message === 'Query timeout') {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
