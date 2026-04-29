import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import {
  buildPagedInventoryItems,
  fetchInventoryDashboardRows,
  filterPropertyGroups,
  groupRowsByPropertyInOrder,
  locationSlugMapForRows,
  mergePublishedPropertiesMissingDashboardRows,
  normalizeSearchQ,
  type InventoryLineFilter,
} from "@/lib/inventory-dashboard-rows";

const QUERY_TIMEOUT = 15000;
const DEFAULT_PER_PAGE = 15;
const MAX_PER_PAGE = 80;

function parseLineFilter(raw: string | null): InventoryLineFilter {
  if (raw === "with_lines" || raw === "no_lines") return raw;
  return "all";
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }

    const supabase = getSupabaseAdminClient();
    const searchParams = request.nextUrl.searchParams;
    const perPage = Math.min(
      MAX_PER_PAGE,
      Math.max(1, parseInt(searchParams.get("perPage") || String(DEFAULT_PER_PAGE), 10))
    );
    const requestedPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const searchQ = normalizeSearchQ(searchParams.get("q"));
    const searchQLower = searchQ.toLowerCase();
    const locationId = (searchParams.get("locationId") || "").trim() || null;
    const lineFilter = parseLineFilter(searchParams.get("lineFilter"));

    const mkTimeout = () =>
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
      );

    const { rows: dashboardRows, error } = await Promise.race([fetchInventoryDashboardRows(supabase), mkTimeout()]);

    if (error) {
      console.error("admin inventory-dashboard query error:", error);
      const hint =
        /property_inventory_dashboard_rows|property_listing_configurations/i.test(error.message || "")
          ? " Run sql/property_listing_configurations.sql in Supabase if this is the first deploy."
          : "";
      return NextResponse.json(
        { error: "Failed to fetch inventory rows", details: error.message + hint },
        { status: 500 }
      );
    }

    const { rows: mergedRows, error: mergeErr } = await mergePublishedPropertiesMissingDashboardRows(
      supabase,
      dashboardRows
    );
    if (mergeErr) {
      console.error("admin inventory-dashboard merge published:", mergeErr);
    }
    const rows = mergeErr ? dashboardRows : mergedRows;

    const groups = groupRowsByPropertyInOrder(rows);

    const groupsFiltered = filterPropertyGroups(groups, {
      searchQLower,
      locationId,
      lineFilter,
    });

    const totalProperties = groupsFiltered.length;
    const totalPages = Math.max(1, Math.ceil(totalProperties / perPage));
    const page = Math.min(requestedPage, totalPages);
    const start = (page - 1) * perPage;
    const pageGroups = groupsFiltered.slice(start, start + perPage);

    const pageRowsFlat = pageGroups.flat();
    const slugByLocationId = await locationSlugMapForRows(supabase, pageRowsFlat);

    const items = buildPagedInventoryItems(pageGroups, slugByLocationId, start + 1);

    return NextResponse.json(
      {
        items,
        pagination: {
          page,
          perPage,
          totalProperties,
          totalPages,
        },
        filters: {
          q: searchQ,
          locationId,
          lineFilter,
        },
      },
      {
        headers: {
          "Cache-Control": "private, no-store, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (e) {
    console.error("GET /api/admin/inventory-dashboard:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
