"use client"

import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Lazy load components that use framer-motion to reduce initial bundle
// Load after initial render to prioritize LCP
const BrandIntro = dynamic(() => import("@/components/brand-intro").then(mod => ({ default: mod.BrandIntro })), { 
  ssr: true, // Keep SSR for SEO, but lazy load JS
  loading: () => <div className="min-h-[400px]" />
})
const StickyValuePillars = dynamic(() => import("@/components/sticky-value-pillars").then(mod => ({ default: mod.StickyValuePillars })), { ssr: false })
const ConversionBridge = dynamic(() => import("@/components/conversion-bridge").then(mod => ({ default: mod.ConversionBridge })), { ssr: false })
const CelesteConsultingFramework = dynamic(() => import("@/components/celeste-consulting-framework").then(mod => ({ default: mod.CelesteConsultingFramework })), { ssr: false })
const ValuePropositions = dynamic(() => import("@/components/value-propositions").then(mod => ({ default: mod.ValuePropositions })), { ssr: false })
const BrandCarousel = dynamic(() => import("@/components/brand-carousel").then(mod => ({ default: mod.BrandCarousel })), { ssr: false })
const VaultTeaser = dynamic(() => import("@/components/vault-teaser").then(mod => ({ default: mod.VaultTeaser })), { ssr: false })
import { IntentPayload } from "@/lib/analytics"
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema, BrandSchema } from "@/lib/structured-data"
import { HomepageServiceSchema, HomepageServicesListSchema, AggregateRatingSchema } from "@/lib/homepage-schema"

// Lazy load below-the-fold components to reduce initial JS bundle
const SegmentedEntry = dynamic(
  () => import("@/components/segmented-entry/SegmentedEntry").then(mod => ({ default: mod.SegmentedEntry })),
  { ssr: false, loading: () => <div className="min-h-[400px]" /> }
)

const TechnologySection = dynamic(
  () => import("@/components/technology-section").then(mod => ({ default: mod.TechnologySection })),
  { ssr: false }
)

const WhoWeServe = dynamic(
  () => import("@/components/who-we-serve").then(mod => ({ default: mod.WhoWeServe })),
  { ssr: false }
)

const WhereWeWork = dynamic(
  () => import("@/components/where-we-work").then(mod => ({ default: mod.WhereWeWork })),
  { ssr: false, loading: () => <div className="min-h-[600px]" /> }
)

const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })),
  { ssr: false, loading: () => <div className="min-h-[400px]" /> }
)

const CTASection = dynamic(
  () => import("@/components/cta-section").then(mod => ({ default: mod.CTASection })),
  { ssr: false }
)

export default function HomePage() {
  const handleIntentSubmit = (payload: IntentPayload) => {
    console.log('Intent submitted:', payload)
    // TODO: Send to backend/CRM
  }

  const handleWhatsAppClick = (payload: IntentPayload) => {
    console.log('WhatsApp clicked:', payload)
    // TODO: Open WhatsApp with pre-filled message
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero section - LCP element - highest priority */}
          <HeroSection />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Section 2: Brand Introduction */}
          <BrandIntro />
          
          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* The Mark of Expertise: Our Impact & Results */}
          <ValuePropositions />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Section 3: Sticky Scroll Value Pillars */}
          <StickyValuePillars />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Vault Teaser - Source of Foresight */}
          <VaultTeaser />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* Trusted partners, better outcomes */}
          <BrandCarousel />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* The Celeste Consulting Framework */}
          <CelesteConsultingFramework />
          
          {/* Live, Invest, or Aspire. We make it real */}
          <SegmentedEntry 
            onSubmit={handleIntentSubmit}
            onWhatsApp={handleWhatsAppClick}
            defaultMicroMarkets={["Noida Expressway", "Yamuna Expressway", "Gaur City"]}
          />
          
          {/* Who We Serve */}
          <WhoWeServe />
          
          {/* Where We Work - Regional Expertise */}
          <WhereWeWork />
          
          {/* Projects Section */}
          {/* <PropertiesSection /> */}
          
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
      <LocalBusinessSchema />
      <BrandSchema />
      <HomepageServiceSchema />
      <HomepageServicesListSchema />
      <AggregateRatingSchema />
    </>
  )
}
