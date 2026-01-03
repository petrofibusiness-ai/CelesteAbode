import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase-server";

/**
 * GET - List all localities for a given location_id
 * Returns: Array of {id, name, slug}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locationId: string }> }
) {
  try {
    // Strict authentication check
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    const { locationId } = await params;

    if (!locationId) {
      return NextResponse.json(
        { error: "Location ID is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("localities")
      .select("id, name, slug")
      .eq("location_id", locationId)
      .eq("is_published", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching localities:", error);
      return NextResponse.json(
        { error: "Failed to fetch localities" },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error in GET /api/admin/localities/by-location/[locationId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

