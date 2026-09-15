import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Car,
  Home,
  Landmark,
  MapPin,
  Route,
  Sparkles,
  Store,
  Train,
  TreePine,
  Waves,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import {
  SG_NAKSHATRA_PROJECT_NAME,
  SG_NAKSHATRA_RERA_ID,
  SG_NAKSHATRA_SLUG,
} from "@/lib/sg-nakshatra-assets";
import { SgNakshatraHero } from "./sg-nakshatra-hero";
import { SgNakshatraFooterCta } from "./sg-nakshatra-footer-cta";
import { SgNakshatraMapEmbed, SgNakshatraStickySidebar } from "./sg-nakshatra-sticky-sidebar";

const PROJECT_NAME = SG_NAKSHATRA_PROJECT_NAME;

const SNAPSHOT = [
  "SG Group's first high-rise, podium-based project in Siddharth Vihar: 5 towers rising 36, 38 and 40 floors",
  "Three configurations: 3 BHK (2,225 sq. ft.), 3 BHK (2,450 sq. ft.), and 4 BHK (3,200 sq. ft.), each with a long, wide balcony/deck",
  "Triple-height entrance lobby, 11 ft ceiling height (above standard), and 4 lifts per floor for a strong lift-to-unit ratio",
  "Backed by SG Group's ongoing, RERA-registered SG Shikhar Height project in the same Siddharth Vihar micro-market, a live reference point for construction quality",
];

const SG_FACTS = [
  "SG Estates started in 1986 under MD Subhash Gupta. Nearly 40 years in Ghaziabad and NCR housing.",
  "Delivered group housing includes SG Homes and SG Impressions in Vasundhara, plus SG Alpha and Beta towers.",
  "Ongoing RERA-registered project in the same Siddharth Vihar area - SG Shikhar Height (UPRERAPRJ1244), 5 towers (S+23 to S+25 floors), 682 units, podium-based design",
  "Established financial partnerships with HUDCO, HDFC, SBI, and PNBHFL, supporting financial credibility",
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Triple-height entrance lobby", icon: Landmark },
  { label: "Podium parking and amenities", icon: Car },
  { label: "Four lifts per floor", icon: Building2 },
  { label: "Long, wide balcony in every unit", icon: Waves },
  { label: "11 ft ceiling height", icon: Home },
  { label: "One car park and club membership in the EOI rate", icon: Sparkles },
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "NH-24",
    text: "SG Nakshatra sits on Siddharth Vihar with direct access to NH-24 and the Delhi-Meerut Expressway.",
    icon: Route,
  },
  {
    label: "Indirapuram",
    text: "The plot sits immediately next to Indirapuram, so daily retail and schools are already in place.",
    icon: MapPin,
  },
  {
    label: "Delhi border",
    text: "About a 7-minute drive to the Delhi border at Ghazipur, as marketed for this belt.",
    icon: Train,
  },
  {
    label: "Green frontage",
    text: "Marketed as facing a 43-acre green belt under UP Avas Vikas Parishad.",
    icon: TreePine,
  },
  {
    label: "Daily needs",
    text: "Schools, hospitals, and retail already serve the nearby Indirapuram corridor.",
    icon: Store,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "Siddharth Vihar and NH-24" },
  { href: "/properties-in-noida", title: "Noida", sub: "Expressway and Sector 150" },
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "West and new sectors" },
  { href: "/pre-launch-properties", title: "Pre-Launch", sub: "EOI-stage projects only" },
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

export function SgNakshatraPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "SG Nakshatra by SG Group in Siddharth Vihar, NH-24, Ghaziabad. Pre-launch 3 and 4 BHK from Rs 8,899 per sq ft.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Siddharth Vihar, Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "SG Group" },
    identifier: SG_NAKSHATRA_RERA_ID,
    numberOfBedrooms: ["3", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Ghaziabad", url: `${site}/properties-in-ghaziabad` },
          { name: PROJECT_NAME, url: `${site}/properties-in-ghaziabad/${SG_NAKSHATRA_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <SgNakshatraHero />

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
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="eoi-h2">
                  <SectionHeading
                    id="eoi-h2"
                    icon={Zap}
                    title="EOI & Pre-Launch Benefits"
                    subtitle="Hold the SG Nakshatra pre-launch rate before a wider public booking."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      EOI rate <span className="text-[#8a7340]">₹8,899/sq ft*</span> plus PLC and GST
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Booking amount <span className="text-[#8a7340]">₹12 Lakh*</span>
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      10% on booking, then construction-linked instalments through possession*
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      One car park and club membership are included in the EOI rate, as marketed
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm sm:col-span-2">
                      UP RERA <span className="text-[#8a7340]">{SG_NAKSHATRA_RERA_ID}</span>
                    </li>
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <SgNakshatraStickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-sg-h2">
                  <SectionHeading
                    id="why-sg-h2"
                    icon={Building2}
                    title="Why Choose SG Group"
                    subtitle="A Ghaziabad developer with a live Siddharth Vihar project you can visit."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {SG_FACTS.map((line) => (
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
                  <SgNakshatraStickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Planning and inclusions listed for the SG Nakshatra pre-launch in Siddharth Vihar.
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
                    Access as marketed for SG Nakshatra on NH-24 in Siddharth Vihar, Ghaziabad.
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
                    <SgNakshatraMapEmbed />
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
                id="sg-nakshatra-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <SgNakshatraStickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <SgNakshatraFooterCta />
        <Footer />
      </div>
    </>
  );
}
