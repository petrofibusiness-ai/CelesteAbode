import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_GN = "/properties-in-greater-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";

const INFRA_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/webp/Infrastructure%20Developments%20Are%20Driving%20Property%20Prices3.webp";

const BELT_REPRICING_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/webp/Infrastructure%20Developments%20Are%20Driving%20Property%20Prices1.webp";

const BELT_ROWS: { belt: string; infraTrigger: string; priceEffect: string }[] = [
  {
    belt: "Greater Noida West",
    infraTrigger: "Aqua Line metro, Noida–Greater Noida Expressway, daily retail and schools",
    priceEffect: "End-user depth; resale and rental churn in mid-segment flats",
  },
  {
    belt: "Core GNIDA (Pari Chowk, Knowledge Park)",
    infraTrigger: "Established grid, institutions, internal roads largely built",
    priceEffect: "Steadier tickets; appreciation tied to society quality and OC depth",
  },
  {
    belt: "Yamuna Expressway belt",
    infraTrigger: "Jewar Airport Phase 1, expressway access, planned metro extensions",
    priceEffect: "Longer hold story; sharper moves when a corridor milestone lands",
  },
];

export const infrastructurePropertyPricesGreaterNoidaFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "How does infrastructure affect property prices in Greater Noida?",
    answer:
      "Roads, metro, and airport links change who can live and work in a belt. When commute time drops or a corridor goes operational, end-user demand and investor attention move together. Prices do not rise evenly: belts with ready social infrastructure usually reprice faster than pockets still waiting on possession and OC depth.",
  },
  {
    question: "Has Jewar Airport increased property prices in Greater Noida?",
    answer:
      "The Yamuna Expressway side has seen meaningful appreciation since Jewar was announced, with Phase 1 operational in 2026. Core Greater Noida West benefits indirectly through NCR connectivity narratives, but the sharpest airport-linked repricing is still closer to the expressway corridor. Match sector to your hold period before you treat every launch as airport-adjacent.",
  },
  {
    question: "Is Greater Noida West a good place to buy flats in 2026?",
    answer:
      "For many families, yes. Metro access, schools, and resale depth make West one of the more liquid mid-segment markets in the belt. Infrastructure is largely on the ground today, so your job is project-level: RERA, builder delivery, all-in ticket, and a real peak-hour commute test, not guessing whether a road will arrive someday.",
  },
  {
    question: "What should I check before I buy a flat in Greater Noida on an infra story?",
    answer:
      "Separate operational infrastructure from poster infrastructure. Verify UP RERA, possession timelines, OC status for ready inventory, and whether similar flats in that sector are actually transacting. Drive your route at the hour you travel, not on a Sunday site visit.",
  },
  {
    question: "Can Celeste Abode help me shortlist flats for sale in Greater Noida?",
    answer:
      "Yes. As a buyer-side real estate consultant in Greater Noida and across Delhi NCR, Celeste Abode shortlists across West, core GNIDA sectors, and the Yamuna belt. You get a written list with reasons, all-in cost clarity, and site visits on projects that pass your checklist, not a push toward one builder's unsold stack.",
  },
  {
    question: "Is Celeste Abode a good real estate company for Greater Noida infra-led buys?",
    answer:
      "We are built for buyer-side advisory, not inventory clearance. That means comparing belts on your commute and hold period, stress-testing RERA and delivery before you token, and saying no when a project is priced for infrastructure that is still on paper. Many families treat us as their go-to real estate company in Greater Noida when they want honest shortlists across West, GNIDA, and the expressway corridor.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Greater Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function InfrastructureGreaterNoidaCtaPair({
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
      {renderCell(PROPERTIES_GN, "Properties in Greater Noida", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function InfrastructurePropertyPricesGreaterNoidaContent() {
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
            <a href="#why-infra-moves-prices" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why infrastructure moves prices
            </a>
          </li>
          <li>
            <a href="#three-drivers" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Three drivers repricing Greater Noida
            </a>
          </li>
          <li>
            <a href="#belt-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Belt-by-belt: where the bump lands
            </a>
          </li>
          <li>
            <a href="#buy-smart" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How to buy flat in Greater Noida without overpaying the story
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
          Greater Noida did not reprice because brochures got nicer. Roads went live, metro lines connected resident
          clusters, and Jewar Airport moved from poster to runway. That is why{" "}
          <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
            property in Greater Noida
          </Link>{" "}
          today trades differently belt by belt, not one smooth curve across the map. The useful question is not whether
          infrastructure matters. It is whether the project you are shown is priced for infrastructure that already
          works, or for a story still two phases away. At Celeste Abode we help Greater Noida buyers read that gap
          buyer-side, belt by belt, before they commit.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          A corridor headline can lift every brochure in NCR. Your ticket only wins if the road, metro stop, or airport
          link changes your actual week, not just the sales deck.
        </blockquote>
      </header>

      <section id="why-infra-moves-prices" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why infrastructure moves property prices in Greater Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Infrastructure reprices a market in layers. First comes attention: launches, investor decks, and brokers
            quoting last year&apos;s comp with this year&apos;s airport slide. Then comes usability: when families can
            actually reach offices and schools on the new link. Finally comes depth: resale listings, rental churn, and
            the kind of neighbour who buys the next unit in the same society.
          </p>
          <p>
            Greater Noida West is further along that curve than many fringe pockets.{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              Flats in Greater Noida West
            </Link>{" "}
            often move on end-user demand because Aqua Metro and the Noida–Greater Noida Expressway are already part of
            daily life. The Yamuna belt is earlier on the investor leg of the same curve: Jewar Phase 1 is live, but
            not every sector along the expressway gets the same liquidity yet.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={INFRA_VISUAL}
            alt="Yamuna Expressway corridor and infrastructure driving Greater Noida property prices"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Corridors reprice in phases: attention first, then commute reality, then resale depth.
        </figcaption>
      </figure>

      <section id="three-drivers" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Three infrastructure drivers repricing Greater Noida
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These are the triggers we see most often when buyers ask why a ticket moved. They are not interchangeable. Match
          the driver to the belt you are actually buying in.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Jewar Airport and the Yamuna Expressway</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Jewar Phase 1 changed the conversation from &quot;someday&quot; to scheduled flights. That pulled investor
            attention back to the expressway belt and sharpened pricing on projects with clean titles and credible
            builders. It does not make every plotted pocket a winner. It does mean{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              property on the Yamuna Expressway
            </Link>{" "}
            is judged on hold period and corridor access, not just distance on a map.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Metro and expressway connectivity</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Aqua Line ridership is a practical test for thousands of families in West. The Noida–Greater Noida
            Expressway, DND, and peripheral links matter for buyers who still work in core Noida or Delhi. When those
            links are operational, mid-segment{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              apartments in Greater Noida
            </Link>{" "}
            compete on room-per-rupee and commute, not on a future road sketch.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Social infrastructure in lived-in belts</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Schools, clinics, and daily retail are the quiet repricing layer. In sectors where they are operational,
            end users pay for certainty: a society that feels occupied, maintenance that works, and a resale market with
            real buyers. That is why{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              property in Greater Noida West
            </Link>{" "}
            often holds value better than a cheaper ticket in a belt still waiting on the same basics.
          </p>
        </article>
      </section>

      <section id="belt-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Belt-by-belt: where the infrastructure bump lands
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Same city, different infra timelines. Use the table to sanity-check whether the story you are hearing matches
          the belt on the brochure.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Belt</th>
                <th className="px-4 py-3 font-medium">Infra that matters today</th>
                <th className="px-4 py-3 font-medium">Typical price behaviour</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {BELT_ROWS.map((row, i) => (
                <tr
                  key={row.belt}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.belt}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.infraTrigger}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.priceEffect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BELT_REPRICING_VISUAL}
            alt="Greater Noida belts compared: infrastructure maturity and property pricing"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Greater Noida West, central GNIDA sectors, and the Yamuna Expressway belt: same city, different infrastructure stages, different price behaviour.
        </figcaption>
      </figure>

      <section id="buy-smart" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How to buy flat in Greater Noida without overpaying the infra story
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Infrastructure headlines make every launch sound urgent. Your filter should stay boring: UP RERA on the
            official portal, builder delivery on completed phases, all-in cost on the exact unit, and a commute driven
            at the hour you actually travel. If the project needs three more road announcements to make sense, price it
            like a longer hold, not like a ready family move.
          </p>
          <p>
            Start with belts that match your timeline, then compare real stacks. Browse{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            and{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            by sector, or tell us your budget on a{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              free consultation
            </Link>{" "}
            and we will narrow sectors before the first site visit. If you plan to{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              buy flat in Greater Noida
            </Link>{" "}
            on an infra headline, run the boring checks first. The goal is not to chase the last corridor announcement. It
            is to buy a home whose ticket you can defend when the market goes quiet again.
          </p>
        </div>
      </section>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy property in Greater Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Infra-driven markets punish guesswork. Labels like best real estate company in Greater Noida are easy to
            print on a card; harder to show in a shortlist that survives your budget, commute, and hold period.
            Celeste Abode works buyer-side as a real estate consultant in Delhi NCR with daily depth across Greater Noida
            West, core GNIDA sectors, and the Yamuna belt. We compare projects on your brief, spell out the all-in
            ticket, and flag delivery or paperwork gaps before you token.
          </p>
          <p>
            That usually means a short discovery call, a tight written shortlist, and site visits only where the belt,
            stack, and infra story still line up after basic checks. You keep the final call; we remove the randomness
            from which towers land on your calendar. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if you already have one or two projects in mind and want them read against the corridor reality, not the
            launch poster.
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
                Pick a belt, compare a few stacks, and book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <InfrastructureGreaterNoidaCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={infrastructurePropertyPricesGreaterNoidaFaqSchemaItems} />
      </section>
    </div>
  );
}
