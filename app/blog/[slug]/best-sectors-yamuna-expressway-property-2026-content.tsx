import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { BlogInstagramEmbed } from "@/components/blog-instagram-embed";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const PROPERTIES_GN = "/properties-in-greater-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";

const ACE_VERDE = "/properties-in-yamuna-expressway/ace-verde-sector-22a-yamuna-expressway";
const ACE_TERRA = "/properties-in-yamuna-expressway/ace-terra-sector-22d-yeida";
const ELITE_X = "/properties-in-yamuna-expressway/elite-x";
const GAUR_CHRYSALIS = "/properties-in-yamuna-expressway/gaur-chrysalis-sector-22d-yeida";
const ELDECO_WHISPERS = "/properties-in-yamuna-expressway/eldeco-whispers-of-wonder-sector-22d-yeida";
const PURVANCHAL_SUNBLISS = "/properties-in-yamuna-expressway/purvanchal-sunbliss-sector-22d-yeida";
const PROVINCE_OLYMPIA = "/properties-in-yamuna-expressway/province-d-olympia-sector-22d-yamuna-expressway";
const AURUM_ALUMNI = "/properties-in-yamuna-expressway/aurum-alumni-bliss-sector-22d-yamuna-expressway";
const VVIP_YAMUNA = "/properties-in-yamuna-expressway/vvip-yamuna";

const YAMUNA_SECTORS_INSTAGRAM_REEL =
  "https://www.instagram.com/reel/DZ4_8hhPPAq/?utm_source=ig_embed&utm_campaign=loading";

const SECTOR_BELT_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Best%20Sectors%20to%20Buy%20Property%20in%20Yamuna%20Expressway%20for%20High%20Returns%20and%20Luxury%20Living%20blog/ChatGPT%20Best%20Sectors%20to%20Buy%20Property%20in%20Yamuna%20Expressway%20for%20High%20Returns%20and%20Luxury%20Living_3.webp";

const LUXURY_STACK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Best%20Sectors%20to%20Buy%20Property%20in%20Yamuna%20Expressway%20for%20High%20Returns%20and%20Luxury%20Living%20blog/Best%20Sectors%20to%20Buy%20Property%20in%20Yamuna%20Expressway%20for%20High%20Returns%20and%20Luxury%20Living_2.webp";

const AIRPORT_CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Best%20Sectors%20to%20Buy%20Property%20in%20Yamuna%20Expressway%20for%20High%20Returns%20and%20Luxury%20Living%20blog/Airport%20access%20sells%20the%20corridor.%20Your%20sector%20and%20project%20file%20still%20decide%20whether%20the%20ticket%20holds.webp";

const COMPARE_ROWS: { factor: string; sector22a: string; sector22d: string; midCorridor: string }[] = [
  {
    factor: "Buyer profile",
    sector22a: "Premium end-user, branded luxury, longer hold",
    sector22d: "Luxury and upper-mid mix; strong launch activity in 2026",
    midCorridor: "Plot and mid-rise buyers; ticket-sensitive investors",
  },
  {
    factor: "Jewar Airport link",
    sector22a: "Airport story with early premium positioning",
    sector22d: "Dense project cluster; many stacks market airport proximity",
    midCorridor: "Depends on exact pin; verify drive time, not brochure miles",
  },
  {
    factor: "Luxury depth",
    sector22a: "Low-density, large-format specs",
    sector22d: "Wide choice: Elite X, Ace Terra, Gaur, Eldeco, Purvanchal",
    midCorridor: "Thinner luxury supply; compare before you assume parity",
  },
  {
    factor: "Return profile",
    sector22a: "Works when builder delivery and airport uptake align",
    sector22d: "Liquidity from volume; sector averages can hide weak files",
    midCorridor: "Can reward patience; resale needs end-user depth on the ground",
  },
];

export const bestSectorsYamunaExpresswayFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Which is the best sector to buy property on Yamuna Expressway in 2026?",
    answer:
      "Sector 22D carries the most active luxury and upper-mid launches in 2026. Sector 22A suits buyers who want premium low-density stacks like Ace Verde. Mid-corridor pins can work for plot buyers with a longer hold. Match sector to ticket, lifestyle, and how long you can wait for possession and resale depth.",
  },
  {
    question: "Is Yamuna Expressway property good for high returns?",
    answer:
      "It can be, but not on autopilot. Jewar Airport is live and YEIDA keeps adding usable infra. Returns show up when your project delivers, RERA is clean, and the sector you pick has end-user demand beyond investor brochures. High returns and luxury living are not the same brief. Be clear which one you are buying for.",
  },
  {
    question: "What are the top luxury projects on Yamuna Expressway?",
    answer:
      "Working shortlists in 2026 often include Ace Verde in Sector 22A and Sector 22D names such as Elite X, Ace Terra, Gaur Chrysalis, Eldeco Whispers of Wonder, Purvanchal Sunbliss, Province D Olympia, and Aurum Alumni Bliss. VVIP Yamuna adds another airport-linked option. Compare all-in tickets and possession paths before you token.",
  },
  {
    question: "What should I verify before I buy on Yamuna Expressway?",
    answer:
      "UP RERA on the official portal, builder track record on delivered phases, all-in cost on your unit, and a real drive to Jewar and your daily workplace at peak hour. Sector averages on portals miss floor rise, PLC, and parking. Paperwork on the stack you book matters more than the corridor headline.",
  },
  {
    question: "Can Celeste Abode help with Yamuna Expressway property?",
    answer:
      "Yes. We work buyer-side across the Yamuna Expressway and Greater Noida. That means sector shortlists with reasons, all-in ticket clarity, and site visits only where the file still passes basic checks. We compare Sector 22A, 22D, and other YE belts when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Yamuna Expressway properties", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function YamunaExpresswaySectorsCtaPair({
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

export function BestSectorsYamunaExpresswayProperty2026Content() {
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
            <a href="#why-sectors" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why sector choice matters on the Yamuna Expressway
            </a>
          </li>
          <li>
            <a href="#top-sectors" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Best sectors for returns and luxury living
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Sector 22A vs 22D vs mid-corridor
            </a>
          </li>
          <li>
            <a href="#active-projects" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Active projects to shortlist
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
          Yamuna Expressway buyers often arrive with one word: Jewar. The airport is real. That does not make every
          sector on the route a high-return buy or a luxury home. If you are comparing{" "}
          <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
            property on Yamuna Expressway
          </Link>{" "}
          in 2026, start with sector numbers, then project files. Sector 22D has the launch density. Sector 22A has the
          premium belt. Mid-corridor pins suit a different hold. Pick the sector that matches your ticket and timeline,
          not the hoarding with the tallest render.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          High returns and luxury living both need the same boring proof: RERA, delivery, and a drive you can repeat.
        </blockquote>
      </header>

      <BlogInstagramEmbed url={YAMUNA_SECTORS_INSTAGRAM_REEL} />

      <section id="why-sectors" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why sector choice matters on the Yamuna Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            YEIDA planned this corridor in blocks. Some sectors were reserved for residential grids. Others opened for
            plotted and mixed use. Jewar pulled attention to the whole map. Price movement did not move evenly. Sector
            22D saw stacked launches because the infra story and buyer interest met in one place. Sector 22A built a
            premium lane for buyers who want space and branded specs without waiting for mid-corridor maturity.
          </p>
          <p>
            Luxury living is not only marble lobbies. It is daily usability: internal roads, security, club depth, and a
            commute that still works when the airport headline fades. Returns follow when end users move in, not when
            investor decks circulate. Browse live{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            and{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            only after you know which Yamuna sector fits your brief.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={SECTOR_BELT_VISUAL}
            alt="Jewar International Airport sign at sunset with Yamuna Expressway traffic and distant residential towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Jewar Airport put Yamuna Expressway sectors on buyer maps. Sector choice still decides ticket and hold period.
        </figcaption>
      </figure>

      <section id="top-sectors" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Best sectors for high returns and luxury living
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These three belts show up in almost every Yamuna Expressway enquiry we handle. None is a blanket buy. Each
          suits a different budget and exit plan.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">Sector 22A: premium lane</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Sector 22A is where Yamuna Expressway luxury started to look like Noida premium belts. Low-density planning,
            large formats, and airport-linked marketing pull end users who would otherwise look at Sector 150 or
            Gurugram.{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>{" "}
            anchors this belt. Buyers who want a second stop on the same run often cross-check{" "}
            <Link href={ELITE_X} className="font-medium text-[#CBB27A] hover:underline">
              Elite X
            </Link>{" "}
            in nearby Sector 22D. Returns work when possession and society depth arrive on schedule, not when you buy
            only on the airport slide deck.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">Sector 22D: launch density and choice</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Sector 22D is the busiest residential cluster on the expressway in 2026. You get luxury stacks, upper-mid
            grids, and enough supply to compare tickets without guessing. Active names include{" "}
            <Link href={ACE_TERRA} className="font-medium text-[#CBB27A] hover:underline">
              Ace Terra
            </Link>
            ,{" "}
            <Link href={GAUR_CHRYSALIS} className="font-medium text-[#CBB27A] hover:underline">
              Gaur Chrysalis
            </Link>
            , and{" "}
            <Link href={ELDECO_WHISPERS} className="font-medium text-[#CBB27A] hover:underline">
              Eldeco Whispers of Wonder
            </Link>
            . That density helps returns when end users absorb inventory. It also means weak projects can hide inside a
            hot sector average. Shortlist carefully.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">Mid-corridor and airport-adjacent belts</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Beyond 22A and 22D, buyers still chase airport proximity on plotted and mid-rise pins. Tickets can look
            attractive. Luxury depth is thinner.{" "}
            <Link href={VVIP_YAMUNA} className="font-medium text-[#CBB27A] hover:underline">
              VVIP Yamuna
            </Link>{" "}
            and{" "}
            <Link href={ELITE_X} className="font-medium text-[#CBB27A] hover:underline">
              Elite X
            </Link>{" "}
            sit in this airport-linked lane for buyers who want a branded stack with a clear Jewar story. Run the
            peak-hour drive before you treat a map pin as a lifestyle upgrade.
          </p>
        </article>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Sector 22A vs 22D vs mid-corridor
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this when someone says the whole Yamuna Expressway is &quot;cheap&quot; or &quot;already peaked.&quot; Both can be true in
          different sectors on the same road.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Factor</th>
                <th className="px-4 py-3 font-medium">Sector 22A</th>
                <th className="px-4 py-3 font-medium">Sector 22D</th>
                <th className="px-4 py-3 font-medium">Mid-corridor belts</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.factor}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.factor}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.sector22a}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.sector22d}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.midCorridor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="active-projects" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Active projects to shortlist on Yamuna Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 22A starts with{" "}
            <Link href={ACE_VERDE} className="font-semibold text-foreground hover:underline">
              Ace Verde
            </Link>
            . Sector 22D is where most luxury and upper-mid names sit in 2026:{" "}
            <Link href={ELITE_X} className="font-semibold text-foreground hover:underline">
              Elite X
            </Link>
            ,{" "}
            <Link href={ACE_TERRA} className="font-semibold text-foreground hover:underline">
              Ace Terra
            </Link>
            ,{" "}
            <Link href={GAUR_CHRYSALIS} className="font-semibold text-foreground hover:underline">
              Gaur Chrysalis
            </Link>
            ,{" "}
            <Link href={ELDECO_WHISPERS} className="font-semibold text-foreground hover:underline">
              Eldeco Whispers of Wonder
            </Link>
            ,{" "}
            <Link href={PURVANCHAL_SUNBLISS} className="font-semibold text-foreground hover:underline">
              Purvanchal Sunbliss
            </Link>
            ,{" "}
            <Link href={PROVINCE_OLYMPIA} className="font-semibold text-foreground hover:underline">
              Province D Olympia
            </Link>
            , and{" "}
            <Link href={AURUM_ALUMNI} className="font-semibold text-foreground hover:underline">
              Aurum Alumni Bliss
            </Link>
            . Add{" "}
            <Link href={VVIP_YAMUNA} className="font-semibold text-foreground hover:underline">
              VVIP Yamuna
            </Link>{" "}
            if your brief is airport-linked luxury outside the 22D cluster. Compare builder delivery and RERA timelines
            across two or three names before you fixate on one rate card.
          </p>
          <p>
            See all live inventory on{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway properties
            </Link>{" "}
            or tell us your budget on a{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              free consultation
            </Link>{" "}
            if you want Sector 22A and 22D stacks stress-tested side by side.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={LUXURY_STACK_VISUAL}
            alt="Luxury residential towers at sunset beside the multi-lane Yamuna Expressway corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Sector 22D clusters luxury supply. Sector 22A keeps the premium lane thinner and more selective.
        </figcaption>
      </figure>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you buy on Yamuna Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The corridor rewards buyers who do paperwork first. UP RERA on the official portal. Builder track record on
            delivered phases. All-in ticket on the exact unit, including floor rise and parking. A second visit that
            includes a real drive to Jewar and your workplace at peak hour. If two of those fail, pause even when the
            sector headline sounds perfect.
          </p>
          <p>
            High returns on Yamuna Expressway are not a separate product from luxury living. Both need a project that
            delivers and a sector where families actually move in. Start with{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              property on Yamuna Expressway
            </Link>{" "}
            that passes those checks, then compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            if your ticket needs a shorter possession path elsewhere in NCR.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={AIRPORT_CORRIDOR_VISUAL}
            alt="Luxury balcony view with site plan, architectural model, Yamuna Expressway, airport, and residential towers at sunset"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Airport access sells the corridor. Your sector and project file still decide whether the ticket holds.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy on Yamuna Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Yamuna Expressway is not one sector or one launch event. Celeste Abode works buyer-side as a real estate
            consultant across Delhi NCR. We compare Sector 22A, 22D, and airport-adjacent stacks on your brief, spell
            out the all-in ticket, and flag delivery or paperwork gaps before you token. You keep the final call; we
            remove the guesswork from which site visits are worth your Saturday.
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
            if Yamuna Expressway sectors are on your list and you want them tested against other{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              property in Greater Noida
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
                Compare Sector 22A and 22D stacks, then book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <YamunaExpresswaySectorsCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={bestSectorsYamunaExpresswayFaqSchemaItems} />
      </section>
    </div>
  );
}
