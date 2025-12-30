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

interface PageProps {
  params: Promise<{
    locationCategory: string;
  }>;
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
      title: "Location Not Found | Celeste Abode",
    };
  }

  const locationData = supabaseToLocation(data);

  return {
    title: locationData.metaTitle,
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
    .select("id, slug, project_name, developer, location, location_id, locality_id, project_status, hero_image, is_published, created_at, updated_at")
    .eq("location_id", location.id) // MANDATORY: Only properties for this location
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6);

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

  const heroAltText = location.imageAltTexts?.hero || `Properties in ${location.locationName} - Celeste Abode`;
  const celesteAbodeAltText = location.imageAltTexts?.celesteAbode || `Celeste Abode - Trusted Real Estate Consultant in ${location.locationName}`;

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header alwaysBlack={true} />
        <main className="relative">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src={location.heroImage}
                alt={heroAltText}
                fill
                priority
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight font-poppins text-white not-italic">
                {location.heroText.includes(location.locationName) ? (
                  location.heroText.split(location.locationName).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-[#CBB27A]">{location.locationName}</span>}
                    </span>
                  ))
                ) : (
                  location.heroText
                )}
              </h1>

              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed font-poppins not-italic">
                {location.heroSubtext}
              </p>
            </div>
          </section>

          {/* Properties Grid Section */}
          <section id="properties" className="py-16 md:py-24 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                  {location.exploreSectionHeading && location.exploreSectionHeading.includes("Curated Collection") ? (
                    location.exploreSectionHeading.split("Curated Collection").map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-[#CBB27A]">Curated Collection</span>}
                      </span>
                    ))
                  ) : (
                    location.exploreSectionHeading || "Explore Properties"
                  )}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins">
                  {location.exploreSectionDescription}
                </p>
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

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-2">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Why Invest Section */}
          <WhyInvestSection location={location} />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-2">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Celeste Abode Section */}
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#CBB27A] mb-4 font-poppins tracking-tight">
                      Celeste Abode
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 font-poppins">
                      Your Trusted Real Estate Partner in <span className="text-[#CBB27A]">Delhi NCR</span>
                    </h3>
                    <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                      In a market driven by pressure and noise, Celeste Abode focuses on what actually protects your decision: 
                      <span className="font-semibold text-gray-900"> RERA-compliant projects</span>, 
                      <span className="font-semibold text-gray-900"> data-backed analysis</span>, and 
                      <span className="font-semibold text-gray-900"> deep local understanding</span>.
                    </p>
                    <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                      Our role is not to push options, but to help you evaluate what makes sense financially, legally, and long-term. 
                      From Noida to Greater Noida, every recommendation is guided by one principle: 
                      <span className="font-semibold text-[#CBB27A]"> secure decisions today that hold value tomorrow</span>.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#CBB27A]" />
                        <span className="text-sm font-medium text-gray-700">RERA Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#CBB27A]" />
                        <span className="text-sm font-medium text-gray-700">Data-Driven Insights</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#CBB27A]" />
                        <span className="text-sm font-medium text-gray-700">Local Expertise</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden order-1 md:order-2">
                    <Image
                      src={location.celesteAbodeImage || location.heroImage}
                      alt={celesteAbodeAltText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-2">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

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
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {location.footerCtaHeading || "Ready to Find Your Home"} in <span className="text-[#CBB27A]">{location.locationName}</span>?
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed font-poppins">
                    {location.footerCtaDescription || "Connect with our expert advisors for personalized guidance and exclusive property insights. We're here to help you make informed decisions about your next real estate investment."}
                  </p>

                  {/* Contact Information */}
                  <div className="pt-4 space-y-4">
                    <a
                      href="tel:+919818735258"
                      className="flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                        <Phone className="w-5 h-5 text-[#CBB27A]" />
                      </div>
                      <span className="font-medium">+91 9818735258</span>
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
    </>
  );
}

