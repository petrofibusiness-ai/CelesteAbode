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
import {
  PRATEEK_SECTOR_150_PROJECT_NAME,
  PRATEEK_SECTOR_150_SLUG,
} from "@/lib/prateek-sector-150-assets";
import { PrateekSector150Hero } from "./prateek-sector-150-hero";
import { PrateekSector150FooterCta } from "./prateek-sector-150-footer-cta";
import { PrateekSector150MapEmbed, PrateekSector150StickySidebar } from "./prateek-sector-150-sticky-sidebar";

const PROJECT_NAME = PRATEEK_SECTOR_150_PROJECT_NAME;

const PRATEEK_FACTS = [
  "Started in 2005 by civil engineer Prashant Tiwari. Twenty-plus years in building and real estate.",
  "Eleven projects delivered, including Prateek Edifice in Sector 107 and Prateek Grand City in Siddharth Vihar, Ghaziabad.",
  "Awards include NDTV Property Award, Luxury Project of the Year, Assocham Award, Star Realty Award, Business Sphere Award, and Best Developer in Noida at UPCON 2014.",
  "Prateek Canary is the group’s flagship golf-course-facing launch in Sector 150.",
];

const ROI_PROJECTION = [
  { label: "Pre-launch BSP", value: "₹16,500/sq ft*" },
  { label: "EOI amount", value: "₹10 Lakh*" },
  { label: "3 BHK + Servant", value: "~₹4.70 Cr*" },
  { label: "4 BHK + Servant", value: "~₹6.35 Cr*" },
  { label: "Payment plan", value: "10 · 20 · 20 · 20 · 30*" },
  { label: "RERA", value: "Not released" },
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Art Deco arrival lobby", icon: Building2 },
  { label: "Private party decks", icon: Sparkles },
  { label: "Lifts into the residence", icon: Waves },
  { label: "VRV air-conditioning", icon: Droplets },
  { label: "Yamuna-facing planning", icon: TreePine },
  { label: "Gymnasium & wellness", icon: Dumbbell },
  { label: "Sports-city belt access", icon: Footprints },
  { label: "24×7 security", icon: Shield },
];

const SNAPSHOT = [
  { label: "Location", value: "Sector 150, Noida Expressway" },
  { label: "Land & inventory", value: "About 11 acres · 442 residences*" },
  { label: "Towers", value: "S+32 floors · 2 homes per floor*" },
  { label: "3 BHK + Servant", value: "About 2,850 sq ft*" },
  { label: "4 BHK + Servant", value: "About 3,850 sq ft*" },
  { label: "Design", value: "Art Deco 2.0 · L-shaped layouts · limited penthouses*" },
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "Expressway",
    text: "Noida–Greater Noida Expressway frontage in Sector 150 (as marketed)",
    icon: Route,
  },
  {
    label: "River belt",
    text: "Yamuna-facing planning as presented at the August 2026 preview — confirm on plan",
    icon: TreePine,
  },
  {
    label: "Sports city",
    text: "Sector 150 sports infrastructure: golf, stadiums, and club amenities in the sector",
    icon: Landmark,
  },
  {
    label: "Metro",
    text: "Sector 148 Aqua Line metro within a short drive (as marketed)",
    icon: Train,
  },
  {
    label: "Airport",
    text: "Jewar International Airport ~25–30 min (as marketed)",
    icon: Plane,
  },
  {
    label: "Daily needs",
    text: "Expressway retail, schools, and hospitals in the Sector 150 belt",
    icon: Store,
  },
];

const PAYMENT_MILESTONES = [
  { when: "At EOI", due: "₹10 Lakh*" },
  { when: "At allotment", due: "10% of BSP (includes EOI)*" },
  { when: "60 days from allotment", due: "20% of BSP*" },
  { when: "16th floor casting or 24 months (later of the two)", due: "20% of BSP + parking + EV charging*" },
  { when: "Top-floor milestone", due: "20% of BSP + club + power backup*" },
  { when: "FDL for possession", due: "30% of BSP + IFMS + meter + lease rent*" },
];

const NCR_LINKS = [
  { href: "/properties-in-noida", title: "Noida", sub: "Sector 150 and expressway belt" },
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "Expressway and new sectors" },
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "NCR east" },
  { href: "/properties-in-yamuna-expressway", title: "Yamuna Expressway", sub: "Airport corridor" },
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

export function PrateekSector150Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "Prateek Group pre-launch in Sector 150, Noida. Ultra-luxury 3 and 4 BHK + servant residences. Art Deco 2.0. Official name and RERA awaited.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sector 150, Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Prateek Group" },
    numberOfBedrooms: ["3", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Noida", url: `${site}/properties-in-noida` },
          { name: PROJECT_NAME, url: `${site}/properties-in-noida/${PRATEEK_SECTOR_150_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <PrateekSector150Hero />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_288px] lg:items-start lg:gap-x-6 xl:gap-x-8">
              <div className="min-w-0 w-full">
                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                  <SectionHeading
                    id="snapshot-h2"
                    icon={Home}
                    title="Project Snapshot"
                    subtitle="Ultra-luxury high-rise on the Noida Expressway. Official name and RERA awaited."
                  />
                  <ul className="grid w-full min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                    {SNAPSHOT.map(({ label, value }) => (
                      <li
                        key={label}
                        className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-left shadow-sm"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
                        <p className="mt-2 text-base font-semibold leading-snug text-gray-900 sm:text-lg">{value}</p>
                      </li>
                    ))}
                  </ul>
                  <PropertyScrollFootnote>
                    *Pre-launch figures. Official name and RERA are not released. Sizes and inventory can change when
                    booking documents are issued.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="EOI & Pre-Launch Benefits"
                    subtitle="Pay a refundable holding amount now to lock unit preference before the public launch."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      EOI of <span className="text-[#8a7340]">₹10 Lakh*</span> is adjusted against the 10% due at allotment
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Early EOIs get first pick of floor, view, and unit type*
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Hold at the current pre-launch rate before a public name and RERA filing
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Construction-linked plan: 10% now, then 20% · 20% · 20% · 30%*
                    </li>
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <PrateekSector150StickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-prateek-h2">
                  <SectionHeading
                    id="why-prateek-h2"
                    icon={Building2}
                    title="Why Prateek Group?"
                    subtitle="A Sector 150 developer expanding from Canary into a new Expressway Art Deco high-rise."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {PRATEEK_FACTS.map((line) => (
                      <li
                        key={line}
                        className="rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-left text-sm font-semibold leading-relaxed text-gray-900 sm:text-base"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <PrateekSector150StickySidebar idPrefix="mob-call" part="callback" />
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
                    *Indicative. 2,850 × ₹16,500 ≈ ₹4.70 Cr and 3,850 × ₹16,500 ≈ ₹6.35 Cr BSP before PLC, floor rise,
                    parking, club, and statutory charges. Remaining 30% is due at FDL for possession.
                  </PropertyScrollFootnote>
                  <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Construction-linked plan
                      </p>
                      <p className="mt-0.5 text-xs text-gray-600">
                        10% · 20% · 20% · 20% · 30% of BSP as shared in pre-launch communication*
                      </p>
                    </div>
                    <ul className="divide-y divide-gray-100" role="list">
                      {PAYMENT_MILESTONES.map(({ when, due }) => (
                        <li key={when} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <span className="text-sm font-semibold text-gray-800">{when}</span>
                          <span className="text-sm font-bold text-[#8a7340]">{due}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Low-density floor plates, private decks, and sports-city access as marketed for this Expressway
                    plot.
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
                    Approximate access as marketed for Sector 150. Verify on a site visit. Plot coordinates will follow
                    RERA.
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
                    <PrateekSector150MapEmbed />
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
                id="prateek-sector-150-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <PrateekSector150StickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <PrateekSector150FooterCta />
        <Footer />
      </div>
    </>
  );
}
