import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseV3ToProperty } from "@/lib/supabase-property-mapper";
import { getPropertyIdsWithAnyConfigurationLabels } from "@/lib/property-inventory-configuration-filter";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { addLocationSlugToProperties } from "@/lib/property-location-helper";
import { isValidPropertyType, isValidProjectStatus, isValidConfiguration } from "@/lib/property-enums";

const DATA_TIMEOUT_MS = 25_000;
const COUNT_TIMEOUT_MS = 12_000;

const LISTING_SELECT =
  "id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, description, hero_image, hero_image_alt, is_published, created_at, updated_at";

function mapPropertyTypeFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    apartments: "Apartment/Flats",
    villas: "Villas",
    plots: "Plots/Lands",
    commercial: "Commercial",
  };
  return mapping[filterValue] || null;
}

function mapProjectStatusFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    "new-launch": "New Launch",
    "under-construction": "Under Construction",
    "ready-to-move": "Ready to Move",
  };
  return mapping[filterValue] || null;
}

function mapConfigurationFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    "2bhk": "2 BHK",
    "2bhk-study": "2 BHK + Study",
    "3bhk": "3 BHK",
    "3bhk-study": "3 BHK + Study",
    "4bhk": "4 BHK",
    "5bhk": "5 BHK",
  };
  return mapping[filterValue] || null;
}

async function withTimeout<T>(promise: PromiseLike<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timeout`)), ms);
    }),
  ]);
}

// GET - Get all published properties with optional filters (no location required)
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
    const propertyTypeFilter = searchParams.get("propertyType");
    const projectStatusFilter = searchParams.get("projectStatus");
    const configurationFilters =
      propertyTypeFilter === "commercial" ? [] : searchParams.getAll("configuration");
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));

    let query = supabase.from("properties_v3").select(LISTING_SELECT).eq("is_published", true);
    let countQuery = supabase
      .from("properties_v3")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true);

    if (propertyTypeFilter && propertyTypeFilter !== "all") {
      if (propertyTypeFilter === "residential") {
        query = query.in("property_type", ["Apartment/Flats", "Villas"]);
        countQuery = countQuery.in("property_type", ["Apartment/Flats", "Villas"]);
      } else {
        const mappedType = mapPropertyTypeFilter(propertyTypeFilter);
        if (mappedType && isValidPropertyType(mappedType)) {
          query = query.eq("property_type", mappedType);
          countQuery = countQuery.eq("property_type", mappedType);
        }
      }
    }

    if (projectStatusFilter && projectStatusFilter !== "all") {
      const mappedStatus = mapProjectStatusFilter(projectStatusFilter);
      if (mappedStatus && isValidProjectStatus(mappedStatus)) {
        query = query.eq("project_status", mappedStatus);
        countQuery = countQuery.eq("project_status", mappedStatus);
      }
    }

    if (configurationFilters.length > 0) {
      const mappedConfigs = configurationFilters
        .map(mapConfigurationFilter)
        .filter((config): config is string => config !== null && isValidConfiguration(config));

      if (mappedConfigs.length > 0) {
        const { ids: configPropertyIds, error: cfgErr } = await getPropertyIdsWithAnyConfigurationLabels(
          supabase,
          mappedConfigs
        );
        if (cfgErr) {
          console.error("configuration filter:", cfgErr);
          return NextResponse.json(
            { error: "Failed to filter by configuration", details: cfgErr.message },
            { status: 500 }
          );
        }
        if (configPropertyIds.length === 0) {
          return NextResponse.json(
            {
              properties: [],
              total: 0,
              totalCount: 0,
              totalCountExact: true,
              hasMore: false,
              limit,
              offset,
            },
            {
              headers: {
                "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
                "Cache-Tag": "api-properties-all,properties",
              },
            }
          );
        }
        query = query.in("id", configPropertyIds);
        countQuery = countQuery.in("id", configPropertyIds);
      }
    }

    const dataQuery = query.order("created_at", { ascending: false }).range(offset, offset + limit);
    const { data, error } = await withTimeout(dataQuery, DATA_TIMEOUT_MS, "Data");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }

    const hasMore = (data || []).length > limit;
    const propertiesToReturn = (data || []).slice(0, limit);
    const mappedProperties = propertiesToReturn.map((prop) => supabaseV3ToProperty(prop as never));
    const propertiesWithLocation = await addLocationSlugToProperties(mappedProperties, supabase);

    let totalCount: number | null = null;

    if (offset === 0) {
      try {
        const { count, error: countError } = await withTimeout(countQuery, COUNT_TIMEOUT_MS, "Count");
        if (!countError && typeof count === "number" && count >= 0) {
          totalCount = count;
        }
      } catch (countErr) {
        console.warn("Exact count timed out, trying estimate:", countErr);
      }

      if (totalCount === null) {
        try {
          let estimateCountQuery = supabase
            .from("properties_v3")
            .select("id", { count: "estimated", head: true })
            .eq("is_published", true);

          if (propertyTypeFilter && propertyTypeFilter !== "all") {
            if (propertyTypeFilter === "residential") {
              estimateCountQuery = estimateCountQuery.in("property_type", ["Apartment/Flats", "Villas"]);
            } else {
              const mappedType = mapPropertyTypeFilter(propertyTypeFilter);
              if (mappedType && isValidPropertyType(mappedType)) {
                estimateCountQuery = estimateCountQuery.eq("property_type", mappedType);
              }
            }
          }

          if (projectStatusFilter && projectStatusFilter !== "all") {
            const mappedStatus = mapProjectStatusFilter(projectStatusFilter);
            if (mappedStatus && isValidProjectStatus(mappedStatus)) {
              estimateCountQuery = estimateCountQuery.eq("project_status", mappedStatus);
            }
          }

          if (configurationFilters.length > 0) {
            const mappedConfigs = configurationFilters
              .map(mapConfigurationFilter)
              .filter((config): config is string => config !== null && isValidConfiguration(config));
            if (mappedConfigs.length > 0) {
              const { ids: configPropertyIds } = await getPropertyIdsWithAnyConfigurationLabels(
                supabase,
                mappedConfigs
              );
              if (configPropertyIds.length === 0) {
                totalCount = 0;
              } else {
                estimateCountQuery = estimateCountQuery.in("id", configPropertyIds);
              }
            }
          }

          if (totalCount === null) {
            const { count, error: estimateError } = await withTimeout(
              estimateCountQuery,
              8_000,
              "Estimate"
            );
            if (!estimateError && typeof count === "number" && count >= 0) {
              totalCount = count;
            }
          }
        } catch (estimateErr) {
          console.warn("Estimated count failed:", estimateErr);
        }
      }
    }

    const fallbackTotal = offset + propertiesWithLocation.length + (hasMore ? limit : 0);
    const resolvedTotalCount = offset === 0 ? (totalCount ?? fallbackTotal) : null;

    return NextResponse.json(
      {
        properties: propertiesWithLocation,
        total: propertiesWithLocation.length,
        totalCount: resolvedTotalCount,
        totalCountExact: totalCount !== null,
        hasMore,
        limit,
        offset,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          "Cache-Tag": "api-properties-all,properties",
        },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/properties/all:", error);
    if (error instanceof Error && error.message.includes("timeout")) {
      return NextResponse.json({ error: "Request timeout. Please try again." }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
