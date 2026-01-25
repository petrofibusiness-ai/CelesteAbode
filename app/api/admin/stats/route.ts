import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { checkRateLimit, getRateLimitIdentifier, RATE_LIMITS } from "@/lib/rate-limit";

// Query timeout: 10 seconds
const QUERY_TIMEOUT = 10000;

// GET - Get dashboard statistics (using SQL-native operations)
export async function GET(request: NextRequest) {
  try {
    // Strict authentication check using centralized guard
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }
    const user = auth.user;

    // Rate limiting
    const rateLimitId = getRateLimitIdentifier(request, user!.id);
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
      .from("properties_v2")
      .select("*", { count: 'exact', head: true });

    // Count published properties (is_published = true)
    const publishedPromise = supabase
      .from("properties_v2")
      .select("*", { count: 'exact', head: true })
      .eq("is_published", true);

    // Count draft properties (is_published = false OR is_published IS NULL)
    // Using .or() to handle both false and NULL values
    const draftPromise = supabase
      .from("properties_v2")
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

    // Count total locations and fetch location names
    // Match the same query pattern as admin/locations page
    const locationsPromise = supabase
      .from("locations_v2")
      .select("id, location_name, slug, is_published", { count: 'exact' })
      .order("location_name", { ascending: true })
      .limit(10);

    // Count total leads
    const leadsPromise = supabase
      .from("leads")
      .select("*", { count: 'exact', head: true });

    // Count new leads (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newLeadsPromise = supabase
      .from("leads")
      .select("*", { count: 'exact', head: true })
      .gte("created_at", sevenDaysAgo.toISOString());

    // Count leads by status
    const newLeadsStatusPromise = supabase
      .from("leads")
      .select("*", { count: 'exact', head: true })
      .eq("status", "new");

    const contactedLeadsPromise = supabase
      .from("leads")
      .select("*", { count: 'exact', head: true })
      .eq("status", "contacted");

    const qualifiedLeadsPromise = supabase
      .from("leads")
      .select("*", { count: 'exact', head: true })
      .eq("status", "qualified");

    const convertedLeadsPromise = supabase
      .from("leads")
      .select("*", { count: 'exact', head: true })
      .eq("status", "converted");

    // Execute all additional queries in parallel
    const [
      locationsResult,
      leadsResult,
      newLeadsResult,
      newLeadsStatusResult,
      contactedLeadsResult,
      qualifiedLeadsResult,
      convertedLeadsResult
    ] = await Promise.all([
      locationsPromise,
      leadsPromise,
      newLeadsPromise,
      newLeadsStatusPromise,
      contactedLeadsPromise,
      qualifiedLeadsPromise,
      convertedLeadsPromise
    ]);

    // Handle locations result
    let totalLocations = 0;
    let activeLocations: Array<{ id: string; name: string; slug: string }> = [];
    
    if (locationsResult.error) {
      console.error("Error fetching locations:", locationsResult.error);
    } else {
      totalLocations = locationsResult.count || 0;
      // Filter for published locations, or if is_published doesn't exist, show all
      const locationsData = locationsResult.data || [];
      activeLocations = locationsData
        .filter((loc: any) => {
          // Include if is_published is true, undefined, or null (but exclude false)
          return loc.is_published !== false && loc.location_name; // Use location_name field
        })
        .map((loc: any) => ({
          id: loc.id,
          name: loc.location_name || 'Unnamed Location', // Use location_name field
          slug: loc.slug || '',
        }));
      
      // Active locations processed
    }
    const totalLeads = leadsResult.count || 0;
    const newLeadsLast7Days = newLeadsResult.count || 0;
    const newLeadsStatus = newLeadsStatusResult.count || 0;
    const contactedLeads = contactedLeadsResult.count || 0;
    const qualifiedLeads = qualifiedLeadsResult.count || 0;
    const convertedLeads = convertedLeadsResult.count || 0;

    return NextResponse.json({
      totalProperties,
      publishedProperties,
      draftProperties,
      totalLocations,
      activeLocations,
      totalLeads,
      newLeadsLast7Days,
      leadsByStatus: {
        new: newLeadsStatus,
        contacted: contactedLeads,
        qualified: qualifiedLeads,
        converted: convertedLeads,
      },
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
