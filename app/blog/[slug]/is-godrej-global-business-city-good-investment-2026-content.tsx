import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const PROPERTIES_GN = "/properties-in-greater-noida";
const FLATS_GN = "/flats-for-sale-in-greater-noida";
const PRELAUNCH = "/pre-launch-properties";
const PROPERTIES_YE = "/properties-in-yamuna-expressway";
const GBC = "/properties-in-greater-noida/godrej-global-business-city-greater-noida";
const GODREJ_MAJESTY = "/properties-in-greater-noida/godrej-majesty";
const GODREJ_ARDEN = "/properties-in-greater-noida/godrej-arden-mu-1-greater-noida";

const VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog_gbc/GBC_BLOG_1.webp";

const VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blog_gbc/GBC_BLOG_2.webp";

const COMPARE_ROWS: { point: string; helps: string; wait: string }[] = [
  {
    point: "What you are buying",
    helps:
      "Godrej Properties' first residential parcel inside Global Business City, a ~750-acre DMIC integrated township in Greater Noida. 1, 2 and 3 BHK, eight plans from about 985 to 2,500 sq ft.",
    wait:
      "Pre-launch. RERA ID, legal SPV, tower count, and the milestone payment plan are not announced yet. EOI from ₹1.35 Cr is indicative.",
  },
  {
    point: "Land and scale",
    helps:
      "23.2 acres won in a June 2026 e-auction. Marketed revenue potential near ₹7,000 Cr. You are not buying a one-tower fill-in on a leftover plot.",
    wait:
      "The township around the towers is still filling in. Daily shops, schools, and street life will lag the brochure. Price that in years, not months.",
  },
  {
    point: "Builder",
    helps:
      "Listed developer. FY2026 bookings ₹34,171 Cr. Delivery record of 22 years without a delay, as Godrej states it. AA+ from ICRA and India Ratings. Already live in Greater Noida.",
    wait:
      "A strong balance sheet is not a possession date. Compare this launch to Godrej Majesty and Godrej Arden. Same brand, different pin and stage.",
  },
  {
    point: "Ticket and tax",
    helps:
      "Entry from about ₹1.35 Cr for a 1 BHK. 2 BHK 1,320 to 1,540 sq ft. 3 BHK 1,690 to 2,500 sq ft. Booking cheque ₹2 Lakh to ₹5 Lakh by plan.",
    wait:
      "Under-construction GST, parking, and PLC sit on top. Stamp duty hits at registry. Your all-in is not the EOI line.",
  },
  {
    point: "Who it fits",
    helps:
      "A buyer who can wait, who wants Godrej in a new Greater Noida township, and who can hold through construction. Useful if you work toward Dadri, Pari Chowk, or the eastern NCR belt.",
    wait:
      "Wrong if you need keys this year, a finished Greater Noida West society, or a house next to Jewar on the expressway. That last product is a different listing set.",
  },
];

export const godrejGlobalBusinessCityInvestment2026FaqSchemaItems: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Is Godrej Global Business City a good investment for buyers in 2026?",
    answer:
      "Yes if you can wait for possession and you want Godrej Properties inside the DMIC township in Greater Noida. The land is 23.2 acres from a June 2026 e-auction, and EOI starts around ₹1.35 Cr. It is not a good fit if you need a ready home this year. Returns are not guaranteed on any pre-launch.",
  },
  {
    question: "Where is Godrej Global Business City in Greater Noida?",
    answer:
      "In Global Business City, the DMIC Integrated Township in Greater Noida. Marketed distances are about 11 km to Pari Chowk, 4 km to Boraki, and 6 km to the Dadri logistics hub. Delhi-Howrah rail sits nearby at Ajayabpur. Jewar Airport is a longer run via the Eastern Peripheral Expressway, not a gate on Yamuna Expressway.",
  },
  {
    question: "What is the price of flats in Godrej Global Business City?",
    answer:
      "Indicative EOI from ₹1.35 Cr onwards, with a booking cheque of ₹2 Lakh to ₹5 Lakh by configuration. Plans run 1 BHK about 985 to 1,050 sq ft, 2 BHK 1,320 to 1,540 sq ft, and 3 BHK 1,690 to 2,500 sq ft. Confirmed rates follow Godrej's RERA filing. Add GST, parking, and PLC before you lock EMI.",
  },
  {
    question: "Is Godrej Global Business City RERA registered?",
    answer:
      "Not yet. The project is pre-RERA. Tower count, legal SPV, and the payment plan are awaited. Celeste Abode handles the RERA file when it is filed. You do not chase a portal.",
  },
  {
    question: "Who should buy in Godrej Global Business City?",
    answer:
      "A Delhi NCR buyer who can fund construction and wait for keys. End users who want a 2 or 3 BHK in a large new township, and investors who accept a hold of several years. Skip it if you need ready inventory in Greater Noida West or a unit next to Jewar.",
  },
  {
    question: "How is this different from other Godrej projects in Greater Noida?",
    answer:
      "Godrej already has a Greater Noida presence, including a golf township in Sector 27 and other FY2026 launches. Godrej Majesty and Godrej Arden are separate listings with their own pins. Godrej Global Business City is the first Godrej residential parcel inside the ~750-acre DMIC township. Compare the gate, not the logo.",
  },
  {
    question: "Is Godrej Global Business City close to Jewar Airport?",
    answer:
      "It is on the Greater Noida DMIC side, not on Yamuna Expressway. The marketed link to Noida International Airport is the Eastern Peripheral Expressway. If your thesis is a home next to the airport, look at Properties in Yamuna Expressway instead of forcing this pin.",
  },
  {
    question: "Can Celeste Abode register my EOI for Godrej Global Business City?",
    answer:
      "Yes. Tell us configuration, budget, and whether you will live in the flat or hold it. We walk the indicative plans, the payment ask, and the papers when they exist, then take you only if the ticket still fits.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Greater Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function GodrejGlobalBusinessCityInvestment2026CtaPair({
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

export function GodrejGlobalBusinessCityInvestment2026Content() {
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
            <a href="#godrej-gbc" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Godrej Global Business City
            </a>
          </li>
          <li>
            <a href="#gbc-greater-noida" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Godrej Global Business City Greater Noida
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Side by Side Table
            </a>
          </li>
          <li>
            <a href="#gbc-investment-2026" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Godrej Global Business City Investment 2026
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How We Help
            </a>
          </li>
          <li>
            <a href="#faq" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Questions People Actually Ask
            </a>
          </li>
        </ol>
      </nav>

      <section id="lead" className="scroll-mt-24 mb-12">
        <p className="text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Buyers keep asking the same thing in 2026: is{" "}
          <Link href={GBC} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
            Godrej Global Business City
          </Link>{" "}
          a good place to put money, or just a loud launch in Greater Noida?
        </p>
        <blockquote className="my-8 border-l-4 border-[#CBB27A] bg-gray-50 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          A Godrej name in a township that is still filling in is a different bet from a Godrej name in a finished
          sector. Price the wait, not the logo.
        </blockquote>
        <p className="text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Short answer: it can be a strong ticket if you can wait, fund construction, and you actually want this pin.
          It is a weak ticket if you need keys this year. The project is pre-launch. EOI is open from about ₹1.35 Cr.
          RERA is not filed yet. That is the deal on the table, not a finished society with lifts running.
        </p>
      </section>

      <section id="godrej-gbc" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Godrej Global Business City
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Godrej Global Business City is Godrej Properties' residential launch inside Global Business City, Greater
            Noida. The parcel is 23.2 acres, taken through an e-auction in June 2026. It is the first Godrej housing
            inside the ~750-acre DMIC integrated township. That is the product. Not a small infill next to a mall you
            already use.
          </p>
          <p>
            Configurations are 1, 2 and 3 BHK. Eight plans, as marketed: 1 BHK Grande around 985 sq ft, up to 3 BHK plus
            utility at about 2,500 sq ft. 2 BHK sits roughly 1,320 to 1,540 sq ft. 3 BHK 1,690 to 2,500 sq ft. Booking
            cheques run ₹2 Lakh to ₹5 Lakh by plan. Indicative pricing starts at ₹1.35 Cr. Confirmed rates wait on the
            RERA file.
          </p>
          <p>
            Godrej is not a first-time visitor to Greater Noida. The company already has a golf township in Sector 27
            and two FY2026 launches of about ₹1,500 Cr each in this city. FY2026 bookings across Godrej Properties were
            ₹34,171 Cr. Ratings sit at AA+ with ICRA and India Ratings. That helps the hold. It does not print a
            possession date on this plot.
          </p>
          <p>
            If you already like the brand, still split the listings.{" "}
            <Link href={GODREJ_MAJESTY} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              Godrej Majesty
            </Link>{" "}
            and{" "}
            <Link href={GODREJ_ARDEN} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              Godrej Arden
            </Link>{" "}
            are other Godrej homes in Greater Noida, different gates. Walk this township on its own. See{" "}
            <Link href={PRELAUNCH} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              pre-launch properties
            </Link>{" "}
            if you are comparing EOI-stage inventory, not ready stock.
          </p>
        </div>
      </section>

      <figure className="my-12 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_1}
            alt="Godrej Global Business City under construction in Greater Noida, Godrej Properties site hoarding on the road"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          First Godrej homes in this new Greater Noida township. You book early. The towers are not ready yet.
        </figcaption>
      </figure>

      <section id="gbc-greater-noida" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Godrej Global Business City Greater Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            This is Greater Noida on the DMIC side, not Greater Noida West. People mix those two. West is Noida
            Extension: denser, more live societies, a different commute into Noida. Global Business City is a planned
            township with industry and R&amp;D around it. You buy into that plan. You also buy the years until the plan
            looks like daily life.
          </p>
          <p>
            Distances as marketed: about 11 km to Pari Chowk, about 4 km to Boraki, about 6 km to the Dadri logistics
            hub. Delhi-Howrah rail is at Ajayabpur. Those numbers help if your work sits on this eastern belt. They
            help less if your office is in central Noida or Gurgaon and you need a 35-minute door-to-door every
            weekday. Time it from the actual plot, not from a city name on a map.
          </p>
          <p>
            Noida International Airport at Jewar is on the pitch via the Eastern Peripheral Expressway. That is a
            corridor story, not a walk to the terminal. If your whole thesis is a home next to the airport, do not
            force this pin. Look at{" "}
            <Link href={PROPERTIES_YE} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              Properties in Yamuna Expressway
            </Link>
            . Godrej Global Business City Greater Noida is a township bet with airport access as a plus, not an airport
            township.
          </p>
          <p>
            For other live inventory in the city, start with{" "}
            <Link href={PROPERTIES_GN} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              Properties in Greater Noida
            </Link>{" "}
            and{" "}
            <Link href={FLATS_GN} className="font-medium text-[#8a7340] underline-offset-2 hover:underline">
              flats for sale in Greater Noida
            </Link>
            . Put this launch next to a ready 2 or 3 BHK in West if you need to see what you give up for the new
            township.
          </p>
        </div>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What Helps, What You Still Wait For
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Read this as a 2026 buyer sheet, not a brochure. Numbers are indicative until RERA.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm text-gray-700">
            <thead className="bg-[#0f1112] text-xs font-semibold uppercase tracking-wide text-white">
              <tr>
                <th className="px-4 py-3">Point</th>
                <th className="px-4 py-3">What Helps</th>
                <th className="px-4 py-3">What You Wait For</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.point} className="border-t border-gray-200 odd:bg-white even:bg-gray-50/80">
                  <td className="px-4 py-3 align-top font-semibold text-gray-900">{row.point}</td>
                  <td className="px-4 py-3 align-top">{row.helps}</td>
                  <td className="px-4 py-3 align-top">{row.wait}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="gbc-investment-2026" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Godrej Global Business City Investment 2026
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            A Godrej Global Business City investment in 2026 is a construction hold. You are early in a large township.
            Early can mean a better entry than the same brand in a finished sector. Early can also mean empty roads,
            GST on every slab, and no rent until possession. Do not mix those two sentences.
          </p>
          <p>
            The case for putting money here: listed builder, a 23.2-acre site, DMIC industry around the homes, and a
            ticket that still starts under many premium Noida 3 BHKs if you take the 1 or 2 BHK. The marketed ₹7,000 Cr
            revenue potential tells you Godrej is treating this as a long project, not a two-tower sale. For a buyer
            who already decided Greater Noida, that scale matters more than a pretty lobby render.
          </p>
          <p>
            The case against: no RERA number yet. Possession is years out. The township must still fill. Resale before
            keys is thin. If your cash is tight, a ready flat in Greater Noida West is the cleaner product. If your
            thesis is Jewar rentals, Yamuna Expressway stock is closer to the airport than this DMIC pin.
          </p>
          <p>
            Who it fits: end users who can stay where they are until handover, and investors who can sit through
            construction without needing yield in year one. Who it does not fit: anyone buying only because the board
            says Godrej, anyone who needs a school at the gate in 2027, anyone stretching EMI to the last rupee on an
            indicative EOI.
          </p>
          <p>
            We treat RERA as our job. When Godrej files, we read the registration, the SPV, and the payment plan with
            you. You do not get sent to a government portal to figure it out. Until then, treat every rate as
            indicative and keep the booking cheque size in writing.
          </p>
        </div>
      </section>

      <figure className="my-12 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={VISUAL_2}
            alt="Godrej Global Business City Greater Noida: construction and new township around the Godrej launch"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Buying here in 2026 means waiting while they build. Check your money and your wait, not only the Godrej name.
        </figcaption>
      </figure>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How We Help
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            We work for the buyer in Delhi NCR, not for the loudest launch. You tell us the commute, the budget, and
            whether you will live in Godrej Global Business City or hold it. We check the EOI ask against other Greater
            Noida inventory, and we only take you to the site if the ticket still makes sense.
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
                Tell us office, budget, and 1, 2 or 3 BHK. We will only take you to Godrej Global Business City if it
                still fits.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <GodrejGlobalBusinessCityInvestment2026CtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Questions People Actually Ask
        </h2>
        <SobhaRivanaFaqAccordion items={godrejGlobalBusinessCityInvestment2026FaqSchemaItems} />
      </section>
    </div>
  );
}
