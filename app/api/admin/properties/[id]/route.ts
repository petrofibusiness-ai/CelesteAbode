import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { supabaseToProperty, propertyToSupabase } from "@/lib/supabase-property-mapper";
import { deleteR2ObjectsByPrefix, deleteR2ObjectByKey, deriveR2KeyFromUrl } from "@/lib/r2-upload";

// GET - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

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
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Handle partial updates (e.g., just isPublished)
    // If only isPublished is being updated, handle it directly
    if (body.hasOwnProperty('isPublished') && Object.keys(body).length === 1) {
      // Only updating isPublished - no asset sync needed
      const updateData = {
        is_published: body.isPublished === true,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabaseAdmin
        .from("properties")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Failed to update property" },
          { status: 500 }
        );
      }

      const property = supabaseToProperty(data);
      return NextResponse.json({ property });
    }

    // Full update - implement asset synchronization
    // Step 1: Fetch existing property record
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingData) {
      console.error("Error fetching existing property:", fetchError);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const existingProperty = supabaseToProperty(existingData);
    console.log(`Starting asset sync for property: ${existingProperty.projectName} (${id})`);

    // Step 2: Extract existing asset URLs
    const existingAssets: string[] = [];
    
    // Hero image
    if (existingProperty.heroImage) {
      existingAssets.push(existingProperty.heroImage);
    }
    
    // Brochure
    if (existingProperty.brochureUrl) {
      existingAssets.push(existingProperty.brochureUrl);
    }
    
    // Gallery images
    if (existingProperty.images && Array.isArray(existingProperty.images)) {
      existingAssets.push(...existingProperty.images);
    }
    
    // Videos (src URLs)
    if (existingProperty.videos && Array.isArray(existingProperty.videos)) {
      existingProperty.videos.forEach((video) => {
        if (video.src) {
          existingAssets.push(video.src);
        }
      });
    }

    // Step 3: Extract updated asset URLs
    const updatedAssets: string[] = [];
    
    // Hero image
    if (body.heroImage) {
      updatedAssets.push(body.heroImage);
    }
    
    // Brochure
    if (body.brochureUrl) {
      updatedAssets.push(body.brochureUrl);
    }
    
    // Gallery images
    if (body.images && Array.isArray(body.images)) {
      updatedAssets.push(...body.images);
    }
    
    // Videos (src URLs)
    if (body.videos && Array.isArray(body.videos)) {
      body.videos.forEach((video: { src?: string }) => {
        if (video.src) {
          updatedAssets.push(video.src);
        }
      });
    }

    // Step 4: Detect removed assets (in old list but not in new list)
    const removedAssets = existingAssets.filter(
      (url) => !updatedAssets.includes(url)
    );

    console.log(`Asset sync: ${existingAssets.length} existing, ${updatedAssets.length} updated, ${removedAssets.length} removed`);

    // Step 5: Delete removed assets from R2
    const deletedCount = { count: 0 };
    const deletionErrors: string[] = [];

    for (const removedUrl of removedAssets) {
      // Only delete R2 assets (check if URL contains R2 domain or matches R2 pattern)
      const r2PublicUrl = process.env.R2_PUBLIC_URL || "";
      const isR2Asset = r2PublicUrl && removedUrl.includes(r2PublicUrl) || 
                       removedUrl.includes("r2.dev") || 
                       removedUrl.includes("r2.cloudflarestorage.com");

      if (isR2Asset) {
        const r2Key = deriveR2KeyFromUrl(removedUrl);
        if (r2Key) {
          console.log(`Deleting removed R2 asset: ${removedUrl} (key: ${r2Key})`);
          const deleteResult = await deleteR2ObjectByKey(r2Key);
          
          if (deleteResult.success) {
            deletedCount.count++;
            console.log(`Successfully deleted R2 asset: ${r2Key}`);
          } else {
            const errorMsg = `Failed to delete ${r2Key}: ${deleteResult.error}`;
            deletionErrors.push(errorMsg);
            console.error(errorMsg);
            // Continue with other deletions even if one fails
          }
        } else {
          console.warn(`Could not derive R2 key from URL: ${removedUrl}`);
        }
      } else {
        console.log(`Skipping non-R2 asset deletion: ${removedUrl}`);
      }
    }

    if (deletionErrors.length > 0) {
      console.warn(`Some asset deletions failed:`, deletionErrors);
    }

    if (deletedCount.count > 0) {
      console.log(`Successfully deleted ${deletedCount.count} removed assets from R2`);
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

    const { data, error } = await supabaseAdmin
      .from("properties")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update property" },
        { status: 500 }
      );
    }

    // Convert snake_case back to camelCase
    const property = supabaseToProperty(data);

    console.log(`Property update completed: ${property.projectName} (${deletedCount.count} assets deleted)`);

    return NextResponse.json({ 
      property,
      deletedAssets: deletedCount.count,
    });
  } catch (error) {
    console.error("Error updating property:", error);
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
  try {
    // Step 1: Verify authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;

    // Step 2: Fetch the property record to get the slug
    const { data: propertyData, error: fetchError } = await supabaseAdmin
      .from("properties")
      .select("slug")
      .eq("id", id)
      .single();

    if (fetchError || !propertyData) {
      console.error("Error fetching property:", fetchError);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Step 3: Extract and validate the slug
    const slug = propertyData.slug;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      console.error("Invalid slug in property record");
      return NextResponse.json(
        { error: "Invalid property slug" },
        { status: 400 }
      );
    }

    const normalizedSlug = slug.toLowerCase().trim();
    console.log(`Deleting property with slug: ${normalizedSlug}`);

    // Step 4: Delete all R2 objects with prefix {slug}/
    console.log(`Deleting R2 assets for property: ${normalizedSlug}`);
    const r2DeleteResult = await deleteR2ObjectsByPrefix(normalizedSlug);

    if (!r2DeleteResult.success) {
      console.error("Failed to delete R2 assets:", r2DeleteResult.error);
      // Continue with database deletion even if R2 deletion fails
      // This prevents orphaned database records
      // Log the error but don't block the deletion
      console.warn(`Warning: Some R2 assets may not have been deleted: ${r2DeleteResult.error}`);
    } else {
      console.log(`Successfully deleted ${r2DeleteResult.deletedCount} R2 objects`);
    }

    // Step 5: Delete the property record from the database
    const { error: deleteError } = await supabaseAdmin
      .from("properties")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete property from database" },
        { status: 500 }
      );
    }

    console.log(`Property ${id} (slug: ${normalizedSlug}) deleted successfully`);
    
    return NextResponse.json({ 
      success: true,
      deletedAssets: r2DeleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

