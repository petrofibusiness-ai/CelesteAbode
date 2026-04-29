import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import {
  buildPagedInventoryItems,
  DEFAULT_INVENTORY_PER_PAGE,
  fetchInventoryDashboardRows,
  filterPropertyGroups,
  groupRowsByPropertyInOrder,
  locationSlugMapForRows,
  mergePublishedPropertiesMissingDashboardRows,
  normalizeSearchQ,
} from "@/lib/inventory-dashboard-rows";

const QUERY_TIMEOUT = 10000;
const DEFAULT_PER_PAGE = DEFAULT_INVENTORY_PER_PAGE;

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

    const supabase = getSupabaseAdminClient();
    const searchParams = request.nextUrl.searchParams;
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("perPage") || String(DEFAULT_PER_PAGE), 10)));
    const requestedPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const searchQ = normalizeSearchQ(searchParams.get("q"));
    const searchQLower = searchQ.toLowerCase();

    const mkTimeout = () =>
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout")), QUERY_TIMEOUT)
      );

    const { rows: dashboardRows, error } = await Promise.race([fetchInventoryDashboardRows(supabase), mkTimeout()]);

    if (error) {
      console.error("property-listings query error:", error);
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
      console.error("property-listings merge published:", mergeErr);
    }
    const rows = mergeErr ? dashboardRows : mergedRows;

    const groups = groupRowsByPropertyInOrder(rows);
    const groupsFiltered = filterPropertyGroups(groups, {
      searchQLower,
      locationId: null,
      lineFilter: "all",
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
        editModeAvailable: Boolean(process.env.PROPERTY_LISTINGS_EDIT_SECRET?.trim()),
      },
      {
        headers: {
          "Cache-Control": "private, no-store, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (e) {
    console.error("GET /api/property-listings:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
