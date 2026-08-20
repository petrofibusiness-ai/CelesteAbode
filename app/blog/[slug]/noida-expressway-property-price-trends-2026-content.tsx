import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_NOIDA = "/properties-in-noida";
const FLATS_NOIDA = "/flats-for-sale-in-noida";
const PROPERTIES_GN = "/properties-in-greater-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const ACE_SECTOR_150 = "/properties-in-noida/ace-sector-150-noida";
const TRUMP_TOWERS_NOIDA = "/properties-in-noida/trump-towers-noida";
const IVORY_COUNTY = "/properties-in-noida/ivory-county";
const SMART_WORLD_ELIE_SAAB = "/properties-in-noida/smart-world-elie-saab-residencies";
const SMART_WORLD_LE_COURTYARD = "/properties-in-noida/smart-world-le-courtyard";
const JACOB_AND_CO = "/properties-in-noida/jacob-and-co";

const PRICE_MAP_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Noida%20Expressway%20Property%20Price%20Trends/Noida%20Expressway%20Property%20Price%20Trends_2.webp";

const BELT_COMPARE_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Noida%20Expressway%20Property%20Price%20Trends/Noida%20Expressway%20Property%20Price%20Trends_3.webp";

const BUYER_CHECK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Noida%20Expressway%20Property%20Price%20Trends/Noida%20Expressway%20Property%20Price%20Trends_4.webp";

const PRICE_ROWS: { belt: string; workingBand: string; whatItMeans: string }[] = [
  {
    belt: "Sector 150 (premium Expressway)",
    workingBand: "₹10,000 to ₹14,500/sq ft; sector averages often near ₹12,000 to ₹12,500",
    whatItMeans: "Low-density luxury. Airport and lifestyle story partly priced in. Compare all-in, not base rate.",
  },
  {
    belt: "Sector 137 and mid Expressway grids",
    workingBand: "Around ₹10,000 to ₹11,000/sq ft on many portal averages; project spread is wider",
    whatItMeans: "End-user depth and office access matter more than airport slides. Yield often stronger than ultra-premium.",
  },
  {
    belt: "Sectors 75 / 78 style mid-segment",
    workingBand: "Often ₹7,500 to ₹11,000/sq ft depending on tower and possession",
    whatItMeans: "Lower entry. Resale needs real end-user demand, not corridor hype alone.",
  },
  {
    belt: "Noida Expressway corridor (blended)",
    workingBand: "Portal corridor averages near ₹12,000 to ₹13,000/sq ft in mid-2026",
    whatItMeans: "Averages hide outliers. Ultra-premium pins and mid belts sit on different curves.",
  },
];

export const noidaExpresswayPriceTrendsFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What is the average property price on Noida Expressway in 2026?",
    answer:
      "Working portal averages for the Noida Expressway belt sit near ₹12,000 to ₹13,000 per sq ft in mid-2026. Sector 150 often trades around ₹10,000 to ₹14,500 per sq ft, with many averages near ₹12,000 to ₹12,500. Sector 137 commonly sits near ₹10,500. Exact tickets move with project, floor, possession stage, and all-in extras. Lock the unit number, not the corridor average.",
  },
  {
    question: "Have Noida Expressway property prices already peaked after Jewar Airport?",
    answer:
      "Part of the airport story is already in Expressway rate cards, especially in premium belts. That does not mean every launch peaked. Prices hold where delivery, end-user absorption, and commute quality stay strong. Weak files can stall even when the corridor headline is hot. Buy the project file, not the press release.",
  },
  {
    question: "Which Noida Expressway sectors show the strongest price trends?",
    answer:
      "Sector 150 leads the premium curve on low-density planning and Expressway access. Sector 137 balances ticket size with end-user and office demand. Mid-segment sectors such as 75 and 78 offer lower entry with a different resale path. Match sector to budget and hold period before you chase a five-year appreciation chart.",
  },
  {
    question: "What should buyers verify beyond the price per sq ft?",
    answer:
      "All-in cost including floor rise, PLC, parking, and stamp duty. UP RERA on the official portal. Builder delivery on completed phases. Carpet efficiency. A peak-hour drive on the Expressway. Portal averages miss those checks. Two projects at the same base rate can be very different tickets.",
  },
  {
    question: "Can Celeste Abode help me read Noida Expressway price trends before I buy?",
    answer:
      "Yes. We work buyer-side across Noida and Delhi NCR. That means shortlists with reasons, all-in ticket clarity against current Expressway bands, and site visits on projects that pass your checklist. We compare Expressway stacks against Greater Noida and Yamuna options when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function NoidaExpresswayPriceTrendsCtaPair({
  direction = "column",
  hero = false,
}: {
  direction?: "row" | "column";
  hero?: boolean;
}) {
  const linkShared =
    "col-start-1 row-start-1 flex w-full items-center justify-center whitespace-nowrap rounded-xl px-5 py-2.5 text-center text-sm font-medium";

  const renderCell = (href: string, label: string, variant: "primary" | "secondary") => (
    <div className="grid justify-items-stretch">
      {CTA_SIZER_LABELS.map((sizerLabel) => (
        <span key={sizerLabel} className={CTA_SIZER} aria-hidden>
          {sizerLabel}
        </span>
      ))}
      <Link
        href={href}
        className={
          variant === "primary"
            ? `${linkShared} bg-[#CBB27A] text-[#0f1112] transition hover:bg-[#d4c48a] ${hero ? "font-poppins" : ""}`
            : `${linkShared} border border-white/30 bg-white/10 text-white transition hover:bg-white/15 ${hero ? "font-poppins backdrop-blur-sm" : ""}`
        }
      >
        {label}
      </Link>
    </div>
  );

  return (
    <div
      className={
        direction === "row"
          ? "grid w-max max-w-full grid-cols-1 gap-3 sm:grid-cols-2"
          : "grid w-max max-w-full grid-cols-1 gap-3"
      }
    >
      {renderCell(PROPERTIES_NOIDA, "Properties in Noida", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function NoidaExpresswayPropertyPriceTrends2026Content() {
  return (
    <div className="blog-article font-poppins">
      <nav
        className="mb-12 rounded-2xl border border-gray-100 bg-gray-50/90 p-6"
        aria-label="Article contents"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#CBB27A]">On this page</p>
        <ol className="space-y-2.5 text-sm text-gray-700">
          <li>
            <a href="#lead" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Introduction
            </a>
          </li>
          <li>
            <a href="#working-bands" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Working price bands in mid-2026
            </a>
          </li>
          <li>
            <a href="#what-moved" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What moved prices on the Expressway
            </a>
          </li>
          <li>
            <a href="#belt-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Belt-wise price map for buyers
            </a>
          </li>
          <li>
            <a href="#how-to-read" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How to read a rate card without getting trapped
            </a>
          </li>
          <li>
            <a href="#before-buy" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What to verify before you book
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How Celeste Abode helps
            </a>
          </li>
          <li>
            <a href="#faq" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Questions buyers ask us
            </a>
          </li>
        </ol>
      </nav>

      <header className="mb-12 scroll-mt-24" id="lead">
        <p className="text-lg leading-[1.75] text-gray-700 md:text-xl">
          Portal averages on the Noida Expressway sit near ₹12,000 to ₹13,000 per sq ft in mid-2026. That number is a
          starting point, not a buy signal. Sector 150, Sector 137, and mid-segment Expressway grids trade on different
          curves. If you are shortlisting{" "}
          <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
            property in Noida
          </Link>{" "}
          along the Expressway, read the band for your belt, then stress-test the all-in ticket on the unit you are
          offered.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Price trends tell you where the market moved. Your project file tells you whether that move still holds for
          you.
        </blockquote>
      </header>

      <section id="working-bands" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Working price bands in mid-2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Treat these as working bands from portal and market trackers in 2026, not a guarantee on your stack. Sector
            150 often sits between ₹10,000 and ₹14,500 per sq ft, with many averages near ₹12,000 to ₹12,500. Ready
            luxury and strong brands lean higher. Under-construction tickets can sit lower before floor rise and extras.
          </p>
          <p>
            Sector 137 commonly averages near ₹10,500 per sq ft on recent portal prints, with rental yields often near
            the low-to-mid 3% range where end users are active. Mid-segment Expressway sectors such as 75 and 78 still
            offer lower entry than the Sector 150 premium lane. Corridor-wide averages near ₹12,650 per sq ft hide that
            split. Browse{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            by sector before you trust a single Expressway headline rate.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={PRICE_MAP_VISUAL}
            alt="Noida Expressway interchange at sunset with residential towers under construction along the price corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          One Expressway. Several price curves. Sector and project quality still set the ticket you keep.
        </figcaption>
      </figure>

      <section id="what-moved" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What moved prices on the Expressway
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Three forces show up in almost every buyer call we take. Ignore any one and the chart stops explaining the
          offer in front of you.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. End-user demand on a usable commute</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Families who drive Noida to Gurugram or Delhi still buy Expressway flats for the road, not the brochure.
            Where societies fill with residents, resale holds. Where inventory sits with only investor decks, tickets
            soften even when corridor averages look firm. That is why mid belts with office access can hold better than
            a thin premium pin with no occupancy.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Airport story, partly priced in</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Noida International Airport at Jewar is live. Expressway launches already sell proximity. Premium belts
            such as Sector 150 absorbed part of that narrative early. Further price lift now depends more on delivery
            and end-user depth than on another airport announcement. Compare{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway
            </Link>{" "}
            tickets only if your brief is a longer airport hold, not a same-day Expressway lifestyle buy.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Limited premium supply and brand depth</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Low-density planning and branded stacks keep Sector 150 and nearby Expressway premium names firm when the
            product delivers. Active names buyers shortlist include{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150 Noida
            </Link>
            ,{" "}
            <Link href={TRUMP_TOWERS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              Trump Towers Noida
            </Link>
            ,{" "}
            <Link href={IVORY_COUNTY} className="font-medium text-[#CBB27A] hover:underline">
              Ivory County
            </Link>
            ,{" "}
            <Link href={SMART_WORLD_ELIE_SAAB} className="font-medium text-[#CBB27A] hover:underline">
              Smart World Elie Saab Residencies
            </Link>
            , and{" "}
            <Link href={JACOB_AND_CO} className="font-medium text-[#CBB27A] hover:underline">
              M3M Jacob & Co
            </Link>
            . Brand does not replace RERA checks. It does explain why two towers on the same road can sit ₹2,000 per sq
            ft apart.
          </p>
        </article>
      </section>

      <section id="belt-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Belt-wise price map for buyers
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this when a sales deck shows one Expressway average and calls it your market. It is not.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Belt</th>
                <th className="px-4 py-3 font-medium">Working 2026 band</th>
                <th className="px-4 py-3 font-medium">What buyers should take from it</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {PRICE_ROWS.map((row, i) => (
                <tr
                  key={row.belt}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.belt}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.workingBand}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.whatItMeans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Bands are working mid-2026 ranges from public portal and market trackers. They move with listing mix,
          possession stage, and project quality. Always reconfirm on the unit file before you token.
        </p>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BELT_COMPARE_VISUAL}
            alt="Noida Expressway at dusk with residential towers, construction crane, and overpass along the price corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Premium Expressway stacks and mid belts do not share one appreciation path.
        </figcaption>
      </figure>

      <section id="how-to-read" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How to read a rate card without getting trapped
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Base rate is the marketing number. All-in is the money number. Add floor rise, PLC, parking, club deposit,
            and stamp duty before you compare two projects. A ₹11,000 base with thin carpet can cost more per liveable
            foot than a ₹12,000 base with better efficiency. Ask for the payment plan in writing.
          </p>
          <p>
            Sector 150 has seen strong multi-year appreciation on many trackers, often well above 100% over five years
            on apartment averages. That history does not mean the next five years copy the last five. Part of the
            airport and lifestyle premium is already in the ticket. Names like{" "}
            <Link href={SMART_WORLD_LE_COURTYARD} className="font-medium text-[#CBB27A] hover:underline">
              Smart World Le Courtyard
            </Link>{" "}
            still need the same all-in math as any other Expressway stack. If your budget needs a softer entry, compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            on the same spreadsheet, not on hope.
          </p>
        </div>
      </section>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you buy on current Expressway prices
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            UP RERA on the official portal. Builder track record on delivered phases. All-in ticket on the exact unit.
            A peak-hour drive on the Expressway. Two comparable offers in the same belt. If the price only looks cheap
            against a corridor average and fails those checks, walk.
          </p>
          <p>
            Start with live{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            on the Expressway side. Cross-check{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            if your ticket needs a different exit curve.{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              Book a free consultation
            </Link>{" "}
            if you want current price bands stress-tested against the stack you are actually being shown.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_CHECK_VISUAL}
            alt="Noida Expressway at sunset with villas, high-rise towers, and lit highway along the property price corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Run the all-in ticket and the commute before you treat a portal average as your floor.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy on Expressway price trends
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Charts do not close deals. Clean files do. Celeste Abode works buyer-side as a real estate consultant in
            Noida and across Delhi NCR. We map your budget to current Expressway bands, compare two or three stacks on
            all-in cost, and flag delivery or paperwork gaps before you token. You keep the final call; we remove the
            guesswork from which site visits are worth your Saturday.
          </p>
          <p>
            That usually means a short discovery call, a written shortlist with why each name is on it, and visits only
            where the price still makes sense after basic checks. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if Noida Expressway price trends are on your list and you want them tested against live{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            before you pay a booking amount.
          </p>
        </div>

        <div
          id="next-step"
          className="scroll-mt-24 mt-8 overflow-hidden rounded-2xl border border-[#CBB27A]/35 bg-gradient-to-b from-[#0f1112] via-[#12151a] to-[#0c0e10] shadow-lg"
        >
          <div className="flex items-start gap-3 border-b border-[#CBB27A]/25 bg-[#CBB27A]/12 px-4 py-4 sm:px-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f1112] ring-1 ring-[#CBB27A]/40">
              <Building2 className="size-5 text-[#CBB27A]" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#CBB27A]">Ready to shortlist?</p>
              <p className="mt-1 text-sm leading-snug text-white/70">
                Compare Expressway tickets against current bands, then book visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <NoidaExpresswayPriceTrendsCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={noidaExpresswayPriceTrendsFaqSchemaItems} />
      </section>
    </div>
  );
}
