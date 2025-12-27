import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import DynamicPropertyPage from "@/components/dynamic-property-page";
import { locationCategoryToSlug, slugToLocationCategory } from "@/lib/location-slug";

interface PageProps {
  params: Promise<{ locationCategory: string; slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locationCategory: locationCategorySlug, slug } = resolvedParams;
  
  // Validate slug exists
  if (!slug) {
    return {
      title: "Property Not Found",
    };
  }
  
  try {
    const supabase = getSupabaseAdminClient();
    const normalizedSlug = slug.toLowerCase().trim();
    
    // Fetch property by slug (locationCategory may be missing from params due to Next.js routing issue)
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", normalizedSlug)
      .eq("is_published", true) // Only published properties
      .single();

    if (!data) {
      return {
        title: "Property Not Found",
      };
    }

    const property = supabaseToProperty(data);
    
    // Get expected location category slug from property
    const expectedLocationCategorySlug = locationCategoryToSlug(property.locationCategory);
    
    // If locationCategory was provided in URL, validate it matches
    if (locationCategorySlug && expectedLocationCategorySlug) {
      const normalizedLocationCategorySlug = locationCategorySlug.toLowerCase().trim();
      if (expectedLocationCategorySlug !== normalizedLocationCategorySlug) {
        // Location category mismatch - will redirect in main component
        // But still return proper metadata based on property data
      }
    }
    
    // Use the locationCategory from the property (or from URL if it matches)
    const finalLocationCategorySlug = expectedLocationCategorySlug || locationCategorySlug?.toLowerCase().trim();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.celesteabode.com");
    const projectUrl = `${siteUrl}/properties-in-${finalLocationCategorySlug || 'unknown'}/${slug}`;

    return {
      title: property.seo?.title || `${property.projectName} | Celeste Abode`,
      description: property.seo?.description || property.description,
      keywords: property.seo?.keywords || `${property.projectName}, ${property.location}, luxury property`,
      openGraph: {
        title: property.seo?.title || property.projectName,
        description: property.seo?.description || property.description,
        url: projectUrl,
        siteName: "Celeste Abode",
        images: property.heroImage
          ? [
              {
                url: property.heroImage,
                width: 1200,
                height: 630,
                alt: `${property.projectName} - Celeste Abode`,
              },
            ]
          : [],
        locale: "en_IN",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: property.seo?.title || property.projectName,
        description: property.seo?.description || property.description,
        images: property.heroImage ? [property.heroImage] : [],
      },
      alternates: {
        canonical: projectUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    return {
      title: "Property Not Found",
    };
  }
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Allow dynamic params for routes not in generateStaticParams
// This ensures new properties can be accessed even if not pre-generated
export const dynamicParams = true;

// Generate static params for ISR (Incremental Static Regeneration)
export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdminClient();
    // Fetch published properties with their location categories
    const { data } = await supabase
      .from("properties")
      .select("slug, location_category")
      .eq("is_published", true); // Only published properties

    if (!data) {
      return [];
    }

    return data
      .filter((property) => property.location_category) // Only properties with location category
      .map((property) => {
        const locationCategorySlug = locationCategoryToSlug(property.location_category);
        return {
          locationCategory: locationCategorySlug || "unknown",
          slug: property.slug,
        };
      });
  } catch (error) {
    return [];
  }
}

// Main page component
export default async function PropertyPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  // WORKAROUND: Next.js is not extracting locationCategory from nested dynamic route
  // Extract it manually from the URL pathname
  let locationCategorySlug: string | undefined = resolvedParams.locationCategory;
  const slug = resolvedParams.slug;
  
  // If locationCategory is missing, try to extract it from the URL pathname
  if (!locationCategorySlug && slug) {
    try {
      const headersList = await headers();
      const referer = headersList.get('referer') || '';
      const xUrl = headersList.get('x-url') || '';
      const url = xUrl || referer;
      
      if (url) {
        try {
          const urlObj = new URL(url);
          const pathParts = urlObj.pathname.split('/').filter(Boolean);
          if (pathParts.length >= 2 && pathParts[0].startsWith('properties-in-')) {
            locationCategorySlug = pathParts[0].replace('properties-in-', '');
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    } catch (error) {
      // Ignore header extraction errors
    }
  }
  
  // Validate slug exists
  if (!slug) {
    notFound();
  }
  
  const normalizedSlug = slug.toLowerCase().trim();
  let normalizedLocationCategorySlug = locationCategorySlug?.toLowerCase().trim();

  try {
    const supabase = getSupabaseAdminClient();
    
    // Fetch property by slug only (location category is for URL structure and validation)
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", normalizedSlug)
      .eq("is_published", true) // Only published properties are accessible
      .single();

    if (error) {
      // PGRST116 means "no rows found" - this is expected for unpublished properties
      if (error.code !== 'PGRST116') {
        // Only log unexpected errors in production
      }
      notFound();
    }

    if (!data) {
      // Property not found or unpublished
      notFound();
    }

    // Convert snake_case to camelCase
    const property = supabaseToProperty(data);
    const expectedLocationCategorySlug = locationCategoryToSlug(property.locationCategory);
    
    // If locationCategory was missing from URL params, use the one from database
    if (!normalizedLocationCategorySlug && expectedLocationCategorySlug) {
      normalizedLocationCategorySlug = expectedLocationCategorySlug;
    }

    // Validate location category exists
    if (!property.locationCategory) {
      notFound(); // Property must have a location category
    }

    // Validate we can convert to slug
    if (!expectedLocationCategorySlug) {
      notFound();
    }

    // If we didn't have locationCategory from URL, redirect to include it
    if (!normalizedLocationCategorySlug && expectedLocationCategorySlug) {
      const correctUrl = `/properties-in-${expectedLocationCategorySlug}/${slug}`;
      redirect(correctUrl);
    }

    // Validate location category matches URL (if we had it from URL)
    if (normalizedLocationCategorySlug && expectedLocationCategorySlug !== normalizedLocationCategorySlug) {
      // Location category mismatch - redirect to correct URL
      const correctUrl = `/properties-in-${expectedLocationCategorySlug}/${slug}`;
      redirect(correctUrl);
    }

    return <DynamicPropertyPage property={property} />;
  } catch (error) {
    notFound();
  }
}

