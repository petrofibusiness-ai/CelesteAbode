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
  Sparkles,
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
  areaSqft: "915–1525 sq.ft.",
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
    question: "What is Panchsheel Greens phase 2?",
    answer:
      "Panchsheel Greens 2 is the Panchsheel Greens phase 2 campus in Greater Noida West: about 26 acres, 28 towers, roughly 4,200 apartments, strong open green cover, and OC-led handover on multiple towers. On Celeste Abode we list Panchsheel Greens-II with 2 BHK, 2 BHK + Study, and 3 BHK inventory, RERA UPRERAPRJ8595, pricing from ₹91.5 lakhs, clubhouse, pools, and landscaped spaces. Full specs and forms sit on the Panchsheel Greens-II listing.",
  },
  {
    question: "Where is Panchsheel Greens 2 in Noida Extension?",
    answer:
      "Panchsheel Greens 2 is in Sector 16, Greater Noida West (Noida Extension), Uttar Pradesh, with strong road access toward Noida, NH corridors, FNG, and Crossing Republik. Pin 201306 is widely used on listings for this belt. Address and map context match our Panchsheel Greens-II listing on Celeste Abode.",
  },
  {
    question: "What is the Panchsheel Greens 2 price list?",
    answer:
      "Celeste Abode lists Panchsheel Greens-II from about ₹91.5 lakhs for eligible 2 BHK stacks, with 2 BHK + Study and 3 BHK on the live sheet. Current Panchsheel Greens 2 price list and resale bands sit on the Panchsheel Greens-II listing with brochure download and callback. Our team shares tower-wise numbers once you pick configuration and timeline.",
  },
  {
    question: "How do I get the Panchsheel Greens 2 brochure?",
    answer:
      "Open Panchsheel Greens-II on Celeste Abode and use the brochure download, or request a callback on the same page. We send the latest brochure and floor plans for the configuration you want.",
  },
  {
    question: "Are Panchsheel Greens 2 flats for sale in resale?",
    answer:
      "Yes. Fresh and resale Panchsheel Greens 2 flat for sale options are routed through the Panchsheel Greens-II listing and our Greater Noida desk. Tell us tower, floor, and budget and we line up visits.",
  },
  {
    question: "What do Panchsheel Greens 2 reviews say?",
    answer:
      "Buyers like the Sector 16 Greater Noida West location, campus amenities, and value versus many Noida pockets. Practical watch points are peak traffic toward Noida and society upkeep on high-density phases. Gallery and amenities on the Panchsheel Greens-II page give a clear first look.",
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
        <div className="bg-[#0f1112] px-4 py-2.5 border-b border-gray-800">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#CBB27A] m-0 font-poppins">{caption}</p>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-poppins border-collapse min-w-[260px]">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b border-gray-100 last:border-0">
                <th
                  scope="row"
                  className="text-left font-semibold text-gray-900 align-top py-2.5 px-4 w-[36%] max-w-[180px] border-r border-gray-100 bg-gray-50/60 text-[13px]"
                >
                  {label}
                </th>
                <td className="text-gray-700 py-2.5 px-4 text-[13px] leading-relaxed">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PanchsheelGreens2GreaterNoidaWestContent() {
  const toc = [
    { href: "#pg2-intro", title: "Introduction" },
    { href: "#pg2-overview", title: "Overview" },
    { href: "#pg2-location", title: "Location and pin" },
    { href: "#pg2-price", title: "Price list" },
    { href: "#pg2-floor", title: "Floor plans" },
    { href: "#pg2-photos", title: "Photos" },
    { href: "#pg2-brochure", title: "Brochure" },
    { href: "#pg2-flat-sale", title: "Flats for sale" },
    { href: "#pg2-review", title: "Review" },
    { href: "#pg2-invest", title: "Why invest" },
    { href: "#faq-pg2", title: "FAQs" },
  ];

  const overviewRows: [string, ReactNode][] = [
    ["Project name", "Panchsheel Greens-II (Panchsheel Greens 2 / phase 2)"],
    ["Location", "Sector 16, Greater Noida West (Noida Extension), Uttar Pradesh"],
    ["Builder", "Panchsheel Group"],
    ["Status", PANCHSHEEL_FACTS.status],
    ["Property type", "Apartments / flats"],
    [
      "Configuration",
      "2 BHK, 2 BHK + Study, 3 BHK; typical carpet band about " + PANCHSHEEL_FACTS.areaSqft + " on inventory sheets",
    ],
    ["RERA", PANCHSHEEL_FACTS.rera],
    ["Indicative pricing", "From " + PANCHSHEEL_FACTS.priceFrom + " on Celeste Abode listing (tower and floor specific)"],
    ["Project area", "About " + PANCHSHEEL_FACTS.acres + " acres"],
    ["Open space", "About " + PANCHSHEEL_FACTS.openGreen + " green and open landscape (master plan)"],
    ["Towers", PANCHSHEEL_FACTS.towers + " towers"],
    ["Total units", PANCHSHEEL_FACTS.units + " apartments"],
    [
      "Possession",
      "OC received on multiple towers with large resident base already in; phased completion across stacks (Panchsheel Group campus update)",
    ],
    [
      "Listing",
      <>
        Gallery, amenities, brochure, and callback on the{" "}
        <Link href={PROJECT_PAGE} className={LINK_CLASS}>
          Panchsheel Greens-II
        </Link>{" "}
        page.
      </>,
    ],
  ];

  const priceRows: [string, ReactNode][] = [
    [
      "2 BHK",
      <>
        From {PANCHSHEEL_FACTS.priceFrom} on the{" "}
        <Link href={PROJECT_PAGE} className={LINK_CLASS}>
          Panchsheel Greens-II
        </Link>{" "}
        listing; tower and floor refresh the exact BSP.
      </>,
    ],
    ["2 BHK + Study", "Live sheet on the listing, tower and floor specific"],
    ["3 BHK", "Live sheet and resale inventory; same campus scale as 2 BHK stacks"],
    ["Resale", "Market-led by stack; share unit details and we line up comparable deals"],
    [
      "Villas / low-rise",
      <>
        Main campus is high-rise apartments. Ask our desk for villa-style options nearby or browse{" "}
        <Link href="/properties-in-greater-noida" className={LINK_CLASS}>
          Greater Noida properties
        </Link>
        .
      </>,
    ],
  ];

  return (
    <div className="blog-article font-poppins">
      <div className="mb-8 rounded-xl border border-[#CBB27A]/25 bg-[#CBB27A]/8 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#9a7b2c] m-0 mb-1">Full project detail</p>
          <p className="text-sm text-gray-800 m-0 leading-snug">
            About {PANCHSHEEL_FACTS.acres} acres, {PANCHSHEEL_FACTS.towers} towers, {PANCHSHEEL_FACTS.units} homes, and
            listing-led pricing from {PANCHSHEEL_FACTS.priceFrom}. Floor plans, gallery, brochure, and callbacks sit on our
            Panchsheel Greens-II page (same campus as Panchsheel Greens 2).
          </p>
        </div>
        <Link
          href={PROJECT_PAGE}
          className="inline-flex items-center justify-center gap-2 shrink-0 rounded-lg bg-[#0f1112] px-5 py-2.5 text-sm font-semibold text-[#CBB27A] hover:bg-gray-900 transition-colors"
        >
          Open Panchsheel Greens-II
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
        <ul className="m-0 grid list-none grid-cols-2 md:grid-cols-3 gap-px border-0 bg-gray-200 p-0">
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

      <section id="pg2-intro" className="scroll-mt-28 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="size-5 text-[#CBB27A]" aria-hidden />
          <p className="text-xs font-bold uppercase tracking-wider text-[#CBB27A] m-0">Introduction</p>
        </div>
        <p className="text-gray-800 text-base md:text-[17px] leading-relaxed mb-4">
          <strong>Panchsheel Greens 2</strong> is a large Panchsheel Group township in Greater Noida West, the stretch
          people still call Noida Extension. The campus runs at roughly {PANCHSHEEL_FACTS.acres} acres with{" "}
          {PANCHSHEEL_FACTS.towers} towers and about {PANCHSHEEL_FACTS.units} apartments, which is why Panchsheel Greens phase
          2 and Panchsheel Greens 2 Noida searches keep landing here. It is an approved residential campus with strong end-user
          and investor interest: sensible tickets from {PANCHSHEEL_FACTS.priceFrom} on our listing, rental depth, and healthy
          resale liquidity for the belt. If you
          are weighing the corridor more broadly, our{" "}
          <Link href="/blog/noida-vs-greater-noida-investment-2026" className={LINK_CLASS}>
            Noida vs Greater Noida investment note
          </Link>{" "}
          frames how we think about the trade-offs.
        </p>
        <ul className="space-y-2 text-gray-700 text-sm leading-relaxed mb-5 list-none m-0 p-0">
          <li className="flex gap-2">
            <CheckCircle2 className="size-4 text-[#CBB27A] shrink-0 mt-0.5" aria-hidden />
            <span>Developer: Panchsheel Group, with deep NCR delivery and a lived-in footprint at Greens 2.</span>
          </li>
          <li className="flex gap-2">
            <Building2 className="size-4 text-[#CBB27A] shrink-0 mt-0.5" aria-hidden />
            <span>Demand stays strong for full-scale amenities, retail, schools nearby, and value versus core Noida.</span>
          </li>
          <li className="flex gap-2">
            <TrendingUp className="size-4 text-[#CBB27A] shrink-0 mt-0.5" aria-hidden />
            <span>
              Investors like rent and exit depth; end users like schools, clubs, and a settled campus. Both find inventory
              here.
            </span>
          </li>
        </ul>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200">
          <Image
            src={PANCHSHEEL_GREENS_2_IMAGES.leadVisual}
            alt="Panchsheel Greens 2 Greater Noida West: towers, landscaped walkway, and plaza"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
            unoptimized
          />
        </div>
      </section>

      <section id="pg2-overview" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-overview-h" icon={Layers}>
          Panchsheel Greens 2 overview
        </SectionH2>
        <p className="text-sm text-gray-600 mb-3">
          A quick snapshot for Panchsheel Greens 2 Noida Extension and Panchsheel Greens 2 Greater Noida West readers,
          aligned with our{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          listing.
        </p>
        <DataTable rows={overviewRows} caption="At a glance" />
        <p className="text-sm text-gray-600 m-0">
          Panchsheel Greens 2 possession timelines are tower-specific. We keep the live view next to inventory on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          page.
        </p>
      </section>

      <section id="pg2-location" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-location-h" icon={MapPin}>
          Panchsheel Greens 2 location, address, and pin code
        </SectionH2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Panchsheel Greens 2 address: Sector 16, Greater Noida West, Greater Noida, Uttar Pradesh, as on our{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          listing. Panchsheel Greens 2 pin code, Panchsheel Greens 2 Greater Noida West pin code, and pin code of Panchsheel
          Greens 2 Noida Extension commonly align with {PANCHSHEEL_FACTS.pin} for this Sector 16 belt on agreements and
          utilities. Searches for Panchsheel Greens 2 sector 16 Noida or Panchsheel Greens 2 Noida extension address point here.
        </p>
        <ul className="text-sm text-gray-700 space-y-1.5 m-0 pl-4 list-disc mb-4">
          <li>Noida and NH corridors within a short drive; FNG and Greater Noida road network in daily use.</li>
          <li>Crossing Republik and Ghaziabad retail within easy reach.</li>
          <li>Noida office and school hubs connected by road; metro is a drive-first story today with future line extension on the map.</li>
        </ul>
        <figure className="m-0 overflow-hidden rounded-xl border border-gray-200 bg-neutral-100 shadow-sm">
          <div className="relative aspect-[4/3] w-full max-w-4xl sm:aspect-video">
            <iframe
              src={PANCHSHEEL_MAP_EMBED_SRC}
              title="Panchsheel Greens 2 on Google Maps"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <figcaption className="px-3 py-2 text-xs text-gray-600 bg-white border-t border-gray-100">
            Interactive map for Panchsheel Greens 2 (Greater Noida West / Noida Extension belt).
          </figcaption>
        </figure>
      </section>

      <section id="pg2-price" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-price-h" icon={IndianRupee}>
          Panchsheel Greens 2 price list
        </SectionH2>
        <DataTable rows={priceRows} caption="Indicative bands" />
        <p className="text-sm text-gray-600 m-0">
          For a Panchsheel Greens 2 villas price list or low-rise stock nearby, our Greater Noida desk shares what is live
          today. This Panchsheel Greens-II listing is apartment-led; the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            project page
          </Link>{" "}
          carries the current apartment sheet.
        </p>
      </section>

      <section id="pg2-floor" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-floor-h" icon={Layers}>
          Panchsheel Greens 2 floor plan and layout
        </SectionH2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Panchsheel Greens 2 layout options on Celeste Abode span 2 BHK, 2 BHK + Study, and 3 BHK apartments, typically in the
          about {PANCHSHEEL_FACTS.areaSqft} band depending on tower. Panchsheel Greens 2 floor plan and layout plan downloads
          sit on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          page, alongside the brochure. For another Greater Noida West benchmark, see{" "}
          <Link href="/blog/sobha-rivana-greater-noida-west" className={LINK_CLASS}>
            Sobha Rivana
          </Link>
          .
        </p>
      </section>

      <section id="pg2-photos" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-photos-h" icon={Images}>
          Panchsheel Greens 2 photos
        </SectionH2>
        <p className="text-sm text-gray-600 mb-3">
          Panchsheel Greens 2 photos below: tap or click a thumbnail to enlarge. More visuals live on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          listing.
        </p>
        <PanchsheelGreens2PhotoGallery photos={PANCHSHEEL_GALLERY_PHOTOS} />
      </section>

      <section id="pg2-brochure" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-brochure-h" icon={FileDown}>
          Panchsheel Greens 2 brochure
        </SectionH2>
        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-700 m-0">
            Download the latest Panchsheel Greens 2 brochure from the Panchsheel Greens-II listing, or leave a request here.
            We send the PDF and key specs together.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Link
              href={PROJECT_PAGE}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CBB27A] px-5 py-2.5 text-sm font-semibold text-[#0f1112] hover:bg-[#b9a56f] transition-colors"
            >
              <FileDown className="size-4" aria-hidden />
              Brochure on listing
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-[#CBB27A] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section id="pg2-flat-sale" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-flat-sale-h" icon={Home}>
          Panchsheel Greens 2 flat for sale
        </SectionH2>
        <p className="text-sm text-gray-700 leading-relaxed m-0">
          Panchsheel Greens 2 flat for sale spans fresh builder inventory where available and a deep resale market across
          handed-over towers. Shortlist tower, floor, and budget on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          page or ask us to line up visits. For the wider belt, browse{" "}
          <Link href="/properties-in-greater-noida" className={LINK_CLASS}>
            properties in Greater Noida
          </Link>
          . If you are comparing three-bedroom stock elsewhere, our{" "}
          <Link href="/blog/3bhk-flats-in-greater-noida" className={LINK_CLASS}>
            3 BHK in Greater Noida guide
          </Link>{" "}
          is a useful parallel read.
        </p>
      </section>

      <section id="pg2-review" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-review-h" icon={ThumbsUp}>
          Panchsheel Greens 2 review
        </SectionH2>
        <p className="text-sm text-gray-600 mb-3">
          A concise read for Panchsheel Greens 2 review and Panchsheel Greens 2 Noida Extension review searches.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-green-200/80 bg-green-50/40 p-4">
            <p className="text-xs font-bold uppercase text-green-900 m-0 mb-2 flex items-center gap-1.5">
              <ThumbsUp className="size-4" aria-hidden />
              Pros
            </p>
            <ul className="text-sm text-gray-800 space-y-1 m-0 pl-4 list-disc">
              <li>Large lived-in campus, clubs, pools, and on-site retail.</li>
              <li>Strong resale and rental depth for 2 BHK, 2 BHK + Study, and 3 BHK.</li>
              <li>Value pricing versus many Noida pockets.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4">
            <p className="text-xs font-bold uppercase text-amber-950 m-0 mb-2 flex items-center gap-1.5">
              <ThumbsDown className="size-4" aria-hidden />
              Cons
            </p>
            <ul className="text-sm text-gray-800 space-y-1 m-0 pl-4 list-disc">
              <li>Peak-hour drives toward Noida need planning.</li>
              <li>High density means society upkeep matters.</li>
              <li>Phase labels online can blur; stick to tower-level detail.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="pg2-invest" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-invest-h" icon={TrendingUp}>
          Why invest in Panchsheel Greens 2
        </SectionH2>
        <ul className="text-sm text-gray-700 space-y-2 m-0 pl-4 list-disc">
          <li>
            Location: Sector 16 Greater Noida West with road access to Noida, NH links, and Crossing Republik.
          </li>
          <li>
            Price: Sector 16 Greater Noida West value with Panchsheel Group execution, attractive for families comparing
            tickets across NCR.
          </li>
          <li>
            Rentals: steady interest from working households for well-kept 2 and 3 BHK units.
          </li>
        </ul>
      </section>

      <section id="faq-pg2" className="scroll-mt-28 mb-8">
        <SectionH2 id="faq-pg2-h" icon={CheckCircle2}>
          FAQs
        </SectionH2>
        <p className="text-sm text-gray-600 mb-4">Tap a question to expand.</p>
        <SobhaRivanaFaqAccordion items={panchsheelGreens2FaqSchemaItems} />
      </section>

      <section className="rounded-xl border border-[#CBB27A]/25 bg-gradient-to-br from-[#CBB27A]/10 to-white p-6 md:p-8 text-center" aria-label="Call to action">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-2 font-poppins">Next step</h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto mb-5 leading-relaxed">
          Brochure, floor plans, photos, pricing, and Panchsheel Greens 2 flat for sale options are on the Panchsheel
          Greens-II listing. Prefer a curated shortlist? Book a consultation or write to us through{" "}
          <Link href="/contact" className={LINK_CLASS}>
            Contact
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href={PROJECT_PAGE}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CBB27A] px-6 py-3 text-sm font-semibold text-[#0f1112] hover:bg-[#b9a56f] transition-colors"
          >
            Open Panchsheel Greens-II
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/request-a-free-consultation"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-[#CBB27A] transition-colors"
          >
            Book consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
