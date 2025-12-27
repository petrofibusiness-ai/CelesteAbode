import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToLocation } from "@/lib/supabase-location-mapper";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
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
    console.error("Error in GET /api/locations/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

