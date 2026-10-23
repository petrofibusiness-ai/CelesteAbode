import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CircleDot,
  Coffee,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Home,
  Lock,
  MapPin,
  PartyPopper,
  Plane,
  Route,
  ShoppingBag,
  Sofa,
  Sparkles,
  Target,
  Train,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollFootnote, PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { FloorPlanPreview } from "@/components/property-public/floor-plan-preview";
import { BreadcrumbSchema } from "@/lib/structured-data";
import {
  AVS_NH24_DEVELOPER,
  AVS_NH24_PROJECT_NAME,
  AVS_NH24_SLUG,
} from "@/lib/avs-nh24-assets";
import { AvsNh24Hero } from "./avs-nh24-hero";
import { AvsNh24FooterCta } from "./avs-nh24-footer-cta";
import { AvsNh24MapEmbed, AvsNh24StickySidebar } from "./avs-nh24-sticky-sidebar";

const PROJECT_NAME = AVS_NH24_PROJECT_NAME;

const SNAPSHOT = [
  "AVS Group's first residential project on NH-24, Crossing Republik, next to ABES Engineering College",
  "3 and 4 BHK. About 7 acres. 33-floor podium towers",
  "100% Mivan. About 70% open green. Clubhouse and swimming pool",
  "Better indoor AQI. Healthier living, every day",
];

const AVS_FACTS = [
  "AVS Group has built commercial projects in Ghaziabad and Noida.",
  "AVS City Palace, Raj Nagar Extension, is RERA-registered as UPRERAPRJ14846.",
  "AVS City Square, Raj Nagar Extension, is RERA-registered as UPRERAPRJ716737.",
  "AVS City Centre is RERA-registered as UPRERAPRJ608491. AVS High Street is under development.",
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Indoor sports courts", icon: Dumbbell },
  { label: "Modern gym", icon: Dumbbell },
  { label: "Cozy café", icon: Coffee },
  { label: "Warm lounge", icon: Sofa },
  { label: "Pool and billiards", icon: Target },
  { label: "Table tennis", icon: CircleDot },
  { label: "Celebration space", icon: PartyPopper },
  { label: "Indoor games", icon: Gamepad2 },
];

const NEARBY: { title: string; note: string; icon: LucideIcon; places: string[] }[] = [
  {
    title: "Schools",
    note: "Within 10 minutes",
    icon: GraduationCap,
    places: [
      "Step Up School (AVES)",
      "Vishwabharti School",
      "Indus Valley School, Noida",
      "DPS School, Siddharth Vihar",
      "Sarvottam International School, Greater Noida West",
      "Amity School",
    ],
  },
  {
    title: "Hospitals",
    note: "Within 10 minutes",
    icon: HeartPulse,
    places: [
      "Manipal Hospital",
      "Yashoda Indirapuram Hospital",
      "Fortis Hospital, Noida",
      "Max Hospital, Vaishali",
      "Motherhood Hospital, Noida Extension",
      "Sarvodaya Hospital, Greater Noida",
    ],
  },
  {
    title: "Shopping malls",
    note: "Within 10 minutes",
    icon: ShoppingBag,
    places: ["Gaur City Mall", "Opulent Mall", "North India Mall (Shipra)"],
  },
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "NH-24",
    text: "On NH-24, the Delhi–Meerut Expressway, at Crossing Republik.",
    icon: Route,
  },
  {
    label: "ABES",
    text: "Next to ABES Engineering College.",
    icon: GraduationCap,
  },
  {
    label: "Sector 62",
    text: "Direct access to Noida Sector 62 and Electronic City.",
    icon: MapPin,
  },
  {
    label: "Hindon",
    text: "Minutes from Hindon Airport.",
    icon: Plane,
  },
  {
    label: "IGI",
    text: "Close to Indira Gandhi International Airport.",
    icon: Plane,
  },
  {
    label: "Jewar",
    text: "Connected to Noida International Airport.",
    icon: Plane,
  },
  {
    label: "Red Line",
    text: "Shaheed Sthal Metro, 10–15 minutes.",
    icon: Train,
  },
  {
    label: "Blue Line",
    text: "Noida Electronic City Metro, 15–20 minutes.",
    icon: Train,
  },
  {
    label: "RRTS",
    text: "Ghaziabad RRTS, 10–15 minutes, on the Delhi–Meerut corridor.",
    icon: Zap,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "Crossing Republik and NH-24" },
  { href: "/properties-in-noida", title: "Noida", sub: "Expressway and Sector 150" },
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "West and new sectors" },
  { href: "/pre-launch-properties", title: "Pre-Launch", sub: "EOI-stage projects only" },
];

function ConfigCard({ label, variant }: { label: string; variant: number }) {
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

export function AvsNh24Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "3 and 4 BHK on NH-24, Ghaziabad, from Rs 5,999 per sq ft, with better indoor air, a clubhouse, and schools, hospitals, and malls within 10 minutes.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Crossing Republik, NH-24, Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: AVS_NH24_DEVELOPER },
    numberOfBedrooms: ["3", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Ghaziabad", url: `${site}/properties-in-ghaziabad` },
          { name: PROJECT_NAME, url: `${site}/properties-in-ghaziabad/${AVS_NH24_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <AvsNh24Hero />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_288px] lg:items-start lg:gap-x-6 xl:gap-x-8">
              <div className="min-w-0 w-full">
                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                  <SectionHeading id="snapshot-h2" icon={Home} title="Project Snapshot" />
                  <ul className="grid w-full min-w-0 gap-3 sm:grid-cols-2" role="list">
                    {SNAPSHOT.map((item) => (
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
                  <PropertyScrollFootnote>Pre-launch from ₹5,999/sq ft. EOI from ₹5 Lakh.</PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="EOI & Pre-Launch Benefits"
                    subtitle="Lock the pre-launch price before the public booking opens."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      Pre-launch BSP <span className="text-[#8a7340]">₹5,999/sq ft*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      EOI from <span className="text-[#8a7340]">₹5 Lakh*</span> by configuration
                    </li>
                    <ConfigCard label="3 BHK" variant={0} />
                    <ConfigCard label="4 BHK" variant={1} />
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <AvsNh24StickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-avs-h2">
                  <SectionHeading
                    id="why-avs-h2"
                    icon={Building2}
                    title="Why Choose AVS Group"
                    subtitle="First residential project on NH-24, after commercial work in Ghaziabad and Noida."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {AVS_FACTS.map((line) => (
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
                  <AvsNh24StickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
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
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3" role="list">
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
                  <div className="mt-10 grid w-full gap-4 lg:grid-cols-3">
                    {NEARBY.map(({ title, note, icon: RowIcon, places }) => (
                      <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#CBB27A]/15 bg-[#CBB27A]/10">
                            <RowIcon className="h-5 w-5 text-[#CBB27A]" strokeWidth={2} aria-hidden />
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {title}
                            </p>
                            <p className="text-xs text-gray-500">{note}</p>
                          </div>
                        </div>
                        <ul className="space-y-1.5 text-left text-sm leading-relaxed text-gray-800" role="list">
                          {places.map((place) => (
                            <li key={place} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBB27A]" aria-hidden />
                              <span style={{ fontFamily: "Poppins, sans-serif" }}>{place}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 w-full sm:mt-12">
                    <AvsNh24MapEmbed />
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
                id="avs-nh24-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <AvsNh24StickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <AvsNh24FooterCta />
        <Footer />
      </div>
    </>
  );
}
