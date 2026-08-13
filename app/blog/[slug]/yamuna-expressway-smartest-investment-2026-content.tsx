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

const CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Why%20Property%20in%20Yamuna%20Expressway%20is%20the%20Smartest%20Real%20Estate%20Investment%20in%202026/Why%20Property%20in%20Yamuna%20Expressway%20is%20the%20Smartest%20Real%20Estate%20Investment%20in%202026_4.webp";

const PROJECT_DEPTH_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Why%20Property%20in%20Yamuna%20Expressway%20is%20the%20Smartest%20Real%20Estate%20Investment%20in%202026/Why%20Property%20in%20Yamuna%20Expressway%20is%20the%20Smartest%20Real%20Estate%20Investment%20in%202026_3.webp";

const BUYER_CHECK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Why%20Property%20in%20Yamuna%20Expressway%20is%20the%20Smartest%20Real%20Estate%20Investment%20in%202026/Why%20Property%20in%20Yamuna%20Expressway%20is%20the%20Smartest%20Real%20Estate%20Investment%20in%202026_2.webp";

const COMPARE_ROWS: { factor: string; yamuna: string; otherNcr: string }[] = [
  {
    factor: "Entry ticket (working 2026)",
    yamuna: "Often lower than premium Noida Expressway and Gurugram for similar size",
    otherNcr: "Mature Noida and GGN belts price connectivity already baked in",
  },
  {
    factor: "Infra catalyst",
    yamuna: "Jewar Airport live; YEIDA grid still adding usable roads and nodes",
    otherNcr: "Infra mature; upside depends more on micro-location than a single trigger",
  },
  {
    factor: "Buyer mix",
    yamuna: "Investors plus early end-users; luxury depth rising in 22A and 22D",
    otherNcr: "Stronger end-user depth in older societies; thinner early-investor premium",
  },
  {
    factor: "Hold profile",
    yamuna: "Works on a 3 to 7 year hold when project delivery and sector depth align",
    otherNcr: "Shorter holds possible where resale liquidity is already proven",
  },
];

export const yamunaExpresswaySmartestInvestmentFaqSchemaItems: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Why is Yamuna Expressway property a smart investment in 2026?",
    answer:
      "Jewar Airport is operational, YEIDA keeps adding usable infrastructure, and entry tickets still sit below many premium Noida and Gurugram belts for comparable size. That mix attracts investors and early end-users. Smart only holds when your sector, RERA file, and possession path survive the same checks as the corridor story.",
  },
  {
    question: "Is Yamuna Expressway better than Noida Expressway for investment?",
    answer:
      "Different jobs. Noida Expressway suits buyers who want established Expressway living and higher tickets. Yamuna Expressway suits buyers who want airport-linked upside with a longer hold and a lower entry. Compare all-in cost, commute, and exit timeline. The smarter buy is the one that matches your brief, not a single corridor slogan.",
  },
  {
    question: "Which Yamuna Expressway projects should I shortlist in 2026?",
    answer:
      "Working shortlists often include Ace Verde in Sector 22A and Sector 22D names such as Elite X, Ace Terra, Gaur Chrysalis, Eldeco Whispers of Wonder, Purvanchal Sunbliss, Province D Olympia, and Aurum Alumni Bliss. VVIP Yamuna adds another airport-linked option. Compare two or three files before you token.",
  },
  {
    question: "What risks should I watch on Yamuna Expressway?",
    answer:
      "Buying only on the airport headline. Overpaying for a weak possession path. Ignoring peak-hour drive times. Treating a sector average as your ticket. UP RERA, builder delivery, and all-in unit cost still decide whether the investment stays smart after booking.",
  },
  {
    question: "Can Celeste Abode help with Yamuna Expressway investment?",
    answer:
      "Yes. We work buyer-side across Yamuna Expressway, Greater Noida, and Noida. That means shortlists with reasons, all-in ticket clarity, and site visits on projects that pass your checklist. We compare Yamuna stacks against other NCR belts when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Yamuna Expressway properties", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function YamunaExpresswaySmartestInvestmentCtaPair({
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

export function YamunaExpresswaySmartestInvestment2026Content() {
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
            <a href="#why-smart" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why Yamuna Expressway looks smart in 2026
            </a>
          </li>
          <li>
            <a href="#three-reasons" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Three reasons the investment thesis holds
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Yamuna Expressway vs other NCR belts
            </a>
          </li>
          <li>
            <a href="#what-to-buy" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What to shortlist, not just where
            </a>
          </li>
          <li>
            <a href="#before-buy" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What to verify before you invest
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
          Smartest does not mean risk-free. It means the corridor still offers a usable mix of entry price, airport
          access, and project choice that many mature NCR belts no longer give at the same ticket. If you are weighing{" "}
          <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
            property on Yamuna Expressway
          </Link>{" "}
          in 2026, the question is not whether Jewar exists. It is whether your stack can ride that demand without
          overpaying for a weak file.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The corridor is smart when the ticket, the drive, and the possession path all survive the same Monday morning
          test.
        </blockquote>
      </header>

      <section id="why-smart" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why Yamuna Expressway looks smart in 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Five years ago this belt was mostly a promise. In 2026 it is a working corridor with a live airport, active
            launches, and buyers who can drive the thesis instead of only reading it. YEIDA planning gives the map a
            structure older ribbon developments never had. That is why investors keep comparing Yamuna tickets against{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            and Greater Noida before they stretch into Gurugram rate cards.
          </p>
          <p>
            Smart also means choice. Sector 22A carries premium low-density stacks. Sector 22D carries launch density.
            Airport-adjacent names pull longer-hold buyers. Our work across{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            and the Yamuna side often starts with one filter: can this ticket absorb a 3 to 7 year hold if possession
            slips six months?
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={CORRIDOR_VISUAL}
            alt="Yamuna Expressway investment collage: balcony view, airport, construction, sector plan, expressway towers, and rising returns"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Jewar made the corridor visible. Entry ticket and project delivery decide whether the investment stays smart.
        </figcaption>
      </figure>

      <section id="three-reasons" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Three reasons the investment thesis holds
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These show up in almost every Yamuna Expressway enquiry we handle. Skip any one and the &quot;smartest&quot;
          claim falls apart.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Airport access that buyers can drive</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Noida International Airport is live. That pulls staff, vendors, and investors who want a home on the road
            to Jewar. It also pulls end users who would otherwise pay up on the Noida Expressway. Names such as{" "}
            <Link href={VVIP_YAMUNA} className="font-medium text-[#CBB27A] hover:underline">
              VVIP Yamuna
            </Link>{" "}
            and{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>{" "}
            sit in that airport-linked lane. Run the peak-hour drive before you treat brochure kilometres as your
            commute plan.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Entry that still leaves room</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Many Yamuna tickets still sit below premium Expressway Noida and Gurugram for similar carpet. That gap is
            why patient capital shows up here. It is also why weak projects can look cheap until you add floor rise,
            parking, and delay risk. Compare{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            and{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            on the same all-in basis before you call Yamuna a bargain.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Product depth, not one launch event</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Sector 22D now carries enough branded supply that buyers can compare instead of guessing.{" "}
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
            </Link>{" "}
            are part of that depth. Liquidity improves when end users have more than one society to choose from. Depth
            also means weak files can hide inside a hot sector average. Shortlist carefully.
          </p>
        </article>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Yamuna Expressway vs other NCR belts
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this when someone says Yamuna is always cheaper, or always riskier. Both can be true depending on the
          stack.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Factor</th>
                <th className="px-4 py-3 font-medium">Yamuna Expressway</th>
                <th className="px-4 py-3 font-medium">Typical mature NCR belts</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.factor}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.factor}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.yamuna}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.otherNcr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="what-to-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to shortlist, not just where
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Corridor conviction is not a project shortlist. On Sector 22A, start with{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>
            . On Sector 22D, compare{" "}
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
            </Link>{" "}
            on delivery and all-in ticket. Add{" "}
            <Link href={VVIP_YAMUNA} className="font-medium text-[#CBB27A] hover:underline">
              VVIP Yamuna
            </Link>{" "}
            if your brief is airport-linked luxury outside the densest 22D cluster.
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
            when the Yamuna hold feels too long. That comparison is healthy. The smartest investment is the one that
            still looks clean after you put two corridors on the same spreadsheet.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={PROJECT_DEPTH_VISUAL}
            alt="Luxury balcony view of Yamuna Expressway residential towers, expressway light trails, and Jewar Airport at sunset"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Product depth in 22A and 22D lets buyers compare. It does not make every launch a buy.
        </figcaption>
      </figure>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you invest on Yamuna Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            UP RERA on the official portal. Builder track record on delivered phases. All-in ticket on the exact unit,
            including floor rise and parking. A peak-hour drive to Jewar and to your workplace. If two of those fail,
            pause even when the corridor headline sounds like the smartest play in NCR.
          </p>
          <p>
            Start with live{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway properties
            </Link>
            , then stress-test against{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            if your exit needs more end-user depth sooner.{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              Book a free consultation
            </Link>{" "}
            if you want the investment thesis checked against the stack you are actually being offered.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_CHECK_VISUAL}
            alt="Yamuna Expressway investment view: balcony workspace, airport access, sector choice, and project file overlays at sunset"
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
          How Celeste Abode helps you invest on Yamuna Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            A smart corridor still needs a clean file. Celeste Abode works buyer-side as a real estate consultant across
            Delhi NCR. We compare Yamuna Expressway projects on your brief, spell out the all-in ticket, and flag
            delivery or paperwork gaps before you token. You keep the final call; we remove the guesswork from which
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
            if Yamuna Expressway is your 2026 thesis and you want it tested against other{" "}
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
                Compare Yamuna Expressway stacks on ticket and delivery, then book visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <YamunaExpresswaySmartestInvestmentCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={yamunaExpresswaySmartestInvestmentFaqSchemaItems} />
      </section>
    </div>
  );
}
