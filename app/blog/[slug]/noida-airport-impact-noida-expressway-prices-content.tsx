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
const ACE_VERDE = "/properties-in-yamuna-expressway/ace-verde-sector-22a-yamuna-expressway";
const ELITE_X = "/properties-in-yamuna-expressway/elite-x";
const VVIP_YAMUNA = "/properties-in-yamuna-expressway/vvip-yamuna";
const GODREJ_MAJESTY = "/properties-in-greater-noida/godrej-majesty";
const SOBHA_RIVANA = "/properties-in-greater-noida/sobha-rivana";

const AIRPORT_CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20Will%20Impact%20Property%20Prices%20on%20Noida%20Expressway/How%20Noida%20International%20Airport%20Will%20Impact%20Property%20Prices%20on%20Noida%20Expressway_4.webp";

const EXPRESSWAY_PRICE_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20Will%20Impact%20Property%20Prices%20on%20Noida%20Expressway/How%20Noida%20International%20Airport%20Will%20Impact%20Property%20Prices%20on%20Noida%20Expressway_3.webp";

const BUYER_CHECK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20Will%20Impact%20Property%20Prices%20on%20Noida%20Expressway/How%20Noida%20International%20Airport%20Will%20Impact%20Property%20Prices%20on%20Noida%20Expressway_2.webp";

const COMPARE_ROWS: { factor: string; pricedIn: string; stillRoom: string }[] = [
  {
    factor: "What buyers pay for",
    pricedIn: "Airport headline already in launch rate cards near prime Expressway pins",
    stillRoom: "Projects where delivery, RERA, and society depth still lag the brochure story",
  },
  {
    factor: "Typical buyer",
    pricedIn: "Investors chasing Jewar + premium end-users on Sector 150 and branded stacks",
    stillRoom: "Families who need all-in ticket clarity and a commute that works Monday morning",
  },
  {
    factor: "Price risk",
    pricedIn: "Overpaying if you buy the airport slide deck without checking possession path",
    stillRoom: "Missing a fair entry if you wait for every flight schedule before you shortlist",
  },
  {
    factor: "What holds the ticket",
    pricedIn: "Builder delivery, end-user absorption, and Expressway access you can drive",
    stillRoom: "Same three checks. The airport alone does not rescue a weak file",
  },
];

export const noidaAirportImpactExpresswayFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "How will Noida International Airport impact property prices on Noida Expressway?",
    answer:
      "The airport pulls more buyer attention to the Expressway belt because the corridor links Noida, Greater Noida, and the Yamuna side to Jewar. Prices rise where demand is real: premium end-users, airport-linked staff, and investors who can hold. Pockets that already priced the story in can stall if delivery slips. Match the project file to the airport story before you token.",
  },
  {
    question: "Which Noida Expressway sectors benefit most from Jewar Airport?",
    answer:
      "Sector 150 and other Expressway-facing premium belts feel the narrative first because buyers already pay for planning and connectivity. Mid-segment Expressway sectors can gain when end-user demand spills over. Greater Noida and Yamuna Expressway pins compete for the same airport story with different tickets. Compare drive time and all-in cost, not sector marketing alone.",
  },
  {
    question: "Has Noida International Airport already increased property prices?",
    answer:
      "Part of the airport story is already in many Expressway rate cards. That does not mean every launch still has room. Some projects moved early. Others still trade on delivery stage and builder credibility. Lock the all-in ticket on the unit you are offered and compare three stacks before you treat a portal average as your floor.",
  },
  {
    question: "Should I buy on Noida Expressway only because of the airport?",
    answer:
      "No. Buy when the commute, RERA status, builder track record, and all-in cost survive the same Monday morning test. The airport is a demand layer. It does not fix a weak possession path or an inflated ticket. If two of those checks fail, pause even when the Jewar headline sounds perfect.",
  },
  {
    question: "Can Celeste Abode help me shortlist Noida Expressway property near the airport story?",
    answer:
      "Yes. We work buyer-side across Noida, Greater Noida, and the Yamuna corridor. That means shortlists with reasons, all-in ticket clarity, and site visits on projects that pass your checklist. We compare Expressway stacks against other belts when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function NoidaAirportImpactExpresswayCtaPair({
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

export function NoidaAirportImpactNoidaExpresswayPricesContent() {
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
            <a href="#why-airport" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why the airport moves Expressway prices
            </a>
          </li>
          <li>
            <a href="#how-prices-move" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How prices actually move in 2026
            </a>
          </li>
          <li>
            <a href="#which-pockets" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Which Expressway pockets feel it first
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Priced in vs still room
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
          Noida International Airport at Jewar is live. Brochures on the Noida Expressway already treat that as settled
          fact. The useful question is narrower: which tickets on the Expressway still move because of airport demand,
          and which ones already baked the story into the rate card? If you are weighing{" "}
          <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
            property in Noida
          </Link>{" "}
          along the Expressway in 2026, start with how prices transmit, not with another airport render.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The airport sells the corridor. Your sector and project file still decide whether the ticket holds.
        </blockquote>
      </header>

      <section id="why-airport" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why the airport moves Expressway prices
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Airports do not reprice every tower equally. They reprice belts that cut travel time for the people who
            fly, staff the airport ecosystem, and want a home on a corridor that already works for Noida and Gurugram
            offices. The Noida Expressway sits in that lane. It links older Noida grids to Greater Noida and feeds into
            the{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway
            </Link>{" "}
            side where Jewar is the headline. Buyers who stretch that map often put{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>{" "}
            or{" "}
            <Link href={ELITE_X} className="font-medium text-[#CBB27A] hover:underline">
              Elite X
            </Link>{" "}
            on the same visit list as Expressway Noida stacks.
          </p>
          <p>
            That is why Expressway launches keep using airport proximity in sales rooms. Demand is not only local
            end-users. It includes buyers who treat the corridor as a long-hold play on NCR connectivity. Our work
            across{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            and Noida often starts with one map: can you reach Jewar and your workplace without treating every trip as
            a planning exercise?
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={AIRPORT_CORRIDOR_VISUAL}
            alt="Jewar Airport and Noida Expressway collage with sector map pin, construction site visit, and luxury balcony living"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Jewar puts the Expressway on more buyer maps. Sector choice and delivery still set the price you keep.
        </figcaption>
      </figure>

      <section id="how-prices-move" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How prices actually move in 2026
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Three channels show up in almost every Expressway enquiry after the airport went live. Ignore any one of them
          and the brochure story falls apart.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. End-user depth on the corridor</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Families who already commute across NCR buy Expressway flats for the drive, not the airport press release.
            When those buyers absorb inventory, resale holds. When inventory sits with only investor decks circulating,
            tickets soften even near a live runway. Browse{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            with that filter before you chase a sector average.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Airport-linked demand layers</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Staff, vendors, and buyers who want faster Jewar access add a second demand layer. That layer does not
            reprice every mid-rise overnight. It shows up first in premium and well-connected stacks where the
            Expressway commute already works, including names like{" "}
            <Link href={SMART_WORLD_LE_COURTYARD} className="font-medium text-[#CBB27A] hover:underline">
              Smart World Le Courtyard
            </Link>{" "}
            when the all-in ticket still fits the brief. Compare units, not brochure kilometres to the terminal.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Supply and builder credibility</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            New launches along the Expressway keep arriving. Price appreciation sticks when delivery matches the
            schedule and society depth builds. A strong airport story on a weak RERA or delayed phase is still a weak
            buy. Check UP RERA and completed phases before you treat Jewar as your exit plan.
          </p>
        </article>
      </section>

      <section id="which-pockets" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Which Expressway pockets feel it first
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Premium Expressway belts feel the narrative earliest because buyers already pay for planning and brand.
            Sector 150 sits in that lane. Active names include{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150 Noida
            </Link>
            . Further along the Noida side, branded stacks such as{" "}
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
            </Link>{" "}
            trade on connectivity and product depth as much as airport proximity.
          </p>
          <p>
            Mid-segment Expressway sectors can follow when end users spill over. Greater Noida and Yamuna-side options
            compete for the same Jewar story at different tickets. Buyers often cross-check{" "}
            <Link href={GODREJ_MAJESTY} className="font-medium text-[#CBB27A] hover:underline">
              Godrej Majesty
            </Link>
            ,{" "}
            <Link href={SOBHA_RIVANA} className="font-medium text-[#CBB27A] hover:underline">
              Sobha Rivana
            </Link>
            , or{" "}
            <Link href={VVIP_YAMUNA} className="font-medium text-[#CBB27A] hover:underline">
              VVIP Yamuna
            </Link>{" "}
            against Expressway Noida before they lock a corridor. Compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            only after you know whether your brief is premium Expressway living or a longer-hold airport corridor play.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={EXPRESSWAY_PRICE_VISUAL}
            alt="Premium Expressway, mid belts, and end-user demand drivers: how Noida International Airport shapes property prices"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Premium Expressway stacks price the airport story first. Mid belts move when end-user demand follows.
        </figcaption>
      </figure>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Priced in vs still room
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this when someone says every Expressway flat will double because of Jewar, or that the story is over. Both
          can be wrong on the same road.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Factor</th>
                <th className="px-4 py-3 font-medium">Mostly priced in</th>
                <th className="px-4 py-3 font-medium">Where buyers still find room</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.factor}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.factor}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.pricedIn}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.stillRoom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you buy on the airport story
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            UP RERA on the official portal. Builder track record on delivered phases. All-in ticket on the exact unit,
            including floor rise and parking. A peak-hour drive on the Expressway toward Jewar and toward your
            workplace. If two of those fail, pause even when the airport headline sounds perfect.
          </p>
          <p>
            Start with live inventory on{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            along the Expressway side. If your shortlist already includes{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150 Noida
            </Link>{" "}
            or a Greater Noida stack, compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            on the same all-in basis.{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              Book a free consultation
            </Link>{" "}
            if you want the Jewar story stress-tested against the stack you are actually being offered.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_CHECK_VISUAL}
            alt="Noida Expressway and Jewar Airport collage with pre-purchase checklist, toll plaza, sector selection, and approved property file"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Run the commute and the paperwork before you treat Jewar as a guaranteed price lift.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy on the Expressway after Jewar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The airport is one layer. Celeste Abode works buyer-side as a real estate consultant in Noida and across
            Delhi NCR. We compare Expressway projects on your brief, spell out the all-in ticket, and flag delivery or
            paperwork gaps before you token. You keep the final call; we remove the guesswork from which site visits are
            worth your Saturday.
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
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            on the Expressway before you pay a booking amount.
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
                Compare Expressway stacks against the airport story, then book visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <NoidaAirportImpactExpresswayCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={noidaAirportImpactExpresswayFaqSchemaItems} />
      </section>
    </div>
  );
}
