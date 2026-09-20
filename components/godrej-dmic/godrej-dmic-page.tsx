import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Factory,
  Home,
  Landmark,
  MapPin,
  Plane,
  Route,
  Sparkles,
  Train,
  TreePine,
  Truck,
  Waves,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { GODREJ_DMIC_PROJECT_NAME, GODREJ_DMIC_SLUG } from "@/lib/godrej-dmic-assets";
import { GodrejDmicHero } from "./godrej-dmic-hero";
import { GodrejDmicFooterCta } from "./godrej-dmic-footer-cta";
import { GodrejDmicMapEmbed, GodrejDmicStickySidebar } from "./godrej-dmic-sticky-sidebar";

const PROJECT_NAME = GODREJ_DMIC_PROJECT_NAME;

const SNAPSHOT = [
  "Godrej Properties' first residential project within the DMIC Integrated Township (Global Business City): a 23.2-acre premium parcel secured via competitive e-auction in June 2026",
  "Eight configurations, from 1 BHK Grande (985 sq. ft.) to 3 BHK+U (2,500 sq. ft.), with an estimated project revenue potential of over ₹7,000 crore",
  "Set within a ~750-acre government-backed integrated township combining industrial, commercial, R&D and residential land uses under the Delhi-Mumbai Industrial Corridor (DMIC)",
  "Backed by Godrej Properties, India's No. 1 developer by booking value for three consecutive years (FY2026: ₹34,171 crore in bookings) and AA+ rated by both ICRA and India Ratings",
];

const GODREJ_FACTS = [
  "Real estate arm of the Godrej Group, one of India's most established business conglomerates",
  "India's No. 1 residential developer by booking value for three consecutive years. FY2026 bookings of ₹34,171 crore (16% YoY growth, 41% three-year CAGR)",
  "Delivered 12.1 million sq. ft. across 9 cities in FY2026, exceeding annual guidance by 21%",
  "Added 18 new projects in FY2026 with a combined future revenue potential of ₹42,100 crore",
  "Listed on both BSE and NSE (GODREJPROP); led by MD & CEO Gaurav Pandey and Executive Chairperson Pirojsha Godrej",
  "Already established in Greater Noida, including a golf-centric township in Sector 27 and two FY2026 launches with bookings of approximately ₹1,500 crore each",
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Located within a ~750-acre integrated township", icon: Landmark },
  { label: "Business, industrial, R&D and commercial ecosystem on-site", icon: Factory },
  { label: "Adjacent to the Delhi-Howrah rail corridor", icon: Train },
  { label: "Near the Eastern and Western Dedicated Freight Corridors", icon: Truck },
  { label: "Upcoming multi-modal logistics hub and industrial parks", icon: Building2 },
  { label: "Sustainable, green-space oriented master planning", icon: TreePine },
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "Within DMIC Integrated Township",
    text: "Located inside the ~750-acre Global Business City / DMIC Integrated Industrial Township, Greater Noida",
    icon: MapPin,
  },
  {
    label: "Pari Chowk proximity",
    text: "Approx. 11 km from Pari Chowk, Greater Noida",
    icon: Route,
  },
  {
    label: "Eastern Peripheral Expressway",
    text: "The township abuts the Eastern Peripheral Expressway along its southern boundary",
    icon: Waves,
  },
  {
    label: "Rail connectivity",
    text: "The township sits on the Delhi-Howrah line, with Ajayabpur Railway Station on its eastern edge.",
    icon: Train,
  },
  {
    label: "Boraki Transit Hub",
    text: "Approx. 4 km from the proposed Boraki integrated transit facility",
    icon: Building2,
  },
  {
    label: "Dadri Logistics Hub",
    text: "Approx. 6 km from the upcoming multi-modal logistics hub near Dadri",
    icon: Truck,
  },
  {
    label: "Noida International Airport, Jewar",
    text: "Well connected via the Eastern Peripheral Expressway (upcoming)",
    icon: Plane,
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

export function GodrejDmicPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: PROJECT_NAME,
    description:
      "Godrej Properties pre-launch in Global Business City, DMIC Integrated Township, Greater Noida. 1, 2 and 3 BHK from Rs 1.35 Cr. EOI registration open.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Global Business City, Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Godrej Properties" },
    numberOfBedrooms: ["1", "2", "3"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Greater Noida", url: `${site}/properties-in-greater-noida` },
          { name: PROJECT_NAME, url: `${site}/properties-in-greater-noida/${GODREJ_DMIC_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <GodrejDmicHero />

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
                    subtitle="Indicative pre-RERA pricing. Confirmed rates and the payment plan follow Godrej Properties' RERA filing."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      EOI from <span className="text-[#8a7340]">₹1.35 Cr*</span> onwards (indicative)
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Booking cheque <span className="text-[#8a7340]">₹2 Lakh to ₹5 Lakh*</span> by configuration
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      1 BHK 985-1,050 sq. ft. · 2 BHK 1,320-1,540 sq. ft. · 3 BHK 1,690-2,500 sq. ft., as marketed
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      RERA ID, legal SPV, tower count and the milestone payment plan are not yet announced
                    </li>
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <GodrejDmicStickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-godrej-h2">
                  <SectionHeading
                    id="why-godrej-h2"
                    icon={Building2}
                    title="Why Choose Godrej Properties"
                    subtitle="Listed developer with an existing Greater Noida presence."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {GODREJ_FACTS.map((line) => (
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
                  <GodrejDmicStickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Township-level planning for Global Business City. Clubhouse, pool and sports facilities will be
                    confirmed at launch.
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
                    Access as marketed for the DMIC Integrated Industrial Township in Greater Noida.
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
                    <GodrejDmicMapEmbed />
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
                id="godrej-dmic-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <GodrejDmicStickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <GodrejDmicFooterCta />
        <Footer />
      </div>
    </>
  );
}
