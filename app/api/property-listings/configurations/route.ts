import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isPropertyListingsEditAuthorized } from "@/lib/property-listings-edit-auth";
import { isUuid } from "@/lib/uuid";
import type { PropertyInventoryRow } from "@/types/property-listing";
import { isValidInventoryDigitsOrEmpty, isValidInventoryPriceDigits } from "@/lib/property-listings-price";

const MAX_SIZE = 2000;
const MAX_CONFIG = 200;
const MAX_PRICE = 120;

/** Matches `property_inventory_dashboard_rows` select shape. */
interface DashboardViewRow {
  line_id: string;
  property_id: string;
  size_sqft: string | null;
  configuration_label: string | null;
  price_cr: string | null;
  sort_order: number | null;
  slug: string;
  project_name: string;
  location_label: string;
  location_id: string | null;
  locality_id: string | null;
  hero_image: string;
  hero_image_alt: string | null;
  possession_date: string | null;
  inventory_towers: string | null;
  property_created_at: string;
}

function rowToInventoryItem(row: DashboardViewRow, locationSlug: string): PropertyInventoryRow {
  return {
    id: row.line_id,
    propertyId: row.property_id,
    slug: row.slug,
    projectName: row.project_name,
    locationLabel: row.location_label,
    locationId: row.location_id,
    localityId: row.locality_id,
    heroImage: row.hero_image,
    heroImageAlt: row.hero_image_alt ?? undefined,
    inventoryTowers: row.inventory_towers ?? "",
    possessionDate: row.possession_date ?? "",
    configuration: row.configuration_label ?? "",
    sizeSqft: row.size_sqft ?? "",
    priceCr: row.price_cr ?? "",
    sortOrder: row.sort_order ?? 0,
    locationSlug,
  };
}

export async function POST(request: NextRequest) {
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

    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const o = json && typeof json === "object" ? (json as Record<string, unknown>) : null;

    const propertyId = typeof o?.propertyId === "string" ? o.propertyId.trim() : "";

    const configuration =
      typeof o?.configuration === "string"
        ? o.configuration.trim().slice(0, MAX_CONFIG)
        : String(o?.configuration ?? "")
            .trim()
            .slice(0, MAX_CONFIG);
    const sizeSqft =
      typeof o?.sizeSqft === "string" ? o.sizeSqft.slice(0, MAX_SIZE) : String(o?.sizeSqft ?? "").slice(0, MAX_SIZE);
    const priceCr =
      typeof o?.priceCr === "string" ? o.priceCr.slice(0, MAX_PRICE) : String(o?.priceCr ?? "").slice(0, MAX_PRICE);

    if (!isUuid(propertyId)) {
      return NextResponse.json({ error: "Invalid propertyId" }, { status: 400 });
    }

    if (!priceCr.trim()) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }
    if (!isValidInventoryPriceDigits(priceCr)) {
      return NextResponse.json({ error: "Price must be digits only" }, { status: 400 });
    }
    if (!isValidInventoryDigitsOrEmpty(sizeSqft)) {
      return NextResponse.json({ error: "Size must be digits only when set" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();

    const { data: prop, error: propErr } = await supabase
      .from("properties_v2")
      .select("id")
      .eq("id", propertyId)
      .eq("is_published", true)
      .maybeSingle();

    if (propErr) {
      console.error("POST property-listings/configurations property:", propErr);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }
    if (!prop) {
      return NextResponse.json({ error: "Property not found or unpublished" }, { status: 404 });
    }

    const { data: top } = await supabase
      .from("property_listing_configurations")
      .select("sort_order")
      .eq("property_id", propertyId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextOrder = (typeof top?.sort_order === "number" ? top.sort_order : -1) + 1;

    const { data: inserted, error: insErr } = await supabase
      .from("property_listing_configurations")
      .insert({
        property_id: propertyId,
        configuration,
        size_sqft: sizeSqft,
        price_cr: priceCr,
        sort_order: nextOrder,
      })
      .select("id")
      .single();

    if (insErr || !inserted?.id) {
      console.error("POST property-listings/configurations insert:", insErr);
      return NextResponse.json(
        { error: "Insert failed", details: insErr?.message },
        { status: 500 }
      );
    }

    const { data: viewRow, error: viewErr } = await supabase
      .from("property_inventory_dashboard_rows")
      .select("*")
      .eq("line_id", inserted.id)
      .maybeSingle();

    if (viewErr || !viewRow) {
      console.error("POST property-listings/configurations view:", viewErr);
      return NextResponse.json({ error: "Row created but could not load dashboard row" }, { status: 500 });
    }

    const row = viewRow as DashboardViewRow;
    let locationSlug = "";
    if (row.location_id) {
      const { data: loc } = await supabase
        .from("locations_v2")
        .select("slug")
        .eq("id", row.location_id)
        .maybeSingle();
      locationSlug = loc?.slug ?? "";
    }

    const item = rowToInventoryItem(row, locationSlug);
    return NextResponse.json({ item });
  } catch (e) {
    console.error("POST /api/property-listings/configurations:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
