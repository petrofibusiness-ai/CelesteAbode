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

/** As on UP RERA public listings; verify on the portal if the number changes. */
export const SOBHA_RIVANA_RERA_FULL = "UPRERAPRJ313638/03/2026";

const SOBHA_IMAGES = {
  entrance:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-entrance.jpg",
  interior:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-interior.avif",
  map: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/map.jpeg",
  land: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/land.jpeg",
  clubhouse:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-clubhouse.avif",
} as const;

/** R2 + AVIF: skip optimizer to avoid blank frames. Map/land variants use intrinsic width/height so the frame matches the asset. */
function ArticleFigure({
  src,
  alt,
  fit = "cover",
  variant = "default",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  /** Map/land: scale to column width with natural aspect (no fixed 16:9 box). */
  variant?: "default" | "map" | "land";
}) {
  if (variant === "map") {
    /* Intrinsic 1024×1536 (map.jpeg); match ratio so layout space matches the asset (avoids grey bands). */
    return (
      <figure className="my-8 rounded-2xl overflow-hidden border border-gray-200 bg-neutral-100 shadow-sm">
        <div className="relative w-full">
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={1536}
            unoptimized
            className="block h-auto w-full max-w-full"
            sizes="(max-width: 1024px) 100vw, min(100%, 800px)"
          />
        </div>
      </figure>
    );
  }

  if (variant === "land") {
    /* Intrinsic 1600×894 (land.jpeg) */
    return (
      <figure className="my-8 rounded-2xl overflow-hidden border border-gray-200 bg-neutral-100 shadow-sm">
        <div className="relative w-full">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={894}
            unoptimized
            className="block h-auto w-full max-w-full"
            sizes="(max-width: 1024px) 100vw, min(100%, 800px)"
          />
        </div>
      </figure>
    );
  }

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

const PAGE_TOC: { href: string; title: string }[] = [
  { href: "#sobha-rivana-project-table", title: "Snapshot (Quick Facts)" },
  { href: "#sobha-rivana-project-overview", title: "Project Overview" },
  { href: "#sobha-rivana-developer", title: "Developer Background" },
  { href: "#sobha-rivana-rera", title: "RERA Status" },
  { href: "#sobha-rivana-location", title: "Location Review" },
  { href: "#sobha-rivana-floor-plans", title: "Layouts and Sizes" },
  { href: "#sobha-rivana-amenities", title: "Amenities and Open Spaces" },
  { href: "#sobha-rivana-price", title: "Pricing and Payment Plans" },
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is Sobha Rivana's UP RERA registration number?",
    answer:
      "The project is listed as UPRERAPRJ313638/03/2026, with registration on 20 March 2026.",
  },
  {
    question: "Where is Sobha Rivana located?",
    answer:
      "Sector 1, Greater Noida West, often called Noida Extension. Daily life is shaped by Gaur Chowk, the Noida and Greater Noida link roads, and Techzone. We always suggest driving your own office and school routes at the hours you actually use them.",
  },
  {
    question: "What apartment types does Sobha Rivana offer?",
    answer:
      "The focus is on two-, three-, and four-bedroom apartments. Sizes vary by tower and floor, so the live sales matrix and floor plans are the best guide when you shortlist.",
  },
  {
    question: "How much does Sobha Rivana cost per square foot?",
    answer:
      "In early 2026, market chatter often lands around ₹13,000 to ₹15,000 per sq ft before PLC, parking, and GST, but this moves with inventory. Your builder's cost sheet and your bank's view should line up before you commit.",
  },
  {
    question: "When can buyers expect possession at Sobha Rivana?",
    answer:
      "Marketing sometimes mentions an end-of-decade window, with December 2029 in some notes. Treat your agreement and the project timeline on RERA as the final word, and ask us if you want help comparing that with other options.",
  },
  {
    question: "What is the indicative starting price for Sobha Rivana?",
    answer:
      "Launch conversations often start near ₹2.25 crore for select formats, before PLC, floor rise, parking, and taxes. Some buyers enter through an expression of interest with a token and KYC. We help you read the sheet in plain language.",
  },
  {
    question: "How can Celeste Abode help if I am considering Rivana?",
    answer:
      "We are property consultants in Delhi NCR. We shortlist with you, compare Rivana with other luxury and mid-premium options in Noida and Greater Noida, coordinate site visits, and walk through paperwork and payment structure so you are not doing this alone.",
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
      <nav
        className="mb-6 overflow-hidden rounded-lg border border-gray-200 text-left font-poppins"
        aria-label="On this page"
      >
        <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 md:px-4 md:py-2.5">
          <p className="m-0 text-[0.65rem] font-bold uppercase tracking-wider text-[#CBB27A]">On this page</p>
        </div>
        {/* gap-px + bg on grid = hairline row/column rules; one col mobile, two cols md+ (same as desktop rhythm) */}
        <ul
          role="list"
          className="m-0 grid list-none grid-cols-1 gap-px border-0 bg-gray-200 p-0 md:grid-cols-2"
        >
          {PAGE_TOC.map((item) => (
            <li key={item.href} className="min-w-0 bg-gray-50">
              <div className="flex h-full flex-col px-3 py-2.5 md:px-4 md:py-3">
                <a
                  href={item.href}
                  className="m-0 block w-full max-w-full p-0 text-left text-xs font-semibold leading-snug text-gray-900 no-underline hover:text-[#CBB27A] hover:underline hover:underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBB27A] sm:text-sm"
                >
                  {item.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <section id="sobha-rivana-project-table" className="scroll-mt-28 mb-14">
        <figure className="my-8 rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-sm">
          <div className="relative w-full aspect-[16/8.6] leading-none">
            <video
              src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/Video%20Project_cropped.mp4"
              className="absolute inset-0 block h-full w-full scale-[1.08] object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </figure>
        <SpecTable />
      </section>

      <section id="sobha-rivana-project-overview" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Project Overview
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Rivana is a large residential project by Sobha in Sector 1, Greater Noida West, planned across a significant
          land parcel with multiple towers and a full set of lifestyle amenities. The development focuses on efficient
          layouts, open spaces, and a structured community setup suited for end users looking to upgrade within the micro
          market.
        </p>
      </section>

      <section id="sobha-rivana-developer" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Sobha Limited: The developer behind Rivana
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Sobha Limited is a publicly listed real estate developer with over 25 years of experience. Founded in 1995, it
          has delivered more than 120 million sq. ft. across India. What sets Sobha apart is its backward integration
          model. It controls everything from raw materials to final construction, ensuring consistent quality.
        </p>
        <p className="text-gray-700 leading-relaxed mb-5">
          Headquartered in Bengaluru, Sobha operates in 13+ cities. Its projects are known for strong construction
          quality, clean finishes, and consistent delivery, making it a trusted name in the premium housing segment.
        </p>
        <p className="text-gray-700 leading-relaxed">
          When you work with Celeste Abode, we place Rivana next to other credible names on our{" "}
          <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
            properties in Greater Noida
          </Link>{" "}
          page and help you see where it wins for your budget and where another project might fit better.
        </p>
      </section>

      <ArticleFigure
        src={SOBHA_IMAGES.map}
        alt="Sobha Limited since 1995: pan-India presence, 550+ landmark projects, 230+ prestigious awards, full backward integration, 1,456 quality checks before handover, and landmark project scale in Sobha brand marketing art."
        variant="map"
      />

      <section id="sobha-rivana-rera" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          UP RERA registration
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Rivana is registered on UP RERA as <strong>{SOBHA_RIVANA_RERA_FULL}</strong>, with a listing date of{" "}
          <strong>20 March 2026</strong>. That is one anchor among many. We still read location, product, and price with
          you as a whole picture, the way we do for every serious buyer in NCR.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Listing paperwork lives on{" "}
          <a href="https://up-rera.in" target="_blank" rel="noopener noreferrer" className="text-[#CBB27A] font-semibold hover:underline">
            up-rera.in
          </a>
          . If you are new to this side of the region, our{" "}
          <Link href="/blog/noida-vs-greater-noida-investment-2026" className="text-[#CBB27A] font-semibold hover:underline">
            Noida versus Greater Noida
          </Link>{" "}
          note is a friendly starting point.
        </p>
      </section>

      <section id="sobha-rivana-location" className="scroll-mt-28 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Sobha Rivana location: Sector 1, Greater Noida West
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Sector 1 sits inside Greater Noida West, the belt most people still call Noida Extension. It is a dense
          residential grid with strong buyer interest and steady new supply. FNG, NH 24, and Pari Chowk sit at different
          driving distances depending on where you start. Noida International Airport at Jewar is relevant for a longer
          horizon. What matters most is whether this belt fits your office, schools, and family rhythm.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>Gaur Chowk and the Noida and Greater Noida links shape everyday traffic patterns.</li>
          <li>Techzone and Knowledge Park bring working professionals and rental demand.</li>
          <li>Schools, hospitals, and metro connectivity are part of the story. We help you weigh them against other
            micro-markets such as{" "}
            <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
              flats for sale in Noida
            </Link>
            .
          </li>
          <li>Jewar and YEIDA are useful for a long-term NCR view alongside your day-to-day commute.</li>
        </ul>
      </section>

      <section id="sobha-rivana-floor-plans" className="scroll-mt-28 mb-14">
        <ArticleFigure
          src={SOBHA_IMAGES.land}
          alt="Greater Noida West site for Sobha Rivana: land parcel with the project area marked where Sobha will build."
          variant="land"
        />
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Floor plans and unit mix: 2 BHK, 3 BHK, 4 BHK
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Rivana is pitched as a full-size Sobha offering in NCR: two-, three-, and four-bedroom apartments with generous
          room sizes by local standards. Early market notes often mention bands near 1,300 sq ft for two-bedroom homes,
          about 1,600 to 1,850 sq ft for three-bedroom plans, and about 2,200 to 2,500 sq ft for four-bedroom plans. Exact
          numbers change by
          tower and floor, so we always align with the live floor plate when we shortlist with you.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          If you are comparing launches, start with{" "}
          <Link
            href="/blog/upcoming-luxury-projects-noida-greater-noida-2026"
            className="text-[#CBB27A] font-semibold hover:underline"
          >
            upcoming luxury projects in Noida and Greater Noida
          </Link>
          .
        </p>
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
          The marketing story for Rivana includes a large clubhouse, river-themed landscaping, sports and wellness spaces,
          and layered security. That matches how Sobha typically positions its premium communities. When you visit with
          us, we focus on what matters to your family: open space, everyday convenience, and how the maintenance load will
          feel after you move in.
        </p>
        <AmenitiesLineGrid />
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          Final specifications follow the builder&apos;s sanctioned plans and your agreement. We help you read them in
          context, the same way we do for other luxury projects on our radar.
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
          Price, payment plans, and the bank&apos;s view
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Early conversations often open near <strong>₹2.25 crore</strong> for select two- and three-bedroom formats,
          with larger plans scaling up. Channel talk in early 2026 also mentions a band near ₹13,000 to ₹15,000 per sq ft
          before PLC, parking, corpus, and GST. Some buyers enter through an expression of interest
          with a token and KYC. We sit with you on the builder&apos;s cost sheet so the numbers make sense before you move
          forward.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>We recommend a written cost sheet for the exact tower, floor, and unit you prefer.</li>
          <li>Payment slabs should line up with construction progress and your comfort on cash flow.</li>
          <li>If you want a neutral read on how Rivana compares with other premium options, start with{" "}
            <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">
              our consulting services
            </Link>
            .
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Prefer a focused call?{" "}
          <Link href="/advisory-session" className="text-[#CBB27A] font-semibold hover:underline">
            Book an advisory session
          </Link>{" "}
          with Celeste Abode.
        </p>
      </section>

      <section id="faq-sobha-rivana" className="scroll-mt-28 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          Frequently asked questions
        </h2>
        <p className="text-sm text-gray-600 mb-6 max-w-2xl">Tap a question to read the answer.</p>
        <SobhaRivanaFaqAccordion items={FAQ_ITEMS} />
      </section>

      <section
        className="mt-14 rounded-2xl bg-gradient-to-br from-[#CBB27A]/12 via-background to-background border border-[#CBB27A]/25 p-8 md:p-10 text-center"
        aria-label="Call to action"
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-poppins">
          Talk to Celeste Abode about Sobha Rivana
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6 text-sm md:text-base leading-relaxed">
          Share what you are looking for: budget, configuration, and whether Rivana is one of several names on your list.
          We respond as your property consultant in Delhi NCR, with clear next steps and no pressure.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-[#CBB27A] text-[#0f1112] font-semibold px-8 py-3.5 text-sm md:text-base hover:bg-[#b9a56f] transition-colors"
        >
          Contact Celeste Abode
        </Link>
      </section>
    </div>
  );
}
