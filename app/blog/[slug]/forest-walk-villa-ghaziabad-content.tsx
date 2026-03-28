import Image from "next/image";
import Link from "next/link";
import { TreePine } from "lucide-react";

const HERO_IMG =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/forest-walk-villa_hero.avif";
const WALK_IMG_1 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/images/forest-walk-villa_1.avif";
const WALK_IMG_2 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/images/forest-walk-villa_2.avif";
const WALK_IMG_8 =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/images/forest-walk-villa_8.avif";

export function ForestWalkVillaGhaziabadContent() {
  return (
    <div className="blog-article font-poppins">
      <nav
        className="mb-14 p-6 rounded-2xl bg-gray-50/80 border border-gray-100"
        aria-label="Article contents"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-[#CBB27A]">
          In this article
        </h2>
        <ol className="space-y-3 text-sm text-gray-700">
          <li>
            <a href="#why-forest-walk" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              1. Why Forest Walk Villa is getting buyer attention in 2026
            </a>
          </li>
          <li>
            <a href="#project-overview" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              2. Project snapshot: scale, RERA, and villa formats
            </a>
          </li>
          <li>
            <a href="#location-connectivity" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              3. Location check: NH-24, metro reach, and daily commute
            </a>
          </li>
          <li>
            <a href="#amenities-lifestyle" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              4. Forest Walk Villa amenities, lifestyle, and build quality
            </a>
          </li>
          <li>
            <a href="#pricing-rera" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              5. Pricing view, payment flow, and due diligence
            </a>
          </li>
          <li>
            <a href="#who-its-for" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              6. Who should buy Forest Walk Villa in Ghaziabad
            </a>
          </li>
          <li>
            <a href="#next-steps" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              7. Next steps to buy Forest Walk Villa safely
            </a>
          </li>
        </ol>
      </nav>

      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12 border-l-4 border-[#CBB27A] pl-6">
        If you are looking for a premium villa in Ghaziabad, Forest Walk Villa is likely already on your shortlist. It
        combines township scale, green planning, and a villa format that many NCR buyers now prefer over dense towers.
        This guide gives you a clean, practical view before you visit.
      </p>

      <div className="my-12 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={HERO_IMG}
            alt="Forest Walk Villa Ghaziabad premium villa township with landscaped roads and luxury low-density living"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={HERO_IMG.includes("r2.dev")}
          />
        </div>
      </div>

      <section id="why-forest-walk" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          1. Why Forest Walk Villa is getting buyer attention in 2026
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            In buyer calls, one pattern is clear. Many families want more space, private floors, and lower density than
            standard apartments. Forest Walk Villa answers that need with a villa-first layout in the NH-24 belt. It is
            one reason this project keeps coming up in premium Ghaziabad discussions.
          </p>
          <p>
            It also gets attention because the project has a clear RERA trail and a known developer setup. For buyers
            comparing <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">villas in Ghaziabad</Link>{" "}
            against Noida or Greater Noida, this location can offer a different value equation with better villa options.
          </p>
        </div>
      </section>

      <section id="project-overview" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          2. Project snapshot: scale, RERA, and villa formats
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa is developed by SRSD Buildcon Venture LLP under the Madhusudhan Group umbrella. The
            project is registered on UP RERA as <strong>UPRERAPRJ658961</strong>, which gives buyers a formal
            regulatory reference before they commit.
          </p>
          <p>
            The township is planned at large scale and includes premium duplex villa formats. The broader promise is
            simple. Better usable area, stronger privacy, and a community setup with lifestyle amenities. For live
            availability and current configuration details, check{" "}
            <Link href="/properties-in-ghaziabad/forest-walk-villa" className="text-[#CBB27A] font-semibold hover:underline">
              Forest Walk Villa in Ghaziabad
            </Link>
            .
          </p>
          <ul className="mt-6 space-y-3 pl-6 border-l-2 border-[#CBB27A]/30">
            <li>About 52 acres of planned township area</li>
            <li>UP RERA registered: UPRERAPRJ658961</li>
            <li>Around 97 duplex villas in the current project communication</li>
            <li>Premium duplex formats built for end-use families</li>
            <li>Lifestyle positioning with premium interiors and private outdoor zones</li>
            <li>Infrastructure stack designed for long-term residential use</li>
          </ul>
        </div>
      </section>

      <section id="location-connectivity" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          3. Location check: NH-24, metro reach, and daily commute
        </h2>
        <div className="my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={WALK_IMG_1}
              alt="Forest Walk Villa premium township roads and villa frontage near NH-24 Ghaziabad"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              unoptimized={WALK_IMG_1.includes("r2.dev")}
            />
          </div>
        </div>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            The project sits in Dasna, close to NH-24. For many buyers, this matters more than brochure language because
            daily drive quality decides long-term comfort. Metro reach, Delhi access, and social infrastructure are the
            first checks we recommend during site visits.
          </p>
          <p>
            Compared with many tower-heavy pockets in NCR, this belt can give stronger villa value at similar budgets.
            If you are also evaluating nearby markets, compare this with{" "}
            <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">
              property in Noida
            </Link>{" "}
            and{" "}
            <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">
              property in Greater Noida
            </Link>
            .
          </p>
          <ul className="mt-6 space-y-3 pl-6 border-l-2 border-[#CBB27A]/30">
            <li>About 6 km from Shaheed Sthal metro (as per current market references)</li>
            <li>About 15 km from Delhi access points via NH-24 route</li>
            <li>Improving social infra around schools, hospitals, and retail</li>
            <li>Suitable for families who need NCR access without core-city density</li>
          </ul>
        </div>
      </section>

      <section id="amenities-lifestyle" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          4. Forest Walk Villa amenities, lifestyle, and build quality
        </h2>
        <div className="my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={WALK_IMG_2}
              alt="Forest Walk Villa premium clubhouse lifestyle zone and landscaped open spaces in Ghaziabad"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              unoptimized={WALK_IMG_2.includes("r2.dev")}
            />
          </div>
        </div>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa is positioned as a premium nature-led community. The lifestyle pitch includes landscaped
            movement corridors, open greens, clubhouse-driven social spaces, and a calmer low-density rhythm compared to
            crowded apartment clusters.
          </p>
          <p>
            Inside the villas, the focus is on premium finishes and practical liveability. Buyers who want larger homes
            with private zones often prefer this format over high-rise apartments in the same budget band.
          </p>
        </div>
      </section>

      <section id="pricing-rera" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          5. Pricing view, payment flow, and due diligence
        </h2>
        <div className="my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={WALK_IMG_8}
              alt="Forest Walk Villa premium low-density villa cluster and landscaped community in Ghaziabad"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              unoptimized={WALK_IMG_8.includes("r2.dev")}
            />
          </div>
        </div>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa sits in the premium villa segment, with launch communication around the upper-mid to luxury
            budget range. Market conversations often start near <strong>₹2.85 crore</strong>, but exact pricing depends
            on unit size, phase, and payment structure, so always read the live cost sheet before booking.
          </p>
          <p>
            RERA verification remains non-negotiable. Confirm registration details, stage timelines, and payment-linked
            obligations before signing. For live project availability and current pricing flow, see{" "}
            <Link href="/properties-in-ghaziabad/forest-walk-villa" className="text-[#CBB27A] font-semibold hover:underline">
              Forest Walk Villa in Ghaziabad
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="who-its-for" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          6. Who should buy Forest Walk Villa in Ghaziabad
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            This project suits families who want villa living, clearer privacy, and lower density than tower projects.
            It also suits buyers who want Ghaziabad connectivity without paying core Noida or Gurugram pricing.
          </p>
          <p>
            If you are split between Ghaziabad and other NCR corridors, compare use-case first, then location. You can
            review more{" "}
            <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">
              properties in Ghaziabad
            </Link>{" "}
            and map them against your commute and budget.
          </p>
        </div>
      </section>

      <section id="next-steps" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          7. Next steps to buy Forest Walk Villa safely
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            If Forest Walk Villa is on your shortlist, move in this order. Review the live project details, verify RERA,
            and then schedule a structured consultation before site booking. If you want a clear plan, book a{" "}
            <Link href="/request-a-free-consultation" className="text-[#CBB27A] font-semibold hover:underline">
              free consultation
            </Link>{" "}
            with Celeste Abode.
          </p>
        </div>
      </section>

      {/* Key takeaway */}
      <div className="my-16 p-8 rounded-2xl bg-gradient-to-br from-[#0f1112] to-[#1a1d1f] text-white">
        <div className="flex items-center gap-3 mb-4">
          <TreePine className="w-6 h-6 text-[#CBB27A] shrink-0" />
          <h3 className="text-lg font-bold font-poppins text-white">Key takeaway</h3>
        </div>
        <p className="text-white/90 leading-relaxed font-poppins mb-4">
          Forest Walk Villa is a strong premium villa option for NCR buyers who want more space and lower density in the
          NH-24 belt. The best decision comes from clear checks on pricing, legal status, and location fit. Compare
          calmly, then move.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/properties-in-ghaziabad/forest-walk-villa"
            className="inline-flex items-center gap-2 text-[#CBB27A] font-semibold hover:underline"
          >
            View Forest Walk Villa
          </Link>
        </div>
      </div>

      <section
        className="mt-14 rounded-2xl bg-gradient-to-br from-[#CBB27A]/12 via-background to-background border border-[#CBB27A]/25 p-8 md:p-10 text-center"
        aria-label="Call to action"
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-poppins">
          Planning to buy at Forest Walk Villa?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base leading-relaxed">
          Share your budget and move timeline. We will help you compare this project with suitable NCR options and give
          you clear next steps.
        </p>
        <Link
          href="/request-a-free-consultation"
          className="inline-flex items-center justify-center rounded-lg bg-[#CBB27A] text-[#0f1112] font-semibold px-8 py-3.5 text-sm md:text-base hover:bg-[#b9a56f] transition-colors"
        >
          Book a free consultation
        </Link>
      </section>
    </div>
  );
}
