import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";

// Query timeout: 10 seconds
const QUERY_TIMEOUT = 10000;

// GET - Get dashboard statistics (using SQL-native operations)
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(rateLimitId, RATE_LIMITS.ADMIN_READ);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.error },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      );
    }

    // Get Supabase admin client to bypass RLS and get accurate counts
    // Admin needs to see all properties regardless of RLS policies
    const supabase = getSupabaseAdminClient();

    // Use SQL-native COUNT operations instead of fetching all rows
    // This is much more efficient and reduces database cost
    
    // Count total properties (all rows, regardless of is_published)
    const totalPromise = supabase
      .from("properties")
      .select("*", { count: 'exact', head: true });

    // Count published properties (is_published = true)
    const publishedPromise = supabase
      .from("properties")
      .select("*", { count: 'exact', head: true })
      .eq("is_published", true);

    // Count draft properties (is_published = false OR is_published IS NULL)
    // Using .or() to handle both false and NULL values
    const draftPromise = supabase
      .from("properties")
      .select("*", { count: 'exact', head: true })
      .or("is_published.eq.false,is_published.is.null");

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
    });

    // Execute all queries in parallel with timeout
    const [totalResult, publishedResult, draftResult] = await Promise.race([
      Promise.all([totalPromise, publishedPromise, draftPromise]),
      timeoutPromise,
    ]) as any[];

    if (totalResult.error || publishedResult.error || draftResult.error) {
      console.error("Supabase error:", totalResult.error || publishedResult.error || draftResult.error);
      console.error("Total error:", totalResult.error);
      console.error("Published error:", publishedResult.error);
      console.error("Draft error:", draftResult.error);
      return NextResponse.json(
        { error: "Failed to fetch statistics" },
        { status: 500 }
      );
    }

    const totalProperties = totalResult.count || 0;
    const publishedProperties = publishedResult.count || 0;
    const draftProperties = draftResult.count || 0;

    // Debug logging
    console.log("Stats calculation:", {
      total: totalProperties,
      published: publishedProperties,
      draft: draftProperties,
      sum: publishedProperties + draftProperties,
      difference: totalProperties - (publishedProperties + draftProperties)
    });

    return NextResponse.json({
      totalProperties,
      publishedProperties,
      draftProperties,
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    
    if (error instanceof Error && error.message === 'Query timeout') {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
