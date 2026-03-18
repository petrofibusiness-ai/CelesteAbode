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

function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[\|\-]\s*Celeste Abode\s*$/i, "").trim();
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
  if (!slug) {
    return null;
  }

  const supabase = getSupabaseAdminClient();

  // Step 1: Fetch property by slug from properties_v2 (DB is source of truth)
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
    return null;
  }

  const property = supabaseToProperty(propertyData);

  // Step 2: Property must have a location_id
  if (!property.locationId) {
    return null;
  }

  // Step 3: Fetch location slug from locations_v2 using location_id (database is source of truth)
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
    return null;
  }

  // Step 4: Use location slug from database (source of truth) - use as-is, no normalization
  const databaseLocationSlug = locationData.slug;

  // Step 5: Validate URL locationCategory parameter matches database location slug (exact match, no normalization)
  if (locationCategorySlug && locationCategorySlug !== databaseLocationSlug) {
    return null; // URL location doesn't match database location - return 404
  }

  // Canonical URL uses database location slug (source of truth) - use as-is
  const canonicalUrl = `/properties-in-${databaseLocationSlug}/${slug}`;

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
    return {
      title: "404 Page Not Found | Celeste Abode",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
    };
  }

  const result = await resolveCanonicalProperty(
    locationCategory,
    slug
  );

  if (!result) {
    return {
      title: "404 Page Not Found | Celeste Abode",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
    };
  }

  const { property, canonicalUrl } = result;

  // Use production domain only for canonical/OG so Google never sees a different host (e.g. VERCEL_URL preview)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const fullUrl = `${siteUrl}${canonicalUrl}`;
  const seoTitle = stripBrandSuffix(property.seo?.title || property.projectName);

  return {
    title: seoTitle,
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
      title: seoTitle,
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
      title: seoTitle,
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
export const revalidate = 10; // Reduced from 60s to 10s for faster updates
export const dynamicParams = true; // Allow on-demand generation for new properties

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

  // Property page params validated

  // Validate params (Next.js should provide these via middleware rewrite)
  if (!locationCategory || !slug || locationCategory.trim() === "") {
    // Invalid params - redirecting to 404
    notFound();
  }

  const result = await resolveCanonicalProperty(
    locationCategory,
    slug
  );

  if (!result) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
  const canonicalFullUrl = `${siteUrl}${result.canonicalUrl}`;

  return (
    <DynamicPropertyPage
      property={result.property}
      canonicalUrl={canonicalFullUrl}
    />
  );
}

