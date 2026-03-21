import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Property } from "@/types/property";
import { Location } from "@/types/location";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { supabaseToLocation } from "@/lib/supabase-location-mapper";
import { fetchLocalitiesByLocationId } from "@/lib/fetch-localities";
import { CheckCircle2, Phone, Mail, Building2 } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { NoidaPropertiesGrid } from "@/components/noida-properties-grid";
import { LocationPropertyFilters } from "@/components/location-property-filters";
import { LocationContactForm } from "@/components/location-contact-form";
import { WhyInvestSection } from "@/components/why-invest-section";
import LocationFAQs from "@/components/location-faqs";
import { SeoBlocksRevealController } from "@/components/seo-blocks-reveal-controller";
import { FAQPageSchema, BreadcrumbSchema, LocationPageSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{
    locationCategory: string;
  }>;
}

function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[\|\-]\s*Celeste Abode\s*$/i, "").trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locationCategory } = await params;
  const supabase = getSupabaseAdminClient();
  const { data } = await supabase
    .from("locations_v2")
    .select("*")
    .eq("slug", locationCategory)
    .eq("is_published", true)
    .single();

  if (!data) {
    return {
      title: "404 Page Not Found | Celeste Abode",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
    };
  }

  const locationData = supabaseToLocation(data);

  return {
    title: stripBrandSuffix(locationData.metaTitle),
    description: locationData.metaDescription,
    keywords: locationData.metaKeywords,
    authors: [{ name: "Celeste Abode" }],
    creator: "Celeste Abode",
    publisher: "Celeste Abode",
    category: "Real Estate",
    openGraph: {
      title: locationData.ogTitle || locationData.metaTitle,
      description: locationData.ogDescription || locationData.metaDescription,
      url: `https://www.celesteabode.com/properties-in-${locationData.slug}`,
      siteName: "Celeste Abode",
      images: locationData.ogImage
        ? [
            {
              url: locationData.ogImage,
              width: 1200,
              height: 630,
              alt: locationData.imageAltTexts?.og || `Properties in ${locationData.locationName} - Celeste Abode`,
            },
          ]
        : [],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: locationData.ogTitle || locationData.metaTitle,
      description: locationData.ogDescription || locationData.metaDescription,
      images: locationData.ogImage ? [locationData.ogImage] : [],
      creator: "@celesteabode",
    },
    alternates: {
      canonical: `https://www.celesteabode.com/properties-in-${locationData.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/** Pre-render known location slugs so they are discoverable and fast; fallback list used when DB unavailable at build. */
export async function generateStaticParams(): Promise<{ locationCategory: string }[]> {
  const fallbackSlugs = ['noida', 'greater-noida', 'yamuna-expressway', 'ghaziabad', 'lucknow'];
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from('locations_v2')
      .select('slug')
      .eq('is_published', true);
    if (error || !data?.length) return fallbackSlugs.map((slug) => ({ locationCategory: slug }));
    return data.map((row) => ({ locationCategory: row.slug }));
  } catch {
    return fallbackSlugs.map((slug) => ({ locationCategory: slug }));
  }
}

// Enable ISR for location listing pages (e.g. /properties-in-noida via middleware rewrite)
// Without this, pages generated at build time can remain stale in production after DB updates.
export const revalidate = 10;
export const dynamicParams = true;

export default async function LocationPropertiesPage({ params }: PageProps) {
  const { locationCategory: locationSlug } = await params;
  const supabase = getSupabaseAdminClient();

  // Fetch location data
  const { data: locationData, error: locationError } = await supabase
    .from("locations_v2")
    .select("*")
    .eq("slug", locationSlug)
    .eq("is_published", true)
    .single();

  if (locationError || !locationData) {
    console.error(`Location not found or not published: slug="${locationSlug}"`, locationError);
    // Also check if location exists but is not published
    const { data: unpublishedLocation } = await supabase
      .from("locations_v2")
      .select("slug, is_published")
      .eq("slug", locationSlug)
      .single();
    
    if (unpublishedLocation) {
      console.error(`Location exists but is_published=${unpublishedLocation.is_published}`);
    }
    notFound();
  }

  const location = supabaseToLocation(locationData);

  // Fetch localities for this location from the localities table
  const localities = await fetchLocalitiesByLocationId(location.id);

  // Fetch initial 6 properties for this location using location_id
  // Production logic: Only fetch properties that belong to this location_id
    const { data: propertiesData, error } = await supabase
      .from("properties_v2")
      .select("id, slug, project_name, developer, location, location_id, locality_id, project_status, hero_image, hero_image_alt, is_published, created_at, updated_at")
      .eq("location_id", location.id) // MANDATORY: Only properties for this location
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);

  const { count: totalPropertiesCount } = await supabase
    .from("properties_v2")
    .select("id", { count: "exact", head: true })
    .eq("location_id", location.id)
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching properties for location:", error);
  }

  const properties: Property[] = propertiesData
    ? propertiesData.map((prop: any) => {
        const property = supabaseToProperty(prop as any);
        // Add locationSlug to property for URL generation
        // All properties belong to the same location, so we can use location.slug
        return {
          ...property,
          locationSlug: location.slug,
        } as Property & { locationSlug: string };
      })
    : [];

  // Fetch compare locations (compare_location_1, _2, _3 are FKs to locations_v2)
  const compareLocationIds = [location.compareLocation1, location.compareLocation2, location.compareLocation3].filter(
    (id): id is string => !!id
  );
  let compareLocations: { title: string; subtitle: string; href: string; image: string; alt: string }[] = [];
  if (compareLocationIds.length > 0) {
    const { data: compareData } = await supabase
      .from("locations_v2")
      .select("id, slug, location_name, hero_image")
      .in("id", compareLocationIds)
      .eq("is_published", true);
    const compareMap = new Map((compareData || []).map((row) => [row.id, row]));
    compareLocations = [location.compareLocation1, location.compareLocation2, location.compareLocation3]
      .filter((id): id is string => !!id)
      .map((id) => {
        const row = compareMap.get(id);
        if (!row) return null;
        return {
          title: row.location_name,
          subtitle: `Explore properties in ${row.location_name}`,
          href: `/properties-in-${row.slug}`,
          image: row.hero_image,
          alt: `Explore properties in ${row.location_name}`,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }

  const heroAltText = location.imageAltTexts?.hero || `Properties in ${location.locationName} - Celeste Abode`;
  const celesteAbodeAltText = location.imageAltTexts?.celesteAbode || `Celeste Abode - Trusted Real Estate Consultant in ${location.locationName}`;

  const siteUrl = "https://www.celesteabode.com";
  const locationUrl = `${siteUrl}/properties-in-${location.slug}`;
  const breadcrumbItems = [
    { name: "Home", url: siteUrl },
    { name: "Properties", url: `${siteUrl}/properties` },
    { name: `Properties in ${location.locationName}`, url: locationUrl },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <LocationPageSchema
        name={location.metaTitle}
        description={location.metaDescription}
        url={locationUrl}
        image={location.heroImage}
        locationName={location.locationName}
      />
      <div className="min-h-screen bg-background">
        <Header alwaysBlack={true} />
        <main className="relative">
          {/* Hero Section - full viewport */}
          <section className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src={location.heroImage}
                alt={heroAltText}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <div
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 leading-tight font-poppins text-white not-italic [&>h1]:text-inherit [&>h1]:font-inherit [&>h1]:leading-inherit [&>h1]:m-0"
                dangerouslySetInnerHTML={{ __html: location.heroText }}
              />

              <div
                className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed font-poppins not-italic"
                dangerouslySetInnerHTML={{ __html: location.heroSubtext }}
              />
            </div>
          </section>

          {/* Properties Grid Section */}
          <section id="properties" className="py-16 md:py-24 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2"
                  dangerouslySetInnerHTML={{ __html: location.exploreSectionHeading || "Explore Properties" }}
                />
                <p
                  className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins"
                  dangerouslySetInnerHTML={{ __html: location.exploreSectionDescription ?? "" }}
                />
              </div>

              {/* Property Filters Section */}
              <LocationPropertyFilters
                location={location.slug}
                localities={localities}
              />

              {properties.length > 0 ? (
                <NoidaPropertiesGrid 
                  initialProperties={properties} 
                  location={location.slug}
                  initialTotalCount={totalPropertiesCount ?? properties.length}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
                  <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
                    No properties available in this location at the moment.
                  </p>
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
                  >
                    View All Properties
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* SEO content blocks: server-rendered HTML only; client controller gets counts (no data payload duplication) */}
          {location.blogs && location.blogs.length > 0 && (
            <section className="py-8 md:py-12 bg-background">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <SeoBlocksRevealController
                  initialVisible={1}
                  step={1}
                  totalCount={location.blogs.length}
                >
                  {location.blogs.map((blog, index) => (
                    <article key={index} data-seo-block className="w-full mb-4 md:mb-6">
                      <header className="text-center mb-8 md:mb-12">
                        <h2
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-poppins leading-tight"
                          dangerouslySetInnerHTML={{ __html: blog.title }}
                        />
                      </header>
                      <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                          <div
                            className="w-full max-w-none text-sm md:text-base text-gray-700 font-poppins leading-[1.8] [&>p]:w-full [&>p]:max-w-none [&>p]:block [&>p]:mb-6 [&>p:last-child]:mb-0 [&>h3]:w-full [&>h3]:max-w-none [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mb-3 [&>h3]:mt-0"
                            dangerouslySetInnerHTML={{ __html: blog.description }}
                          />
                        </div>
                      </div>
                      {index < location.blogs.length - 1 && (
                        <div
                          className="w-full flex justify-center py-6 md:py-8"
                          data-seo-separator={index}
                        >
                          <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                        </div>
                      )}
                    </article>
                  ))}
                </SeoBlocksRevealController>
              </div>

              <div className="w-full flex justify-center py-2">
                <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
              </div>
            </section>
          )}

          {/* Compare Nearby NCR Markets - from locations_v2 compare_location_1/2/3 */}
          {compareLocations.length > 0 && (
            <>
              <section className="py-14 md:py-20 bg-background">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 font-poppins">
                      Compare Nearby NCR Markets Before You Decide
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-center font-poppins">
                      Explore adjacent corridors with image-led cards so you can compare options before deciding.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {compareLocations.map((region) => (
                      <Link
                        key={region.href}
                        href={region.href}
                        className="group block"
                      >
                        <div className="relative h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                          <Image
                            src={region.image}
                            alt={region.alt}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={90}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 group-hover:from-black/95 transition-all duration-500" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#CBB27A] transition-colors font-poppins">
                              {region.title}
                            </h3>
                     
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* Aesthetic Line Separator */}
              <div className="w-full flex justify-center py-2">
                <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
              </div>
            </>
          )}

          {/* FAQ Section */}
          {location.faqs && location.faqs.length > 0 && (
            <>
              <section className="py-16 md:py-24 bg-background">
                <div className="max-w-4xl mx-auto px-6">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 font-poppins">
                      Everything you need to know about buying property in {location.locationName}
                    </p>
                  </div>
                  <LocationFAQs faqs={location.faqs} />
                </div>
              </section>

              {/* Aesthetic Line Separator */}
              <div className="w-full flex justify-center py-2">
                <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
              </div>
            </>
          )}

          {/* Footer CTA Section */}
          <section id="consultation" className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/NOIDA.avif')] opacity-10 bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left Column - Content */}
                <div className="space-y-6">
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                    dangerouslySetInnerHTML={{
                      __html:
                        location.footerCtaHeading ||
                        `Ready to Find Your Home in <span class="text-[#CBB27A]">${location.locationName}</span>?`,
                    }}
                  />
                  <p
                    className="text-lg text-white/80 leading-relaxed font-poppins"
                    dangerouslySetInnerHTML={{
                      __html:
                        location.footerCtaDescription ||
                        "Connect with our expert advisors for personalized guidance and exclusive property insights. We're here to help you make informed decisions about your next real estate investment.",
                    }}
                  />

                  {/* Contact Information */}
                  <div className="pt-4 space-y-4">
                    <a
                      href="tel:+919910906306"
                      className="flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                        <Phone className="w-5 h-5 text-[#CBB27A]" />
                      </div>
                      <span className="font-medium">+91 9910906306</span>
                    </a>
                    <div className="flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                        <Mail className="w-5 h-5 text-[#CBB27A]" />
                      </div>
                      <ObfuscatedEmail
                        variant="link"
                        className="font-medium text-white hover:text-[#CBB27A]"
                        showIcon={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Simple Form */}
                <LocationContactForm location={location.slug} locationDisplayName={location.locationName} />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      {location.faqs && location.faqs.length > 0 && (
        <FAQPageSchema faqs={location.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      )}
    </>
  );
}

