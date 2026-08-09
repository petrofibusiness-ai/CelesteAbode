import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { BlogInstagramEmbed } from "@/components/blog-instagram-embed";
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
const ACE_VERDE_YE = "/properties-in-yamuna-expressway/ace-verde-sector-22a-yamuna-expressway";
const GODREJ_MAJESTY = "/properties-in-greater-noida/godrej-majesty";

const NOIDA_EXPRESSWAY_INSTAGRAM_POST =
  "https://www.instagram.com/p/Dbqjbk7T238/?utm_source=ig_embed&utm_campaign=loading";

const EXPRESSWAY_HERO_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Why%20Noida%20Expressway%20is%20the%20Best%20Place%20to%20Buy%20Property%20in%202026/Why%20Noida%20Expressway%20is%20the%20Best%20Place%20to%20Buy%20Property%20in%202026_2.webp";

const NOIDA_BELT_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Why%20Noida%20Expressway%20is%20the%20Best%20Place%20to%20Buy%20Property%20in%202026/Why%20Noida%20Expressway%20is%20the%20Best%20Place%20to%20Buy%20Property%20in%202026_3.webp";

const GREATER_NOIDA_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Why%20Noida%20Expressway%20is%20the%20Best%20Place%20to%20Buy%20Property%20in%202026/Why%20Noida%20Expressway%20is%20the%20Best%20Place%20to%20Buy%20Property%20in%202026_4.webp";

const COMPARE_ROWS: { factor: string; expressway: string; otherNoida: string }[] = [
  {
    factor: "Daily commute",
    expressway: "Direct Noida-Greater Noida link; cross-NCR drives without cutting through old grids",
    otherNoida: "Sector-dependent; many pockets still rely on internal roads and longer loops",
  },
  {
    factor: "Buyer mix",
    expressway: "Premium end-users, airport-linked investors, families on Noida-GGN routes",
    otherNoida: "Mid-segment end users dominate in older sectors",
  },
  {
    factor: "Ticket band (working 2026)",
    expressway: "Wide spread: Sector 150 premium to Greater Noida West mid-segment",
    otherNoida: "Often lower entry in Sectors 75, 78, 137; different resale curves",
  },
  {
    factor: "Hold profile",
    expressway: "Works when infra on the ground matches the brochure",
    otherNoida: "Mature societies can offer quicker end-user depth in mid belts",
  },
];

export const noidaExpresswayBuyPropertyFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Why is the Noida Expressway a good place to buy property in 2026?",
    answer:
      "The expressway ties Noida, Greater Noida, and the Yamuna belt into one drivable corridor. Jewar Airport is operational, metro lines feed adjacent sectors, and premium launches keep clustering along the route. Buyers get connectivity that older Noida grids cannot copy without a longer commute.",
  },
  {
    question: "Which sectors are best along the Noida Expressway?",
    answer:
      "It depends on budget. Sector 150 suits premium end-users who want low-density stacks. Sectors 137 and 75 work for mid-segment families. Greater Noida West and the Yamuna side suit buyers who want airport-linked stories with a longer hold. Match sector to ticket and commute, not a single best pin.",
  },
  {
    question: "Is Noida Expressway property better than central Noida sectors?",
    answer:
      "Different jobs. Central and older sectors offer mature social infrastructure and often lower tickets. The expressway belt trades on corridor access and newer planning. The best choice is the one that survives your peak-hour drive and your exit timeline.",
  },
  {
    question: "What should I verify before I buy flat on the Noida Expressway?",
    answer:
      "UP RERA on the official portal, builder delivery on completed phases, all-in cost on your unit, and a real commute test at the hour you travel. Compare at least three projects in the belt. A corridor headline does not replace paperwork on the stack you are booking.",
  },
  {
    question: "Can Celeste Abode help with property on the Noida Expressway?",
    answer:
      "Yes. We work buyer-side across Noida, Greater Noida, and the Yamuna expressway corridor. That means shortlists with reasons, all-in ticket clarity, and site visits on projects that pass your checklist. We compare expressway belts against other Noida options when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function NoidaExpresswayCtaPair({
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

export function NoidaExpresswayBuyProperty2026Content() {
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
            <a href="#why-expressway" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why the expressway belt pulls buyers
            </a>
          </li>
          <li>
            <a href="#three-reasons" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Three reasons the corridor works in 2026
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Expressway belt vs other Noida pockets
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
          The Noida Expressway is not a marketing line on a hoarding. It is the spine that links Noida, Greater Noida,
          and the Yamuna side into one corridor families actually drive. If you are shortlisting{" "}
          <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
            property in Noida
          </Link>{" "}
          in 2026, the expressway belt is where connectivity, airport access, and new supply meet. That does not mean
          every launch on the route is a buy. It means the corridor earns a serious look before you default to an older
          sector pin.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The expressway wins when your commute, ticket, and project file all survive the same Monday morning test.
        </blockquote>
      </header>

      <BlogInstagramEmbed url={NOIDA_EXPRESSWAY_INSTAGRAM_POST} />

      <section id="why-expressway" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why the expressway belt pulls buyers
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Most Noida buyers still start with sector numbers. Expressway buyers start with the drive. Can you reach
            Delhi, Gurugram, or the airport without treating every trip like a planning exercise? That question filters
            the belt faster than any rate card.
          </p>
          <p>
            Jewar Airport is live. Metro extensions and Aqua Line feeds keep adding nodes. Premium stacks in Sector 150
            sit beside mid-segment grids in Greater Noida West and long-hold plots on the{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway
            </Link>
            . Our buyer work across{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            and Noida often starts with one route map, then narrows to sectors that fit budget and hold period.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={EXPRESSWAY_HERO_VISUAL}
            alt="Noida Expressway split view: lit residential towers and park at dusk beside the daytime expressway corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          The expressway links premium Noida stacks to Greater Noida and Yamuna-side growth belts.
        </figcaption>
      </figure>

      <section id="three-reasons" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Three reasons the corridor works in 2026
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These show up in almost every expressway enquiry we handle. They are simple, but they decide whether a ticket
          holds at resale.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Cross-NCR connectivity</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            The Noida-Greater Noida Expressway cuts travel time for buyers who work across NCR. That pulls end users who
            would otherwise pay up in Gurugram or stretch into central Delhi rentals. Run your peak-hour route before you
            treat a brochure map as your commute plan.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Sector choice inside one corridor</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Sector 150 suits premium buyers. Sectors 137 and 75 cover mid-segment families. Greater Noida West balances
            ticket size with metro access. Browse{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            and{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            with the corridor in mind, not a single sector average from a portal.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Premium product depth</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Large-format flats, branded specs, and low-density planning show up along the expressway more than in older
            Noida grids. Active names on the Noida side include{" "}
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
            ,{" "}
            <Link href={SMART_WORLD_LE_COURTYARD} className="font-medium text-[#CBB27A] hover:underline">
              Smart World Le Courtyard
            </Link>
            , and{" "}
            <Link href={JACOB_AND_CO} className="font-medium text-[#CBB27A] hover:underline">
              M3M Jacob & Co
            </Link>
            . The same commute spine runs into{" "}
            <Link href={ACE_VERDE_YE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>{" "}
            on the Yamuna Expressway and{" "}
            <Link href={GODREJ_MAJESTY} className="font-medium text-[#CBB27A] hover:underline">
              Godrej Majesty
            </Link>{" "}
            in Greater Noida. Compare builder delivery and RERA timelines across two or three projects before you fixate
            on one lobby render.
          </p>
        </article>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Expressway belt vs other Noida pockets
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this table when someone tells you the expressway is &quot;always best&quot; or &quot;overpriced.&quot; Both
          can be true depending on your brief.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Factor</th>
                <th className="px-4 py-3 font-medium">Noida Expressway belt</th>
                <th className="px-4 py-3 font-medium">Typical other Noida sectors</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.factor}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.factor}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.expressway}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.otherNoida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NOIDA_BELT_VISUAL}
            alt="Noida Expressway lifestyle and connectivity: villas and lit park at sunset beside expressway, metro, and office towers by day"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Expressway sectors trade on planning and connectivity, not tower count alone.
        </figcaption>
      </figure>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you buy on the Noida Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The corridor rewards buyers who do boring checks. UP RERA on the official portal. Builder track record on
            delivered phases. All-in ticket on the exact unit, including floor rise and parking. A second visit at peak
            hour on the expressway. If two of those fail, pause even when the corridor story sounds perfect.
          </p>
          <p>
            Start with live inventory on{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            along the expressway side, or compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            if your ticket needs a mid-segment exit.{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              Book a free consultation
            </Link>{" "}
            if you want the expressway belt stress-tested against other corridors before you pay a booking amount.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={GREATER_NOIDA_VISUAL}
            alt="Noida Expressway at twilight: light trails on the highway beside residential towers and a glass office building"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Greater Noida and Yamuna-side belts plug into the same expressway commute story.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy on the Noida Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The expressway is not one sector or one tower. Celeste Abode works buyer-side as a real estate consultant in
            Noida and across Delhi NCR. We compare expressway projects on your brief, spell out the all-in ticket, and
            flag delivery or paperwork gaps before you token. You keep the final call; we remove the guesswork from which
            site visits are worth your Saturday.
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
            if the Noida Expressway is on your list and you want it stress-tested against other{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            belts before you pay a booking amount.
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
                Compare expressway stacks, then book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <NoidaExpresswayCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={noidaExpresswayBuyPropertyFaqSchemaItems} />
      </section>
    </div>
  );
}
