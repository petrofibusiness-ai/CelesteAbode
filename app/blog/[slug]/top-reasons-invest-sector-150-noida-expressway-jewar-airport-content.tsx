import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_NOIDA = "/properties-in-noida";
const FLATS_NOIDA = "/flats-for-sale-in-noida";
const ACE_SECTOR_150 = "/properties-in-noida/ace-sector-150-noida";
const PRATEEK_SECTOR_150 = "/properties-in-noida/prateek-sector-150-noida";
const TRUMP_TOWERS = "/properties-in-noida/trump-towers-noida";
const IVORY_COUNTY = "/properties-in-noida/ivory-county";
const SMART_WORLD_ELIE = "/properties-in-noida/smart-world-elie-saab-residencies";

const VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Reasons%20to%20Invest%20in%20Sector%20150%20Noida/Reasons%20to%20Invest%20in%20Sector%20150%20Noida%20Real_1.webp";

const VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Reasons%20to%20Invest%20in%20Sector%20150%20Noida/Reasons%20to%20Invest%20in%20Sector%20150%20Noida%20Real_2.webp";

const VISUAL_3 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/BLOG%3A%20Reasons%20to%20Invest%20in%20Sector%20150%20Noida/Reasons%20to%20Invest%20in%20Sector%20150%20Noida%20Real_3.webp";

const REASON_ROWS: { reason: string; whatItMeans: string; check: string }[] = [
  {
    reason: "Noida Expressway pin",
    whatItMeans: "Daily office and school runs sit on a signal-light spine toward Noida and Greater Noida.",
    check: "Check the morning drive from the project. Weekend map times are usually shorter.",
  },
  {
    reason: "Jewar Airport is open",
    whatItMeans: "Noida International Airport started passenger flights in June 2026. This is a working airport now.",
    check: "Off-peak is often 40 to 45 minutes for about 35 to 46 km via Yamuna Expressway. Peak can stretch.",
  },
  {
    reason: "Low-density planning",
    whatItMeans: "Sports City / green-belt rules keep tower counts lower than many mid-Noida sectors.",
    check: "Walk the open space on site. The brochure and the plot can feel different.",
  },
  {
    reason: "Premium end-user mix",
    whatItMeans: "Buyers here often live in the home or hold it. That supports resale better than a pure flip crowd.",
    check: "Ask who actually occupies the delivered towers next door.",
  },
  {
    reason: "Metro is a short drive",
    whatItMeans: "Sector 148 Aqua Line is about 3 to 4 km. There is no station in the lobby.",
    check: "Keep time for a short car or auto ride to the station.",
  },
];

export const topReasonsSector150FaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What are the top reasons to invest in Sector 150 Noida?",
    answer:
      "The top reasons to invest in Sector 150 Noida are the Noida Expressway pin, an operating Jewar airport, low-density Sports City planning, and a premium buyer mix. It is a hold, not a short flip. Check the full price on the unit you like, then see the morning drive from there.",
  },
  {
    question: "Why look at Sector 150 Noida real estate in 2026?",
    answer:
      "Sector 150 Noida real estate sits on the Noida-Greater Noida Expressway with Yamuna Expressway access toward Jewar. Registries and sports-city files have moved after years of freeze talk. That does not mean every tower is equal. Check delivery, all-in cost, and who already lives next door.",
  },
  {
    question: "How close is Sector 150 Noida to the Noida Expressway?",
    answer:
      "The sector sits on the Noida-Greater Noida Expressway. That is the daily road for Noida offices, Greater Noida, and many school runs. Morning traffic can slow the ramps. Drive from the project in office hours before you book.",
  },
  {
    question: "How close is Sector 150 Noida to Jewar Airport?",
    answer:
      "Noida International Airport at Jewar is about 35 to 46 km depending on the gate and route. Off-peak many people do it in 40 to 45 minutes on the Yamuna Expressway. Commercial flights started in June 2026. Leave extra time when the airport road is busy.",
  },
  {
    question: "Is there metro inside Sector 150 Noida?",
    answer:
      "No. Sector 148 on the Aqua Line is the station people actually use, about 3 to 4 km by road. You will need a car or auto for that stretch. Later metro plans are extra, not your daily trip in 2026.",
  },
  {
    question: "Who should buy in Sector 150 Noida?",
    answer:
      "People who want space and a quieter neighbourhood, and buyers who can wait till handover. If you need a small 2 BHK next to a metro station, look at another belt. If your office is on the Expressway or you use Jewar Airport often, Sector 150 is worth a visit.",
  },
  {
    question: "Can Celeste Abode shortlist Sector 150 Noida for me?",
    answer:
      "Yes. Tell us your budget, how long you can wait, and where you work or fly. We check the drive from the project, review the papers, and only take you to homes that still fit. You keep the final call. Celeste Abode handles the RERA and booking file.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function TopReasonsSector150CtaPair({
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

export function TopReasonsInvestSector150NoidaExpresswayJewarAirportContent() {
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
            <a href="#reasons" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Top reasons to invest in Sector 150 Noida
            </a>
          </li>
          <li>
            <a href="#real-estate" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Sector 150 Noida real estate
            </a>
          </li>
          <li>
            <a href="#expressway" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Sector 150 Noida near Noida Expressway
            </a>
          </li>
          <li>
            <a href="#jewar" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Sector 150 Noida near Jewar Airport
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Reasons at a glance
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
          People ask us for the top reasons to invest in Sector 150 Noida as if the answer is one slogan. It is not.
          You buy here because the Noida Expressway is the daily road, Noida International Airport at Jewar now has
          passenger flights, and the grid is still lower density than a packed mid-Noida sector. That mix serves
          families who live in Noida, people who go to Delhi on some days, people who use the airport, and people who
          buy to stay a few years. This is the checklist we
          walk on site visits.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          The expressway and the airport are the location. The tower still decides the price. See the morning drive.
          Check the full cost. Then see if the wait till handover works for you.
        </blockquote>
      </header>

      <section id="reasons" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Top reasons to invest in Sector 150 Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            First, the road. Sector 150 sits on the Noida-Greater Noida Expressway. That is why office belts toward
            Film City, Sector 16, and Greater Noida are a highway trip, not a maze of inner sector cuts. Second, the
            airport. Noida International Airport at Jewar opened passenger flights in June 2026. You can use it today.
            Third, planning. Sports City rules kept a lot of this belt greener and less stacked than Sectors 75 or 78.
            Fourth, the buyer mix. More people who live here or stay a few years, not only short-term buyers. That helps
            when you want to sell later.
          </p>
          <p>
            None of that replaces a unit check.{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              ACE Parkway 2.0
            </Link>{" "}
            and{" "}
            <Link href={PRATEEK_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Prateek Sector 150
            </Link>{" "}
            are two files we actually walk when someone wants this pin. Same sector. Different product, possession, and
            all-in ticket.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_1}
            alt="Top reasons to invest in Sector 150 Noida: expressway, metro corridor, and premium towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Expressway access and low-density planning are why this pin stays on premium shortlists.
        </figcaption>
      </figure>

      <section id="real-estate" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Sector 150 Noida real estate
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 150 Noida real estate is a premium belt, not the lowest ticket in Noida. Working 2026 asks often
            sit in a high four-figure to mid five-figure per sq ft range once you add floor, PLC, and parking.
            Website averages can mislead. Use the full price of the home you will actually own. Resale works
            when people already live in the society and the Expressway commute still works. Rent can be modest at
            this price. You buy for the home and the wait, not a high rental return.
          </p>
          <p>
            Browse{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              properties in Noida
            </Link>{" "}
            or{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            if you already know the city and need the sector match. We still want one peak-hour drive and a paper
            check before you put money down. Celeste Abode handles the RERA and booking file. You are not sent to
            hunt a portal alone.
          </p>
        </div>
      </section>

      <section id="expressway" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Sector 150 Noida near Noida Expressway
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 150 Noida near Noida Expressway is the daily story. The Noida-Greater Noida Expressway is the spine
            toward established office sectors and Greater Noida. Yamuna Expressway is a short hop via the Pari Chowk
            band for southbound trips. FNG is still being built, so do not count on it as open today.
            Delhi is farther than Sector 62. Plan 45 to 75 minutes on a busy morning if that is your office. The
            Expressway is the main help. The short stretch from the project to the ramp still matters.
          </p>
          <p>
            If you like the Expressway product but want a different pin, we also show{" "}
            <Link href={TRUMP_TOWERS} className="font-medium text-[#CBB27A] hover:underline">
              Trump Towers Noida
            </Link>
            ,{" "}
            <Link href={IVORY_COUNTY} className="font-medium text-[#CBB27A] hover:underline">
              Ivory County
            </Link>
            , and{" "}
            <Link href={SMART_WORLD_ELIE} className="font-medium text-[#CBB27A] hover:underline">
              Smart World Elie Saab Residencies
            </Link>
            . Same corridor test. Different home.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_2}
            alt="Sector 150 Noida near Noida Expressway: highway run beside new residential towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Check the morning drive from the ramp. Brochure times are often better than a working day.
        </figcaption>
      </figure>

      <section id="jewar" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Sector 150 Noida near Jewar Airport
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 150 Noida near Jewar Airport is a Yamuna Expressway trip, not a taxi from the lobby. Noida
            International Airport at Jewar started commercial passenger flights on 15 June 2026. Phase one is built
            for about 12 million passengers a year. From most Sector 150 gates you are looking at roughly 35 to 46 km
            and 40 to 45 minutes when the road is kind. That is close enough for frequent flyers and far enough that
            this is still a Noida home, not an airport township.
          </p>
          <p>
            An operating airport removes the old “will it ever open” risk. It does not print a guaranteed capital jump
            on every stack. Passenger growth, cargo, and the DND-Faridabad-Sohna airport link will take years. Buy the
            home you will use. Treat airport growth as extra, not the only reason to buy.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Reasons at a glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Distances are locality ranges. Your tower gate can sit closer or farther. Off-peak is not peak hour.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Reason</th>
                <th className="px-4 py-3 font-medium">What it means</th>
                <th className="px-4 py-3 font-medium">What to check</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {REASON_ROWS.map((row, i) => (
                <tr
                  key={row.reason}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.reason}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.whatItMeans}</td>
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
            alt="Sector 150 Noida near Jewar Airport: expressway, metro, and towers on the southern Noida belt"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Noida International Airport is open. The home you pick and the price you pay still matter most.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How we help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Tell us where you work, how often you use the airport, and whether this is a home or a longer stay. We check
            the drive from
            Sector 150, compare homes on the Expressway, and only take you to sites that still fit. See{" "}
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
                Tell us where you work or how often you use the airport. We will check the drive from the project, not a marketing map.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <TopReasonsSector150CtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions people actually ask
        </h2>
        <SobhaRivanaFaqAccordion items={topReasonsSector150FaqSchemaItems} />
      </section>
    </div>
  );
}
