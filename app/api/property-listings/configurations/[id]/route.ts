import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isPropertyListingsEditAuthorized } from "@/lib/property-listings-edit-auth";
import { isUuid } from "@/lib/uuid";
import { isValidInventoryDigitsOrEmpty, isValidInventoryPriceDigits } from "@/lib/property-listings-price";

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
    typeof o.priceCr === "string" ? o.priceCr.slice(0, 120) : String(o.priceCr ?? "").slice(0, 120);
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
    if (!isValidInventoryPriceDigits(parsed.priceCr)) {
      return NextResponse.json({ error: "Price must be digits only" }, { status: 400 });
    }
    if (!isValidInventoryDigitsOrEmpty(parsed.sizeSqft)) {
      return NextResponse.json({ error: "Size must be digits only when set" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("property_listing_configurations")
      .select("id, property_id")
      .eq("id", id)
      .maybeSingle();

    if (fetchErr) {
      console.error("PATCH property-listings/configurations fetch:", fetchErr);
      return NextResponse.json({ error: "Lookup failed", details: fetchErr.message }, { status: 500 });
    }
    if (!existing?.property_id) {
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
    }

    const { data: prop, error: propErr } = await supabase
      .from("properties_v2")
      .select("id")
      .eq("id", existing.property_id)
      .eq("is_published", true)
      .maybeSingle();

    if (propErr) {
      console.error("PATCH property-listings/configurations property:", propErr);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }
    if (!prop) {
      return NextResponse.json({ error: "Property not found or unpublished" }, { status: 404 });
    }

    const { error } = await supabase
      .from("property_listing_configurations")
      .update({
        size_sqft: parsed.sizeSqft,
        configuration: parsed.configuration,
        price_cr: parsed.priceCr,
      })
      .eq("id", id);

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
      .from("property_listing_configurations")
      .select("id, property_id")
      .eq("id", id)
      .maybeSingle();

    if (fetchErr) {
      console.error("DELETE property-listings/configurations fetch:", fetchErr);
      return NextResponse.json({ error: "Lookup failed", details: fetchErr.message }, { status: 500 });
    }
    if (!existing?.property_id) {
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
    }

    const { data: prop, error: propErr } = await supabase
      .from("properties_v2")
      .select("id")
      .eq("id", existing.property_id)
      .eq("is_published", true)
      .maybeSingle();

    if (propErr) {
      console.error("DELETE property-listings/configurations property:", propErr);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }
    if (!prop) {
      return NextResponse.json({ error: "Property not found or unpublished" }, { status: 404 });
    }

    const propertyId = existing.property_id;
    const { count, error: countErr } = await supabase
      .from("property_listing_configurations")
      .select("id", { count: "exact", head: true })
      .eq("property_id", propertyId);

    if (countErr) {
      console.error("DELETE property-listings/configurations count:", countErr);
      return NextResponse.json({ error: "Count failed", details: countErr.message }, { status: 500 });
    }

    const n = count ?? 0;
    // Never remove the last line for a project — the dashboard only lists properties that have ≥1
    // configuration row. Clearing price should drop that quote line only; the project stays visible.
    if (n <= 1) {
      const { error } = await supabase
        .from("property_listing_configurations")
        .update({
          configuration: "",
          size_sqft: "",
          price_cr: "",
          sort_order: 0,
        })
        .eq("id", id);

      if (error) {
        console.error("DELETE property-listings/configurations (clear last row):", error);
        return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, id, clearedInPlace: true });
    }

    const { error } = await supabase.from("property_listing_configurations").delete().eq("id", id);

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
