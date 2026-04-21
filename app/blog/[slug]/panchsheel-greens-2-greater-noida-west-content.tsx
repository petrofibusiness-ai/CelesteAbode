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

/** Canonical listing: celesteabode.com/properties-in-greater-noida/panchsheel-greens-ii */
const PROJECT_PAGE = "/properties-in-greater-noida/panchsheel-greens-ii";

const LINK_CLASS = "text-[#CBB27A] font-semibold hover:underline underline-offset-2";

/** Replace URLs with your final assets when ready. */
export const PANCHSHEEL_GREENS_2_IMAGES = {
  leadVisual:
    "https://placehold.co/1600x900/0f1112/CBB27A?text=Panchsheel+Greens+2+hero",
  contextMap: "https://placehold.co/1600x900/111827/c9a962?text=Location+map",
  resaleOrInterior: "https://placehold.co/1600x900/0b1020/e6d7a2?text=Floor+plan",
  gallery1: "https://placehold.co/800x600/0f1112/CBB27A?text=Photo+1",
  gallery2: "https://placehold.co/800x600/1a1d1f/d4c48a?text=Photo+2",
  gallery3: "https://placehold.co/800x600/111827/c9a962?text=Photo+3",
  gallery4: "https://placehold.co/800x600/0b1020/e6d7a2?text=Photo+4",
} as const;

export const panchsheelGreens2FaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What is Panchsheel Greens phase 2?",
    answer:
      "Panchsheel Greens 2 lines up with Panchsheel Greens-II on Celeste Abode: Panchsheel Group apartments in Sector 16, Greater Noida West, with 2 BHK and 2 BHK + Study configurations, clubhouse, pools, and landscaped open spaces. Full specs sit on the Panchsheel Greens-II listing.",
  },
  {
    question: "Where is Panchsheel Greens 2 in Noida Extension?",
    answer:
      "Panchsheel Greens 2 is in Sector 16, Greater Noida West (Noida Extension), Uttar Pradesh, with strong road access toward Noida, NH corridors, and Crossing Republik. Address and map context match our Panchsheel Greens-II listing on Celeste Abode.",
  },
  {
    question: "What is the Panchsheel Greens 2 price list?",
    answer:
      "Current Panchsheel Greens 2 price list and offers sit on the Panchsheel Greens-II listing, with brochure download and callback options. Our team shares tower-wise and resale numbers once you pick configuration and timeline.",
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

function GalleryTile({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-gray-200 bg-neutral-100">
      <div className="relative aspect-[4/3] w-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:640px)50vw,25vw" unoptimized />
      </div>
      <figcaption className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-600 bg-white border-t border-gray-100">
        {label}
      </figcaption>
    </figure>
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
    ["Property type", "Apartments / flats"],
    ["Configuration", "2 BHK, 2 BHK + Study"],
    ["RERA", "UPRERAPRJ8595"],
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
        Current rates on the{" "}
        <Link href={PROJECT_PAGE} className={LINK_CLASS}>
          Panchsheel Greens-II
        </Link>{" "}
        listing or through a quick callback.
      </>,
    ],
    ["2 BHK + Study", "Same live sheet, tower and floor specific"],
    ["Resale", "Market-led by stack; share unit details and we line up comparable deals"],
    [
      "Villas / low-rise",
      <>
        This listing is apartment-led. Ask our desk for villa-style options nearby or browse{" "}
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
            Floor plans, gallery, brochure, and callbacks for this project sit on our Panchsheel Greens-II listing (the
            same campus many people call Panchsheel Greens 2).
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
          people still call Noida Extension. The same community is often searched as Panchsheel Greens phase 2 or Panchsheel
          Greens 2 Noida because daily life and work ties back to Noida. It is an approved residential campus with strong
          end-user and investor interest: sensible tickets, rental depth, and healthy resale liquidity for the belt. If you
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
            alt="Panchsheel Greens 2 Greater Noida West"
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
          Greens 2 Noida Extension all follow the Sector 16 Greater Noida West postal belt on your agreement and utility
          address. Searches for Panchsheel Greens 2 sector 16 Noida or Panchsheel Greens 2 Noida extension address point here.
        </p>
        <ul className="text-sm text-gray-700 space-y-1.5 m-0 pl-4 list-disc mb-4">
          <li>Noida and NH corridors within a short drive; FNG and Greater Noida road network in daily use.</li>
          <li>Crossing Republik and Ghaziabad retail within easy reach.</li>
          <li>Noida office and school hubs connected by road; metro is a drive-first story today with future line extension on the map.</li>
        </ul>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200">
          <Image
            src={PANCHSHEEL_GREENS_2_IMAGES.contextMap}
            alt="Panchsheel Greens 2 location"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized
          />
        </div>
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
          Panchsheel Greens 2 layout options on Celeste Abode are led by 2 BHK and 2 BHK + Study apartments. Panchsheel Greens
          2 floor plan and layout plan downloads sit on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          page, alongside the brochure. For another Greater Noida West benchmark, see{" "}
          <Link href="/blog/sobha-rivana-greater-noida-west" className={LINK_CLASS}>
            Sobha Rivana
          </Link>
          .
        </p>
        <div className="relative aspect-[16/9] max-w-2xl overflow-hidden rounded-xl border border-gray-200">
          <Image
            src={PANCHSHEEL_GREENS_2_IMAGES.resaleOrInterior}
            alt="Panchsheel Greens 2 floor plan preview"
            fill
            className="object-contain bg-neutral-50"
            sizes="(max-width:1024px)100vw,640px"
            unoptimized
          />
        </div>
      </section>

      <section id="pg2-photos" className="scroll-mt-28 mb-10">
        <SectionH2 id="pg2-photos-h" icon={Images}>
          Panchsheel Greens 2 photos
        </SectionH2>
        <p className="text-sm text-gray-600 mb-3">
          A short Panchsheel Greens 2 photos strip below. The full five-image gallery is on the{" "}
          <Link href={PROJECT_PAGE} className={LINK_CLASS}>
            Panchsheel Greens-II
          </Link>{" "}
          listing.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <GalleryTile src={PANCHSHEEL_GREENS_2_IMAGES.gallery1} alt="Panchsheel Greens 2 towers" label="Towers" />
          <GalleryTile src={PANCHSHEEL_GREENS_2_IMAGES.gallery2} alt="Panchsheel Greens 2 club" label="Club" />
          <GalleryTile src={PANCHSHEEL_GREENS_2_IMAGES.gallery3} alt="Panchsheel Greens 2 landscape" label="Landscape" />
          <GalleryTile src={PANCHSHEEL_GREENS_2_IMAGES.gallery4} alt="Panchsheel Greens 2 interior" label="Interior" />
        </div>
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
              <li>Strong resale and rental depth for 2 BHK and 2 BHK + Study.</li>
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
            Rentals: steady interest from working households for well-kept 2 BHK and 2 BHK + Study units.
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
