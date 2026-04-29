import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isPropertyListingsEditAuthorized } from "@/lib/property-listings-edit-auth";
import { isUuid } from "@/lib/uuid";
import {
  isValidInventoryDigitsOrEmpty,
  isValidInventoryPriceText,
  MAX_INVENTORY_PRICE_CR_LENGTH,
} from "@/lib/property-listings-price";

const MAX_FIELD = 2000;

function parseBody(body: unknown): { sizeSqft: string; configuration: string; priceCr: string } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const sizeSqft =
    typeof o.sizeSqft === "string" ? o.sizeSqft.slice(0, MAX_FIELD) : String(o.sizeSqft ?? "").slice(0, MAX_FIELD);
  const configuration =
    typeof o.configuration === "string"
      ? o.configuration.trim().slice(0, 200)
      : String(o.configuration ?? "")
          .trim()
          .slice(0, 200);
  const priceCr =
    typeof o.priceCr === "string"
      ? o.priceCr.slice(0, MAX_INVENTORY_PRICE_CR_LENGTH)
      : String(o.priceCr ?? "").slice(0, MAX_INVENTORY_PRICE_CR_LENGTH);
  return { sizeSqft, configuration, priceCr };
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

    if (!parsed.priceCr.trim()) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }
    if (!isValidInventoryPriceText(parsed.priceCr)) {
      return NextResponse.json(
        { error: `Price must be non-empty and at most ${MAX_INVENTORY_PRICE_CR_LENGTH} characters` },
        { status: 400 }
      );
    }
    if (!isValidInventoryDigitsOrEmpty(parsed.sizeSqft)) {
      return NextResponse.json({ error: "Size must be digits only when set" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("property_inventory_dashboard_rows")
      .select("line_id, property_id")
      .eq("line_id", id)
      .maybeSingle();

    if (fetchErr) {
      console.error("PATCH property-listings/configurations fetch:", fetchErr);
      return NextResponse.json({ error: "Lookup failed", details: fetchErr.message }, { status: 500 });
    }
    if (!existing?.property_id) {
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
    }

    const { error } = await supabase
      .from("property_inventory_dashboard_rows")
      .update({
        size_sqft: parsed.sizeSqft,
        configuration_label: parsed.configuration,
        price_cr: parsed.priceCr,
      })
      .eq("line_id", id);

    if (error) {
      console.error("PATCH property-listings/configurations:", error);
      return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error("PATCH /api/property-listings/configurations/[id]:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
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

    const supabase = getSupabaseAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("property_inventory_dashboard_rows")
      .select("line_id, property_id")
      .eq("line_id", id)
      .maybeSingle();

    if (fetchErr) {
      console.error("DELETE property-listings/configurations fetch:", fetchErr);
      return NextResponse.json({ error: "Lookup failed", details: fetchErr.message }, { status: 500 });
    }
    if (!existing?.property_id) {
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
    }

    const { error } = await supabase
      .from("property_inventory_dashboard_rows")
      .delete()
      .eq("line_id", id);

    if (error) {
      console.error("DELETE property-listings/configurations:", error);
      return NextResponse.json({ error: "Delete failed", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error("DELETE /api/property-listings/configurations/[id]:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
