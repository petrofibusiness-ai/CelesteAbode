import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const PROPERTIES_NOIDA = "/properties-in-noida";
const PROPERTIES_GN = "/properties-in-greater-noida";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const FLATS_NOIDA = "/flats-for-sale-in-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const RESIDENTIAL_NOIDA = "/residential-property-in-noida";
const COMMERCIAL_NOIDA = "/commercial-property-in-noida";

const ACE_SECTOR_150 = "/properties-in-noida/ace-sector-150-noida";
const PRATEEK_SECTOR_150 = "/properties-in-noida/prateek-sector-150-noida";
const PRATEEK_CANARY = "/properties-in-noida/prateek-canary-sector-150-noida";
const SMART_WORLD_ELIE = "/properties-in-noida/smart-world-elie-saab-residencies";
const TRUMP_TOWERS = "/properties-in-noida/trump-towers-noida";
const IVORY_COUNTY = "/properties-in-noida/ivory-county";
const JACOB_AND_CO = "/properties-in-noida/jacob-and-co";
const GODREJ_MAJESTY = "/properties-in-greater-noida/godrej-majesty";
const GODREJ_ARDEN = "/properties-in-greater-noida/godrej-arden-mu-1-greater-noida";
const SOBHA_RIVANA = "/properties-in-greater-noida/sobha-rivana";
const IRISH_ETA = "/properties-in-greater-noida/irish-eta-1-greater-noida";
const ACE_HANEI = "/properties-in-greater-noida/ace-hanei";
const ELITE_X = "/properties-in-yamuna-expressway/elite-x";

const AUCTION_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/%E2%82%B93%2C300%20Crore%20Noida%20Land%20Auction%202026%20blog/%E2%82%B93%2C300%20Crore%20Noida%20Land%20Auction%202026_2.webp";

const PREMIUM_BELT_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/%E2%82%B93%2C300%20Crore%20Noida%20Land%20Auction%202026%20blog/%E2%82%B93%2C300%20Crore%20Noida%20Land%20Auction%202026_3.webp";

const BUYER_CHECK_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway/How%20Noida%20International%20Airport%20is%20Boosting%20Property%20in%20Yamuna%20Expressway_3.webp";

const AUCTION_ROWS: { plot: string; whatSold: string; buyerRead: string }[] = [
  {
    plot: "Sector 108 (mixed-use)",
    whatSold:
      "About 49,932 sqm (~12.5 acres) on the Noida-Greater Noida Expressway; M3M bid ~₹1,839 crore vs ~₹836 crore reserve",
    buyerRead:
      "This is the plot that broke the chart. New homes here will open expensive. Celeste Abode checks the full home price against that land cost before you book.",
  },
  {
    plot: "Sector 96",
    whatSold: "24,000 sqm commercial; sold for ~₹414.8 crore against a ₹410 crore reserve",
    buyerRead:
      "Almost no fight here. Demand was selective. Location still decides the ticket, not the auction headline.",
  },
  {
    plot: "Sector 98 (two plots)",
    whatSold: "Two 24,000 sqm commercial plots; about ₹414 crore each against ₹410 crore reserves",
    buyerRead:
      "Quiet but real take-up. Nearby home launches may firm later. Watch them with Celeste Abode, not with hope alone.",
  },
  {
    plot: "Sector 132",
    whatSold: "22,403 sqm commercial; sold for ~₹271.93 crore against a ₹269 crore reserve",
    buyerRead:
      "Tiny lift over reserve. Do not use this sale to justify a higher flat price across the belt.",
  },
];

export const noida3300CroreLandAuctionFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What was the ₹3,300 crore Noida land auction?",
    answer:
      "In early September 2026, the Noida Authority sold five commercial and mixed-use plots for about ₹3,300 crore. The star deal was Sector 108 on the Noida-Greater Noida Expressway: about 49,932 sqm, where M3M bid around ₹1,839 crore, more than double the reserve of about ₹836 crore. Four other plots in Sectors 96, 98, and 132 sold closer to reserve. One plot stole the night. The rest told a calmer story.",
  },
  {
    question: "Does a high land bid mean every flat in Noida will get costlier?",
    answer:
      "No. A record land bid can push new launches on that plot higher and lift mood nearby, but it does not reprice every resale overnight. Older areas and weak projects can still sit. Match the news to the area you are actually buying in. Celeste Abode does that matching with you.",
  },
  {
    question: "Why did Sector 108 fetch such a premium?",
    answer:
      "Sector 108 sits on the Expressway with strong road access, and metro on the Botanical Garden to Sector 142 Aqua Line is planned. Mixed-use rules let a builder put homes and offices on one site. Officials called it the highest commercial plot bid in Noida in about 20 years. With stamp duty and charges, the builder's total can near ₹2,000 crore. Scarce land plus big demand equals a fight.",
  },
  {
    question: "Where should buyers look in Noida and Greater Noida after this auction?",
    answer:
      "Expressway and Sector 150 if you want premium living with clearer delivery. Greater Noida and Yamuna Expressway if you can wait for Jewar-led growth. Ready Noida areas if you need to move in soon. Celeste Abode maps your brief to the right belt, then clears RERA, full price, and possession before you book.",
  },
  {
    question: "Can Celeste Abode help me buy after the Noida land auction?",
    answer:
      "Yes. We work for buyers across Noida, Greater Noida, and Yamuna Expressway. We shortlist with reasons, lock the full price, check RERA and delivery, and take you on visits only when the project still makes sense after the headline fades. You do not chase paperwork alone. We make sure of it.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function Noida3300CroreLandAuctionCtaPair({
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
      {renderCell(PROPERTIES_NOIDA, "Properties in Noida", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function Noida3300CroreLandAuctionPremiumDestination2026Content() {
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
              The night Noida land went nuclear
            </a>
          </li>
          <li>
            <a href="#what-sold" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What ₹3,300 crore actually bought
            </a>
          </li>
          <li>
            <a href="#why-premium" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why builders fought so hard
            </a>
          </li>
          <li>
            <a href="#auction-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Five plots, five different stories
            </a>
          </li>
          <li>
            <a href="#where-premium-shows" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Where homebuyers feel it first
            </a>
          </li>
          <li>
            <a href="#before-buy" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How Celeste Abode keeps you safe
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What happens when you call us
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
          Picture this. A Tuesday evening in September 2026. The Noida Authority puts five plots on the block. By the
          time the bidding ends, the tally sits near ₹3,300 crore. One Sector 108 parcel alone rockets past ₹1,800 crore.
          Officials call it the highest commercial plot bid in Noida in about 20 years. This is not a brochure. This is
          big builders writing cheques on{" "}
          <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
            property in Noida
          </Link>{" "}
          and, by extension, on the wider{" "}
          <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
            Greater Noida
          </Link>{" "}
          story. The question for you is sharper than the headline: if land just got this expensive, what does that do
          to the home you are about to buy?
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Builders just told the market what Noida land is worth. Celeste Abode makes sure your home ticket still makes
          sense for you.
        </blockquote>
      </header>

      <section id="what-sold" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What ₹3,300 crore actually bought
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            The night belonged to Sector 108. A mixed-use plot of about 49,932 square metres on the Noida-Greater Noida
            Expressway. Reserve price near ₹836 crore. Final bid around ₹1,839 crore from M3M, roughly 120% above
            reserve. DLF was in the fight too. Add stamp duty and charges, and the builder's full outlay can near ₹2,000
            crore. That works out to about ₹147 crore an acre. When land costs that much before a single brick is laid,
            the homes that rise on it will not open soft.
          </p>
          <p>
            Then look at the rest of the card. Sector 96 sold for about ₹414.8 crore. Two Sector 98 plots sold for about
            ₹414 crore each. Sector 132 sold for about ₹271.93 crore. All of them sat close to reserve. Same auction.
            Same city. Completely different energy. Expressway mixed-use drew blood. The quieter plots did not. That is
            your first lesson on{" "}
            <Link href={COMMERCIAL_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              commercial property in Noida
            </Link>
            : location is not a slogan. It is the whole game.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={AUCTION_VISUAL}
            alt="Gavel and investors on a Noida site plan overlooking Expressway signs for Noida and Greater Noida"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Five plots. One war. The Expressway is where Celeste Abode starts your shortlist after this auction.
        </figcaption>
      </figure>

      <section id="why-premium" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why builders fought so hard
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Nobody pays double reserve for fun. Behind that Sector 108 number sit three reasons every serious buyer should
          understand before a sales deck turns the auction into a fairy tale.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Expressway land this size almost never comes up</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Large mixed-use parcels on the Noida-Greater Noida Expressway are rare, and Sector 108 sits next to offices,
            IT hubs, and planned Aqua Line metro work from Botanical Garden to Sector 142. When two heavyweights fight
            past double reserve, they are not guessing. They are buying scarcity. If Expressway living is on your list,
            put live stacks like{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150
            </Link>{" "}
            and{" "}
            <Link href={PRATEEK_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Prateek Sector 150
            </Link>{" "}
            on the same table. Celeste Abode lines up the full price so you can see which one still earns its ticket.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Expensive land writes expensive home prices</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Mixed-use lets a builder put homes, offices, and shops on one site. That sounds flexible until you remember
            the land bill. At about ₹147 crore an acre before construction, the launch that follows will not be a
            bargain. New stock from that plot will open premium. That does not mean every flat two sectors away jumps
            tomorrow morning. It does mean the floor for fresh inventory in this demand lane just moved up. Browse{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            with that land cost in your head, not with a hope that the auction somehow gifts you free appreciation.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Serious money is betting east of Delhi</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            When DLF and M3M clash over Expressway land, the signal travels farther than Sector 108. Jobs, metro plans,
            and Jewar have pulled capital toward Noida and beyond. Greater Noida and Yamuna Expressway ride the same
            eastward wave, just on a longer wait. Names like{" "}
            <Link href={GODREJ_MAJESTY} className="font-medium text-[#CBB27A] hover:underline">
              Godrej Majesty
            </Link>{" "}
            and{" "}
            <Link href={ELITE_X} className="font-medium text-[#CBB27A] hover:underline">
              Elite X
            </Link>{" "}
            belong on that comparison sheet if your budget can stretch past older Noida grids. The auction did not invent
            that story. It made the story expensive and public.
          </p>
        </article>
      </section>

      <section id="auction-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Five plots, five different stories
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          The next time a sales pitch says “the auction proves every pin will double,” open this table. Five plots went
          under the hammer. Only one turned into a war.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Plot</th>
                <th className="px-4 py-3 font-medium">What sold</th>
                <th className="px-4 py-3 font-medium">Buyer read</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {AUCTION_ROWS.map((row, i) => (
                <tr
                  key={row.plot}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.plot}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.whatSold}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.buyerRead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Figures follow mid-September 2026 reports from the Noida Authority and major business press. Final papers and
          charges can move the exact outlay. Celeste Abode rechecks live numbers on any project before you treat them as
          your home price base.
        </p>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={PREMIUM_BELT_VISUAL}
            alt="Noida and Greater Noida growth corridor after the ₹3,300 crore land auction: Expressway, metro, and towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Premium is a zip code, not a city-wide stamp. Match the auction heat to the tower in front of you.
        </figcaption>
      </figure>

      <section id="where-premium-shows" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Where homebuyers feel it first
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            If you want the lane where the auction heat already shows up in home tickets, start on the Expressway and
            Sector 150. Land is scarce. Buyers already pay up. Ultra-premium names like{" "}
            <Link href={SMART_WORLD_ELIE} className="font-medium text-[#CBB27A] hover:underline">
              Smart World Elie Saab Residencies
            </Link>
            ,{" "}
            <Link href={TRUMP_TOWERS} className="font-medium text-[#CBB27A] hover:underline">
              Trump Towers Noida
            </Link>
            , and{" "}
            <Link href={JACOB_AND_CO} className="font-medium text-[#CBB27A] hover:underline">
              Jacob &amp; Co
            </Link>{" "}
            sit in that conversation for a reason. Mid-premium Expressway options such as{" "}
            <Link href={PRATEEK_CANARY} className="font-medium text-[#CBB27A] hover:underline">
              Prateek Canary
            </Link>{" "}
            and{" "}
            <Link href={IVORY_COUNTY} className="font-medium text-[#CBB27A] hover:underline">
              Ivory County
            </Link>{" "}
            still need a unit-level price check. Celeste Abode clears that number so you are not guessing from a sector
            average.
          </p>
          <p>
            When Noida tickets feel stretched, Greater Noida becomes the smart second look. Put{" "}
            <Link href={SOBHA_RIVANA} className="font-medium text-[#CBB27A] hover:underline">
              Sobha Rivana
            </Link>
            ,{" "}
            <Link href={GODREJ_ARDEN} className="font-medium text-[#CBB27A] hover:underline">
              Godrej Arden
            </Link>
            ,{" "}
            <Link href={IRISH_ETA} className="font-medium text-[#CBB27A] hover:underline">
              Irish ETA-1
            </Link>
            , and{" "}
            <Link href={ACE_HANEI} className="font-medium text-[#CBB27A] hover:underline">
              Ace Hanei
            </Link>{" "}
            on the same brief. Browse{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Greater Noida
            </Link>{" "}
            and{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Yamuna Expressway properties
            </Link>{" "}
            if you can wait for airport-linked demand. Skip them if you need Expressway life this year, not “someday.”
          </p>
          <p>
            And if you need keys sooner than a new-launch land story can deliver, lean on ready{" "}
            <Link href={RESIDENTIAL_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              residential property in Noida
            </Link>
            . The auction proves capital is confident. It does not prove every possession date on every board.
          </p>
        </div>
      </section>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode keeps you safe after the headline
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Headlines sell emotion. Homes need proof. You do not need to chase RERA portals, builder histories, or price
            sheets alone. Celeste Abode checks registration, delivery track, the exact unit price with floor rise and
            parking, and the commute that fits your life. We put two or three live offers from the same belt on one
            sheet, and we clear a project only when it still holds after the ₹3,300 crore news cools down.
          </p>
          <p>
            Start with{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              properties in Noida
            </Link>
            , then we pressure-test{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            on the same brief.{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              Book a free consultation
            </Link>{" "}
            and we will test the auction premium against the project in front of you, not against the press release that
            got you excited.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={BUYER_CHECK_VISUAL}
            alt="Noida International Airport and Expressway towers at dusk: Celeste Abode clears the file before you book"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Auction heat is loud. Celeste Abode makes RERA, possession, and full cost quiet and clear before you book.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What happens when you call Celeste Abode
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            A land auction is one loud night. Your home decision is a longer one. Celeste Abode works for buyers across
            Delhi NCR. We compare Noida and Greater Noida projects to your brief, lock the full price, and clear RERA,
            delivery, and paperwork before you book. You keep the final call. We make sure everything behind that call is
            done.
          </p>
          <p>
            In practice, that means a short discovery call, a written shortlist with reasons you can argue with, and
            site visits only after we have already cleared the file. No wasted Saturdays. No auction hangover. Just the
            stacks that still deserve your money.
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
                Turn the ₹3,300 crore headline into a shortlist you can actually buy from.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <Noida3300CroreLandAuctionCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={noida3300CroreLandAuctionFaqSchemaItems} />
      </section>
    </div>
  );
}
