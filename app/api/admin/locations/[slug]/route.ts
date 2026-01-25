import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { locationToSupabase, supabaseToLocation } from "@/lib/supabase-location-mapper";
import { Location } from "@/types/location";
import { verifyCSRFToken } from "@/lib/csrf";
import { logSecurityEvent, getClientIP, getUserAgent } from "@/lib/security-events";

const QUERY_TIMEOUT = 30000;

// GET - Get single location by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Strict authentication check
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    const { slug } = await params;
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("locations_v2")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Fetch localities from localities table
    const { data: localitiesData, error: localitiesError } = await supabase
      .from("localities")
      .select("id, slug, name")
      .eq("location_id", data.id)
      .order("name", { ascending: true });

    if (localitiesError) {
      console.error("Error fetching localities:", localitiesError);
      // Continue even if localities fetch fails
    }

    const location = supabaseToLocation(data);
    
    // Map localities from database to Locality format (value=slug, label=name)
    location.localities = (localitiesData || []).map((loc) => ({
      value: loc.slug,
      label: loc.name,
    }));

    return NextResponse.json(location);
  } catch (error) {
    console.error("Error in GET /api/admin/locations/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update location
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Strict authentication check
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    // CSRF token validation
    const csrfToken = request.headers.get('x-csrf-token');
    const isValidCSRF = await verifyCSRFToken(csrfToken);

    if (!isValidCSRF) {
      await logSecurityEvent('CSRF_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/locations/[slug]',
      });

      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      );
    }

    const { slug } = await params;
    const body = await request.json();

    const supabase = getSupabaseAdminClient();

    // First, get the location ID
    const { data: existingLocation, error: fetchError } = await supabase
      .from("locations_v2")
      .select("id")
      .eq("slug", slug)
      .single();

    if (fetchError || !existingLocation) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const locationId = existingLocation.id;

    // Prepare update data (excluding localities - handled separately)
    const updateData: Partial<Location> = {};
    
    if (body.locationName !== undefined) updateData.locationName = body.locationName.trim();
    if (body.heroImage !== undefined) updateData.heroImage = body.heroImage.trim();
    if (body.heroText !== undefined) updateData.heroText = body.heroText.trim();
    if (body.heroSubtext !== undefined) updateData.heroSubtext = body.heroSubtext.trim();
    if (body.exploreSectionHeading !== undefined) updateData.exploreSectionHeading = body.exploreSectionHeading.trim();
    if (body.exploreSectionDescription !== undefined) updateData.exploreSectionDescription = body.exploreSectionDescription.trim();
    // localities handled separately below
    if (body.whyInvestContent !== undefined) updateData.whyInvestContent = Array.isArray(body.whyInvestContent) ? body.whyInvestContent : [];
    if (body.celesteAbodeImage !== undefined) updateData.celesteAbodeImage = body.celesteAbodeImage.trim();
    if (body.faqs !== undefined) updateData.faqs = Array.isArray(body.faqs) ? body.faqs : [];
    if (body.footerCtaHeading !== undefined) updateData.footerCtaHeading = body.footerCtaHeading.trim();
    if (body.footerCtaDescription !== undefined) updateData.footerCtaDescription = body.footerCtaDescription.trim();
    if (body.metaTitle !== undefined) updateData.metaTitle = body.metaTitle.trim();
    if (body.metaDescription !== undefined) updateData.metaDescription = body.metaDescription.trim();
    if (body.metaKeywords !== undefined) updateData.metaKeywords = Array.isArray(body.metaKeywords) ? body.metaKeywords : [];
    if (body.ogImage !== undefined) updateData.ogImage = body.ogImage.trim();
    if (body.ogTitle !== undefined) updateData.ogTitle = body.ogTitle.trim();
    if (body.ogDescription !== undefined) updateData.ogDescription = body.ogDescription.trim();
    if (body.imageAltTexts !== undefined) updateData.imageAltTexts = body.imageAltTexts;
    if (body.isPublished !== undefined) updateData.isPublished = body.isPublished === true;

    const supabaseLocation = locationToSupabase(updateData);

    // STEP 1: Update location in locations_v2
    const updatePromise = supabase
      .from("locations_v2")
      .update(supabaseLocation)
      .eq("slug", slug)
      .select()
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([updatePromise, timeoutPromise]) as any;

    if (error) {
      console.error("Error updating location:", error);
      return NextResponse.json(
        { error: "Failed to update location" },
        { status: 500 }
      );
    }

    // STEP 2: Handle localities update (if provided)
    if (body.localities !== undefined) {
      const localitiesToSync = Array.isArray(body.localities) ? body.localities : [];

      // Validate localities data structure
      for (let i = 0; i < localitiesToSync.length; i++) {
        const locality = localitiesToSync[i];
        if (!locality.value || !locality.label) {
          return NextResponse.json(
            { error: `Locality ${i + 1} is missing slug (value) or name (label)` },
            { status: 400 }
          );
        }
        if (typeof locality.value !== 'string' || typeof locality.label !== 'string') {
          return NextResponse.json(
            { error: `Locality ${i + 1} has invalid slug or name type` },
            { status: 400 }
          );
        }
      }

      // Get existing localities
      const { data: existingLocalities } = await supabase
        .from("localities")
        .select("id, slug")
        .eq("location_id", locationId);

      const existingSlugs = new Set((existingLocalities || []).map(l => l.slug));
      const newSlugs = new Set(localitiesToSync.map((l: { value: string }) => l.value.trim().toLowerCase()));

      // Delete localities that are no longer in the list
      const slugsToDelete = Array.from(existingSlugs).filter(slug => !newSlugs.has(slug));
      if (slugsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from("localities")
          .delete()
          .eq("location_id", locationId)
          .in("slug", slugsToDelete);

        if (deleteError) {
          console.error("Error deleting localities:", deleteError);
          // Continue - don't fail the entire update
        }
      }

      // Insert or update localities
      const localitiesToInsert = localitiesToSync.map((locality: { value: string; label: string }) => ({
        location_id: locationId,
        slug: locality.value.trim().toLowerCase(),
        name: locality.label.trim(),
        is_published: true,
      }));

      // Use upsert to handle both inserts and updates
      // Note: This will fail if slug uniqueness constraint is violated for the same location
      const { error: localitiesError } = await supabase
        .from("localities")
        .upsert(localitiesToInsert, {
          onConflict: "location_id,slug",
          ignoreDuplicates: false,
        });

      if (localitiesError) {
        console.error("Error syncing localities:", localitiesError);
        
        if (localitiesError.code === '23505') { // Unique violation
          return NextResponse.json(
            { error: "Failed to update localities: A locality with this slug already exists for this location" },
            { status: 409 }
          );
        }

        // Don't fail the entire update if localities sync fails
        console.warn("Location updated but localities sync had errors:", localitiesError.message);
      }
    }

    // Fetch updated location with localities
    const { data: updatedLocationData } = await supabase
      .from("locations_v2")
      .select("*")
      .eq("slug", slug)
      .single();

    const { data: localitiesData } = await supabase
      .from("localities")
      .select("id, slug, name")
      .eq("location_id", locationId)
      .order("name", { ascending: true });

    const updatedLocation = supabaseToLocation(updatedLocationData);
    updatedLocation.localities = (localitiesData || []).map((loc) => ({
      value: loc.slug,
      label: loc.name,
    }));

    return NextResponse.json(updatedLocation);
  } catch (error) {
    console.error("Error in PUT /api/admin/locations/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete location and associated localities
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Strict authentication check
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    // CSRF token validation
    const csrfToken = request.headers.get('x-csrf-token');
    const isValidCSRF = await verifyCSRFToken(csrfToken);

    if (!isValidCSRF) {
      await logSecurityEvent('CSRF_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/locations/[slug]',
      });

      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      );
    }

    const { slug } = await params;
    const supabase = getSupabaseAdminClient();

    // Step 1: Fetch the location to get its ID
    const { data: locationData, error: fetchError } = await supabase
      .from("locations_v2")
      .select("id")
      .eq("slug", slug)
      .single();

    if (fetchError || !locationData) {
      console.error("Error fetching location:", fetchError);
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const locationId = locationData.id;

    // Step 2: Check if any properties are using this location
    const { data: propertiesUsingLocation, error: checkError } = await supabase
      .from("properties_v2")
      .select("id, project_name, is_published")
      .eq("location_id", locationId)
      .limit(5);

    if (checkError) {
      console.error("Error checking properties:", checkError);
    }

    if (propertiesUsingLocation && propertiesUsingLocation.length > 0) {
      const remainingCount = propertiesUsingLocation.length === 5 ? "5 or more" : propertiesUsingLocation.length.toString();
      const publishedCount = propertiesUsingLocation.filter(p => p.is_published).length;
      const unpublishedCount = propertiesUsingLocation.length - publishedCount;
      
      let errorMessage = `Cannot delete this location. It is currently being used by ${remainingCount} ${propertiesUsingLocation.length === 1 ? 'property' : 'properties'}`;
      
      if (publishedCount > 0 && unpublishedCount > 0) {
        errorMessage += ` (${publishedCount} published, ${unpublishedCount} unpublished)`;
      } else if (publishedCount > 0) {
        errorMessage += ` (${publishedCount} published)`;
      } else if (unpublishedCount > 0) {
        errorMessage += ` (${unpublishedCount} unpublished)`;
      }
      
      errorMessage += ". Please remove or reassign the properties first.";
      
      return NextResponse.json(
        { 
          error: errorMessage,
          properties: propertiesUsingLocation.map(p => ({ 
            id: p.id, 
            name: p.project_name,
            isPublished: p.is_published 
          }))
        },
        { status: 400 }
      );
    }

    // Step 3: Delete all localities associated with this location
    const { error: localitiesDeleteError, data: deletedLocalities } = await supabase
      .from("localities")
      .delete()
      .eq("location_id", locationId)
      .select("*");
    
    const deletedLocalitiesCount = deletedLocalities?.length || 0;

    if (localitiesDeleteError) {
      console.error("Error deleting localities:", localitiesDeleteError);
      
      // Check if it's a foreign key constraint violation
      if (localitiesDeleteError.code === '23503' && localitiesDeleteError.message?.includes('properties_v2')) {
        return NextResponse.json(
          { 
            error: "Cannot delete this location. Some localities are still being used by properties. Please remove or reassign those properties first."
          },
          { status: 400 }
        );
      }
      
      // Continue with location deletion even if localities deletion fails
      // (some localities might not exist, which is fine)
    } else {
    }

    // Step 4: Delete the location itself
    const { error: locationDeleteError } = await supabase
      .from("locations_v2")
      .delete()
      .eq("slug", slug);

    if (locationDeleteError) {
      console.error("Error deleting location:", locationDeleteError);
      
      // Check if it's a foreign key constraint violation
      if (locationDeleteError.code === '23503' && locationDeleteError.message?.includes('properties_v2')) {
        return NextResponse.json(
          { 
            error: "Cannot delete this location. It is still being used by one or more properties. Please remove or reassign those properties first."
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to delete location" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      deletedLocalities: deletedLocalitiesCount || 0
    });
  } catch (error) {
    console.error("Error in DELETE /api/admin/locations/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

