import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NoidaPropertiesGrid } from "@/components/noida-properties-grid";
import { LocationPropertyFilters } from "@/components/location-property-filters";
import { LocationContactForm } from "@/components/location-contact-form";
import LocationFAQs from "@/components/location-faqs";
import { BreadcrumbSchema, FAQPageSchema, WebPageSchema } from "@/lib/structured-data";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { Property } from "@/types/property";

export const metadata: Metadata = {
  title: "Dummy Location Page Reference",
  description:
    "Static reference location page with hero, filters, four SEO blocks, FAQs, region links, and custom CTA for dynamic implementation planning.",
  alternates: {
    canonical: "https://www.celesteabode.com/dummy-page",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const DUMMY_LOCALITIES = [
  { value: "sector-150", label: "Sector 150" },
  { value: "sector-93", label: "Sector 93" },
  { value: "sector-44", label: "Sector 44" },
  { value: "noida-extension", label: "Noida Extension" },
  { value: "expressway", label: "Noida Expressway" },
];

const DUMMY_FAQS = [
  {
    id: "1",
    question: "What makes this dummy page useful for SEO planning?",
    answer:
      "This reference page separates listing UX from SEO content blocks so you can test section hierarchy, internal links, and keyword focus before wiring it into dynamic location data.",
  },
  {
    id: "2",
    question: "Can this structure be used for all location pages later?",
    answer:
      "Yes. The structure is intentionally generic: hero, filters, listing grid, SEO sections, FAQs, and a custom CTA. You can map dynamic location content into the same section framework.",
  },
  {
    id: "3",
    question: "Why are there four SEO sections after filters?",
    answer:
      "They let you target multiple search intents on one page: location overview, pricing logic, buyer fit, and micro-market links without forcing all text into one generic template block.",
  },
  {
    id: "4",
    question: "Should FAQs stay on location pages?",
    answer:
      "Yes. FAQs help capture long-tail queries and improve user clarity. Keep answers concise, location-specific, and aligned with on-page content and internal links.",
  },
  {
    id: "5",
    question: "How should internal links be handled in this model?",
    answer:
      "Use a dedicated interlink block to related NCR regions and important commercial pages. Keep links context-relevant so users and crawlers understand topical relationships.",
  },
];

const DUMMY_SEO_BLOCKS = [
  {
    heading: "Why This Micro-Market Stays on Buyer Shortlists",
    content: [
      "Serious buyers usually shortlist markets where livability is already visible on ground: commute clarity, school and hospital access, and stable social infrastructure. This reduces decision risk compared to purely speculative launches.",
      "For SEO intent, this section targets users researching whether a location is genuinely practical for end use, not just attractive in marketing presentations.",
    ],
  },
  {
    heading: "Pricing Logic, Builder Risk, and Delivery Confidence",
    content: [
      "A stronger location page should explain price bands by pocket, not just one broad market number. The difference between an overpriced tower and a fair-value project often comes down to builder credibility, possession behavior, and locality depth.",
      "By clarifying delivery and pricing logic together, the page naturally serves high-intent users searching for safer purchase decisions.",
    ],
  },
  {
    heading: "Who Should Prioritize This Location First",
    content: [
      "End users, long-horizon investors, and NRIs evaluate different success metrics. End users care about everyday convenience and possession certainty, while investors focus on liquidity, rental depth, and cycle timing.",
      "Segmented guidance improves user trust and helps search engines understand the page is solving real buying questions, not repeating generic city copy.",
    ],
  },
  {
    heading: "How This Location Connects to the Wider NCR Opportunity",
    content: [
      "High-performing location pages should not exist in isolation. They should explain how this market compares with adjacent NCR growth zones, so users can evaluate alternatives in one journey.",
      "This inter-market context improves navigational flow, reduces bounce behavior, and supports deeper internal discovery.",
    ],
  },
];

const DUMMY_REGION_LINKS = [
  {
    title: "Greater Noida",
    subtitle: "Scale, supply depth, and growth runways",
    href: "/properties-in-greater-noida",
    image: "/GREATER NOIDA.avif",
    alt: "Explore properties in Greater Noida",
  },
  {
    title: "Ghaziabad",
    subtitle: "Value-led zones with mature connectivity",
    href: "/properties-in-ghaziabad",
    image: "/GHAZIABAD.avif",
    alt: "Explore properties in Ghaziabad",
  },
  {
    title: "Yamuna Expressway",
    subtitle: "Airport corridor with long-horizon upside",
    href: "/properties-in-yamuna-expressway",
    image: "/YAMUNA.avif",
    alt: "Explore properties in Yamuna Expressway",
  },
];

export default async function DummyPage() {
  const supabase = getSupabaseAdminClient();
  let initialProperties: Property[] = [];

  try {
    const { data: noidaLocation } = await supabase
      .from("locations_v2")
      .select("id, slug")
      .eq("slug", "noida")
      .eq("is_published", true)
      .single();

    if (noidaLocation?.id) {
      const { data: propertiesData } = await supabase
        .from("properties_v2")
        .select(
          "id, slug, project_name, developer, location, location_id, locality_id, project_status, hero_image, is_published, created_at, updated_at"
        )
        .eq("location_id", noidaLocation.id)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      initialProperties = (propertiesData || []).map((prop: any) => {
        const mapped = supabaseToProperty(prop);
        return {
          ...mapped,
          locationSlug: noidaLocation.slug,
        } as Property;
      });
    }
  } catch (error) {
    console.error("Dummy page: failed to load initial properties", error);
  }

  const breadcrumbItems = [
    { name: "Home", url: "https://www.celesteabode.com/" },
    { name: "Dummy Location Page", url: "https://www.celesteabode.com/dummy-page" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Dummy Location Page Reference"
        description="Static reference location page with hero, filters, four SEO blocks, FAQs, region links, and custom CTA."
        url="https://www.celesteabode.com/dummy-page"
        image="/NOIDA.avif"
      />
      <FAQPageSchema
        faqs={DUMMY_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src="/NOIDA.avif"
                alt="Dummy location page hero"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/45" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Dummy Location SEO Page
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Static reference page for dynamic rollout: focused SEO sections, clean listing flow,
                and intentional internal linking across NCR regions.
              </p>
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Filters + Grid (same system components) */}
          <section className="py-14 md:py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-8">
                Explore Properties by Filters
              </h2>
              <LocationPropertyFilters location="noida" localities={DUMMY_LOCALITIES} />
              <div className="mt-10">
                <NoidaPropertiesGrid initialProperties={initialProperties} location="noida" />
              </div>
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Four SEO blocks - same premium content-card style language */}
          <section className="py-14 md:py-20 bg-background">
            <div className="max-w-6xl mx-auto px-6 space-y-10 md:space-y-12">
              {DUMMY_SEO_BLOCKS.map((block, index) => (
                <article key={index}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 text-center">
                    {block.heading}
                  </h2>
                  <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="p-6 md:p-10">
                      <div className="space-y-4">
                        {block.content.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-sm md:text-base text-gray-800 leading-relaxed font-poppins text-center"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < DUMMY_SEO_BLOCKS.length - 1 && (
                    <div className="w-full flex justify-center py-8">
                      <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* NCR interlink cards - image led and natural flow */}
          <section className="py-14 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
                  Compare Nearby NCR Markets Before You Decide
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-center">
                  Explore adjacent corridors with image-led cards so users naturally continue discovery
                  instead of dropping off after one location view.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {DUMMY_REGION_LINKS.map((region) => (
                  <Link
                    key={region.href}
                    href={region.href}
                    className="group block"
                  >
                    <div className="relative h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                      <Image
                        src={region.image}
                        alt={region.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={90}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 group-hover:from-black/95 transition-all duration-500" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#CBB27A] transition-colors">
                          {region.title}
                        </h3>
                        <p className="text-white/85 text-sm md:text-base">
                          {region.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* FAQ */}
          <section className="py-14 md:py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-2xl md:text-4xl font-bold text-primary text-center mb-10">
                Frequently Asked Questions
              </h2>
              <LocationFAQs faqs={DUMMY_FAQS} />
            </div>
          </section>

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Custom footer CTA */}
          <section className="py-14 md:py-20 bg-gradient-to-br from-primary/5 to-[#CBB27A]/10 border-t border-[#CBB27A]/20">
            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Ready to Turn This Dummy Page into a Dynamic SEO Engine?
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  This page is intentionally built as a static reference: reusable sections, cleaner
                  intent targeting, and stronger internal linking logic. Once approved, the same structure
                  can be mapped to backend location content without bringing back template-heavy copy.
                </p>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Use this CTA area for truly custom market messaging (not location placeholders), such as
                  campaign hooks, seasonal inventory pushes, or region-specific conversion language.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
                <LocationContactForm location="noida" locationDisplayName="NCR Markets (Reference)" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
