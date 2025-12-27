import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import DynamicPropertyPage from "@/components/dynamic-property-page";
import { locationCategoryToSlug, slugToLocationCategory } from "@/lib/location-slug";

interface PageProps {
  params: Promise<{
    locationCategory: string;
    slug: string;
  }>;
}

/**
 * Resolve property strictly at its canonical URL
 * Canonical format (public-facing):
 * /properties-in-{location-category-slug}/{property-slug}
 * 
 * Internal route format (after middleware rewrite):
 * /properties-in/{location-category-slug}/{property-slug}
 */
async function resolveCanonicalProperty(
  locationCategorySlug?: string,
  slug?: string
): Promise<{
  property: ReturnType<typeof supabaseToProperty>;
  canonicalUrl: string;
} | null> {
  if (!locationCategorySlug || !slug) {
    return null;
  }

  const normalizedSlug = slug.toLowerCase().trim();
  const normalizedLocationSlug = locationCategorySlug.toLowerCase().trim();

  // Validate incoming location slug maps to a valid enum
  const validLocationCategory = slugToLocationCategory(normalizedLocationSlug);
  if (!validLocationCategory) {
    return null;
  }

  const supabase = getSupabaseAdminClient();

  // Fetch property by slug (DB is source of truth)
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", normalizedSlug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    return null;
  }

  const property = supabaseToProperty(data);

  // Property must have a location category
  if (!property.locationCategory) {
    return null;
  }

  // Derive canonical location slug from DB enum
  const canonicalLocationSlug = locationCategoryToSlug(
    property.locationCategory
  );

  if (!canonicalLocationSlug) {
    return null;
  }

  const normalizedCanonicalSlug = canonicalLocationSlug
    .toLowerCase()
    .trim();

  // STRICT match — URL must equal canonical
  if (normalizedLocationSlug !== normalizedCanonicalSlug) {
    return null;
  }

  // Canonical URL uses hyphenated format (public-facing)
  const canonicalUrl = `/properties-in-${canonicalLocationSlug}/${normalizedSlug}`;

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
    .from("properties")
    .select("slug, location_category")
    .eq("is_published", true);

  if (error || !data) {
    return [];
  }

  const params = data
    .map((p) => {
      const locationSlug = locationCategoryToSlug(
        p.location_category
      );
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

  // Validate params (Next.js should provide these via middleware rewrite)
  if (!locationCategory || !slug || locationCategory.trim() === "") {
    notFound();
  }

  const result = await resolveCanonicalProperty(
    locationCategory,
    slug
  );

  if (!result) {
    notFound();
  }

  return <DynamicPropertyPage property={result.property} />;
}

