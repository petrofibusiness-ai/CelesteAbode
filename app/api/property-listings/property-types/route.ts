import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { isUuid } from "@/lib/uuid";

const MAX_ROWS = 3000;

export async function GET(request: NextRequest) {
  try {
    const rateLimitId = getRateLimitIdentifier(request);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.error },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
          },
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    let locationId = searchParams.get("locationId");
    const localityId = searchParams.get("localityId");

    if (locationId && !isUuid(locationId)) {
      return NextResponse.json({ error: "Invalid locationId" }, { status: 400 });
    }
    if (localityId && !isUuid(localityId)) {
      return NextResponse.json({ error: "Invalid localityId" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();

    if (localityId && !locationId) {
      const { data: locRow, error: locErr } = await supabase
        .from("localities")
        .select("location_id")
        .eq("id", localityId)
        .eq("is_published", true)
        .maybeSingle();

      if (locErr || !locRow?.location_id) {
        return NextResponse.json({ error: "Locality not found" }, { status: 404 });
      }
      locationId = locRow.location_id;
    }

    let q = supabase
      .from("properties_v3")
      .select("property_type")
      .eq("is_published", true)
      .not("property_type", "is", null)
      .range(0, MAX_ROWS - 1);

    if (locationId) q = q.eq("location_id", locationId);
    if (localityId) q = q.eq("locality_id", localityId);

    const { data, error } = await q;

    if (error) {
      console.error("property-types:", error);
      return NextResponse.json({ error: "Failed to load types" }, { status: 500 });
    }

    const set = new Set<string>();
    for (const row of data || []) {
      const t = (row as { property_type: string | null }).property_type?.trim();
      if (t) set.add(t);
    }
    const types = [...set].sort((a, b) => a.localeCompare(b));

    return NextResponse.json(types, {
      headers: {
        "Cache-Control": "private, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    console.error("GET /api/property-listings/property-types:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
