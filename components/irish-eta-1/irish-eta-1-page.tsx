import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Dumbbell,
  Droplets,
  Footprints,
  Home,
  Landmark,
  MapPin,
  Route,
  Shield,
  Sparkles,
  Store,
  Train,
  TreePine,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollFootnote, PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { IRISH_ETA_1_PROJECT_NAME, IRISH_ETA_1_SLUG } from "@/lib/irish-eta-1-assets";
import { IrishEta1Hero } from "./irish-eta-1-hero";
import { IrishEta1FooterCta } from "./irish-eta-1-footer-cta";
import { IrishEta1MapEmbed, IrishEta1StickySidebar } from "./irish-eta-1-sticky-sidebar";

const PROJECT_NAME = IRISH_ETA_1_PROJECT_NAME;

const IRISH_FACTS = [
  "Irish Infrastructure Group — residential developer active in Greater Noida and Greater Noida West.",
  "Known for Irish Pearls / Irish Platinum corridor projects in the Noida Extension belt.",
  "New pre-launch in Sector ETA-1 with only 4 towers.",
  "Early inventory priced for first movers before wider public booking.",
];

const ROI_PROJECTION = [
  { label: "Pre-launch BSP", value: "₹8,500/sq ft*" },
  { label: "GST", value: "5%*" },
  { label: "1,450 sq ft entry", value: "~₹1.23 Cr*" },
  { label: "EOI", value: "25% self-fund*" },
  { label: "Payment plan", value: "25 : 25 : 25 : 25*" },
  { label: "Club size", value: "60,000 sq ft*" },
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "60,000 sq ft clubhouse", icon: Building2 },
  { label: "Swimming pool & deck", icon: Droplets },
  { label: "Landscaped greens", icon: TreePine },
  { label: "Gymnasium & wellness", icon: Dumbbell },
  { label: "Sports & recreation", icon: Waves },
  { label: "Kids play zones", icon: Sparkles },
  { label: "Jogging & walking tracks", icon: Footprints },
  { label: "24×7 security & CCTV", icon: Shield },
];

const HIGHLIGHTS = [
  "Pre-launch in Sector ETA-1, Greater Noida by Irish Group",
  "4 towers · 1,450 / 1,750 / 2,050 / 2,450 sq ft",
  "3 & 4 BHK · 12 ft ceilings · 8 ft balconies",
  "60,000 sq ft clubhouse",
  "Pre-launch BSP ₹8,500/sq ft* + GST 5%",
  "EOI 25% self-fund* · payment plan 25:25:25:25*",
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "ETA-1",
    text: "Sector ETA-1, Greater Noida — planned residential belt (as marketed)",
    icon: MapPin,
  },
  {
    label: "Expressway",
    text: "Noida–Greater Noida Expressway and Yamuna Expressway access nearby",
    icon: Route,
  },
  {
    label: "Metro",
    text: "Aqua Line / knowledge-park metro catchments within driving distance",
    icon: Train,
  },
  {
    label: "Daily needs",
    text: "Retail, schools and clinics in the Greater Noida residential belt",
    icon: Store,
  },
  {
    label: "Noida link",
    text: "Road access toward Noida office and metro corridors",
    icon: Landmark,
  },
  {
    label: "Campus",
    text: "4-tower layout with large club footprint for the plot size",
    icon: TreePine,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "ETA and knowledge park belt" },
  { href: "/flats-for-sale-in-greater-noida", title: "Flats in Greater Noida", sub: "Compare apartment launches" },
  { href: "/pre-launch-properties", title: "Pre-Launch", sub: "EOI-stage projects only" },
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

export function IrishEta1Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "Pre-launch 3 and 4 BHK apartments in Sector ETA-1, Greater Noida by Irish Group. Sizes 1450 to 2450 sq ft. BSP from Rs 8,500 per sq ft plus GST.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sector ETA-1, Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Irish Group" },
    numberOfBedrooms: ["3", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Greater Noida", url: `${site}/properties-in-greater-noida` },
          { name: PROJECT_NAME, url: `${site}/properties-in-greater-noida/${IRISH_ETA_1_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <IrishEta1Hero />

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
                    *Pre-launch inputs only. Final sizes, floor rise, PLC, and approvals follow official developer
                    communication.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="Early-Mover Advantage"
                    subtitle="Block inventory at pre-launch BSP before the public price revision."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      EOI: <span className="text-[#8a7340]">25% self-fund*</span>. Required to participate in
                      allotment
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Payment plan: <span className="text-[#8a7340]">25 : 25 : 25 : 25*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Limited early inventory. First 80–100 flats open at pre-launch BSP
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Next demand after about 2 years* — structured for staged payments
                    </li>
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <IrishEta1StickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-irish-h2">
                  <SectionHeading
                    id="why-irish-h2"
                    icon={Building2}
                    title="Why Irish Group?"
                    subtitle="Residential developer active across Greater Noida West — now launching in Sector ETA-1."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {IRISH_FACTS.map((line) => (
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
                    Compare Greater Noida launches on{" "}
                    <Link
                      href="/properties-in-greater-noida"
                      className="font-semibold text-[#CBB27A] hover:underline"
                    >
                      our Greater Noida page
                    </Link>
                    .
                  </PropertyScrollSubtext>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <IrishEta1StickySidebar idPrefix="mob-call" part="callback" />
                </div>

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
                    *Indicative. 1,450 × ₹8,500 ≈ ₹1.23 Cr BSP before PLC, floor rise, parking, and other charges. GST
                    at 5% is extra.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    A 60,000 sq ft clubhouse anchors lifestyle amenities across the 4-tower campus.
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
                    Approximate access as marketed for Sector ETA-1, Greater Noida. Verify on site visit.
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
                    <IrishEta1MapEmbed />
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
                id="irish-eta-1-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <IrishEta1StickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <IrishEta1FooterCta />
        <Footer />
      </div>
    </>
  );
}
