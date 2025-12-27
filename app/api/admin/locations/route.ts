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
      .from("locations")
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

    // Prepare location data
    const location: Omit<Location, "id" | "createdAt" | "updatedAt"> = {
      slug: body.slug.trim().toLowerCase(),
      locationName: body.locationName.trim(),
      heroImage: body.heroImage.trim(),
      heroText: body.heroText.trim(),
      heroSubtext: body.heroSubtext.trim(),
      exploreSectionHeading: body.exploreSectionHeading?.trim() || "Explore Our Curated Collection",
      exploreSectionDescription: body.exploreSectionDescription?.trim() || "RERA-compliant projects with verified credentials and transparent documentation",
      localities: Array.isArray(body.localities) ? body.localities : [],
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

    // Convert camelCase to snake_case for Supabase
    const supabaseLocation = locationToSupabase(location);

    const supabase = getSupabaseAdminClient();

    // Insert into Supabase with timeout protection
    const insertPromise = supabase
      .from("locations")
      .insert([supabaseLocation])
      .select()
      .single();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    const { data, error } = await Promise.race([insertPromise, timeoutPromise]) as any;

    if (error) {
      console.error("Error creating location:", error);
      
      if (error.code === '23505') { // Unique violation
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

    const createdLocation = supabaseToLocation(data);
    return NextResponse.json(createdLocation, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/admin/locations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

