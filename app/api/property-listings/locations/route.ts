import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import type { PropertyListingLocationOption } from "@/types/property-listing";

let cache: { data: PropertyListingLocationOption[]; expires: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

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

    const now = Date.now();
    if (cache && cache.expires > now) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "HIT",
        },
      });
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("locations_v2")
      .select("id, slug, location_name")
      .eq("is_published", true)
      .order("location_name", { ascending: true });

    if (error) {
      console.error("property-listings/locations:", error);
      return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }

    const mapped: PropertyListingLocationOption[] = (data || []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: row.location_name,
    }));

    cache = { data: mapped, expires: now + TTL_MS };

    return NextResponse.json(mapped, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "MISS",
      },
    });
  } catch (e) {
    console.error("GET /api/property-listings/locations:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
