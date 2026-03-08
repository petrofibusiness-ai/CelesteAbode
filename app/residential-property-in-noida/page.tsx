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
const PAGE_URL = `${SITE_URL}/residential-property-in-noida`;

const RESIDENTIAL_FAQS: FAQ[] = [
  { id: "residential-faq-1", question: "Is Noida a Good Place to Buy a Home?", answer: "Yes. Noida offers planned sectors, metro connectivity, and a maturing developer ecosystem. With RERA oversight and strong infrastructure, it is one of NCR's most structured markets for buying a home." },
  { id: "residential-faq-2", question: "What is the Average Price of Residential Property in Noida?", answer: "Prices vary by sector and format. Affordable options in Greater Noida West start around ₹4,500–6,500 per sq ft. Mid-segment 2–3 BHK in Sectors 75–78 run ₹80 lakh to ₹1.8 Cr. Premium and luxury on the Expressway start from ₹2 Cr and go well beyond ₹7 Cr." },
  { id: "residential-faq-3", question: "Which Sector is Best for Residential Property in Noida?", answer: "Sectors 75, 76, 78, and 137 offer good metro access and mid-segment value. For premium and luxury, Sectors 94, 128, 150, and 98 on the Expressway lead. Greater Noida West is best for affordable residential with strong value per sq ft." },
  { id: "residential-faq-4", question: "How to Buy Property in Noida Safely?", answer: "Stick to RERA-registered projects, verify builder delivery record, and get the builder-buyer agreement reviewed before signing. Work with a consultant who can shortlist, assist with site visits, and flag documentation issues. Celeste Abode provides this end-to-end." },
];

// High-end typography & spacing: line-height 1.75, max-width 700px centered in card, gold drop cap via .prose-editorial
const CONTENT_BLOCK_CLASS =
  "prose-editorial text-sm md:text-base text-gray-800 font-poppins mb-6 md:mb-8 max-w-[700px] mx-auto text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0 " +
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

  if (noidaLocation?.id) {
    const [{ data: localitiesData }, { data: propertiesData }] = await Promise.all([
      fetchLocalitiesByLocationId(noidaLocation.id).then((list) => ({ data: list })),
      supabase
        .from("properties_v2")
        .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
        .eq("location_id", noidaLocation.id)
        .in("property_type", ["Apartment/Flats", "Villas"])
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
    { name: "Residential Property in Noida", url: PAGE_URL },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Buy Residential Property in Noida - Buy Home & Luxury Property for Sale"
        description="Noida has become one of NCR's most sought-after cities for homebuyers. Buy residential property in Noida with trusted consultants. Explore apartments, villas & luxury homes for sale."
        url={PAGE_URL}
        image="/NOIDA.avif"
      />
      <FAQPageSchema faqs={RESIDENTIAL_FAQS} />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          {/* Hero — full viewport, H1 only */}
          <section className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src="/NOIDA.avif"
                alt="Residential property in Noida - buy home and luxury property"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-poppins">
                Buy <span className="text-[#CBB27A]">Residential Property in Noida</span> — Buy Home & Luxury Property for Sale
              </h1>
            </div>
          </section>

          {/* Listing: filters + grid only; content blocks (headings + cards) come after */}
          <section id="properties" className="py-8 md:py-12 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              {noidaLocation?.id && (
                <>
                  <LocationPropertyFilters
                    location="noida"
                    localities={localities}
                    hidePropertyType
                    defaultPropertyType="residential"
                  />
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="noida"
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
          <SeoBlocksRevealController initialVisible={2} step={2} totalCount={8}>
            <article data-seo-block>
              <header className="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                  Explore the <span className="text-[#CBB27A]">Best Residential Property</span> in Noida
                </h2>
              </header>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                  <div className={CONTENT_BLOCK_CLASS}>
                    <p>Noida&apos;s residential real estate market is one of NCR&apos;s most structured. Planned sectors, metro lines, and a broad developer mix give buyers genuine depth at every budget. Celeste Abode helps buyers find the best property in Noida by filtering what looks good from what holds up on the ground. Residential property in Noida today covers a better quality range than ever before.</p>
                    <h3>Apartments and Flats in Noida</h3>
                    <p>2 and 3 BHK flats in Sectors 75, 76, 78, and 137 run Rs 60 lakh to Rs 1.5 crore with good metro access. On the Expressway, premium flats in Sectors 128, 150, and 94 from Godrej, Max Estates, M3M, and Tata Housing start at Rs 2 crore with large floor plates.</p>
                    <h3>Independent Houses and Villas in Noida</h3>
                    <p>Independent floors suit buyers who want private outdoor space over large-complex amenities. Sectors 41, 44, and 50 carry established floor inventory. Limited supply in this format keeps resale demand consistent.</p>
                    <h3>Luxury Residential Property in Noida</h3>
                    <p>Luxury property in Noida on the Expressway stands on its own today. Godrej Tropical Isle in Sector 150, Max Estate 128, M3M The Cullinan in Sector 94, and Smartworld Elie Saab in Sector 98 deliver premium 3, 4, and 5 BHK residences that buyers are actively choosing over comparable NCR addresses.</p>
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
                    <p>To buy home in Noida involves more steps than most buyers expect. Shortlisting, site visits, developer due diligence, agreement review, and months of follow-up between booking and possession. Most buyers manage this without anyone on their side. Celeste Abode provides that support from first enquiry to possession.</p>
                    <h3>Expert Guidance for Buying a House in Noida</h3>
                    <p>Buying house in Noida means evaluating what no listing shows. Developer delivery record. Whether construction tracks the RERA timeline. Whether the payment plan uses demand triggers or time-linked instalments. Whether the price is fair against nearby supply. These assessments determine how a purchase plays out, and Celeste Abode provides them before a client commits.</p>
                    <h3>Verified Residential Property Listings</h3>
                    <p>We work directly with developers, so pricing, availability, and possession timelines are current and confirmed. No inflated anchors, no inventory listed as available that sold months ago. When we say something is available at a given price, that is accurate.</p>
                    <h3>End-to-End Home Buying Assistance</h3>
                    <p>Shortlisting, site visits, agreement review, home loan referrals, negotiation, and post-booking follow-up through possession. We coordinate across all parties so buyers focus on the decision, not the administration.</p>
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
                    <p>Property for sale in Noida spans sub-50 lakh apartments in Greater Noida West to 7 crore-plus luxury residences on the Expressway. Developer credibility and what a price actually delivers matters more than the brochure. Celeste Abode helps buyers understand exactly what a given budget gets them.</p>
                    <h3>Affordable Residential Property in Noida</h3>
                    <p>Greater Noida West is the city&apos;s most credible affordable zone. Property rates run Rs 4,500 to Rs 6,500 per sq ft. Projects from Gaurs, ACE Group, and Prateek are at or near possession with schools and retail operational. Strongest value per sq ft in NCR for first-time buyers.</p>
                    <h3>Mid-Segment Housing Projects</h3>
                    <p>The Rs 80 lakh to Rs 1.8 crore band is the most active segment. 2 and 3 BHK flats in Sectors 75 to 78 and 121 with metro access and RERA timelines define it. Payment plan structure and construction stage vary most and matter most in this band.</p>
                    <h3>Premium and Luxury Residential Projects</h3>
                    <p>At Rs 2 crore and above, the Expressway sets the benchmark. Godrej Tropical Isle, Max Estate 128, M3M The Cullinan, ATS Knightsbridge, and Tata Eureka Park represent the premium property for sale in Noida that buyers at this level compare. Developer history and location fundamentals here hold up against any NCR comparison.</p>
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
                    <p>Luxury property in Noida along the Expressway has matured into a standalone destination. Quality delivered in Sectors 94, 128, 150, and 98 reflects genuine market maturation. Large floor plates, professional facility management, smart home integration, and Tier-3 security are standard, not add-ons.</p>
                    <h3>Luxury Apartments in Prime Noida Sectors</h3>
                    <p>Sector 150 commands the highest demand with rates of Rs 12,000 to Rs 15,000 per sq ft. Sectors 94 and 128 follow, anchored by M3M The Cullinan, Mahagun Manorialle, Kalpataru Vista, and L&T Green Reserve. Genuine end-user demand keeps resale liquidity stronger than most comparable NCR corridors.</p>
                    <h3>High-End Villas and Penthouses</h3>
                    <p>Penthouses and villa products change availability quickly and rarely appear accurately on portals. For buyers targeting a penthouse or gated villa community, Celeste Abode tracks live availability directly. <Link href="/contact" className="text-[#CBB27A] font-semibold hover:underline">Reach out</Link> for an accurate picture of what is currently on the market.</p>
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
                    <p>Location determines more of a property&apos;s long-term outcome than almost any other factor at the time of purchase. These two zones currently offer the clearest case across different budgets for residential property in Noida.</p>
                    <h3>Residential Property in Noida Extension</h3>
                    <p>Greater Noida West has crossed from speculative zone to functional destination. Metro extension has a confirmed route. Projects from Gaurs, Prateek, and ACE are at or near possession. Property rates Rs 4,500 to Rs 6,500 per sq ft. Strongest value per sq ft in NCR for mid-range buyers.</p>
                    <h3>Residential Property Near Noida Expressway</h3>
                    <p>The Expressway corridor through Sectors 94, 128, 146, and 150 is Noida&apos;s most established premium belt. Metro Aqua Line access, Tier-1 developers, and genuine end-user demand make it a reliable long-term hold. Property rates Rs 8,000 to Rs 15,000 per sq ft.</p>
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
                    <p>The case for residential property in Noida as an investment rests on traceable fundamentals. If you plan to buy property in Noida for long-term appreciation, three specific factors are driving genuine value growth across key micro-markets right now.</p>
                    <h3>Rapid Infrastructure Development</h3>
                    <p>Jewar International Airport is under construction with confirmed funding and an announced commercial timeline. The Greater Noida West metro extension has a finalised route. Eastern Peripheral Expressway and NH-24 upgrades are progressing. Noida sits in the path of several major infrastructure projects, which has a direct effect on adjacent property values.</p>
                    <h3>High Property Appreciation Potential</h3>
                    <p>Sector 150 delivered over 43% year-on-year capital appreciation per Savills India data. Greater Noida West is in consistent recovery as projects reach possession. Appreciation is not uniform, which is why sector and stage selection matter. Buyers who entered the right corridors have seen returns that make Noida one of NCR&apos;s stronger residential investment stories.</p>
                    <h3>Growing Demand for Residential Housing</h3>
                    <p>Noida&apos;s working population has grown steadily, driven by IT parks, MNC offices, and educational institutions. That creates organic housing demand from genuine residents, not just investors. Markets with this kind of demand are more price-stable and liquid at exit.</p>
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
                    <p>Buying house in Noida takes months and requires accurate information at every stage. To buy property in Noida well, buyers need someone on their side throughout. Here is how Celeste Abode structures that.</p>
                    <h3>Understanding Your Home Buying Requirements</h3>
                    <p>All-in budget after stamp duty and registration. Possession timeline and whether under-construction risk is acceptable. Non-negotiable location priorities. Self-use or investment intent. Two buyers with identical budgets can have completely different shortlists when their requirements are mapped properly. We establish these specifics before presenting anything.</p>
                    <h3>Shortlisting the Best Residential Projects</h3>
                    <p>Three to five projects, each with clear reasoning: why this developer, why this sector, what the pricing reflects against comparable supply, and any limitations identified. No projects added to pad the list, no recommendations driven by margin. Every option has been assessed before the buyer sees it.</p>
                    <h3>Assistance with Site Visits and Documentation</h3>
                    <p>We attend site visits and debrief honestly on what we see versus what was presented. Allotment letter and builder-buyer agreement are reviewed before signing, with liability-creating clauses flagged. On negotiation, we identify where real flexibility exists and approach it specifically.</p>
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
                    <p>Celeste Abode advises clients the way we would advise family looking to buy home in Noida. Honest input including concerns, not just what makes a project sound good. Finding the best property in Noida for a specific buyer requires that standard.</p>
                    <h3>Experienced Real Estate Consultants</h3>
                    <p>Our team has worked through delivery defaults pre-RERA, the regulatory transition, and the current recovery phase. That cycle experience makes developer credibility checks and project risk assessments sharper than consultants who have only operated in an up-market.</p>
                    <h3>Strong Network with Top Builders</h3>
                    <p>Direct developer relationships across Noida give us access to live inventory, accurate pricing, and honest answers on payment plan flexibility, without routing through a sales line that is incentivised to answer favourably rather than accurately.</p>
                    <h3>Transparent and Secure Property Transactions</h3>
                    <p>RERA verification, builder-buyer agreement review, mandatory approval checks, and legal coordination where required. Every client knows exactly what they are committing to before any money moves. If something in the documentation is not right, we raise it before the booking. That is the standard every buyer deserves.</p>
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
              <ConsultationSidebar />
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
