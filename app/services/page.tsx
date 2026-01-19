import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PillButton } from "@/components/ui/pill-button";
import { ServicesHeroSection } from "@/components/services-hero-section";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Target,
  Globe,
  CheckCircle,
  Heart,
  Users,
  Phone,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Real Estate Investment Advisory Services | Property Portfolio Advisory | Celeste Abode",
  description:
    "Celeste Abode offers comprehensive real estate investment advisory services, property portfolio advisory, real estate transaction consulting, end-to-end property advisory, and personalized real estate advisory across Delhi NCR.",
  keywords: [
    // Core Service Keywords
    "real estate consultant",
    "real estate advisory",
    "real estate consulting services",
    "real estate consulting firm",
    "property consultant",
    "advisory real estate",

    // Service-Specific Keywords
    "real estate investment advisory services",
    "real estate transaction consulting",
    "end to end property advisory",
    "personalized real estate advisory",
    "strategic property investment planning",
    "residential real estate advisory NCR",

    // Additional Services
    "luxury property advisory",
    "NRI property services",
    "property portfolio advisory services",
  ],
  openGraph: {
    title: "Real Estate Investment Advisory Services | Property Portfolio Advisory | Celeste Abode",
    description:
      "Celeste Abode offers comprehensive real estate investment advisory services, property portfolio advisory, real estate transaction consulting, and end-to-end property advisory across Delhi NCR.",
    url: "https://www.celesteabode.com/services",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/premium-apartment-interior-living-room.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Real Estate Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Investment Advisory Services | Property Portfolio Advisory",
    description:
      "Comprehensive real estate investment advisory services, property portfolio advisory, and real estate transaction consulting across Delhi NCR.",
    images: ["/premium-apartment-interior-living-room.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/services",
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "Luxury & Premium Residences",
      subtitle: "Bespoke homes curated for life and legacy.",
      challenge:
        "Abundance of options with little alignment to lifestyle, taste, or long-term plans.",
      approach:
        "We curate a tightly vetted portfolio of apartments, villas and legacy plots, prioritising architectural merit, privacy, neighbourhood character and quality of build. Every recommendation is grounded in lifestyle profiling and detailed project due diligence. <Link href='/properties' className='text-[#CBB27A] hover:text-[#B8A068] transition-colors'>Browse our curated properties</Link>.",
      deliverables: [
        "Shortlist tailored to your aesthetic, space needs and daily rhythm",
        "Comparative analysis on design, developer credibility and livability",
        "Private previews and coordinated site experiences",
        "Transparent documentation and clear next steps",
      ],
      value:
        "A residence that feels personally authored, not merely purchased.",
    },
    {
      title: "High-Value Real Estate Investment Advisory",
      subtitle: "Real estate as a disciplined, compounding asset.",
      challenge:
        "Uncertainty around pricing, risk and returns in a complex market.",
      approach:
        "We combine proprietary market intelligence with growth-driver analysis to identify assets with durable demand, rental strength and exit liquidity. Entry strategy, holding thesis and exit pathways are defined before commitment.",
      deliverables: [
        "Deal sourcing across primary, pre-launch and resale opportunities",
        "ROI modeling with sensitivity scenarios and benchmark comparisons",
        "Risk assessment covering legal, infra, micro-market and developer factors",
        "Portfolio construction and periodic performance reviews",
      ],
      value:
        "Capital placed with conviction, guided by data and protected by discipline.",
    },
    {
      title: "NRI & Global Client Services",
      subtitle: "Seamless cross-border acquisition with local certainty.",
      challenge:
        "Distance, documentation complexity and fragmented on-ground support.",
      approach:
        "End-to-end execution for overseas buyers: secure virtual tours, clarity on FEMA/RBI norms, verified documentation and trusted partners for banking, legal and post-purchase needs.",
      deliverables: [
        "Remote discovery and live walkthroughs with high-fidelity media",
        "Compliance guidance and document verification",
        "Escrow and payment coordination with reputable institutions",
        "Possession, registration and periodic asset check-ins",
      ],
      value: "Confidence of a local insider, delivered wherever you are.",
    },
    {
      title: "End-to-End Consulting",
      subtitle: "From first conversation to keys in hand.",
      challenge:
        "Multiple stakeholders, shifting timelines and administrative overload.",
      approach:
        "A single point of accountability manages research, negotiations, legal, financing coordination, registration and handover. Milestones, dependencies and dates are tracked transparently.",
      deliverables: [
        "Search strategy and shortlist creation",
        "Negotiation support on price, terms and inclusions",
        "Legal review coordination and bank liaison, if required",
        "Registration, snag list, handover and move-in readiness",
      ],
      value: "A precise, stress-free journey with nothing left to chance.",
    },
    {
      title: "Personalised Lifestyle Mapping",
      subtitle: "Homes chosen for the way you actually live.",
      challenge:
        "Properties that look right on paper but feel wrong in practice.",
      approach:
        "We blend AI-assisted preference modeling with in-depth conversations to map commute patterns, family needs, amenities, privacy, light, acoustics and neighbourhood culture. The output is a shortlist that matches how you live today and how you plan to live tomorrow.",
      deliverables: [
        "Lifestyle profile and priority matrix",
        "Fit-scored property shortlist with rationale",
        "Scenario mapping (schools, aging parents, work shifts, future family)",
        "Final recommendation with clear trade-off notes",
      ],
      value: "A home that fits effortlessly, day one and decade ten.",
    },
    {
      title: "Solution at Your Doorstep",
      subtitle: "Curated discovery without leaving home.",
      challenge: "Limited time and noisy, inconsistent online information.",
      approach:
        "Our platform assembles verified projects and society profiles, then ranks them against your lifestyle map. You preview options remotely; we handle the on-ground validation and scheduling.",
      deliverables: [
        "High-quality media, verified amenities and society summaries",
        "Smart recommendations based on commute, schools, community and services",
        "Side-by-side comparisons with clear pros/considerations",
        "Fast transition from virtual shortlist to private viewing",
      ],
      value: "Smarter, faster discovery that respects your time and standards.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Services", url: "https://www.celesteabode.com/services" },
        ]}
      />
    <div className="min-h-screen bg-background">
      <main className="pt-0">
        <Header />
        <ServicesHeroSection />

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Beautiful tagline */}
        <div className="py-8 flex justify-center">
          <div className="max-w-6xl text-center">
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground/80 leading-relaxed font-light italic px-4 md:px-0">
              As a trusted real estate consultant in Delhi NCR, Celeste Abode delivers
              comprehensive real estate advisory services through our proven framework.
            
              Every engagement combines property consultant expertise with data-driven insights
              for confident investment decisions.
            </p>
          </div>
        </div>

        {/* Modular Service Grid */}
        <Section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Row 1: Equalized Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-2 max-sm:bottom-50 max-sm:right-4 text-8xl font-black text-[#CBB27A]/20">
                    01
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      Personalized ROI-Driven Strategy
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-12 leading-relaxed h-20">
                      Custom investment plans aligned with your financial goals,
                      risk appetite, and timeline, built on data-driven market
                      and yield analysis. <Link href="/vault" className="text-[#CBB27A] hover:text-[#B8A068] transition-colors">Explore market insights in our Vault</Link>.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg mt-4 md:mt-0">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Investment timeline & budget optimization</li>
                        <li>• Market analysis & yield projections</li>
                        <li>• Risk assessment & mitigation strategies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 text-8xl font-black text-[#CBB27A]/20">
                    02
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      End-to-End Real Estate Transaction Consulting
                    </h2>
                    <p className="text-muted-foreground mb-12 leading-relaxed h-20">
                      Complete transaction support from initial due diligence to
                      possession, ensuring every legal and financial aspect is
                      handled with precision. <Link href="/vault" className="text-[#CBB27A] hover:text-[#B8A068] transition-colors">Learn about legal processes</Link>.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Legal documentation review</li>
                        <li>• Financial structuring & negotiations</li>
                        <li>• Possession & handover coordination</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Equalized Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 max-sm:bottom-36 max-sm:right-4 text-8xl font-black text-[#CBB27A]/20">
                    03
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      NRI Real Estate Services
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-6 leading-relaxed h-20">
                      Support for Non-Resident Indians, managing regulatory
                      requirements, currency, and remote property with seamless
                      digital processes.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• FEMA compliance & documentation</li>
                        <li>• Remote property management</li>
                        <li>• Digital diligence & virtual tours</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 text-8xl font-black text-[#CBB27A]/20">
                    04
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      Real Estate Investment Advisory
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-6 leading-relaxed h-20">
                      Strategic investment guidance with market intelligence,
                      exit strategies, and portfolio optimization for maximum
                      returns.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Market timing analysis</li>
                        <li>• Exit strategy planning</li>
                        <li>• Portfolio optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integrated Visual Banner */}
            <div className="my-16">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[500px] bg-muted">
                <Image
                  src="/premium-apartment-interior-living-room.avif"
                  alt="Every Decision Backed by Evidence. Every Outcome Designed for You."
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-12 text-center">
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <div className="block">
                      Every Decision{" "}
                      <span className="text-[#CBB27A]">Backed by Evidence</span>
                    </div>
                    <div className="block mt-2">
                      Every Outcome{" "}
                      <span className="text-[#CBB27A]">Designed For You</span>
                    </div>
                  </h3>
                </div>
              </div>
            </div>

            {/* Row 3: Equalized Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 max-sm:bottom-37 max-sm:right-4 text-8xl font-black text-[#CBB27A]/20">
                    05
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      Luxury & Signature Residences
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-6 leading-relaxed h-20">
                      Exclusive premium properties tailored to your lifestyle,
                      design preferences, and legacy goals, including off-market
                      opportunities.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Exclusive property access</li>
                        <li>• Lifestyle & design consultation</li>
                        <li>• Private preview experiences</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 text-8xl font-black text-[#CBB27A]/20">
                    06
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      Virtual Tours & Digital Consultations
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-6 leading-relaxed h-20">
                      Advanced digital experiences that bring properties to
                      life, enabling informed decisions from anywhere in the
                      world. <Link href="/properties" className="text-[#CBB27A] hover:text-[#B8A068] transition-colors">Explore virtual tours</Link>.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 360° virtual property tours</li>
                        <li>• Digital documentation review</li>
                        <li>• Remote consultation sessions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 4: Equalized Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 max-sm:bottom-37 max-sm:right-4 text-8xl font-black text-[#CBB27A]/20">
                    07
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      Location Intelligence & Real Estate Market Reports
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-12 leading-relaxed h-20">
                      In-depth location analysis with infrastructure timelines,
                      connectivity, and growth projections to align investments
                      with long-term value. <Link href="/vault" className="text-[#CBB27A] hover:text-[#B8A068] transition-colors">Access location insights</Link>.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Infrastructure development analysis</li>
                        <li>• Future growth projections</li>
                        <li>• Comparative location analysis</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#CBB27A]/20 h-full">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="absolute bottom-32 right-4 text-8xl font-black text-[#CBB27A]/20">
                    08
                  </div>
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-4 h-16 flex items-center">
                      Post-Purchase & Portfolio Support
                    </h2>
                    <p className="text-muted-foreground mb-12 md:mb-12 leading-relaxed h-20">
                      Ongoing support for property management, portfolio
                      optimization, and strategic decisions to maximize your
                      investment value.
                    </p>
                    <div className="bg-[#CBB27A]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Property management coordination</li>
                        <li>• Portfolio performance tracking</li>
                        <li>• Strategic decision support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* Sticky Right-Side CTA Banner */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
          <div className="bg-[#CBB27A] text-white p-4 rounded-lg shadow-2xl max-w-[110px]">
            <div className="flex flex-col items-center space-y-4">
              <a
                href="tel:+919818735258"
                className="flex flex-col items-center text-[#000000] hover:text-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10"
              >
                <svg
                  className="w-6 h-6 mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="text-xs font-semibold text-center">
                  Schedule a Consultation
                </span>
              </a>
              <div className="w-16 h-px bg-gray-700 rounded-full"></div>
              <a
                href="https://wa.me/919818735258"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-[#000000] hover:text-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10"
              >
                <svg
                  className="w-6 h-6 mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
                <span className="text-xs font-semibold text-center">
                  Chat on WhatsApp
                </span>
              </a>
              <div className="w-16 h-px bg-gray-700 rounded-full"></div>
              <a
                href="https://wa.me/919818735258"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-[#000000] hover:text-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10"
              >
                <svg
                  className="w-6 h-6 mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="text-xs font-semibold text-center">
                  Request a Quotation
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer CTA Section */}
        <Section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[500px] bg-muted">
              <Image
                src="/residential-plot-with-landscaping.avif"
                alt="Ready to Connect with Delhi NCR's Trusted Real Estate Consultant - Professional Property Advisory Services"
                fill
                loading="lazy"
                className="object-cover object-[center_60%] scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-center">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  Ready to Connect with Delhi NCR's{" "}
                  <span className="text-[#CBB27A]">Trusted Real Estate Consultant</span>?
                </h2>
                <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
                  Experience comprehensive real estate consulting services that deliver
                  confident property decisions with expert real estate advisory guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href="tel:+919818735258"
                    className="bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-black/90 transition-all duration-200 text-sm w-full sm:w-auto text-center shadow-lg hover:shadow-xl"
                  >
                    Schedule Consultation
                  </a>
                  <a
                    href="https://wa.me/919818735258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-black/90 transition-all duration-200 text-sm w-full sm:w-auto text-center shadow-lg hover:shadow-xl"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
    </>
  );
}
