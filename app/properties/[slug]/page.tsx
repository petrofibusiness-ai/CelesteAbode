import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import DynamicPropertyPage from "@/components/dynamic-property-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug.toLowerCase().trim())
      .eq("is_published", true) // Only published properties
      .single();

    if (!data) {
      return {
        title: "Property Not Found",
      };
    }

    const property = supabaseToProperty(data);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.celesteabode.com");
    const projectUrl = `${siteUrl}/properties/${slug}`;

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
    console.error("Error generating metadata:", error);
    return {
      title: "Property Not Found",
    };
  }
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for ISR (Incremental Static Regeneration)
export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdminClient();
    // Fetch only published property slugs
    const { data } = await supabase
      .from("properties")
      .select("slug")
      .eq("is_published", true); // Only published properties

    if (!data) {
      return [];
    }

    return data.map((property) => ({
      slug: property.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Main page component
export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase().trim();

  try {
    const supabase = getSupabaseAdminClient();
    
    // Fetch property from Supabase - only published properties
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", normalizedSlug)
      .eq("is_published", true) // Only published properties are accessible
      .single();

    if (error) {
      // PGRST116 means "no rows found" - this is expected for unpublished properties
      // Only log unexpected errors
      if (error.code !== 'PGRST116') {
        console.error(`Error fetching property with slug "${normalizedSlug}":`, error);
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
      notFound();
    }

    if (!data) {
      // Property not found or unpublished - this is expected, don't log as error
      notFound();
    }

    // Convert snake_case to camelCase
    const property = supabaseToProperty(data);

    return <DynamicPropertyPage property={property} />;
  } catch (error) {
    console.error(`Error fetching property with slug "${normalizedSlug}":`, error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    notFound();
  }
}

