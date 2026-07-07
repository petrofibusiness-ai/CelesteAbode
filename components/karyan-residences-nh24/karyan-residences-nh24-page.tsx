import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Dumbbell,
  Droplets,
  Footprints,
  GraduationCap,
  Home,
  ImageIcon,
  Landmark,
  Layers,
  MapPin,
  Shield,
  Sparkles,
  Stethoscope,
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
  KARYAN_NH24_PROJECT_NAME,
  KARYAN_NH24_SLUG,
  KARYAN_RESIDENCES_NH24_AERIAL_VIEW_IMAGE,
  KARYAN_RESIDENCES_NH24_HERO_IMAGE,
  KARYAN_RESIDENCES_NH24_LANDSCAPED_CAMPUS_IMAGE,
} from "@/lib/karyan-residences-nh24-assets";
import { SobhaRivanaGallery, type DemoGallerySlide } from "@/components/demo-property/sobha-rivana-gallery";
import { FloorPlansSection } from "@/components/property-public/floor-plans-section";
import { KaryanResidencesNh24Hero } from "./karyan-residences-nh24-hero";
import { KaryanResidencesNh24FooterCta } from "./karyan-residences-nh24-footer-cta";
import {
  KaryanResidencesNh24MapEmbed,
  KaryanResidencesNh24StickySidebar,
} from "./karyan-residences-nh24-sticky-sidebar";

const PROJECT_NAME = KARYAN_NH24_PROJECT_NAME;

const GALLERY_SLIDES: DemoGallerySlide[] = [
  {
    src: KARYAN_RESIDENCES_NH24_HERO_IMAGE,
    alt: "Karyan NH-24 Ghaziabad, residential towers and entrance on NH-24",
    label: "Residential view",
    width: 1600,
    height: 900,
  },
  {
    src: KARYAN_RESIDENCES_NH24_AERIAL_VIEW_IMAGE,
    alt: "Karyan NH-24 Ghaziabad, aerial view of towers along NH-24 at sunset",
    label: "Aerial view",
    width: 1600,
    height: 900,
  },
  {
    src: KARYAN_RESIDENCES_NH24_LANDSCAPED_CAMPUS_IMAGE,
    alt: "Karyan NH-24 Ghaziabad, landscaped central campus with clubhouse and greens",
    label: "Landscaped campus",
    width: 1600,
    height: 900,
  },
];

const KARYAN_FACTS = [
  "NCR developer active across residential, commercial and warehousing since 2006.",
  "Delivered retail landmarks at Wave City: Avenue IV, Karyan Square and StreetWalk.",
  "Now entering mass-premium housing on NH-24 with Mivan-built high-rises.",
  "Pre-launch positioned as the corridor's next large-format residential opportunity.",
];

const ROI_PROJECTION = [
  { label: "Pre-launch BSP", value: "₹5,900/sq ft*" },
  { label: "Expected launch BSP", value: "₹7,500/sq ft*" },
  { label: "2 BHK entry (approx.)", value: "From ~₹58.8 Lakh*" },
  { label: "EOI amount", value: "₹5 Lakh*" },
  { label: "Payment structure", value: "25 × 4*" },
  { label: "Pre-launch upside (indicative)", value: "~27% at launch BSP*" },
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Grand luxury clubhouse", icon: Building2 },
  { label: "Swimming pool & deck", icon: Droplets },
  { label: "Gymnasium & wellness", icon: Dumbbell },
  { label: "Landscaped greens", icon: TreePine },
  { label: "Jogging & walking tracks", icon: Footprints },
  { label: "Kids play zones", icon: Sparkles },
  { label: "Indoor & outdoor sports", icon: Waves },
  { label: "24×7 security & CCTV", icon: Shield },
];

const HIGHLIGHTS = [
  "Pre-launch on NH-24, Ghaziabad, near Wave City corridor",
  "Approx 8.5 acres · 10 residential towers · Mivan construction",
  "2 BHK (1000–1100 sq ft) · 2 BHK + Study (1200–1300 sq ft) · 3 BHK (~1400 sq ft)",
  "Grand luxury clubhouse with world-class lifestyle amenities",
  "Pre-launch BSP ₹5,900/sq ft* · launch BSP ₹7,500/sq ft*",
  "EOI ₹5 Lakh* · 25×4 payment plan · allotment strictly via EOI, FCFS",
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  { label: "NH-24", text: "On NH-24 frontage · Delhi ~30 min · Noida Sec-62 ~15 min (as marketed)", icon: Route },
  { label: "Wave City", text: "Wave Galleria ~2.7 km · daily retail and schools in the Wave City belt", icon: Store },
  { label: "Expressways", text: "Eastern Peripheral Expressway ~6 min · Delhi–Meerut Expressway access", icon: Landmark },
  { label: "Metro & rail", text: "Shaheed Sthal Metro ~20 min · Ghaziabad Railway ~20 min · Noida Electronic City Metro ~20 min", icon: Train },
  { label: "Healthcare", text: "Manipal & Sarvodaya ~6 km · Yashoda and other Ghaziabad hospitals nearby", icon: Stethoscope },
  { label: "Schools", text: "DPS, Ryan International and Wave City school catchments within a short drive", icon: GraduationCap },
];

const NCR_LINKS = [
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "NH-24, Wave City and Indirapuram" },
  { href: "/properties-in-noida", title: "Noida", sub: "Metro and office corridors" },
  { href: "/flats-for-sale-in-noida", title: "Flats in Noida", sub: "Compare apartment launches" },
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

export function KaryanResidencesNh24Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "Pre-launch 2, 2+Study and 3 BHK apartments on NH-24, Ghaziabad by Karyan Group with Mivan construction and BSP from Rs 5,900 per sq ft.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "NH-24, Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Karyan Group" },
    numberOfBedrooms: ["2", "3"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Ghaziabad", url: `${site}/properties-in-ghaziabad` },
          { name: PROJECT_NAME, url: `${site}/properties-in-ghaziabad/${KARYAN_NH24_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <KaryanResidencesNh24Hero />

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
                    *Pre-launch inputs only. Allotment is strictly through the EOI process on a first-come,
                    first-served basis. Final sizes, tower count, floor rise, PLC, and approvals follow official
                    developer communication.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="Early-Mover Advantage"
                    subtitle="Block inventory at pre-launch BSP before the public price revision to launch levels."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      EOI amount: <span className="text-[#8a7340]">₹5 Lakh*</span>. Required to participate in
                      allotment
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Payment plan: <span className="text-[#8a7340]">25 × 4</span>. Structured for manageable
                      milestone payments
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Limited pre-launch inventory. Early EOIs get preference on tower, floor, and configuration
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Indicative price gap: ~₹1,600/sq ft between pre-launch and launch BSP before possession-led
                      appreciation
                    </li>
                  </ul>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="project-gallery-h2">
                  <SectionHeading
                    id="project-gallery-h2"
                    icon={ImageIcon}
                    title={formatProjectGalleryHeading(PROJECT_NAME)}
                    subtitle="Renders and lifestyle imagery will be updated as the builder releases official media."
                  />
                  <div className="w-full">
                    <SobhaRivanaGallery slides={GALLERY_SLIDES} theme="dark" cinema />
                  </div>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <KaryanResidencesNh24StickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-karyan-h2">
                  <SectionHeading
                    id="why-karyan-h2"
                    icon={Building2}
                    title="Why Karyan Group?"
                    subtitle="Known for experience-led commercial destinations in Ghaziabad. Now bringing that design discipline to a large-format residential community on NH-24."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {KARYAN_FACTS.map((line) => (
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
                    Compare NH-24 launches across{" "}
                    <Link href="/properties-in-ghaziabad" className="font-semibold text-[#CBB27A] hover:underline">
                      Ghaziabad
                    </Link>{" "}
                    with an advisor who reads the corridor, not just the brochure headline.
                  </PropertyScrollSubtext>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <KaryanResidencesNh24StickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="floor-plans-h2">
                  <SectionHeading
                    id="floor-plans-h2"
                    icon={Layers}
                    title="Configurations & Unit Sizes"
                    subtitle="Smartly planned layouts for young families, upgraders, and investors who want efficient carpet use with modern circulation."
                  />
                  <FloorPlansSection
                    propertyName={PROJECT_NAME}
                    propertySlug={KARYAN_NH24_SLUG}
                    floorPlanUrl=""
                  />
                  <ul className="mt-6 grid w-full gap-3 sm:grid-cols-3" role="list">
                    <li className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm">
                      2 BHK: 1000 to 1100 sq ft
                    </li>
                    <li className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm">
                      2 BHK + Study: 1200 to 1300 sq ft
                    </li>
                    <li className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm">
                      3 BHK: approx 1400 sq ft
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
                    *Indicative only. A 1000 sq ft 2 BHK at ₹5,900/sq ft approximates ₹58.8 Lakh BSP before PLC,
                    floor rise, parking, and statutory charges. Launch BSP is marketed at ₹7,500/sq ft. Actual returns
                    depend on allotment, possession timeline, and market cycle.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    A grand luxury clubhouse anchors the lifestyle stack: pool, fitness, recreation, and secure
                    community living across the 8.5-acre campus.
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
                    Approximate drive times and distances as marketed for the NH-24 / Wave City belt. Verify on site visit.
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
                    <KaryanResidencesNh24MapEmbed />
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
                id="karyan-residences-nh24-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <KaryanResidencesNh24StickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <KaryanResidencesNh24FooterCta />
        <Footer />
      </div>
    </>
  );
}
