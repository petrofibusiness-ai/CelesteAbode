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

const VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Ready-to-Move%20vs%20Under-Construction%20Property%20in%20Siddharth%20Vihar%3A/Ready-to-Move%20vs%20Under-Construction%20Property%20in%20Siddharth%20Vihar_2.webp";

const VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Ready-to-Move%20vs%20Under-Construction%20Property%20in%20Siddharth%20Vihar%3A/Ready-to-Move%20vs%20Under-Construction%20Property%20in%20Siddharth%20Vihar_3.webp";

const VISUAL_3 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Ready-to-Move%20vs%20Under-Construction%20Property%20in%20Siddharth%20Vihar%3A/Ready-to-Move%20vs%20Under-Construction%20Property%20in%20Siddharth%20Vihar_4.webp";

const COMPARE_ROWS: { point: string; ready: string; under: string }[] = [
  {
    point: "Keys",
    ready: "You walk a finished flat. You can move in or rent after papers and fit-out. No crane calendar.",
    under: "You wait on possession. Payment follows the builder schedule. GST usually sits on the remaining construction.",
  },
  {
    point: "What you see",
    ready: "Lifts, parking, water, and the view from that floor. Defects show up on the visit, not after handover.",
    under: "A sample flat and a brochure. The stack you book can still change in feel when the tower is live.",
  },
  {
    point: "Ticket in this belt (2026)",
    ready: "Often a higher all-in for a delivered home. Portal asking for Siddharth Vihar high-rise sits near ₹9,800 per sq ft.",
    under: "Often a lower entry. SG Nakshatra quotes from about ₹8,899 per sq ft before PLC and GST. The Prestige City is the large new township on the same highway. Add parking and taxes before you call it cheaper.",
  },
  {
    point: "Risk",
    ready: "Society charges start now. Age of the building and pending work in common areas still matter.",
    under: "Delay, cash-flow, and builder delivery. A highway pin does not finish a tower.",
  },
  {
    point: "Rent and hold",
    ready: "Rent can start once the unit is live. Yield is real only if a tenant will pay that EMI band.",
    under: "You hold through construction. The investment case is a newer product on the expressway if possession lands.",
  },
  {
    point: "Buy this if",
    ready: "You need to live here this year, or you want to see the actual home before you pay.",
    under: "You can wait, you want a new 3 or 4 BHK, and the all-in still fits after GST.",
  },
];

export const readyVsUnderConstructionSiddharthViharFaqSchemaItems: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Should I buy ready to move or under construction in Siddharth Vihar?",
    answer:
      "Ready to move if you need keys this year and you want to walk the actual flat. Under construction if you can wait, you want a new tower, and the all-in after GST still fits. Siddharth Vihar has more new launches than old khands. Match the stage to your move-in date, not the hoarding.",
  },
  {
    question: "Are there ready to move flats in Siddharth Vihar?",
    answer:
      "Some delivered stock exists, but the live story here is newer high-rise. Ready 2 and 3 BHK is still easier in older east Ghaziabad societies. We search Siddharth Vihar first for a live unit, then show you what is actually vacant, not a portal photo from another tower.",
  },
  {
    question: "Are under construction flats in Siddharth Vihar a good buy?",
    answer:
      "Yes for a hold of a few years if possession and the builder hold up. SG Nakshatra is the Siddharth Vihar under-construction 3 and 4 BHK we shortlist. The Prestige City is the large new township on Indirapuram Extension, same NH-24, different pin. Check the payment plan, GST, and the date on paper.",
  },
  {
    question: "Is GST extra on under construction property in Siddharth Vihar?",
    answer:
      "Usually yes on the remaining construction. Ready resale is a different tax path. We put both on one sheet so the EMI you hear in the sample flat is not the number you pay at the bank.",
  },
  {
    question: "Which projects are under construction in Siddharth Vihar?",
    answer:
      "SG Nakshatra on NH-24 and AU Cosmos Corner are two we shortlist on the Siddharth Vihar pin. The Prestige City is the large new township on Indirapuram Extension. Compare possession, RERA file, and full cost. We handle the RERA check. You do not need to chase a portal for that.",
  },
  {
    question: "Is ready to move safer than under construction?",
    answer:
      "You see more of the home. That cuts surprise on the flat itself. You still check society dues, parking, and pending common work. Under construction can still be the right buy if you can wait and the builder has a clean file. Stage is not a moral grade. It is a cash and time choice.",
  },
  {
    question: "Can I rent a ready flat in Siddharth Vihar while I wait to move?",
    answer:
      "If the society is live and the unit is vacant, yes. Price the rent against real comps, not the brochure. An empty ready flat with high maintenance is not free money.",
  },
  {
    question: "Can you shortlist both ready and under construction for my budget?",
    answer:
      "Yes. Tell us office, all-in budget, and when you need keys. We put SG Nakshatra against a live Siddharth Vihar unit if one exists, and The Prestige City if you want a township on the same highway. You decide after the visit.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function ReadyVsUnderConstructionSiddharthViharCtaPair({
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

export function ReadyVsUnderConstructionSiddharthViharContent() {
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
            <a href="#ready" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Ready to Move Flats in Siddharth Vihar
            </a>
          </li>
          <li>
            <a href="#under-construction" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Under Construction Flats in Siddharth Vihar
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Side by Side Table
            </a>
          </li>
          <li>
            <a href="#property-pin" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Property in Siddharth Vihar Ghaziabad
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
          Ready-to-move vs under-construction property in Siddharth Vihar is the call after the pin is already
          chosen. People who live in Ghaziabad, commute to Delhi or Noida, and people who buy to hold all land on the
          same question: do I wait for a new tower, or do I take keys now. This belt has more new high-rise than old
          khands. That is the point of the pin. It is also why a ready flat here is not the same hunt as a ready flat
          in a filled-in neighbourhood. Pick by move-in date and cash, not by which brochure looks newer.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Ready if you need to live here this year and you want to walk the actual home. Under construction if you can
          wait and the all-in after GST still fits. Same pin. Different clock.
        </blockquote>
      </header>

      <section id="ready" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Ready to Move Flats in Siddharth Vihar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Ready to move flats in Siddharth Vihar exist, but they are not the bulk of what is launching. You come
            here for a newer expressway address. Delivered stock is thinner than in older east Ghaziabad societies.
            If a live unit is on the list, you get the one thing a sample flat cannot give you: the real lift, the
            real parking, and the view from that floor.
          </p>
          <p>
            That visit is the job. Check water, power backup, society dues, and what is still unfinished in the
            common areas. A ready home that looks cheap on a portal can carry pending work. Rent can start once papers
            and fit-out are done. Yield only works if a tenant will pay that EMI band in this pocket.
          </p>
          <p>
            If you need keys this year and Siddharth Vihar has no live stack in your budget, we still keep you on this
            side of Ghaziabad first. Do not treat{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>{" "}
            as a ready khand. It is a new township on Indirapuram Extension. Start from{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            if possession this year is the constraint.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_1}
            alt="Ready to move flats in Siddharth Vihar versus new towers on the east Ghaziabad expressway"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Walk a live home if you need keys now. Book a new tower if you can wait and the all-in still fits.
        </figcaption>
      </figure>

      <section id="under-construction" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Under Construction Flats in Siddharth Vihar
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Under construction flats in Siddharth Vihar are the main product on this pin. New 3 and 4 BHK towers, wider
            internals, and an expressway address.{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>{" "}
            on NH-24 quotes from about ₹8,899 per sq ft before PLC and GST, with 3 BHK around 2,225 and 2,450 sq ft.{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner
            </Link>{" "}
            sits on the same Siddharth Vihar shortlist.{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>{" "}
            is the large new township on Indirapuram Extension. Same highway. Different pin. Read possession and the
            payment plan, not only the launch price.
          </p>
          <p>
            The cheaper headline is not the full number. GST on remaining construction, parking, and PLC change the
            EMI. Delay is the other cost. You hold through cranes. That can still be the right buy if you do not need
            the bedroom this year and you want a current product below much of Indirapuram high-rise asking near
            ₹10,500 per sq ft. Portal asking for Siddharth Vihar high-rise sits near ₹9,800. Price the stack, not the
            average.
          </p>
          <p>
            We handle the RERA file on the project you like. You do not need to chase a government portal for that.
            What you do need is one Tuesday drive from the gate, because the expressway helps Delhi, Meerut side, and
            many Noida trips only if that last mile works for you.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Side by Side at a Glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Keep this when someone sells both as the same Siddharth Vihar deal.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Point</th>
                <th className="px-4 py-3 font-medium">Ready to move</th>
                <th className="px-4 py-3 font-medium">Under construction</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.point}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.point}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.ready}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.under}</td>
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
            alt="Under construction flats in Siddharth Vihar: new high-rise and highway corridor in Ghaziabad"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          New towers are the live inventory here. Confirm possession and GST before the EMI speech.
        </figcaption>
      </figure>

      <section id="property-pin" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Property in Siddharth Vihar Ghaziabad
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Property in Siddharth Vihar Ghaziabad sits east of the Hindon, on the 14-lane Delhi-Meerut Expressway and
            NH-24. That is why people buy here to live and to hold. Internals are newer and quieter than a filled-in
            khand. Daily retail is growing with the towers. You are next to Indirapuram for a mall or a specialist
            clinic. Stage of construction does not change that map. It changes when you get keys. For a Siddharth
            Vihar under-construction 3 BHK we start with{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>
            . For a township on the same highway we add{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>
            . Drive both gates.
          </p>
          <p>
            Write three things before the visit: where you work, when you need the bedroom, and the all-in number
            including registration. Then open{" "}
            <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              properties in Ghaziabad
            </Link>{" "}
            or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>
            . We will put one ready option and one under-construction option on the same sheet if both still fit.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_3}
            alt="Property in Siddharth Vihar Ghaziabad: NH-24, metro, and new towers beside older streets"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Same expressway pin. Ready and under construction are different clocks and different all-in numbers.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How We Help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            We work for the buyer in Ghaziabad, not for the loudest launch. You tell us the commute, the budget, and
            when you need keys. We check papers and possession on the projects you like, and we only take you to sites
            that still make sense.
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
            <ReadyVsUnderConstructionSiddharthViharCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions People Actually Ask
        </h2>
        <SobhaRivanaFaqAccordion items={readyVsUnderConstructionSiddharthViharFaqSchemaItems} />
      </section>
    </div>
  );
}
