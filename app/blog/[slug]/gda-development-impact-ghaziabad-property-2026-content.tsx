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
const KARYAN_TREVANA = "/properties-in-ghaziabad/karyan-trevana-residences-nh24-ghaziabad";
const AU_COSMOS = "/properties-in-ghaziabad/au-cosmos-corner-siddharth-vihar-ghaziabad";
const ROYAL_ROSEWOOD = "/properties-in-ghaziabad/royal-rosewood-villas-suncity-hitech-ghaziabad";
const PRESTIGE_MAYFLOWER = "/properties-in-ghaziabad/prestige-city-mayflower-indirapuram-ghaziabad";
const GAUR_NYC = "/properties-in-ghaziabad/gaur-nyc-residences-wave-city-ghaziabad";
const VERIDIA = "/properties-in-ghaziabad/veridia-wave-city-ghaziabad";
const SKA_DIVINE = "/properties-in-ghaziabad/ska-divine-wave-city-ghaziabad";
const JADE_COUNTY = "/properties-in-ghaziabad/jade-county-wave-city-ghaziabad";
const ELIGO_WAVE = "/properties-in-ghaziabad/eligo-wave-city-ghaziabad";

const GDA_PROJECTS_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20GDA's%20New%20Development%20Projects%20Could%20Impact%20Property%20Prices%20in%20Ghaziabad%20in%202026%20blog/How%20GDA's%20New%20Development%20Projects%20Could%20Impact%20Property%20Prices%20in%20Ghaziabad%20in%202026_1.webp";

const CORRIDOR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/best_neighborhood_in_ghaziabad/Best%20Neighborhoods%20in%20Ghaziabad%20for%20Value%20%26%20Growth%20in%202026_3.webp";

const BUYER_CHECK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/best_neighborhood_in_ghaziabad/Best%20Neighborhoods%20in%20Ghaziabad%20for%20Value%20%26%20Growth%20in%202026_1.webp";

const IMPACT_ROWS: { project: string; whatItDoes: string; priceRead: string }[] = [
  {
    project: "Harnandipuram Township (Phase 1)",
    whatItDoes: "GDA-backed housing near Raj Nagar Extension; first patch around 40 to 48 hectares targeted for late 2026",
    priceRead: "Fresh supply can steady tickets in the outer belt. Nearby private launches may reprice on connectivity proof, not hoardings alone.",
  },
  {
    project: "Aero City (~541 hectares)",
    whatItDoes: "Planned aerocity-themed township with land assembly in Morta, Ataur, and Mewla Agri villages",
    priceRead: "Long-cycle story. Early movers price hope; end users should wait for road and title clarity.",
  },
  {
    project: "GT Road elevated corridor (2 km)",
    whatItDoes: "Four-lane flyover from Ghanta Ghar to Bhatia Mor; about Rs 200 crore; roughly two years after tender",
    priceRead: "Helps core Ghaziabad commute. Mature belts gain liveability more than a sudden plot spike.",
  },
  {
    project: "Hindon embankment road (~6 to 7 km)",
    whatItDoes: "Six-lane embankment for flood protection and access to stadium, Aero City, and Harnandipuram",
    priceRead: "De-risks the Hindon-side growth belt. Land with flood risk may narrow its discount once work starts.",
  },
];

export const gdaDevelopmentImpactGhaziabadFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "How could GDA new projects affect Ghaziabad property prices in 2026?",
    answer:
      "They add planned supply and road spend in belts that were mostly farmland five years ago. Raj Nagar Extension and the Hindon side may see firmer asking rates when embankment and township work move from paper to site. Core belts like Indirapuram gain more from the GT Road elevated plan than from a distant township map. None of this replaces your unit-level checks on RERA, title, and all-in ticket.",
  },
  {
    question: "What is Harnandipuram Township and when will it launch?",
    answer:
      "It is a GDA township behind Raj Nagar Extension with a long-term plan for tens of thousands of homes. Officials have spoken of a Phase 1 rollout on a smaller continuous patch, often cited around 40 to 48 hectares, with a target in late 2026. Land assembly has been patchy, so treat dates as working targets until GDA publishes the final layout and scheme booklet.",
  },
  {
    question: "Will Aero City make Ghaziabad property expensive everywhere?",
    answer:
      "No. Aero City is a large, long-build plan on the outer edge of east Ghaziabad. It can lift sentiment and infrastructure spend nearby. It does not automatically raise resale in Indirapuram or Vaishali. Match the project to the micro-market you are actually buying in.",
  },
  {
    question: "Which Ghaziabad areas could feel GDA projects first?",
    answer:
      "Raj Nagar Extension and the Hindon belt for Harnandipuram, Aero City, and the embankment road. NH-24 and Wave City for buyers who want township scale with expressway access. Siddharth Vihar for premium mid-rise stacks that piggyback on east Ghaziabad growth. Run your commute before you pick a pin.",
  },
  {
    question: "Can Celeste Abode help me buy in Ghaziabad after these GDA announcements?",
    answer:
      "Yes. We work buyer-side across Ghaziabad and wider Delhi NCR. That means shortlists with reasons, all-in ticket clarity against current belt bands, and site visits only where RERA and delivery still make sense after the headline fades. We compare GDA-adjacent belts against mature grids when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function GdaDevelopmentImpactGhaziabadCtaPair({
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

export function GdaDevelopmentImpactGhaziabadProperty2026Content() {
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
            <a href="#what-gda-pushing" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What GDA is pushing in 2026
            </a>
          </li>
          <li>
            <a href="#four-projects" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Four projects buyers should track
            </a>
          </li>
          <li>
            <a href="#impact-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Price impact at a glance
            </a>
          </li>
          <li>
            <a href="#where-prices-move" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Where prices may move first
            </a>
          </li>
          <li>
            <a href="#buyer-checks" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
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
          Ghaziabad property in 2026 is not just private towers and resale churn. The Ghaziabad Development Authority
          (GDA) is back in the township game with Harnandipuram, a large Aero City plan, a GT Road elevated corridor,
          and a Hindon embankment road. If you are reading{" "}
          <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
            property in Ghaziabad
          </Link>{" "}
          charts, these projects matter. They can add supply, open up outer belts, and change how buyers price a commute.
          They do not make every launch a safe bet.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          A GDA map moves sentiment fast. Your ticket still moves on title, RERA, and whether the road outside your
          tower is real when you move in.
        </blockquote>
      </header>

      <section id="what-gda-pushing" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What GDA is pushing in 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            GDA&apos;s board cleared major funding and layout steps through 2026. The big themes are housing on the
            outer edge of east Ghaziabad, flood protection along the Hindon, and traffic relief on GT Road. State funding for
            Harnandipuram has crossed into thousands of crores on paper. Land buy is slower and patchy in places,
            which is why officials now talk about a smaller Phase 1 patch instead of one clean rectangle on day one.
          </p>
          <p>
            For buyers, that split matters. A government township can steady prices in an outer belt when titles are
            clear. It can also pull attention away from weak private files that rode the same headline. Mature belts
            still trade on society depth. New outer belts trade on whether the road and drain outside your gate show up on
            time.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={GDA_PROJECTS_VISUAL}
            alt="GDA development projects, planned townships, and road builds shaping Ghaziabad property in 2026"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          GDA townships, roads, and new supply: the mix that can move Ghaziabad tickets belt by belt.
        </figcaption>
      </figure>

      <section id="four-projects" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Four GDA projects buyers should track
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These four show up in almost every serious Ghaziabad market note we read in 2026. Read them as direction, not
          as a promise on your exact tower.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Harnandipuram Township</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            GDA&apos;s largest new housing push sits near Raj Nagar Extension, with a long-range plan for tens of
            thousands of homes across hundreds of hectares. Phase 1 is now discussed on a smaller continuous patch,
            often around 40 to 48 hectares, with officials targeting a late 2026 rollout once layout and land chunks
            align. A planned outer ring road link toward the Hindon side is part of the connectivity pitch. For
            private buyers nearby, this can mean more foot traffic and firmer asking rates on clean titles. It can also
            mean more competition when GDA plots hit the market at controlled rates.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Aero City</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            GDA has cleared a large aerocity-themed township plan, often cited around 541 hectares, with land assembly
            targeted in villages such as Morta, Ataur, and Mewla Agri. This is a multi-year build. It pairs with the
            proposed international cricket stadium and the Hindon embankment work. Investors like the scale. End users
            should wait for access roads and utility lines before they pay a full premium on a distant pin.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. GT Road elevated corridor</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            A roughly 2 km, four-lane elevated stretch from Ghanta Ghar to Bhatia Mor is cleared with funding around Rs
            200 crore. The aim is to cut jams at one of Ghaziabad&apos;s worst tri-sections. Build time is often quoted
            at about two years after tender award. This helps daily commuters in established grids more than it lifts a
            raw plot on the far outer belt.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">4. Hindon embankment road</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            A six-lane embankment along the Hindon, often quoted near 6 to 7 km and about Rs 185 to 190 crore, is meant
            to protect the stadium site, Aero City, and Harnandipuram from flood risk while improving access. DPR work
            and a roughly three-year build clock sit ahead once tenders move. For buyers, flood protection can shrink
            the discount on land that used to scare banks and end users every monsoon.
          </p>
        </article>
      </section>

      <section id="impact-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How GDA projects could hit prices
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this table to test a broker&apos;s pitch against the project that actually touches your pin.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">GDA project</th>
                <th className="px-4 py-3 font-medium">What changes on the ground</th>
                <th className="px-4 py-3 font-medium">Working price read (2026)</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {IMPACT_ROWS.map((row, i) => (
                <tr
                  key={row.project}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.project}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.whatItDoes}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.priceRead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Timelines and cost figures are from public GDA board reports and news coverage in 2026. They can shift with
          land assembly and tender awards. Reconfirm on the unit file before you token.
        </p>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={CORRIDOR_VISUAL}
            alt="NH-24 Ghaziabad corridor and GDA-linked growth belts in 2026"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          New GDA townships and NH-24 projects rise together. Compare files, not just the GDA press note.
        </figcaption>
      </figure>

      <section id="where-prices-move" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Where Ghaziabad prices may move first
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            <strong className="font-semibold text-foreground">Raj Nagar Extension and Hindon belt.</strong> This is
            ground zero for Harnandipuram, Aero City, and the embankment plan. Private launches here will lean hard on
            the GDA story. Compare title and delivery on each stack. A clean GDA adjacency is not a substitute for a
            weak builder file.
          </p>
          <p>
            <strong className="font-semibold text-foreground">NH-24 and Wave City.</strong> Expressway access already
            repriced this corridor. Nearby GDA road and township spend adds confidence for long-hold buyers. If you are
            comparing apartment stacks,{" "}
            <Link href={GAUR_NYC} className="font-medium text-[#CBB27A] hover:underline">
              Gaur NYC Residences in Wave City
            </Link>{" "}
            is one name buyers often pull into the same shortlist. Read RERA and possession on your file, not the corridor
            ad alone.
          </p>
          <p>
            A second apartment file on the same belt is{" "}
            <Link href={VERIDIA} className="font-medium text-[#CBB27A] hover:underline">
              Veridia in Wave City
            </Link>
            . Line it up against Gaur NYC on ticket, tower plan, and possession before you pick one.
          </p>
          <p>
            Tower buyers weighing NH-24 also read{" "}
            <Link href={SKA_DIVINE} className="font-medium text-[#CBB27A] hover:underline">
              SKA Divine
            </Link>{" "}
            when they want a second Wave City file on the same compare sheet.
          </p>
          <p>
            Another name on that list is{" "}
            <Link href={JADE_COUNTY} className="font-medium text-[#CBB27A] hover:underline">
              Jade County
            </Link>
            . Match ticket and possession against the first stack before you token.
          </p>
          <p>
            Villa and larger-format buyers on NH-24 often cross-check{" "}
            <Link href={FOREST_WALK} className="font-medium text-[#CBB27A] hover:underline">
              Forest Walk Villa
            </Link>{" "}
            or{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#CBB27A] hover:underline">
              Karyan on NH-24
            </Link>
            . Different product, same belt logic: delivery and title before you pay for the GDA headline.
          </p>
          <p>
            Larger homes on the corridor sometimes include{" "}
            <Link href={KARYAN_TREVANA} className="font-medium text-[#CBB27A] hover:underline">
              Karyan Trevana on NH-24
            </Link>
            . Same rule: run the file before you treat GDA road spend as your price floor.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Siddharth Vihar.</strong> Premium mid-rise buyers use this
            grid when they want a newer address without Noida tickets.{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner
            </Link>{" "}
            is one example of the product landing here. Growth tracks east Ghaziabad connectivity more than a distant
            Aero City render.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Vasundhara.</strong> Families who want established retail
            with an east Ghaziabad ticket sometimes look at{" "}
            <Link href={FUSION_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Fusion Vasundhara
            </Link>{" "}
            while they compare belts. Run the peak-hour commute before you treat spillover from new GDA schemes as a
            given.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Established cores.</strong> Indirapuram, Vaishali, and
            inner Vasundhara gain more from the GT Road elevated plan and RRTS depth than from a distant GDA township
            map. Browse{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            by belt if live-now depth matters more than a five-year land bet.
          </p>
          <p>
            On Indirapuram Extension and NH-24, large launches like{" "}
            <Link href={PRESTIGE_MAYFLOWER} className="font-medium text-[#CBB27A] hover:underline">
              Prestige City Mayflower
            </Link>{" "}
            sit in the mature-plus-growth pocket: expressway access with an Indirapuram address. Read RERA and the builder
            delivery track before you treat GDA road spend as your price floor.
          </p>
          <p>
            Villa buyers on the wider east Ghaziabad map sometimes cross-check{" "}
            <Link href={ROYAL_ROSEWOOD} className="font-medium text-[#CBB27A] hover:underline">
              Royal Rosewood Villas
            </Link>{" "}
            while they weigh mature grids against NH-24 growth.
          </p>
        </div>
      </section>

      <section id="buyer-checks" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you book on a GDA headline
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Write down three facts first: your commute, your hold period, and whether you need resale depth in three
            years. A GDA township pitch fits a five-year land view better than a family that must move next summer.
          </p>
          <p>
            Then run the file checks. UP RERA on the official portal. Builder delivery on finished phases. All-in ticket
            on your unit, not brochure BSP. A peak-hour drive from the site to your office. Two comparable offers in the
            same belt help.{" "}
            <Link href={ELIGO_WAVE} className="font-medium text-[#CBB27A] hover:underline">
              Eligo in Wave City
            </Link>{" "}
            against another NH-24 tower you are shown is a fair compare habit. If two of those checks fail, pause even
            when the GDA board headline sounds perfect.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_CHECK_VISUAL}
            alt="Buyer reviewing Ghaziabad property options as GDA projects reshape east NCR in 2026"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          GDA projects change the map. Your checklist still decides whether the ticket you pay today holds value.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy after GDA announcements
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Headlines are free. Celeste Abode works buyer-side as a real estate consultant across Ghaziabad and Delhi
            NCR. We compare Raj Nagar Extension, NH-24, Wave City, and Siddharth Vihar stacks on your brief. We spell
            out the all-in ticket against current belt bands and flag delivery or paperwork gaps before you token.
          </p>
          <p>
            That usually means a short discovery call, a tight written shortlist, and site visits only where the belt
            still makes sense after basic checks. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if you already have two towers in mind and want them read against GDA reality, not the launch deck.
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
                Map GDA impact to your belt, compare a few stacks, and book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <GdaDevelopmentImpactGhaziabadCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={gdaDevelopmentImpactGhaziabadFaqSchemaItems} />
      </section>
    </div>
  );
}
