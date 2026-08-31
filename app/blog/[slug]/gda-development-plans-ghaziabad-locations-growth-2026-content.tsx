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

const GDA_MAP_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/GDA%20Development%20Plans%202026%3A%20Which%20Ghaziabad%20Locations%20Are%20Poised%20for%20Real%20Estate%20Growth%20blog/GDA%20Development%20Plans%202026%20Which%20Ghaziabad%20Locations%20Are%20Poised%20for%20Real%20Estate%20Growth_1.webp";

const GROWTH_BELT_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/GDA%20Development%20Plans%202026%3A%20Which%20Ghaziabad%20Locations%20Are%20Poised%20for%20Real%20Estate%20Growth%20blog/GDA%20Development%20Plans%202026%20Which%20Ghaziabad%20Locations%20Are%20Poised%20for%20Real%20Estate%20Growth_2.webp";

const BUYER_PICK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/GDA%20Development%20Plans%202026%3A%20Which%20Ghaziabad%20Locations%20Are%20Poised%20for%20Real%20Estate%20Growth%20blog/GDA%20Development%20Plans%202026%20Which%20Ghaziabad%20Locations%20Are%20Poised%20for%20Real%20Estate%20Growth_3.webp";

const LOCATION_ROWS: { location: string; gdaLink: string; growthRead: string; bestFor: string }[] = [
  {
    location: "Raj Nagar Extension and Hindon belt",
    gdaLink: "Harnandipuram, Aero City, embankment road, cricket stadium site",
    growthRead: "Highest GDA spend concentration; outer-belt prices may firm if roads and flood works land on time",
    bestFor: "Long-hold buyers who can wait through land assembly and build cycles",
  },
  {
    location: "NH-24 and Wave City",
    gdaLink: "Expressway access plus large private townships alongside new GDA schemes nearby",
    growthRead: "Corridor already repriced; growth now tied to occupancy and delivery, not map lines alone",
    bestFor: "Buyers who want space and can cross-check RERA files tower by tower",
  },
  {
    location: "Siddharth Vihar",
    gdaLink: "Premium east Ghaziabad grid near Delhi-Meerut Road and stadium corridor",
    growthRead: "Mid-rise premium story; rises with connectivity proof and early phase handover",
    bestFor: "End users who want a newer address without core Noida tickets",
  },
  {
    location: "Vasundhara and Raj Nagar Extension (inner)",
    gdaLink: "RRTS depth, Hindon elevated road, spillover from outer GDA townships",
    growthRead: "Steadier liveability gains; less boom-bust than fresh plot launches on the outer edge",
    bestFor: "Families who need daily retail and a shorter possession path",
  },
  {
    location: "Indirapuram and Vaishali",
    gdaLink: "GT Road elevated corridor and mature metro-road grid",
    growthRead: "Society-quality driven growth; distant GDA plans matter less than OC and maintenance depth",
    bestFor: "Buyers who want resale depth and schools within a short drive",
  },
];

export const gdaDevelopmentPlansGhaziabadFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Which Ghaziabad locations are poised for real estate growth in 2026?",
    answer:
      "Raj Nagar Extension and the Hindon belt lead on fresh GDA township and road spend. NH-24 and Wave City suit longer-hold corridor buyers. Siddharth Vihar fits premium mid-rise end users. Vasundhara and inner Raj Nagar Extension gain from RRTS and spillover. Indirapuram and Vaishali grow on society depth and the GT Road elevated plan more than on distant GDA maps.",
  },
  {
    question: "Is Raj Nagar Extension the best GDA growth bet in Ghaziabad?",
    answer:
      "It has the most GDA projects pointed at it: Harnandipuram, Aero City, and the Hindon embankment. That makes it the loudest growth story. It is also the longest build cycle. Strong for a five-year view with clean title. Weak if you need possession in two years and hate patchy roads during construction.",
  },
  {
    question: "Should I buy in Wave City because of GDA plans?",
    answer:
      "Wave City and NH-24 already trade on expressway access and large township scale. Nearby GDA road and housing spend can help sentiment. Your stack still lives or dies on builder delivery and RERA. Compare two Wave City files on merit, not on a GDA press note alone.",
  },
  {
    question: "Are mature belts like Indirapuram still worth buying in 2026?",
    answer:
      "Yes, if you want live-now depth. Indirapuram and Vaishali grow through society quality, schools, and resale churn. The GT Road elevated corridor helps commute more than it creates a new frontier. Match the belt to whether you need growth drama or move-in certainty.",
  },
  {
    question: "Can Celeste Abode help pick a Ghaziabad growth location?",
    answer:
      "Yes. We work buyer-side across Ghaziabad belts and wider Delhi NCR. We map GDA-linked growth to your commute, hold period, and ticket, then shortlist projects that pass RERA and delivery checks. You keep the final call; we cut the noise from launch decks.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function GdaDevelopmentPlansGhaziabadCtaPair({
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

export function GdaDevelopmentPlansGhaziabadLocationsGrowth2026Content() {
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
            <a href="#gda-2026-plan" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What GDA is planning in 2026
            </a>
          </li>
          <li>
            <a href="#growth-locations" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Ghaziabad locations poised for growth
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Location comparison table
            </a>
          </li>
          <li>
            <a href="#match-brief" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Match the location to your brief
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
          GDA&apos;s 2026 plan is not one growth story. It is a map with hot belts and quiet grids. Harnandipuram and
          Aero City point at the belt along the Hindon, east of Raj Nagar Extension. The GT Road elevated corridor points at core commute pain. Wave City and
          NH-24 point at buyers who already bank on expressway access. If you are hunting{" "}
          <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
            property in Ghaziabad
          </Link>{" "}
          for growth, start with the location GDA is actually building toward, then match it to your hold period. The
          hoarding alone will not do that for you.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Growth is a belt where GDA spend, private supply, and your commute line up. Poised does not mean guaranteed.
          It means the map, the roads, and the buyer depth are moving in the same direction.
        </blockquote>
      </header>

      <section id="gda-2026-plan" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What GDA is planning in 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Through 2026, GDA board clearances cluster around four ideas: a large township push near Raj Nagar
            Extension, an Aero City plan on hundreds of hectares, traffic relief on GT Road, and a Hindon embankment
            road for flood protection and access. These are not equal bets for every buyer. They pull growth toward Raj
            Nagar Extension and the Hindon side while they ease the inner commute grid.
          </p>
          <p>
            Private launches along NH-24 and in Siddharth Vihar run on a parallel track. GDA maps open belts. Builders
            fill towers. Your job is to pick the belt where both tracks help you, not just the one with the newest
            render.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={GDA_MAP_VISUAL}
            alt="GDA development plans 2026 and Ghaziabad growth belts across east NCR"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          GDA spend in 2026 clusters on the Hindon belt and core road relief. Pick the location that fits your timeline.
        </figcaption>
      </figure>

      <section id="growth-locations" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Ghaziabad locations poised for real estate growth
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Five belts show up most often when buyers ask where GDA plans could lift values. Read each block against your
          commute and how long you can hold.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Raj Nagar Extension and Hindon belt</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            This is the sharpest GDA growth zone in 2026. Harnandipuram, Aero City, the embankment road, and the cricket
            stadium corridor all sit here. Land was farmland not long ago. If Phase 1 township work and flood protection
            move on schedule, private plots and launches nearby can reprice. If assembly stays patchy, hype can run ahead
            of roads. Treat timelines as working targets until GDA posts the scheme you can book.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. NH-24 and Wave City</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            The Delhi-Meerut Expressway already changed this belt. Nearby GDA road and housing spend adds confidence for
            long-hold buyers. Growth now depends on towers filling and builders delivering phases on time. If you are
            shortlisting apartments here,{" "}
            <Link href={GAUR_NYC} className="font-medium text-[#CBB27A] hover:underline">
              Gaur NYC Residences in Wave City
            </Link>{" "}
            is one stack worth reading on RERA and possession before you compare the next tower on the same corridor.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            A common second read on the same shortlist is{" "}
            <Link href={VERIDIA} className="font-medium text-[#CBB27A] hover:underline">
              Veridia in Wave City
            </Link>
            . Match ticket, plan, and possession against Gaur NYC before you token.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Apartment hunters also pull{" "}
            <Link href={SKA_DIVINE} className="font-medium text-[#CBB27A] hover:underline">
              SKA Divine
            </Link>{" "}
            into the same belt compare when they want another Wave City file on paper.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Another Wave City apartment name on the same compare habit is{" "}
            <Link href={JADE_COUNTY} className="font-medium text-[#CBB27A] hover:underline">
              Jade County
            </Link>
            . Read RERA and possession before you treat corridor hype as your floor.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Villa buyers on NH-24 often look at{" "}
            <Link href={FOREST_WALK} className="font-medium text-[#CBB27A] hover:underline">
              Forest Walk Villa
            </Link>{" "}
            or{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#CBB27A] hover:underline">
              Karyan on NH-24
            </Link>
            . Same belt, different product. Run the file checks on each before you pay for corridor hype.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Larger-format buyers on the same road sometimes add{" "}
            <Link href={KARYAN_TREVANA} className="font-medium text-[#CBB27A] hover:underline">
              Karyan Trevana on NH-24
            </Link>{" "}
            to the villa side of the list.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Siddharth Vihar</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            A newer premium grid for buyers who want mid-rise living near Delhi-Meerut Road without crossing into Noida
            tickets. Names like{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner
            </Link>{" "}
            show the product type landing here. Growth tracks east Ghaziabad connectivity and early handovers more than
            a distant Aero City render.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">4. Vasundhara and inner Raj Nagar Extension</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            RRTS and the Hindon elevated road gave this belt a fresh layer. Outer GDA townships can pull spillover
            demand when families want established retail but still like the east Ghaziabad ticket.{" "}
            <Link href={FUSION_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Fusion Vasundhara
            </Link>{" "}
            is one stack buyers cross-check here. Growth is steadier than fresh plot launches along the Hindon, with less
            land-risk drama.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">5. Indirapuram and Vaishali</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Mature grids that grow through society quality and resale depth. The GT Road elevated plan helps daily
            commute more than it creates a new frontier. Browse{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flats in Ghaziabad
            </Link>{" "}
            in Indirapuram or Vaishali if move-in depth beats a five-year land bet.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Indirapuram Extension on NH-24 is where GDA corridor spend meets an established buyer base.{" "}
            <Link href={PRESTIGE_MAYFLOWER} className="font-medium text-[#CBB27A] hover:underline">
              Prestige City Mayflower
            </Link>{" "}
            is one large township-style launch buyers cross-check when they want expressway access without leaving the
            Indirapuram story.
          </p>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Villa buyers on the wider east Ghaziabad map sometimes add{" "}
            <Link href={ROYAL_ROSEWOOD} className="font-medium text-[#CBB27A] hover:underline">
              Royal Rosewood Villas
            </Link>{" "}
            to the same shortlist.
          </p>
        </article>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          GDA growth locations at a glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this table to sanity-check a pitch against the belt you actually need.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">GDA / corridor link</th>
                <th className="px-4 py-3 font-medium">Growth read (2026)</th>
                <th className="px-4 py-3 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {LOCATION_ROWS.map((row, i) => (
                <tr
                  key={row.location}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.location}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.gdaLink}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.growthRead}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Growth reads are working mid-2026 views from public GDA reports and market tracking. They move with delivery
          and listing mix. Reconfirm on your unit file before you token.
        </p>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={GROWTH_BELT_VISUAL}
            alt="NH-24 Ghaziabad growth corridor and GDA-linked locations in 2026"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          NH-24 and the belt along the Hindon are the two loudest GDA growth stories. Your commute test still picks the location.
        </figcaption>
      </figure>

      <section id="match-brief" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Match the GDA growth belt to your brief
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Write three facts before you book: where you work, how long you can hold, and whether you need resale depth
            in three years. Raj Nagar Extension and the Hindon side win on GDA spend. Indirapuram wins on lived-in depth. NH-24 wins when
            you want a large township and can wait through build cycles.
          </p>
          <p>
            Then compare real stacks on the same belt.{" "}
            <Link href={ELIGO_WAVE} className="font-medium text-[#CBB27A] hover:underline">
              Eligo in Wave City
            </Link>{" "}
            against another NH-24 tower you are shown is a fair habit. Pick two files, read RERA on each, and run the
            peak-hour commute from both pins. Or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            and we will map GDA growth belts to your ticket before the first site visit.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_PICK_VISUAL}
            alt="Aerial view of Ghaziabad roads, flyover, and rising towers as GDA development reshapes growth belts in 2026"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Flyover, open land, and towers on the horizon: pick the Ghaziabad belt that matches your hold period, not just the headline.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you pick a growth belt
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            GDA maps are loud. Celeste Abode works buyer-side as a real estate consultant across Ghaziabad and Delhi
            NCR. We tie GDA-linked growth to your brief, compare projects on all-in ticket and delivery, and flag
            paperwork gaps before you token.
          </p>
          <p>
            That usually means a short discovery call, a written shortlist by belt, and site visits only where the
            stack still makes sense after basic checks. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if you already have two locations in mind and want them read against GDA reality.
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
                Pick a GDA growth belt, compare a few stacks, and book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <GdaDevelopmentPlansGhaziabadCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={gdaDevelopmentPlansGhaziabadFaqSchemaItems} />
      </section>
    </div>
  );
}
