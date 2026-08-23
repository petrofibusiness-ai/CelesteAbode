import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const PROPERTIES_GN = "/properties-in-greater-noida";
const PROPERTIES_NOIDA = "/properties-in-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const FLATS_NOIDA = "/flats-for-sale-in-noida";

const ACE_VERDE = "/properties-in-yamuna-expressway/ace-verde-sector-22a-yamuna-expressway";
const ACE_TERRA = "/properties-in-yamuna-expressway/ace-terra-sector-22d-yeida";
const ELITE_X = "/properties-in-yamuna-expressway/elite-x";
const GAUR_CHRYSALIS = "/properties-in-yamuna-expressway/gaur-chrysalis-sector-22d-yeida";
const ELDECO_WHISPERS = "/properties-in-yamuna-expressway/eldeco-whispers-of-wonder-sector-22d-yeida";
const PURVANCHAL_SUNBLISS = "/properties-in-yamuna-expressway/purvanchal-sunbliss-sector-22d-yeida";
const PROVINCE_OLYMPIA = "/properties-in-yamuna-expressway/province-d-olympia-sector-22d-yamuna-expressway";
const AURUM_ALUMNI = "/properties-in-yamuna-expressway/aurum-alumni-bliss-sector-22d-yamuna-expressway";
const VVIP_YAMUNA = "/properties-in-yamuna-expressway/vvip-yamuna";
const GODREJ_MAJESTY = "/properties-in-greater-noida/godrej-majesty";
const SOBHA_RIVANA = "/properties-in-greater-noida/sobha-rivana";

const AIRPORT_CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway_1.webp";

const DEMAND_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway_4.webp";

const BUYER_CHECK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway_3.webp";

const IMPACT_ROWS: { channel: string; whatChanged: string; buyerTakeaway: string }[] = [
  {
    channel: "Price path (2020 to 2025)",
    whatChanged: "Corridor apartment averages nearly tripled on several market reports; plots rose sharply in hotspots",
    buyerTakeaway: "Much of the anticipation premium is already in the ticket. Buy the file, not the old chart.",
  },
  {
    channel: "Post-operations phase (2026)",
    whatChanged: "Commercial flights live; queries and launches concentrate on airport-proximate YEIDA sectors",
    buyerTakeaway: "Demand is shifting from wait-and-watch to end-user and hold-period buying.",
  },
  {
    channel: "Near-term outlook (working)",
    whatChanged: "Consultants project further apartment and plot upside into 2027, often in the low-to-mid 20% range",
    buyerTakeaway: "Upside is not automatic. Delivery, RERA, and commute still decide who keeps the gain.",
  },
  {
    channel: "Micro-markets feeling it first",
    whatChanged: "Sector 22D and 22A carry launch density and airport drive times buyers actually use",
    buyerTakeaway: "Compare stacks inside the hot belt. A sector average can hide a weak possession path.",
  },
];

export const jewarBoostingYamunaExpresswayFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "How is Noida International Airport boosting property on Yamuna Expressway?",
    answer:
      "The airport turned a long anticipation story into a drivable fact. Commercial operations pull staff, vendors, and investors onto the Yamuna Expressway. Housing demand rises where sectors sit close to Jewar and still have project choice. Prices already moved hard from 2020 to 2025. The next phase depends more on delivery and end-user absorption than on another announcement.",
  },
  {
    question: "Have Yamuna Expressway property prices already peaked after Jewar opened?",
    answer:
      "Part of the airport premium is already priced in. Corridor apartment averages nearly tripled over five years on major reports before flights began. That does not mean every stack peaked. Weak files can stall. Strong delivery with real occupancy can still hold value. Lock the all-in ticket and possession path before you treat the corridor chart as your floor.",
  },
  {
    question: "Which Yamuna Expressway sectors benefit most from the airport?",
    answer:
      "Sector 22D is the densest launch belt with short airport drive times. Sector 22A suits premium low-density buyers. Airport-adjacent names outside those clusters can work on a longer hold. Match sector to ticket and timeline. Do not buy a pin only because a brochure says Jewar.",
  },
  {
    question: "What should I verify before I buy on the Jewar story?",
    answer:
      "UP RERA on the official portal. Builder track record on delivered phases. All-in cost on your unit. A peak-hour drive to the airport and to your workplace. Two comparable offers in the same belt. If two of those fail, pause even when the airport headline sounds perfect.",
  },
  {
    question: "Can Celeste Abode help with Yamuna Expressway property after Jewar?",
    answer:
      "Yes. We work buyer-side across Yamuna Expressway, Greater Noida, and Noida. That means shortlists with reasons, all-in ticket clarity against current corridor bands, and site visits on projects that pass your checklist. We compare Yamuna stacks against other NCR belts when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Yamuna Expressway properties", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function JewarBoostingYamunaExpresswayCtaPair({
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
      {renderCell(PROPERTIES_YE, "Yamuna Expressway properties", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function JewarBoostingYamunaExpresswayPropertyContent() {
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
            <a href="#what-changed" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What changed once Jewar went live
            </a>
          </li>
          <li>
            <a href="#how-boost-works" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How the airport boosts Yamuna property
            </a>
          </li>
          <li>
            <a href="#impact-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Impact map for buyers
            </a>
          </li>
          <li>
            <a href="#where-to-look" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Where the boost shows up first
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
          Noida International Airport at Jewar is no longer a brochure line. Commercial flights are live. That shift is
          why{" "}
          <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
            property on Yamuna Expressway
          </Link>{" "}
          moved from wait-and-watch to active shortlists. The boost is real. It is not even. Much of the anticipation
          premium already hit corridor averages between 2020 and 2025. Your job in 2026 is to find the stacks that still
          earn the next phase of demand.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The airport sells the corridor. Your sector and project file still decide whether the ticket holds.
        </blockquote>
      </header>

      <section id="what-changed" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What changed once Jewar went live
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Before operations, buyers priced a promise. After inauguration and commercial flights in 2026, they price a
            drive. Staff, vendors, and investors who need airport access now have a working terminal on the Yamuna spine.
            Market reports showed corridor apartment averages nearly tripling from about ₹3,200 to around ₹9,600 per sq
            ft between 2020 and 2025, with plots rising sharply in hotspots. That climb happened largely before takeoff.
          </p>
          <p>
            Consultants now talk about a calmer second phase: further apartment and plot upside into 2027, often framed
            in the low-to-mid 20% range if infra and end-user demand keep pace. That is a working outlook, not a
            guarantee on your unit. Compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            only after you know whether your brief is airport-linked Yamuna living or a shorter possession path closer
            to mature Noida grids.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={AIRPORT_CORRIDOR_VISUAL}
            alt="Aircraft over Yamuna Expressway with high-rises under construction near Noida International Airport"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Flights, expressway, and towers rising together: the corridor story buyers now price into every ticket.
        </figcaption>
      </figure>

      <section id="how-boost-works" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How the airport boosts Yamuna property
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Three channels show up in almost every enquiry we handle after Jewar opened. Skip any one and the boost story
          falls apart on the offer in front of you.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Demand that can drive the terminal</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Airport staff, logistics vendors, and frequent flyers need homes on a road that reaches Jewar without a
            planning exercise. That pulls shortlists toward YEIDA sectors with usable expressway access. Names such as{" "}
            <Link href={VVIP_YAMUNA} className="font-medium text-[#CBB27A] hover:underline">
              VVIP Yamuna
            </Link>{" "}
            and{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>{" "}
            sit in that airport-linked lane. Run the peak-hour drive before you treat brochure kilometres as fact.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Launch density where buyers can compare</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Sector 22D carries the densest apartment choice on the corridor in 2026. Liquidity improves when end users
            have more than one society to pick. It also means weak files can hide inside a hot sector average. Active
            stacks include{" "}
            <Link href={ELITE_X} className="font-medium text-[#CBB27A] hover:underline">
              Elite X
            </Link>
            ,{" "}
            <Link href={ACE_TERRA} className="font-medium text-[#CBB27A] hover:underline">
              Ace Terra
            </Link>
            , and{" "}
            <Link href={GAUR_CHRYSALIS} className="font-medium text-[#CBB27A] hover:underline">
              Gaur Chrysalis
            </Link>
            . Compare delivery and all-in tickets across two or three, not one lobby render.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Jobs and logistics behind the runway</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            The longer boost is not only passenger traffic. Warehousing, aviation services, and planned employment nodes
            along the corridor support housing demand over a multi-year hold. That story rewards patience. It does not
            rescue a delayed phase or an inflated base rate. If your exit needs faster end-user depth, stress-test{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            on the same spreadsheet.
          </p>
        </article>
      </section>

      <section id="impact-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Impact map for buyers
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this when a sales deck says Jewar will double every ticket. The corridor already moved. Your stack still
          has to earn what comes next.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Channel</th>
                <th className="px-4 py-3 font-medium">What changed</th>
                <th className="px-4 py-3 font-medium">Buyer takeaway</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {IMPACT_ROWS.map((row, i) => (
                <tr
                  key={row.channel}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.channel}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.whatChanged}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.buyerTakeaway}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Price and outlook figures are working mid-2026 ranges from public market reports. They move with listing mix
          and micro-market. Reconfirm on the unit file before you token.
        </p>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={DEMAND_VISUAL}
            alt="Comparison of Sector 22D and 22A near the airport versus mid-corridor Yamuna Expressway pins"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Sector 22D and 22A feel the airport first. Mid-corridor pins need a longer hold and tighter due diligence.
        </figcaption>
      </figure>

      <section id="where-to-look" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Where the boost shows up first
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 22A starts with premium low-density names such as{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>
            . Sector 22D is where most launch density sits:{" "}
            <Link href={ELDECO_WHISPERS} className="font-medium text-[#CBB27A] hover:underline">
              Eldeco Whispers of Wonder
            </Link>
            ,{" "}
            <Link href={PURVANCHAL_SUNBLISS} className="font-medium text-[#CBB27A] hover:underline">
              Purvanchal Sunbliss
            </Link>
            ,{" "}
            <Link href={PROVINCE_OLYMPIA} className="font-medium text-[#CBB27A] hover:underline">
              Province D Olympia
            </Link>
            , and{" "}
            <Link href={AURUM_ALUMNI} className="font-medium text-[#CBB27A] hover:underline">
              Aurum Alumni Bliss
            </Link>
            . Working premium bands in 22D often sit near ₹9,000 to ₹11,000 per sq ft on market trackers, with project
            quality and possession stage moving the exact ticket.
          </p>
          <p>
            Some buyers still cross-check Greater Noida stacks such as{" "}
            <Link href={GODREJ_MAJESTY} className="font-medium text-[#CBB27A] hover:underline">
              Godrej Majesty
            </Link>{" "}
            or{" "}
            <Link href={SOBHA_RIVANA} className="font-medium text-[#CBB27A] hover:underline">
              Sobha Rivana
            </Link>{" "}
            when the Yamuna hold feels too long. That comparison is healthy. Browse live{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway properties
            </Link>{" "}
            and{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            on the same all-in basis before you lock a corridor.
          </p>
        </div>
      </section>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you buy on the Jewar boost
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            UP RERA on the official portal. Builder track record on delivered phases. All-in ticket on the exact unit,
            including floor rise and parking. A peak-hour drive to Jewar and to your workplace. If two of those fail,
            pause even when the airport headline sounds like free appreciation.
          </p>
          <p>
            Start with{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway properties
            </Link>
            , then compare{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            if your brief needs a more mature Expressway lifestyle sooner.{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              Book a free consultation
            </Link>{" "}
            if you want the Jewar boost stress-tested against the stack you are actually being offered.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_CHECK_VISUAL}
            alt="Noida International Airport and Yamuna Expressway at dusk with residential towers nearby"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Airport, expressway, and nearby towers: the stack that is lifting Yamuna Expressway demand in 2026.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy after Jewar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            An open airport is one layer. Celeste Abode works buyer-side as a real estate consultant across Delhi NCR.
            We compare Yamuna Expressway projects on your brief, spell out the all-in ticket against current corridor
            bands, and flag delivery or paperwork gaps before you token. You keep the final call; we remove the
            guesswork from which site visits are worth your Saturday.
          </p>
          <p>
            That usually means a short discovery call, a written shortlist with why each name is on it, and visits only
            where the stack still makes sense after basic checks. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if Noida International Airport is part of your thesis and you want it tested against live{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway property
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
                Compare Yamuna stacks against the live airport story, then book visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <JewarBoostingYamunaExpresswayCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={jewarBoostingYamunaExpresswayFaqSchemaItems} />
      </section>
    </div>
  );
}
