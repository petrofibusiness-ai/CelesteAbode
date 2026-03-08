import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Property } from "@/types/property";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { fetchLocalitiesByLocationId } from "@/lib/fetch-localities";
import { NoidaPropertiesGrid } from "@/components/noida-properties-grid";
import { LocationPropertyFilters } from "@/components/location-property-filters";
import { Building2, Phone } from "lucide-react";
import { BreadcrumbSchema, WebPageSchema, FAQPageSchema } from "@/lib/structured-data";
import { SeoBlocksRevealController } from "@/components/seo-blocks-reveal-controller";
import LocationFAQs from "@/components/location-faqs";
import { ConsultationSidebar } from "@/components/consultation-sidebar";
import { OpenConsultationTrigger } from "@/components/open-consultation-trigger";
import type { FAQ } from "@/types/location";

const SITE_URL = "https://www.celesteabode.com";
const PAGE_URL = `${SITE_URL}/flats-for-sale-in-noida`;

const FLATS_FAQS: FAQ[] = [
  { id: "flats-faq-1", question: "What is the Average Price of Flats in Noida?", answer: "Flats in Noida span a wide range depending on sector, configuration, and developer. A 2 BHK flat in Noida in Greater Noida West broadly runs Rs 45 lakh to Rs 90 lakh. The same configuration in mid-Noida sectors like 75 to 78 and 121 sits between Rs 80 lakh and Rs 1.5 crore. 3 BHK flats in Noida along the Expressway corridor in sectors like 128, 137, and 150 start at Rs 1.5 crore and go well above Rs 3 crore for premium projects from developers like Godrej, M3M, and Max Estates. Configuration, floor, tower facing, and possession status all move the number significantly within any given sector." },
  { id: "flats-faq-2", question: "Which Sector is Best to Buy Flats in Noida?", answer: "Depends entirely on what you are optimising for. For budget buyers, Greater Noida West offers the best square footage per rupee with functional infrastructure and metro connectivity incoming. For families prioritising schools and daily convenience, Sectors 75, 76, 78, and 137 sit on active metro lines with established social infrastructure around them. For investors targeting capital appreciation, Sector 150 delivered 43% YoY growth per Savills India data and remains one of NCR's stronger appreciation stories. For premium end-users, the Expressway belt from Sector 128 to 153 carries the best developer quality and project specification in the city. No sector is universally best. The right answer depends on budget, timeline, and purpose." },
  { id: "flats-faq-3", question: "Is Buying a Flat in Noida a Good Investment?", answer: "For buyers who select the right sector and developer, yes. Noida's average residential values have risen approximately 127% between 2020 and 2025, with specific sectors delivering significantly higher returns. The fundamentals supporting continued demand are traceable: Jewar International Airport under active construction, metro expansion into Greater Noida West confirmed, NCR inventory overhang at a multi-year low of seven months, and a growing working population anchored by IT parks and MNC offices. Buy flat in Noida in an established corridor from a developer with a clean delivery record and the investment case is sound. Buy in the wrong zone from the wrong developer and none of those market fundamentals protect you. Zone and developer selection is where the investment decision actually gets made." },
  { id: "flats-faq-4", question: "How to Choose the Best Flat in Noida?", answer: "Start with RERA registration — non-negotiable. Then check the developer's delivery record on previous projects, not just their current launch material. Verify the payment plan structure against construction milestones so you are not funding a project faster than it is being built. Visit the site in person and assess actual construction progress against the committed timeline. Review the allotment letter and builder-buyer agreement before signing, specifically for maintenance charge structures, penalty clauses, and possession conditions. Confirm that flats for sale in Noida you are evaluating have clear land title and all mandatory approvals in place. Finally, check comparable pricing in the same sector before agreeing to a number. Celeste Abode runs all of these checks before recommending any project to a buyer." },
];

const CONTENT_BLOCK_CLASS =
  "prose-editorial text-sm md:text-base text-gray-800 font-poppins mb-6 md:mb-8 max-w-[700px] mx-auto text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0 " +
  "leading-[1.75] " +
  "[&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_p]:mb-4 [&_p]:last:mb-0";

export default async function FlatsForSaleInNoidaPage() {
  const supabase = getSupabaseAdminClient();

  const { data: noidaLocation } = await supabase
    .from("locations_v2")
    .select("id, slug")
    .eq("slug", "noida")
    .eq("is_published", true)
    .single();

  let properties: (Property & { locationSlug: string })[] = [];
  let localities: Array<{ value: string; label: string }> = [];

  if (noidaLocation?.id) {
    const [{ data: localitiesData }, { data: propertiesData }] = await Promise.all([
      fetchLocalitiesByLocationId(noidaLocation.id).then((list) => ({ data: list })),
      supabase
        .from("properties_v2")
        .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
        .eq("location_id", noidaLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

    localities = Array.isArray(localitiesData) ? localitiesData : [];
    properties = (propertiesData || []).map((prop: any) => {
      const p = supabaseToProperty(prop);
      return { ...p, locationSlug: noidaLocation.slug } as Property & { locationSlug: string };
    });
  }

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Properties", url: `${SITE_URL}/properties` },
    { name: "Flats for Sale in Noida", url: PAGE_URL },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Flats for Sale in Noida - Buy the Best Flats in Noida"
        description="Find the best flats for sale in Noida. Ready to move, under construction & new launch 2 BHK, 3 BHK flats. Expert consultants, verified listings."
        url={PAGE_URL}
        image="/NOIDA.avif"
      />
      <FAQPageSchema faqs={FLATS_FAQS} />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          <section className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src="/NOIDA.avif"
                alt="Flats for sale in Noida - buy the best flats in Noida"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-poppins">
                <span className="text-[#CBB27A]">Flats for Sale in Noida</span> — Buy the Best Flats in Noida
              </h1>
            </div>
          </section>

          <section id="properties" className="py-8 md:py-12 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              {noidaLocation?.id && (
                <>
                  <LocationPropertyFilters
                    location="noida"
                    localities={localities}
                    hidePropertyType
                    defaultPropertyType="apartments"
                  />
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="noida"
                      defaultPropertyType="apartments"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
                      <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
                        No flats in Noida at the moment. Check back soon or browse all{" "}
                        <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
                          properties in Noida
                        </Link>
                        .
                      </p>
                      <Link
                        href="/properties-in-noida"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
                      >
                        View All Noida Properties
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          <div className="w-full flex justify-center py-2">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>

          {/* Two-column: sidebar LEFT, content RIGHT */}
          <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[360px_1fr] lg:gap-10 lg:pb-32">
            <aside className="hidden lg:block order-first">
              <ConsultationSidebar variant="residential" headline="Not sure what's actually worth seeing?" subtext="Share your budget and we'll bring you only the flats worth your time." />
            </aside>
            <div className="min-w-0">
              <div className="max-w-4xl">
                <SeoBlocksRevealController initialVisible={2} step={2} totalCount={7}>
                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Find the Best <span className="text-[#CBB27A]">Flats in Noida</span> for Modern Living
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>Noida has crossed Rs 9,200 per sq ft on average in 2026, up 152% since 2019. Rental rates surged 17.3% in Q4 2024 alone. For buyers evaluating flats for sale in Noida right now, this is not a market that rewards waiting. At Celeste Abode, we consult buyers across Noida daily. We know which sectors are moving on real fundamentals, which projects are worth looking at, and which ones are not.</p>
                          <p>Noida is not a single market. A flat in Sector 150 is a completely different decision from one in Sector 75 or Sector 137. Price points, possession timelines, builder profiles, and the buyer demand behind them all differ. Getting that distinction right before you start visiting sites is what separates a good purchase from an average one. Here is how the flats in Noida market actually breaks down.</p>
                          <h3>Ready to Move Flats in Noida</h3>
                          <p>Ready-to-move is the lowest-risk category in this market. You see the actual flat, walk the society, check the construction quality, and speak to residents before any money moves. No timeline to track, no possession date that gets revised. For buyers who want to buy flat in Noida without carrying execution risk, ready-to-move options across Sectors 75, 78, 93, and 150 are the first place to look. Pricing is higher but the certainty it buys is real.</p>
                          <h3>Under Construction Flats in Noida</h3>
                          <p>Under-construction flats for sale in Noida offer better entry pricing than ready units, sometimes 15 to 25% lower in the same sector. The trade-off is time and execution risk. Our job here is to filter for credible developers with a clean RERA track record. A builder who delivered their last two projects within six months of the promised date is a very different bet from one with a history of delays.</p>
                          <h3>New Launch Flats in Noida</h3>
                          <p>New launches can look attractive on paper. Lower launch pricing, flexible payment plans, first-mover positioning. But flats in Noida sold as new launches carry the highest risk of any purchase. We check three things before recommending one: the developer delivery history, whether the launch price is genuine or just an opening-day number, and whether the location has real infrastructure today, not five years from now.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={0}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Buy Flat in Noida with <span className="text-[#CBB27A]">Expert Real Estate Consultants</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>Most buyers who come to us have already visited six or seven sites through portals and left without clarity. Listings were outdated, pricing was unclear, the builder sales team told them everything was perfect. That is not how we work. When you come to Celeste Abode to buy flat in Noida, we start with your actual situation. Budget after all charges. Possession requirement. Risk tolerance. We build a short verified list around those answers. Every project has passed our RERA check, developer track record review, and location assessment before we present it. Flats for sale in Noida vary enormously in builder credibility. That filtering matters more than most buyers realise.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={1}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        <span className="text-[#CBB27A]">2 BHK Flat in Noida</span> for Sale!
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>The 2 BHK segment is the highest-volume category in Noida. First-time buyers, young professionals, couples, and investors running a rental strategy all land here. A 2 bhk flat in Noida currently ranges from Rs 55 lakhs in mid-segment sectors to Rs 1.1 crore in premium areas. The decision depends entirely on what you are optimising for.</p>
                          <h3>Affordable 2 BHK Flats in Noida</h3>
                          <p>Sectors 75, 78, 119, and 137 carry strong options for buyers who want a quality 2 bhk flat in Noida without crossing Rs 80 lakhs. These sectors have metro access, credible developer projects, and price points that work for both end-use and rental yield. Unit sizes run 950 to 1,150 sq ft. Monthly rents sit between Rs 16,000 and Rs 22,000, putting yield in a range that makes the investment thesis work.</p>
                          <h3>2 BHK Flats in Prime Noida Sectors</h3>
                          <p>Sector 150, Sector 94, and Sector 44 carry the strongest rental demand in the city, driven by Noida Expressway IT corridor professionals. Sector 150 alone saw 40% annual price appreciation in recent data. Projects by Godrej, Tata, and ATS are all active here. Pricing starts at Rs 85 lakhs for 2 BHK. These are the premium-end flats in Noida that attract both owner-occupiers and investors running a capital appreciation play.</p>
                          <h3>2 BHK Flats in Gated Communities</h3>
                          <p>Gated societies give buyers more than security. Maintained common areas, backup power, and a functioning resident welfare structure all matter once you are living there. When clients choose to buy flat in Noida through Celeste Abode, we map gated project options against their budget before standalone buildings. The day-to-day difference justifies the premium in most cases.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={2}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        <span className="text-[#CBB27A]">3 BHK Flats in Noida</span> for Sale!
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>Demand for 3 bhk flats in Noida has grown faster than any other segment. Annual appreciation averaged 146% between 2019 and 2024. Premium Expressway sectors now average Rs 12,828 per sq ft for this configuration. Investors are moving into 3 BHK because capital appreciation and rental income per square foot have both strengthened substantially.</p>
                          <h3>Luxury 3 BHK Flats in Noida</h3>
                          <p>A 3bhk flat in Noida at the luxury end starts at Rs 1.5 crore in Sector 150 and crosses Rs 3 crore in ultra-premium projects by Godrej, M3M, and Smartworld. These come with modular kitchens, imported flooring, smart home integration, and resort-style club access. Senior professionals, NRIs, and investors who want quality specifications that reduce long-term maintenance friction make up most of the buyer base here.</p>
                          <h3>Spacious Family Apartments in Noida</h3>
                          <p>For families, mid-premium flats in Noida between Rs 1 crore and Rs 1.8 crore in Sectors 78, 79, 107, and 128 offer the best mix of space and school proximity. DPS, Amity, and Genesis are all reachable from these sectors. Carpet areas run 1,500 to 1,800 sq ft. That is the room a 2 BHK does not provide, and for families with school-age children it is not a small difference.</p>
                          <h3>3 BHK Flats in Premium Residential Projects</h3>
                          <p>Premium projects offering a 3bhk flat in noida across Sectors 94, 150, and along the Noida-Greater Noida Expressway have raised quality benchmarks considerably. Godrej Tropical Isle, M3M The Cullinan, and Tata Eureka Park are the most active names. For buyers researching flats for sale in Noida in the Rs 1.5 crore to Rs 2.5 crore range, comparing these three directly before deciding is worth the time.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={3}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Top <span className="text-[#CBB27A]">Locations</span> to Buy Flats in Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>Sector selection is where most buyers get stuck. When evaluating flats in Noida by location, four filters matter: expressway or metro proximity, employer density within 10 km, school access within 3 km, and developer track record on currently available projects. Sectors 150, 137, 75, 78, and 44 score well across all four. Sectors 62 and 63 serve IT professionals. Sector 94 is where premium buyers with expressway requirements should look first.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={4}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Why <span className="text-[#CBB27A]">Buy Flats</span> in Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>Buyers who compare Noida against Gurgaon and Delhi usually reach the same conclusion after two weeks of research. Noida gives more apartment per rupee, a better-planned city structure, and stronger infrastructure growth ahead. Here is why they choose to buy flat in Noida rather than wait or look elsewhere.</p>
                          <h3>Excellent Infrastructure and Connectivity</h3>
                          <p>The Aqua Metro extension, the FNG Expressway, Jewar Airport at 30 km from central Noida, and the Delhi-Meerut RRTS are all confirmed and progressing. Every one of these raises the value of well-located flats in Noida. Buyers who enter sectors tied to these triggers before operations begin have historically seen the strongest price outcomes.</p>
                          <h3>High Appreciation Potential</h3>
                          <p>Prices across Noida rose 92% between 2020 and 2025. A 2 bhk flat in Noida in Sector 150 that was priced at Rs 65 lakhs in 2020 sits above Rs 1.1 crore today. 3 BHK premium sector appreciation ran at 146% over the same period. Jewar Airport operations are expected to drive another re-rating in nearby sectors. Buyers entering in 2025 and 2026 are still ahead of that phase.</p>
                          <h3>Growing Demand for Residential Flats</h3>
                          <p>Noida absorbed 27% of all NCR commercial leasing in Q1 2025. More offices mean more professionals, and more professionals mean sustained housing demand. New home launches across NCR jumped 69%, yet inventory overhang stays at multi-year lows. The demand for flats for sale in Noida is employment-backed, not speculative, which makes it more durable for investors running a five-year thesis.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={5}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Why Choose <span className="text-[#CBB27A]">Celeste Abode</span> to Buy Flats in Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>The question buyers ask most often is how they know a project is genuinely worth the asking price. That is exactly what we answer. When you choose Celeste Abode to buy flat in Noida, you get a consultant who has already done the checks, not a salesperson walking you through a brochure.</p>
                          <h3>Experienced Real Estate Consultants</h3>
                          <p>We cover the Noida residential market every single day. Current pricing by sector, RERA complaint status, builder delivery track records, where real value sits right now. That ground knowledge makes our shortlist for flats in Noida completely different from what any portal search returns.</p>
                          <h3>Strong Network with Top Builders</h3>
                          <p>We work directly with credible developers across Noida. For buyers evaluating 3 bhk flats in noida from Godrej, ATS, M3M, or Tata, we arrange a detailed site comparison with accurate pricing and real-time inventory before any commitment is made.</p>
                          <h3>Transparent Property Deals</h3>
                          <p>We tell you the floor rate, the full all-in cost after stamp duty and registration, and whether a project passes our checks before we schedule a visit. No surprises after the booking amount is paid. If something does not pass, we say so. That is what transparent advisory actually means when buying flats for sale in Noida with Celeste Abode.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </SeoBlocksRevealController>
              </div>

              <div className="w-full flex justify-center py-2">
                <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
              </div>

              <section className="py-16 md:py-24 bg-background">
                <div className="max-w-4xl px-6">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      Frequently Asked Questions About Flats in Noida
                    </h2>
                    <p className="text-lg text-gray-600 font-poppins">
                      Everything you need to know about buying flats in Noida
                    </p>
                  </div>
                  <LocationFAQs faqs={FLATS_FAQS} />
                </div>
              </section>
            </div>
          </div>

          <section className="py-16 md:py-24 bg-gradient-to-br from-[#0f1112] to-gray-900">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-poppins">
                Ready to Buy a Flat in Noida?
              </h2>
              <p className="text-white/85 leading-relaxed font-poppins mb-8">
                Get a shortlist of verified flats, site visit support, and documentation review. No hard sell—just clarity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+919818735258"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium font-poppins border-2 border-white/80 text-white hover:bg-white/10 transition-colors min-w-[240px] sm:min-w-[260px]"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <OpenConsultationTrigger className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CBB27A] text-black font-medium rounded-full hover:bg-[#CBB27A]/90 transition-colors min-w-[240px] sm:min-w-[260px] font-poppins">
                  Schedule a Free Consultation
                </OpenConsultationTrigger>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
