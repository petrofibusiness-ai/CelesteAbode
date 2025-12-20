import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationSchema, WebSiteSchema } from "@/lib/structured-data"
import { AggregateRatingSchema } from "@/lib/homepage-schema"
import { HomePageClient } from "./home-page-client"

// Server-side rendered components for SEO - content in raw HTML
const BrandIntro = dynamic(() => import("@/components/brand-intro").then(mod => ({ default: mod.BrandIntro })), { 
  ssr: true, // SSR enabled for SEO
  loading: () => <div className="min-h-[300px] md:min-h-[400px]" />
})
const WhyClientsTrustSection = dynamic(() => import("@/components/why-clients-trust-section").then(mod => ({ default: mod.WhyClientsTrustSection })), { ssr: true })
const BrandCarousel = dynamic(() => import("@/components/brand-carousel").then(mod => ({ default: mod.BrandCarousel })), { ssr: true }) // SSR enabled for trust signals
const ValuePropositions = dynamic(() => import("@/components/value-propositions").then(mod => ({ default: mod.ValuePropositions })), { ssr: true }) // SSR enabled for SEO
const WhoWeServe = dynamic(() => import("@/components/who-we-serve").then(mod => ({ default: mod.WhoWeServe })), { ssr: true })
const WhereWeWork = dynamic(
  () => import("@/components/where-we-work").then(mod => ({ default: mod.WhereWeWork })),
  { ssr: true, loading: () => <div className="min-h-[600px]" /> } // SSR enabled for local SEO
)
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })),
  { ssr: true, loading: () => <div className="min-h-[300px] md:min-h-[400px]" /> } // SSR enabled for social proof
)
const VaultTeaser = dynamic(
  () => import("@/components/vault-teaser").then(mod => ({ default: mod.VaultTeaser })),
  { ssr: true, loading: () => <div className="min-h-[300px] md:min-h-[400px]" /> } // SSR enabled for SEO
)
const CTASection = dynamic(
  () => import("@/components/cta-section").then(mod => ({ default: mod.CTASection })),
  { ssr: true } // SSR enabled for conversion content
)

export default function HomePage() {

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

          {/* The Celeste Philosophy */}
          <BrandIntro />
          
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

          {/* First Scroll Section: Why Clients Trust Celeste Abode */}
          <WhyClientsTrustSection />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* Trust Elements: Partner Logos */}
          <BrandCarousel />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* Where We Work - Regional Expertise */}
          <WhereWeWork />

          {/* Who We Serve */}
          <WhoWeServe />

          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>
          
          {/* Live, Invest, or Aspire. We make it real */}
          <HomePageClient />
          
          {/* Aesthetic Line Separator */}
          <div className="w-full flex justify-center py-8">
            <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
          </div>

          {/* The Celeste Abode Vault */}
          <VaultTeaser />
          
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
      <AggregateRatingSchema />
    </>
  )
}
