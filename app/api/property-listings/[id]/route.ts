import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isUuid } from "@/lib/uuid";

function getEditSecret(request: NextRequest): string | null {
  const env = process.env.PROPERTY_LISTINGS_EDIT_SECRET?.trim();
  if (!env) return null;
  const header = request.headers.get("x-ca-property-listings-edit-key")?.trim();
  const auth = request.headers.get("authorization");
  const bearer =
    auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  const token = header || bearer;
  return token === env ? env : null;
}

function parseBody(body: unknown): {
  priceMin: number | null;
  priceMax: number | null;
  priceUnit: string | null;
  sizes: string;
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
  const sizes =
    typeof o.sizes === "string" ? o.sizes.slice(0, 2000) : String(o.sizes ?? "").slice(0, 2000);

  if (priceMin !== null && Number.isNaN(priceMin)) return null;
  if (priceMax !== null && Number.isNaN(priceMax)) return null;

  return { priceMin, priceMax, priceUnit, sizes };
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const secretOk = getEditSecret(request);
    if (!process.env.PROPERTY_LISTINGS_EDIT_SECRET?.trim()) {
      return NextResponse.json(
        { error: "Editing is not configured (PROPERTY_LISTINGS_EDIT_SECRET)" },
        { status: 503 }
      );
    }
    if (!secretOk) {
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
      .from("properties_v2")
      .update({
        price_min: parsed.priceMin,
        price_max: parsed.priceMax,
        price_unit: parsed.priceUnit,
        sizes: parsed.sizes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("is_published", true)
      .select("id, slug, project_name, location, location_id, locality_id, property_type, hero_image, hero_image_alt, price_min, price_max, price_unit, sizes, amenities, created_at")
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
