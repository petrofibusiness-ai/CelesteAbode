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
 * On-page target phrases (user brief; /residential-property-in-noida). Woven into `<p>` / FAQ body:
 * residential property in Noida · buy home in Noida · buying house in Noida ·
 * property for sale in Noida · buy property in Noida · luxury property in Noida · best property in Noida
 */

const SITE_URL = "https://www.celesteabode.com";
const PAGE_URL = `${SITE_URL}/residential-property-in-noida`;

const RESIDENTIAL_FAQS: FAQ[] = [
  {
    id: "residential-faq-1",
    question: "Is Noida a Good Place to Buy a Home?",
    answer: "Yes. Planned sectors, strong infrastructure, and consistent demand make it a reliable market.",
  },
  {
    id: "residential-faq-2",
    question: "What is the Average Price of Residential Property in Noida?",
    answer: "It ranges from ₹4,500 per sq ft in affordable zones to ₹15,000 per sq ft in premium sectors.",
  },
  {
    id: "residential-faq-3",
    question: "Which Sector is Best for Residential Property in Noida?",
    answer: "Sector choice depends on budget. Extension suits affordability. Expressway suits premium buyers.",
  },
  {
    id: "residential-faq-4",
    question: "How to Buy Property in Noida Safely?",
    answer: "Verify RERA details, check developer history, and review agreements carefully before booking.",
  },
];

// Typography & spacing: line-height 1.75, max-width 700px centered in card
const CONTENT_BLOCK_CLASS =
  "text-sm md:text-base text-gray-800 font-poppins mb-6 md:mb-8 max-w-[700px] mx-auto text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0 " +
  "leading-[1.75] " +
  "[&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_p]:mb-4 [&_p]:last:mb-0";

export default async function ResidentialPropertyInNoidaPage() {
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
        .in("property_type", ["Apartment/Flats", "Villas"])
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("properties_v2")
        .select("id", { count: "exact", head: true })
        .eq("location_id", noidaLocation.id)
        .in("property_type", ["Apartment/Flats", "Villas"])
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
    { name: "Residential Property in Noida", url: PAGE_URL },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Buy Residential Property in Noida - Buy Home & Luxury Property for Sale"
        description="Noida has become one of NCR's most sought-after cities for homebuyers. Buy residential property in Noida with trusted consultants. Explore apartments, villas & luxury homes for sale."
        url={PAGE_URL}
        image="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/residential-property-in-noida/residential-property-in-noida.webp"
      />
      <FAQPageSchema faqs={RESIDENTIAL_FAQS} />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          {/* Hero — full viewport, H1 only */}
          <section
            className="relative min-h-screen flex items-center justify-center"
            data-site-hero
          >
            <div className="absolute inset-0">
              <Image
                src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/residential-property-in-noida/residential-property-in-noida.webp"
                alt="Residential property in Noida - buy home and luxury property"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h1 className="font-bold text-white leading-tight font-poppins">
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Buy <span className="text-[#CBB27A]">Residential Property in Noida</span>
                </span>
                <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl">
                  — Buy Home & Luxury Property for Sale
                </span>
              </h1>
            </div>
          </section>

          {/* Listing: filters + grid only; content blocks (headings + cards) come after */}
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
                      defaultPropertyType="residential"
                    />
                  </div>
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="noida"
                      initialTotalCount={totalPropertiesCount ?? properties.length}
                      defaultPropertyType="residential"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
                      <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
                        No residential properties in Noida at the moment. Check back soon or browse all{" "}
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

          {/* Two-column layout: starts at Explore H2, ends at last FAQ bottom; pb-32 = same gap above footer CTA as top-32 below header */}
          <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:pb-32">
            <div className="min-w-0">
          {/* Content: first block is Explore... H2 + card; narrower card width, left-aligned in column */}
          <div className="max-w-4xl">
          <SeoBlocksRevealController initialVisible={1} step={1} totalCount={8}>
            <article data-seo-block>
              <header className="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                  Explore the <span className="text-[#CBB27A]">Best Residential Property</span> in Noida
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>
                      A lot of buyers start the search for{" "}
                      <Link
                        href="/properties-in-noida"
                        className="text-[#CBB27A] font-semibold hover:underline"
                      >
                        residential property in Noida
                      </Link>{" "}
                      on portals. Three weekends later, they usually feel more confused than informed. Too many listings. Too
                      little clarity on what actually holds value.
                    </p>
                    <p>
                      Noida, however, is one of the few NCR markets where planning still shows on the ground. Sector layouts make sense. Roads
                      connect where they should. Metro lines are expanding in the right direction. That combination gives buyers something rare, visibility.
                    </p>
                    <p>
                      If you plan to buy property in Noida today, the decision is less about finding options and more about filtering the right
                      ones.
                    </p>
                    <p>
                      The city does not lack inventory. It lacks clarity. Every segment looks attractive on the surface, but only a few options
                      hold up when you check build quality, delivery history, and location fundamentals.
                    </p>

                    <h3>Apartments and Flats in Noida</h3>
                    <p>
                      Most demand sits in <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">2 and 3 BHK flats</Link>. Sectors 75, 76, 78, and 137 continue to attract end users because metro access already exists, not promised. Prices here range between ₹60 lakh and ₹1.5 crore. That band works for families upgrading from rented housing. Move towards the Expressway and the equation changes. Sectors 128, 150, and 94 carry larger layouts and stronger developer names. Entry starts closer to ₹2 crore, but what you get in terms of space and planning is noticeably better.
                    </p>
                    <h3>Independent Houses and Villas in Noida</h3>
                    <p>
                      Independent floors appeal to a specific buyer. Someone who prefers privacy over shared amenities. Supply stays limited in
                      sectors like 41, 44, and 50. That scarcity keeps resale demand stable. You are not buying these for short-term gains. You
                      are buying them because the format itself will always have a buyer.
                    </p>
                    <h3>Luxury Residential Property in Noida</h3>
                    <p>
                      Luxury property in Noida has moved past the experimental stage. It now stands on its own, especially along the Expressway.
                      Projects in sectors 94, 128, and 150 offer large floor plates, lower density, and better design thinking. Buyers comparing
                      Gurgaon with Noida at this level often realise the value gap is still in Noida’s favour.
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
                  <span className="text-[#CBB27A]">Buy Home in Noida</span> with Trusted Real Estate Consultants
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>
                      Most buyers underestimate the process when they buy home in Noida. Shortlisting takes time. Site visits take longer.
                      Paperwork takes the longest. Trying to manage all of this alone often leads to rushed decisions.
                    </p>
                    <h3>Expert Guidance for Buying a House in Noida</h3>
                    <p>
                      Buying house in Noida is not about selecting a layout. It is about understanding the developer behind it. Has the builder
                      delivered on time before? Are they following RERA timelines in current projects? Does the payment plan protect the buyer or
                      the builder? These are the questions that rarely show up on listings but define how smooth the purchase will be.
                    </p>
                    <p>Most buyers approach buying house in Noida by comparing layouts and prices first. That usually leads to the wrong shortlist. A better approach is to start with builder credibility and location fundamentals, then narrow down options that actually hold value over time.</p>
                    <h3>Verified Residential Property Listings</h3>
                    <p>
                      One common frustration buyers face is outdated inventory. A unit looks available online but was sold weeks ago. Working
                      with verified listings removes that noise. Pricing is real. Availability is current. Decisions become faster because the
                      information is reliable.
                    </p>
                    <h3>End-to-End Home Buying Assistance</h3>
                    <p>
                      The process stretches from first visit to final possession. That includes documentation, loan coordination, and follow-ups
                      that most buyers do not anticipate. Handled properly, it saves time. Handled poorly, it delays everything. For a verified
                      shortlist, <Link href="/contact" className="text-[#CBB27A] font-semibold hover:underline">contact us</Link>.
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
                  <span className="text-[#CBB27A]">Property for Sale</span> in Noida for Every Budget
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>
                      Budget defines the starting point, not the final decision. What matters more is what that budget actually gets you on the
                      ground. Every property for sale in Noida should be read against carpet, approvals, and builder delivery record, not only
                      the rate. For verified options, see{" "}
                      <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
                        property in Noida
                      </Link>
                      .
                    </p>
                    <h3>Affordable Residential Property in Noida</h3>
                    <p>
                      Greater Noida West still offers the strongest entry point. Prices range between ₹4,500 and ₹6,500 per sq ft. What
                      changed in the last few years is livability. Schools are running. Retail is open. Roads are functional. That shift moved the area from
                      speculative to usable.
                    </p>
                    <h3>Mid-Segment Housing Projects</h3>
                    <p>
                      The ₹80 lakh to ₹1.8 crore range sees the highest activity. Buyers here want balance. Location, connectivity, and project
                      quality all matter equally. Sectors 75 to 78 and 121 dominate this segment. Metro access already exists, which reduces future
                      uncertainty.
                    </p>
                    <h3>Premium and Luxury Residential Projects</h3>
                    <p>
                      Above ₹2 crore, the focus shifts almost entirely to the Expressway. Projects here are not just about amenities. They are
                      about planning. Wider roads, lower congestion, and better long-term appreciation potential. This is where buyers start comparing
                      NCR locations seriously.
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
                  <span className="text-[#CBB27A]">Luxury Property</span> in Noida for Modern Living
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>Luxury in Noida is no longer defined by brochures. It shows on site in <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">luxury property in Noida</Link>.</p>
                    <h3>Luxury Apartments in Prime Noida Sectors</h3>
                    <p>
                      Sector 150 leads demand. Prices range from ₹12,000 to ₹15,000 per sq ft. Open spaces, lower density, and better air
                      quality play a role here. Sectors 94 and 128 follow closely, driven by proximity to Delhi and established infrastructure.
                    </p>
                    <h3>High-End Villas and Penthouses</h3>
                    <p>
                      These options rarely stay listed for long. Availability changes quickly. Buyers looking for penthouses or villas usually
                      need real-time information. Portals rarely reflect actual stock in this segment.
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
                  <span className="text-[#CBB27A]">Best Locations</span> to Buy Residential Property in Noida
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>A wrong location cannot be fixed later. Buyers often realise this too late.</p>
                    <h3>Residential Property in Noida Extension</h3>
                    <p>
                      <Link
                        href="/properties-in-greater-noida"
                        className="text-[#CBB27A] font-semibold hover:underline"
                      >
                        Properties in Greater Noida
                      </Link>{" "}
                      have stabilised. Prices still remain accessible, but the area now functions as a proper residential zone.
                      Projects nearing possession hold the strongest value. Delayed inventory still exists, so selection matters.
                    </p>
                    <h3>Residential Property Near Noida Expressway</h3>
                    <p>
                      The Expressway corridor offers the most reliable long-term hold. Connectivity, developer presence, and infrastructure all align
                      here. That combination reduces risk for both end users and investors.
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
                  <span className="text-[#CBB27A]">Why Invest</span> in Residential Property in Noida
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>The investment case is not based on hype. It is backed by visible triggers.</p>
                    <h3>Rapid Infrastructure Development</h3>
                    <p>
                      Jewar Airport is under construction. Metro expansion plans are confirmed. Road networks continue to improve. These are not
                      future ideas. Work is already underway.
                    </p>
                    <h3>High Property Appreciation Potential</h3>
                    <p>
                      Certain sectors have already seen strong appreciation. Sector 150 is one example. The important detail is this. Much of the
                      growth happened before full infrastructure completion. That leaves room for further upside.
                    </p>
                    <p>Prices in parts of Noida have nearly doubled since 2020, and that growth happened before major infrastructure like Jewar Airport becomes fully operational.</p>
                    <p>Capital-focused options also improve with planning-led corridors; see <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">Greater Noida properties</Link>.</p>
                    <h3>Growing Demand for Residential Housing</h3>
                    <p>
                      Noida&apos;s job market continues to expand. IT parks, offices, and educational institutions bring consistent demand. End-user
                      driven markets tend to stay more stable. That matters when you plan an exit.
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
                  How Our <span className="text-[#CBB27A]">Real Estate Experts</span> Help You Buy Property in Noida
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>
                      Every buyer comes with a different requirement. Budget alone does not define the shortlist. Book an <Link href="/advisory-session" className="text-[#CBB27A] font-semibold hover:underline">advisory session</Link> and we map options accordingly.
                    </p>
                    <h3>Understanding Your Home Buying Requirements</h3>
                    <p>
                      Possession timeline, location preference, and risk tolerance all matter. Two buyers with the same budget often end up
                      choosing completely different properties once these factors are clear.
                    </p>
                    <h3>Shortlisting the Best Residential Projects</h3>
                    <p>
                      A short list works better than a long one. Three to five options with clear reasoning help buyers compare properly. Random
                      listings do not.
                    </p>
                    <p>The goal is not to show more options. It is to identify the best property in Noida for a specific requirement. That shift alone saves buyers weeks of unnecessary site visits.</p>
                    <h3>Assistance with Site Visits and Documentation</h3>
                    <p>
                      Site visits reveal what brochures hide. Documentation reveals what sales teams avoid discussing. Both need attention before any
                      booking decision.
                    </p>
                  </div>
                </div>
              </div>
            </article>
            <div className="w-full flex justify-center py-8" data-seo-separator={6}>
              <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
            </div>

            <article data-seo-block>
              <header className="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                  <span className="text-[#CBB27A]">Why Choose Celeste Abode</span> for Buying Property in Noida
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>
                      Most buyers do not need more options. They need better judgement. Celeste Abode approaches this as a consultant, not a
                      broker. That means some projects get filtered out before the buyer even sees them. Learn about our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">real estate consulting services</Link>.
                    </p>
                    <h3>Experienced Real Estate Consultants</h3>
                    <p>
                      Experience shows most clearly when something looks good but is not. Identifying that early saves buyers from long-term issues.
                    </p>
                    <h3>Strong Network with Top Builders</h3>
                    <p>
                      Direct developer access ensures pricing clarity and real availability. It also allows honest conversations around flexibility,
                      something buyers rarely get through standard channels.
                    </p>
                    <h3>Transparent and Secure Property Transactions</h3>
                    <p>
                      Every document matters. RERA, approvals, agreements. If something does not check out, it gets flagged before money moves. That
                      is how the process should work.
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

          {/* FAQ Section — same pattern as properties-in */}
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-4xl px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions About Buying House in Noida
                </h2>
                <p className="text-lg text-gray-600 font-poppins">
                  Everything you need to know about buying residential property in Noida
                </p>
              </div>
              <LocationFAQs faqs={RESIDENTIAL_FAQS} />
            </div>
          </section>
            </div>

            <aside className="hidden lg:block">
              <ConsultationSidebar headline="Looking for a home in Noida?" subtext="Tell us your budget. We shortlist, verify, and set up visits only for what fits." />
            </aside>
          </div>

          {/* CTA */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-[#0f1112] to-gray-900">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-poppins">
                Ready to Buy Residential Property in Noida?
              </h2>
              <p className="text-white/85 leading-relaxed font-poppins mb-8">
                Get a shortlist of verified residential projects, site visit support, and documentation review. No hard sell—just clarity.
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
