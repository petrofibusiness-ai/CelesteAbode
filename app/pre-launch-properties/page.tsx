import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LocationPropertyFilters } from "@/components/location-property-filters";
import { PreLaunchPropertiesGrid } from "@/components/pre-launch-properties-grid";
import { fetchPreLaunchListingData } from "@/lib/fetch-pre-launch-listing-data";
import { PRE_LAUNCH_LOCATION_OPTIONS } from "@/lib/pre-launch-locations";
import { ACE_PARKWAY_2_0_HERO_IMAGE } from "@/lib/ace-parkway-2-0-assets";
import { PROPERTY_SEARCH_ANCHOR_ID } from "@/lib/scroll-listings";
import { LOCATION_SECTION_HEADING_CLASS } from "@/lib/location-page-typography";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { Building2, Phone, Mail, Sparkles } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

const SITE_URL = "https://www.celesteabode.com";
const PAGE_URL = `${SITE_URL}/pre-launch-properties`;

export const metadata: Metadata = {
  title: "Pre-Launch Properties in NCR | Celeste Abode",
  description:
    "Explore curated pre-launch residential projects across Noida, Greater Noida, Yamuna Expressway, and Ghaziabad. EOI-stage developments with early pricing — separate from new launch listings.",
  keywords:
    "pre launch properties, pre launch apartments noida, pre launch ghaziabad, eoi properties ncr, yamuna expressway pre launch",
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: "Pre-Launch Properties | Celeste Abode",
    description:
      "Curated pre-launch projects across NCR — EOI-stage developments with early allotment guidance from Celeste Abode.",
    url: PAGE_URL,
    siteName: "Celeste Abode",
    images: [
      {
        url: ACE_PARKWAY_2_0_HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pre-launch properties across NCR - Celeste Abode",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre-Launch Properties | Celeste Abode",
    description:
      "Curated pre-launch projects across NCR — EOI-stage developments with early allotment guidance from Celeste Abode.",
    images: [ACE_PARKWAY_2_0_HERO_IMAGE],
    creator: "@celesteabode",
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 10;

export default async function PreLaunchPropertiesPage() {
  const { properties, totalCount } = await fetchPreLaunchListingData();

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Properties", url: `${SITE_URL}/properties` },
    { name: "Pre-Launch Properties", url: PAGE_URL },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main className="relative">
          <section className="relative min-h-screen flex items-center justify-center" data-site-hero>
            <div className="absolute inset-0">
              <Image
                src={ACE_PARKWAY_2_0_HERO_IMAGE}
                alt="Pre-launch properties across NCR"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,178,122,0.12),transparent_65%)]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#CBB27A]/40 bg-black/35 px-4 py-2 mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#CBB27A]" />
                <span className="text-sm font-medium text-[#CBB27A] font-poppins tracking-wide">
                  EOI & Early Allotment
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight font-poppins text-white">
                Pre-Launch Properties
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-poppins">
                Discover a curated selection of EOI-stage developments before public launch across Noida,
                Greater Noida, Yamuna Expressway, and Ghaziabad. For new launches and ready-to-move
                properties, explore our location-wise property pages.
              </p>
            </div>
          </section>

          <section id="properties" className="py-16 md:py-24 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className={`${LOCATION_SECTION_HEADING_CLASS} text-foreground mb-3 md:mb-4 leading-tight px-2`}>
                  Explore Pre-Launch Projects
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins">
                  Filter by location, property type, and configuration. Only pre-launch projects appear here —
                  not new launch or under-construction listings from our main catalog.
                </p>
              </div>

              <div
                id={PROPERTY_SEARCH_ANCHOR_ID}
                className="scroll-mt-24 md:scroll-mt-28"
                aria-label="Search and filter pre-launch properties"
              >
                <LocationPropertyFilters
                  location="pre-launch"
                  localities={PRE_LAUNCH_LOCATION_OPTIONS}
                  localityLabel="Location"
                  localityAllLabel="All Locations"
                  hideProjectStatus
                  filterEventName="pre-launch-filter-change"
                  loadingEventName="pre-launch-properties-loading"
                />
              </div>

              {properties.length > 0 ? (
                <PreLaunchPropertiesGrid initialProperties={properties} initialTotalCount={totalCount} />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
                  <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
                    No pre-launch properties are listed at the moment.
                  </p>
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors font-poppins"
                  >
                    View All Properties
                  </Link>
                </div>
              )}
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/NOIDA.avif')] opacity-10 bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h2 className={`${LOCATION_SECTION_HEADING_CLASS} text-white mb-4`}>
                Interested in a <span className="text-[#CBB27A]">Pre-Launch</span> Project?
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-poppins mb-8 max-w-2xl mx-auto">
                Speak with our advisors for early pricing insights, floor plan guidance, and site visit
                coordination across NCR.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <a
                  href="tel:+919910906306"
                  className="inline-flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group font-poppins"
                >
                  <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                    <Phone className="w-5 h-5 text-[#CBB27A]" />
                  </div>
                  <span className="font-medium">+91 9910906306</span>
                </a>
                <div className="inline-flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group font-poppins">
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
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
