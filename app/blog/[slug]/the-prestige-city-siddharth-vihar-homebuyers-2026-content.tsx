import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const PROPERTIES_GHZ = "/properties-in-ghaziabad";
const FLATS_GHZ = "/flats-in-ghaziabad";
const PRESTIGE_CITY = "/properties-in-ghaziabad/the-prestige-city-indirapuram-extension-nh24-ghaziabad";
const SG_NAKSHATRA = "/properties-in-ghaziabad/sg-nakshatra-siddharth-vihar-nh24-ghaziabad";
const AU_COSMOS = "/properties-in-ghaziabad/au-cosmos-corner-siddharth-vihar-ghaziabad";
const KARYAN_NH24 = "/properties-in-ghaziabad/karyan-nh24-ghaziabad";

const VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/PRESTIGE%20CITY%20BLOG/prestigeblog1.webp";

const VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog_siddarthvihar_connectivity/siddarthvihar_3.webp";

const VISUAL_3 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/PRESTIGE%20CITY%20BLOG/prestigeblog2.webp";

const COMPARE_ROWS: { point: string; helps: string; wait: string }[] = [
  {
    point: "What you are buying",
    helps:
      "Prestige Group's first large NCR township on NH-24. About 62.5 acres as marketed. 2, 3 and 4 BHK, plus larger family and penthouse plans. A full township, not a one-tower fill-in.",
    wait:
      "You buy early, while the township is still rising. That early entry is what a longer-run return is built on. Handover is a few years out, as marketed around late 2029.",
  },
  {
    point: "Who it fits",
    helps:
      "Homebuyers who want a Prestige address on the Siddharth Vihar / NH-24 corridor, and investors who can hold through construction. Families who want 3 or 4 BHK in a large new township.",
    wait:
      "If you need keys this year, we also show ready Ghaziabad stock. Prestige stays the 2026 shortlist for people playing a longer run.",
  },
  {
    point: "Return over a longer run",
    helps:
      "NH-24, Delhi-Meerut Expressway, Namo Bharat since February 2026, and a national builder entering NCR at this scale. That mix is why patient money looks here.",
    wait:
      "Return is not overnight rent. You hold while the township fills, then you have a Prestige home on a highway more buyers already use.",
  },
  {
    point: "Price",
    helps:
      "2 BHK is the entry size on many lists. 3 BHK is the plan most families walk. We price the actual tower and floor so your EMI matches the unit, not a portal average.",
    wait:
      "Add GST, parking, and PLC to the brochure line. Stamp duty hits at registry. That is normal for a new township, not a catch.",
  },
  {
    point: "Same highway",
    helps:
      "The Prestige City sits on the NH-24 growth stretch buyers already search as Siddharth Vihar. SG Nakshatra, AU Cosmos Corner, and Karyan sit on the same road if you want a second compare.",
    wait:
      "Drive the Prestige gate at office hour. The commute is a strength of this belt. Time it once so the hold feels real.",
  },
];

export const prestigeCitySiddharthViharHomebuyers2026FaqSchemaItems: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Is The Prestige City in Siddharth Vihar?",
    answer:
      "Yes in the way buyers mean it. The Prestige City sits on the NH-24 corridor people already search as Siddharth Vihar, with the listing at Indirapuram Extension. Same growth stretch. A Prestige township on that highway is the product.",
  },
  {
    question: "Is The Prestige City the right choice for homebuyers in 2026?",
    answer:
      "Yes for homebuyers who want a Prestige township on NH-24 and a return over a longer run. You buy while the township is still rising. If you need keys this year, we show ready Ghaziabad homes as well. Prestige remains the 2026 shortlist for the patient buyer.",
  },
  {
    question: "Is The Prestige City good for ROI?",
    answer:
      "That is the main case. A national builder, a 62.5-acre township, and NH-24 with Namo Bharat already running. ROI here is a hold of several years, not a flip before keys. Returns are never guaranteed on any project. The setup is built for people who can wait.",
  },
  {
    question: "What configurations does The Prestige City offer?",
    answer:
      "As marketed: 2, 3 and 4 BHK, with larger home-office and penthouse plans. Compact 2 BHK starts around 1,300 sq ft on public lists. Family 3 and 4 BHK is what most buyers walk. We take you through the actual plan.",
  },
  {
    question: "What is the price of The Prestige City in 2026?",
    answer:
      "Quotes move by tower, floor, and phase. We price the unit you will own and add GST, parking, and PLC so the EMI is real. That is how you protect the longer-run return, not by chasing the lowest line on a portal.",
  },
  {
    question: "When is possession at The Prestige City?",
    answer:
      "The township is under construction. Marketed handover has sat around late 2029. That wait is the early-entry window. We read the current possession file with you before you book.",
  },
  {
    question: "How does The Prestige City compare with SG Nakshatra?",
    answer:
      "Both sit on NH-24. The Prestige City is the large Prestige township. SG Nakshatra is a Siddharth Vihar 3 and 4 BHK high-rise, pre-launch from about ₹8,899 per sq ft plus PLC and GST. Many buyers tour both. Prestige is the township play. Nakshatra is the compact high-rise on the same road.",
  },
  {
    question: "Is The Prestige City RERA registered?",
    answer:
      "Celeste Abode handles the RERA file for the tower and phase you are buying. You do not chase a portal. We match the registration to the inventory so the long hold starts clean.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function PrestigeCitySiddharthViharHomebuyers2026CtaPair({
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

export function PrestigeCitySiddharthViharHomebuyers2026Content() {
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
            <a href="#prestige-siddharth" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              The Prestige City Siddharth Vihar
            </a>
          </li>
          <li>
            <a href="#prestige-ghaziabad" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              The Prestige City Ghaziabad
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why It Works For A Longer Run
            </a>
          </li>
          <li>
            <a href="#right-choice-2026" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Is The Prestige City the Right Choice for Homebuyers in 2026
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How We Help
            </a>
          </li>
          <li>
            <a href="#faq" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Questions People Actually Ask
            </a>
          </li>
        </ol>
      </nav>

      <section id="lead" className="scroll-mt-24 mb-12">
        <p className="text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Homebuyers keep typing The Prestige City Siddharth Vihar into the search bar. They want a Prestige home on
          NH-24, and they want to know if 2026 is the year to book.
        </p>
        <blockquote className="my-8 border-l-4 border-[#CBB27A] bg-gray-50 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The Prestige City is for people who want return over a longer run. You buy the township early. The highway
          and the brand do the rest of the work.
        </blockquote>
        <p className="text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Short answer: yes. It is the right 2026 choice if you want a Prestige township on the Siddharth Vihar /
          NH-24 corridor and you can hold through construction. That wait is the ROI story, not a flaw. Start from{" "}
          <Link href={PRESTIGE_CITY} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
            The Prestige City
          </Link>
          . We will walk the plan, the payment, and the papers with you.
        </p>
      </section>

      <section id="prestige-siddharth" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          The Prestige City Siddharth Vihar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The Prestige City Siddharth Vihar is how buyers name this project, and they are not wrong about the
            stretch. It sits on NH-24, the same growth corridor as Siddharth Vihar, with the listing at Indirapuram
            Extension. You get a Prestige Group township on the highway Delhi, Ghaziabad, and Noida commuters already
            use.
          </p>
          <p>
            Prestige is a national builder. This is their first housing of this scale in Delhi NCR. The site is about
            62.5 acres as marketed. Plans run 2, 3 and 4 BHK, with larger home-office and penthouse options. Compact 2
            BHK starts around 1,300 sq ft on public lists. Family 3 and 4 BHK is the size most people actually walk.
            That mix is why both end users and longer-run investors shortlist it in 2026.
          </p>
          <p>
            The same highway also has{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              SG Nakshatra
            </Link>{" "}
            and{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              AU Cosmos Corner
            </Link>
            . Those are useful compares. Prestige is the township play: more land, more plans, a brand NCR did not have
            at this scale until now. Tour Prestige first if that is the home you want.
          </p>
        </div>
      </section>

      <figure className="my-12 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_1}
            alt="The Prestige City gate on NH-24 Ghaziabad, towers under construction along the Siddharth Vihar corridor"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Prestige Group on NH-24. A full township on the Siddharth Vihar corridor, built for a longer hold.
        </figcaption>
      </figure>

      <section id="prestige-ghaziabad" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          The Prestige City Ghaziabad
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The Prestige City Ghaziabad is an east Ghaziabad buy on NH-24. That is a real commute into Delhi, Meerut,
            and Noida. Drive the gate at 9 a.m. once. Most buyers who already use this road like what they see.
          </p>
          <p>
            You are buying a new township, not a 15-year-old society. That is the upside. Fresh plans, club and open
            space at township scale, and a builder with a long track record outside NCR. Daily life will grow in as
            the towers finish. That is how every large new address in this city has worked.
          </p>
          <p>
            Namo Bharat has been running on the Delhi-Ghaziabad-Meerut line since February 2026. Shaheed Sthal metro is
            the Red Line people use from this side, with a short road hop. Put that next to NH-24 and you have a
            corridor that more of NCR will keep using. That is the location case for a longer hold.
          </p>
          <p>
            See{" "}
            <Link href={PROPERTIES_GHZ} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              Properties in Ghaziabad
            </Link>{" "}
            and{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            for the rest of the city.{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              Karyan on NH-24
            </Link>{" "}
            is a useful second look if you want a smaller plan on the same highway. Prestige stays the township
            shortlist.
          </p>
        </div>
      </section>

      <figure className="my-12 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_2}
            alt="NH-24 Ghaziabad commute around The Prestige City and Siddharth Vihar"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          NH-24, Namo Bharat, and a Prestige township. Time the gate once. The commute is why this corridor holds value.
        </figcaption>
      </figure>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why It Works For A Longer Run
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Read this as a 2026 homebuyer sheet. The hold is the product.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm text-gray-700">
            <thead className="bg-[#0f1112] text-xs font-semibold uppercase tracking-wide text-white">
              <tr>
                <th className="px-4 py-3">Point</th>
                <th className="px-4 py-3">What Helps</th>
                <th className="px-4 py-3">How The Hold Works</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.point} className="border-t border-gray-200 odd:bg-white even:bg-gray-50/80">
                  <td className="px-4 py-3 align-top font-semibold text-gray-900">{row.point}</td>
                  <td className="px-4 py-3 align-top">{row.helps}</td>
                  <td className="px-4 py-3 align-top">{row.wait}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="right-choice-2026" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Is The Prestige City the Right Choice for Homebuyers in 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Yes. For 2026 homebuyers who want a Prestige address and a return over a longer run, The Prestige City is
            the right shortlist. Prestige did not have this NCR footprint before. You get scale, NH-24, and a name
            people already trust from other cities, at an entry that still belongs to a rising township.
          </p>
          <p>
            That is how the ROI works. You book while towers are still going up. You pay GST like any under-construction
            home. You take keys when the file says you take keys. By then the highway, the metro hop, and the township
            amenities are the story a later buyer pays for. No one can promise a number. The setup is built for people
            who can wait a few years.
          </p>
          <p>
            It also works as a home. 3 and 4 BHK plans, a large site, and a builder used to delivering townships. If
            you need keys this calendar year, we will show ready Ghaziabad inventory in the same conversation. Prestige
            stays the 2026 buy for the longer clock.
          </p>
          <p>
            We treat RERA as our job. We read the registration for the phase and tower you are actually buying. You do
            not get sent to a government portal to figure it out. Clean papers are how a long hold should start.
          </p>
        </div>
      </section>

      <figure className="my-12 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_3}
            alt="The Prestige City Siddharth Vihar: Prestige township on NH-24 Ghaziabad"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Book early, hold through construction, live in a Prestige township on NH-24. That is the 2026 case.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How We Help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            We work for the buyer in Ghaziabad. You tell us the commute, the budget, and whether The Prestige City is
            a home, a longer-run hold, or both. We walk the plans, the payment, and the RERA file, then take you to the
            site.
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
                Tell us office, budget, and 2, 3 or 4 BHK. We will take you through The Prestige City on NH-24.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <PrestigeCitySiddharthViharHomebuyers2026CtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions People Actually Ask
        </h2>
        <SobhaRivanaFaqAccordion items={prestigeCitySiddharthViharHomebuyers2026FaqSchemaItems} />
      </section>
    </div>
  );
}
