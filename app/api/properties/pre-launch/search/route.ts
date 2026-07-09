import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";
import { searchPreLaunchProperties } from "@/lib/pre-launch-property-search";
import { isPreLaunchLocationSlug } from "@/lib/pre-launch-locations";

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

    const searchParams = request.nextUrl.searchParams;
    const locationFilters = searchParams
      .getAll("location")
      .map((slug) => slug.toLowerCase().trim())
      .filter(isPreLaunchLocationSlug);
    const propertyTypeFilter = searchParams.get("propertyType") || "all";
    const configurationFilters =
      propertyTypeFilter === "commercial" ? [] : searchParams.getAll("configuration");
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));

    const { properties, totalCount } = searchPreLaunchProperties(
      {
        locations: locationFilters,
        propertyType: propertyTypeFilter,
        configuration: configurationFilters,
      },
      { limit, offset }
    );

    return NextResponse.json(
      {
        properties,
        filters: {
          location: locationFilters,
          propertyType: propertyTypeFilter,
          configuration: configurationFilters,
        },
        limit,
        offset,
        total: properties.length,
        totalCount,
      },
      {
        headers: {
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error searching pre-launch properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch pre-launch properties" },
      { status: 500 }
    );
  }
}
