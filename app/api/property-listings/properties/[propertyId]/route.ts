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
    const { data: exists, error: lookupErr } = await supabase
      .from("property_inventory_dashboard_rows")
      .select("property_id")
      .eq("property_id", propertyId)
      .limit(1)
      .maybeSingle();
    if (lookupErr) {
      console.error("PATCH property-listings/properties lookup:", lookupErr);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }

    if (exists) {
      const { error } = await supabase
        .from("property_inventory_dashboard_rows")
        .update({
          inventory_towers: parsed.inventoryTowers,
          possession_date: parsed.possessionDate || null,
        })
        .eq("property_id", propertyId);

      if (error) {
        console.error("PATCH property-listings/properties update:", error);
        return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, propertyId, updated: "dashboard_rows" as const });
    }

    /** No dashboard rows yet (e.g. list shows synthetic row from `properties_v3`). */
    const { data: pv3, error: v3Err } = await supabase
      .from("properties_v3")
      .select("id")
      .eq("id", propertyId)
      .maybeSingle();
    if (v3Err) {
      console.error("PATCH property-listings/properties properties_v3:", v3Err);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }
    if (!pv3) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const { error: v3UpdateErr } = await supabase
      .from("properties_v3")
      .update({
        inventory_towers: parsed.inventoryTowers,
        possession_date: parsed.possessionDate || null,
      })
      .eq("id", propertyId);

    if (v3UpdateErr) {
      console.error("PATCH property-listings/properties properties_v3 update:", v3UpdateErr);
      return NextResponse.json({ error: "Update failed", details: v3UpdateErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, propertyId, updated: "properties_v3" as const });
  } catch (e) {
    console.error("PATCH /api/property-listings/properties/[propertyId]:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
