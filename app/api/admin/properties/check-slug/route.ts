import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Check if a slug already exists in the database
 * GET /api/admin/properties/check-slug?slug=example-slug&excludeId=uuid
 */
export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const excludeId = searchParams.get("excludeId"); // For edit mode, exclude current property

    if (!slug || slug.trim() === "") {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Normalize slug (lowercase, trim)
    const normalizedSlug = slug.trim().toLowerCase();

    // Query to check if slug exists
    let query = supabaseAdmin
      .from("properties")
      .select("id, slug, project_name")
      .eq("slug", normalizedSlug);

    // If excludeId is provided (for edit mode), exclude that property
    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to check slug availability" },
        { status: 500 }
      );
    }

    // If data exists, slug is taken
    if (data) {
      return NextResponse.json({
        available: false,
        slug: normalizedSlug,
        existingProperty: {
          id: data.id,
          slug: data.slug,
          projectName: data.project_name,
        },
      });
    }

    // Slug is available
    return NextResponse.json({
      available: true,
      slug: normalizedSlug,
    });
  } catch (error) {
    console.error("Error checking slug:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

