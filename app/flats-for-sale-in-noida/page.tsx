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
import { PROPERTY_SEARCH_ANCHOR_ID } from "@/lib/scroll-listings";

/**
 * On-page target phrases (user brief; /flats-for-sale-in-noida). Present in `<p>` / FAQ body:
 * flats in Noida · buy flat in Noida · flats for sale in Noida ·
 * 2 bhk flat in Noida · 3 bhk flats in Noida · 3bhk flat in Noida
 */

const SITE_URL = "https://www.celesteabode.com";
const PAGE_URL = `${SITE_URL}/flats-for-sale-in-noida`;

const FLATS_FAQS: FAQ[] = [
  {
    id: "flats-faq-1",
    question: "Is it a good time to buy flat in Noida?",
    answer:
      "Timing depends on location more than the market itself. Prices have already moved across key sectors, but infrastructure like Jewar Airport is still under development. Buyers entering now in the right sectors are still ahead of the next growth phase.",
  },
  {
    id: "flats-faq-2",
    question: "What is the average price of flats in Noida?",
    answer:
      "Flats in Noida currently range between ₹9,000 and ₹12,800 per sq ft depending on sector and builder. Premium sectors like 150 and 94 command higher pricing due to better planning and demand from end-users.",
  },
  {
    id: "flats-faq-3",
    question: "What is the cost of a 2 bhk flat in Noida?",
    answer:
      "A 2 bhk flat in Noida typically ranges from ₹55 lakh to ₹1.1 crore. Pricing depends on location, builder reputation, and whether the project is ready-to-move or under construction.",
  },
  {
    id: "flats-faq-4",
    question: "Are 3 bhk flats in Noida a better investment?",
    answer:
      "In many cases, yes. 3 bhk flats in Noida have seen stronger appreciation and better resale demand, especially in Expressway sectors where larger homes attract both families and long-term investors.",
  },
  {
    id: "flats-faq-5",
    question: "Which location is best for flats in Noida?",
    answer:
      "There is no single best sector. Sector 150 suits premium buyers, Sector 137 balances connectivity and pricing, while Sectors 75 and 78 work well for mid-segment buyers.",
  },
  {
    id: "flats-faq-6",
    question: "Do flats in Noida give good rental returns?",
    answer:
      "Rental returns depend on location and configuration. A 2 bhk flat in Noida typically earns ₹16,000 to ₹22,000 per month, while premium sectors can generate higher rents due to demand from working professionals.",
  },
];

const CONTENT_BLOCK_CLASS =
  "text-sm md:text-base text-gray-800 font-poppins mb-6 md:mb-8 max-w-[700px] mx-auto text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0 " +
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

  let totalPropertiesCount: number | null = null;

  if (noidaLocation?.id) {
    const [{ data: localitiesData }, { data: propertiesData }, { count }] = await Promise.all([
      fetchLocalitiesByLocationId(noidaLocation.id).then((list) => ({ data: list })),
      supabase
        .from("properties_v2")
        .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
        .eq("location_id", noidaLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("properties_v2")
        .select("id", { count: "exact", head: true })
        .eq("location_id", noidaLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true),
    ]);

    totalPropertiesCount = count;
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
        image="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flat-for-sale-in-noida/flat-for-sale-in-noida.webp"
      />
      <FAQPageSchema faqs={FLATS_FAQS} />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          <section
            className="relative min-h-screen flex items-center justify-center"
            data-site-hero
          >
            <div className="absolute inset-0">
              <Image
                src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flat-for-sale-in-noida/flat-for-sale-in-noida.webp"
                alt="Flats for sale in Noida - buy the best flats in Noida"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h1 className="font-bold text-white leading-tight font-poppins">
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#CBB27A]">
                  Flats for Sale in Noida
                </span>
                <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl">
                  — Buy the Best Flats in Noida
                </span>
              </h1>
            </div>
          </section>

          <section id="properties" className="py-8 md:py-12 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              {noidaLocation?.id && (
                <>
                  <div
                    id={PROPERTY_SEARCH_ANCHOR_ID}
                    className="scroll-mt-24 md:scroll-mt-28"
                    aria-label="Search and filter properties"
                  >
                    <LocationPropertyFilters
                      location="noida"
                      localities={localities}
                      hidePropertyType
                      defaultPropertyType="apartments"
                    />
                  </div>
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="noida"
                      initialTotalCount={totalPropertiesCount ?? properties.length}
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

          {/* Two-column: main content LEFT, consultation sidebar RIGHT */}
          <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:pb-32">
            <div className="min-w-0">
              <div className="max-w-4xl">
                <SeoBlocksRevealController initialVisible={1} step={1} totalCount={7}>
                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Find the Best <span className="text-[#CBB27A]">Flats in Noida</span> for Modern Living
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>Noida stopped being a future growth story a while ago. Prices have already moved, and they moved fast. Average rates are now above ₹9,200 per sq ft in 2026, up more than 150% from 2019. Rents jumped over 17% in a single quarter. That kind of movement usually signals one thing: demand is real.</p>
                          <p>Most buyers still approach flats for sale in Noida like the market has not changed. They expect to find undervalued deals everywhere. That rarely happens now. The gap is not between cheap and expensive. It is between correctly priced and incorrectly chosen property.</p>
                          <p>A flat in Sector 150 behaves very differently from one in Sector 75 or 137. Same budget, completely different outcome. Buyers who start by understanding this difference, often by comparing <Link href="/residential-property-in-noida" className="text-[#CBB27A] font-semibold hover:underline">residential property in Noida</Link> across segments, tend to make fewer mistakes when they begin site visits.</p>
                          <h3>Ready to Move Flats in Noida</h3>
                          <p>Walk into a ready society and things become clearer very quickly. You see what you are paying for. Lift quality, maintenance, actual construction, even how residents speak about the builder. None of this shows up in listings.</p>
                          <p>Ready flats in Noida cost more. Usually 10 to 20% higher than under-construction options in the same sector. That difference exists because there is no waiting and no execution risk. Buyers who cannot afford uncertainty tend to prefer this route even if it stretches the budget slightly.</p>
                          <p>Sectors like 75, 78, 93, and parts of the Expressway continue to see strong demand in this category. Most buyers comparing these options also look at <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">flats for sale in Noida</Link> across different stages before deciding where the trade-off makes sense.</p>
                          <h3>Under Construction Flats in Noida</h3>
                          <p>That 15 to 25% price gap you see in under-construction projects is not a discount. It is risk priced in advance. The question is not whether the price is lower. The question is whether the builder will deliver on time.</p>
                          <p>Some developers in Noida have improved post-RERA, but track record still matters. A builder who delivered the last two projects within six months of the promised timeline is a different bet from one still managing delays.</p>
                          <p>Many buyers compare these options with <Link href="/flats-for-sale-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">flats for sale in Greater Noida</Link> where entry pricing is lower but infrastructure is still catching up in certain pockets.</p>
                          <h3>New Launch Flats in Noida</h3>
                          <p>New launches attract attention quickly. Lower starting prices. Flexible payment plans. Early entry advantage. On paper, everything looks aligned.</p>
                          <p>On ground, the picture depends on three checks. Delivery history, actual pricing versus surrounding inventory, and whether the location works today. Not five years later.</p>
                          <p>A lot of buyers assume launch pricing guarantees upside. It does not. If the surrounding supply is already priced similarly, the upside gets limited. This is where comparing with <Link href="/commercial-property-in-noida" className="text-[#CBB27A] font-semibold hover:underline">commercial property in Noida</Link> helps, because job hubs and leasing demand are what ultimately support residential growth.</p>
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
                          <p>Three site visits usually turn into seven. Then ten. By the time buyers step back, clarity drops instead of improving. Listings differ, prices change, and every project sounds perfect.</p>
                          <p>When buyers come to Celeste Abode to buy flat in Noida, the first step is not showing options. It is removing the wrong ones. Budget after all charges, timeline, and acceptable risk get defined first. Only then does a shortlist make sense. Every project we show has already passed RERA verification, builder track record checks, and location evaluation.</p>
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
                          <p>Look at transaction volumes and one thing stands out. 2 BHK drives the market. Not because it is always the best choice, but because it fits the widest budget. A 2 bhk flat in Noida ranges from ₹55 lakh in mid-segment sectors to around ₹1.1 crore in premium zones. Rental income typically falls between ₹16,000 and ₹22,000 per month depending on sector and project quality.</p>
                          <p>The real difference is not price. It is what that price gets you. Carpet area, builder quality, and location vary more than most buyers expect. Many compare these options with <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">flats in Noida</Link> before finalising.</p>
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
                          <p>Buyers who upgraded from 2 to 3 BHK over the last few years have seen the difference. More space, better demand, and stronger resale liquidity. Between 2019 and 2024, some premium sectors saw appreciation of around 140% in 3 BHK units. That kind of movement usually pulls in serious investors.</p>
                          <p>Pricing in Expressway sectors now averages close to ₹12,800 per sq ft. Buyers evaluating a 3bhk flat in Noida often compare across <Link href="/residential-property-in-noida" className="text-[#CBB27A] font-semibold hover:underline">residential property in Noida</Link> to understand broader demand patterns.</p>
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
                          <p>Sector choice changes outcomes more than most buyers realise at the start. Sector 150 stands out for low-density planning and long-term appreciation. Sector 137 works well for connectivity and rental demand. Sectors 75 and 78 balance pricing and livability. Sector 44 and 94 sit firmly in the premium bracket.</p>
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
                          <p>Buyers comparing Noida with Gurgaon or Delhi usually arrive at the same conclusion after a few weeks of research. Value per square foot is higher here. Planning is more structured. Infrastructure triggers are still unfolding.</p>
                          <h3>Excellent Infrastructure and Connectivity</h3>
                          <p>Jewar Airport is under construction. The Aqua Metro extension and FNG Expressway are progressing. These are not proposals. They are active projects. Properties located near these corridors typically see the first wave of appreciation.</p>
                          <h3>High Appreciation Potential</h3>
                          <p>Prices rose nearly 92% between 2020 and 2025. That happened before several infrastructure triggers became operational. Which means the full impact is still not priced into all sectors.</p>
                          <h3>Growing Demand for Residential Flats</h3>
                          <p>Noida accounted for 27% of NCR commercial leasing in Q1 2025. Offices bring people. People create housing demand. That demand is visible in flats for sale in Noida across both mid and premium segments.</p>
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
                          <p>Most buyers are not short of options. They are short of clarity. That usually becomes clear after multiple site visits. At Celeste Abode, we filter before we recommend. Builder credibility, pricing logic, and location fundamentals get checked first. If something does not pass, it does not reach the shortlist.</p>
                          <h3>Experienced Real Estate Consultants</h3>
                          <p>We track sector-level pricing, builder delivery patterns, and RERA compliance continuously. That allows us to identify which flats in Noida actually justify their pricing today.</p>
                          <h3>Strong Network with Top Builders</h3>
                          <p>Direct access to developers ensures accurate pricing and real inventory. Buyers evaluating 3 bhk flats in Noida from Godrej, ATS, or Tata get clear comparisons before making decisions.</p>
                          <h3>Transparent Property Deals</h3>
                          <p>We present full cost breakdowns upfront. Base price, additional charges, registration. If something looks off, we say it before any booking happens.</p>
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

            <aside className="hidden lg:block">
              <ConsultationSidebar variant="residential" headline="Not sure what's actually worth seeing?" subtext="Share your budget and we'll bring you only the flats worth your time." />
            </aside>
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
                  href="tel:+919910906306"
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
