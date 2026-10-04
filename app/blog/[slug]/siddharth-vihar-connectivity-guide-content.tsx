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
const FUSION_VASUNDHARA = "/properties-in-ghaziabad/fusion-vasundhara";
const PERIGON_VASUNDHARA = "/properties-in-ghaziabad/perigon-vasundhara";
const KARYAN_NH24 = "/properties-in-ghaziabad/karyan-nh24-ghaziabad";
const KARYAN_TREVANA = "/properties-in-ghaziabad/karyan-trevana-residences-nh24-ghaziabad";
const FOREST_WALK = "/properties-in-ghaziabad/forest-walk-villa";

const ROAD_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog_siddarthvihar_connectivity/siddarthvihar_2.webp";

const METRO_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog_siddarthvihar_connectivity/siddarthvihar_4.webp";

const NCR_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog_siddarthvihar_connectivity/siddarthvihar_3.webp";

const ROUTE_ROWS: { dest: string; typical: string; how: string }[] = [
  {
    dest: "East Delhi / Akshardham side",
    typical: "About 14 km. Off-peak often 15 to 25 minutes on the expressway.",
    how: "Delhi-Meerut Expressway (NH-9 / NH-24). Peak hour depends on the slip road, not the 14-lane stretch.",
  },
  {
    dest: "Central Delhi (ITO band)",
    typical: "About 22 km. Off-peak often 35 to 45 minutes.",
    how: "Same expressway into East Delhi, then Ring Road. Sunday Maps will look kinder than a weekday.",
  },
  {
    dest: "Noida Sector 62-63",
    typical: "About 8 km. Off-peak often 15 to 20 minutes.",
    how: "NH-24 toward Noida. Peak can stretch. Drive your exact office pin once.",
  },
  {
    dest: "Indirapuram (Shakti / Niti Khand)",
    typical: "Next-door belt. Often 10 to 20 minutes depending on the khand and the junction.",
    how: "Local roads plus the NH-24 / Indirapuram junction. This is the school, mall, and chemist run for many families.",
  },
  {
    dest: "Shaheed Sthal (Red Line)",
    typical: "About 3.5 to 6 km from most gates. Often 10 to 15 minutes by car or auto.",
    how: "This is the main Siddharth Vihar metro connectivity story on the Delhi Metro Red Line.",
  },
  {
    dest: "Noida Electronic City (Blue Line)",
    typical: "About 5 to 8 km. Off-peak often 15 to 20 minutes.",
    how: "Drive to the Blue Line if your day is Noida-side offices, not Dilshad Garden / Rithala.",
  },
  {
    dest: "Ghaziabad Namo Bharat",
    typical: "A few kilometres, close to Shaheed Sthal.",
    how: "Namo Bharat on the Delhi-Ghaziabad-Meerut line has been running since February 2026. Ghaziabad station sits near the Red Line.",
  },
  {
    dest: "IGI Airport",
    typical: "About 33 to 37 km. Plan 50 to 90 minutes.",
    how: "Expressway plus Ring Road. Leave early. Do not price the trip off a 6 a.m. Maps ping.",
  },
];

export const siddharthViharConnectivityFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "How is Siddharth Vihar connectivity for daily travel?",
    answer:
      "The big card is the 14-lane Delhi-Meerut Expressway on NH-24. That is why Siddharth Vihar connectivity works for Delhi, Noida, Meerut side, and east Ghaziabad in one pin. Metro is a short drive, not in the lobby. Namo Bharat at Ghaziabad adds a fast rail option since February 2026.",
  },
  {
    question: "How long is Siddharth Vihar to Delhi?",
    answer:
      "East Delhi / Akshardham is often about 14 km and 15 to 25 minutes off-peak on the expressway. Central Delhi around ITO is about 22 km and 35 to 45 minutes when the road is kind. Peak hour at the junctions can add time. Drive your own office or school pin at 9 a.m. before you book.",
  },
  {
    question: "How long is Siddharth Vihar to Noida?",
    answer:
      "Noida Sector 62-63 is about 8 km. Off-peak many people do it in 15 to 20 minutes. Blue Line at Noida Electronic City is a similar band, about 5 to 8 km depending on the tower gate. Siddharth Vihar to Noida is an expressway and NH-24 trip, not a metro-at-the-door trip.",
  },
  {
    question: "What is Siddharth Vihar metro connectivity?",
    answer:
      "Shaheed Sthal (New Bus Adda) on the Red Line is the station most people use, about 3.5 to 6 km. Noida Electronic City on the Blue Line is the other useful station if you work in Noida. There is no metro in the society lobby. Plan an auto or car for the last stretch.",
  },
  {
    question: "Is Namo Bharat useful from Siddharth Vihar?",
    answer:
      "Yes. The Delhi-Ghaziabad-Meerut Namo Bharat line has been running since February 2026. Ghaziabad Namo Bharat station is close to Shaheed Sthal, with a short hop between the two. Useful if you go toward Sarai Kale Khan or Meerut. Still add the road time from your gate to the station.",
  },
  {
    question: "Is Indirapuram closer than Delhi or Noida from Siddharth Vihar?",
    answer:
      "Yes. Indirapuram is the next residential belt. A lot of families use it for schools, malls, and clinics. The drive is short on a good day and slower at the NH-24 junction in peak hour. Treat it as a local trip, not an NCR commute.",
  },
  {
    question: "Can Celeste Abode map my commute from a Siddharth Vihar project?",
    answer:
      "Yes. Tell us where you work or where the kids go to school. We time the drive from the actual project gate, not from a locality pin, and we shortlist stacks on NH-24 that still fit. You keep the final call.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Ghaziabad", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function SiddharthViharConnectivityCtaPair({
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

export function SiddharthViharConnectivityGuideContent() {
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
            <a href="#roads" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Siddharth Vihar connectivity
            </a>
          </li>
          <li>
            <a href="#delhi" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Siddharth Vihar to Delhi
            </a>
          </li>
          <li>
            <a href="#noida" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Siddharth Vihar to Noida
            </a>
          </li>
          <li>
            <a href="#metro" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Siddharth Vihar metro connectivity
            </a>
          </li>
          <li>
            <a href="#indirapuram" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Indirapuram and nearby belts
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Route table
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
          People buy in Siddharth Vihar because the location works, not because a brochure said “well connected.”
          Siddharth Vihar connectivity is the 14-lane Delhi-Meerut Expressway on NH-24, a short hop to Indirapuram,
          and metro a few kilometres away. That mix serves families who live in Ghaziabad, people who go to Delhi,
          people who go to Noida, and people who buy to hold. This guide is the route map we walk on site visits.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Time the drive from the project gate at 9 a.m. Maps on Sunday is not your commute. The expressway is the
          strength. The last kilometre still decides the day.
        </blockquote>
      </header>

      <section id="roads" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Siddharth Vihar connectivity
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Siddharth Vihar sits on the Delhi-Meerut Expressway, still called NH-24 by most buyers. Fourteen lanes,
            fewer signals once you are on it, and a clean run toward East Delhi one way and Meerut the other. That is
            why new 3 and 4 BHK towers land here.{" "}
            <Link href={SG_NAKSHATRA} className="font-medium text-[#CBB27A] hover:underline">
              SG Nakshatra
            </Link>{" "}
            and{" "}
            <Link href={AU_COSMOS} className="font-medium text-[#CBB27A] hover:underline">
              AU Cosmos Corner
            </Link>{" "}
            are two projects we show when someone wants that highway pin. The slip road and the gate still matter. A
            society 400 metres off the ramp does not live like a board that only says NH-24.
          </p>
          <p>
            Browse{" "}
            <Link href={PROPERTIES_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              properties in Ghaziabad
            </Link>{" "}
            if you already know you want this belt. Then we time the actual gate, not a locality average.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={ROAD_VISUAL}
            alt="Siddharth Vihar connectivity: Delhi, Noida, metro, and east Ghaziabad neighbourhoods on one map"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          The expressway is why this pin works for Delhi, Noida, and east Ghaziabad in one place.
        </figcaption>
      </figure>

      <section id="delhi" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Siddharth Vihar to Delhi
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Siddharth Vihar to Delhi is mostly an expressway trip. East Delhi and the Akshardham side are often about
            14 km. Off-peak, many people do that in 15 to 25 minutes once they are on the 14-lane stretch. Central
            Delhi around ITO is about 22 km. Off-peak that is often 35 to 45 minutes. Peak hour lives at the ramps and
            the Ring Road, not on the expressway itself.
          </p>
          <p>
            If you fly a lot, IGI is about 33 to 37 km. Plan 50 to 90 minutes. Hindon is closer, around 11 km, if that
            airport is part of your year. Do not buy on a 6 a.m. Maps screenshot.
          </p>
        </div>
      </section>

      <section id="noida" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Siddharth Vihar to Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Siddharth Vihar to Noida is a short highway run, not a far township commute. Sector 62-63 is about 8 km.
            Off-peak, 15 to 20 minutes is common. Peak can stretch, especially at the Indirapuram-NH-24 junction. Blue
            Line at Noida Electronic City is about 5 to 8 km from most gates, so some people drive to metro instead of
            driving the whole office trip.
          </p>
          <p>
            This is one reason, not the only reason, people buy here. Families who stay in Ghaziabad, people who go to
            Delhi, and people who invest all use the same road. If Noida is your office, we still want one Tuesday
            drive from the tower you like.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={METRO_VISUAL}
            alt="Siddharth Vihar metro connectivity: tree-lined streets beside a metro line and high-rise corridor"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Metro is a short drive. Shaheed Sthal on Red Line and Electronic City on Blue Line are the two stations people actually use.
        </figcaption>
      </figure>

      <section id="metro" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Siddharth Vihar metro connectivity
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Siddharth Vihar metro connectivity is dual, not zero. Shaheed Sthal (New Bus Adda) on the Red Line is the
            station most residents name, about 3.5 to 6 km depending on the society. That is a 10 to 15 minute car or
            auto on a normal day. Noida Electronic City on the Blue Line is the other useful station if your day is
            Noida offices. There is no metro in the lobby. That is true for a lot of good NCR addresses. The honest
            line is: last mile is planned, not pretended.
          </p>
          <p>
            Namo Bharat on the Delhi-Ghaziabad-Meerut line has been running since February 2026. Ghaziabad Namo Bharat
            station sits close to Shaheed Sthal, roughly a few hundred metres, with a short hop between rail and metro.
            That helps if you go toward Sarai Kale Khan or Meerut. Add the road from your gate to the station. The
            train does not start in your living room.
          </p>
          <p>
            Ghaziabad Junction and Vijay Nagar stations are also in the same few-kilometre band for people who still
            use Indian Railways. Anand Vihar ISBT is the long-distance bus story once you are on the expressway toward
            Delhi.
          </p>
        </div>
      </section>

      <section id="indirapuram" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Indirapuram, Vasundhara, and the rest of east Ghaziabad
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Indirapuram is next door, not a different city. Shakti Khand and Niti Khand are the school, mall, and
            chemist run for a lot of Siddharth Vihar families. Ten to 20 minutes is typical. The NH-24 junction can
            slow that in peak hour. If you want a{" "}
            <Link href={FLATS_GHZ} className="font-medium text-[#CBB27A] hover:underline">
              flat in Ghaziabad
            </Link>{" "}
            that is already in that lived-in grid, Indirapuram is the ready side. If you want the newer highway product,
            stay on the Siddharth Vihar pin.
          </p>
          <p>
            Indirapuram Extension on NH-24 sits in the overlap.{" "}
            <Link href={PRESTIGE_CITY} className="font-medium text-[#CBB27A] hover:underline">
              The Prestige City
            </Link>{" "}
            is the large township-style file we show when someone wants that mix. Drive that gate the same way you
            would drive SG Nakshatra. The board says Indirapuram. The commute is still a highway commute.
          </p>
          <p>
            Vasundhara is one belt over.{" "}
            <Link href={FUSION_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Fusion Vasundhara
            </Link>{" "}
            and{" "}
            <Link href={PERIGON_VASUNDHARA} className="font-medium text-[#CBB27A] hover:underline">
              Perigon Vasundhara
            </Link>{" "}
            are the two we currently list there. Villa buyers on the same road look at{" "}
            <Link href={FOREST_WALK} className="font-medium text-[#CBB27A] hover:underline">
              Forest Walk Villa
            </Link>
            ,{" "}
            <Link href={KARYAN_NH24} className="font-medium text-[#CBB27A] hover:underline">
              Karyan on NH-24
            </Link>
            , or{" "}
            <Link href={KARYAN_TREVANA} className="font-medium text-[#CBB27A] hover:underline">
              Karyan Trevana
            </Link>
            . Different home. Same expressway test.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Typical NCR routes at a glance
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Distances are locality ranges. Your tower gate can sit closer or farther. Off-peak times assume a clear
          expressway. Peak hour is a different trip.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Where you go</th>
                <th className="px-4 py-3 font-medium">Typical range</th>
                <th className="px-4 py-3 font-medium">How you go</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {ROUTE_ROWS.map((row, i) => (
                <tr
                  key={row.dest}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.dest}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.typical}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NCR_VISUAL}
            alt="Siddharth Vihar to Delhi and Noida: older streets beside a highway, metro, and new towers"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Delhi, Noida, Indirapuram, metro, and Namo Bharat all sit on this same east Ghaziabad pin.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How we help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Tell us where you work, where the kids go, or whether you are buying to hold. We time the commute from the
            actual gate, check project papers, and only take you to sites that still fit. Then{" "}
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
                Share your office or school pin. We will time Siddharth Vihar from the gate, not from a brochure map.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <SiddharthViharConnectivityCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions people actually ask
        </h2>
        <SobhaRivanaFaqAccordion items={siddharthViharConnectivityFaqSchemaItems} />
      </section>
    </div>
  );
}
