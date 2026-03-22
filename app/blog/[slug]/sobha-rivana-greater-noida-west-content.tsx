import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TreePine,
  Waves,
  Building2,
  Droplets,
  Dumbbell,
  Activity,
  Shield,
  Footprints,
} from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

/** As on UP RERA public listings; match the live certificate before you pay. */
export const SOBHA_RIVANA_RERA_FULL = "UPRERAPRJ313638/03/2026";

const SOBHA_IMAGES = {
  entrance:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-entrance.jpg",
  interior:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-interior.avif",
  map: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-map.avif",
  typicalFloorPlate:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-typical-floor-plate.avif",
  clubhouse:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-clubhouse.avif",
} as const;

/** R2 + AVIF: skip optimizer to avoid blank frames. Use `contain` for maps and CAD so nothing crops away. */
function ArticleFigure({
  src,
  alt,
  fit = "cover",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}) {
  return (
    <figure className="my-8 rounded-2xl overflow-hidden border border-gray-200 bg-neutral-100 shadow-sm">
      <div className="relative w-full min-h-[220px] aspect-video sm:min-h-[260px]">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className={
            fit === "contain"
              ? "object-contain object-center p-2 sm:p-4"
              : "object-cover object-center"
          }
          sizes="(max-width: 1024px) 100vw, 800px"
        />
      </div>
    </figure>
  );
}

const PAGE_TOC: { href: string; title: string; blurb: string }[] = [
  { href: "#sobha-rivana-project-table", title: "Snapshot table", blurb: "Entrance photo, then core facts." },
  { href: "#sobha-rivana-rera", title: "RERA & documents", blurb: "What to pull from up-rera.in." },
  { href: "#sobha-rivana-location", title: "Location", blurb: "Sector 1 and how the week moves." },
  { href: "#sobha-rivana-floor-plans", title: "Floor plans & sizes", blurb: "2, 3, 4 BHK and floor plates." },
  { href: "#sobha-rivana-amenities", title: "Amenities", blurb: "Quick visual pass, not a promise list." },
  { href: "#sobha-rivana-price", title: "Price & payment", blurb: "Bands, slabs, and cash flow." },
  { href: "#faq-sobha-rivana", title: "FAQs", blurb: "Tap for short answers." },
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is Sobha Rivana’s UP RERA registration number?",
    answer:
      "Listings show UPRERAPRJ313638/03/2026, with registration on 20 March 2026. Before you pay a booking amount, open the project on up-rera.in, download the registration certificate, and confirm the alphanumeric string matches. Banks and lawyers will ask for that exact text.",
  },
  {
    question: "Where is Sobha Rivana located?",
    answer:
      "Sector 1, Greater Noida West, the stretch people still call Noida Extension. Daily life here is Gaur Chowk, the Noida-Greater Noida links, and Techzone traffic. Drive your actual school and office routes at rush hour. Maps lie kindly. Clocks do not.",
  },
  {
    question: "What apartment types does Sobha Rivana offer?",
    answer:
      "The launch is built around two-, three-, and four-bedroom apartments. Sizes shift by tower and floor; the sales matrix and your eventual allotment sketch are the only sources that matter. Brochure bands are a starting point, not a contract.",
  },
  {
    question: "How much does Sobha Rivana cost per square foot?",
    answer:
      "Early 2026 channel talk often lands in a band near thirteen to fifteen thousand rupees per square foot before PLC, parking, and GST. Inventory and demand move that number weekly. Your formal cost sheet from the builder desk and your bank’s valuation should match before you commit.",
  },
  {
    question: "When can buyers expect possession at Sobha Rivana?",
    answer:
      "Marketing often points to an end-of-decade window, with December 2029 appearing in several public notes. That line must match your agreement and the project period on RERA. If those three sources disagree, stop and reconcile them in writing.",
  },
  {
    question: "Besides RERA, what should I double-check?",
    answer:
      "Payment schedule tied to construction milestones, cancellation and refund clauses, parking and PLC in rupees (not in assumed numbers), and sanctioned drawings for the tower you are buying. Anything that exists only on a render or in a voice note stays outside your risk budget until it is on paper.",
  },
];

export const sobhaRivanaFaqSchemaItems = FAQ_ITEMS;

const AMENITY_LINES: { icon: ReactNode; label: string }[] = [
  { icon: <TreePine className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Central greens & open spine" },
  { icon: <Waves className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "River-themed landscape" },
  { icon: <Building2 className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Club & community block" },
  { icon: <Droplets className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Pool deck" },
  { icon: <Dumbbell className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Gym & wellness" },
  { icon: <Activity className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Indoor / outdoor sports" },
  { icon: <Footprints className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Walking & jogging loops" },
  { icon: <Shield className="size-9 stroke-[1.15] text-[#CBB27A]" aria-hidden />, label: "Layered security" },
];

function AmenitiesLineGrid() {
  return (
    <div
      className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
      aria-label="Sobha Rivana amenities at a glance"
    >
      {AMENITY_LINES.map(({ icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center rounded-xl border border-gray-200 bg-white px-3 py-5 shadow-sm hover:border-[#CBB27A]/40 transition-colors"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50/80">
            {icon}
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-800 leading-snug font-poppins">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SpecTable() {
  const rows: [string, ReactNode][] = [
    ["Project name", "Sobha Rivana"],
    ["Developer / promoter", "Sobha Limited (listed)"],
    ["Location", "Sector 1, Greater Noida West (Noida Extension), Gautam Buddha Nagar, U.P."],
    ["UP RERA registration no.", <span key="rera">{SOBHA_RIVANA_RERA_FULL}</span>],
    ["RERA registration date", "20 March 2026"],
    ["Unit types", "2 BHK · 3 BHK · 4 BHK apartments"],
  ];

  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
      <div className="bg-[#0f1112] px-5 py-4 border-b border-gray-800">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#CBB27A] font-poppins">
          Sobha Rivana: project at a glance
        </h2>
        <p className="text-white/60 text-xs mt-1 font-poppins leading-relaxed">
          Core identifiers only. Sizes, towers, ticket, and possession sit in your RERA download and agreement, not in this row.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-poppins border-collapse min-w-[300px]">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors">
                <th
                  scope="row"
                  className="text-left font-semibold text-gray-900 align-top py-3.5 px-4 sm:px-5 w-[40%] max-w-[220px] border-r border-gray-100 bg-gray-50/50"
                >
                  {label}
                </th>
                <td className="text-gray-700 py-3.5 px-4 sm:px-5 leading-relaxed">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SobhaRivanaGreaterNoidaWestContent() {
  return (
    <div className="blog-article font-poppins">
      <nav className="mb-10 rounded-xl border border-gray-100 bg-gray-50/60 px-5 py-5" aria-label="On this page">
        <p className="text-xs font-bold uppercase tracking-wider text-[#CBB27A] mb-4">On this page</p>
        <ul className="space-y-0 list-none m-0 p-0 divide-y divide-gray-200/80">
          {PAGE_TOC.map((item) => (
            <li key={item.href} className="py-3 first:pt-0">
              <a
                href={item.href}
                className="block text-sm font-semibold text-gray-900 hover:text-[#CBB27A] transition-colors"
              >
                {item.title}
              </a>
              <p className="text-xs text-gray-500 mt-1 leading-snug m-0">{item.blurb}</p>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-5">
        For a few weeks now, the lunch-table question in Greater Noida West has been the same: have you seen what Sobha
        is doing in Sector 1? The answer used to be hearsay. Then the file landed on UP RERA. That changes the
        conversation from &quot;sounds big&quot; to &quot;show me the registration, the plan, and the payment line I
        actually sign.&quot;
      </p>
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        We wrote this for buyers who do not want a sales deck. They want a calm walkthrough of the project, the belt it
        sits in, and the checks that still sit on their side of the table.
      </p>

      <section id="sobha-rivana-project-table" className="scroll-mt-28 mb-14">
        <ArticleFigure
          src={SOBHA_IMAGES.entrance}
          alt="Sobha Rivana entrance and arrival view, Sector 1 Greater Noida West"
        />
        <SpecTable />
      </section>

      <section id="sobha-rivana-rera" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Sobha Rivana on UP RERA: what to pull from the portal
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          The registration number in the table (<strong>{SOBHA_RIVANA_RERA_FULL}</strong>) is the handle your banker and
          counsel will expect. It is tied to <strong>20 March 2026</strong> on the public register. Treat that date as the
          moment marketing had to fit inside a regulated frame, not as the day all risk vanished.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          On{" "}
          <a href="https://up-rera.in" target="_blank" rel="noopener noreferrer" className="text-[#CBB27A] font-semibold hover:underline">
            up-rera.in
          </a>
          , search by project name and download, in one sitting:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>The registration certificate (check the QR resolves to the same project).</li>
          <li>Sanctioned plans or extracts linked to the phase you are discussing.</li>
          <li>Any annexure that lists towers, unit types, or declared common areas.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          New to this side of NCR? Read{" "}
          <Link href="/blog/noida-vs-greater-noida-investment-2026" className="text-[#CBB27A] font-semibold hover:underline">
            Noida versus Greater Noida
          </Link>{" "}
          next. Rivana trades on a different pitch than a Sector 18 walk-up.
        </p>
      </section>

      <section id="sobha-rivana-location" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Sobha Rivana location: Sector 1, Greater Noida West
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Sector 1 sits inside Greater Noida West, the grid buyers still call Noida Extension. The story here is not a
          single landmark. It is how your week actually moves.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>Gaur Chowk and the Noida-Greater Noida links set the tone for peak-hour stress.</li>
          <li>Techzone and Knowledge Park catchments feed part of the tenant and owner pool.</li>
          <li>Jewar and YEIDA matter for a multi-year thesis, not for Tuesday evening pickup timing.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          For airport context:{" "}
          <Link href="/blog/jewar-airport-ncr-property-buyers-2026" className="text-[#CBB27A] font-semibold hover:underline">
            Jewar and NCR property
          </Link>
          . For expressway land versus ready apartments:{" "}
          <Link
            href="/blog/yamuna-expressway-growth-corridor-delhi-ncr"
            className="text-[#CBB27A] font-semibold hover:underline"
          >
            Yamuna Expressway growth
          </Link>
          . For inventory you can visit now:{" "}
          <Link href="/flats-for-sale-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
            flats for sale in Greater Noida
          </Link>
          .
        </p>
        <ArticleFigure
          src={SOBHA_IMAGES.map}
          alt="Sobha Rivana location map: Greater Noida West, Gaur Chowk and link roads"
          fit="contain"
        />
      </section>

      <section id="sobha-rivana-floor-plans" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Floor plans and unit mix: 2 BHK, 3 BHK, 4 BHK
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Rivana is Sobha&apos;s large-format play in NCR: two-bedroom plans for a cleaner entry ticket, three-bedroom
          plans for the bulk of upgrading families, four-bedroom plans for buyers who want depth, storage, and fewer
          compromises on room sizes.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>Ask for the live floor plate for the tower you like. Cores, lifts, and units per floor change the feel.</li>
          <li>Match marketing areas to the RERA unit schedule before you argue over &quot;carpet.&quot;</li>
          <li>If you are comparing launches, start with{" "}
            <Link
              href="/blog/upcoming-luxury-projects-noida-greater-noida-2026"
              className="text-[#CBB27A] font-semibold hover:underline"
            >
              upcoming luxury projects in Noida and Greater Noida
            </Link>
            .
          </li>
        </ul>
        <ArticleFigure
          src={SOBHA_IMAGES.typicalFloorPlate}
          alt="Sobha Rivana typical floor plate and unit layout diagram"
          fit="contain"
        />
        <ArticleFigure
          src={SOBHA_IMAGES.interior}
          alt="Sobha Rivana sample apartment interior, living and specification reference"
          fit="cover"
        />
      </section>

      <section id="sobha-rivana-amenities" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Amenities at a glance
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2 text-sm md:text-base">
          Line read only. Final labels sit on sanctioned recreational drawings and your lawyer&apos;s file copy.
        </p>
        <AmenitiesLineGrid />
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          If a feature does not show on a plan RERA links to, keep it out of your mental &quot;included&quot; list until
          it does. Post-possession, maintenance funds what survives, not adjectives.
        </p>
        <ArticleFigure
          src={SOBHA_IMAGES.clubhouse}
          alt="Sobha Rivana clubhouse and community amenities reference render"
          fit="cover"
        />
      </section>

      <section id="sobha-rivana-price" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Price, payment rhythm, and the bank&apos;s view
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Conversations in early 2026 often cite a band near thirteen to fifteen thousand rupees per square foot on
          fresh Sobha Rivana inventory, before PLC, parking, corpus, and GST. Use that only to frame questions.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>Demand a written cost sheet that matches the tower, floor, and unit you are holding.</li>
          <li>Line up each payment slab with construction milestones on the RERA filing.</li>
          <li>Stress-test a six- to nine-month slip. If that breaks cash flow, say so before you block.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Want help sequencing this?{" "}
          <Link href="/advisory-session" className="text-[#CBB27A] font-semibold hover:underline">
            Book an advisory session
          </Link>{" "}
          or see{" "}
          <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">
            how we consult
          </Link>
          .
        </p>
      </section>

      <section className="mb-14 rounded-2xl border border-gray-200 bg-[#0f1112] text-white p-8 md:p-10">
        <h2 className="text-lg md:text-xl font-bold font-poppins mb-3 text-white">
          Shortlisting Sobha Rivana with us
        </h2>
        <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base">
          We keep a no-list as well as a yes-list. If Rivana fits your hold period and risk, we say so. If another tower
          in the belt clears your checks better, we say that too. Browse{" "}
          <Link href="/properties" className="text-[#CBB27A] font-semibold hover:underline">
            inventory we stand behind
          </Link>
          , then talk to the desk.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#CBB27A] text-[#0f1112] font-semibold px-6 py-3 text-sm hover:bg-[#b9a56f] transition-colors"
          >
            Contact Celeste Abode
          </Link>
          <Link
            href="/real-estate-consulting-services"
            className="inline-flex items-center justify-center rounded-lg border border-white/25 text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
          >
            Consulting scope
          </Link>
        </div>
      </section>

      <section id="faq-sobha-rivana" className="scroll-mt-28 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Frequently asked questions
        </h2>
        <p className="text-sm text-gray-600 mb-6 max-w-2xl">
          Tap to expand. Same Q&amp;A is in FAQ schema for Google.
        </p>
        <SobhaRivanaFaqAccordion items={FAQ_ITEMS} />
      </section>

      <section
        className="mt-14 rounded-2xl bg-gradient-to-br from-[#CBB27A]/12 via-background to-background border border-[#CBB27A]/25 p-8 md:p-10 text-center"
        aria-label="Call to action"
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-poppins">
          Want a second read on your Rivana offer?
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6 text-sm md:text-base leading-relaxed">
          Send tower, configuration, and the sheet you were given. We reply with what lines up with RERA, what does not,
          and what belongs with your banker or lawyer, not with sales.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-[#CBB27A] text-[#0f1112] font-semibold px-8 py-3.5 text-sm md:text-base hover:bg-[#b9a56f] transition-colors"
        >
          Message the desk
        </Link>
      </section>
    </div>
  );
}
