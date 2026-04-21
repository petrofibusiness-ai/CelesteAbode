import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileDown,
  Home,
  Images,
  Layers,
  MapPin,
  IndianRupee,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";
import { PanchsheelGreens2PhotoGallery } from "./panchsheel-greens-2-photo-gallery";

/** Canonical listing: celesteabode.com/properties-in-greater-noida/panchsheel-greens-ii */
const PROJECT_PAGE = "/properties-in-greater-noida/panchsheel-greens-ii";

const LINK_CLASS = "text-[#CBB27A] font-semibold hover:underline underline-offset-2";

/** Campus and listing facts aligned with `lib/project-metadata.ts` (Panchsheel Greens-II) and Panchsheel Group disclosures. */
const PANCHSHEEL_FACTS = {
  rera: "UPRERAPRJ8595",
  priceFrom: "₹91.5 lakhs",
  areaSqft: "915–1,525 sq.ft.",
  acres: "26",
  openGreen: "65%",
  towers: "28",
  units: "4,216",
  status: "Ready to Move",
  pin: "201306",
} as const;

/** Hero matches blog `image` / `ogImage` in lib/blog-data (Panchsheel post). */
export const PANCHSHEEL_BLOG_HERO_URL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/panchsheel-greens-ii/images/Screenshot%202026-04-22%20at%203.12.42%E2%80%AFAM.png" as const;

/** Google Maps embed for Panchsheel Greens 2 (location section). */
const PANCHSHEEL_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.237256516035!2d77.45758380000001!3d28.61299445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee6fea14575b%3A0xa5d52a4ce9874994!2sPanchsheel%20Greens%202%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201318!5e0!3m2!1sen!2sin!4v1776808075198!5m2!1sen!2sin" as const;

export const PANCHSHEEL_GREENS_2_IMAGES = {
  leadVisual: PANCHSHEEL_BLOG_HERO_URL,
  gallery1:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/panchsheel-greens-ii/images/Screenshot%202026-04-22%20at%203.11.41%E2%80%AFAM.png",
  gallery2:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/panchsheel-greens-ii/images/Screenshot%202026-04-22%20at%203.11.57%E2%80%AFAM.png",
  gallery3: PANCHSHEEL_BLOG_HERO_URL,
  gallery4:
    "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/panchsheel-greens-ii/images/Screenshot%202026-04-22%20at%203.12.20%E2%80%AFAM.png",
} as const;

const PANCHSHEEL_GALLERY_PHOTOS = [
  {
    src: PANCHSHEEL_GREENS_2_IMAGES.gallery1,
    alt: "Panchsheel Greens II: yoga and open courtyard between residential towers",
  },
  {
    src: PANCHSHEEL_GREENS_2_IMAGES.gallery2,
    alt: "Panchsheel Greens II: outdoor swimming pool amenity",
  },
  {
    src: PANCHSHEEL_GREENS_2_IMAGES.gallery3,
    alt: "Panchsheel Greens II: landscaped walkway and high-rise towers",
  },
  {
    src: PANCHSHEEL_GREENS_2_IMAGES.gallery4,
    alt: "Panchsheel Greens II: fitness centre with cardio equipment and park view",
  },
] as const;

export const panchsheelGreens2FaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What is the Panchsheel Greens 2 pin code?",
    answer:
      "201306. This is the standard pin code for the Sector 16 Greater Noida West belt used on sale agreements and utility connections for Panchsheel Greens 2.",
  },
  {
    question: "Is Panchsheel Greens 2 ready to move?",
    answer:
      "Yes. Occupancy certificates are received on multiple towers and a large resident base already lives on campus. Always confirm the specific tower and stack before you book.",
  },
  {
    question: "What configurations are available in Panchsheel Greens 2?",
    answer:
      "2 BHK, 2 BHK + Study, and 3 BHK apartments in roughly the 915 to 1,525 sq.ft. carpet range, depending on tower and release.",
  },
  {
    question: "What is the starting price for Panchsheel Greens 2?",
    answer:
      "From ₹91.5 lakhs for a 2 BHK on our Panchsheel Greens-II listing. Exact price moves by tower, floor, and facing.",
  },
  {
    question: "Does Panchsheel Greens 2 have villas?",
    answer:
      "No. The campus is entirely high-rise apartments. For villas or low-rise options in Greater Noida West, contact our desk and we share what is live nearby.",
  },
  {
    question: "What is the RERA number for Panchsheel Greens 2?",
    answer: "UPRERAPRJ8595 for Panchsheel Greens-II on Celeste Abode.",
  },
  {
    question: "Is Panchsheel Greens 2 a good investment?",
    answer:
      "For buyers who want value, rental depth, and a ready township, it is one of the stronger Sector 16 bets. The commute trade-off toward Noida is real: map your office route before you decide.",
  },
];

function SectionH2({ id, icon: Icon, children }: { id: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3 font-poppins"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#CBB27A]/35 bg-[#CBB27A]/10">
        <Icon className="size-[18px] text-[#9a7b2c]" aria-hidden />
      </span>
      {children}
    </h2>
  );
}

function DataTable({ rows, caption }: { rows: [string, ReactNode][]; caption?: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {caption ? (
        <div className="border-b border-gray-800 bg-[#0f1112] px-4 py-2.5">
          <p className="m-0 font-poppins text-[0.65rem] font-bold uppercase tracking-wider text-[#CBB27A]">{caption}</p>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-poppins text-sm min-w-[260px]">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b border-gray-100 last:border-0">
                <th
                  scope="row"
                  className="w-[38%] max-w-[200px] border-r border-gray-100 bg-gray-50/60 px-4 py-2.5 text-left align-top text-[13px] font-semibold text-gray-900"
                >
                  {label}
                </th>
                <td className="px-4 py-2.5 text-[13px] leading-relaxed text-gray-700">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PriceGuideTable() {
  const rows: [string, string][] = [
    ["2 BHK", `From ${PANCHSHEEL_FACTS.priceFrom}`],
    ["2 BHK + Study", "Tower and floor specific"],
    ["3 BHK", "Tower and floor specific"],
    ["Resale flats", "Market-led by stack"],
  ];
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-800 bg-[#0f1112] px-4 py-2.5">
        <p className="m-0 font-poppins text-[0.65rem] font-bold uppercase tracking-wider text-[#CBB27A]">
          Indicative price (2026)
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-poppins text-sm min-w-[280px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100 text-left">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-800">Configuration</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-800">Indicative price</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {rows.map(([a, b]) => (
              <tr key={a} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2.5 text-[13px] font-medium text-gray-900">{a}</td>
                <td className="px-4 py-2.5 text-[13px] text-gray-700">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#CBB27A]/35 bg-[#CBB27A]/12 px-3 py-1.5 text-xs font-semibold text-gray-900">
      {children}
    </span>
  );
}

export function PanchsheelGreens2GreaterNoidaWestContent() {
  const toc = [
    { href: "#pg2-lead", title: "Lead" },
    { href: "#pg2-what", title: "What is Greens 2?" },
    { href: "#pg2-overview", title: "Quick overview" },
    { href: "#pg2-location", title: "Location & pin" },
    { href: "#pg2-price", title: "Price list" },
    { href: "#pg2-floor", title: "Floor plans" },
    { href: "#pg2-photos", title: "Photos" },
    { href: "#pg2-flats", title: "Flats for sale" },
    { href: "#pg2-review", title: "Review" },
    { href: "#pg2-invest", title: "Why invest" },
    { href: "#faq-pg2", title: "FAQs" },
    { href: "#pg2-next", title: "Next step" },
  ];

  const overviewRows: [string, ReactNode][] = [
    ["Project name", "Panchsheel Greens 2"],
    ["Location", "Sector 16, Greater Noida West, UP"],
    ["Builder", "Panchsheel Group"],
    ["Status", PANCHSHEEL_FACTS.status],
    ["RERA", PANCHSHEEL_FACTS.rera],
    ["Total area", `${PANCHSHEEL_FACTS.acres} acres`],
    ["Towers", PANCHSHEEL_FACTS.towers],
    ["Total units", PANCHSHEEL_FACTS.units],
    ["Configurations", "2 BHK, 2 BHK + Study, 3 BHK"],
    ["Carpet area range", `~${PANCHSHEEL_FACTS.areaSqft}`],
    ["Starting price", `From ${PANCHSHEEL_FACTS.priceFrom}`],
    ["Open space", `~${PANCHSHEEL_FACTS.openGreen} green and landscaped`],
  ];

  return (
    <div className="blog-article font-poppins">
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-[#CBB27A]/25 bg-[#CBB27A]/8 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="m-0 mb-1 text-xs font-bold uppercase tracking-wider text-[#9a7b2c]">Project hub</p>
          <p className="m-0 text-sm leading-snug text-gray-800">
            Live sheet, brochure, gallery, and callbacks on{" "}
            <Link href={PROJECT_PAGE} className={LINK_CLASS}>
              Panchsheel Greens-II
            </Link>
            .
          </p>
        </div>
        <Link
          href={PROJECT_PAGE}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0f1112] px-5 py-2.5 text-sm font-semibold text-[#CBB27A] transition-colors hover:bg-gray-900"
        >
          Open listing
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <nav
        className="mb-8 overflow-hidden rounded-lg border border-gray-200 text-left font-poppins"
        aria-label="On this page"
      >
        <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 md:px-4 md:py-2.5">
          <p className="m-0 text-[0.65rem] font-bold uppercase tracking-wider text-[#CBB27A]">On this page</p>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-px border-0 bg-gray-200 p-0 md:grid-cols-3">
          {toc.map((item) => (
            <li key={item.href} className="min-w-0 bg-gray-50">
              <div className="px-3 py-2 md:px-4 md:py-2.5">
                <a
                  href={item.href}
                  className="block text-xs font-semibold leading-snug text-gray-900 no-underline hover:text-[#CBB27A] hover:underline hover:underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBB27A] sm:text-sm"
                >
                  {item.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <header id="pg2-lead" className="scroll-mt-28 mb-10">
        <p className="m-0 mb-3 font-poppins text-2xl font-bold leading-tight text-foreground md:text-[1.65rem]">
          Panchsheel Greens 2, Greater Noida West: Price, Photos, Floor Plans &amp; Review (2026)
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          <StatPill>{PANCHSHEEL_FACTS.acres}-acre township</StatPill>
          <StatPill>{PANCHSHEEL_FACTS.towers} towers</StatPill>
          <StatPill>{PANCHSHEEL_FACTS.units} apartments</StatPill>
          <StatPill>From {PANCHSHEEL_FACTS.priceFrom}</StatPill>
        </div>
        <p className="mb-5 text-base leading-relaxed text-gray-800 md:text-[17px]">
          Panchsheel Greens 2 is a {PANCHSHEEL_FACTS.acres}-acre township in Sector 16, Greater Noida West. {PANCHSHEEL_FACTS.towers}{" "}
          towers. {PANCHSHEEL_FACTS.units} apartments. Prices from {PANCHSHEEL_FACTS.priceFrom}. Here is everything you need to know
          before you buy or invest.
        </p>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200">
          <Image
            src={PANCHSHEEL_GREENS_2_IMAGES.leadVisual}
            alt="Panchsheel Greens 2 Greater Noida West: towers, walkway, and plaza"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
            unoptimized
          />
        </div>
      </header>

      <section id="pg2-what" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-what-h" icon={Building2}>
          What is Panchsheel Greens 2?
        </SectionH2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-800 md:text-[15px]">
          <p className="m-0">
            Panchsheel Greens 2 sits inside the Noida Extension belt that buyers and brokers still call Greater Noida West. The
            Panchsheel Group built this as a full township, not a standalone project. That means a clubhouse, multiple pools,
            on-site retail, and schools nearby within the same address.
          </p>
          <p className="m-0">
            The project is ready to move. Occupancy certificates are received on multiple towers. A large resident base
            already lives there. That is the first thing any serious buyer checks, and here the answer is clean.
          </p>
          <p className="m-0">
            Searches for Panchsheel Greens phase 2, Panchsheel Greens 2 Noida Extension, and Panchsheel Greens 2 Greater Noida
            all point to this campus. For corridor context, read our{" "}
            <Link href="/blog/noida-vs-greater-noida-investment-2026" className={LINK_CLASS}>
              Noida vs Greater Noida investment guide
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="pg2-overview" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-overview-h" icon={Layers}>
          Panchsheel Greens 2: quick overview
        </SectionH2>
        <DataTable rows={overviewRows} caption="Detail vs info" />
        <p className="m-0 text-sm text-gray-600">
          Tower-wise possession and inventory sit on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          listing.
        </p>
      </section>

      <section id="pg2-location" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-location-h" icon={MapPin}>
          Panchsheel Greens 2 location and pin code
        </SectionH2>
        <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50/90 p-4 text-sm text-gray-800">
          <p className="m-0 mb-2 font-semibold text-gray-900">Address</p>
          <p className="m-0">Sector 16, Greater Noida West, Greater Noida, Uttar Pradesh.</p>
          <p className="mt-3 m-0 mb-1 font-semibold text-gray-900">Panchsheel Greens 2 pin code</p>
          <p className="m-0">
            {PANCHSHEEL_FACTS.pin}. This is the standard pin for the Sector 16 belt on sale agreements and utility connections.
          </p>
        </div>
        <p className="m-0 mb-2 text-sm font-bold text-gray-900">What is nearby?</p>
        <ul className="mb-5 list-disc space-y-1.5 pl-5 text-sm text-gray-800">
          <li>Noida and NH corridors are a short drive away.</li>
          <li>Crossing Republik retail is easily reachable.</li>
          <li>Ghaziabad markets sit within daily commute distance.</li>
          <li>Schools, hospitals, and local retail are on or near the campus.</li>
          <li>Metro is drive-first today. A future line extension is on the map but not yet at this doorstep.</li>
        </ul>
        <p className="mb-5 text-sm leading-relaxed text-gray-700">
          The Noida Extension location is the trade-off this project asks you to make. You get more space and better pricing
          than core Noida sectors. In exchange, peak-hour drives toward Noida need planning. Most residents who live here say it
          is worth it.
        </p>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-neutral-100 shadow-sm">
          <div className="relative aspect-[4/3] w-full sm:aspect-video">
            <iframe
              src={PANCHSHEEL_MAP_EMBED_SRC}
              title="Panchsheel Greens 2 on Google Maps"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="pg2-price" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-price-h" icon={IndianRupee}>
          Panchsheel Greens 2 price list (2026)
        </SectionH2>
        <p className="mb-4 text-sm text-gray-700">
          Prices are tower and floor specific. The bands below are a reference. For exact current pricing by tower and floor,{" "}
          check the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            live listing
          </Link>{" "}
          or contact our desk directly.
        </p>
        <PriceGuideTable />
        <div className="mt-6 rounded-xl border border-amber-200/70 bg-amber-50/50 p-4">
          <p className="m-0 mb-2 flex items-center gap-2 text-sm font-bold text-amber-950">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-200/60 text-xs font-black">!</span>
            A note on villas
          </p>
          <p className="m-0 text-sm leading-relaxed text-gray-800">
            Panchsheel Greens 2 villas is a common search. The main campus is entirely high-rise apartments. No villas exist
            within this project. If you want villa or low-rise options in the same belt, ask us and we will share what is live
            nearby.
          </p>
        </div>
      </section>

      <section id="pg2-floor" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-floor-h" icon={Layers}>
          Panchsheel Greens 2 floor plans
        </SectionH2>
        <p className="mb-3 text-sm text-gray-800">The project offers three main layouts:</p>
        <ul className="mb-4 list-none space-y-2.5 m-0 p-0">
          <li className="flex gap-2 text-sm text-gray-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#CBB27A]" aria-hidden />
            <span>
              <span className="font-semibold text-gray-900">2 BHK</span> — approximately 915 sq.ft. carpet area.
            </span>
          </li>
          <li className="flex gap-2 text-sm text-gray-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#CBB27A]" aria-hidden />
            <span>
              <span className="font-semibold text-gray-900">2 BHK + Study</span> — mid-range carpet band, varies by tower.
            </span>
          </li>
          <li className="flex gap-2 text-sm text-gray-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#CBB27A]" aria-hidden />
            <span>
              <span className="font-semibold text-gray-900">3 BHK</span> — up to approximately 1,525 sq.ft. carpet area.
            </span>
          </li>
        </ul>
        <p className="m-0 text-sm leading-relaxed text-gray-700">
          Floor plan downloads with exact dimensions are on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            listing page
          </Link>
          . Tower-wise layouts differ slightly, so always check the specific tower before shortlisting. Compare with{" "}
          <Link href="/blog/sobha-rivana-greater-noida-west" className={LINK_CLASS}>
            Sobha Rivana
          </Link>{" "}
          if you want another Greater Noida West benchmark.
        </p>
      </section>

      <section id="pg2-photos" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-photos-h" icon={Images}>
          Panchsheel Greens 2 photos
        </SectionH2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          The campus photos show finished towers, landscaped walkways, the clubhouse, and the central plaza. A large portion of
          the {PANCHSHEEL_FACTS.acres} acres is open green space, which shows in the ground-level shots. Tap a thumbnail to
          enlarge. More photos are on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            project listing
          </Link>
          . Want a site visit? We can arrange it.
        </p>
        <PanchsheelGreens2PhotoGallery photos={PANCHSHEEL_GALLERY_PHOTOS} />
      </section>

      <section id="pg2-flats" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-flats-h" icon={Home}>
          Panchsheel Greens 2 flats for sale
        </SectionH2>
        <p className="mb-3 text-sm font-semibold text-gray-900">Available inventory here includes:</p>
        <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm text-gray-800">
          <li>Fresh builder stock where remaining.</li>
          <li>Resale flats across handed-over towers.</li>
          <li>A wide price range by floor, tower, and facing.</li>
        </ul>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          The resale market is active. Rental demand from working households in the 2 BHK and 3 BHK segments is steady. For
          investors, that means reasonable exit options and rental income potential. Brochure and downloadable floor plans
          sit on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          page alongside the enquiry form.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href={PROJECT_PAGE}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CBB27A] px-5 py-2.5 text-sm font-semibold text-[#0f1112] hover:bg-[#b9a56f]"
          >
            <FileDown className="size-4" aria-hidden />
            Brochure &amp; listing
          </Link>
          <Link
            href="/properties-in-greater-noida"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-[#CBB27A]"
          >
            Greater Noida properties
          </Link>
          <Link
            href="/blog/3bhk-flats-in-greater-noida"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-[#CBB27A]"
          >
            3 BHK Greater Noida guide
          </Link>
        </div>
      </section>

      <section id="pg2-review" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-review-h" icon={ThumbsUp}>
          Panchsheel Greens 2 review
        </SectionH2>
        <p className="mb-4 text-sm text-gray-600">An honest read for buyers doing real research.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-5">
            <p className="m-0 mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-900">
              <ThumbsUp className="size-4" aria-hidden />
              What works
            </p>
            <ul className="m-0 list-disc space-y-2 pl-4 text-sm leading-relaxed text-gray-800">
              <li>
                <strong className="text-gray-900">Scale.</strong> {PANCHSHEEL_FACTS.acres} acres with {PANCHSHEEL_FACTS.units}{" "}
                homes means the club, pools, jogging track, and retail are properly funded and used. Small projects cannot
                sustain this.
              </li>
              <li>
                <strong className="text-gray-900">Ready status.</strong> OC received on multiple towers. No possession risk on
                completed stacks. You see what you buy.
              </li>
              <li>
                <strong className="text-gray-900">Rental depth.</strong> Working families rent 2 BHK and 3 BHK units here
                consistently. The Noida Extension rental market is not shallow.
              </li>
              <li>
                <strong className="text-gray-900">Price.</strong> For the ticket size and the amenity package, the value is
                strong versus equivalent Noida sectors. This is the main reason buyers choose this belt.
              </li>
              <li>
                <strong className="text-gray-900">Resale liquidity.</strong> The project is large enough that buyers exist. You
                are not stuck waiting for one buyer in a 200-unit building.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-5">
            <p className="m-0 mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-950">
              <ThumbsDown className="size-4" aria-hidden />
              What to watch
            </p>
            <ul className="m-0 list-disc space-y-2 pl-4 text-sm leading-relaxed text-gray-800">
              <li>
                <strong className="text-gray-900">Commute.</strong> Peak-hour traffic toward Noida and Delhi needs real
                planning. Check your specific office location before buying.
              </li>
              <li>
                <strong className="text-gray-900">Density.</strong> {PANCHSHEEL_FACTS.units} homes in {PANCHSHEEL_FACTS.acres}{" "}
                acres is dense. Society maintenance, lift management, and common area upkeep all matter. Ask current residents
                about RWA quality before deciding.
              </li>
              <li>
                <strong className="text-gray-900">Phase labelling.</strong> Online listings sometimes blur Panchsheel Greens 1
                and Greens 2 details. Always verify tower number, RERA ID ({PANCHSHEEL_FACTS.rera}), and floor before agreeing to
                anything.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="pg2-invest" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-invest-h" icon={TrendingUp}>
          Why invest in Panchsheel Greens 2?
        </SectionH2>
        <p className="mb-4 text-sm text-gray-800">Three reasons buyers return to this project:</p>
        <ol className="m-0 list-none space-y-4 p-0">
          {[
            {
              n: "1",
              title: "Location with value",
              body: "Sector 16, Greater Noida West gives you road access to Noida and NH links without the premium you pay in core Noida sectors.",
            },
            {
              n: "2",
              title: "End-user appeal",
              body: "Families buying for self-use find the amenities, school proximity, and ready status convincing. End-user demand protects investment value better than speculative demand.",
            },
            {
              n: "3",
              title: "Rentals",
              body: "The 2 BHK and 3 BHK segments attract working households. Investors report stable occupancy.",
            },
          ].map((item) => (
            <li
              key={item.n}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0f1112] text-sm font-bold text-[#CBB27A]">
                {item.n}
              </span>
              <div>
                <p className="m-0 mb-1 font-semibold text-gray-900">{item.title}</p>
                <p className="m-0 text-sm leading-relaxed text-gray-700">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          If you are comparing this against other corridors, our{" "}
          <Link href="/blog/noida-vs-greater-noida-investment-2026" className={LINK_CLASS}>
            Noida vs Greater Noida investment guide
          </Link>{" "}
          covers the trade-offs clearly.
        </p>
      </section>

      <section id="faq-pg2" className="scroll-mt-28 mb-8">
        <SectionH2 id="faq-pg2-h" icon={CheckCircle2}>
          Frequently asked questions
        </SectionH2>
        <p className="mb-4 text-sm text-gray-600">Tap a question to expand.</p>
        <SobhaRivanaFaqAccordion items={panchsheelGreens2FaqSchemaItems} />
      </section>

      <section
        id="pg2-next"
        className="scroll-mt-28 rounded-xl border border-[#CBB27A]/25 bg-gradient-to-br from-[#CBB27A]/10 to-white p-6 text-center md:p-8"
        aria-label="Call to action"
      >
        <h2 className="mb-3 font-poppins text-lg font-bold text-foreground md:text-xl">Next step</h2>
        <p className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-gray-700">
          Floor plans, photos, brochure, price sheet, and flats for sale are on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          listing page. Want a curated shortlist based on your budget and tower preference?{" "}
          <Link href="/request-a-free-consultation" className={LINK_CLASS}>
            Book a free consultation
          </Link>{" "}
          or{" "}
          <Link href="/contact" className={LINK_CLASS}>
            write to us
          </Link>
          .
        </p>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href={PROJECT_PAGE}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CBB27A] px-6 py-3 text-sm font-semibold text-[#0f1112] hover:bg-[#b9a56f]"
          >
            Open Panchsheel Greens-II
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/request-a-free-consultation"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-[#CBB27A]"
          >
            Book consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
