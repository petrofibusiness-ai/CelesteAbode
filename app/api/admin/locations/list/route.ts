import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase-server";

/**
 * GET - List all locations (for dropdowns)
 * Returns: Array of {id, location_name, slug}
 */
export async function GET(request: NextRequest) {
  try {
    // Strict authentication check
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("locations_v2")
      .select("id, location_name, slug")
      .order("location_name", { ascending: true });

    if (error) {
      console.error("Error fetching locations:", error);
      return NextResponse.json(
        { error: "Failed to fetch locations" },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error in GET /api/admin/locations/list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

