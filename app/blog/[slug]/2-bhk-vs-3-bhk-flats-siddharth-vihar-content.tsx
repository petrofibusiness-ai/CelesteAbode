import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const PROPERTIES_GHZ = "/properties-in-ghaziabad";
const FLATS_GHZ = "/flats-in-ghaziabad";
const AU_COSMOS = "/properties-in-ghaziabad/au-cosmos-corner-siddharth-vihar-ghaziabad";
const SG_NAKSHATRA = "/properties-in-ghaziabad/sg-nakshatra-siddharth-vihar-nh24-ghaziabad";
const PRESTIGE_CITY = "/properties-in-ghaziabad/the-prestige-city-indirapuram-extension-nh24-ghaziabad";
const KARYAN_NH24 = "/properties-in-ghaziabad/karyan-nh24-ghaziabad";

const VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%202%20BHK%20vs%203%20BHK%20Flats%20in%20Siddharth%20Vihar%3A/2%20BHK%20vs%203%20BHK%20Flats%20in%20Siddharth%20Vihar_1.webp";

const VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%202%20BHK%20vs%203%20BHK%20Flats%20in%20Siddharth%20Vihar%3A/2%20BHK%20vs%203%20BHK%20Flats%20in%20Siddharth%20Vihar_2.webp";

const VISUAL_3 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%202%20BHK%20vs%203%20BHK%20Flats%20in%20Siddharth%20Vihar%3A/2%20BHK%20vs%203%20BHK%20Flats%20in%20Siddharth%20Vihar_3.webp";

const COMPARE_ROWS: { point: string; two: string; three: string }[] = [
  {
    point: "What you actually get",
    two: "Two bedrooms. Fine for a couple, a small family, or a locked rental. Storage and a work corner get tight fast.",
    three: "Three bedrooms. Room for parents, a child, or a desk that is not in the living room. This is the size most new towers here are built around.",
  },
  {
    point: "Ticket and EMI",
    two: "Lower all-in. Lower stamp duty and monthly outgo. Easier if this is a first home or you want cash left after the booking.",
    three: "Higher ticket. In this belt the extra room often costs less than the same jump in central Noida. Still add parking, GST on under-construction, and society charges.",
  },
  {
    point: "What is on the ground (2026)",
    two: "Thinner in new Siddharth Vihar launches. Some inventory and nearby NH-24 compact units exist. Ready 2 BHK is easier in older east Ghaziabad societies.",
    three: "The main product. SG Nakshatra is the 3 and 4 BHK we tour first. Portal asking for Siddharth Vihar high-rise sits near ₹9,800 per sq ft.",
  },
  {
    point: "Rent",
    two: "Easier tenant: couple or two professionals. Yield can look better on a smaller ticket if the society is live.",
    three: "Family tenants, longer stays. Vacancy can last if you overprice. Price the unit against real comps, not the brochure.",
  },
  {
    point: "Resale in this pocket",
    two: "Works if the tower has other 2 BHKs. Harder if every neighbour bought 3 and 4 BHK and you are the odd floor.",
    three: "Deeper buyer pool for families who want a new home on the expressway. Possession date and builder delivery still decide the next sale.",
  },
  {
    point: "Buy this if",
    two: "EMI is the limit, you are two people, or the flat is mainly a rent play.",
    three: "You will live here, someone works from home, or you want the size this market actually trades.",
  },
];

export const twoVsThreeBhkSiddharthViharFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Which is better, 2 BHK or 3 BHK flats in Siddharth Vihar?",
    answer:
      "3 BHK if you will live in the home or hold a family-size unit on the expressway. 2 BHK if EMI and a smaller ticket come first. Siddharth Vihar new stock is heavier on 3 and 4 BHK, so check live inventory before you decide the size in your head.",
  },
  {
    question: "Are there 2 BHK flats in Siddharth Vihar?",
    answer:
      "Yes, but they are not the bulk of new launches. SG Nakshatra is 3 and 4 BHK, so do not hunt a 2 BHK there. We still search Siddharth Vihar first, then show nearby NH-24 compact units so you compare real plans, not a guess.",
  },
  {
    question: "How much is a 3 BHK in Siddharth Vihar in 2026?",
    answer:
      "Portal asking for Siddharth Vihar high-rise is near ₹9,800 per sq ft, with listings from the mid-₹7,000s to about ₹12,000. SG Nakshatra quotes from about ₹8,899 per sq ft before PLC and GST, with 3 BHK around 2,225 and 2,450 sq ft. Your all-in number needs parking and taxes. We price the actual stack, not the average.",
  },
  {
    question: "Is a 3 BHK in Siddharth Vihar good for investment?",
    answer:
      "Yes for a hold of a few years, if possession and the builder hold up. SG Nakshatra is the Siddharth Vihar 3 and 4 BHK we shortlist for that hold. The Prestige City is the large new township on Indirapuram Extension, same highway, different pin. Returns are not guaranteed on every tower.",
  },
  {
    question: "2 BHK vs 3 BHK for a family in Siddharth Vihar?",
    answer:
      "Most families use 3 BHK. A child, a parent, or a desk needs a door. 2 BHK works for two people who do not need a third room. Walk the plan. Carpet and balcony change how those rooms feel.",
  },
  {
    question: "Should I buy a 2 BHK in Indirapuram instead of Siddharth Vihar?",
    answer:
      "Only if you need a ready 2 BHK this year and you want shops already in the lanes. That is a different product, not a better version of Siddharth Vihar. If you want a new tower and the expressway, stay on this side and match the size to budget.",
  },
  {
    question: "What size is a 3 BHK in Siddharth Vihar?",
    answer:
      "It depends on the project. SG Nakshatra 3 BHK plans sit around 2,225 and 2,450 sq ft, with 4 BHK at about 3,200 sq ft. The Prestige City is a different mix on Indirapuram Extension. Compare carpet and the gate, not just BHK on the hoarding.",
  },
  {
    question: "Can you shortlist both 2 BHK and 3 BHK for my budget?",
    answer:
      "Yes. Tell us office, all-in budget, and when you need keys. We put SG Nakshatra 3 BHK against compact NH-24 units, and The Prestige City if you want a township on the same highway. You decide after the visit.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function TwoVsThreeBhkSiddharthViharCtaPair({
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

export function TwoVsThreeBhkFlatsSiddharthViharContent() {
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
            <a href="#two-bhk" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              2 BHK Flats in Siddharth Vihar
            </a>
          </li>
          <li>
            <a href="#three-bhk" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              3 BHK Flats in Siddharth Vihar
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Side by Side Table
            </a>
          </li>
          <li>
            <a href="#flats-ghz" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Flats in Siddharth Vihar Ghaziabad
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

      <header className="mb-12 scroll-mt-24" id="lead">
        <p className="text-lg leading-[1.75] text-gray-700 md:text-xl">
          Most people who call us on Siddharth Vihar are not choosing a pin on a map. They are stuck on size. 2 BHK vs
          3 BHK flats in Siddharth Vihar sounds simple. It is not. New towers here lean toward 3 and 4 BHK. A 2 BHK
          can still be the right buy if the EMI has to stay small. This page is for people who live in Ghaziabad, commute
          to Delhi or Noida, or buy to hold. Pick the rooms you will use, not the floor plan that photographs well.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          2 BHK if the ticket has to stay tight. 3 BHK if you will live here or you want the size this market actually
          sells. Walk both plans from the same gate.
        </blockquote>
      </header>

      <section id="two-bhk" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          2 BHK Flats in Siddharth Vihar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            2 BHK flats in Siddharth Vihar exist, but they are not the default new launch. A lot of current high-rise
            here starts at 3 BHK. That does not make 2 BHK a bad idea. It means you should ask for live inventory, not
            assume every tower has a compact stack. If the unit is real, a 2 BHK is the cleaner path for two people, a
            first home, or a rent play where EMI has to stay in a band.
          </p>
          <p>
            What you give up is obvious. One less door. Less storage. A work desk often lands in the living room. What
            you keep is cash after booking, lower stamp duty, and a tenant who is easier to find than a family that
            wants three bedrooms. Maintenance still follows carpet, so a badly planned 2 BHK in a heavy society is not
            automatically cheap to hold.
          </p>
          <p>
            If the Siddharth Vihar 2 BHK you like is gone, do not force a compact unit into{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>
            . That project is 3 and 4 BHK. We still keep you on this highway.{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#CBB27A] hover:underline">
              Karyan on NH-24
            </Link>{" "}
            lists 2 BHK, 2 BHK + study, and 3 BHK in a 1,000 to 1,400 sq ft band.{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>{" "}
            is the large township on Indirapuram Extension. Same NH-24, different pin. Drive that gate at office hour
            the same way you would Siddharth Vihar.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_1}
            alt="2 BHK vs 3 BHK flats in Siddharth Vihar: east Ghaziabad towers beside the expressway"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Compact 2 BHK if the EMI is the limit. 3 BHK if you need a third room on this expressway.
        </figcaption>
      </figure>

      <section id="three-bhk" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          3 BHK Flats in Siddharth Vihar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            3 BHK flats in Siddharth Vihar are the size most new buyers actually tour. Families want a third room.
            Investors want the product this pocket resells.{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>{" "}
            on NH-24 puts 3 BHK at about 2,225 and 2,450 sq ft, with 4 BHK near 3,200 sq ft, from about ₹8,899 per sq
            ft before PLC and GST.{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner
            </Link>{" "}
            is the other Siddharth Vihar name we put on the same shortlist. If you want a large new township on this
            highway instead of a Siddharth Vihar tower,{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>{" "}
            on Indirapuram Extension is the one we show. Read possession and the full cost, not only the BHK label.
          </p>
          <p>
            Portal asking for Siddharth Vihar high-rise in 2026 sits near ₹9,800 per sq ft. Listings run from the
            mid-₹7,000s to about ₹12,000. That is still often below Indirapuram high-rise asking near ₹10,500. The 3
            BHK wins on space if you will live here. It wins on resale if the next buyer is a family who wants a new
            tower and the Delhi-Meerut Expressway. It loses if you stretch the EMI so far that one delay on possession
            hurts.
          </p>
          <p>
            Office trips from this belt work for Delhi, Meerut side, and many Noida runs. Shaheed Sthal metro is a few
            kilometres, so you plan a car or auto for metro days. Namo Bharat on the Delhi-Ghaziabad-Meerut line has
            been running since February 2026. None of that changes the unit math. A 3 BHK with a weak stack is still a
            weak 3 BHK.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Side by Side at a Glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Keep this when a salesperson treats both sizes as the same Siddharth Vihar story.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Point</th>
                <th className="px-4 py-3 font-medium">2 BHK</th>
                <th className="px-4 py-3 font-medium">3 BHK</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.point}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.point}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.two}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.three}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_2}
            alt="3 BHK flats in Siddharth Vihar: new high-rise living beside metro and NH-24"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          New 3 BHK is the common tour here. Confirm the stack and possession before you stretch the EMI.
        </figcaption>
      </figure>

      <section id="flats-ghz" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Flats in Siddharth Vihar Ghaziabad
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Flats in Siddharth Vihar Ghaziabad sit east of the Hindon, on the 14-lane expressway and NH-24. Internals
            are newer and quieter than a filled-in khand. Daily retail is growing with the towers. You are next to
            Indirapuram for a mall or a specialist clinic. That is proximity, not a gap. Buyers come from Ghaziabad,
            Delhi, and Noida offices. The size question is the same for all of them: will you use the third room. For
            a Siddharth Vihar 3 BHK we start with{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>
            . For a township mix on NH-24 we add{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>
            . Two files. Two gates. One budget sheet.
          </p>
          <p>
            If you need keys this year, start from{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            and pick by society and possession, not by a 2 vs 3 slogan. If you already know this pin, open{" "}
            <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              properties in Ghaziabad
            </Link>{" "}
            and we will match 2 BHK and 3 BHK to the same budget sheet. We handle the RERA file on the project you
            like. You do not need to chase a portal for that.
          </p>
          <p>
            Write three things before the visit: where you work, when you need keys, and the all-in number including
            registration. Then{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>
            . We will only take you to stacks that still fit those three.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_3}
            alt="Flats in Siddharth Vihar Ghaziabad: highway, metro, and east Ghaziabad skyline"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Same pin. Different rooms. Price the unit you will own, not the BHK on the hoarding.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How We Help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            We work for the buyer in Ghaziabad, not for the loudest launch. You tell us the commute, the budget, and
            whether 2 BHK or 3 BHK is the real constraint. We check papers and possession on the projects you like, and
            we only take you to sites that still make sense.
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
                Tell us office, budget, and 2 BHK or 3 BHK. We will only take you to sites that still fit.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <TwoVsThreeBhkSiddharthViharCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions People Actually Ask
        </h2>
        <SobhaRivanaFaqAccordion items={twoVsThreeBhkSiddharthViharFaqSchemaItems} />
      </section>
    </div>
  );
}
