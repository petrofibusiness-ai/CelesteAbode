import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const PROPERTIES_NOIDA = "/properties-in-noida";
const FLATS_NOIDA = "/flats-for-sale-in-noida";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_ALL = "/properties";

const VALUATION_NOIDA_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/10%20tips%20to%20value%20real%20estate%20in%20noida.webp";

const STACK_COMPARISON_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/Blog%2010%20tips%20to%20value%20real%20estate%20in%20noida/10%20tips%20to%20value%20real%20estate%20in%20noida%203.webp";

/** Quick-scan checklist for the summary table (body copy carries the detail). */
const CHECKLIST_ROWS: { ask: string; lookFor: string }[] = [
  { ask: "Which sector is this, really?", lookFor: "Resale depth, tenant profile, schools and commute at your hour" },
  { ask: "What is the all-in number?", lookFor: "BSP plus floor, PLC, parking, and other heads on your exact unit" },
  { ask: "Does the layout match demand?", lookFor: "Healthy 2 BHK and 3 BHK supply in that belt, not odd sizes" },
  { ask: "Is paperwork clean?", lookFor: "UP RERA on the portal, title flow, sanction plan" },
  { ask: "Who built it, and did they deliver before?", lookFor: "Past possession, OC history, quality of older phases" },
  { ask: "Can you live with the commute?", lookFor: "Peak-time test, not a Sunday map screenshot" },
  { ask: "Will someone else buy it from you?", lookFor: "Resale activity, realistic rent, days on market" },
  { ask: "Are you buying to live or to earn?", lookFor: "Separate lifestyle fit from yield math" },
  { ask: "How long might you hold?", lookFor: "Room to wait through build or a slow resale cycle" },
  { ask: "What else exists at this budget?", lookFor: "Three comparable stacks before you pay a large booking" },
];

export const valuingResidentialPropertyNoidaFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "How do I value a flat in Noida before buying?",
    answer:
      "Work backwards from resale: all-in cost, RERA status, builder delivery in that sector, and commute at the time you actually travel. Then compare at least three real options among flats for sale in Noida in the same budget. One brochure is a starting point, not a valuation.",
  },
  {
    question: "Should I use a real estate agency in Noida to value property?",
    answer:
      "A capable real estate company in Noida will show you comparables and explain where the ticket is high or fair. At Celeste Abode we do that buyer-side: written shortlists, all-in cost clarity, and honest pushback when a tower fails your checklist. The best partner is one willing to walk away from a bad fit, not one that rushes a token.",
  },
  {
    question: "Are 2 BHK and 3 BHK flats in Noida priced differently for investment?",
    answer:
      "They behave differently. A 2 BHK flat in Noida in a rental belt is often valued on yield and turnover, while 3 BHK flats in Noida in family sectors trade on schools, roads, and end-user demand. Price the home you will own, not the configuration a salesperson needs to clear.",
  },
  {
    question: "What is the difference between property dealers in Noida and advisory firms?",
    answer:
      "Many property dealers in Noida represent specific inventory. Advisory-led teams shortlist across projects, run site visits, and stress-test paperwork before you commit. If you only see one tower, ask what else exists at your budget.",
  },
  {
    question: "Where can I see verified flats for sale in Noida?",
    answer:
      "Start from verified property in Noida with RERA-linked projects, then line up site visits for the options that survive your checklist. Numbers on paper change once you stand in the actual flat and drive the route home.",
  },
];

/** Both buttons share the width of the longer label (sizers hidden, same grid cell). */
const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function ValuingNoidaCtaPair({
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
          ? "inline-grid max-w-full grid-cols-2 gap-3"
          : "grid w-max max-w-full grid-cols-1 gap-3"
      }
    >
      {renderCell(PROPERTIES_NOIDA, "Properties in Noida", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function ValuingResidentialPropertyNoidaContent() {
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
            <a href="#why-overpay" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why buyers overpay for property in Noida
            </a>
          </li>
          <li>
            <a href="#three-layers" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Three layers that decide what a flat is worth
            </a>
          </li>
          <li>
            <a href="#checklist" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Ten questions before you make an offer
            </a>
          </li>
          <li>
            <a href="#configurations" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How to value 2 BHK and 3 BHK flats in Noida
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
          Most people who want to buy flat in Noida already know the sector names and the builder logos. What they do not
          always have is a way to tell whether Tuesday&apos;s site visit price still makes sense on a rainy Thursday three
          years later, when they might need to sell or rent. Valuation is that bridge: it turns a sales pitch into a
          decision you can explain to your family, your banker, and your future self. You do not have to run every check
          alone; At Celeste Abode we work buyer-side, helping Noida families compare stacks, paperwork, and commute before
          they commit.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          A flat is not expensive because the lobby is tall. It is expensive when the sector, the stack, and your hold
          period do not line up with how Noida actually trades.
        </blockquote>
      </header>

      <section id="why-overpay" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why buyers overpay for property in Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Noida is several markets wearing one name. A tower on the Expressway, a plotted pocket near Sector 150, and
            an older grid near a metro station can all quote a similar rate per square foot while behaving completely
            differently on resale. Buyers often anchor on the brochure rate, then discover later that liquidity,
            maintenance, and the kind of neighbour who buys next door matter as much as the carpet area.
          </p>
          <p>
            If you are still narrowing the map, start with{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            by sector, then move to{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            only in belts that match how you will use the home, whether you plan to live there, rent it out, or hold for
            appreciation. If the list feels long, that is normal: most of our buyers start with a short call so we can
            narrow sectors and projects before the first site visit.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VALUATION_NOIDA_VISUAL}
            alt="Top 10 tips for valuing residential real estate investments in Noida"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Same city, different exit stories: compare sectors before you compare brochures.
        </figcaption>
      </figure>

      <section id="three-layers" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Three layers that decide what a flat is worth
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Think of valuation in layers instead of a single lucky number. The tips below are the ten checks we use most
          often with Noida buyers; they sit inside three buckets so you know what you are solving for at each step.
        </p>

        <article
          id="layer-location"
          className="scroll-mt-24 mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
        >
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Location and daily life</h3>
          <p className="mb-4 text-[15px] leading-[1.75] text-gray-700">
            Start with the micro-market, not the render. Who lives there today, how fast do similar units resell, and
            does the approach road still work when schools open and offices let out? Drive your route twice before you
            treat map distance as truth.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-700 marker:text-[#CBB27A]">
            <li>Match the sector to your commute reality, not a weekend site visit.</li>
            <li>Check what similar homes are renting for: it signals who your next buyer or tenant might be.</li>
          </ul>
        </article>

        <article
          id="layer-price"
          className="scroll-mt-24 mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
        >
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Price, paperwork, and builder risk</h3>
          <p className="mb-4 text-[15px] leading-[1.75] text-gray-700">
            Price per square foot is where conversations start, not where they should end. On the exact stack you are
            offered, add floor rise, preferential location charges, parking, and anything else that changes the all-in
            ticket. Then cross-check UP RERA on the official portal and look at whether this builder has delivered the
            last phase on time, because delayed possession has a cost even when the base rate looks attractive.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-700 marker:text-[#CBB27A]">
            <li>Verify title flow and sanction plan before emotion takes over.</li>
            <li>Score delivery on completed towers, not on launch events.</li>
          </ul>
        </article>

        <article
          id="layer-exit"
          className="scroll-mt-24 mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
        >
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Your exit and hold period</h3>
          <p className="mb-4 text-[15px] leading-[1.75] text-gray-700">
            Lifestyle value and investment yield pull in different directions, and mixing them into one optimistic
            number is how people surprise themselves at resale. Be honest about how long you can hold if construction
            slips or if the market goes quiet, and insist on seeing three comparable options in the same budget band before you
            pay a large booking amount on the first tower that felt right.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-700 marker:text-[#CBB27A]">
            <li>Separate &quot;I want to live here&quot; from &quot;I need this rent&quot; when you compare projects.</li>
            <li>If two checklist rows fail, pause until you have written answers or site proof.</li>
          </ul>
        </article>

        <p className="mt-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These layers are a framework, not homework you finish in one evening. Celeste Abode applies them on real
          shortlists: we line up comparable projects, spell out the all-in ticket, and flag RERA or delivery gaps before
          you pay a booking amount.
        </p>
      </section>

      <section id="checklist" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Ten questions to ask before you make an offer
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Print this table or keep it on your phone during the second site visit. It is the same logic as the three
          layers above, stripped down for a quick yes-or-no pass. If you want a second pair of eyes, our team can walk
          through it with you on a{" "}
          <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
            free consultation
          </Link>{" "}
          and turn the rows into a shortlist worth visiting.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="w-10 px-3 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Ask yourself</th>
                <th className="px-4 py-3 font-medium">What a fair deal usually shows</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {CHECKLIST_ROWS.map((row, i) => (
                <tr
                  key={row.ask}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-3 py-3 font-medium text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{row.ask}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.lookFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={STACK_COMPARISON_VISUAL}
            alt="Side-by-side Noida project comparison: BSP, all-in cost, and possession status"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Side-by-side stack comparison: BSP, all-in cost, and possession at a glance.
        </figcaption>
      </figure>

      <section id="configurations" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How to value 2 BHK and 3 BHK flats in Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Flats in Noida are not fungible. In belts where young professionals cluster, a 2 BHK flat in Noida is often
            judged on rent and how quickly it finds a tenant. In sectors built for families, a 3bhk flat in Noida is
            judged on school access, society maintenance, and whether another family like yours bought there last year.
            Neither lens is wrong; using the wrong one for your sector is.
          </p>
          <p>
            Once you know which lens fits your sector, shortlist a few real stacks in that size band. Our{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              3 bhk flats in Noida
            </Link>{" "}
            and 2 BHK homes are on the same Noida page so you can compare without juggling brochures. If your budget might
            stretch beyond Noida, our wider{" "}
            <Link href={PROPERTIES_ALL} className="font-medium text-[#CBB27A] hover:underline">
              properties
            </Link>{" "}
            pages include Greater Noida and other NCR belts when you want a second geography in play. Not sure which
            configuration fits your budget? Tell us your ticket and commute; we will suggest 2 BHK and 3 BHK paths that
            are worth a site visit rather than leaving you to guess from ads alone.
          </p>
        </div>
      </section>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy in Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Real estate dealers in Noida and a typical real estate agency in Noida are not interchangeable. Some teams
            open doors and fix site visits; others are paid to push one builder&apos;s stock. Celeste Abode sits on the
            buyer&apos;s side: we are not here to sell you the only tower on our desk. We help you compare projects,
            understand the all-in number, and schedule visits on options that already pass your checklist.
          </p>
          <p>
            That usually means a short discovery call, a written shortlist with why each name is on it, and site visits
            only where the math and paperwork look defensible. You stay in control of the final call; we do the heavy
            lifting on research, coordination, and the questions most first-time buyers forget to ask. Start with our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>
            , or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if you already have one or two towers in mind and want them stress-tested before you token.
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
                Pick a few Noida projects to compare, then book a call for site visits on your shortlist.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <ValuingNoidaCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={valuingResidentialPropertyNoidaFaqSchemaItems} />
      </section>
    </div>
  );
}
