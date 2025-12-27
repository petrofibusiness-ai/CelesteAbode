import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Property } from "@/types/property";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { CheckCircle2, Phone, Mail, Building2, Award } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import NoidaFAQs from "@/components/noida-faqs";
import { NoidaPropertiesGrid } from "@/components/noida-properties-grid";
import { LocationPropertyFilters } from "@/components/location-property-filters";
import { LocationContactForm } from "@/components/location-contact-form";

const LOCATION = "noida";
const LOCATION_NAME = "Noida";
const HERO_IMAGE = "/NOIDA.avif";

export const metadata: Metadata = {
  title: "Properties in Noida | Premium Real Estate Noida | Celeste Abode",
  description: "Discover premium residential and investment properties in Noida, Delhi NCR. Expert real estate consulting for planned urbanism and smart living.",
  keywords: [
    "properties in Noida",
    "real estate Noida",
    "luxury apartments Noida",
    "Noida property consultant",
    "residential projects Noida",
    "investment properties Noida",
    "Noida Sector 62",
    "Noida Sector 150",
    "Noida Extension properties",
    "premium apartments Noida",
  ],
  openGraph: {
    title: "Premium Properties in Noida | Real Estate Consultant Noida",
    description: "Explore curated luxury residential projects, premium apartments, and investment properties in Noida. Expert real estate consulting for Sector 62, Sector 150, Noida Extension, and prime locations.",
    url: "https://www.celesteabode.com/properties-in-noida",
    siteName: "Celeste Abode",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: `Properties in ${LOCATION_NAME} - Celeste Abode`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Properties in Noida | Real Estate Consultant Noida",
    description: "Explore curated luxury residential projects, premium apartments, and investment properties in Noida.",
    images: [HERO_IMAGE],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/properties-in-noida",
  },
};

export default async function NoidaPropertiesPage() {
  // Fetch initial 6 properties for this location (cost-efficient)
  // Use admin client for public pages to bypass RLS and avoid JWT expiration issues
  const supabase = getSupabaseAdminClient();
  
  // Try to fetch with location_category first - only fetch 6 initially
  let { data: propertiesData, error } = await supabase
    .from("properties")
    .select("id, slug, project_name, developer, location, location_category, project_status, hero_image, is_published, created_at, updated_at")
    .eq("location_category", LOCATION)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  // If no properties found or error, try without location_category filter (fallback)
  if (error || !propertiesData || propertiesData.length === 0) {
    console.warn(`No properties found with location_category="${LOCATION}". Trying fallback query...`);
    const fallbackQuery = await supabase
      .from("properties")
      .select("id, slug, project_name, developer, location, location_category, project_project_status, hero_image, is_published, created_at, updated_at")
      .eq("is_published", true)
      .ilike("location", `%${LOCATION_NAME}%`)
      .order("created_at", { ascending: false })
      .limit(6);
    
    if (!fallbackQuery.error && fallbackQuery.data) {
      propertiesData = fallbackQuery.data;
      error = null;
      console.log(`Fallback query found ${propertiesData.length} properties`);
    }
  }

  // Log for debugging
  if (error) {
    console.error("Error fetching properties:", error);
  }
  console.log(`Fetched ${propertiesData?.length || 0} initial properties for location: ${LOCATION}`);

  const properties: Property[] = propertiesData
    ? propertiesData.map((prop: any) => supabaseToProperty(prop as any))
    : [];

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header alwaysBlack={true} />
        <main className="relative">
          {/* Hero Section - Full Viewport with NCR-Focused Content */}
          <section className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src={HERO_IMAGE}
                alt={`Properties in ${LOCATION_NAME} - Celeste Abode`}
                fill
                priority
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/25" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight font-poppins text-white not-italic">
                Premium Properties in <span className="text-[#CBB27A]">Noida</span>
              </h1>
              
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed font-poppins not-italic">
                Curated residential and investment opportunities in Delhi NCR's most strategically planned city.
              </p>
            </div>
          </section>

          {/* Properties Grid Section with Sticky CTA */}
          <section id="properties" className="py-16 md:py-24 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                  Explore Our <span className="text-[#CBB27A]">Curated Collection</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins">
                  RERA-compliant projects with verified credentials and transparent documentation
                </p>
              </div>

              {/* Property Filters Section */}
              <LocationPropertyFilters
                location={LOCATION}
                localities={[
                  { value: "sector-62", label: "Sector 62" },
                  { value: "sector-150", label: "Sector 150" },
                  { value: "sector-137", label: "Sector 137" },
                  { value: "sector-143", label: "Sector 143" },
                  { value: "sector-144", label: "Sector 144" },
                  { value: "sector-145", label: "Sector 145" },
                  { value: "sector-44", label: "Sector 44" },
                  { value: "sector-47", label: "Sector 47" },
                  { value: "sector-93", label: "Sector 93" },
                  { value: "sector-135", label: "Sector 135" },
                  { value: "noida-extension", label: "Noida Extension" },
                  { value: "noida-expressway", label: "Noida Expressway" },
                  { value: "sector-117", label: "Sector 117" },
                  { value: "sector-118", label: "Sector 118" },
                  { value: "sector-162", label: "Sector 162" },
                  { value: "sector-163", label: "Sector 163" },
                  { value: "sector-164", label: "Sector 164" },
                  { value: "sector-165", label: "Sector 165" },
                ]}
              />

              {properties.length > 0 ? (
                <NoidaPropertiesGrid initialProperties={properties} location={LOCATION} />
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

          {/* Why Invest in Noida Section */}
          <article className="mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-[1200px] mx-auto">
              {/* Heading Section */}
              <header className="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                  Why Invest in <span className="text-[#CBB27A]">Noida</span>?
                </h2>
              </header>

              {/* Main Content Card */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className="w-full max-w-none">
                    <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                      Noida stands as one of Delhi NCR's most strategically planned cities, with robust infrastructure that connects seamlessly to Delhi, Greater Noida, and Gurugram. The city's well-developed road network, including the Noida Expressway and Yamuna Expressway, ensures excellent connectivity for residents and businesses alike. With the upcoming Jewar International Airport just 30 minutes away, Noida is positioned to become a major transit and commercial hub in the region.
                    </p>

                    <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                      The metro connectivity in Noida continues to expand, with the Blue Line already serving key sectors and the Aqua Line connecting Greater Noida. Upcoming metro extensions will further enhance accessibility across the city, making daily commutes more convenient and increasing property values in well-connected sectors. This infrastructure development, combined with planned commercial corridors and IT parks, creates a strong foundation for long-term real estate appreciation.
                    </p>

                    <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                      Commercial hubs like Sector 18, Sector 62, and the emerging business districts along the Noida Expressway have transformed the city into a thriving economic center. Major IT companies, corporate offices, and retail establishments have established a strong presence, creating employment opportunities and driving demand for residential properties. This combination of planned infrastructure, expanding metro network, and growing commercial activity makes Noida an attractive destination for both end-users and investors seeking stable, long-term returns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

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
                      src="/NOIDA.avif"
                      alt="Celeste Abode - Trusted Real Estate Consultant"
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
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 font-poppins">
                  Everything you need to know about buying property in Noida
                </p>
              </div>
              <NoidaFAQs />
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-2">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Footer CTA Section - Simple & Aesthetic */}
          <section id="consultation" className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/NOIDA.avif')] opacity-10 bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />
            
            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left Column - Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Ready to Find Your Home in <span className="text-[#CBB27A]">Noida</span>?
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed font-poppins">
                    Connect with our expert advisors for personalized guidance and exclusive property insights. We're here to help you make informed decisions about your next real estate investment in Noida.
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
                <LocationContactForm location="noida" locationDisplayName="Noida" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
