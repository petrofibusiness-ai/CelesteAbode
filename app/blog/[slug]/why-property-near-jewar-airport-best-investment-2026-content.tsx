import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const PROPERTIES_GN = "/properties-in-greater-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const ACE_VERDE = "/properties-in-yamuna-expressway/ace-verde-sector-22a-yamuna-expressway";
const ACE_TERRA = "/properties-in-yamuna-expressway/ace-terra-sector-22d-yeida";
const ELITE_X = "/properties-in-yamuna-expressway/elite-x";
const GAUR_CHRYSALIS = "/properties-in-yamuna-expressway/gaur-chrysalis-sector-22d-yeida";
const GODREJ_MAJESTY = "/properties-in-greater-noida/godrej-majesty";
const IRISH_ETA = "/properties-in-greater-noida/irish-eta-1-greater-noida";
const ACE_SECTOR_150 = "/properties-in-noida/ace-sector-150-noida";

const VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Property%20Near%20Jewar%20Airport/Property%20Near%20Jewar%20Airport%20_1.webp";

const VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Property%20Near%20Jewar%20Airport/Property%20Near%20Jewar%20Airport%20_2.webp";

const VISUAL_3 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Property%20Near%20Jewar%20Airport/Property%20Near%20Jewar%20Airport%20_3.webp";

const BELT_ROWS: { belt: string; drive: string; check: string }[] = [
  {
    belt: "Yamuna Expressway (22A, 22D and nearby YEIDA)",
    drive: "Lowest entry among these belts. Closest to the airport demand story.",
    check: "Best ROI setup if the project delivers. Rent may stay modest while the sector fills.",
  },
  {
    belt: "Greater Noida",
    drive: "Higher ticket than YEIDA. More buyers already live there, so resale can be easier.",
    check: "Airport is farther. You pay more for a market that is already moving.",
  },
  {
    belt: "Noida Expressway / Sector 150",
    drive: "Premium Noida price. Airport is 40 to 45 minutes, not next door.",
    check: "ROI here is a Noida story first. Jewar is extra, not the main number.",
  },
  {
    belt: "Older Noida and Delhi",
    drive: "Price already includes the city. Less room for airport-led gain.",
    check: "Fine if you need liquidity today. Weak if Jewar is your only thesis.",
  },
];

export const whyPropertyNearJewarAirportFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Why is property near Jewar Airport an investment story in 2026?",
    answer:
      "Noida International Airport at Jewar started passenger flights in June 2026. That is a real demand driver, not a drawing. Property near Jewar Airport on Yamuna Expressway still often costs less per sq ft than premium Noida. Investors buy the gap plus a few years of wait. Returns are not guaranteed on every tower.",
  },
  {
    question: "Is property near Jewar Airport the best investment opportunity in 2026?",
    answer:
      "For ROI, it is one of the stronger NCR bets this year if you can wait 3 to 7 years and you pick a project that will actually finish. Lower entry than many Noida Expressway stacks is the main number. It is not the best buy if you need rent from month one or if you overpay on a weak file.",
  },
  {
    question: "Where should an investor buy property near Jewar Airport?",
    answer:
      "Most investment tickets sit on Yamuna Expressway in YEIDA sectors such as 22A and 22D. Greater Noida costs more and is farther from the terminal. Sector 150 is a Noida price. Match the belt to your budget and hold period, then check the builder.",
  },
  {
    question: "Will I get high rental yield near Jewar Airport?",
    answer:
      "Usually no, not at the start. The ROI case is mainly capital growth as the airport and the sector mature. Rent can come later. If you need strong rent now, look at a busier Noida or Greater Noida pocket as well.",
  },
  {
    question: "Who is this buy for?",
    answer:
      "Investors who want ROI and can leave money in for a few years. NRIs and NCR buyers who already have a home elsewhere. This page is not written only for people who want to move in next month.",
  },
  {
    question: "Can Celeste Abode shortlist an investment near Jewar Airport?",
    answer:
      "Yes. Tell us your budget, hold years, and target return style. We compare full price, delivery, and the airport pin. Celeste Abode handles the RERA and booking file. You keep the final call.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Yamuna Expressway", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function WhyPropertyNearJewarAirportCtaPair({
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
      {renderCell(PROPERTIES_YE, "Properties in Yamuna Expressway", "primary")}
      {renderCell(CONSULT, "Book a free consultation", "secondary")}
    </div>
  );
}

export function WhyPropertyNearJewarAirportBestInvestment2026Content() {
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
            <a href="#why-near" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why property near Jewar Airport
            </a>
          </li>
          <li>
            <a href="#where" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Property near Jewar Airport
            </a>
          </li>
          <li>
            <a href="#investment-2026" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why Property Near Jewar Airport is the Best Investment Opportunity in 2026
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Where the ROI sits
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How we help
            </a>
          </li>
          <li>
            <a href="#faq" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Questions people actually ask
            </a>
          </li>
        </ol>
      </nav>

      <header className="mb-12 scroll-mt-24" id="lead">
        <p className="text-lg leading-[1.75] text-gray-700 md:text-xl">
          This page is for people who want return on money, not only a house to live in. Property near Jewar Airport
          is on investor lists in 2026 because Noida International Airport is open and Yamuna Expressway tickets are
          still often cheaper than premium Noida. ROI comes from that gap plus time. It does not come from every
          launch. We use the same checks on site visits: full price, delivery, and whether the sector can actually
          attract the next buyer.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Buy for appreciation over a few years. Treat rent as extra. The airport helps the story. The project decides
          the return.
        </blockquote>
      </header>

      <section id="why-near" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why property near Jewar Airport
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Why property near Jewar Airport works as an investment in 2026 is two facts. One, passenger flights started
            in June 2026. Phase one is built for about 12 million passengers a year. Demand around the airport is no
            longer a hope. Two, you still often pay less per sq ft on Yamuna Expressway than on premium Noida Expressway
            for a similar size. Investors buy that gap. Jobs, cargo, and more flights will take years. Your money needs
            that time.
          </p>
          <p>
            That is enough to look. It is not enough to book the first tower. Two projects 8 km apart can give very
            different returns.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_1}
            alt="Why property near Jewar Airport: Yamuna Expressway, terminal, and new homes"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          The airport is open. ROI still depends on the project you buy and the price you pay.
        </figcaption>
      </figure>

      <section id="where" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Property near Jewar Airport
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Property near Jewar Airport, for most investors, means Yamuna Expressway sectors in YEIDA.{" "}
            <Link href={ACE_VERDE} className="font-medium text-[#CBB27A] hover:underline">
              Ace Verde
            </Link>{" "}
            in Sector 22A, and Sector 22D names such as{" "}
            <Link href={ACE_TERRA} className="font-medium text-[#CBB27A] hover:underline">
              Ace Terra
            </Link>
            ,{" "}
            <Link href={ELITE_X} className="font-medium text-[#CBB27A] hover:underline">
              Elite X
            </Link>
            , and{" "}
            <Link href={GAUR_CHRYSALIS} className="font-medium text-[#CBB27A] hover:underline">
              Gaur Chrysalis
            </Link>{" "}
            are files we walk for this pin. Same airport story. Different ticket, possession, and exit path.
          </p>
          <p>
            If you want a more liquid resale market and can pay up, see{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#CBB27A] hover:underline">
              properties in Greater Noida
            </Link>{" "}
            such as{" "}
            <Link href={GODREJ_MAJESTY} className="font-medium text-[#CBB27A] hover:underline">
              Godrej Majesty
            </Link>{" "}
            or{" "}
            <Link href={IRISH_ETA} className="font-medium text-[#CBB27A] hover:underline">
              Irish ETA-1
            </Link>
            . The airport is farther. You are buying a busier grid. If your money is meant for premium Noida,{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150
            </Link>{" "}
            is a different ROI math. Higher entry. Jewar is not the main reason.
          </p>
          <p>
            Start from{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#CBB27A] hover:underline">
              Properties in Yamuna Expressway
            </Link>{" "}
            or{" "}
            <Link href={FLATS_GN} className="font-medium text-[#CBB27A] hover:underline">
              flats in Greater Noida
            </Link>{" "}
            if you already know the budget band. Then we compare full price and delivery, not only the airport name.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_2}
            alt="Property near Jewar Airport on Yamuna Expressway: highway, metro, and new towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          YEIDA is the main ROI pin. Greater Noida and Sector 150 are different tickets.
        </figcaption>
      </figure>

      <section id="investment-2026" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why Property Near Jewar Airport is the Best Investment Opportunity in 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Why Property Near Jewar Airport is the Best Investment Opportunity in 2026 for one kind of buyer: someone who
            wants ROI and can wait. You enter below many Noida prices. The airport is already taking passengers. More
            flights and cargo should bring more users and more resale interest over time. That is the return path.
            It is not a fixed percentage. A late project or a fat all-in price can wipe the edge.
          </p>
          <p>
            Rent is usually the smaller part at the start. Plan for capital growth over 3 to 7 years, then see if rent
            helps. Check the builder’s other deliveries. Check the full price with floor, parking, and extras. Celeste
            Abode handles the RERA and booking file so the investment is on paper, not only on a brochure.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Where the ROI sits
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          This is investment math, not a school-run map. Your exact return still depends on the unit you buy.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Belt</th>
                <th className="px-4 py-3 font-medium">Investor angle</th>
                <th className="px-4 py-3 font-medium">What can hurt ROI</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {BELT_ROWS.map((row, i) => (
                <tr
                  key={row.belt}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.belt}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.drive}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_3}
            alt="Best investment opportunity in 2026 near Jewar Airport: new homes along the expressway"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Lower entry and an open airport help ROI. A weak project still loses money.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How we help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Tell us your budget, how many years you can wait, and the return you are aiming for. We compare Yamuna
            Expressway and Greater Noida tickets on full price and delivery, then only take you to sites that still fit
            an investment brief. See{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for what the call covers, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>
            .
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
                Tell us your budget and how long you can wait. We will shortlist for return, not only for moving in.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <WhyPropertyNearJewarAirportCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions people actually ask
        </h2>
        <SobhaRivanaFaqAccordion items={whyPropertyNearJewarAirportFaqSchemaItems} />
      </section>
    </div>
  );
}
