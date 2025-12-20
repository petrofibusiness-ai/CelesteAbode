import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";

// GET - Get property by slug (public endpoint, only returns published properties)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const { slug } = await params;

    if (!slug || slug.trim() === "") {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // Fetch property from Supabase - only published properties
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("slug", slug.toLowerCase().trim())
      .eq("is_published", true) // Only published properties
      .single();

    if (error || !data) {
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

