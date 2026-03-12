import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationSchema, WebSiteSchema, FAQPageSchema } from "@/lib/structured-data"
import { HOMEPAGE_FAQS } from "@/lib/homepage-faqs"
import { AggregateRatingSchema } from "@/lib/homepage-schema"
import { homepageMetadata } from "@/app/metadata"
import type { Metadata } from "next"

export const metadata: Metadata = homepageMetadata

// Server-side rendered components for SEO - content in raw HTML
// Optimized loading with smaller placeholders for mobile
const BrandIntro = dynamic(() => import("@/components/brand-intro").then(mod => ({ default: mod.BrandIntro })), { 
  ssr: true, // SSR enabled for SEO
  loading: () => <div className="min-h-[200px] md:min-h-[400px]" />
})
const KpiCards = dynamic(() => import("@/components/kpi-cards").then(mod => ({ default: mod.KpiCards })), { 
  ssr: true,
  loading: () => <div className="min-h-[150px] md:min-h-[200px]" />
})
const WhyClientsTrustSection = dynamic(() => import("@/components/why-clients-trust-section").then(mod => ({ default: mod.WhyClientsTrustSection })), { 
  ssr: true,
  loading: () => <div className="min-h-[200px] md:min-h-[300px]" />
})
const BrandCarousel = dynamic(() => import("@/components/brand-carousel").then(mod => ({ default: mod.BrandCarousel })), { 
  ssr: true, // SSR enabled for trust signals
  loading: () => <div className="min-h-[150px] md:min-h-[200px]" />
})
const ValuePropositions = dynamic(() => import("@/components/value-propositions").then(mod => ({ default: mod.ValuePropositions })), { 
  ssr: true, // SSR enabled for SEO
  loading: () => <div className="min-h-[200px] md:min-h-[300px]" />
})
const WhoWeServe = dynamic(() => import("@/components/who-we-serve").then(mod => ({ default: mod.WhoWeServe })), { 
  ssr: true,
  loading: () => <div className="min-h-[200px] md:min-h-[300px]" />
})
const WhereWeWork = dynamic(
  () => import("@/components/where-we-work").then(mod => ({ default: mod.WhereWeWork })),
  { ssr: true, loading: () => <div className="min-h-[400px] md:min-h-[600px]" /> } // SSR enabled for local SEO
)
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })),
  { ssr: true, loading: () => <div className="min-h-[200px] md:min-h-[400px]" /> } // SSR enabled for social proof
)
const HomepageSeoBlocks = dynamic(
  () => import("@/components/homepage-seo-blocks").then(mod => ({ default: mod.HomepageSeoBlocks })),
  { ssr: true, loading: () => <div className="min-h-[400px] md:min-h-[600px]" /> } // SSR enabled for SEO content
)
const CTASection = dynamic(
  () => import("@/components/cta-section").then(mod => ({ default: mod.CTASection })),
  { ssr: true, loading: () => <div className="min-h-[150px] md:min-h-[200px]" /> } // SSR enabled for conversion content
)

export default function HomePage() {

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero section - LCP element - highest priority */}
          <HeroSection />

          {/* The Celeste Philosophy */}
          <BrandIntro />
          
          {/* KPI Cards - Trust Indicators */}
          <KpiCards />
          
          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* Trust Elements: Key Metrics - The Mark of Expertise: Our Impact & Results */}
          <ValuePropositions />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* Where We Work - Regional Expertise */}
          <WhereWeWork />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* First Scroll Section: Why Clients Trust Celeste Abode */}
          <WhyClientsTrustSection />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Trust Elements: Partner Logos */}
          <BrandCarousel />

          {/* Who We Serve */}
          <WhoWeServe />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* SEO Content Blocks */}
          <HomepageSeoBlocks />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* What Our Clients Say */}
          <TestimonialsSection />
          
          {/* Trusted by Thousands of Families */}
          <CTASection />
        </main>
        <Footer />
      </div>
      {/* Structured data - load after page content */}
      <OrganizationSchema />
      <WebSiteSchema />
      <FAQPageSchema faqs={HOMEPAGE_FAQS} />
      <AggregateRatingSchema />
    </>
  )
}
