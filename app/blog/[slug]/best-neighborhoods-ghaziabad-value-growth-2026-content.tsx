import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_GHZ = "/properties-in-ghaziabad";
const FLATS_GHZ = "/flats-in-ghaziabad";
const FOREST_WALK = "/properties-in-ghaziabad/forest-walk-villa";
const FUSION_VASUNDHARA = "/properties-in-ghaziabad/fusion-vasundhara";
const KARYAN_NH24 = "/properties-in-ghaziabad/karyan-nh24-ghaziabad";
const AU_COSMOS = "/properties-in-ghaziabad/au-cosmos-corner-siddharth-vihar-ghaziabad";

const GHAZIABAD_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/best_neighborhood_in_ghaziabad/Best%20Neighborhoods%20in%20Ghaziabad%20for%20Value%20%26%20Growth%20in%202026_2.webp";

const CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/best_neighborhood_in_ghaziabad/Best%20Neighborhoods%20in%20Ghaziabad%20for%20Value%20%26%20Growth%20in%202026_3.webp";

const NEIGHBORHOOD_ROWS: { area: string; bestFor: string; valueNote: string }[] = [
  {
    area: "Indirapuram",
    bestFor: "Families buying to live; steady resale and rental depth",
    valueNote: "Mature societies; tickets move on OC, maintenance, and exact khand",
  },
  {
    area: "Vaishali",
    bestFor: "Buyers who commute to Delhi or core Noida daily",
    valueNote: "Established grid; less upside drama, more liveability certainty",
  },
  {
    area: "Vasundhara and Raj Nagar Extension",
    bestFor: "Mid-budget end users near RRTS and daily retail",
    valueNote: "Room-per-rupee story; check peak-hour drive before you token",
  },
  {
    area: "NH-24 and Wave City belt",
    bestFor: "Longer hold buyers open to township-scale projects",
    valueNote: "Expressway access repriced the corridor; project file still decides the ticket",
  },
  {
    area: "Siddharth Vihar",
    bestFor: "Premium mid-rise buyers who want a newer address grid",
    valueNote: "Growth tied to connectivity proof and builder delivery on early phases",
  },
];

export const bestNeighborhoodsGhaziabadFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Which are the best neighborhoods in Ghaziabad for property in 2026?",
    answer:
      "For end users, Indirapuram, Vaishali, and Vasundhara still offer the clearest live-in story. For growth with a longer hold, NH-24 townships and Siddharth Vihar can work if RERA, possession, and your commute check out. The best neighborhood is the one that matches how you will use the home, not the one with the loudest launch ad.",
  },
  {
    question: "Is Indirapuram still a good place to buy flats in Ghaziabad?",
    answer:
      "Yes, for buyers who want depth: schools, daily retail, resale listings, and familiar 2 and 3 BHK formats. 3 bhk flats in indirapuram ghaziabad still trade actively in pockets like Shakti Khand and Niti Khand. Run society-level checks on maintenance, OC, and the exact stack before you treat any average rate as yours.",
  },
  {
    question: "Are flats in Ghaziabad cheaper than Noida?",
    answer:
      "Often, on a per-square-foot basis, especially in mid-segment belts. The trade-off is belt choice: some Ghaziabad pockets save ticket size but add commute minutes. Compare like-for-like on all-in cost and drive time, not brochure BSP alone.",
  },
  {
    question: "What should I verify before I buy flat in Ghaziabad?",
    answer:
      "UP RERA on the official portal, builder delivery on completed phases, all-in ticket on your unit, and a peak-hour commute test. Ghaziabad has several micro-markets; a flat for sale in indirapuram ghaziabad and a Wave City launch do not behave the same at resale.",
  },
  {
    question: "Can Celeste Abode help shortlist property in Ghaziabad?",
    answer:
      "Yes. We work buyer-side across Ghaziabad belts and wider Delhi NCR. That means a written shortlist with reasons, all-in cost clarity, and site visits on projects that pass your checklist. We compare Indirapuram, Vaishali, NH-24, and Siddharth Vihar on your commute and hold period, not on whoever paid the channel fee.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function GhaziabadNeighborhoodsCtaPair({
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
      {renderCell(PROPERTIES_GHZ, "Properties in Ghaziabad", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function BestNeighborhoodsGhaziabadValueGrowth2026Content() {
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
            <a href="#why-belts" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why Ghaziabad is several markets in one city
            </a>
          </li>
          <li>
            <a href="#top-neighborhoods" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Best neighborhoods for value and growth
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Quick comparison table
            </a>
          </li>
          <li>
            <a href="#pick-belt" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How to pick your belt in 2026
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
          Ghaziabad is not one price chart. Indirapuram trades like a lived-in family market. Vaishali trades on metro
          and road access. The NH-24 belt trades on expressway stories and township scale. If you are hunting{" "}
          <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
            property in Ghaziabad
          </Link>{" "}
          for value and growth in 2026, start by naming the neighborhood that fits your commute and hold period. The
          brochure alone will not do that for you.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Value is a ticket you can defend at booking. Growth is a belt where infrastructure and end-user depth still
          have room to catch up with the story on the hoarding.
        </blockquote>
      </header>

      <section id="why-belts" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why Ghaziabad is several markets in one city
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Delhi–Meerut Expressway and RRTS have changed how buyers read east Ghaziabad. That does not mean every
            launch near the map line is fairly priced. Mature belts like Indirapuram reprice on society quality and
            resale churn. Corridor belts reprice when roads go live and families actually move in.
          </p>
          <p>
            Most of our Ghaziabad buyers start with one question: live now or hold five years? That answer splits{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            into two different shortlists. End users lean Indirapuram, Vaishali, and Vasundhara. Longer-hold buyers look
            at NH-24 townships and Siddharth Vihar with stricter builder and title checks.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={GHAZIABAD_VISUAL}
            alt="Best neighborhoods in Ghaziabad for value and growth: residential belts across east NCR"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Ghaziabad rewards belt choice: mature grids for end users, corridor townships for longer holds.
        </figcaption>
      </figure>

      <section id="top-neighborhoods" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Best neighborhoods in Ghaziabad for value and growth
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Five belts show up most often when buyers ask us where to look. Match the row to your brief before you fixate
          on a tower brand.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Indirapuram</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Still the deepest end-user market in Ghaziabad for many families. Schools, clinics, and resale listings are
            real here, not promised. If you want a{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flat for sale in indirapuram ghaziabad
            </Link>
            , compare societies inside the khand, not just the pin on the map. 3 BHK formats stay active where
            maintenance and OC depth support another family buying after you.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Vaishali and Vasundhara</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Strong picks when Delhi or Noida access matters daily. Vaishali feels established; Vasundhara often wins on
            ticket size for buyers who accept a sharper commute test. RRTS has added a fresh growth layer, but your
            route at 8 a.m. still matters more than a render of a future station.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. NH-24 and Wave City corridor</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            This is where growth buyers look when they want township scale and expressway access. Projects like{" "}
            <Link href={FOREST_WALK} className="font-medium text-[#CBB27A] hover:underline">
              Forest Walk Villa on NH-24
            </Link>
            ,{" "}
            <Link href={FUSION_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Fusion Vasundhara
            </Link>
            , and{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#CBB27A] hover:underline">
              Karyan on NH-24
            </Link>{" "}
            sit in the same broad story with very different product types. Read RERA and delivery before you pay for
            corridor hype alone.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">4. Siddharth Vihar</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            A newer grid for buyers who want premium mid-rise without crossing into core Noida tickets. Names like{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner in Siddharth Vihar
            </Link>{" "}
            show the kind of product landing here. Growth is plausible if connectivity keeps improving and early phases
            deliver on time.
          </p>
        </article>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Ghaziabad neighborhoods at a glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this table to sanity-check a salesperson&apos;s pitch against the belt you actually need.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Neighborhood</th>
                <th className="px-4 py-3 font-medium">Best for</th>
                <th className="px-4 py-3 font-medium">Value / growth read</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {NEIGHBORHOOD_ROWS.map((row, i) => (
                <tr
                  key={row.area}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.area}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.bestFor}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.valueNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={CORRIDOR_VISUAL}
            alt="NH-24 Ghaziabad corridor and connectivity driving neighborhood growth in 2026"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          NH-24 and RRTS changed the map. Your commute test still decides whether a belt fits.
        </figcaption>
      </figure>

      <section id="pick-belt" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How to pick your Ghaziabad belt in 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Write down three facts before you book: where you work, how long you can hold, and whether you need resale
            depth in three years. Indirapuram wins the third test more often than a fresh township still filling its
            first towers. NH-24 wins when you want space and can wait through build cycles.
          </p>
          <p>
            Then compare real stacks. Browse{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flat in ghaziabad for sale
            </Link>{" "}
            options by belt, or book a{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              free consultation
            </Link>{" "}
            and we will narrow neighborhoods before the first site visit. If you also want{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              3 bhk flats in indirapuram ghaziabad
            </Link>
            , say so upfront. We will not waste your Saturday on belts that fail your ticket or commute.
          </p>
        </div>
      </section>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy in Ghaziabad
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Ghaziabad rewards discipline. Celeste Abode works buyer-side as a real estate consultant in Delhi NCR with
            daily depth across Indirapuram, Vaishali, Vasundhara, NH-24, and Siddharth Vihar. We compare projects on
            your brief, spell out the all-in ticket, and flag delivery or paperwork gaps before you token.
          </p>
          <p>
            That usually means a short discovery call, a tight written shortlist, and site visits only where the belt
            and stack still make sense after basic checks. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if you already have two towers in mind and want them read against the neighborhood reality, not the launch
            deck.
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
                Pick a Ghaziabad belt, compare a few stacks, and book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <GhaziabadNeighborhoodsCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={bestNeighborhoodsGhaziabadFaqSchemaItems} />
      </section>
    </div>
  );
}
