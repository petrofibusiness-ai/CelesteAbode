import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Get dashboard statistics
export async function GET() {
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

    // Fetch all properties
    const { data: allProperties, error: allError } = await supabaseAdmin
      .from("properties")
      .select("is_published");

    if (allError) {
      console.error("Supabase error:", allError);
      return NextResponse.json(
        { error: "Failed to fetch statistics" },
        { status: 500 }
      );
    }

    // Calculate statistics
    const totalProperties = allProperties?.length || 0;
    const publishedProperties = allProperties?.filter((p) => p.is_published === true).length || 0;
    const draftProperties = allProperties?.filter((p) => p.is_published === false).length || 0;

    return NextResponse.json({
      totalProperties,
      publishedProperties,
      draftProperties,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

