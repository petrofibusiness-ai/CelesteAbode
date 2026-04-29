import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Plane,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { SOBHA_RIVANA_BLOG_PATH } from "@/lib/blog-data";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const PROPERTIES_GN = "/properties-in-greater-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";

/** Listing paths on celesteabode.com (enquiry / inventory). */
const P = {
  sobhaRivanaGuide: SOBHA_RIVANA_BLOG_PATH,
  rgPleiaddes: "/properties-in-greater-noida/rg-pleiaddes",
  eternia: "/properties-in-greater-noida/eternia-residences",
  kviraajMayfair: "/properties-in-greater-noida/kviraaj-mayfair-residency",
  crcJoyous: "/properties-in-greater-noida/crc-joyous",
  renoxThrive: "/properties-in-greater-noida/renox-thrive",
  vvipSector12: "/properties-in-greater-noida/vvip",
  panchsheelIi: "/properties-in-greater-noida/panchsheel-greens-ii",
  vvipYamuna: "/properties-in-yamuna-expressway/vvip-yamuna",
  irishPlatinum: "/properties-in-greater-noida/irish-platinum",
} as const;

/** Location catalogues linked from this card (Noida, Greater Noida, Yamuna Expressway). */
const PROPERTY_CATALOGUE_LINKS: { href: string; label: string }[] = [
  { href: "/properties-in-noida", label: "Properties in Noida" },
  { href: "/properties-in-greater-noida", label: "Properties in Greater Noida" },
  { href: "/properties-in-yamuna-expressway", label: "Properties in Yamuna Expressway" },
];

function PropertiesFlatsHubCard() {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-[#CBB27A]/35 bg-gradient-to-b from-[#0f1112] via-[#12151a] to-[#0c0e10] shadow-lg">
      <div className="border-b border-[#CBB27A]/25 bg-[#CBB27A]/12 px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f1112] ring-1 ring-[#CBB27A]/40">
            <Building2 className="size-5 text-[#CBB27A]" aria-hidden />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#CBB27A] sm:text-xs">
              Properties &amp; flats
            </p>
            <p className="mt-1 text-xs leading-snug text-white/65 sm:text-sm">
              Jump to the Noida, Greater Noida, or Yamuna Expressway catalogues on our site.
            </p>
          </div>
        </div>
      </div>
      <ul className="m-0 list-none p-0 px-4 pb-3 sm:px-5">
        {PROPERTY_CATALOGUE_LINKS.map((item) => (
          <li key={item.href} className="border-t border-white/[0.06] first:border-t-0 first:pt-1">
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-3 py-2.5 text-sm text-white transition-colors hover:text-[#CBB27A] sm:text-[15px]"
            >
              <span className="min-w-0 leading-snug">{item.label}</span>
              <ChevronRight
                className="size-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:text-[#CBB27A]"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** FAQ items: plain text answers for schema + accordion. */
export const bestLocationsGreaterNoidaFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Is Greater Noida good for property investment in 2026?",
    answer:
      "Yes, for buyers with a clear purpose. End users typically get more space and amenities for the ticket size versus core Noida. Investors can find better yield in rental-active belts and longer-term appreciation linked to Jewar Airport and metro expansion, if they match sector to commute and hold period.",
  },
  {
    question: "Which is the best location to buy flats in Greater Noida?",
    answer:
      "For families buying to live, Greater Noida West (Sectors 1, 10, 12, and 16) often offers the best mix of ready inventory, schools, and daily infrastructure. For long-term investors comfortable with a 5+ year horizon, Yamuna Expressway sectors near the airport can offer higher upside, with different liquidity and maturity trade-offs.",
  },
  {
    question: "What is the average price of flats in Greater Noida?",
    answer:
      "A practical working band is roughly ₹6,000 to ₹8,650 per sq ft across Greater Noida and Greater Noida West on average, with premium towers above that and developing zones sometimes below. Always confirm BSP, floor, facing, and all-in costs on the exact unit.",
  },
  {
    question: "Are 3 BHK flats in Greater Noida a good buy?",
    answer:
      "For many families, yes. Ready-to-move 3 BHK options in the roughly ₹1.1 to ₹1.7 crore range (depending on sector, tower, and size) can compare favourably to equivalent space in Noida or Gurgaon. Use RERA, OC status, and real commute tests before booking.",
  },
  {
    question: "How has Jewar Airport affected property prices in Greater Noida?",
    answer:
      "The Yamuna Expressway corridor has seen meaningful appreciation since the airport was announced, often cited in the 20% to 30% range in several micro-markets. Phase 1 opened in March 2026; broader demand and pricing effects are expected to build as operations and supporting development scale up.",
  },
  {
    question: "What should I check before buying a flat in Greater Noida?",
    answer:
      "Verify UP RERA registration on the official portal, builder track record, occupation certificate status for ready inventory, actual peak-hour commute from the project (not map distance alone), and how active resale and rentals are in that specific sector.",
  },
];

function SectionFigure({
  src,
  alt,
  caption,
  ratioClass = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  caption: string;
  ratioClass?: string;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md">
      <div className={`relative w-full ${ratioClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
          unoptimized={src.startsWith("http")}
        />
      </div>
      <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}

export function BestLocationsFlatsGreaterNoida2026Content() {
  return (
    <div className="blog-article font-poppins">
      <PropertiesFlatsHubCard />

      <nav
        className="mb-12 rounded-2xl border border-gray-100 bg-gray-50/90 p-6"
        aria-label="Article contents"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#CBB27A]">
          In this guide
        </p>
        <ol className="space-y-2.5 text-sm text-gray-700">
          <li>
            <a href="#why-2026" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why Greater Noida in 2026?
            </a>
          </li>
          <li>
            <a href="#locations" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Best locations to buy flats
            </a>
          </li>
          <li>
            <a href="#before-buy" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What to look for before you buy
            </a>
          </li>
          <li>
            <a href="#3bhk" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              3 BHK: what to expect
            </a>
          </li>
          <li>
            <a href="#price-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Price range by zone
            </a>
          </li>
          <li>
            <a href="#faq" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              FAQ
            </a>
          </li>
        </ol>
      </nav>

      <header className="mb-12 scroll-mt-24" id="lead">
        <p className="mb-6 text-lg leading-relaxed text-gray-700 md:text-xl">
          Greater Noida is no longer just an affordable alternative to Noida. Flat prices across the belt have risen
          roughly 98% over the last five years. Jewar Airport opened in March 2026.
          The Aqua Line metro story is extending. There is still room to enter before the market prices in the next
          layer of infrastructure if you pick the right sector for your job, school runs, and hold period.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: TrendingUp, text: "~98% / 5 yrs (belt-wide context)" },
            { icon: Plane, text: "Jewar Phase 1 · Mar 2026" },
            { icon: MapPin, text: "Zone-first buying" },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm md:text-sm"
            >
              <Icon className="size-3.5 text-[#CBB27A] shrink-0" aria-hidden />
              {text}
            </span>
          ))}
        </div>
        <p className="mt-6 text-gray-600 leading-relaxed">
          This guide covers the best locations to buy property in Greater Noida right now, what drives growth in each
          zone, and what a realistic buyer should verify before signing.
        </p>
      </header>

      {/* Why 2026 */}
      <section id="why-2026" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          <span className="h-7 w-1 shrink-0 rounded-full bg-[#CBB27A]" />
          Why Greater Noida in 2026?
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Jewar Airport: phase 1 was inaugurated in March 2026, with early capacity around 12 million passengers
            annually and commercial flights expected to scale through 2026. The airport sits where the Yamuna
            Expressway, Eastern Peripheral Expressway, and Delhi-Mumbai Expressway meet: three national corridors in
            one node. Yamuna-side land and apartment markets have already repriced on anticipation; the next chapter is
            operational demand.
          </p>
          <p>
            On price, Greater Noida West averages roughly ₹8,650/sq ft today, versus about ₹12,550/sq ft in central Noida
            sectors and ₹14,500/sq ft in premium Noida corridors. Useful context when you want more carpet for the same
            ticket. When you are ready to compare live inventory, start from{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>
            .
          </p>
          <p>
            The infrastructure pipeline beyond the airport includes Ghaziabad-Jewar RRTS progress, metro extensions
            at DPR stage, and the Noida International Film City footprint near Sector 21 moving through early phases. Most
            of this is underway or live, not just brochure copy.
          </p>
        </div>

        <SectionFigure
          src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/yamuna_expressway.png"
          alt="Yamuna Expressway corridor and open landscape toward airport-linked growth"
          caption="Yamuna Expressway belt: airport-adjacent growth narrative for long-horizon buyers."
        />
      </section>

      {/* Locations */}
      <section id="locations" className="scroll-mt-24 mb-14">
        <h2 className="mb-2 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          <span className="h-7 w-1 shrink-0 rounded-full bg-[#CBB27A]" />
          Best locations to buy flats in Greater Noida
        </h2>
        <p className="mb-8 text-gray-600 leading-relaxed">
          Below is a zone-by-zone read: who each belt suits, what is driving prices, and the honest trade-off.
        </p>

        <div className="space-y-10">
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                1. Greater Noida West (Noida Extension): Sectors 1, 10, 12, 16
              </h3>
              <span className="rounded-full bg-[#CBB27A]/15 px-3 py-1 text-xs font-medium text-[#6b5d2e]">
                End users · families
              </span>
            </div>
            <p className="mb-4 text-sm text-[#8a7848]">Who it is for: first-time buyers, families, live-in professionals.</p>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                This is the most liquid residential belt in the region, still widely called Noida Extension. Typical flats
                trade from about ₹7,550 to ₹10,700/sq ft, with a working average near ₹8,650/sq ft. Five-year appreciation
                in the belt is often quoted around 144%; three-year moves near 66% (entry timing matters).
              </p>
              <p>
                Sector 1 packs serious school density: St. Xavier&apos;s, Lotus Valley International, Aster Public School,
                and peers within practical distance. Active launches there often sit in the same conversation as{" "}
                <Link href={P.sobhaRivanaGuide} className="font-medium text-[#CBB27A] hover:underline">
                  Sobha Rivana
                </Link>{" "}
                and{" "}
                <Link href={P.rgPleiaddes} className="font-medium text-[#CBB27A] hover:underline">
                  RG Pleiaddes
                </Link>
                .
              </p>
              <p>
                Techzone IV carries heavy office-adjacent demand.{" "}
                <Link href={P.eternia} className="font-medium text-[#CBB27A] hover:underline">
                  Eternia Residences
                </Link>{" "}
                is a frequent anchor in that pocket. The same commute band often includes{" "}
                <Link href={P.kviraajMayfair} className="font-medium text-[#CBB27A] hover:underline">
                  Kviraaj Mayfair Residency
                </Link>{" "}
                and{" "}
                <Link href={P.crcJoyous} className="font-medium text-[#CBB27A] hover:underline">
                  CRC Joyous
                </Link>
                .
              </p>
              <p>
                Sector 10 and Sector 12 add options such as{" "}
                <Link href={P.renoxThrive} className="font-medium text-[#CBB27A] hover:underline">
                  Renox Thrive
                </Link>{" "}
                and{" "}
                <Link href={P.vvipSector12} className="font-medium text-[#CBB27A] hover:underline">
                  VVIP Sector 12
                </Link>
                . All of it still needs a real commute test at your office hour.
              </p>
              <p>
                Sector 16 hosts large ready townships such as Panchsheel Greens 2, with occupation certificates on multiple
                towers and residents already in. If you want keys-first certainty, the live inventory and enquiry path sit
                on{" "}
                <Link href={P.panchsheelIi} className="font-medium text-[#CBB27A] hover:underline">
                  Panchsheel Greens-II
                </Link>
                .
              </p>
              <p>
                Rental yield is often cited around 3% in parts of Sector 16B; Shahberi pockets have printed higher (~5.7%
                in some surveys). Always verify on the exact stack. Demand is driven by households commuting to Noida and
                Ghaziabad offices.
              </p>
              <p className="flex gap-2 rounded-lg border border-amber-200/80 bg-amber-50/80 p-3 text-sm text-amber-950">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" aria-hidden />
                <span>
                  <span className="text-amber-900/90">Watch: </span>
                  peak-hour traffic toward Noida needs a real drive test. Metro is still largely drive-first; future
                  stations will help, but buy for today&apos;s commute.
                </span>
              </p>
            </div>
          </article>

          <SectionFigure
            src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/greater_noida_west_photography.webp"
            alt="Greater Noida West: residential towers and road grid from above"
            caption="Greater Noida West: lived-in grids and high-rise clusters."
          />

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                2. Yamuna Expressway: Sectors 18, 20, 22D, 25, 27
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                5+ year investors
              </span>
            </div>
            <p className="mb-4 text-sm text-[#8a7848]">Who it is for: long-term investors, patient capital.</p>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                This is the airport-adjacent corridor. Sector 27 is among the closest authority sectors
                to Jewar; Film City and industrial clusters add a long-dated demand story. Some micro-markets saw extreme
                plot appreciation through 2020 to 2025; apartment averages rose sharply too. Early entrants captured most of
                that move. The 2026 question is how much runway remains versus execution risk.
              </p>
              <p>
                Entry pricing is often lower than Greater Noida West, roughly ₹4,000 to ₹6,500/sq ft in developing
                sectors. The trade-off is thinner day-one social infrastructure. Buyers here often compare airport-linked
                branded towers with longer hold horizons. One named option on our hub is{" "}
                <Link href={P.vvipYamuna} className="font-medium text-[#CBB27A] hover:underline">
                  VVIP Yamuna Expressway
                </Link>
                .
              </p>
              <p>
                Filter the full belt on{" "}
                <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
                  properties in Yamuna Expressway
                </Link>
                .
              </p>
              <p className="flex gap-2 rounded-lg border border-amber-200/80 bg-amber-50/80 p-3 text-sm text-amber-950">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" aria-hidden />
                <span>
                  <span className="text-amber-900/90">Watch: </span>
                  not a two-year flip story for most units. The payoff aligns with airport operations, jobs, and supporting
                  retail maturing over years.
                </span>
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground md:text-xl">
              3. Sector Zeta 1, Zeta 2, and Sector 36
            </h3>
            <p className="mb-4 text-sm text-[#8a7848]">Who it is for: families wanting quieter, settled grids.</p>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                Established residential sectors with strong links to Pari Chowk and the Noida-Greater Noida Expressway.
                Zeta 1 and Zeta 2 have seen very strong three-year appreciation prints (~146% in several reports), among
                the best in Greater Noida for that window.
              </p>
              <p>
                Density feels lower than the busiest Noida Extension clusters; schools, hospitals, and daily retail are
                comparatively mature. Good fit when livability beats headline “new launch” buzz. Sector 51 on the Greater
                Noida grid often sits in the same shortlist conversation as Zeta. One club-heavy name there is{" "}
                <Link href={P.irishPlatinum} className="font-medium text-[#CBB27A] hover:underline">
                  Irish Platinum
                </Link>
                .
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground md:text-xl">4. Techzone IV and Techzone V</h3>
            <p className="mb-4 text-sm text-[#8a7848]">Who it is for: professionals and rental-focused investors.</p>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                Inside the Greater Noida West belt with accelerating commercial floorspace. Proximity to Knowledge Park-style
                office hubs makes these sectors practical for buyers who want employment access without paying core
                Noida premiums. Rental demand from young professionals is consistent; planned metro expansion is a
                potential repricing trigger. Still verify station distance on paper versus reality. Techzone IV is where
                many active towers cluster; Techzone V adds parallel supply as the belt fills in. The same Techzone IV
                names above, including{" "}
                <Link href={P.eternia} className="font-medium text-[#CBB27A] hover:underline">
                  Eternia Residences
                </Link>{" "}
                and{" "}
                <Link href={P.crcJoyous} className="font-medium text-[#CBB27A] hover:underline">
                  CRC Joyous
                </Link>
                , are the usual starting points on a site-visit day.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground md:text-xl">5. Knowledge Park 3 and Knowledge Park 5</h3>
            <p className="mb-4 text-sm text-[#8a7848]">Who it is for: student and professional rental investors.</p>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                Near Gautam Buddha University and multiple colleges. Rental demand from students and faculty is relatively
                sticky. Knowledge Park 5 features in Aqua Line extension conversations. Entry can stay competitive versus
                airport-speculation pockets on the expressway. For buy-to-rent screening,{" "}
                <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
                  flats for sale in Greater Noida
                </Link>{" "}
                is usually the fastest way to see what is actually moving.
              </p>
            </div>
          </article>
        </div>

        <SectionFigure
          src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/metro_or_night_view.webp"
          alt="Metro and city lights suggesting NCR connectivity"
          caption="Connectivity context: always clock your actual office route at rush hour, not just map distance."
        />
      </section>

      {/* Before buy */}
      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          <span className="h-7 w-1 shrink-0 rounded-full bg-[#CBB27A]" />
          What to look for before you buy flats in Greater Noida
        </h2>
        <ul className="space-y-4">
          {[
            {
              title: "Ready or under construction",
              body: "Ready inventory with OC removes possession risk. Under-construction can price better but needs builder track record and strict RERA checks.",
            },
            {
              title: "RERA registration",
              body: "Every project must be on UP RERA. Verify the registration ID on the official portal, not on a PDF alone.",
            },
            {
              title: "Resale liquidity",
              body: "Large townships (1,000+ units) usually trade more often. Small standalone blocks can be harder to exit in 3 to 5 years.",
            },
            {
              title: "Rental demand by sector",
              body: "Greater Noida West: strong 2 & 3 BHK depth. Knowledge Parks: academic demand. Yamuna Expressway: rental base still building in many towers.",
            },
            {
              title: "Commute reality",
              body: "Greater Noida is planned but vast, so peak-hour variance by corridor is huge. Test twice before you token.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4 md:p-5"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <div>
                <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-700 leading-relaxed md:text-base">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 BHK */}
      <section id="3bhk" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          <span className="h-7 w-1 shrink-0 rounded-full bg-[#CBB27A]" />
          3 BHK flats in Greater Noida: what to expect
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            3 BHK is the configuration most families use to compare against Noida. In Greater Noida West (Sector
            16-style belts), a 3 BHK in roughly 1,250 to 1,525 sq ft carpet often lands near ₹1.1 to ₹1.7 crore depending
            on tower, floor, and facing. That is a wide value gap versus similar sizes in premium Noida sectors.
          </p>
          <p>
            Zeta sectors offer more mature civic grids; Yamuna Expressway sectors can offer lower entry with developing
            surroundings.
          </p>
          <p>
            When you want configurations and tickets in one place, use{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>
            . If you want a narrated shortlist for 3 BHK specifically,{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            and we line up projects to your belt and budget.
          </p>
        </div>
      </section>

      <SectionFigure
        src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/3bhk_family_living.webp"
        alt="3 BHK home interior, clubhouse with pool, and high-rise tower with green podium"
        caption="3 BHK family living: layouts, clubhouse, and tower."
      />

      {/* Price table */}
      <section id="price-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          <span className="h-7 w-1 shrink-0 rounded-full bg-[#CBB27A]" />
          Apartments in Greater Noida: price range by zone (2026)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Zone</th>
                <th className="px-4 py-3 font-medium">Avg. flat rate (per sq ft)</th>
                <th className="px-4 py-3 font-medium">5-yr appreciation (indicative)</th>
                <th className="px-4 py-3 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">Greater Noida West</td>
                <td className="px-4 py-3">₹8,650</td>
                <td className="px-4 py-3">~144%</td>
                <td className="px-4 py-3">End users, families</td>
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50/80">
                <td className="px-4 py-3 font-medium">Zeta 1 &amp; 2</td>
                <td className="px-4 py-3">₹8,000 to 9,500</td>
                <td className="px-4 py-3">~146% (3-yr prints)</td>
                <td className="px-4 py-3">Settled living</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">Yamuna Expressway</td>
                <td className="px-4 py-3">₹4,000 to 6,500</td>
                <td className="px-4 py-3">158%+ (apartments, early cycle)</td>
                <td className="px-4 py-3">Long-term investors</td>
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50/80">
                <td className="px-4 py-3 font-medium">Techzone IV &amp; V</td>
                <td className="px-4 py-3">₹7,500 to 9,000</td>
                <td className="px-4 py-3">Rising</td>
                <td className="px-4 py-3">Professionals, rentals</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">Knowledge Parks</td>
                <td className="px-4 py-3">₹5,500 to 7,500</td>
                <td className="px-4 py-3">Stable income story</td>
                <td className="px-4 py-3">Rental investors</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500 md:text-sm">
          Figures are market-wide references. Your stack will move with floor, facing, PLC, parking, and builder brand.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          <span className="h-7 w-1 shrink-0 rounded-full bg-[#CBB27A]" />
          Frequently asked questions
        </h2>
        <SobhaRivanaFaqAccordion items={bestLocationsGreaterNoidaFaqSchemaItems} />
      </section>

      {/* Next step */}
      <section
        className="scroll-mt-24 rounded-2xl border border-[#CBB27A]/35 bg-gradient-to-br from-[#0f1112] to-[#1a1d22] px-6 py-10 text-center text-white shadow-lg"
        id="next-step"
      >
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-white font-poppins md:text-2xl">Next step</h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white md:text-base">
          Shortlist by belt and budget on our hubs, or book a consultation. We map suitable properties and flats to your commute, school
          needs, and hold period without the hard sell.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href={PROPERTIES_GN}
            className="inline-flex items-center justify-center rounded-xl bg-[#CBB27A] px-6 py-3 text-sm font-medium text-[#0f1112] transition hover:bg-[#d4c48a]"
          >
            Properties in Greater Noida
          </Link>
          <Link
            href={FLATS_GN}
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Flats for sale in Greater Noida
          </Link>
          <Link
            href={PROPERTIES_YE}
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Yamuna Expressway properties
          </Link>
          <Link
            href={CONSULT}
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Book a free consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
