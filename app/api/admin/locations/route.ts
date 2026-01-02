import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { locationToSupabase, supabaseToLocation } from "@/lib/supabase-location-mapper";
import { Location } from "@/types/location";

const QUERY_TIMEOUT = 30000; // 30 seconds

// GET - List all locations
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("locations_v2")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching locations:", error);
      return NextResponse.json(
        { error: "Failed to fetch locations" },
        { status: 500 }
      );
    }

    const locations = (data || []).map(supabaseToLocation);
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error in GET /api/admin/locations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new location
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.slug || !body.locationName || !body.heroImage || !body.heroText || !body.heroSubtext || !body.metaTitle || !body.metaDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract localities from body (they will be created separately)
    const localitiesToCreate = Array.isArray(body.localities) ? body.localities : [];

    // Prepare location data (without localities - they're stored in separate table)
    const location: Omit<Location, "id" | "createdAt" | "updatedAt"> = {
      slug: body.slug.trim().toLowerCase(),
      locationName: body.locationName.trim(),
      heroImage: body.heroImage.trim(),
      heroText: body.heroText.trim(),
      heroSubtext: body.heroSubtext.trim(),
      exploreSectionHeading: body.exploreSectionHeading?.trim() || "Explore Our Curated Collection",
      exploreSectionDescription: body.exploreSectionDescription?.trim() || "RERA-compliant projects with verified credentials and transparent documentation",
      localities: [], // Not stored in locations_v2 - stored in localities table
      whyInvestContent: Array.isArray(body.whyInvestContent) ? body.whyInvestContent : [],
      celesteAbodeImage: body.celesteAbodeImage?.trim() || body.heroImage.trim(),
      faqs: Array.isArray(body.faqs) ? body.faqs : [],
      footerCtaHeading: body.footerCtaHeading?.trim() || "Ready to Find Your Home",
      footerCtaDescription: body.footerCtaDescription?.trim(),
      metaTitle: body.metaTitle.trim(),
      metaDescription: body.metaDescription.trim(),
      metaKeywords: Array.isArray(body.metaKeywords) ? body.metaKeywords : [],
      ogImage: body.ogImage?.trim() || body.heroImage.trim(),
      ogTitle: body.ogTitle?.trim() || body.metaTitle.trim(),
      ogDescription: body.ogDescription?.trim() || body.metaDescription.trim(),
      imageAltTexts: body.imageAltTexts || {},
      isPublished: body.isPublished === true,
    };

    // Validate hero image URL
    if (!location.heroImage || !location.heroImage.startsWith('http')) {
      return NextResponse.json(
        { error: "Hero image must be a valid URL" },
        { status: 400 }
      );
    }

    // Validate localities data structure
    for (let i = 0; i < localitiesToCreate.length; i++) {
      const locality = localitiesToCreate[i];
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

    // Convert camelCase to snake_case for Supabase
    const supabaseLocation = locationToSupabase(location);

    const supabase = getSupabaseAdminClient();

    // STEP 1: Create location in locations_v2 first
    const insertPromise = supabase
      .from("locations_v2")
      .insert([supabaseLocation])
      .select()
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data: locationData, error: locationError } = await Promise.race([insertPromise, timeoutPromise]) as any;

    if (locationError) {
      console.error("Error creating location:", locationError);
      
      if (locationError.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: "A location with this slug already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create location" },
        { status: 500 }
      );
    }

    if (!locationData || !locationData.id) {
      return NextResponse.json(
        { error: "Location created but no ID returned" },
        { status: 500 }
      );
    }

    const locationId = locationData.id;

    // STEP 2: Create localities in localities table (only if location was created successfully)
    if (localitiesToCreate.length > 0) {
      const localitiesData = localitiesToCreate.map((locality: { value: string; label: string }) => ({
        location_id: locationId,
        slug: locality.value.trim().toLowerCase(),
        name: locality.label.trim(),
        is_published: true, // Default to published
      }));

      const localitiesInsertPromise = supabase
        .from("localities")
        .insert(localitiesData)
        .select();

      const localitiesTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
      });

      const { data: createdLocalities, error: localitiesError } = await Promise.race([
        localitiesInsertPromise,
        localitiesTimeoutPromise
      ]) as any;

      if (localitiesError) {
        console.error("Error creating localities:", localitiesError);
        
        // Location was created but localities failed
        // Note: In production, you might want to delete the location here or use a transaction
        // For now, we'll report the error but the location exists
        
        if (localitiesError.code === '23505') { // Unique violation
          return NextResponse.json(
            { 
              error: "Location created but failed to create localities: A locality with this slug already exists for this location",
              locationId: locationId,
              details: "Location was created successfully. Please edit it to add localities manually."
            },
            { status: 409 }
          );
        }

        return NextResponse.json(
          { 
            error: "Location created but failed to create localities",
            locationId: locationId,
            details: localitiesError.message || "Please edit the location to add localities manually."
          },
          { status: 500 }
        );
      }

    }

    const createdLocation = supabaseToLocation(locationData);
    return NextResponse.json(createdLocation, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/admin/locations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

