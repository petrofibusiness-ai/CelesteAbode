import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseV3ToProperty } from "@/lib/supabase-property-mapper";
import { fetchPropertyInventoryConfigurationLabels } from "@/lib/inventory-dashboard-rows";
import PropertyDemoLayout from "@/components/property-public/property-demo-layout";

interface PageProps {
  params: Promise<{
    locationCategory: string;
    slug: string;
  }>;
}

function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[\|\-]\s*Celeste Abode\s*$/i, "").trim();
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

/**
 * Resolve property using database location_id as source of truth
 * 1. Fetch property by slug from properties_v3
 * 2. Get location_id from property
 * 3. Fetch location slug from locations_v2 using location_id
 * 4. Validate URL locationCategory matches database location slug
 */
async function resolveCanonicalProperty(
  locationCategorySlug?: string,
  slug?: string
): Promise<{
  property: ReturnType<typeof supabaseV3ToProperty>;
  canonicalUrl: string;
} | null> {
  if (!slug) {
    return null;
  }

  const supabase = getSupabaseAdminClient();

  const { data: propertyData, error: propertyError } = await supabase
    .from("properties_v3")
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

  const property = supabaseV3ToProperty(propertyData);

  if (!property.locationId) {
    return null;
  }

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

  const databaseLocationSlug = locationData.slug;

  if (locationCategorySlug && locationCategorySlug !== databaseLocationSlug) {
    return null;
  }

  const canonicalUrl = `/properties-in-${databaseLocationSlug}/${slug}`;

  return {
    property: { ...property, locationSlug: databaseLocationSlug },
    canonicalUrl,
  };
}

/* =========================
   SEO METADATA
   ========================= */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locationCategory, slug } = resolvedParams;

  if (!locationCategory || !slug || locationCategory.trim() === "") {
    return {
      title: "404 Page Not Found | Celeste Abode",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
    };
  }

  const result = await resolveCanonicalProperty(locationCategory, slug);

  if (!result) {
    return {
      title: "404 Page Not Found | Celeste Abode",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
    };
  }

  const { property, canonicalUrl } = result;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const fullUrl = `${siteUrl}${canonicalUrl}`;
  const seoTitle = stripBrandSuffix(property.seo?.title || stripTags(property.projectName));

  const plainDescription =
    property.seo?.description || stripTags(property.description).slice(0, 320);

  return {
    title: seoTitle,
    description: plainDescription,
    keywords:
      property.seo?.keywords ||
      `${stripTags(property.projectName)}, ${property.location}, luxury property`,
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seoTitle,
      description: plainDescription,
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
              alt: stripTags(property.projectName),
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description:
        plainDescription ||
        `${stripTags(property.projectName)} in ${property.location} - Luxury Property by Celeste Abode`,
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
export const revalidate = 10;
export const dynamicParams = true;

/* =========================
   STATIC PARAMS
   ========================= */
export async function generateStaticParams() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase.from("properties_v3").select("slug, location_id").eq("is_published", true);

  if (error || !data) {
    return [];
  }

  const locationIds = [...new Set(data.map((p) => p.location_id).filter(Boolean))];

  const { data: locationsData } = await supabase.from("locations_v2").select("id, slug").in("id", locationIds);

  const locationSlugMap = new Map((locationsData || []).map((loc) => [loc.id, loc.slug]));

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
    .filter((v): v is { locationCategory: string; slug: string } => Boolean(v));

  return params;
}

/* =========================
   PAGE RENDER
   ========================= */
export default async function PropertyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locationCategory, slug } = resolvedParams;

  if (!locationCategory || !slug || locationCategory.trim() === "") {
    notFound();
  }

  const result = await resolveCanonicalProperty(locationCategory, slug);

  if (!result) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
  const canonicalFullUrl = `${siteUrl}${result.canonicalUrl}`;

  const supabase = getSupabaseAdminClient();
  const inventoryConfigurationLabels = result.property.id
    ? await fetchPropertyInventoryConfigurationLabels(supabase, result.property.id)
    : [];

  return (
    <PropertyDemoLayout
      property={result.property}
      canonicalUrl={canonicalFullUrl}
      inventoryConfigurationLabels={inventoryConfigurationLabels}
    />
  );
}
