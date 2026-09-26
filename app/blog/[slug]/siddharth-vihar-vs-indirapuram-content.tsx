import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_GHZ = "/properties-in-ghaziabad";
const FLATS_GHZ = "/flats-in-ghaziabad";
const AU_COSMOS = "/properties-in-ghaziabad/au-cosmos-corner-siddharth-vihar-ghaziabad";
const SG_NAKSHATRA = "/properties-in-ghaziabad/sg-nakshatra-siddharth-vihar-nh24-ghaziabad";
const PRESTIGE_CITY = "/properties-in-ghaziabad/the-prestige-city-indirapuram-extension-nh24-ghaziabad";
const FUSION_VASUNDHARA = "/properties-in-ghaziabad/fusion-vasundhara";
const PERIGON_VASUNDHARA = "/properties-in-ghaziabad/perigon-vasundhara";
const KARYAN_NH24 = "/properties-in-ghaziabad/karyan-nh24-ghaziabad";
const KARYAN_TREVANA = "/properties-in-ghaziabad/karyan-trevana-residences-nh24-ghaziabad";
const FOREST_WALK = "/properties-in-ghaziabad/forest-walk-villa";

const HERO_COMPARE_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog%20Siddharth%20Vihar%20vs%20Indirapuram/Siddharth%20Vihar%20vs%20Indirapuram3.webp";

const CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog%20Siddharth%20Vihar%20vs%20Indirapuram/Siddharth%20Vihar%20vs%20Indirapuram2.webp";

const NH24_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog%20Siddharth%20Vihar%20vs%20Indirapuram/Siddharth%20Vihar%20vs%20Indirapuram1.webp";

const COMPARE_ROWS: {
  point: string;
  siddharth: string;
  indirapuram: string;
}[] = [
  {
    point: "Home you buy",
    siddharth: "Mostly new 3 and 4 BHK towers. Club, parking, lifts are new. Many projects are still building.",
    indirapuram: "Mostly ready 2 and 3 BHK in older societies. Shops and schools are already next door. New launches sit on Indirapuram Extension, not in the old khands.",
  },
  {
    point: "What people are quoting (2026)",
    siddharth: "Portal asking around ₹9,800 per sq ft. Listings run from the mid-₹7,000s to about ₹12,000.",
    indirapuram: "Portal asking around ₹10,500 per sq ft for high-rise. A good resale in Shakti Khand or Niti Khand can still cost more than a new tower nearby.",
  },
  {
    point: "Morning and evening",
    siddharth: "Quieter inside the project, wider roads, newer club living. Daily shops are growing around the new towers.",
    indirapuram: "Kirana, tuition, and chemist are already in the lanes. Peak hour on the main roads is slower.",
  },
  {
    point: "Office",
    siddharth: "Strong on the Delhi-Meerut Expressway and NH-24. Good for Delhi, Meerut side, and many Noida trips. Shaheed Sthal metro is a few kilometres.",
    indirapuram: "Usually shorter to Noida Sector 62-63 and Blue Line. You still deal with inner-road traffic.",
  },
  {
    point: "Invest vs live-now",
    siddharth: "Lower entry than Indirapuram, newer product, expressway location. Better if you can hold through handover.",
    indirapuram: "Deeper ready stock and rental demand today. Better if you need keys this year.",
  },
  {
    point: "Buy this if",
    siddharth: "You want a new 3 or 4 BHK, or you are buying to hold for a few years.",
    indirapuram: "You want to move in now, with schools and shops already next door.",
  },
];

export const siddharthViharVsIndirapuramFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Which is better to live in, Siddharth Vihar or Indirapuram?",
    answer:
      "Indirapuram if you want schools, a chemist, and a home this year. Siddharth Vihar if you want a newer tower, quieter internals, and an expressway address. Both work. Your office and your move-in date decide which one fits.",
  },
  {
    question: "I work in Noida Sector 62. Should I buy in Siddharth Vihar or Indirapuram?",
    answer:
      "Both can work. Indirapuram is often a shorter inner last mile to 62-63 and Blue Line. Siddharth Vihar is strong if you use the Delhi-Meerut Expressway, and many Noida trips still sit in a similar time band. Do one 9 a.m. drive from each gate before you book. Sunday Google Maps is not the same trip.",
  },
  {
    question: "Is Siddharth Vihar cheaper than Indirapuram in 2026?",
    answer:
      "On asking rates, Siddharth Vihar high-rise is near ₹9,800 per sq ft and Indirapuram near ₹10,500. That lower entry is one reason people buy Siddharth Vihar to hold. Still check the unit: parking, GST on under-construction, and possession date change the all-in number.",
  },
  {
    question: "Will I get a ready flat or will I wait for construction?",
    answer:
      "Indirapuram has more ready and resale 2 and 3 BHK, especially in Shakti Khand and Niti Khand. Siddharth Vihar has more new 3 and 4 BHK, including projects that are building now. That new stock is the investment story: you buy a current product on the expressway, not a 15-year-old floor. Indirapuram Extension on NH-24 is also a new project buy, even if the name says Indirapuram.",
  },
  {
    question: "Is there metro in Siddharth Vihar like Indirapuram?",
    answer:
      "Shaheed Sthal on the Red Line is about 5 km from Siddharth Vihar, so you plan an auto or car for metro days. Indirapuram sits closer to Blue Line. Siddharth Vihar’s daily strength is the 14-lane expressway and NH-24, which is what a lot of Delhi and Noida commuters actually use. Namo Bharat has been running on the Delhi-Ghaziabad-Meerut line since February 2026, which helps the whole belt.",
  },
  {
    question: "Is Indirapuram Extension the same as living in Indirapuram?",
    answer:
      "No. Extension is new supply on NH-24. It does not live like Niti Khand. The Prestige City is the big project we show when someone wants that mix. If you want Siddharth Vihar itself, look at SG Nakshatra and AU Cosmos Corner and compare possession dates, not just the brochure name.",
  },
  {
    question: "Should I look at Vasundhara instead?",
    answer:
      "Some buyers add Vasundhara when they want another east Ghaziabad option. Fusion Vasundhara and Perigon Vasundhara are the two we currently list there. Drive to office from that gate as well. It is another area, not a replacement for Siddharth Vihar or Indirapuram.",
  },
  {
    question: "Is Siddharth Vihar good for investment?",
    answer:
      "Yes, for buyers who can hold a few years. You get a newer 3 or 4 BHK, expressway access, and a lower entry than much of Indirapuram. Asking rates here have moved up with the rest of east Ghaziabad. Pick the project on possession and builder delivery, the same way you would anywhere else. We shortlist SG Nakshatra and AU Cosmos Corner when that is the search.",
  },
  {
    question: "Can you shortlist both areas for my budget?",
    answer:
      "Yes. Tell us where you work, your all-in budget, and when you need keys. We put both locations on one sheet, check the project papers, and take you only to sites that still make sense. You decide after the visit.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function SiddharthViharVsIndirapuramCtaPair({
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

export function SiddharthViharVsIndirapuramPropertyRequirementsContent() {
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
            <a href="#two-pockets" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How each area actually lives
            </a>
          </li>
          <li>
            <a href="#prices-product" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Price and the home you get
            </a>
          </li>
          <li>
            <a href="#daily-commute" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Office, school, weekends
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Side-by-side table
            </a>
          </li>
          <li>
            <a href="#who-fits" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              So which one should you buy?
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How we help
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
          A lot of buyers end up on the same call with us: Siddharth Vihar vs Indirapuram. Both are in east Ghaziabad.
          Both sit off NH-24. They just do different jobs. Indirapuram is the ready city: societies, schools, chemist
          downstairs. Siddharth Vihar is the newer expressway side: fresh 3 and 4 BHK towers, a lower entry rate, and
          a stronger hold if you are buying to invest. This is written so you pick the right one, whether you live here,
          commute out, or buy to hold.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Indirapuram if you want to live like the area is already built. Siddharth Vihar if you want a new home on
          the expressway and you are open to holding it. Both are real buys.
        </blockquote>
      </header>

      <section id="two-pockets" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How each area actually lives
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Indirapuram is the older, filled-in side. Shakti Khand and Niti Khand already have people in the buildings,
            tuition in the lanes, and a resale market you can search. Families come here when they want a{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flat in Ghaziabad
            </Link>{" "}
            they can use without hoping a new market will show up later. Traffic on school-run hours is real. So is
            walking out for milk instead of taking the car.
          </p>
          <p>
            Siddharth Vihar is the newer stretch east of the Hindon, on the 14-lane Delhi-Meerut Expressway. Towers are
            newer, internal roads are wider, and nights are quieter. That is why a lot of buyers use it for investment:
            you enter below Indirapuram rates, you get a current 3 or 4 BHK, and the highway is already there. Shops
            and daily retail are filling in with the new projects. You still have Indirapuram and Noida next door for
            a mall or a specialist clinic. That is proximity, not a problem.
          </p>
          <p>
            One more mix-up: Indirapuram Extension on NH-24. It uses the Indirapuram name, but it lives more like a new
            project on the highway.{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>{" "}
            is the large one we show when someone wants that mix. Drive that gate at office time. Do not assume it
            feels like Niti Khand because the board says Indirapuram.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={HERO_COMPARE_VISUAL}
            alt="Siddharth Vihar vs Indirapuram: newer towers and metro on one side, settled neighbourhood on the other"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Indirapuram is the ready side. Siddharth Vihar is the newer expressway side. Both are east Ghaziabad buys.
        </figcaption>
      </figure>

      <section id="prices-product" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Property in Siddharth Vihar vs Indirapuram: price and the home you get
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            On 2026 portal asking rates, Siddharth Vihar high-rise is near ₹9,800 per sq ft. Indirapuram is near
            ₹10,500. That gap is why many people buy Siddharth Vihar to hold. You get a newer flat for less than a
            comparable Indirapuram high-rise, as long as you are fine with the possession timeline. Always add parking
            and GST on under-construction before you call it cheaper.
          </p>
          <p>
            The homes themselves are different. Siddharth Vihar has more new 3 and 4 BHK towers.{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>{" "}
            on NH-24 and{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner
            </Link>{" "}
            are two we put on that list. Read possession and the full cost before you book. Indirapuram still leads on
            ready 2 and 3 BHK if you need to move in this year. People usually start in Shakti Khand or Niti Khand,
            then walk the society for parking, lifts, and maintenance. A portal photo is not enough in either area.
          </p>
          <p>
            If you need keys this year, start with{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            and pick by society, not by average rate. A new launch on Indirapuram Extension is not the same product as
            a 15-year-old khand, even when both say Indirapuram. Some buyers also look at Vasundhara as a third east
            Ghaziabad option.{" "}
            <Link href={FUSION_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Fusion Vasundhara
            </Link>{" "}
            and{" "}
            <Link href={PERIGON_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Perigon Vasundhara
            </Link>{" "}
            are the two we currently list there. See them after you have decided the main compare, not instead of it.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={CORRIDOR_VISUAL}
            alt="Siddharth Vihar vs Indirapuram split: tree-lined streets beside a metro and high-rise corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Both use NH-24. The 9 a.m. drive from the actual gate still decides it.
        </figcaption>
      </figure>

      <section id="daily-commute" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Office, school, and weekends
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            If you work in Noida Sector 62 or 63, both areas can work. Indirapuram is often a shorter inner run to Blue
            Line. Siddharth Vihar is stronger on the expressway: Delhi, Meerut side, NH-9, and many Noida trips that
            already use NH-24. Shaheed Sthal metro is about 5 km, so metro days need an auto or car. That is normal for
            this belt. A Tuesday 9 a.m. drive from the tower gate is still the honest test. Sunday Maps can look
            faster than a working day.
          </p>
          <p>
            Namo Bharat on the Delhi-Ghaziabad-Meerut line has been running since February 2026, which helps this
            whole side of Ghaziabad. Weekdays in Indirapuram already have kirana, tuition, hospital, and mall in the
            routine. Siddharth Vihar is calmer inside the project, and daily retail is growing with the new towers.
            You are next to Indirapuram, not cut off from it. If you want a villa on the same highway instead of a
            high-rise, look at{" "}
            <Link href={FOREST_WALK} className="font-medium text-[#CBB27A] hover:underline">
              Forest Walk Villa
            </Link>
            ,{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#CBB27A] hover:underline">
              Karyan on NH-24
            </Link>
            , or{" "}
            <Link href={KARYAN_TREVANA} className="font-medium text-[#CBB27A] hover:underline">
              Karyan Trevana
            </Link>
            . Different home. Same office-hour test.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Siddharth Vihar vs Indirapuram at a glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Keep this when someone tries to sell both as one east Ghaziabad story.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Point</th>
                <th className="px-4 py-3 font-medium">Siddharth Vihar</th>
                <th className="px-4 py-3 font-medium">Indirapuram</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.point}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.point}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.siddharth}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.indirapuram}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NH24_VISUAL}
            alt="Siddharth Vihar vs Indirapuram: older mid-rise streets beside a highway, metro, and new towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          A new project on NH-24 is not the same as a ready khand in Indirapuram. Price the gate you will actually use.
        </figcaption>
      </figure>

      <section id="who-fits" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          So which one should you buy?
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
          Choose Indirapuram if you need to move in now and you want schools and shops already around you. Choose
          Siddharth Vihar if you want a new 3 or 4 BHK, a lower entry, and you can hold through handover. That is also
          the investment case here. Choose Indirapuram Extension if you like the highway and a large new township.
          Flats in Siddharth Vihar vs Indirapuram are easier to judge if you put two real options on one sheet: one
          ready home, one new tower, same budget, same office.
          </p>
          <p>
            Before the visit, write where you work, when you need keys, and your all-in number including registration.
            Then{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            and we will match both areas to that, or start from{" "}
            <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              properties in Ghaziabad
            </Link>{" "}
            if you already know which side you lean.
          </p>
        </div>
      </section>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How we help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            We work for the buyer in Ghaziabad, not for the loudest launch. You tell us the commute and the budget. We
            check papers and possession on the projects you like, and we only take you to sites that still make sense.
            See{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            if you want what the call covers.
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
                Tell us office, budget, and when you need keys. We will only take you to sites that still fit.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <SiddharthViharVsIndirapuramCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions people actually ask
        </h2>
        <SobhaRivanaFaqAccordion items={siddharthViharVsIndirapuramFaqSchemaItems} />
      </section>
    </div>
  );
}
