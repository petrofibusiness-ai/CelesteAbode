import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isPropertyListingsEditAuthorized } from "@/lib/property-listings-edit-auth";
import { isUuid } from "@/lib/uuid";

function parseBody(body: unknown): {
  priceMin: number | null;
  priceMax: number | null;
  priceUnit: string | null;
} | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const priceMin =
    o.priceMin === null || o.priceMin === undefined
      ? null
      : typeof o.priceMin === "number"
        ? o.priceMin
        : typeof o.priceMin === "string" && o.priceMin.trim() !== ""
          ? Number(o.priceMin)
          : null;
  const priceMax =
    o.priceMax === null || o.priceMax === undefined
      ? null
      : typeof o.priceMax === "number"
        ? o.priceMax
        : typeof o.priceMax === "string" && o.priceMax.trim() !== ""
          ? Number(o.priceMax)
          : null;
  const priceUnit =
    o.priceUnit === null || o.priceUnit === undefined
      ? null
      : String(o.priceUnit).trim().slice(0, 500) || null;

  if (priceMin !== null && Number.isNaN(priceMin)) return null;
  if (priceMax !== null && Number.isNaN(priceMax)) return null;

  return { priceMin, priceMax, priceUnit };
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.PROPERTY_LISTINGS_EDIT_SECRET?.trim()) {
      return NextResponse.json(
        { error: "Editing is not configured (PROPERTY_LISTINGS_EDIT_SECRET)" },
        { status: 503 }
      );
    }
    if (!isPropertyListingsEditAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    if (!isUuid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = parseBody(json);
    if (!parsed) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("properties_v3")
      .update({
        price_min: parsed.priceMin,
        price_max: parsed.priceMax,
        price_unit: parsed.priceUnit,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("is_published", true)
      .select("id, slug, project_name, location, location_id, locality_id, property_type, hero_image, hero_image_alt, price_min, price_max, price_unit, amenities, created_at")
      .maybeSingle();

    if (error) {
      console.error("PATCH property-listings:", error);
      return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (e) {
    console.error("PATCH /api/property-listings/[id]:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
