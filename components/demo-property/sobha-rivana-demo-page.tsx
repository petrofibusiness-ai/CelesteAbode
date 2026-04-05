import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Building2,
  Dumbbell,
  Droplets,
  Footprints,
  GraduationCap,
  Home,
  Landmark,
  Layers,
  MapPin,
  Plane,
  Route,
  Shield,
  Sparkles,
  Stethoscope,
  Store,
  TreePine,
  Waves,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { SobhaRivanaGallery, type DemoGallerySlide } from "./sobha-rivana-gallery";
import { SobhaRivanaHero } from "./sobha-rivana-hero";
import { SobhaRivanaFooterCta } from "./sobha-rivana-footer-cta";
import { SobhaRivanaMapEmbed, SobhaRivanaStickySidebar } from "./sobha-rivana-sticky-sidebar";

const FLOOR_PLAN_SLIDES: DemoGallerySlide[] = [
  {
    src: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/land.jpeg",
    alt: "Sobha Rivana — site and tower layout",
    label: "Site layout",
    width: 1600,
    height: 894,
  },
  {
    src: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-interior.avif",
    alt: "Sobha Rivana — typical unit interior",
    label: "Typical unit",
    width: 1600,
    height: 1000,
  },
  {
    src: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-clubhouse.avif",
    alt: "Sobha Rivana — clubhouse",
    label: "Clubhouse",
    width: 1600,
    height: 1000,
  },
];

const SOBHA_FACTS = [
  "Dubai's No.1 Developer | India's Most Trusted Brand",
  "550+ Landmark Projects | 230+ Prestigious Awards",
  "1,456 Quality Checks Before Handover",
  "100% Backward Integrated – Quality You Can Trust",
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Central greens & open spine", icon: TreePine },
  { label: "River-themed landscape", icon: Waves },
  { label: "Club & community block", icon: Building2 },
  { label: "Pool deck", icon: Droplets },
  { label: "Gym & wellness", icon: Dumbbell },
  { label: "Indoor / outdoor sports", icon: Activity },
  { label: "Walking & jogging loops", icon: Footprints },
  { label: "Layered security", icon: Shield },
];

const HIGHLIGHTS = [
  "2 / 3 / 4 BHK · indicative from ₹2.25 Cr* (final on builder sheet)",
  "12 acre · 8 towers · G+45 · ~1,375 units",
  "4 flats per floor · 3+1 lifts · 3-level basement parking",
  "Large clubhouse · river-themed landscape · layered security",
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  { label: "Roads", text: "FNG ~2 km · NH 24 ~10 km · Pari Chowk ~18 km", icon: Route },
  { label: "Air / rail", text: "Jewar airport ~45 min · metro ~8 km", icon: Plane },
  { label: "Daily needs", text: "Yatharth ~500 m · D-Mart ~500 m · Gaur City Mall ~4.4 km", icon: Store },
  { label: "Healthcare", text: "Fortis ~10 km · Kailash ~12 km", icon: Stethoscope },
  { label: "Schools", text: "Lotus Valley ~3 km · GD Goenka International ~4.5 km", icon: GraduationCap },
  {
    label: "Leisure",
    text: "Noida Golf Course ~12 km · Buddh International Circuit ~30 km",
    icon: Landmark,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "Expressway belt & new launches" },
  { href: "/properties-in-noida", title: "Noida", sub: "Metro & office corridors" },
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "NCR east" },
  { href: "/properties", title: "All NCR", sub: "Browse all projects" },
];

function DemoSectionHeading({
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
    <div className="mb-8 max-w-4xl text-left lg:mr-auto">
      <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CBB27A]/10 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 text-[#CBB27A] sm:h-6 sm:w-6" aria-hidden />
        </div>
        {id ? (
          <h2
            id={id}
            className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h2>
        ) : (
          <h2
            className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h2>
        )}
      </div>
      <div className="mb-6 h-1 w-16 bg-[#CBB27A] sm:mb-8 sm:w-20" />
      {subtitle ? (
        <p className="max-w-3xl text-base leading-relaxed text-gray-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function SobhaRivanaDemoPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Sobha Rivana",
    description:
      "2, 3 and 4 BHK apartments in Sector 1, Greater Noida West by Sobha Limited. Uttar Pradesh RERA registered.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Noida West",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Sobha Limited" },
    numberOfBedrooms: ["2", "3", "4"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Sobha Rivana (demo layout)", url: `${site}/demo-property` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <SobhaRivanaHero />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(288px,380px)] lg:items-start lg:gap-x-10 xl:gap-x-14">
              <div className="min-w-0">
                <div className="mb-10 scroll-mt-28 lg:hidden">
                  <SobhaRivanaStickySidebar idPrefix="mob" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                  <DemoSectionHeading
                    id="snapshot-h2"
                    icon={Home}
                    title="Project snapshot"
                  />
                  <ul className="grid max-w-4xl gap-3 sm:grid-cols-2 lg:mr-auto" role="list">
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
                  <p className="mt-6 max-w-4xl text-left text-xs text-gray-500">
                    *Indicative starting points — your advisor walks you through the full quote, including PLC, floor rise, parking, and GST.
                  </p>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-sobha-h2">
                  <DemoSectionHeading id="why-sobha-h2" icon={Building2} title="Why SOBHA?" />
                  <ul className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mr-auto" role="list">
                    {SOBHA_FACTS.map((line) => (
                      <li
                        key={line}
                        className="rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-left text-sm font-semibold leading-relaxed text-gray-900 sm:text-base"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 max-w-3xl text-left text-sm text-gray-600">
                    Explore complementary projects in{" "}
                    <Link href="/properties-in-greater-noida" className="font-semibold text-[#CBB27A] hover:underline">
                      Greater Noida
                    </Link>{" "}
                    — we shortlist what actually fits your brief.
                  </p>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="floor-plans-h2">
                  <DemoSectionHeading
                    id="floor-plans-h2"
                    icon={Layers}
                    title="Floor plans & layouts"
                    subtitle="Site layout, typical unit, and clubhouse views — a strong feel for scale and lifestyle before you step on site."
                  />
                  <div className="max-w-4xl lg:mr-auto">
                    <SobhaRivanaGallery slides={FLOOR_PLAN_SLIDES} theme="dark" cinema />
                  </div>
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <DemoSectionHeading id="amenities-h2" icon={Sparkles} title="Key amenities" />
                  <div className="grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:mr-auto">
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
                  <DemoSectionHeading id="location-advantage-h2" icon={MapPin} title="Location Advantage" />
                  <ul
                    className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mr-auto"
                    role="list"
                  >
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
                  <div className="mt-10 max-w-5xl lg:mr-auto sm:mt-12">
                    <SobhaRivanaMapEmbed />
                  </div>
                </section>

                <section className="mb-4 sm:mb-8" aria-labelledby="ncr-h2">
                  <DemoSectionHeading
                    id="ncr-h2"
                    icon={Building2}
                    title="Explore more in NCR"
                  />
                  <ul className="grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:mr-auto" role="list">
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
                id="demo-property-sidebar"
                className="mt-10 hidden scroll-mt-28 self-start lg:sticky lg:top-24 lg:mt-0 lg:block xl:top-28"
              >
                <SobhaRivanaStickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <SobhaRivanaFooterCta />
        <Footer />
      </div>
    </>
  );
}
