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
import { PropertyLeadForm } from "@/components/property-lead-form";
import NoidaFAQs from "@/components/noida-faqs";
import { NoidaPropertiesGrid } from "@/components/noida-properties-grid";

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
    .select("id, slug, project_name, developer, location, location_category, status, hero_image, is_published, created_at, updated_at")
    .eq("location_category", LOCATION)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  // If no properties found or error, try without location_category filter (fallback)
  if (error || !propertiesData || propertiesData.length === 0) {
    console.warn(`No properties found with location_category="${LOCATION}". Trying fallback query...`);
    const fallbackQuery = await supabase
      .from("properties")
      .select("id, slug, project_name, developer, location, location_category, status, hero_image, is_published, created_at, updated_at")
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-poppins text-white">
                Your Dream Home in{" "}
                <span className="text-[#CBB27A]">Noida</span> Awaits
              </h1>
              
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed font-poppins">
                In Delhi NCR, where every investment counts, Noida stands as the smart choice. 
                Planned infrastructure, metro connectivity, and premium living—all backed by 
                <span className="text-[#CBB27A] font-semibold"> RERA-compliant projects</span> and 
                <span className="text-[#CBB27A] font-semibold"> data-driven insights</span>.
              </p>
            </div>
          </section>


          {/* Properties Grid Section with Sticky CTA */}
          <section id="properties" className="py-16 md:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Premium Properties in <span className="text-[#CBB27A]">Noida</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins">
                  Curated selection of RERA-compliant projects with verified credentials
                </p>
              </div>

              {properties.length > 0 ? (
                <NoidaPropertiesGrid initialProperties={properties} location={LOCATION} />
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 mb-6 font-poppins">
                    No properties available in this location at the moment.
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
                  >
                    View All Properties
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Celeste Abode Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-[#CBB27A]/5 via-white to-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CBB27A]/10 rounded-full mb-6">
                      <Award className="w-5 h-5 text-[#CBB27A]" />
                      <span className="text-sm font-semibold text-[#CBB27A]">About Celeste Abode</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Your Trusted Real Estate Partner in <span className="text-[#CBB27A]">Delhi NCR</span>
                    </h2>
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
                  <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
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

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-white">
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

          {/* Footer CTA Section - Noida Specific */}
          <section id="consultation" className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/NOIDA.avif')] opacity-10 bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />
            
            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Ready to Find Your Home in <span className="text-[#CBB27A]">Noida</span>?
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto font-poppins mb-8">
                  Get a free, no-obligation consultation with our Noida property experts. 
                  We'll help you find the perfect property that matches your budget, lifestyle, and investment goals.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#CBB27A] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 font-poppins">RERA-compliant project verification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#CBB27A] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 font-poppins">Data-driven market analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#CBB27A] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 font-poppins">Local NCR expertise & insights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#CBB27A] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 font-poppins">Transparent, no-pressure approach</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <PropertyLeadForm
                    propertyName="Properties in Noida"
                    propertyLocation="Noida, Delhi NCR"
                    variant="inline"
                  />
                </div>
              </div>

              <div className="mt-12 text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="tel:+919818735258"
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+91 9818735258</span>
                  </a>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium border border-white/20">
                    <Mail className="w-5 h-5" />
                    <ObfuscatedEmail variant="link" className="text-white hover:text-[#CBB27A]" showIcon={false} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
