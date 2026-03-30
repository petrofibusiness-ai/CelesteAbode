import Image from "next/image";
import Link from "next/link";
import { Phone, CalendarClock } from "lucide-react";
import { SOBHA_RIVANA_BLOG_PATH, SOBHA_RIVANA_HERO_IMAGE } from "@/lib/blog-data";
import { ThreeBhkGreaterNoidaFaqAccordion } from "./three-bhk-greater-noida-faq-accordion";
import { ThreeBhkDetailCardsCarousel } from "./three-bhk-detail-cards-carousel";

const CONSULT = "/request-a-free-consultation";
const WA = "https://wa.me/919910906306";

/** Eight Greater Noida West projects: feeds the detail project carousel below. */
const GN_3BHK_PROPERTY_BLOCKS: {
  href: string;
  name: string;
  subtitle: string;
  /** Full-bleed card background (project hero) */
  heroImage: string;
  carouselCta: string;
  /** Optional; shown beside the project name on detail cards only */
  reraId?: string;
  priceRange: string[];
  /** Roads, hubs, schools, hospitals—what helps daily life */
  nearbyBullets: string[];
  features: string[];
  projectCtaLine: string;
}[] = [
  {
    href: SOBHA_RIVANA_BLOG_PATH,
    name: "Sobha Rivana",
    subtitle: "2–4 BHK · Sector 1 · Greater Noida West",
    heroImage: SOBHA_RIVANA_HERO_IMAGE,
    carouselCta: "See pricing & full guide",
    reraId: "UPRERAPRJ313638",
    priceRange: [
      "~₹13,000–15,000/sq ft before parking and GST",
      "Many 2 and 3 BHK from ~₹2.25 Cr upward (varies by size and floor)",
    ],
    nearbyBullets: [
      "Road links toward central Noida and the NH-24 / elevated corridor for Delhi-side travel",
      "Schools, clinics, and daily markets through the Noida Extension belt around you",
      "Pari Chowk and Greater Noida office–college belt within a short drive for work and study runs",
    ],
    features: [
      "Built by Sobha, known for fit and finish",
      "Homes from about 1,300 sq ft (2 BHK) up to larger 3 and 4 BHK options",
    ],
    projectCtaLine:
      "We help you read the actual price list, what each floor costs, and the full amount you pay before booking, in simple terms.",
  },
  {
    href: "/properties-in-greater-noida/kviraaj-mayfair-residency",
    name: "Kviraaj Mayfair Residency",
    subtitle: "3 BHK · Techzone 4",
    heroImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/kviraj-mayfair-residency/images/kviraj-mayfair-residency_1773778572489_mayfair-5.png",
    carouselCta: "Talk to us for Mayfair",
    reraId: "UPRERAPRJ852",
    priceRange: [
      "~₹8,500/sq ft ballpark (BSP); 3 BHK ~1,212–1,490 sq ft; often ₹1–1.3 Cr before parking and taxes",
    ],
    nearbyBullets: [
      "Close to Techzone 4 office and retail pockets many people already commute from",
      "Pari Chowk side for bigger hospitals, malls, and weekend outings",
      "Best check: drive from your real office pin at rush hour before you book",
    ],
    features: [
      "Focused on 3 BHK for everyday family living",
      "Easy to compare with other Techzone 4 projects on the same trip",
    ],
    projectCtaLine:
      "If Mayfair is on your mind, we fetch the latest price and availability and explain how it stacks up to neighbours you are already considering.",
  },
  {
    href: "/properties-in-greater-noida/eternia-residences",
    name: "Eternia Residences",
    subtitle: "3 & 4 BHK · Techzone 4",
    heroImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/eternia-residences/eternia-residences_hero.avif",
    carouselCta: "Check live inventory",
    reraId: "UPRERAAGT10206",
    priceRange: ["3 and 4 BHK from about ₹1.97 Cr upward", "Sizes roughly 1,932–2,625 sq ft"],
    nearbyBullets: [
      "Green-belt facing stacks in parts, so calmer views than pure road-facing towers",
      "Gaur City–style high-street retail and food a short drive for daily needs",
      "Link roads toward Noida and Pari Chowk; test your office route at peak hours once",
    ],
    features: [
      "Large 3 and 4 BHK sizes for families who want space",
      "Green-facing units are a key selling point",
    ],
    projectCtaLine:
      "We walk you through what makes Eternia different from smaller 3 BHK nearby, in size and total cost.",
  },
  {
    href: "/properties-in-greater-noida/rg-pleiaddes",
    name: "RG Pleiaddes",
    subtitle: "3 & 4 BHK · Sector 1 · Greater Noida West · RG Group",
    heroImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/rg-pleiaddes/rg-pleiaddes_hero.avif",
    carouselCta: "Open RG Pleiaddes",
    reraId: "UPRERAPRJ415309",
    priceRange: [
      "~₹8,584/sq ft base selling price (BSP); floor, parking, and taxes are extra",
      "3 and 4 BHK; sizes on the listing page",
    ],
    nearbyBullets: [
      "Sector 1 on the Greater Noida West grid with Noida–Greater Noida link roads for daily commutes",
      "Retail strips and society markets nearby for groceries, chemists, and services",
      "School buses and cabs already use this belt; easier directions for guests",
    ],
    features: [
      "RG Group new launch: six towers on about 8 acres with roughly 70% open and green spaces",
      "Club-style amenities—pools, sports, and common facilities in the current brochure",
    ],
    projectCtaLine:
      "If Sector 1 is on your list, we line up Pleiaddes against Sobha Rivana and other peers on RERA, BSP, and total ticket before you shortlist.",
  },
  {
    href: "/properties-in-greater-noida/crc-joyous",
    name: "CRC Joyous",
    subtitle: "3 BHK · Greater Noida West",
    heroImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/crc-joyous/crc-joyous_hero_1773349307870.png",
    carouselCta: "See floor options",
    reraId: "UPRERAPRJ613747",
    priceRange: [
      "3 BHK usually ₹1 Cr+ depending on tower and floor",
      "We share current pricing for your tower and stack when you shortlist",
    ],
    nearbyBullets: [
      "Schools, tuition, and clinics usually within 10–15 minutes in a lived-in grid",
      "Local markets, chemists, and small malls for everyday shopping",
      "If you work toward Sector 62 or Film City, clock real drive time twice before you book",
    ],
    features: [
      "3 BHK layouts suited to families who plan to live in the flat day to day",
      "A middle path between very cheap towers and ultra-luxury pricing",
    ],
    projectCtaLine:
      "Tell us your budget band; we show how CRC fits and what you actually get inside the flat.",
  },
  {
    href: "/properties-in-greater-noida/renox-thrive",
    name: "Renox Thrive",
    subtitle: "3 & 4 BHK · Sector 10",
    heroImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/renox-thrive/renox-thrive_hero.avif",
    carouselCta: "Compare towers",
    reraId: "UPRERAPRJ742692",
    priceRange: ["3 and 4 BHK from about ₹1.42 Cr upward", "Ask us for the live offer on the stack you prefer"],
    nearbyBullets: [
      "Approach roads join the wider Greater Noida West network toward Noida",
      "Local shops, schools, and clinics in the sector mesh without long daily treks",
      "Slightly lighter frontage than the busiest Techzone strips at peak hours",
    ],
    features: [
      "Smaller community feel compared with giant townships",
      "Layouts focused on daily comfort",
    ],
    projectCtaLine:
      "We help you see if Renox matches your commute and budget before you spend time on site visits elsewhere.",
  },
  {
    href: "/properties-in-greater-noida/vvip",
    name: "VVIP Sector 12",
    subtitle: "3 & 4 BHK",
    heroImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/vvip/vvip_hero.avif",
    carouselCta: "View clubhouse stack",
    reraId: "UPRERAPRJ743225",
    priceRange: ["3 and 4 BHK from about ₹2.40 Cr", "Premium segment"],
    nearbyBullets: [
      "Main internal roads of Greater Noida West that cabs and school buses already use",
      "Hospitals and schools dotted in neighbouring sectors for family routines",
      "Very large in-house club, so pool, sports, and weekends need fewer drives out",
    ],
    features: [
      "Very large clubhouse and lifestyle facilities",
      "3 and 4 BHK for buyers who prioritise amenities",
    ],
    projectCtaLine:
      "If you like big-club projects, we break down VVIP’s full cost so there are no surprises after you like the sample flat.",
  },
  {
    href: "/properties-in-greater-noida/irish-platinum",
    name: "Irish Platinum",
    subtitle: "3 & 4 BHK · Sector 51",
    heroImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/irish-platium/irish-platium_hero.avif",
    carouselCta: "Near-possession walkthrough",
    reraId: "UPRERAPRJ503189",
    priceRange: [
      "3 and 4 BHK, about 1,390–2,550 sq ft (typical configuration range)",
      "Near-possession deals (ask us for today's offer)",
    ],
    nearbyBullets: [
      "Sector roads are more built-out, so maps and cab drops are easier for guests",
      "Schools, temples, and clinics in adjacent sectors for daily family rhythm",
      "Earlier keys mean you plan metro, school, and furniture without a multi-year wait",
    ],
    features: [
      "Higher ceilings and more balconies than typical flats",
      "Good if you do not want to wait many years for keys",
    ],
    projectCtaLine:
      "We clarify what near-possession means for payment, loan, and moving dates so you can decide calmly.",
  },
];

export const threeBhkGreaterNoidaWestFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What is the average price of 3 bhk flats in Greater Noida West in 2026?",
    answer:
      "In early 2026, most active 3 BHK Apartments in Greater Noida West clusters around the mid-₹8,000s per sq ft range before floor, PLC, parking, and extras. Use that band to shortlist towers you like, then lock the all-in on the exact unit you want.",
  },
  {
    question: "Which sectors are best for 3 BHK flats in Greater Noida?",
    answer:
      "Sector 1, Techzone 4, Sector 10–12 belts, and Sector 51 are frequent shortlist anchors. Match sector to your office commute, schools, and hold period.",
  },
  {
    question: "Is Greater Noida West a good investment for a 3 BHK in 2026?",
    answer:
      "It can work if you buy RERA-clean inventory, a credible builder, and a route that survives weekday traffic tests. Jewar and metro help sentiment; delivery quality decides returns.",
  },
  {
    question: "Is Noida Extension the same area as Greater Noida West?",
    answer:
      "Yes. Buyers and brokers use both names for the same development belt west of core Noida.",
  },
  {
    question: "Should I buy a 3 BHK or 2 BHK in Greater Noida West?",
    answer:
      "Buy 2 BHK if EMI and stamp duty are tight. Buy 3 BHK if you need space, rental depth, or a longer family hold. 3 BHK flats in Greater Noida often win on room-per-rupee versus central Noida.",
  },
  {
    question: "How did 3 BHK prices move from 2022 to 2026 in Greater Noida West?",
    answer:
      "After 2022 the market separated serious launches from the rest. Quality towers in Noida Extension have generally moved up on a multi-year view. What you earn next still tracks builder delivery and how easy it is to rent or resell in your sector.",
  },
];

function ConversionStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[#CBB27A]/40 bg-gradient-to-r from-[#0f1112] to-[#1a1d1f] px-4 py-5 md:px-6 md:py-6 ${className}`}
    >
      <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#CBB27A] mb-4">
        Next step
      </p>
      <div className="mx-auto flex max-w-md flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
        <Link
          href={CONSULT}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#CBB27A] px-5 py-3 text-sm font-semibold text-[#0f1112] shadow-md shadow-black/20 transition hover:bg-[#d4c48a] hover:shadow-lg sm:min-h-[48px] sm:py-3.5"
        >
          <CalendarClock className="size-4 shrink-0" aria-hidden />
          Book a free consultation
        </Link>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-[1px] transition hover:border-[#CBB27A]/50 hover:bg-white/15 sm:min-h-[48px] sm:py-3.5"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          Request callback
        </a>
      </div>
    </div>
  );
}

export function ThreeBhkFlatsGreaterNoida2026Content() {
  return (
    <div className="blog-article font-poppins">
      <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-8 font-medium">
        You are not here to read a story. You want <strong>3bhk flats in greater noida</strong> with a ticket you
        can explain, a sector that survives your commute, and a builder who can deliver. This page maps price reality,
        top projects, location trade-offs.
      </p>

      <section className="mb-14 scroll-mt-24" id="top-3bhk-flats" aria-labelledby="top-flats-heading">
        <h2 id="top-flats-heading" className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Top 3 BHK Flats in Greater Noida
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
          Compare pricing, location, and availability across the most in-demand projects before booking your site visit.
        </p>
        <ThreeBhkDetailCardsCarousel cards={GN_3BHK_PROPERTY_BLOCKS} />
      </section>

      <section className="mb-10 scroll-mt-24" id="quick-snapshot" aria-labelledby="quick-snapshot-heading">
        <h2 id="quick-snapshot-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Quick snapshot: 3 BHK apartments in Greater Noida (2026)
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
          <div className="rounded-xl border-l-[2px] border-[#C5A059] bg-white px-8 py-10 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md md:col-span-2 md:py-12 font-sans">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#C5A059]">
              Average price
            </h3>
            <p className="text-sm leading-[1.65] text-[#2a2a2a] md:text-base">
              In early 2026, most active 3 BHK towers sit near a mid-₹8,000s per sq ft working range for Greater Noida West.
              Your all-in still shifts with floor, facing, PLC, and parking on the unit you pick.
            </p>
          </div>
          <div className="flex h-full min-h-0 flex-col justify-center rounded-xl border-l-[2px] border-[#C5A059] bg-white px-7 py-8 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md font-sans md:min-h-[13.5rem] md:px-8 md:py-10">
            <h3 className="mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
              Best sectors
            </h3>
            <p className="text-xs font-normal leading-[1.7] text-[#4a4a4a] md:text-[0.8125rem]">
              <strong className="font-semibold text-[#2f2f2f]">Sector 1, Techzone 4, Sector 10–12, and Sector 51</strong> lead
              most 3 BHK shortlists.{" "}
              <strong className="font-semibold text-[#2f2f2f]">Sector 150</strong> (Greater Noida authority side) is a parallel
              compare for greener planning.
            </p>
          </div>
          <div className="flex h-full min-h-0 flex-col justify-center rounded-xl border-l-[2px] border-[#C5A059] bg-white px-7 py-8 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md font-sans md:min-h-[13.5rem] md:px-8 md:py-10">
            <h3 className="mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
              Investment potential
            </h3>
            <p className="text-xs font-normal leading-[1.7] text-[#4a4a4a] md:text-[0.8125rem]">
              <strong className="font-semibold text-[#2f2f2f]">Jewar and metro</strong> add tailwinds, but long-term outcomes
              still follow builder trust and how deep your sector is for renters and resale. Plan a{" "}
              <strong className="font-semibold text-[#2f2f2f]">5–10 year hold</strong> for investment plays; end-use buyers can
              move faster if the fit is right.
            </p>
          </div>
          <div className="rounded-xl border-l-[2px] border-[#C5A059] bg-white p-8 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md md:col-span-2 font-sans">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#C5A059]">
              Possession types
            </h3>
            <p className="text-sm leading-[1.6] text-[#2a2a2a] md:text-base">
              Mix of under-construction (more flexible payment schedules), near-possession (faster keys, tighter pricing),
              and select ready inventory (quicker rent-out, higher ticket). Choose the lane that matches your EMI comfort
              and how soon you need to move in.
            </p>
          </div>
        </div>
      </section>

      <figure className="mb-14 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg">
        <div className="relative aspect-[4/3] w-full md:aspect-[5/4]">
          <Image
            src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/metro_or_night_view.webp"
            alt="Metro and Greater Noida area at night—connectivity across the NCR belt"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
      </figure>

      <section className="mb-14 scroll-mt-24" id="best-locations-3bhk" aria-labelledby="locations-heading">
        <h2 id="locations-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Best locations for 3 BHK flats in Greater Noida
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          Match each belt to how you commute and where your family spends the week. If you want 3 bhk flats in greater noida with office access to
          Noida and Delhi, test each sector at rush hour before you pay a token.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Techzone 4 and Sector 1 (Greater Noida West)</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Highest project depth for 3 BHK in Greater Noida West—more choice so you can compare layouts, amenities, and
              tickets side by side. Shortlist builders with execution you can underwrite and possession that fits your plan.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sector 10–12 belt</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Balanced visibility and connectivity toward Pari Chowk and Knowledge Park. Good for buyers who want a
              recognisable pin without paying Sector 150 premiums.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sector 51</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Near-possession and special-rate stories show up here often. Strong if you want faster equity and lower
              construction risk on a 3 bhk flat for sale in greater noida.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sector 150 (Greater Noida authority)</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Greener, sports-city-style planning. Weigh total ticket and commute against Extension towers that sit closer
              to everyday Noida runs. For Noida core vs Greater Noida West trade-offs, see{" "}
              <Link href="/blog/noida-vs-greater-noida-investment-2026" className="text-[#CBB27A] font-semibold hover:underline">
                Noida vs Greater Noida investment (2026)
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <figure className="mb-14 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg">
        <div className="relative aspect-[4/3] w-full md:aspect-[5/4]">
          <Image
            src={SOBHA_RIVANA_HERO_IMAGE}
            alt="Premium residential tower elevation in Greater Noida West"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
      </figure>

      <section className="mb-14 scroll-mt-24" id="price-trends-2022-2026" aria-labelledby="price-trends-heading">
        <h2 id="price-trends-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Price trends of 3 BHK flats in Greater Noida (2022–2026)
        </h2>
        <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
          <p>
            From 2022 through 2026, Greater Noida West tilted toward cleaner launches and buyers who underwrite delivery,
            not just brochure promises. Rental depth and builder track record mattered more than ever.
          </p>
          <p>
            Forward pricing for 3 BHK here is not a single chart line—it splits by tower quality, possession stage, and how
            tight resale and rentals are in that micro-pin.
          </p>
          <p>
            Jewar airport and metro lines support the story, but outcomes still come from picking the right inventory at
            the right all-in number. Read the{" "}
            <Link href="/blog/jewar-airport-ncr-property-buyers-2026" className="text-[#CBB27A] font-semibold hover:underline">
              Jewar airport buyer guide
            </Link>{" "}
            for corridor context. When you are ready to lock a quote, use{" "}
            <Link href={CONSULT} className="text-[#CBB27A] font-semibold hover:underline">
              advisory
            </Link>{" "}
            for a second pass on numbers.
          </p>
        </div>
      </section>

      <section className="mb-14 scroll-mt-24" id="3bhk-vs-2bhk" aria-labelledby="compare-heading">
        <h2 id="compare-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          2 BHK vs 3 BHK in Greater Noida
        </h2>
        <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
          Use this when your EMI allows both. 3 BHK flats in Greater Noida West usually win on room-per-rupee versus
          older Noida sectors, but stamp duty and maintenance scale up.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-semibold">Factor</th>
                <th className="px-4 py-3 font-semibold">2 BHK</th>
                <th className="px-4 py-3 font-semibold">3 BHK</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">Cash outflow</td>
                <td className="px-4 py-3">Lower EMI and stamp duty</td>
                <td className="px-4 py-3">Higher ticket, more space per rupee vs many Noida pockets</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <td className="px-4 py-3 font-medium">Tenant profile</td>
                <td className="px-4 py-3">Singles, young couples</td>
                <td className="px-4 py-3">Families, work-from-home setups</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">When to choose</td>
                <td className="px-4 py-3">Tight budget, first home</td>
                <td className="px-4 py-3">Upgrade, rental yield plan, 7+ year hold</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14 scroll-mt-24" id="mistakes">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Mistakes that kill deals in Noida Extension
        </h2>
        <ul className="space-y-2 pl-5 list-disc text-gray-700 text-sm md:text-base leading-relaxed">
          <li>Buying only for Jewar distance without a rush-hour commute test.</li>
          <li>Ignoring UP RERA complaint history and payment-milestone risk.</li>
          <li>Comparing BSP across towers without parking, PLC, and tax load.</li>
          <li>Treating online averages as your final offer price.</li>
        </ul>
      </section>

      <ConversionStrip className="mb-12" />

      <section className="mb-14 scroll-mt-24" id="faqs" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          FAQs
        </h2>
        <p className="text-sm text-gray-600 mb-4">Tap a question to expand the answer.</p>
        <ThreeBhkGreaterNoidaFaqAccordion items={threeBhkGreaterNoidaWestFaqSchemaItems} />
      </section>

      <section
        className="mt-10 rounded-2xl border border-[#CBB27A]/30 bg-gradient-to-br from-[#CBB27A]/12 via-background to-background p-8 md:p-10"
        aria-labelledby="ready-forward-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 id="ready-forward-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 font-poppins">
            Ready to Move Forward?
          </h2>
          <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
            Share your budget, preferred locations, and timeline. Get a curated shortlist of high-potential 3 BHK flats in
            Greater Noida and a clear plan for site visits.
          </p>
          <Link
            href={CONSULT}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#CBB27A] px-8 py-3.5 text-sm font-semibold text-[#0f1112] shadow-md shadow-[#CBB27A]/25 transition hover:bg-[#d4c48a] hover:shadow-lg min-w-[220px]"
          >
            <CalendarClock className="size-4 shrink-0" aria-hidden />
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
