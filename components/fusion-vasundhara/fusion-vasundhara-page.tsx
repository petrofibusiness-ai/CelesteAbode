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
  Landmark,
  MapPin,
  TrendingUp,
  Route,
  Shield,
  Sparkles,
  Stethoscope,
  Store,
  Train,
  TreePine,
  Waves,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollFootnote, PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { FusionVasundharaHero } from "./fusion-vasundhara-hero";
import { FusionVasundharaFooterCta } from "./fusion-vasundhara-footer-cta";
import { FusionVasundharaMapEmbed, FusionVasundharaStickySidebar } from "./fusion-vasundhara-sticky-sidebar";

const FUSION_FACTS = [
  "Established NCR developer with delivered projects.",
  "50+ lakh sq ft delivered across the portfolio.",
  "40+ lakh sq ft currently under construction.",
  "3,000+ families already living in Fusion communities.",
];

const ROI_PROJECTION = [
  { label: "Indicative BSP", value: "₹8,945/sq ft*" },
  { label: "3 BHK entry ticket (approx.)", value: "~₹1.48 Cr*" },
  { label: "EOI at booking", value: "10%" },
  { label: "Indicative rental yield", value: "3.5–4.0% p.a.*" },
  { label: "3-year projection", value: "₹12,000/sq ft*" },
  { label: "5-year projection", value: "₹15,000+/sq ft*" },
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Landscaped greens", icon: TreePine },
  { label: "Luxury clubhouse", icon: Building2 },
  { label: "Pool and deck", icon: Droplets },
  { label: "Gym and wellness", icon: Dumbbell },
  { label: "Sports and recreation", icon: Waves },
  { label: "Walking and running track", icon: Footprints },
  { label: "Security and access control", icon: Shield },
  { label: "Kids and family zones", icon: Sparkles },
];

const HIGHLIGHTS = [
  "Pre-launch in Sector 7, Vasundhara, Ghaziabad",
  "Approx 4 acres prime land parcel",
  "Approx G+33 across 4 towers",
  "3.0 / 3.5 / 4.0 BHK formats: ~1850 / ~2110 / ~2570 sq ft",
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  { label: "Metro", text: "Vaishali metro around 3 km (as marketed)", icon: Train },
  { label: "Rail and bus", text: "Anand Vihar ISBT and railway around 7 km", icon: Route },
  { label: "Daily needs", text: "Vasundhara market and retail catchments nearby", icon: Store },
  { label: "Healthcare", text: "Multi-speciality hospitals in Indirapuram and Kaushambi belt", icon: Stethoscope },
  { label: "Schools", text: "Established schools across Vasundhara and nearby sectors", icon: GraduationCap },
  { label: "Delhi access", text: "Strong road connection for East Delhi work corridors", icon: Landmark },
];

const NCR_LINKS = [
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "Vasundhara, Indirapuram and NH24" },
  { href: "/properties-in-noida", title: "Noida", sub: "Metro and office corridors" },
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "Value and growth sectors" },
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

export function FusionVasundharaPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Fusion Vasundhara",
    description:
      "Pre-launch premium apartments in Sector 7 Vasundhara, Ghaziabad with 3, 3.5 and 4 BHK formats.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vasundhara, Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Fusion Group" },
    numberOfBedrooms: ["3", "3.5", "4"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Ghaziabad", url: `${site}/properties-in-ghaziabad` },
          { name: "Fusion Vasundhara", url: `${site}/properties-in-ghaziabad/fusion-vasundhara` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <FusionVasundharaHero />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_288px] lg:items-start lg:gap-x-6 xl:gap-x-8">
              <div className="min-w-0 w-full">
                <div className="mb-10 scroll-mt-28 lg:hidden">
                  <FusionVasundharaStickySidebar idPrefix="mob" />
                </div>

                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                  <SectionHeading id="snapshot-h2" icon={Home} title="Fusion Vasundhara Project Snapshot" />
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
                    *Pre-launch market inputs; final specifications, payment plan, and approvals follow official
                    developer communication.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-fusion-h2">
                  <SectionHeading
                    id="why-fusion-h2"
                    icon={Building2}
                    title="Why Fusion Group?"
                    subtitle="Fusion has built a visible NCR track record and this Vasundhara launch is attracting premium Ghaziabad buyers looking for space and access."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {FUSION_FACTS.map((line) => (
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
                    Explore nearby options in{" "}
                    <Link href="/properties-in-ghaziabad" className="font-semibold text-[#CBB27A] hover:underline">
                      Ghaziabad
                    </Link>{" "}
                    and compare with clarity before you block.
                  </PropertyScrollSubtext>
                </section>

                <section className="mb-12 w-full min-w-0 sm:mb-16 md:mb-24" aria-labelledby="roi-projection-h2">
                  <SectionHeading id="roi-projection-h2" icon={TrendingUp} title="ROI Projection" />
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
                    *Indicative projections from pre-launch BSP and Vasundhara corridor benchmarks; actual returns vary
                    with possession, market cycle, and final builder pricing.
                  </PropertyScrollFootnote>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Fusion Vasundhara Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Fusion Vasundhara key amenities are curated around daily convenience, fitness, recreation, and
                    secure community living for modern families in Vasundhara.
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
                  <SectionHeading
                    id="location-advantage-h2"
                    icon={MapPin}
                    title="Fusion Vasundhara Location Advantage"
                  />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Fusion Vasundhara location advantage is anchored in metro access, Delhi connectivity, schools,
                    healthcare, and everyday retail that supports both end-use comfort and long-term value.
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
                    <FusionVasundharaMapEmbed />
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
                id="fusion-vasundhara-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-28 lg:sticky lg:top-24 lg:mt-0 lg:block xl:top-28"
              >
                <FusionVasundharaStickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <FusionVasundharaFooterCta />
        <Footer />
      </div>
    </>
  );
}
