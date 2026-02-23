import Image from "next/image";
import Link from "next/link";
import { TreePine } from "lucide-react";

const IN_ARTICLE_IMG =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/forest-walk-villa_hero.avif";

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
              1. Why Forest Walk Villa is one of Ghaziabad&apos;s most talked-about launches
            </a>
          </li>
          <li>
            <a href="#project-overview" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              2. Project overview: 52 acres, 97 villas, RERA-approved
            </a>
          </li>
          <li>
            <a href="#location-connectivity" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              3. Location and connectivity: NH-24, metro, Delhi
            </a>
          </li>
          <li>
            <a href="#amenities-lifestyle" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              4. Amenities and lifestyle: forest trails, clubhouse, smart homes
            </a>
          </li>
          <li>
            <a href="#pricing-rera" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              5. Pricing, payment plans, and why RERA matters
            </a>
          </li>
          <li>
            <a href="#who-its-for" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              6. Who should consider Forest Walk Villa—and how it compares to NCR
            </a>
          </li>
          <li>
            <a href="#next-steps" className="hover:text-[#CBB27A] transition-colors block py-0.5">
              7. Next steps: see the project and get expert advice
            </a>
          </li>
        </ol>
      </nav>

      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12 border-l-4 border-[#CBB27A] pl-6">
        Forest Walk Villa in Ghaziabad is not just another villa project—it&apos;s a 52-acre, RERA-approved township that blends luxury living with forest-inspired design. With 4 BHK villas starting around ₹2.85 crore, 6 km from Shaheed Sthal metro and 15 km from Delhi, it has become one of the most searched luxury villa projects on NH-24. If you&apos;re weighing Ghaziabad against Noida or Greater Noida, or simply want the full picture before you visit, here&apos;s everything you need to know: project details, location advantages, amenities, pricing, and how to decide if Forest Walk Villa is right for you.
      </p>

      {/* In-article image: project showcase */}
      <div className="my-12 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={IN_ARTICLE_IMG}
            alt="Forest Walk Villa Ghaziabad - luxury villa township with forest trails and modern amenities"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={IN_ARTICLE_IMG.includes("r2.dev")}
          />
        </div>
        <p className="p-4 text-sm text-gray-500 bg-gray-50 text-center">
          Forest Walk Villa, Dasna (NH-24), Ghaziabad. Eco-inspired township by Madhusudhan Group / SRSD Buildcon.
        </p>
      </div>

      <section id="why-forest-walk" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          1. Why Forest Walk Villa is one of Ghaziabad&apos;s most talked-about launches
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Ghaziabad&apos;s NH-24 corridor has seen a wave of residential and township projects, but few combine scale, greenery, and RERA-backed delivery the way Forest Walk Villa does. Spread across 52 acres in Dasna, the project offers 97 duplex villas in 4 BHK configurations (roughly 163–215 sq. yards), with Italian marble, modular kitchens, lift-ready homes, and private terrace gardens. What sets it apart is the emphasis on nature: hidden forest trails, water bodies, cycling and jogging paths, and an overall eco-inspired master plan that appeals to buyers looking for a premium address without the chaos of central NCR.
          </p>
          <p>
            For serious buyers comparing <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">villas in Ghaziabad</Link>, Forest Walk Villa often comes up because of its clear RERA registration (UPRERAPRJ658961/08/2025), developer visibility (Madhusudhan Group / SRSD Buildcon Venture LLP), and a price point that sits in the luxury segment but still under many comparable options in Noida or Gurugram. If you&apos;re exploring the broader NCR market, our guides to <Link href="/blog/is-noida-safe-to-buy-property-2026" className="text-[#CBB27A] font-semibold hover:underline">Noida property in 2026</Link> and <Link href="/blog/noida-vs-greater-noida-investment-2026" className="text-[#CBB27A] font-semibold hover:underline">Noida vs Greater Noida</Link> can help you weigh location and value.
          </p>
        </div>
      </section>

      <section id="project-overview" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          2. Project overview: 52 acres, 97 villas, RERA-approved
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa is developed by SRSD Buildcon Venture LLP (part of the Madhusudhan Group). The project is registered with UP RERA (Registration No. UPRERAPRJ658961/08/2025), with a proposed completion timeline aligned to regulatory filings. Phase 1 alone spans nearly 10 acres with 99 demarcated plots and significant green space, giving buyers a clear picture of density and open area.
          </p>
          <p>
            Villa typologies include luxury garden villas (Type A, ~210–300 m²), courtyard villas (Type B, ~171–223 m²), and compact forest villas (Type C, ~136–180 m²). All units are designed as duplexes with modern finishes: Italian marble and wooden flooring, built-in wardrobes, fully modular kitchens, VRV air conditioning, centralized RO water, and earthquake-resistant RCC construction. Lift provision and private terrace gardens add to the premium positioning. For a direct look at floor plans, pricing, and availability, visit the dedicated <Link href="/properties-in-ghaziabad/forest-walk-villa" className="text-[#CBB27A] font-semibold hover:underline">Forest Walk Villa property page</Link> on Celeste Abode.
          </p>
          <ul className="mt-6 space-y-3 pl-6 border-l-2 border-[#CBB27A]/30">
            <li>52-acre township, 97 duplex 4 BHK villas</li>
            <li>RERA-registered: UPRERAPRJ658961/08/2025</li>
            <li>Developer: SRSD Buildcon Venture LLP / Madhusudhan Group</li>
            <li>Italian marble, modular kitchens, lift-ready, private terraces</li>
            <li>VRV AC, centralized RO, earthquake-resistant RCC, fire suppression</li>
          </ul>
        </div>
      </section>

      <section id="location-connectivity" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          3. Location and connectivity: NH-24, metro, Delhi
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            The project is in Dasna, Ghaziabad, off NH-24 and close to the Eastern Peripheral Expressway. That puts it roughly 15 km from Delhi via elevated road, 6 km from Shaheed Sthal metro station, and about 8 km from Hindon Airport. Upcoming infrastructure—including the BCCI cricket stadium (around 1.5 km) and proximity to schools like DPS and GD Goenka, and Yashoda Hospital (6 km)—makes it a practical choice for families and professionals who want connectivity without living in the core of Noida or Delhi.
          </p>
          <p>
            When you compare <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">properties in Noida</Link> or <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-semibold hover:underline">Greater Noida</Link>, Ghaziabad&apos;s NH-24 belt often offers a different value equation: relatively lower entry prices for villas and a faster drive to East Delhi and parts of NCR. If airport connectivity matters for the long term, our <Link href="/blog/jewar-airport-ncr-property-buyers-2026" className="text-[#CBB27A] font-semibold hover:underline">Jewar airport and NCR property guide</Link> explains how different corridors are positioned.
          </p>
          <ul className="mt-6 space-y-3 pl-6 border-l-2 border-[#CBB27A]/30">
            <li>~6 km from Shaheed Sthal metro</li>
            <li>~15 km from Delhi (elevated road)</li>
            <li>~1.5 km from upcoming BCCI cricket stadium</li>
            <li>~8 km from Hindon Airport; ~6 km from Yashoda Hospital</li>
            <li>DPS, GD Goenka schools in the vicinity</li>
          </ul>
        </div>
      </section>

      <section id="amenities-lifestyle" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          4. Amenities and lifestyle: forest trails, clubhouse, smart homes
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa is positioned as an eco-inspired community. Beyond the villas themselves, the township offers hidden forest trails and green walkways, water bodies and cascading features, a mountain hiking trail, cycling and jogging paths, and sculptural art nodes. There is a clubhouse, commercial spaces, ample parking, and 1.8 m wide pathways with street lighting. Underground sewerage with centralized STP and water conservation systems round out the infrastructure.
          </p>
          <p>
            Inside the homes, you get VRV air conditioning, centralized RO water, lift provision, and private terrace gardens—features that align with what buyers expect in this price band. If you&apos;re comparing township living across NCR, our <Link href="/blog/yamuna-expressway-growth-corridor-delhi-ncr" className="text-[#CBB27A] font-semibold hover:underline">Yamuna Expressway growth corridor article</Link> and <Link href="/properties" className="text-[#CBB27A] font-semibold hover:underline">curated properties</Link> list include other RERA-backed projects you can evaluate side by side.
          </p>
        </div>
      </section>

      <section id="pricing-rera" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          5. Pricing, payment plans, and why RERA matters
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa is in the luxury segment, with starting prices around ₹2.85 crore and a 20:80 payment plan that eases cash flow for buyers. Exact pricing varies by unit type and size (163–215+ sq. yards); for current rates and availability, check the <Link href="/properties-in-ghaziabad/forest-walk-villa" className="text-[#CBB27A] font-semibold hover:underline">Forest Walk Villa listing</Link> or reach out for a structured quote.
          </p>
          <p>
            RERA registration (UPRERAPRJ658961/08/2025) means the project is listed on the UP RERA portal, with disclosed timelines and escrow-linked disbursements. Always verify status on the official RERA website and factor in stamp duty, registration, and GST when budgeting. Our <Link href="/real-estate-insights" className="text-[#CBB27A] font-semibold hover:underline">Vault</Link> explains RERA and other real estate concepts in plain language so you can invest with confidence.
          </p>
        </div>
      </section>

      <section id="who-its-for" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          6. Who should consider Forest Walk Villa—and how it compares to NCR
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forest Walk Villa suits buyers who want a large-format villa in a township setting with strong connectivity to Delhi and Ghaziabad, without paying Noida or Gurugram core premiums. It is a fit for end-users (families, professionals) and long-term investors who are comfortable with the NH-24/Ghaziabad story and the developer&apos;s delivery track record.
          </p>
          <p>
            If you are torn between Ghaziabad and Noida or Greater Noida, the trade-off is often: Ghaziabad offers villa inventory at a certain price band and quicker access to East Delhi; Noida and Greater Noida offer more metro integration and a larger pipeline of projects. We help clients compare locations and projects with clear criteria—see our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">real estate consulting services</Link> and <Link href="/advisory-philosophy" className="text-[#CBB27A] font-semibold hover:underline">advisory philosophy</Link>, and browse all <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">properties in Ghaziabad</Link> for a full picture.
          </p>
        </div>
      </section>

      <section id="next-steps" className="scroll-mt-24 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
          7. Next steps: see the project and get expert advice
        </h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            If Forest Walk Villa is on your shortlist, the next steps are straightforward: view the official <Link href="/properties-in-ghaziabad/forest-walk-villa" className="text-[#CBB27A] font-semibold hover:underline">Forest Walk Villa page</Link> for images, configurations, and pricing; verify RERA status on the UP RERA portal; and, if you want an independent view, <Link href="/contact" className="text-[#CBB27A] font-semibold hover:underline">contact Celeste Abode</Link> for a confidential discussion. We help buyers and investors evaluate Ghaziabad and NCR projects with clear criteria—no hard sell, just clarity.
          </p>
        </div>
      </section>

      {/* Key takeaway */}
      <div className="my-16 p-8 rounded-2xl bg-gradient-to-br from-[#0f1112] to-[#1a1d1f] text-white">
        <div className="flex items-center gap-3 mb-4">
          <TreePine className="w-6 h-6 text-[#CBB27A] shrink-0" />
          <h3 className="text-lg font-bold font-poppins">Key takeaway</h3>
        </div>
        <p className="text-white/90 leading-relaxed font-poppins mb-4">
          Forest Walk Villa in Ghaziabad is a RERA-approved, 52-acre villa township with 4 BHK duplexes from around ₹2.85 Cr, strong connectivity (6 km from metro, 15 km from Delhi), and an eco-inspired lifestyle. It is a serious option for buyers who want luxury villa living on NH-24 without Noida/Gurugram core pricing. Verify RERA status, compare with other <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">Ghaziabad properties</Link>, and get independent advice before you commit.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/properties-in-ghaziabad/forest-walk-villa"
            className="inline-flex items-center gap-2 text-[#CBB27A] font-semibold hover:underline"
          >
            View Forest Walk Villa
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[#CBB27A] font-semibold hover:underline"
          >
            Contact us for advice
          </Link>
        </div>
      </div>

      {/* Closing CTA */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        At Celeste Abode, we help buyers and investors navigate Ghaziabad and the wider NCR market. For <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-semibold hover:underline">all properties in Ghaziabad</Link>, including Forest Walk Villa, or a structured discussion about your budget and goals, <Link href="/contact" className="text-[#CBB27A] font-semibold hover:underline">contact us</Link> for a confidential consultation.
      </p>
    </div>
  );
}
