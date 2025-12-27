import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { locationToSupabase, supabaseToLocation } from "@/lib/supabase-location-mapper";
import { Location } from "@/types/location";

const QUERY_TIMEOUT = 30000;

// GET - Get single location by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const location = supabaseToLocation(data);
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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    // Prepare update data
    const updateData: Partial<Location> = {};
    
    if (body.locationName !== undefined) updateData.locationName = body.locationName.trim();
    if (body.heroImage !== undefined) updateData.heroImage = body.heroImage.trim();
    if (body.heroText !== undefined) updateData.heroText = body.heroText.trim();
    if (body.heroSubtext !== undefined) updateData.heroSubtext = body.heroSubtext.trim();
    if (body.exploreSectionHeading !== undefined) updateData.exploreSectionHeading = body.exploreSectionHeading.trim();
    if (body.exploreSectionDescription !== undefined) updateData.exploreSectionDescription = body.exploreSectionDescription.trim();
    if (body.localities !== undefined) updateData.localities = Array.isArray(body.localities) ? body.localities : [];
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

    const supabase = getSupabaseAdminClient();

    const updatePromise = supabase
      .from("locations")
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

    const updatedLocation = supabaseToLocation(data);
    return NextResponse.json(updatedLocation);
  } catch (error) {
    console.error("Error in PUT /api/admin/locations/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete location
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from("locations")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("Error deleting location:", error);
      return NextResponse.json(
        { error: "Failed to delete location" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/admin/locations/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

