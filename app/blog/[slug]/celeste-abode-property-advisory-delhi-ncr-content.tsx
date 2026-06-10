import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PHILOSOPHY = "/advisory-philosophy";
const PROPERTIES = "/properties";
const PROPERTIES_NOIDA = "/properties-in-noida";
const PROPERTIES_GN = "/properties-in-greater-noida";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const FLATS_NOIDA = "/flats-for-sale-in-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";

const NCR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Blog%20why-choose-celeste-abode-property-advisory-delhi-ncr/why-choose-celeste-abode-property-advisory-delhi-ncr1.webp";

const ADVISORY_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Blog%20why-choose-celeste-abode-property-advisory-delhi-ncr/why-choose-celeste-abode-property-advisory-delhi-ncr2.webp";

const COVERAGE_ROWS: { belt: string; focus: string }[] = [
  { belt: "Noida", focus: "Sector-led shortlists, 2 and 3 BHK fit, Expressway and core grids" },
  { belt: "Greater Noida", focus: "West belts, Zeta-style living, family townships, value tickets" },
  { belt: "Yamuna Expressway", focus: "Airport-linked corridors, long-hold investor context" },
  { belt: "Ghaziabad and wider NCR", focus: "Villa and plotted pockets where end-user demand is real" },
];

export const celesteAbodeAdvisoryDelhiNcrFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What does Celeste Abode do as a property advisory in Delhi NCR?",
    answer:
      "We work on the buyer's side across Noida, Greater Noida, Yamuna Expressway, and wider NCR. That means discovery on your budget and commute, a written shortlist with reasons, site visits on projects that pass basic checks, and clear notes on all-in cost and paperwork before you commit.",
  },
  {
    question: "How is Celeste Abode different from a typical real estate agency in Noida?",
    answer:
      "Many agencies are paid to move specific stock. Celeste Abode is built as consulting-first: we compare across builders and belts, explain where a ticket looks fair or stretched, and we are comfortable saying no when a tower fails your brief. You keep the final call; we do the research and coordination.",
  },
  {
    question: "Do you only advise on luxury property in Delhi NCR?",
    answer:
      "No. We advise on premium and mid-market residential where the project, paperwork, and location story hold up. Some clients want a family 3 BHK in Noida; others want a long-hold plot on the expressway. The process is the same: shortlist with context, then visits on names worth your time.",
  },
  {
    question: "Can NRIs or out-of-town buyers use Celeste Abode advisory?",
    answer:
      "Yes. Many of our buyers are not in Noida every weekend. We line up video walk-throughs where useful, document the stack in writing, and schedule site visits when you are in town so you do not fly in for random tower tours.",
  },
  {
    question: "How do I start with Celeste Abode?",
    answer:
      "Book a free consultation with your budget band, preferred belt, and whether you are buying to live or hold. We respond with a practical next step, often a short call and a first shortlist rather than a hard sell on one project.",
  },
];

const CTA_SIZER_LABELS = ["Real estate consulting services", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function CelesteAbodeAdvisoryCtaPair({
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
      {renderCell(ADVISORY, "Real estate consulting services", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function CelesteAbodePropertyAdvisoryDelhiNcrContent() {
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
            <a href="#why-advisory" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why expert advisory matters in Delhi NCR
            </a>
          </li>
          <li>
            <a href="#why-celeste" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why choose Celeste Abode
            </a>
          </li>
          <li>
            <a href="#coverage" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Where we advise across NCR
            </a>
          </li>
          <li>
            <a href="#who-we-help" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Who we work with
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How advisory works with us
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
          Delhi NCR is large enough that two buyers with the same budget can end up in completely different cities,
          sectors, and hold stories. Expert property advisory is not about handing you more names; it is about
          narrowing the map to options you can defend at booking and at resale. Celeste Abode was built for that
          buyer-side job across Noida, Greater Noida, Yamuna Expressway, and the wider belt.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The right advisor does not rush a token. They show you why a project is on the list, what the all-in ticket
          really is, and what happens if your plans change in three years.
        </blockquote>
      </header>

      <section id="why-advisory" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why expert property advisory matters in Delhi NCR
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            NCR prices have moved, but the hard part for most families is still judgment: which sector fits your
            commute, which builder has actually delivered, and whether the stack you are offered is the one you will
            still be happy to own after possession. Brochures answer the first question well and the rest poorly.
          </p>
          <p>
            A serious advisory team sits between you and the sales floor. We read RERA records, compare all-in costs on
            comparable units, and line up site visits only where the brief still makes sense after paperwork checks.
            When you want to see what we shortlist in practice, start from{" "}
            <Link href={PROPERTIES} className="font-medium text-[#CBB27A] hover:underline">
              properties
            </Link>{" "}
            across NCR, or tell us your belt on a{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              free consultation
            </Link>{" "}
            and we will do the first cut for you.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NCR_VISUAL}
            alt="Why choose Celeste Abode for expert property advisory in Delhi NCR"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          NCR is several markets: advisory starts by matching belt to your life, not by tower brand alone.
        </figcaption>
      </figure>

      <section id="why-celeste" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why choose Celeste Abode for property advisory
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Three things show up in every engagement we take on. They are simple, but they change how the buying month
          feels.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Buyer-side, not inventory-first</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            We are not here to clear one builder&apos;s unsold stack. Celeste Abode compares projects across belts and
            walks away from names that fail basic checks on cost, delivery, or fit. If you only hear about a single
            tower, that is a signal to ask what else exists at your budget.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. NCR depth without NCR noise</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Our team works daily across{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>
            ,{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              Greater Noida
            </Link>
            , and{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway
            </Link>{" "}
            corridors. You get sector context, not a generic &quot;NCR is hot&quot; pitch.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Written clarity before you pay booking</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Shortlists come with reasons. All-in tickets are spelled out. Site visits are scheduled on names that survive
            your questions, not on whoever called last. That discipline is what our{" "}
            <Link href={PHILOSOPHY} className="font-medium text-[#CBB27A] hover:underline">
              advisory philosophy
            </Link>{" "}
            is built around.
          </p>
        </article>
      </section>

      <section id="coverage" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Where we advise across Delhi NCR
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Coverage is belt-specific. The table below is a quick map; your brief might sit in one row or span two.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Belt</th>
                <th className="px-4 py-3 font-medium">Typical advisory focus</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COVERAGE_ROWS.map((row, i) => (
                <tr
                  key={row.belt}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.belt}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          For flat-specific paths, see{" "}
          <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
            flats for sale in Noida
          </Link>{" "}
          and{" "}
          <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
            flats for sale in Greater Noida
          </Link>
          . We use those pages as starting points, then narrow with you on call.
        </p>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={ADVISORY_VISUAL}
            alt="Property advisory consultation: budget, belt, and hold period before site visits"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Advisory is conversation first: budget, belt, and hold period before the first site visit.
        </figcaption>
      </figure>

      <section id="who-we-help" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Who Celeste Abode works with
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            End users buying a first or upgrade home in Noida or Greater Noida West make up a large share of our work.
            They care about schools, commute, and whether the society will feel lived-in at possession. Investors with a
            five-year view on Yamuna Expressway or rental belts come with a different lens, and we keep that separate
            from family briefs instead of blending the two into one optimistic deck.
          </p>
          <p>
            We also advise NRIs and out-of-town buyers who cannot visit every weekend. In those cases we document stacks
            in writing, use video where it helps, and batch site visits for the days you are actually in town. You still
            make the final call; we remove the randomness from the week you have on the ground.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How property advisory works with Celeste Abode
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Most engagements start with a short discovery call: budget band, preferred belts, configuration, and whether
            you are buying to live or hold. We then send a tight shortlist with why each name is on it, usually three
            to five projects rather than a folder of every launch in NCR.
          </p>
          <p>
            Site visits follow on stacks that pass your checklist. We flag all-in cost heads, RERA and delivery context,
            and the questions people often forget on a first visit. If you want the full service map, our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            page lays out deliverables; this article is the why, that page is the what.
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#CBB27A]">Work with Celeste Abode</p>
              <p className="mt-1 text-sm leading-snug text-white/70">
                Share your budget and belt. We shortlist NCR projects, run the checks with you, and line up visits that
                are worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <CelesteAbodeAdvisoryCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={celesteAbodeAdvisoryDelhiNcrFaqSchemaItems} />
      </section>
    </div>
  );
}
