import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Droplets,
  Home,
  Landmark,
  Lock,
  MapPin,
  Route,
  Sparkles,
  Train,
  TreePine,
  Waves,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollFootnote, PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { FloorPlanPreview } from "@/components/property-public/floor-plan-preview";
import {
  PERIGON_VASUNDHARA_PROJECT_NAME,
  PERIGON_VASUNDHARA_SLUG,
} from "@/lib/perigon-vasundhara-assets";
import { PerigonVasundharaHero } from "./perigon-vasundhara-hero";
import { PerigonVasundharaFooterCta } from "./perigon-vasundhara-footer-cta";
import { PerigonVasundharaMapEmbed, PerigonVasundharaStickySidebar } from "./perigon-vasundhara-sticky-sidebar";

const PROJECT_NAME = PERIGON_VASUNDHARA_PROJECT_NAME;

const SNAPSHOT: { text?: string; label?: string; concealed?: boolean }[] = [
  { text: "G+30 high-rise towers at Perigon Vasundhara, in the heart of Sector 4, Ghaziabad" },
  { text: "100% Mivan construction as marketed for this pre-launch high-rise" },
  { text: "Fully loaded, plug-and-play ready 3 BHK and 4 BHK apartments" },
  { text: "Sky Infinity Pool, a 365-day heated pool, and a grand clubhouse" },
  { text: "Pre-launch BSP of ₹8,999/sq ft* with EOI booking still open" },
  { text: "Official project name and RERA number are not out yet" },
  { label: "3 BHK", concealed: true },
  { label: "4 BHK", concealed: true },
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Sky Infinity Pool", icon: Waves },
  { label: "365-day heated pool", icon: Droplets },
  { label: "Grand clubhouse", icon: Building2 },
  { label: "Plug-and-play ready 3 & 4 BHK homes", icon: Sparkles },
  { label: "100% Mivan construction", icon: Landmark },
  { label: "G+30 high-rise towers in Vasundhara", icon: Home },
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "Prime Vasundhara address",
    text: "Perigon Vasundhara sits on a prime Sector 4 address in Vasundhara, Ghaziabad.",
    icon: MapPin,
  },
  {
    label: "RRTS / Metro",
    text: "Marketed as 900 metres from the operational RRTS and metro station.",
    icon: Train,
  },
  {
    label: "Multi-city",
    text: "Road links from this Ghaziabad belt reach Delhi, Noida, Indirapuram, and NH-24.",
    icon: Route,
  },
  {
    label: "Green surroundings",
    text: "The Sector 4 belt is surrounded by green landscapes and open spaces.",
    icon: TreePine,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "Vasundhara and east NCR" },
  { href: "/properties-in-noida", title: "Noida", sub: "Expressway and Sector 150" },
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "West and new sectors" },
  { href: "/pre-launch-properties", title: "Pre-Launch", sub: "EOI-stage projects only" },
];

function ConcealedFloorPlanCard({ label, variant }: { label: string; variant: number }) {
  return (
    <li className="relative isolate min-h-[8.5rem] overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm sm:min-h-[9.5rem]">
      <div className="absolute inset-0" aria-hidden>
        <FloorPlanPreview variant={variant} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute inset-0 bg-[#1a1814]/15 backdrop-blur-[12px] backdrop-saturate-150 sm:backdrop-blur-[16px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#2B3035]/25" />
      </div>
      <div className="relative z-10 flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-1.5 px-4 py-4 text-center sm:min-h-[9.5rem]">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-[#CBB27A] shadow-lg backdrop-blur-sm sm:h-10 sm:w-10">
          <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.25} aria-hidden />
        </span>
        <p
          className="text-xs font-bold tracking-wider text-gray-500"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {label} size
        </p>
        <p
          className="text-sm font-semibold leading-snug text-black sm:text-base"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          To be revealed after launch
        </p>
      </div>
    </li>
  );
}

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

export function PerigonVasundharaPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "Perigon Vasundhara pre-launch in Sector 4, Ghaziabad. 3 and 4 BHK. Official name and RERA not out yet.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sector 4, Vasundhara, Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Perigon Group" },
    numberOfBedrooms: ["3", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Ghaziabad", url: `${site}/properties-in-ghaziabad` },
          { name: PROJECT_NAME, url: `${site}/properties-in-ghaziabad/${PERIGON_VASUNDHARA_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <PerigonVasundharaHero />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_288px] lg:items-start lg:gap-x-6 xl:gap-x-8">
              <div className="min-w-0 w-full">
                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                  <SectionHeading id="snapshot-h2" icon={Home} title="Project Snapshot" />
                  <ul className="grid w-full min-w-0 gap-3 sm:grid-cols-2" role="list">
                    {SNAPSHOT.map((item, index) =>
                      item.concealed ? (
                        <ConcealedFloorPlanCard
                          key={item.label}
                          label={item.label ?? ""}
                          variant={index}
                        />
                      ) : (
                        <li
                          key={item.text}
                          className="flex gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left text-sm font-semibold leading-snug text-gray-900 shadow-sm"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBB27A]" aria-hidden />
                          {item.text}
                        </li>
                      )
                    )}
                  </ul>
                  <PropertyScrollFootnote>
                    *Pre-launch notes. Official name, RERA, and unit sizes are not out yet. Details can change when
                    booking papers are issued.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="EOI & Pre-Launch Benefits"
                    subtitle="Hold the Perigon Vasundhara pre-launch rate before the public launch."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      Book the EOI at the pre-launch rate of{" "}
                      <span className="text-[#8a7340]">₹8,999/sq ft*</span> plus other charges
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      The marketed public launch rate is{" "}
                      <span className="text-[#8a7340]">₹11,000/sq ft*</span> after this early window
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Early buyers get a pre-launch benefit of about{" "}
                      <span className="text-[#8a7340]">₹40 Lacs*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      3 BHK and 4 BHK sizes and floor plans stay locked until launch
                    </li>
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <PerigonVasundharaStickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <PerigonVasundharaStickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Club and pool amenities listed for the Perigon Vasundhara pre-launch in Sector 4.
                  </PropertyScrollSubtext>
                  <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
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
                    Access as marketed for Perigon Vasundhara in Sector 4, Vasundhara, Ghaziabad.
                  </PropertyScrollSubtext>
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
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
                    <PerigonVasundharaMapEmbed />
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
                id="perigon-vasundhara-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <PerigonVasundharaStickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <PerigonVasundharaFooterCta />
        <Footer />
      </div>
    </>
  );
}
