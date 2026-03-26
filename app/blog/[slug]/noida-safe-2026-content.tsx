import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const NOIDA_VISUAL_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/noida_vs_greater_noida.png";
const NOIDA_VISUAL_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/jacob-and-co/jacob-and-co_hero.webp";
const NOIDA_VISUAL_3 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/eternia-residences/eternia-residences_hero.avif";

export function NoidaSafe2026Content() {
  return (
    <div className="blog-article font-poppins">
      {/* Table of contents */}
      <nav
        className="mb-14 p-6 rounded-2xl bg-gray-50/80 border border-gray-100"
        aria-label="Article contents"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-[#CBB27A]">
          In this article
        </h2>
        <ol className="space-y-3 text-sm text-gray-700">
          <li>
            <a href="#why-the-question-matters" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              1. Is investing in Noida property safe in 2026
            </a>
          </li>
          <li>
            <a href="#market-reality" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              2. Noida property market reality: demand, prices, and sentiment
            </a>
          </li>
          <li>
            <a href="#infrastructure-safety" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              3. Noida infrastructure and legal safety checks
            </a>
          </li>
          <li>
            <a href="#where-to-buy-safely" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              4. Best Noida micro-markets for safer property buying
            </a>
          </li>
          <li>
            <a href="#practical-steps" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              5. Property buying checklist before investing in Noida
            </a>
          </li>
        </ol>
      </nav>

      {/* Lead */}
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12 border-l-4 border-[#CBB27A] pl-6">
        Is investing in property in Noida a smart choice in 2026? In most cases, yes. But only if your location, project,
        and paperwork checks are right. This guide keeps things simple and practical for NCR buyers.
      </p>

      {/* Section 1 */}
      <section id="why-the-question-matters" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          1. Is investing in Noida property safe in 2026
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            The word safe has two parts in real estate. Legal safety and market safety. Legal safety means documents,
            title flow, and RERA status are clean. Market safety means people actually want to live or rent there, so
            demand stays real.
          </p>
          <p>
            In 2026, serious buyers ask better questions. Which sectors are liquid? Which builders have delivery records?
            Which projects are RERA-registered and easy to exit later? That approach is what keeps your decision strong.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section id="market-reality" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          2. Noida property market reality: demand, prices, and sentiment
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Noida continues to see active demand in 2026, especially in sectors with stronger connectivity and better
            social infrastructure. Most buyer action remains in practical end-user formats, especially 2 and 3 BHK
            homes. This is a healthy signal because demand is usage-led, not only speculative.
          </p>
          <p>
            The key is not only Noida vs non-Noida. It is sector quality within Noida. If you want broader comparison,
            review{" "}
            <Link href="/blog/noida-vs-greater-noida-investment-2026" className="text-[#CBB27A] font-semibold hover:underline">
              Noida vs Greater Noida
            </Link>{" "}
            and then compare with live{" "}
            <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
              flats for sale in Noida
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NOIDA_VISUAL_1}
            alt="Noida and Greater Noida skyline comparison for 2026 property investment"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={NOIDA_VISUAL_1.includes("r2.dev")}
          />
        </div>
      </div>

      {/* Section 3 */}
      <section id="infrastructure-safety" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          3. Noida infrastructure and legal safety checks
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Infrastructure drives both comfort and resale. Metro access, expressway links, and office catchments matter
            more than brochure promises. Sectors with better access usually see stronger rental pull and better liquidity.
          </p>
          <p>
            On the legal side, use one non-negotiable filter. UP RERA registration. Verify project status, possession
            disclosures, and payment structure before booking. This one step reduces risk sharply for most buyers.
          </p>
          <ul className="mt-6 space-y-3 pl-6 border-l-2 border-[#CBB27A]/30">
            <li>Use only RERA-registered projects and verify details before token payment</li>
            <li>Prefer sectors with metro or expressway strength for resale and rental safety</li>
            <li>Check builder handover record for the last few delivered projects</li>
            <li>Plan all-in budget, not just BSP: taxes, registration, and maintenance matter</li>
          </ul>
        </div>
      </section>

      <div className="my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NOIDA_VISUAL_2}
            alt="Premium branded residential tower visual for Noida region demand context"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={NOIDA_VISUAL_2.includes("r2.dev")}
          />
        </div>
      </div>

      {/* Section 4 */}
      <section id="where-to-buy-safely" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          4. Best Noida micro-markets for safer property buying
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            The safest decisions usually come from stronger micro-markets, not random discount-led launches. Established
            Noida sectors with transport depth and active end-user demand are usually easier to hold and exit.
          </p>
          <p>
            If you are comparing options across corridors, start with{" "}
            <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
              property in Noida
            </Link>{" "}
            first, then match it with{" "}
            <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
              property in Greater Noida
            </Link>{" "}
            for value checks. For buyers who prefer guided filtering, Celeste Abode works as a real estate company in
            Noida with consultant-led shortlisting.
          </p>
        </div>
      </section>

      <div className="my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={NOIDA_VISUAL_3}
            alt="Premium residential project visual from Greater Noida for corridor comparison"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={NOIDA_VISUAL_3.includes("r2.dev")}
          />
        </div>
      </div>

      {/* Section 5 */}
      <section id="practical-steps" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          5. Property buying checklist before investing in Noida
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Before you invest, run a short checklist. Confirm RERA details. Visit the site at real commute hours. Read
            the agreement and payment milestones. Check maintenance assumptions. Keep all written communication on record.
          </p>
          <p>
            If you are searching for the best real estate company in Noida, focus on consultant quality, not sales pitch.
            Celeste Abode supports project evaluation, RERA checks, and shortlist planning through our{" "}
            <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">
              real estate consulting services
            </Link>
            . You can also book a{" "}
            <Link href="/request-a-free-consultation" className="text-[#CBB27A] font-semibold hover:underline">
              free consultation
            </Link>{" "}
            for your budget range.
          </p>
        </div>
      </section>

      {/* Key takeaway */}
      <div className="my-16 p-8 rounded-2xl bg-gradient-to-br from-[#0f1112] to-[#1a1d1f] text-white">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-[#CBB27A] shrink-0" />
          <h3 className="text-lg font-bold font-poppins text-white">Key takeaway</h3>
        </div>
        <p className="text-white/90 leading-relaxed font-poppins">
          Property in Noida can be a smart choice in 2026 when you combine legal checks with location logic. Pick
          RERA-registered projects, verify documents, and shortlist by real demand corridors. That is how safe buying is
          done in NCR.
        </p>
      </div>

      {/* Closing with CTA */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        If you are evaluating property in Noida and want a clear, no-pressure shortlist, start with{" "}
        <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
          Noida properties
        </Link>{" "}
        and then{" "}
        <Link href="/request-a-free-consultation" className="text-[#CBB27A] font-semibold hover:underline">
          book a free consultation
        </Link>
        .
      </p>
    </div>
  );
}
