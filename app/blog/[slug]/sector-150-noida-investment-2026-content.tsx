import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { BlogInstagramEmbed } from "@/components/blog-instagram-embed";
import { SobhaRivanaFaqAccordion } from "./sobha-rivana-faq-accordion";

const CONSULT = "/request-a-free-consultation";
const ADVISORY = "/real-estate-consulting-services";
const PROPERTIES_NOIDA = "/properties-in-noida";
const FLATS_NOIDA = "/flats-for-sale-in-noida";
const ACE_SECTOR_150 = "/properties-in-noida/ace-sector-150-noida";

/** Sector 150 reel from @celesteabode */
export const SECTOR_150_INSTAGRAM_REEL =
  "https://www.instagram.com/reel/DbVlskhzG8m/?utm_source=ig_embed&utm_campaign=loading";

const SECTOR_150_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/sector-150-noida-best-investment-destination-2026-blog-2%2Csector-150-noida-best-investment-desti%5B...%5D/sector-150-noida-best-investment-destination-2026-blog-2.webp";

const EXPRESSWAY_VISUAL =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/sector-150-noida-best-investment-destination-2026-blog-2%2Csector-150-noida-best-investment-desti%5B...%5D/sector-150-noida-best-investment-destination-2026-blog-3%20(1).webp";

const COMPARE_ROWS: { factor: string; sector150: string; otherNoida: string }[] = [
  {
    factor: "Density and planning",
    sector150: "Low FAR, green buffers, golf-course adjacency in parts of the belt",
    otherNoida: "Mixed; many sectors built for higher tower counts",
  },
  {
    factor: "Typical buyer",
    sector150: "Premium end-user and long-hold investor",
    otherNoida: "Mid to premium mix depending on sector",
  },
  {
    factor: "Ticket band (working 2026)",
    sector150: "Often ₹12,000 to ₹15,000+ per sq ft before floor and extras",
    otherNoida: "Wide spread; Sectors 75, 78, 137 sit on different curves",
  },
  {
    factor: "Resale story",
    sector150: "Strong when society delivers and expressway commute holds",
    otherNoida: "Sector-specific; liquidity varies block by block",
  },
];

export const sector150NoidaInvestmentFaqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "Why is Sector 150 Noida popular for property investment in 2026?",
    answer:
      "Sector 150 combines low-density planning, Noida Expressway access, and premium end-user demand. Buyers are not just chasing a rate card. They are buying into a belt where open space and builder quality matter at resale. That profile fits a longer hold better than a quick flip in a crowded mid-rise grid.",
  },
  {
    question: "What is the price range for property in Sector 150 Noida?",
    answer:
      "Working bands in 2026 often sit around ₹12,000 to ₹15,000 per sq ft and above for serious premium stacks, before floor rise, PLC, and parking. Exact tickets move with tower, facing, and possession stage. Always lock the all-in number on the unit you are offered, not a sector average from a portal.",
  },
  {
    question: "Is Sector 150 better than Sector 137 or Sector 75 for flats in Noida?",
    answer:
      "Different jobs. Sector 150 suits buyers who want space, premium specs, and can hold through build cycles. Sector 137 balances connectivity and ticket size. Sectors 75 and 78 work for mid-segment end users. The best sector is the one that matches your commute, budget, and exit timeline.",
  },
  {
    question: "What should I check before I buy flat in Sector 150 Noida?",
    answer:
      "UP RERA on the official portal, builder delivery on completed phases, all-in cost on your stack, and a peak-hour drive on the Noida Expressway. Compare at least three projects in the belt. Pre-launch names can look attractive; paperwork and possession path still decide whether the ticket holds.",
  },
  {
    question: "Can Celeste Abode help with property in Sector 150 Noida?",
    answer:
      "Yes. We work buyer-side across Noida and Delhi NCR, including Sector 150. That means shortlists with reasons, all-in cost clarity, and site visits on projects that pass your checklist. We compare Sector 150 stacks against other Noida belts when your budget could work in more than one place.",
  },
];

const CTA_SIZER_LABELS = ["Properties in Noida", "Book a free consultation"] as const;

const CTA_SIZER =
  "invisible col-start-1 row-start-1 block h-0 max-h-0 overflow-hidden whitespace-nowrap px-5 py-2.5 text-sm font-medium font-poppins";

export function Sector150NoidaCtaPair({
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

export function Sector150NoidaInvestment2026Content() {
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
            <a href="#why-150" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Why Sector 150 stands apart in Noida
            </a>
          </li>
          <li>
            <a href="#three-reasons" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Three reasons buyers pick Sector 150 in 2026
            </a>
          </li>
          <li>
            <a href="#compare-table" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              Sector 150 vs other Noida belts
            </a>
          </li>
          <li>
            <a href="#before-buy" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              What to verify before you book
            </a>
          </li>
          <li>
            <a href="#who-helps" className="block py-0.5 transition-colors hover:text-[#CBB27A]">
              How Celeste Abode helps
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
          Sector 150 is not a generic Noida pin. It was planned as a low-density, green-forward belt along the Noida
          Expressway, and that shows up in both ticket size and buyer profile. If you are weighing{" "}
          <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
            property in Sector 150 Noida
          </Link>{" "}
          against Sectors 137, 75, or the Yamuna side, the question is not which brochure looks tallest. It is whether
          you want premium space with a longer hold, and whether the project file can survive that hold.
        </p>
        <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#CBB27A] bg-amber-50/60 px-5 py-4 text-[15px] leading-relaxed text-gray-800 md:text-base">
          Investment here works when the sector story and the project story both hold up: planning, possession path,
          and a commute you can repeat every Monday.
        </blockquote>
      </header>

      <BlogInstagramEmbed url={SECTOR_150_INSTAGRAM_REEL} />

      <section id="why-150" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Why Sector 150 stands apart in Noida
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Most Noida sectors compete on connectivity and ticket size. Sector 150 adds a third variable: how much air
            and green buffer you get around the tower. That pulls end users who would otherwise stretch into Gurugram or
            pay up on the Expressway elsewhere. It also pulls investors who believe premium families will keep buying
            into a belt with limited high-rise clutter. New pre-launch stacks are part of that story.{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150 Noida
            </Link>{" "}
            is one example: a 15-acre, low-density layout with roughly 790 homes across 11 towers, aimed at buyers who
            want space without leaving the expressway side of Noida.
          </p>
          <p>
            Prices have moved. Our buyer work across Noida often places Sector 150 in a premium band well above many
            mid-segment grids. That is not a reason to rush. It is a reason to compare all-in tickets carefully and ask
            what happens if possession slips six months.
          </p>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={SECTOR_150_VISUAL}
            alt="Sector 150 Noida: premium residential towers, wide roads, and green buffers in a planned belt"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Sector 150 trades on space and planning, not just tower height.
        </figcaption>
      </figure>

      <section id="three-reasons" className="scroll-mt-24 mb-14">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Three reasons buyers pick Sector 150 in 2026
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          These show up in almost every serious Sector 150 enquiry we take. They are simple, but they change how a
          ticket behaves at resale.
        </p>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">1. Low-density master plan</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Sector 150 was drawn with wider setbacks and golf-course adjacency in parts of the belt. Buyers notice the
            difference on site visits: fewer towers fighting for the same view plane. That matters when your neighbour
            at resale is another family, not another launch blocking light.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">2. Noida Expressway and corridor access</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Expressway access keeps Sector 150 in the conversation for buyers who work across NCR. Projects on the
            corridor, including{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150 Noida
            </Link>
            , lean on Noida-Greater Noida Expressway connectivity and golf-course adjacency in the same pitch. Jewar
            Airport and Yamuna corridor growth add a longer macro layer, but your daily win is still drive time at 8
            a.m. Run that test before you treat corridor headlines as your commute plan.
          </p>
        </article>

        <article className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">3. Premium product depth</h3>
          <p className="text-[15px] leading-[1.75] text-gray-700">
            Large 3 and 4 BHK formats, club programming, and branded specs show up here more than in older Noida grids.
            Active names include{" "}
            <Link href={ACE_SECTOR_150} className="font-medium text-[#CBB27A] hover:underline">
              Ace Sector 150 Noida
            </Link>
            . Compare builder delivery and RERA timelines across two or three projects before you fixate on one lobby
            render.
          </p>
        </article>
      </section>

      <section id="compare-table" className="scroll-mt-24 mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Sector 150 vs other Noida belts
        </h2>
        <p className="mb-6 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          Use this table when someone tells you Sector 150 is &quot;always best&quot; or &quot;overpriced.&quot; Both
          can be true depending on your brief.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0f1112] text-white">
                <th className="px-4 py-3 font-medium">Factor</th>
                <th className="px-4 py-3 font-medium">Sector 150</th>
                <th className="px-4 py-3 font-medium">Typical other Noida sectors</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.factor}
                  className={i % 2 === 1 ? "border-t border-gray-100 bg-gray-50/80" : "border-t border-gray-100"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.factor}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.sector150}</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-700">{row.otherNoida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={EXPRESSWAY_VISUAL}
            alt="Sector 150 Noida: elevated expressway, residential towers, and green buffers at dusk"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
            unoptimized
          />
        </div>
        <figcaption className="border-t border-gray-100 bg-white/90 px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
          Expressway access keeps Sector 150 in play for cross-NCR buyers. Commute proof still wins.
        </figcaption>
      </figure>

      <section id="before-buy" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          What to verify before you buy in Sector 150
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 150 rewards buyers who do boring checks. UP RERA on the official portal. Builder track record on
            delivered phases. All-in ticket on the exact unit, including floor rise and parking. A second visit at peak
            hour on the Expressway. If two of those fail, pause even when the sector story sounds perfect.
          </p>
          <p>
            Start with live options. Browse{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats for sale in Noida
            </Link>{" "}
            and filter mentally for Sector 150 stacks, or compare{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              flats in Noida
            </Link>{" "}
            in Sector 137 if your ticket needs a mid-segment exit. Tell us your budget on a{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              free consultation
            </Link>{" "}
            if you want to{" "}
            <Link href={FLATS_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              buy flat in Noida
            </Link>{" "}
            with Sector 150 on the list but not the only name on it.
          </p>
        </div>
      </section>

      <section id="who-helps" className="scroll-mt-24 mb-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          How Celeste Abode helps you buy in Sector 150
        </h2>
        <div className="space-y-5 text-[15px] leading-[1.75] text-gray-700 md:text-base">
          <p>
            Sector 150 is not a single-tower decision. Celeste Abode works buyer-side as a real estate consultant in
            Noida and across Delhi NCR. We compare Sector 150 projects on your brief, spell out the all-in ticket, and
            flag delivery or paperwork gaps before you token. You keep the final call; we remove the guesswork from
            which site visits are worth your Saturday.
          </p>
          <p>
            That usually means a short discovery call, a written shortlist with why each name is on it, and visits only
            where the stack still makes sense after basic checks. See our{" "}
            <Link href={ADVISORY} className="font-medium text-[#CBB27A] hover:underline">
              real estate consulting services
            </Link>{" "}
            for deliverables, or{" "}
            <Link href={CONSULT} className="font-medium text-[#CBB27A] hover:underline">
              book a free consultation
            </Link>{" "}
            if Sector 150 is already on your list and you want it stress-tested against other{" "}
            <Link href={PROPERTIES_NOIDA} className="font-medium text-[#CBB27A] hover:underline">
              property in Noida
            </Link>{" "}
            belts before you pay a booking amount.
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
                Compare Sector 150 stacks, then book a call for site visits worth your calendar.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-4 py-4 sm:px-5">
            <Sector150NoidaCtaPair direction="column" hero />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">Questions buyers ask us</h2>
        <SobhaRivanaFaqAccordion items={sector150NoidaInvestmentFaqSchemaItems} />
      </section>
    </div>
  );
}
