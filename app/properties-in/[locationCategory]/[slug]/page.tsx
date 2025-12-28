import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import DynamicPropertyPage from "@/components/dynamic-property-page";

interface PageProps {
  params: Promise<{
    locationCategory: string;
    slug: string;
  }>;
}

/**
 * Resolve property using database location_id as source of truth
 * 1. Fetch property by slug from properties_v2
 * 2. Get location_id from property
 * 3. Fetch location slug from locations_v2 using location_id
 * 4. Validate URL locationCategory matches database location slug
 */
async function resolveCanonicalProperty(
  locationCategorySlug?: string,
  slug?: string
): Promise<{
  property: ReturnType<typeof supabaseToProperty>;
  canonicalUrl: string;
} | null> {
  console.log("[resolveCanonicalProperty] Starting with params:", { locationCategorySlug, slug });

  if (!slug) {
    console.log("[resolveCanonicalProperty] No slug provided");
    return null;
  }

  const supabase = getSupabaseAdminClient();

  // Step 1: Fetch property by slug from properties_v2 (DB is source of truth)
  console.log("[resolveCanonicalProperty] Fetching property with slug:", slug);
  const { data: propertyData, error: propertyError } = await supabase
    .from("properties_v2")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (propertyError) {
    console.error("[resolveCanonicalProperty] Error fetching property:", propertyError);
    return null;
  }

  if (!propertyData) {
    console.log("[resolveCanonicalProperty] Property not found for slug:", slug);
    return null;
  }

  console.log("[resolveCanonicalProperty] Property found:", { id: propertyData.id, slug: propertyData.slug, location_id: propertyData.location_id });

  const property = supabaseToProperty(propertyData);

  // Step 2: Property must have a location_id
  if (!property.locationId) {
    console.log("[resolveCanonicalProperty] Property has no location_id:", propertyData.id);
    return null;
  }

  console.log("[resolveCanonicalProperty] Property location_id:", property.locationId);

  // Step 3: Fetch location slug from locations_v2 using location_id (database is source of truth)
  console.log("[resolveCanonicalProperty] Fetching location with location_id:", property.locationId);
  const { data: locationData, error: locationError } = await supabase
    .from("locations_v2")
    .select("slug")
    .eq("id", property.locationId)
    .single();

  if (locationError) {
    console.error("[resolveCanonicalProperty] Error fetching location:", locationError);
    return null;
  }

  if (!locationData || !locationData.slug) {
    console.log("[resolveCanonicalProperty] Location not found or has no slug for location_id:", property.locationId);
    return null;
  }

  // Step 4: Use location slug from database (source of truth) - use as-is, no normalization
  const databaseLocationSlug = locationData.slug;
  console.log("[resolveCanonicalProperty] Database location slug:", databaseLocationSlug);

  // Step 5: Validate URL locationCategory parameter matches database location slug (exact match, no normalization)
  if (locationCategorySlug) {
    console.log("[resolveCanonicalProperty] Comparing URL locationCategory:", locationCategorySlug, "with database slug:", databaseLocationSlug);
    if (locationCategorySlug !== databaseLocationSlug) {
      console.log("[resolveCanonicalProperty] URL locationCategory doesn't match database location slug - returning 404");
      return null; // URL location doesn't match database location - return 404
    }
    console.log("[resolveCanonicalProperty] Location slugs match!");
  }

  // Canonical URL uses database location slug (source of truth) - use as-is
  const canonicalUrl = `/properties-in-${databaseLocationSlug}/${slug}`;
  console.log("[resolveCanonicalProperty] Canonical URL:", canonicalUrl);

  return { property, canonicalUrl };
}

/* =========================
   SEO METADATA
   ========================= */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locationCategory, slug } = resolvedParams;

  // Validate params
  if (!locationCategory || !slug || locationCategory.trim() === "") {
    return { title: "Property Not Found" };
  }

  const result = await resolveCanonicalProperty(
    locationCategory,
    slug
  );

  if (!result) {
    return { title: "Property Not Found" };
  }

  const { property, canonicalUrl } = result;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.celesteabode.com");

  const fullUrl = `${siteUrl}${canonicalUrl}`;

  return {
    title: property.seo?.title || `${property.projectName} | Celeste Abode`,
    description:
      property.seo?.description || property.description,
    keywords:
      property.seo?.keywords ||
      `${property.projectName}, ${property.location}, luxury property`,
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: property.seo?.title || property.projectName,
      description:
        property.seo?.description || property.description,
      url: fullUrl,
      siteName: "Celeste Abode",
      locale: "en_IN",
      type: "website",
      images: property.heroImage
        ? [
            {
              url: property.heroImage,
              width: 1200,
              height: 630,
              alt: property.projectName,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: property.seo?.title || property.projectName,
      description: property.seo?.description || property.description || `${property.projectName} in ${property.location} - Luxury Property by Celeste Abode`,
      images: property.heroImage ? [property.heroImage] : [],
      creator: "@celesteabode",
    },
    authors: [{ name: "Celeste Abode" }],
    creator: "Celeste Abode",
    publisher: "Celeste Abode",
  };
}

/* =========================
   ISR CONFIG
   ========================= */
export const revalidate = 60;
export const dynamicParams = false;

/* =========================
   STATIC PARAMS
   ========================= */
export async function generateStaticParams() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("properties_v2")
    .select("slug, location_id")
    .eq("is_published", true);

  if (error || !data) {
    return [];
  }

  // Fetch all unique location IDs
  const locationIds = [...new Set(data.map(p => p.location_id).filter(Boolean))];
  
  // Fetch locations to get slugs
  const { data: locationsData } = await supabase
    .from("locations_v2")
    .select("id, slug")
    .in("id", locationIds);

  // Create a map of location_id -> slug
  const locationSlugMap = new Map(
    (locationsData || []).map(loc => [loc.id, loc.slug])
  );

  const params = data
    .map((p) => {
      if (!p.location_id) return null;
      const locationSlug = locationSlugMap.get(p.location_id);
      if (!locationSlug) {
        return null;
      }

      return {
        locationCategory: locationSlug,
        slug: p.slug,
      };
    })
    .filter(
      (v): v is { locationCategory: string; slug: string } =>
        Boolean(v)
    );

  return params;
}

/* =========================
   PAGE RENDER
   ========================= */
export default async function PropertyPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const { locationCategory, slug } = resolvedParams;

  console.log("[PropertyPage] Received params:", { locationCategory, slug });

  // Validate params (Next.js should provide these via middleware rewrite)
  if (!locationCategory || !slug || locationCategory.trim() === "") {
    console.log("[PropertyPage] Invalid params - calling notFound()");
    notFound();
  }

  const result = await resolveCanonicalProperty(
    locationCategory,
    slug
  );

  if (!result) {
    console.log("[PropertyPage] resolveCanonicalProperty returned null - calling notFound()");
    notFound();
  }

  console.log("[PropertyPage] Successfully resolved property, rendering page");
  return <DynamicPropertyPage property={result.property} />;
}

