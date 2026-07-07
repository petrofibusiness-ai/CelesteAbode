import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Dumbbell,
  Droplets,
  Footprints,
  Home,
  ImageIcon,
  Landmark,
  Layers,
  MapPin,
  Plane,
  Shield,
  Sparkles,
  Store,
  Train,
  TreePine,
  TrendingUp,
  Route,
  Waves,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollFootnote, PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { formatProjectGalleryHeading } from "@/lib/project-gallery-heading";
import {
  ACE_PARKWAY_2_0_HERO_IMAGE,
  ACE_SECTOR_150_PROJECT_NAME,
  ACE_SECTOR_150_SLUG,
} from "@/lib/ace-parkway-2-0-assets";
import { SobhaRivanaGallery, type DemoGallerySlide } from "@/components/demo-property/sobha-rivana-gallery";
import { FloorPlansSection } from "@/components/property-public/floor-plans-section";
import { AceParkway20Hero } from "./ace-parkway-2-0-hero";
import { AceParkway20FooterCta } from "./ace-parkway-2-0-footer-cta";
import { AceParkway20MapEmbed, AceParkway20StickySidebar } from "./ace-parkway-2-0-sticky-sidebar";

const PROJECT_NAME = ACE_SECTOR_150_PROJECT_NAME;

const GALLERY_SLIDES: DemoGallerySlide[] = [
  {
    src: ACE_PARKWAY_2_0_HERO_IMAGE,
    alt: "Ace Sector 150 Noida, ultra-luxury towers overlooking central green and golf course",
    label: "Aerial view",
    width: 1600,
    height: 900,
  },
];

const ACE_FACTS = [
  "Luxury-focused NCR developer with delivered residential and commercial landmarks since 2010.",
  "Known for green-forward planning across Ace City, Ace Golfshire and Ace Parkway.",
  "New ultra-luxury pre-launch in Sector 150 with a lower-density master plan across 15 acres.",
  "Track record of timely delivery and premium construction quality across Noida and Greater Noida.",
];

const ROI_PROJECTION = [
  { label: "Pre-launch BSP", value: "₹16,995/sq ft*" },
  { label: "Expected launch BSP", value: "₹21,995/sq ft*" },
  { label: "3 BHK entry (approx.)", value: "~₹3.23 Cr*" },
  { label: "4 BHK entry (approx.)", value: "~₹4.42 Cr*" },
  { label: "4.5 BHK entry (approx.)", value: "~₹7.48 Cr*" },
  { label: "Pre-launch upside (indicative)", value: "~29% at launch BSP*" },
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Grand clubhouse", icon: Building2 },
  { label: "Swimming pool & deck", icon: Droplets },
  { label: "Expansive central green", icon: TreePine },
  { label: "Gymnasium & wellness", icon: Dumbbell },
  { label: "Sports & recreation", icon: Waves },
  { label: "Kids play zones", icon: Sparkles },
  { label: "Jogging & walking tracks", icon: Footprints },
  { label: "24×7 security & CCTV", icon: Shield },
];

const HIGHLIGHTS = [
  "Ultra-luxury pre-launch in Sector 150, Noida",
  "15 acres · 11 towers · approx 790 residences only",
  "3 BHK (1900 sq ft) · 4 BHK (2600 sq ft) · 4.5 BHK (4400 sq ft)",
  "Expansive central green and full-scale modern clubhouse",
  "Pre-launch BSP ₹16,995/sq ft* · launch BSP ₹21,995/sq ft*",
  "EOI allotment · limited inventory at pre-launch benefits",
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "Expressway",
    text: "Noida-Greater Noida Expressway access · 45m sector roads (as marketed)",
    icon: Route,
  },
  {
    label: "Metro",
    text: "Sector 148 Aqua Line metro ~8-10 min drive (as marketed)",
    icon: Train,
  },
  {
    label: "Golf & sports",
    text: "Sector 150 golf course · F1 circuit and sports city belt nearby",
    icon: Landmark,
  },
  {
    label: "Airport",
    text: "Jewar International Airport ~25-30 min (as marketed)",
    icon: Plane,
  },
  {
    label: "Sector 150",
    text: "Low-density master plan · among Noida's greenest sectors",
    icon: TreePine,
  },
  {
    label: "Daily needs",
    text: "Expressway retail · schools and hospitals in the Noida 150 belt",
    icon: Store,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-noida", title: "Noida", sub: "Sector 150 and expressway belt" },
  { href: "/flats-for-sale-in-noida", title: "Flats in Noida", sub: "Compare apartment launches" },
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "Expressway and new sectors" },
  { href: "/properties", title: "All NCR", sub: "Browse all projects" },
];

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  id,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className="mb-8 w-full text-left">
      <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CBB27A]/10 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 text-[#CBB27A] sm:h-6 sm:w-6" aria-hidden />
        </div>
        {id ? (
          <h2
            id={id}
            className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h2>
        ) : (
          <h2
            className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h2>
        )}
      </div>
      <div className="mb-6 h-1 w-16 bg-[#CBB27A] sm:mb-8 sm:w-20" />
      {subtitle ? <PropertyScrollSubtext>{subtitle}</PropertyScrollSubtext> : null}
    </div>
  );
}

export function AceParkway20Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "Pre-launch ultra-luxury 3, 4 and 4.5 BHK apartments in Sector 150, Noida by ACE Group with BSP from Rs 16,995 per sq ft.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sector 150, Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "ACE Group" },
    numberOfBedrooms: ["3", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Noida", url: `${site}/properties-in-noida` },
          { name: PROJECT_NAME, url: `${site}/properties-in-noida/${ACE_SECTOR_150_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <AceParkway20Hero />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_288px] lg:items-start lg:gap-x-6 xl:gap-x-8">
              <div className="min-w-0 w-full">
                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                  <SectionHeading id="snapshot-h2" icon={Home} title="Project Snapshot" />
                  <ul className="grid w-full min-w-0 gap-3 sm:grid-cols-2" role="list">
                    {HIGHLIGHTS.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left text-sm font-semibold leading-snug text-gray-900 shadow-sm"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBB27A]" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <PropertyScrollFootnote>
                    *Pre-launch inputs only. Allotment via EOI on a first-come, first-served basis. RERA registration
                    in process. Final sizes, PLC, floor rise, and other charges follow official developer communication.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="EOI & Pre-Launch Benefits"
                    subtitle="Submit your EOI early to secure allotment preference before launch pricing takes effect."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      3 BHK (1900 sq ft): EOI <span className="text-[#8a7340]">₹10 Lakh*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      4 BHK (2600 sq ft): EOI <span className="text-[#8a7340]">₹15 Lakh*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      4.5 BHK (4400 sq ft): EOI <span className="text-[#8a7340]">₹20 Lakh*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Limited inventory across 11 towers. Early EOIs get preference on tower, floor, and view
                    </li>
                  </ul>
                </section>

                {GALLERY_SLIDES.length > 0 ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="project-gallery-h2">
                    <SectionHeading
                      id="project-gallery-h2"
                      icon={ImageIcon}
                      title={formatProjectGalleryHeading(PROJECT_NAME)}
                      subtitle="Renders and lifestyle imagery will be updated as official media is released."
                    />
                    <div className="w-full">
                      <SobhaRivanaGallery slides={GALLERY_SLIDES} theme="dark" cinema />
                    </div>
                  </section>
                ) : null}

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <AceParkway20StickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-ace-h2">
                  <SectionHeading
                    id="why-ace-h2"
                    icon={Building2}
                    title="Why ACE Group?"
                    subtitle="A trusted Noida developer now bringing its most awaited ultra-luxury residential chapter to Sector 150."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {ACE_FACTS.map((line) => (
                      <li
                        key={line}
                        className="rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-left text-sm font-semibold leading-relaxed text-gray-900 sm:text-base"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                  <PropertyScrollSubtext className="mt-8 text-sm">
                    Compare Sector 150 launches across{" "}
                    <Link href="/properties-in-noida" className="font-semibold text-[#CBB27A] hover:underline">
                      Noida
                    </Link>{" "}
                    with an advisor who reads the expressway belt, not just the brochure headline.
                  </PropertyScrollSubtext>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <AceParkway20StickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="floor-plans-h2">
                  <SectionHeading
                    id="floor-plans-h2"
                    icon={Layers}
                    title="Configurations & Unit Sizes"
                    subtitle="Spacious ultra-luxury formats designed for families who want scale, privacy, and Sector 150 address value."
                  />
                  <FloorPlansSection
                    propertyName={PROJECT_NAME}
                    propertySlug={ACE_SECTOR_150_SLUG}
                    floorPlanUrl=""
                  />
                  <ul className="mt-6 grid w-full gap-3 sm:grid-cols-3" role="list">
                    <li className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm">
                      3 BHK: 1900 sq ft
                    </li>
                    <li className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm">
                      4 BHK: 2600 sq ft
                    </li>
                    <li className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm">
                      4.5 BHK: 4400 sq ft
                    </li>
                  </ul>
                </section>

                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="roi-projection-h2">
                  <SectionHeading id="roi-projection-h2" icon={TrendingUp} title="Pricing & Investment Outlook" />
                  <ul className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                    {ROI_PROJECTION.map(({ label, value }) => (
                      <li
                        key={label}
                        className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-left shadow-sm"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
                        <p className="mt-2 text-xl font-bold leading-tight text-[#CBB27A] sm:text-2xl">{value}</p>
                      </li>
                    ))}
                  </ul>
                  <PropertyScrollFootnote>
                    *Indicative only. BSP excludes PLC, floor rise, parking, and statutory charges. Entry tickets
                    approximate at pre-launch BSP on listed sizes. Actual returns depend on allotment, possession, and
                    market cycle.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    A grand clubhouse and expansive central green anchor everyday living across this low-density,
                    green-first campus.
                  </PropertyScrollSubtext>
                  <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {AMENITIES.map(({ label, icon: AmIcon }) => (
                      <div
                        key={label}
                        className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-[#CBB27A]/30 hover:shadow-xl sm:p-6"
                      >
                        <div className="flex flex-col items-center space-y-3 text-center sm:space-y-4">
                          <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#CBB27A]/10 bg-gradient-to-br from-[#CBB27A]/10 via-[#CBB27A]/5 to-[#CBB27A]/10 shadow-sm transition group-hover:border-[#CBB27A]/20 sm:h-20 sm:w-20">
                            <AmIcon className="h-8 w-8 text-[#CBB27A] sm:h-9 sm:w-9" strokeWidth={2} aria-hidden />
                          </div>
                          <p
                            className="min-h-[2.5em] text-xs font-semibold leading-tight text-gray-900 sm:text-sm md:text-base"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="location-advantage-h2">
                  <SectionHeading id="location-advantage-h2" icon={MapPin} title="Location Advantage" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Approximate drive times and distances as marketed for Sector 150. Verify on site visit.
                  </PropertyScrollSubtext>
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                    {LOCATION_ADVANTAGE.map(({ label, text, icon: RowIcon }) => (
                      <li
                        key={label}
                        className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-[#CBB27A]/30 hover:shadow-md sm:p-5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#CBB27A]/15 bg-[#CBB27A]/10">
                          <RowIcon className="h-6 w-6 text-[#CBB27A]" strokeWidth={2} aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
                          <p
                            className="mt-1.5 text-sm leading-relaxed text-gray-900"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 w-full sm:mt-12">
                    <AceParkway20MapEmbed />
                  </div>
                </section>

                <section className="mb-4 sm:mb-8" aria-labelledby="ncr-h2">
                  <SectionHeading id="ncr-h2" icon={Building2} title="Explore more in NCR" />
                  <ul className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
                    {NCR_LINKS.map((card) => (
                      <li key={card.href}>
                        <Link
                          href={card.href}
                          className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-[#CBB27A]/40 hover:shadow-md"
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {card.title}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#CBB27A]" />
                          </span>
                          <span className="mt-1 text-left text-xs text-gray-600">{card.sub}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside
                id="ace-parkway-2-0-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <AceParkway20StickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <AceParkway20FooterCta />
        <Footer />
      </div>
    </>
  );
}
