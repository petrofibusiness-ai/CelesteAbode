import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { isPropertyListingsEditAuthorized } from "@/lib/property-listings-edit-auth";
import { isUuid } from "@/lib/uuid";
import type { PropertyInventoryRow } from "@/types/property-listing";
import {
  isValidInventoryDigitsOrEmpty,
  isValidInventoryPriceText,
  MAX_INVENTORY_PRICE_CR_LENGTH,
} from "@/lib/property-listings-price";

const MAX_SIZE = 2000;
const MAX_CONFIG = 200;

/** Matches `property_inventory_dashboard_rows` select shape. */
/** Header fields copied onto each dashboard row (from an existing row or `properties_v2`). */
interface PropertyInventoryMeta {
  property_id: string;
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

interface DashboardViewRow {
  line_id: string | null;
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
    ...(row.line_id ? { id: row.line_id } : {}),
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
      typeof o?.priceCr === "string"
        ? o.priceCr.slice(0, MAX_INVENTORY_PRICE_CR_LENGTH)
        : String(o?.priceCr ?? "").slice(0, MAX_INVENTORY_PRICE_CR_LENGTH);

    if (!isUuid(propertyId)) {
      return NextResponse.json({ error: "Invalid propertyId" }, { status: 400 });
    }

    if (!priceCr.trim()) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }
    if (!isValidInventoryPriceText(priceCr)) {
      return NextResponse.json(
        { error: `Price must be non-empty and at most ${MAX_INVENTORY_PRICE_CR_LENGTH} characters` },
        { status: 400 }
      );
    }
    if (!isValidInventoryDigitsOrEmpty(sizeSqft)) {
      return NextResponse.json({ error: "Size must be digits only when set" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();

    const { data: dashProp, error: propErr } = await supabase
      .from("property_inventory_dashboard_rows")
      .select(
        "property_id, slug, project_name, location_label, location_id, locality_id, hero_image, hero_image_alt, possession_date, inventory_towers, property_created_at"
      )
      .eq("property_id", propertyId)
      .order("line_created_at", { ascending: true, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (propErr) {
      console.error("POST property-listings/configurations property:", propErr);
      return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
    }

    let meta: PropertyInventoryMeta | null = dashProp
      ? {
          property_id: dashProp.property_id,
          slug: dashProp.slug ?? "",
          project_name: dashProp.project_name ?? "",
          location_label: dashProp.location_label ?? "",
          location_id: dashProp.location_id,
          locality_id: dashProp.locality_id,
          hero_image: dashProp.hero_image ?? "",
          hero_image_alt: dashProp.hero_image_alt,
          possession_date: dashProp.possession_date,
          inventory_towers: dashProp.inventory_towers,
          property_created_at: dashProp.property_created_at ?? new Date().toISOString(),
        }
      : null;

    if (!meta) {
      const { data: pv2, error: v2Err } = await supabase
        .from("properties_v2")
        .select(
          "id, slug, project_name, location, location_id, locality_id, hero_image, hero_image_alt, possession_date, inventory_towers, created_at"
        )
        .eq("id", propertyId)
        .maybeSingle();

      if (v2Err) {
        console.error("POST property-listings/configurations properties_v2:", v2Err);
        return NextResponse.json({ error: "Property lookup failed" }, { status: 500 });
      }
      if (!pv2) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }
      meta = {
        property_id: pv2.id,
        slug: pv2.slug ?? "",
        project_name: pv2.project_name ?? "",
        location_label: (pv2.location as string | null) ?? "",
        location_id: pv2.location_id,
        locality_id: pv2.locality_id,
        hero_image: pv2.hero_image ?? "",
        hero_image_alt: pv2.hero_image_alt,
        possession_date: pv2.possession_date,
        inventory_towers: pv2.inventory_towers,
        property_created_at: pv2.created_at ?? new Date().toISOString(),
      };
    }

    const { data: top } = await supabase
      .from("property_inventory_dashboard_rows")
      .select("sort_order")
      .eq("property_id", propertyId)
      .not("line_id", "is", null)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextOrder = (typeof top?.sort_order === "number" ? top.sort_order : -1) + 1;

    const newLineId = crypto.randomUUID();
    const lineCreatedAt = new Date().toISOString();
    const { error: writeError } = await supabase.from("property_inventory_dashboard_rows").insert({
      line_id: newLineId,
      property_id: propertyId,
      configuration_label: configuration,
      size_sqft: sizeSqft,
      price_cr: priceCr,
      sort_order: nextOrder,
      line_created_at: lineCreatedAt,
      slug: meta.slug,
      project_name: meta.project_name,
      location_label: meta.location_label,
      location_id: meta.location_id,
      locality_id: meta.locality_id,
      hero_image: meta.hero_image,
      hero_image_alt: meta.hero_image_alt,
      possession_date: meta.possession_date,
      inventory_towers: meta.inventory_towers,
      property_created_at: meta.property_created_at,
    });

    if (writeError) {
      console.error("POST property-listings/configurations insert:", writeError);
      return NextResponse.json({ error: "Insert failed", details: writeError.message }, { status: 500 });
    }

    const row: DashboardViewRow = {
      line_id: newLineId,
      property_id: meta.property_id,
      size_sqft: sizeSqft,
      configuration_label: configuration,
      price_cr: priceCr,
      sort_order: nextOrder,
      slug: meta.slug,
      project_name: meta.project_name,
      location_label: meta.location_label,
      location_id: meta.location_id,
      locality_id: meta.locality_id,
      hero_image: meta.hero_image,
      hero_image_alt: meta.hero_image_alt,
      possession_date: meta.possession_date,
      inventory_towers: meta.inventory_towers,
      property_created_at: meta.property_created_at,
    };
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
