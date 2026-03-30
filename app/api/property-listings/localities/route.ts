import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import type { PropertyListingLocalityOption } from "@/types/property-listing";
import { isUuid } from "@/lib/uuid";

export async function GET(request: NextRequest) {
  try {
    const rateLimitId = getRateLimitIdentifier(request);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.error },
        { status: 429 }
      );
    }

    const locationId = request.nextUrl.searchParams.get("locationId");
    if (!locationId || !isUuid(locationId)) {
      return NextResponse.json({ error: "locationId is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("localities")
      .select("id, slug, name")
      .eq("location_id", locationId)
      .eq("is_published", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("property-listings/localities:", error);
      return NextResponse.json({ error: "Failed to fetch localities" }, { status: 500 });
    }

    const mapped: PropertyListingLocalityOption[] = (data || []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
    }));

    return NextResponse.json(mapped, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (e) {
    console.error("GET /api/property-listings/localities:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
