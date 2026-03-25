import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Phone, Building2 } from "lucide-react";
import { Property } from "@/types/property";
import { getSupabaseAdminClient } from "@/lib/supabase-server";
import { supabaseToProperty } from "@/lib/supabase-property-mapper";
import { fetchLocalitiesByLocationId } from "@/lib/fetch-localities";
import { NoidaPropertiesGrid } from "@/components/noida-properties-grid";
import { LocationPropertyFilters } from "@/components/location-property-filters";
import { BreadcrumbSchema, WebPageSchema, FAQPageSchema } from "@/lib/structured-data";
import { SeoBlocksRevealController } from "@/components/seo-blocks-reveal-controller";
import LocationFAQs from "@/components/location-faqs";
import { ConsultationSidebar } from "@/components/consultation-sidebar";
import { OpenConsultationTrigger } from "@/components/open-consultation-trigger";
import type { FAQ } from "@/types/location";
import { PROPERTY_SEARCH_ANCHOR_ID } from "@/lib/scroll-listings";

/**
 * On-page target phrases (user brief; /flats-in-ghaziabad). Present in `<p>` / FAQ body:
 * flats in Ghaziabad · flat for sale in indirapuram ghaziabad ·
 * 3 bhk flats in indirapuram ghaziabad · flat in ghaziabad for sale
 */

const SITE_URL = "https://www.celesteabode.com";
const PAGE_URL = `${SITE_URL}/flats-in-ghaziabad`;

const FAQ_LINK =
  "color:#CBB27A;font-weight:600;text-decoration:underline;text-underline-offset:2px";

const GHAZIABAD_FLATS_FAQS: FAQ[] = [
  {
    id: "ghz-flats-faq-1",
    question: "Is Ghaziabad a Good Place to Buy a Flat?",
    answer: `Yes, when you pick the zone and the file, not the hoarding. Indirapuram, Vaishali, and Vasundhara each price differently. Delhi–Meerut Expressway and RRTS are live. We do not treat flats in Ghaziabad as one market. Browse <a href="/properties-in-ghaziabad" style="${FAQ_LINK}">properties in Ghaziabad</a>, then call us with your brief.`,
  },
  {
    id: "ghz-flats-faq-2",
    question: "Which Areas Are Best for Flats in Ghaziabad?",
    answer: `Match commute and schools first. Indirapuram still has the deepest resale depth. Vaishali sits close on connectivity. Vasundhara fits tighter budgets with RRTS nearby. Same EMI in Noida? Line it up with <a href="/properties-in-noida" style="${FAQ_LINK}">property in Noida</a> before you lock. Share your pin code and we map both.`,
  },
  {
    id: "ghz-flats-faq-3",
    question: "Are 3 BHK Flats Available in Indirapuram Ghaziabad?",
    answer: `Yes. 3 bhk flats in indirapuram ghaziabad cluster strongest in Shakti Khand and Niti Khand. Ticket still moves with society, floor, and maintenance. Do not buy off a portal photo alone. Check our <a href="/properties-in-ghaziabad" style="${FAQ_LINK}">Ghaziabad inventory</a>, then <a href="/contact" style="${FAQ_LINK}">contact us</a> for a shortlist we have verified.`,
  },
];

const CONTENT_BLOCK_CLASS =
  "text-sm md:text-base text-gray-800 font-poppins mb-6 md:mb-8 max-w-[700px] mx-auto text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0 " +
  "leading-[1.75] " +
  "[&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_p]:mb-4 [&_p]:last:mb-0";

export default async function FlatsInGhaziabadPage() {
  const supabase = getSupabaseAdminClient();

  const { data: ghaziabadLocation } = await supabase
    .from("locations_v2")
    .select("id, slug")
    .eq("slug", "ghaziabad")
    .eq("is_published", true)
    .single();

  let properties: (Property & { locationSlug: string })[] = [];
  let localities: Array<{ value: string; label: string }> = [];
  let totalPropertiesCount: number | null = null;

  if (ghaziabadLocation?.id) {
    const [{ data: localitiesData }, { data: propertiesData }, { count }] = await Promise.all([
      fetchLocalitiesByLocationId(ghaziabadLocation.id).then((list) => ({ data: list })),
      supabase
        .from("properties_v2")
        .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
        .eq("location_id", ghaziabadLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("properties_v2")
        .select("id", { count: "exact", head: true })
        .eq("location_id", ghaziabadLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true),
    ]);

    totalPropertiesCount = count;
    localities = Array.isArray(localitiesData) ? localitiesData : [];
    properties = (propertiesData || []).map((prop: any) => {
      const p = supabaseToProperty(prop);
      return { ...p, locationSlug: ghaziabadLocation.slug } as Property & { locationSlug: string };
    });
  }

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Properties", url: `${SITE_URL}/properties` },
    { name: "Flats in Ghaziabad", url: PAGE_URL },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Flats in Ghaziabad - Buy Flat in Ghaziabad with Verified Listings"
        description="Buy flats in Ghaziabad with trusted real estate consultants. Indirapuram, Vaishali, Vasundhara. Verified listings, expert due diligence, and end-to-end buying assistance."
        url={PAGE_URL}
        image="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flats-in-ghaziabad/flats-in-ghaziabad.webp"
      />
      <FAQPageSchema faqs={GHAZIABAD_FLATS_FAQS} />

      <div className="min-h-screen bg-background">
        <Header alwaysBlack />
        <main>
          <section
            className="relative min-h-screen flex items-center justify-center"
            data-site-hero
          >
            <div className="absolute inset-0">
              <Image
                src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flats-in-ghaziabad/flats-in-ghaziabad.webp"
                alt="Flats in Ghaziabad - buy flat in Ghaziabad with verified listings"
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
                  Flats in Ghaziabad
                </span>
                <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl">
                  Buy Flat in Ghaziabad with Verified Listings
                </span>
              </h1>
            </div>
          </section>

          <div className="w-full flex justify-center py-2">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>

          <section id="properties" className="py-8 md:py-12 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              {ghaziabadLocation?.id && (
                <>
                  <div
                    id={PROPERTY_SEARCH_ANCHOR_ID}
                    className="scroll-mt-24 md:scroll-mt-28"
                    aria-label="Search and filter properties"
                  >
                    <LocationPropertyFilters
                      location="ghaziabad"
                      localities={localities}
                      hidePropertyType
                      defaultPropertyType="apartments"
                    />
                  </div>
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="ghaziabad"
                      initialTotalCount={totalPropertiesCount ?? properties.length}
                      defaultPropertyType="apartments"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
                      <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
                        No flats in Ghaziabad at the moment. Browse all{" "}
                        <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">
                          properties in Ghaziabad
                        </Link>
                        .
                      </p>
                      <Link
                        href="/properties-in-ghaziabad"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
                      >
                        View All Ghaziabad Properties
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
                <SeoBlocksRevealController initialVisible={1} step={1} totalCount={10}>
                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Buy <span className="text-[#CBB27A]">Flats in Ghaziabad</span> with Trusted Real Estate Consultants
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <p>
                            Flats in Ghaziabad are not one strip. Indirapuram, Vaishali, and Vasundhara each trade on different demand. Delhi–Meerut Expressway and RRTS changed how far a buyer will commute. We see more families compare a flat in Ghaziabad for sale here against mid Noida on the same EMI. That only works when carpet, society, and approvals are real.
                          </p>
                          <p>
                            If you want inventory we already filter, start with{" "}
                            <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">
                              properties in Ghaziabad
                            </Link>
                            . Then tell us your school radius and office pin. We narrow from there.
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
                        Find the Best Flats in Ghaziabad with{" "}
                        <span className="text-[#CBB27A]">Expert Property Consultants</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Flats in Ghaziabad for Modern Living</h3>
                          <p>
                            Schools, clinics, and daily shops are already running in Indirapuram and Vaishali. You are not betting on a brochure timeline. Flats in Ghaziabad in these pockets suit buyers who want to move in and live now, not wait five years for a promised club.
                          </p>
                          <h3>Flat in Ghaziabad for Sale for Homebuyers and Investors</h3>
                          <p>
                            A flat in Ghaziabad for sale can be end-use or rent. End-use buyers care about society health and commute. Investors care about tenant depth and maintenance load. We run the same RERA and builder checks for both. If you also scan{" "}
                            <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
                              flats for sale in Noida
                            </Link>
                            , we help you read carpet per rupee on both sides.
                          </p>
                          <h3>Affordable and Premium Flats in Ghaziabad</h3>
                          <p>
                            Vasundhara still carries tighter tickets for 2 BHK buyers. Indirapuram asks more for the same box because resale is deeper. Premium pockets cost more for a reason. We say which reason matters for you.
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
                        Why Work with Professional{" "}
                        <span className="text-[#CBB27A]">Real Estate Consultants</span> in Ghaziabad
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Expert Guidance for Buying Flats in Ghaziabad</h3>
                          <p>
                            This city has a history of stuck phases. A fresh RERA number does not erase old delivery habits. We read approvals, builder past phases, and site pace before we add a name to your list.
                          </p>
                          <h3>Access to Verified Flats and Residential Projects</h3>
                          <p>
                            Portals show photos. They rarely show pending NOCs or weak maintenance. We only pass projects that clear our file check. See how we work on{" "}
                            <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">
                              real estate consulting services
                            </Link>
                            .
                          </p>
                          <h3>Strategic Property Investment Advice</h3>
                          <p>
                            Indirapuram is deep on resale. Vasundhara can offer more room on ticket. Raj Nagar Extension carries more execution risk. We match zone to your hold period, not to a launch poster.
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
                        Explore <span className="text-[#CBB27A]">Flats for Sale</span> in Indirapuram Ghaziabad
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Ready to Move and Resale</h3>
                          <p>
                            Many buyers want a flat for sale in indirapuram ghaziabad without build risk. Resale stock is wide. You still need to read society charges, parking, and lift load. We walk that before you pay a token.
                          </p>
                          <h3>3 BHK Flats in Indirapuram Ghaziabad</h3>
                          <p>
                            3 bhk flats in indirapuram ghaziabad pull the most family demand near good schools and NH-9. Shakti Khand and Niti Khand often lead on finish and depth. Price still shifts by floor and facing. We anchor on live comps, not a chart from last year.
                          </p>
                          <h3>What to Verify Before You Book</h3>
                          <p>
                            Check maintenance rules, power backup split, and corpus health. A flat for sale in indirapuram ghaziabad can look identical online and feel different on the ground. We tell you which society clears our bar.
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
                        Leading Real Estate Consultants for <span className="text-[#CBB27A]">Flats in Ghaziabad</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Personalised Property Consultation</h3>
                          <p>
                            We ask for all-in budget, possession date, and how much delay you can carry. Then we build three to five names, not fifty tabs. Book an{" "}
                            <Link href="/request-a-free-consultation" className="text-[#CBB27A] font-semibold hover:underline">
                              advisory session
                            </Link>{" "}
                            if you want that on the calendar.
                          </p>
                          <h3>Market Research and Price Analysis</h3>
                          <p>
                            Averages hide the gap between two societies on the same road. We price at society level when it matters for your offer.
                          </p>
                          <h3>Investment-Focused Property Recommendations</h3>
                          <p>
                            We only push rent plays when tenant demand matches your unit size. We only push appreciation plays when delivery risk fits your timeline.
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
                        Our Real Estate Consulting Services for{" "}
                        <span className="text-[#CBB27A]">Flat Buyers</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Property Buying Assistance</h3>
                          <p>
                            We stay in the deal from first call to possession. Shortlisting, site visits, agreement read, loan referrals, and follow-up with the builder. Buying flats in Ghaziabad often runs longer than buyers expect. We do not vanish after the booking cheque.
                          </p>
                          <h3>Residential Property Advisory</h3>
                          <p>
                            We advise on project pick, RERA check, builder track record, and payment plan across Indirapuram, Vaishali, Vasundhara, and other active belts. The note is for your situation, not a generic market essay.
                          </p>
                          <h3>Site Visit and Project Evaluation</h3>
                          <p>
                            A flat for sale in indirapuram ghaziabad can look perfect online. On site we check real finish, real size, and real possession talk. We report what we see before you commit.
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
                        Top Locations to Buy <span className="text-[#CBB27A]">Flats in Ghaziabad</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Flats in Indirapuram Ghaziabad</h3>
                          <p>
                            Indirapuram still leads on buyer depth and resale speed. Metro and NH-9 keep it tied to Noida and Delhi jobs. Flats in Ghaziabad here cost more per square foot than Vasundhara for that reason.
                          </p>
                          <h3>Flats in Vaishali Ghaziabad</h3>
                          <p>
                            Vaishali shares much of Indirapuram&apos;s road and metro story. Some families pick it for a slightly softer ticket with similar daily life.
                          </p>
                          <h3>Flats in Vasundhara Ghaziabad</h3>
                          <p>
                            Vasundhara fits tighter budgets. RRTS at Sahibabad helps commuters. Growth has been steady in recent years. You still pick builder and society with care.
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
                        How Celeste Abode Helps You Buy the <span className="text-[#CBB27A]">Right Flat</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Understanding Your Property Requirements</h3>
                          <p>
                            We map need first. Budget after stamp duty. School radius. Office commute. Then we shortlist.
                          </p>
                          <h3>Shortlisting the Best Flats in Ghaziabad</h3>
                          <p>
                            Every name on the list has a why and a watch-out. Honest shortlists beat long PDFs.
                          </p>
                          <h3>Complete Assistance from Site Visit to Booking</h3>
                          <p>
                            We join site visits. We read the builder-buyer agreement before you sign. We stay past the cheque. Read our{" "}
                            <Link href="/advisory-philosophy" className="text-[#CBB27A] font-semibold hover:underline">
                              advisory philosophy
                            </Link>{" "}
                            if you want the full picture.
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={7}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Why <span className="text-[#CBB27A]">Celeste Abode</span> Are Trusted Property Consultants in Ghaziabad
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Experienced Real Estate Advisors</h3>
                          <p>
                            We have advised buyers through slow cycles and fast ones in Ghaziabad. That history shapes how we read builder risk, society quality, and resale depth before we recommend a flat in ghaziabad for sale.
                          </p>
                          <h3>Transparent Property Advisory</h3>
                          <p>
                            If a project is delayed, a file is weak, or a price is stretched, you hear it before you burn a weekend on site visits. Transparency is not a slogan here. It is how we keep trust on flats in Ghaziabad.
                          </p>
                          <h3>Verified Property Listings</h3>
                          <p>
                            Each listing we share clears title, RERA, and delivery checks first. We do not forward random broker forwards. When you are ready,{" "}
                            <Link href="/contact" className="text-[#CBB27A] font-semibold hover:underline">
                              contact us
                            </Link>{" "}
                            with your brief and we respond with a clear next step.
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="w-full flex justify-center py-8" data-seo-separator={8}>
                    <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
                  </div>

                  <article data-seo-block>
                    <header className="text-center mb-8 md:mb-12 lg:mb-16">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                        Benefits of Choosing Professional{" "}
                        <span className="text-[#CBB27A]">Property Dealers in Ghaziabad</span>
                      </h2>
                    </header>
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                      <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                        <div className={CONTENT_BLOCK_CLASS}>
                          <h3>Verified Listings</h3>
                          <p>
                            Professional dealers cut noise. You see fewer options, but each one is checked for title, approvals, and builder standing. That saves months when you hunt a flat for sale in indirapuram ghaziabad or nearby sectors.
                          </p>
                          <h3>Best Price Negotiation</h3>
                          <p>
                            We know where builders flex and where they do not. You still decide the number. We help you avoid paying for hype you cannot resell later.
                          </p>
                          <h3>Hassle-Free Buying</h3>
                          <p>
                            Paperwork, NOCs, loan coordination, and follow-up with the developer sit with us as much as you want. You focus on the flat. We keep the process moving.
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
                      Frequently Asked Questions About Flats in Ghaziabad
                    </h2>
                    <p className="text-lg text-gray-600 font-poppins">
                      Short answers. Call us if your case needs more depth.
                    </p>
                  </div>
                  <LocationFAQs faqs={GHAZIABAD_FLATS_FAQS} />
                </div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <ConsultationSidebar
                headline="Looking for a flat in Ghaziabad?"
                subtext="Indirapuram, Vaishali, or Vasundhara. Tell us budget and commute. We verify before we show."
              />
            </aside>
          </div>

          <section className="py-16 md:py-24 bg-gradient-to-br from-[#0f1112] to-gray-900">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-poppins">
                Looking for a flat in Ghaziabad and want an honest view before you decide?
              </h2>
              <p className="text-white/85 leading-relaxed font-poppins mb-8">
                Talk to a Celeste Abode consultant. No pitch, no pressure. Just a clear read of what is worth your time.
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
