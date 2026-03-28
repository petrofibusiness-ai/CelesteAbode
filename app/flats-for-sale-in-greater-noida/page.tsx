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
 * On-page target phrases (user brief; celeste prompt). Present in `<p>` / FAQ body:
 * flats in Greater Noida · 3 bhk flats in Greater Noida · flats for sale in Greater Noida ·
 * buy flat in Greater Noida · 2 bhk flat in Greater Noida · one bhk flat in Greater Noida ·
 * apartments in Greater Noida · studio apartment in Greater Noida
 */

const SITE_URL = "https://www.celesteabode.com";
const PAGE_URL = `${SITE_URL}/flats-for-sale-in-greater-noida`;

const FAQ_LINK =
  "color:#CBB27A;font-weight:600;text-decoration:underline;text-underline-offset:2px";

const GREATER_NOIDA_FLATS_FAQS: FAQ[] = [
  {
    id: "gn-flats-faq-1",
    question: "What is the Average Price of Flats in Greater Noida?",
    answer: `We do not quote one average. West, GNIDA, Knowledge Park, and the expressway belt price differently. Carpet, builder, and ready versus under construction change the ticket. Use the grid above, then our <a href="/properties-in-greater-noida" style="${FAQ_LINK}">Greater Noida catalogue</a>. Call us to read it with your brief.`,
  },
  {
    id: "gn-flats-faq-2",
    question: "Which Area is Best to Buy Flats in Greater Noida?",
    answer: `Choose by commute, schools, and how long you will stay. West has the most mid-segment depth; Alpha and Beta are settled; Knowledge Park follows students and offices; the expressway side needs a longer Jewar hold. Same budget in Noida? Check <a href="/properties-in-noida" style="${FAQ_LINK}">property in Noida</a>.`,
  },
  {
    id: "gn-flats-faq-3",
    question: "Is Greater Noida Good for Property Investment?",
    answer: `Yes, when the project file is clean. We check RERA, title, and past delivery before we discuss exit or yield. Rent tracks jobs; Jewar shapes the expressway story in 2026. Read <a href="/residential-property-in-noida" style="${FAQ_LINK}">residential property in Noida</a> or <a href="/contact" style="${FAQ_LINK}">contact us</a> for a shortlist.`,
  },
];

const CONTENT_BLOCK_CLASS =
  "text-sm md:text-base text-gray-800 font-poppins mb-6 md:mb-8 max-w-[700px] mx-auto text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0 " +
  "leading-[1.75] " +
  "[&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_p]:mb-4 [&_p]:last:mb-0";

export default async function FlatsForSaleInGreaterNoidaPage() {
  const supabase = getSupabaseAdminClient();

  const { data: gnLocation } = await supabase
    .from("locations_v2")
    .select("id, slug")
    .eq("slug", "greater-noida")
    .eq("is_published", true)
    .single();

  let properties: (Property & { locationSlug: string })[] = [];
  let localities: Array<{ value: string; label: string }> = [];

  let totalPropertiesCount: number | null = null;

  if (gnLocation?.id) {
    const [{ data: localitiesData }, { data: propertiesData }, { count }] = await Promise.all([
      fetchLocalitiesByLocationId(gnLocation.id).then((list) => ({ data: list })),
      supabase
        .from("properties_v2")
        .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
        .eq("location_id", gnLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("properties_v2")
        .select("id", { count: "exact", head: true })
        .eq("location_id", gnLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true),
    ]);

    totalPropertiesCount = count;
    localities = Array.isArray(localitiesData) ? localitiesData : [];
    properties = (propertiesData || []).map((prop: any) => {
      const p = supabaseToProperty(prop);
      return { ...p, locationSlug: gnLocation.slug } as Property & { locationSlug: string };
    });
  }

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Properties", url: `${SITE_URL}/properties` },
    { name: "Flats for Sale in Greater Noida", url: PAGE_URL },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Flats for Sale in Greater Noida - Buy Apartments in Greater Noida"
        description="Find the best flats for sale in Greater Noida. Gated communities, studio apartments, 1 BHK, 2 & 3 BHK flats. Expert consultants, verified listings."
        url={PAGE_URL}
        image="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flat-for-sale-in-greater-noida/flat-for-sale-in-greater-noida.webp"
      />
      <FAQPageSchema faqs={GREATER_NOIDA_FLATS_FAQS} />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          <section
            className="relative min-h-screen flex items-center justify-center"
            data-site-hero
          >
            <div className="absolute inset-0">
              <Image
                src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flat-for-sale-in-greater-noida/flat-for-sale-in-greater-noida.webp"
                alt="Flats for sale in Greater Noida - buy apartments in Greater Noida"
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
                  Flats for Sale in Greater Noida
                </span>
                <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl">
                  Buy Apartments in Greater Noida
                </span>
              </h1>
            </div>
          </section>

          <section id="properties" className="py-8 md:py-12 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              {gnLocation?.id && (
                <>
                  <div
                    id={PROPERTY_SEARCH_ANCHOR_ID}
                    className="scroll-mt-24 md:scroll-mt-28"
                    aria-label="Search and filter properties"
                  >
                  <LocationPropertyFilters
                    location="greater-noida"
                    localities={localities}
                    hidePropertyType
                    defaultPropertyType="apartments"
                  />
                  </div>
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="greater-noida"
                      initialTotalCount={totalPropertiesCount ?? properties.length}
                      defaultPropertyType="apartments"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
                      <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
                        No flats in Greater Noida at the moment. Check back soon or browse all{" "}
                        <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
                          properties in Greater Noida
                        </Link>
                        .
                      </p>
                      <Link
                        href="/properties-in-greater-noida"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
                      >
                        View All Greater Noida Properties
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

          <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:pb-32">
            <div className="min-w-0">
              <div className="max-w-4xl">
                <SeoBlocksRevealController initialVisible={1} step={1} totalCount={7}>
                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Explore Best <span className="text-[#CBB27A]">Flats for Sale in Greater Noida</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>
                            NCR still mixes delayed inventory with strong, well-run projects. Flats for sale in Greater Noida work when title, RERA track record, and builder execution line up with your budget and possession clock. We shortlist with those checks first. If you want inventory we have already filtered, begin with{" "}
                            <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              properties in Greater Noida
                            </Link>{" "}
                            on our site, then ask us to narrow it.
                          </p>
                          <p>
                            Flats in Greater Noida do not price on a single curve. Pari Chowk, Greater Noida West, Knowledge Park, and the Yamuna Expressway belt behave like four different markets. Price bands, commute, and tenant demand do not line up. Buyers who mix them in one shortlist usually pick the wrong flat for the right budget. The same budget buys a different life in West versus a GNIDA sector versus an expressway pocket. We map the trade-offs first, then show options that fit how you actually live or invest.
                          </p>
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
                        <span className="text-[#CBB27A]">Apartments in Greater Noida</span> for Modern Living
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Gated Community Apartments</h3>
                          <p>
                            Apartments in Greater Noida need the same society check whether the brochure looks premium or not. A gate and a guard booth do not equal a healthy society. Some large townships run clean RWAs and maintain common areas. Others fight registry delays, half-finished clubs, or GNIDA dues that freeze peace of mind. Before we pitch gated community apartments in Greater Noida, we check OC status, RWA health, and how dues are clearing. We also walk the society when it helps, because a sales office story and a lived-in block can differ. If the society is messy on paper, we say it out loud.
                          </p>
                          <h3>Luxury Apartments in Greater Noida</h3>
                          <p>
                            The premium lane here is younger than Gurugram, but the product has tightened fast. You can find serious specifications in select GNIDA and expressway-adjacent projects without paying the same per-square-foot premium as core South Delhi or Golf Course addresses. Finish, ceiling height, and club programming still vary sharply by builder, so we compare live inventory rather than logos. Luxury apartments in Greater Noida still need the same filter: builder track record first, brochure render second. For larger formats outside pure apartments, compare with{" "}
                            <Link href="/villas-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              villas in Greater Noida
                            </Link>{" "}
                            if you need land and privacy.
                          </p>
                          <h3>Affordable Housing Flats</h3>
                          <p>
                            Greater Noida West, Chi, and Omicron still carry the bulk of mid and affordable supply. Metro is on the ground in parts, schools and retail are stronger than five years ago, and many societies are fully occupied. Affordable flats for sale in Greater Noida are not a consolation prize when the shortlist is built on execution, not hype. If you want a parallel price read in a tighter Noida market, scan{" "}
                            <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              flats for sale in Noida
                            </Link>{" "}
                            and compare ticket size for the same brief.
                          </p>
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
                        Buy <span className="text-[#CBB27A]">Studio Apartment in Greater Noida</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>
                            Studios were a niche idea here a few years ago. Knowledge Park and the Pari Chowk belt changed that. A studio apartment in Greater Noida near colleges or office catchments rents to students and young professionals who pay through the year. You still need to check society rules on short lets, parking, and power backup because those details decide real cash flow. For yield-led buyers, boring occupancy often beats a flashy rent quote that lasts one season.
                          </p>
                          <h3>Compact Studio Apartments for Investment</h3>
                          <p>
                            Small formats can print higher yield than a mid 2 BHK if the location feeds steady tenants. Run the math on maintenance, society charges, and downtime before you celebrate a headline number. A studio apartment in Greater Noida only works if those costs stay predictable across semesters and job cycles. Ask who pays for power backup, water, and lift maintenance when the unit sits tenanted twelve months a year. If you want a wider expressway-linked pipeline, also glance at{" "}
                            <Link href="/properties-in-yamuna-expressway" className="text-[#CBB27A] font-semibold hover:underline">
                              Yamuna Expressway properties
                            </Link>{" "}
                            where ticket sizes and tenant stories differ.
                          </p>
                          <h3>Studio Apartments Near Commercial Hubs</h3>
                          <p>
                            Universities and office hubs near Knowledge Park create demand that does not vanish in summer. Add IT jobs along the corridor and you get two tenant streams feeding the same micro-markets. That is structural, not a one-year fad tied to a single employer.
                          </p>
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
                        <span className="text-[#CBB27A]">2 BHK and 3 BHK Flats</span> in Greater Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>
                            Many buyers skip 1 BHK inventory because it feels small on paper. In Chi, Omicron, and parts of West, a compact one bhk flat in Greater Noida can still rent well when the society is stable and the commute works. The 2 BHK bucket still moves the most volume because families want balance between space and EMI. A typical 2 bhk flat in Greater Noida in a finished society often rents faster than a larger unit in a weak location. Monthly rent shifts by sector, finish, and distance to work. In several West and Knowledge Park pockets, well-finished 2 BHK homes still land in a mid-teens to low-twenties thousand band, but we anchor every conversation on live comps rather than a static chart.
                          </p>
                          <p>
                            3 bhk flats in Greater Noida have seen strong multi-year appreciation in pockets where infrastructure and builder delivery actually landed. Past performance is not a guarantee, yet the space-per-rupee argument against several Noida sectors stays relevant in 2026 when you hold the ticket size constant. Cross-check similar configurations on{" "}
                            <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              property in Noida
                            </Link>{" "}
                            before you decide where the extra crore truly buys you comfort on flats in Greater Noida that pass the same carpet and title checks.
                          </p>
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
                        Top <span className="text-[#CBB27A]">Locations</span> for Flats in Greater Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Flats in Greater Noida West</h3>
                          <p>
                            West still prints the highest mid-segment volume in the broader NCR story. Social infrastructure has caught up in many pockets, Aqua Metro is a real commute tool for thousands of families, and resale chatter is easier than in fringe pockets that are still half-farm. Schools, clinics, and daily retail are stronger than they were half a decade ago, which matters when you actually move in. Flats in Greater Noida West still need project-level diligence. Volume alone does not remove builder risk.
                          </p>
                          <h3>Flats Near Yamuna Expressway</h3>
                          <p>
                            Treat this belt as a thesis, not a weekend impulse. Flats for sale in Greater Noida along the expressway still need the same RERA and builder checks as anywhere else. Jewar Phase 1 is moving toward commercial flights in 2026, YEIDA keeps adding institutional weight, and rapid rail links are part of the long arc. Film City and logistics clusters add employment stories that take years to mature, so your underwriting should match that clock. You still need a holding period that respects construction timelines and tenant build-up. Buyers who want expressway-linked options without guessing society health should start with{" "}
                            <Link href="/properties-in-yamuna-expressway" className="text-[#CBB27A] font-semibold hover:underline">
                              curated Yamuna Expressway listings
                            </Link>{" "}
                            and a clear exit plan.
                          </p>
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
                        Why <span className="text-[#CBB27A]">Buy Flats</span> in Greater Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Excellent Connectivity with Noida and Delhi</h3>
                          <p>
                            You already drive the Noida Greater Noida Expressway, DND, Eastern Peripheral, and Yamuna Expressway for real work trips. Aqua Metro is live for large resident clusters. Apartments in Greater Noida along these corridors still need project-level checks, but the roads are real. That matters because you are not buying a map sketch. You are buying a commute that exists today. If Delhi access is non-negotiable, pair this page with how we explain end-user trade-offs inside{" "}
                            <Link href="/residential-property-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              residential property in Noida
                            </Link>{" "}
                            so you compare apples with apples.
                          </p>
                          <h3>Rapid Infrastructure Development</h3>
                          <p>
                            Policy noise around FAR and ground coverage will add density over time. Flippers hate that. Long-hold buyers who care about rent and loan comfort can live with it if the project itself is clean. Jobs, students, and visible roads still anchor flats for sale in Greater Noida even when headlines swing. If you need land-led options instead of apartments, scan{" "}
                            <Link href="/plots-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              plots in Greater Noida
                            </Link>{" "}
                            for a different risk profile before you force a flat ticket.
                          </p>
                          <h3>High Property Appreciation Potential</h3>
                          <p>
                            2026 is not 2020 pricing, yet several triggers on the expressway side are still rolling into real operations rather than poster talk. Larger 3 BHK layouts in Greater Noida still attract families who want space without jumping to Gurugram tickets, but entry timing only helps when the project file is clean. Jewar Phase 1 is approaching commercial flights this year. Rapid rail and metro extensions keep tightening the belt. That does not promise a straight line up. It does mean buyers who verify flats in Greater Noida projects now are not late to every story. If you want the philosophy before the shortlist, read{" "}
                            <Link href="/advisory-philosophy" className="text-[#CBB27A] font-semibold hover:underline">
                              our advisory philosophy
                            </Link>
                            .
                          </p>
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
                        Why Choose <span className="text-[#CBB27A]">Celeste Abode</span> to Buy Flats in Greater Noida
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Experienced Real Estate Consultants</h3>
                          <p>
                            Portals gave you ten tabs, three wrong prices, and four sales calls. We reset the room. You tell us stamp-duty-ready budget, possession pressure, and how much delay you can stomach. Then we build a shortlist. Book an{" "}
                            <Link href="/request-a-free-consultation" className="text-[#CBB27A] font-semibold hover:underline">
                              advisory session
                            </Link>{" "}
                            if you want that conversation on calendar instead of chat threads.
                          </p>
                          <h3>Verified Property Listings</h3>
                          <p>
                            GNIDA history includes registries and builder dues that can delay OC even when a tower looks ready, so we cross-check title, approvals, and delivery behaviour on every flats in Greater Noida pick before it reaches your list. See how we work across formats on{" "}
                            <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">
                              real estate consulting services
                            </Link>
                            .
                          </p>
                          <h3>Complete Buying Assistance</h3>
                          <p>
                            Site visits, loan coordination, agreement review, builder follow-up, registration. Small ticket or large ticket, the checklist stays intact. When you buy flat in Greater Noida with us, you get the same documentation discipline whether it is a first home or a portfolio add. When you are ready,{" "}
                            <Link href="/contact" className="text-[#CBB27A] font-semibold hover:underline">
                              contact us
                            </Link>{" "}
                            with your brief and we will reply with next steps, not a catalogue dump.
                          </p>
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
                      FAQs About Flats in Greater Noida
                    </h2>
                    <p className="text-lg text-gray-600 font-poppins">
                      Everything you need to know about buying flats in Greater Noida
                    </p>
                  </div>
                  <LocationFAQs faqs={GREATER_NOIDA_FLATS_FAQS} />
                </div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <ConsultationSidebar variant="residential" headline="Exploring flats in Greater Noida?" subtext="West zone, Expressway, or GNIDA sectors. Tell us what you need and we'll do the groundwork first." />
            </aside>
          </div>

          <section className="py-16 md:py-24 bg-gradient-to-br from-[#0f1112] to-gray-900">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-poppins">
                Ready to Buy a Flat in Greater Noida?
              </h2>
              <p className="text-white/85 leading-relaxed font-poppins mb-8">
                Get a shortlist of verified flats, site visit support, and documentation review. No hard sell. Just clarity.
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
