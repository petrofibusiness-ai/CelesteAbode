import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isPropertyListingsEditAuthorized } from "@/lib/property-listings-edit-auth";
import { isUuid } from "@/lib/uuid";
import { isValidInventoryDigitsOrEmpty } from "@/lib/property-listings-price";

const MAX_POSSESSION = 200;
const MAX_TOWERS = 20;

function parseBody(body: unknown): { inventoryTowers: string; possessionDate: string } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const inventoryTowers =
    typeof o.inventoryTowers === "string"
      ? o.inventoryTowers.trim().slice(0, MAX_TOWERS)
      : String(o.inventoryTowers ?? "")
          .trim()
          .slice(0, MAX_TOWERS);
  const possessionDate =
    typeof o.possessionDate === "string"
      ? o.possessionDate.trim().slice(0, MAX_POSSESSION)
      : String(o.possessionDate ?? "")
          .trim()
          .slice(0, MAX_POSSESSION);
  return { inventoryTowers, possessionDate };
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ propertyId: string }> }
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

    const { propertyId } = await context.params;
    if (!isUuid(propertyId)) {
      return NextResponse.json({ error: "Invalid property id" }, { status: 400 });
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

    if (!isValidInventoryDigitsOrEmpty(parsed.inventoryTowers)) {
      return NextResponse.json({ error: "Towers must be digits only when set" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { data: prop, error: propErr } = await supabase
      .from("properties_v2")
      .select("id")
      .eq("id", propertyId)
      .eq("is_published", true)
      .maybeSingle();

    if (propErr) {
      console.error("PATCH property-listings/properties lookup:", propErr);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }
    if (!prop) {
      return NextResponse.json({ error: "Property not found or unpublished" }, { status: 404 });
    }

    const { error } = await supabase
      .from("properties_v2")
      .update({
        inventory_towers: parsed.inventoryTowers,
        possession_date: parsed.possessionDate || null,
      })
      .eq("id", propertyId);

    if (error) {
      console.error("PATCH property-listings/properties update:", error);
      return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, propertyId });
  } catch (e) {
    console.error("PATCH /api/property-listings/properties/[propertyId]:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
