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
const PAGE_URL = `${SITE_URL}/flats-for-sale-in-greater-noida`;

const GREATER_NOIDA_FLATS_FAQS: FAQ[] = [
  { id: "gn-flats-faq-1", question: "What is the Average Price of Flats in Greater Noida?", answer: "Flats in Greater Noida vary significantly by zone and configuration. A one BHK flat in Greater Noida West starts around Rs 25 to 35 lakh. A 2 BHK flat in Greater Noida runs Rs 40 to 75 lakh depending on sector and developer. 3 BHK flats in Greater Noida West from credible developers like Gaurs, ATS, and Mahagun sit between Rs 80 lakh and Rs 1.5 crore. Studio apartments in Greater Noida and Yamuna Expressway zones start from Rs 18 lakh, primarily targeting investors. Apartments in Greater Noida along the Yamuna Expressway corridor carry a premium over West zone pricing, driven by Jewar Airport proximity." },
  { id: "gn-flats-faq-2", question: "Which Area is Best to Buy Flats in Greater Noida?", answer: "Greater Noida West suits buyers who want the best value per sq ft in NCR right now. Infrastructure has matured, metro connectivity is incoming, and social amenities are in place. The Yamuna Expressway corridor suits investors with a 5 to 7 year horizon — Jewar Airport, Film City, and YEIDA's expanding institutional footprint are the demand drivers. Alpha and Beta sectors suit buyers who want established GNIDA-developed zones with clean land titles, developed roads, and stable resale liquidity. Each zone has a different risk-return profile. Flats for sale in Greater Noida in the right zone for your objective outperform flats in the wrong zone at any price point." },
  { id: "gn-flats-faq-3", question: "Is Greater Noida Good for Property Investment?", answer: "Yes, with zone selection doing most of the work. Buy flat in Greater Noida in an established sector with confirmed infrastructure and the fundamentals are strong: values have risen approximately 127% between 2020 and 2025, rental demand in Greater Noida West grew over 20% quarter-on-quarter in Q2 2025, and Jewar Airport is under active construction with a confirmed Phase 1 timeline. The qualification is that not every part of Greater Noida is at the same stage. Peripheral zones with unconfirmed connectivity timelines carry a different risk profile from developed sectors where the infrastructure is already working. Celeste Abode assesses both categories on their actual merits before advising." },
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

  if (gnLocation?.id) {
    const [{ data: localitiesData }, { data: propertiesData }] = await Promise.all([
      fetchLocalitiesByLocationId(gnLocation.id).then((list) => ({ data: list })),
      supabase
        .from("properties_v2")
        .select("id, slug, project_name, developer, location, location_id, locality_id, property_type, project_status, configuration, hero_image, hero_image_alt, is_published, created_at, updated_at")
        .eq("location_id", gnLocation.id)
        .eq("property_type", "Apartment/Flats")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

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
          <section className="relative min-h-screen flex items-center justify-center">
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
                  — Buy Apartments in Greater Noida
                </span>
              </h1>
            </div>
          </section>

          <section id="properties" className="py-8 md:py-12 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
              {gnLocation?.id && (
                <>
                  <LocationPropertyFilters
                    location="greater-noida"
                    localities={localities}
                    hidePropertyType
                    defaultPropertyType="apartments"
                  />
                  {properties.length > 0 ? (
                    <NoidaPropertiesGrid
                      initialProperties={properties}
                      location="greater-noida"
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

          <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[360px_1fr] lg:gap-10 lg:pb-32">
            <aside className="hidden lg:block order-first">
              <ConsultationSidebar variant="residential" headline="Exploring flats in Greater Noida?" subtext="West zone, Expressway, or GNIDA sectors. Tell us what you need and we'll do the groundwork first." />
            </aside>
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
                          <p>1.65 lakh flats. That is how many units across Noida and Greater Noida remain stalled or significantly delayed, worth Rs 1.18 lakh crore collectively. Any consultant who does not mention this upfront when talking about flats for sale in Greater Noida is not someone you should be taking advice from. The market has real upside. It also has real risk. At Celeste Abode, we help buyers navigate both sides, not just the brochure version.</p>
                          <p>Greater Noida is not uniform. Pari Chowk, Greater Noida West, Knowledge Park, and the Yamuna Expressway corridor each follow different price trajectories and carry different risk profiles. A buyer comparing flats in Greater Noida across all four zones without understanding these distinctions will consistently make the wrong shortlist. That is the first thing we fix when a client comes to us.</p>
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
                          <p>Not all gated communities are what they claim to be. Gaur City, ACE City, and Eldeco Residency Greens are functional, with working RWAs and maintained common areas. Several others in the same price range are gated in name only. Registry disputes, incomplete amenity blocks, and builder dues pending with GNIDA are still open in multiple societies. Before choosing gated community apartments in Greater Noida, we walk through the OC status, RWA health, and builder dues position on every option we present.</p>
                          <h3>Luxury Apartments in Greater Noida</h3>
                          <p>The luxury segment here is newer than in Gurgaon but it is growing fast. Godrej Majesty in Sector 12 runs Rs 3.47 to 5.82 crore. Sobha Aurum in Sector 36 starts at Rs 1.26 crore. For buyers who have only looked at Golf Course Road, the per-square-foot quality difference has narrowed considerably. What Greater Noida still offers is the same specification at a 20 to 30 percent lower price point. Luxury apartments in Greater Noida are not a compromise. They are a different price-to-quality calculation.</p>
                          <h3>Affordable Housing Flats</h3>
                          <p>Sectors 1 and 4 in Greater Noida West, Chi, and Omicron carry the strongest affordable supply. Gaur City 4th Avenue has occupied 2 BHK units at Rs 1.04 crore with a functioning society and metro proximity. For buyers who dismissed affordable flats for sale in Greater Noida as a category for buyers who have no other option, these sectors have moved well past that profile. The residents who live there chose it.</p>
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
                          <p>Five years ago this was not a real product category here. Knowledge Park zones and the Pari Chowk belt have changed that. A studio apartment in Greater Noida near the university corridor or IT stretch serves a tenant profile that does not exist in most residential sectors: working professionals and students who need a functional unit and will pay steady rent year-round regardless of season. For investors running a pure yield strategy, that consistency matters more than the headline rental number.</p>
                          <h3>Compact Studio Apartments for Investment</h3>
                          <p>Units in the 434 to 650 sq ft range are trading between Rs 35 lakhs and Rs 65 lakhs. Rental yields on a well-located studio apartment in Greater Noida run 6 to 8 percent. A mid-segment 2 BHK in the same city typically delivers 3 to 5 percent. That yield gap is not small. Yield-focused buyers who default to a 2 BHK out of habit are often leaving real money on the table without having run the comparison.</p>
                          <h3>Studio Apartments Near Commercial Hubs</h3>
                          <p>Sharda, Galgotias, and Amity together bring over 80,000 students within a 5 km radius of Knowledge Park. Add the IT employment along the expressway and you have two separate demand streams feeding the same zones. Flats in Greater Noida near Knowledge Park 1, 2, and 3 hold occupancy rates that do not drop in the off-season. That is a structural feature of the location, not a temporary trend driven by one employer or one institution.</p>
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
                          <p>The 1 BHK case is undervalued by most buyers. A one bhk flat in Greater Noida in Sectors Chi or Omicron starts at Rs 28 to 45 lakhs, draws from a wider tenant pool than a 2 BHK, and delivers better gross yield per rupee invested. The 2 BHK market has the highest transaction volume. A 2 bhk flat in Greater Noida runs Rs 75 lakhs to Rs 1.4 crore depending on the sector, with monthly rents between Rs 15,000 and Rs 22,000. For families, this is usually the first configuration that makes daily life workable.</p>
                          <p>3 bhk flats in Greater Noida appreciated 146 percent between 2019 and 2024. That is a factual data point, not a sales pitch. Mid-segment 3 BHK starts at Rs 1.05 crore and goes to Rs 5.82 crore at the premium end. The more useful comparison is against Noida: a 1,400 sq ft 3 BHK in Nimbus Express Park View II is Rs 1.25 crore, where a comparable Sector 150 unit costs 35 to 40 percent more. For families who need actual space to live in, Greater Noida makes that comparison straightforwardly.</p>
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
                          <p>173 percent appreciation over ten years. 24 percent in the last twelve months. Greater Noida West has earned its position as the highest-volume mid-segment zone in the region. Social infrastructure that was a genuine complaint five years ago has caught up. Flats in Greater Noida West, specifically in Sectors 1, 4, and Techzone 4, now sit near functional schools, hospitals, retail, and the Aqua Metro line. The location argument that used to require a long list of caveats is significantly shorter now.</p>
                          <h3>Flats Near Yamuna Expressway</h3>
                          <p>This is a medium-term thesis, and buyers should know that going in. Jewar Airport is confirmed and progressing. YEIDA mixed-use corridor is active. The Namo Bharat Rapid Rail is approved. None of these are operational today. Buyers who decide to buy flat in Greater Noida near the expressway should plan for a 5 to 7 year horizon, not 2. Eldeco Whispers in Sector 22D runs Rs 92 lakhs to Rs 3.31 crore. Gaur Chrysalis starts at Rs 1.53 crore. The entry price still has headroom before the airport re-rates this corridor.</p>
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
                          <p>Five expressways and a metro line, all live today. The Noida-Greater Noida Expressway, DND flyway, Eastern Peripheral Expressway, Yamuna Expressway, and Aqua Metro are operational infrastructure, not planned corridors. Buyers evaluating apartments in Greater Noida are not betting on connectivity arriving in 2028. They are using a road and metro network that already exists, which is a meaningfully different risk profile from what most people assume about this city.</p>
                          <h3>Rapid Infrastructure Development</h3>
                          <p>The FAR relaxation debate is worth addressing directly. UP scrapping ground coverage limits will increase future supply density. Buyers who bought for pure resale flip should think carefully. Buyers who want a home to live in, or investors holding 7-plus years with rental income along the way, are largely unaffected. The fundamentals supporting flats for sale in Greater Noida, employment, university demand, and confirmed infrastructure, remain intact regardless of what the FAR policy says.</p>
                          <h3>High Property Appreciation Potential</h3>
                          <p>Rs 3,340 per sq ft in 2020. Rs 7,411 in 2026. Jewar Airport has not started operations yet. The Namo Bharat rail is still ahead. The Aqua Metro extension is still completing. Buyers entering the market for flats in Greater Noida now are doing so before the most significant infrastructure triggers this corridor carries have actually landed. That is not guaranteed appreciation. But the timing argument for entry is stronger here than in a market where every trigger has already been priced in.</p>
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
                          <p>Most buyers who contact us have already done two weekends of portal research and left more confused. Outdated listings, incorrect pricing, builder sales teams who called five times. We start differently. When you choose to buy flat in Greater Noida through Celeste Abode, the first conversation is about your situation: budget including stamp duty, possession timeline, how much execution risk you can carry. The shortlist comes after that.</p>
                          <h3>Verified Property Listings</h3>
                          <p>Greater Noida has a documented history of delayed registries, stalled projects, and builder dues pending with GNIDA that hold up OC issuance. That history does not disappear because a project has a fresh RERA number. Every listing for flats in Greater Noida that we present has cleared our RERA check, land title review, GNIDA approval status, and developer delivery track record. If something has open complaints, we say so before showing it.</p>
                          <h3>Complete Buying Assistance</h3>
                          <p>Site visit to possession, we stay involved. Home loan coordination, documentation, builder follow-up, registration. A buyer picking up a one bhk flat in Greater Noida as a first investment gets the same support as a family buying a Rs 3 crore apartment. The ticket size does not change how we work. That is the standard we hold ourselves to across every transaction involving apartments in Greater Noida.</p>
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
          </div>

          <section className="py-16 md:py-24 bg-gradient-to-br from-[#0f1112] to-gray-900">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-poppins">
                Ready to Buy a Flat in Greater Noida?
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
