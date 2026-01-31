"use client"

import { Section } from "@/components/ui/section"
import { PillButton } from "@/components/ui/pill-button"
import { Kicker } from "@/components/ui/kicker"
import Link from "next/link"
import { motion } from "framer-motion"

export function FoundingEthos() {
  return (
    <Section className="pt-24 pb-16 md:pt-28 md:pb-20">
      {/* Main Section Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="heading-bold text-primary mb-6">
          Our <span className="text-[#CBB27A]">Founding Ethos</span>
        </h1>
        <p className="lead text-muted-foreground max-w-3xl mx-auto">
          Two visionaries united by a shared passion for excellence and innovation in real estate
        </p>
      </motion.div>

      {/* The Technologist Section - Content Left, Photo Right */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-16">
        {/* Left Side - Content */}
        <motion.div 
          className="space-y-8 lg:order-1 order-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div>
            <h3 className="h3 text-primary mb-3">
              The Technologist
            </h3>
            <p className="lead text-muted-foreground mb-6">
              From global innovation to personalised living
            </p>
          </div>

          {/* Three Key Points */}
                      <div className="space-y-6">
            <div className="flex items-start space-x-5">
              <div className="w-3 h-3 bg-primary rounded-full mt-4 flex-shrink-0"></div>
              <div>
                <h4 className="h4 text-foreground mb-2">Intelligence with empathy</h4>
                <p className="body-text text-muted-foreground">
                  With two decades of experience in global corporate leadership, our technologist brings unparalleled expertise in consumer analytics and adaptive systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-5">
              <div className="w-3 h-3 bg-primary rounded-full mt-4 flex-shrink-0"></div>
              <div>
                <h4 className="h4 text-foreground mb-2">Lifestyle matching</h4>
                <p className="body-text text-muted-foreground">
                  By leveraging advanced data analytics and behavioral insights, we can identify properties that perfectly align with your lifestyle preferences and investment goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-5">
              <div className="w-3 h-3 bg-primary rounded-full mt-4 flex-shrink-0"></div>
              <div>
                <h4 className="h4 text-foreground mb-2">Technology-enabled precision</h4>
                <p className="body-text text-muted-foreground">
                  Our proprietary algorithms and market intelligence systems ensure that every recommendation is backed by comprehensive data analysis and future projections.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Photo Placeholder */}
        <motion.div 
          className="flex justify-center h-full lg:order-2 order-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-64 md:w-80 lg:w-96 h-full bg-muted rounded-2xl md:rounded-3xl flex items-center justify-center shadow-xl md:shadow-2xl">
            <span className="text-7xl font-semibold text-muted-foreground">T</span>
          </div>
        </motion.div>
      </div>

      {/* The Sales Virtuoso Section - Photo Left, Content Right */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-16">
        {/* Left Side - Photo Placeholder */}
        <motion.div 
          className="flex justify-center h-full lg:order-1 order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-64 md:w-80 lg:w-96 h-full bg-muted rounded-2xl md:rounded-3xl flex items-center justify-center shadow-xl md:shadow-2xl">
            <span className="text-7xl font-semibold text-muted-foreground">S</span>
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div 
          className="space-y-10 lg:order-2 order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <h3 className="h3 text-primary mb-3">
              The Sales Virtuoso
            </h3>
            <p className="lead text-muted-foreground mb-6">
              Curating lifestyles, not just homes
            </p>
          </div>

          {/* Three Key Points */}
                      <div className="space-y-6">
            <div className="flex items-start space-x-5">
              <div className="w-3 h-3 bg-primary rounded-full mt-4 flex-shrink-0"></div>
              <div>
                <h4 className="h4 text-foreground mb-2">Market intuition</h4>
                <p className="body-text text-muted-foreground">
                  With a decade of experience in India's luxury real estate market, our sales virtuoso has developed an intuitive understanding of market dynamics and developer credibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-5">
              <div className="w-3 h-3 bg-primary rounded-full mt-4 flex-shrink-0"></div>
              <div>
                <h4 className="h4 text-foreground mb-2">Lifestyle curation</h4>
                <p className="body-text text-muted-foreground">
                  We don't just sell properties; we curate lifestyles. Our deep understanding of luxury living standards enables us to match you with properties that enhance your quality of life.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-primary rounded-full mt-4 flex-shrink-0"></div>
              <div>
                <h4 className="h4 text-foreground mb-2">Future-ready advisory</h4>
                <p className="body-text text-muted-foreground">
                  Our forward-thinking approach considers future trends, infrastructure development, and community growth to ensure your investment is positioned for long-term appreciation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>



      {/* CTA Row */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <PillButton
          variant="primary"
          size="md"
          asChild
        >
          <Link href="/contact" aria-label="Book a consultation">
            Book a Consultation
          </Link>
        </PillButton>

        <PillButton
          variant="outline"
          size="md"
          asChild
        >
          <Link href="/real-estate-consulting-services" aria-label="View our services">
            View Services
          </Link>
        </PillButton>
      </motion.div>
    </Section>
  )
}
