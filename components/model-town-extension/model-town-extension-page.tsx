import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Dumbbell,
  Footprints,
  Home,
  Images,
  Landmark,
  MapPin,
  Route,
  Shield,
  Sparkles,
  Store,
  Train,
  TreePine,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyScrollSubtext } from "@/components/property-scroll-footnote";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { formatProjectGalleryHeading } from "@/lib/project-gallery-heading";
import { SobhaRivanaGallery, type DemoGallerySlide } from "@/components/demo-property/sobha-rivana-gallery";
import {
  MODEL_TOWN_EXTENSION_GDA_PERMIT,
  MODEL_TOWN_EXTENSION_HERO_IMAGE,
  MODEL_TOWN_EXTENSION_PROJECT_NAME,
  MODEL_TOWN_EXTENSION_SLUG,
  MODEL_TOWN_EXTENSION_VIDEO_URL,
} from "@/lib/model-town-extension-assets";
import { ModelTownExtensionHero } from "./model-town-extension-hero";
import { ModelTownExtensionFooterCta } from "./model-town-extension-footer-cta";
import {
  ModelTownExtensionMapEmbed,
  ModelTownExtensionStickySidebar,
} from "./model-town-extension-sticky-sidebar";

const PROJECT_NAME = MODEL_TOWN_EXTENSION_PROJECT_NAME;

const SNAPSHOT = [
  "A 6-acre gated GDA approved township in the heart of Ghaziabad.",
  "61 residential plots in all, from 109 to 360 sq. yd. Plus 14 commercial shops and 2 kiosks inside the township.",
  "30 ft wide black-top roads. 4 landscaped parks. Gated entry with 24x7 security.",
  "Radhabrij Group. 30+ years of experience. 100+ projects and 15+ lakh sq.m. delivered.",
];

const RADHABRIJ_FACTS = [
  "Ghaziabad-based group. 30+ years in land, industrial parks, warehousing and education.",
  "100+ projects and 15+ lakh sq.m. delivered, as per the company website.",
  "Built Brij Udyog Vihar (HPDA approved), Radhabrij Warehouse, Godavari Food Mills, JMS Engineering College and Radhabrij Medical College.",
  "Model Town Extension is the residential project in Ghaziabad city.",
];

const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Gated compound with entry-exit gate and guard room", icon: Landmark },
  { label: "24x7 security", icon: Shield },
  { label: "30 ft (9 m) wide black-top internal roads", icon: Route },
  { label: "4 landscaped parks with 2,138 sq. m. of green area", icon: TreePine },
  { label: "Walking tracks and kids play area", icon: Footprints },
  { label: "Open gym and fountains", icon: Dumbbell },
  { label: "14 commercial shops and 2 kiosks inside the township", icon: Store },
  { label: "Club membership", icon: Sparkles },
];

const LOCATION_ADVANTAGE: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "Railway Station",
    text: "Ghaziabad Railway Station, about a 5 min walk",
    icon: Train,
  },
  {
    label: "GT Road",
    text: "Grand Trunk Road, about 5 min",
    icon: Route,
  },
  {
    label: "Metro / Namo Bharat",
    text: "Metro and Namo Bharat (Delhi-Meerut RRTS), about 2-3 km",
    icon: Train,
  },
  {
    label: "Shopping",
    text: "Opulent Mall and Navrang Square area, about 5 min",
    icon: Store,
  },
  {
    label: "Landmark",
    text: "MMH College Road and Model Town Park, walking distance",
    icon: Landmark,
  },
  {
    label: "Locality",
    text: "Choudhary More, Old Arya Nagar. The site office is right here",
    icon: MapPin,
  },
];

const NCR_LINKS = [
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "GT Road and Vasundhara" },
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

export function ModelTownExtensionPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
  const gallerySlides: DemoGallerySlide[] = MODEL_TOWN_EXTENSION_VIDEO_URL
    ? [
        {
          src: MODEL_TOWN_EXTENSION_VIDEO_URL,
          alt: `${PROJECT_NAME} project video, Old Arya Nagar, GT Road, Ghaziabad`,
          label: "Project video",
          width: 1920,
          height: 1080,
          type: "video",
          poster: MODEL_TOWN_EXTENSION_HERO_IMAGE,
        },
      ]
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: PROJECT_NAME,
    description:
      "Model Town Extension by Radhabrij Realty near Choudhary More, GT Road, Ghaziabad. GDA-approved gated residential plots from 109 to 360 sq yd. From Rs 1.36 Cr.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Old Arya Nagar, Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: "Radhabrij Realty" },
    identifier: MODEL_TOWN_EXTENSION_GDA_PERMIT,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: site },
          { name: "Properties in Ghaziabad", url: `${site}/properties-in-ghaziabad` },
          { name: PROJECT_NAME, url: `${site}/properties-in-ghaziabad/${MODEL_TOWN_EXTENSION_SLUG}` },
        ]}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <ModelTownExtensionHero />

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

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="booking-h2">
                  <SectionHeading
                    id="booking-h2"
                    icon={Zap}
                    title="Price & Possession"
                    subtitle="GDA layout sanctioned 21 July 2026. Registry and possession within 90 days of booking."
                  />
                  <ul className="grid w-full gap-4 sm:grid-cols-2" role="list">
                    <li className="rounded-2xl border border-[#CBB27A]/30 bg-[#CBB27A]/5 px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900">
                      Starting from <span className="text-[#8a7340]">₹1.36 Cr*</span> (₹1,25,000 per sq. yd.)
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      Registry and possession within <span className="text-[#8a7340]">90 days</span> of booking
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      GDA-approved residential plots from 109 to 360 sq. yd.
                    </li>
                    <li className="rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
                      GDA permit{" "}
                      <span className="break-all text-[#8a7340]">{MODEL_TOWN_EXTENSION_GDA_PERMIT}</span>
                    </li>
                  </ul>
                </section>

                <div className="mb-10 scroll-mt-[var(--site-header-total,6rem)] lg:hidden">
                  <ModelTownExtensionStickySidebar idPrefix="mob-bro" part="brochure" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="gallery-h2">
                  <SectionHeading
                    id="gallery-h2"
                    icon={Images}
                    title={formatProjectGalleryHeading(PROJECT_NAME)}
                    subtitle="Project video for this gated plotted township in Old Arya Nagar."
                  />
                  {gallerySlides.length > 0 ? (
                    <div className="w-full">
                      <SobhaRivanaGallery slides={gallerySlides} theme="dark" cinema />
                    </div>
                  ) : (
                    <div className="flex h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl sm:h-[380px] md:h-[480px] md:rounded-3xl lg:h-[560px]">
                      <div className="px-6 text-center">
                        <p
                          className="text-sm font-semibold text-white sm:text-base"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Project video coming soon
                        </p>
                        <p className="mt-2 text-xs text-white/60 sm:text-sm">
                          The walkthrough for Model Town Extension will sit here.
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-radhabrij-h2">
                  <SectionHeading
                    id="why-radhabrij-h2"
                    icon={Building2}
                    title="Why Choose Radhabrij Group"
                    subtitle="A Ghaziabad-based group with 30+ years across land, industry and education."
                  />
                  <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                    {RADHABRIJ_FACTS.map((line) => (
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
                  <ModelTownExtensionStickySidebar idPrefix="mob-call" part="callback" />
                </div>

                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                  <SectionHeading id="amenities-h2" icon={Sparkles} title="Key Amenities" />
                  <PropertyScrollSubtext className="mb-6 text-sm sm:text-base">
                    Township amenities for the gated plotted layout in Old Arya Nagar.
                  </PropertyScrollSubtext>
                  <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
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
                    Access as marketed for Model Town Extension near Choudhary More, GT Road, Ghaziabad.
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
                    <ModelTownExtensionMapEmbed />
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
                id="model-town-extension-sidebar"
                className="mt-10 hidden min-w-0 scroll-mt-[var(--site-header-total,6rem)] lg:sticky lg:top-[var(--site-header-total,6rem)] lg:mt-0 lg:block xl:top-[calc(var(--site-header-total,6rem)+1rem)]"
              >
                <ModelTownExtensionStickySidebar idPrefix="desk" />
              </aside>
            </div>
          </div>
        </main>

        <ModelTownExtensionFooterCta />
        <Footer />
      </div>
    </>
  );
}
