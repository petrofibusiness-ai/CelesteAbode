"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PillButton } from "@/components/ui/pill-button";
import { Button } from "@/components/ui/button";
import { ImageFigure } from "@/components/ui/image-figure";
import { PhilosophyHeroSection } from "@/components/philosophy-hero-section";
import { motion } from "framer-motion";
import { Scale, Heart, Star, Rocket, Building2, Eye } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/structured-data";
import Image from "next/image";
import Link from "next/link";

export default function PhilosophyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Philosophy", url: "https://www.celesteabode.com/advisory-philosophy" },
        ]}
      />
    <div className="min-h-screen bg-background">
      <main className="pt-0">
        <Header />
        <PhilosophyHeroSection />

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Our Ethos - Sticky Trust Manifesto */}
        <Section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-12 gap-8 md:gap-16">
              {/* Left Column - Content (60%) */}
              <div className="lg:col-span-7">
                <div className="text-center mb-12">
                  <h2 className="heading-bold text-primary mb-6">
                    Our <span className="text-[#CBB27A]">Ethos</span>
                  </h2>
                </div>

                {/* Mobile Image - Only visible on mobile */}
                <div className="lg:hidden mb-12">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl w-full h-[300px] bg-muted">
                    <Image
                      src="/TRUSTTRANIMAGE.avif"
                      alt="Our Ethos - Trust, Transparency, Transformation"
                      fill
                      className="object-cover scale-110"
                      sizes="(max-width: 1024px) 100vw, 0vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>

                <div className="space-y-16 md:space-y-32 lg:space-y-40">
                  {/* Pillar 1: Trust */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl font-bold ring-2 ring-[#CBB27A] ring-offset-2">
                        01
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                        Trust
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        Built on authentic guidance and RERA-aligned due diligence, ensuring every property decision is legally verified, compliant, and secure.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2: Transparency */}
                  <motion.div
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ margin: "-200px 0px -200px 0px" }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl font-bold ring-2 ring-[#CBB27A] ring-offset-2">
                        02
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                        Transparency
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        We replace guesswork with facts by presenting clear ROI metrics, absorption data, and risk assessments—so every investment is backed by complete, verifiable information.
                      </p>
                    </div>
                  </motion.div>

                  {/* Pillar 3: Transformation */}
                  <motion.div
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ margin: "-200px 0px -200px 0px" }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl font-bold ring-2 ring-[#CBB27A] ring-offset-2">
                        03
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                        Transformation
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        We translate personal goals into practical outcomes by combining AI-driven market analysis with human advisory insight—enabling confident, data-backed property decisions.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Sticky Image (40%) - Hidden on mobile */}
              <div className="hidden lg:block lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl w-full h-[400px] bg-muted">
                    <Image
                      src="/TRUSTTRANIMAGE.avif"
                      alt="Our Ethos - Trust, Transparency, Transformation"
                      fill
                      className="object-cover scale-110"
                      sizes="(min-width: 1024px) 40vw, 0vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Beautiful tagline */}
        <div className="py-6 md:py-8 flex justify-center px-4 sm:px-6">
          <div className="max-w-4xl text-center">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground/80 leading-relaxed sm:leading-relaxed font-light italic px-2 sm:px-0">
              We combine advanced property intelligence with seasoned real estate advisory expertise to help clients secure high-value homes and long-term investment outcomes across Delhi NCR.
            </p>
          </div>
        </div>

        {/* Strategic Differentiation - Anti-Brokerage Stance */}
        <Section className="pt-16 md:pt-20 pb-11 md:pb-14">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-bold text-primary mb-6">
                Beyond Transactions - Toward{" "}
                <span className="text-[#CBB27A]">Trust</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Card - The Noise */}
              <div className="bg-white/50 rounded-xl border border-muted-foreground/20 p-8">
                <h3 className="text-2xl font-bold text-muted-foreground mb-4 italic">
                  Push Sales
                </h3>
                <p className="text-lg text-muted-foreground/70 leading-relaxed italic">
                  Buyers often face confusion from endless listings, pressure to
                  decide quickly, and information overload—with little clarity
                  on what truly fits their goals or risk profile.
                </p>
              </div>

              {/* Right Card - The Purpose */}
              <div className="bg-white rounded-xl border-2 border-[#CBB27A]/20 shadow-lg p-8">
                <div className="w-16 h-1 bg-[#CBB27A] rounded-full mb-4 mx-auto"></div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Promise
                </h3>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  <strong>Celeste Abode starts with your goals.</strong> We provide decision support through selective curation—only options that pass our data validation make it to you. No noise, no pressure; just evidence-based recommendations that fit your timeline and risk appetite.
                </p>
                <div className="bg-[#CBB27A]/10 p-6 rounded-lg">
                  <p className="text-lg text-foreground leading-relaxed">
                    Our advisors act as <strong>strategic partners</strong>, curating a shortlist of properties validated by real market data—so every option is grounded in financial reality, not assumptions.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="flex justify-center mt-16">
              <div className="max-w-4xl text-center">
                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed font-light italic">
                  Each recommendation is supported by real market indicators such as absorption trends, yield ranges, and exit liquidity visibility—ensuring decisions are grounded in financial reality, not assumptions.
                </p>
              </div>
            </div>

            {/* Minimal CTA - philosophy-led tone */}
            <div className="flex justify-center mt-10">
              <Link
                href="/real-estate-consulting-services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#CBB27A]/40 text-foreground hover:bg-[#CBB27A]/10 hover:border-[#CBB27A]/60 transition-colors text-sm font-medium"
              >
                Explore Our Advisory Approach
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Section>

        {/* Celeste Abode Standards */}
        <Section className="py-16 md:py-20 bg-[#d1cbb3]/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-16">
              <h2 className="heading-bold text-primary mb-4 text-center">
                The Celeste Abode{" "}
                <span className="text-[#CBB27A]">Standard</span>
              </h2>
              <p className="text-xl text-muted-foreground text-center">
                Our Non-Negotiables in Real Estate Advisory
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Standard 1 - Animation from left */}
              <motion.div
                initial={{ opacity: 0, x: -80, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.1,
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 },
                }}
                viewport={{ margin: "-50px 0px -50px 0px", once: true }}
              >
                <Card className="border-2 border-foreground/10 shadow-2xl shadow-black/20 h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-3xl hover:shadow-[#CBB27A]/20 hover:border-[#CBB27A]/30 cursor-pointer group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold ring-2 ring-[#CBB27A] ring-offset-2 transition-all duration-300 group-hover:scale-110 group-hover:ring-[#CBB27A]/60">
                          01
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-[#CBB27A]">
                          Diligence Over Deals
                        </h3>
                        <div className="w-12 h-0.5 bg-[#CBB27A] mb-4 transition-all duration-300 group-hover:w-16 group-hover:bg-[#CBB27A]/80"></div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed flex-grow transition-colors duration-300 group-hover:text-foreground/90">
                      We lead with evidence. Our real estate advisory approach is rooted in verified market data, legal diligence, and long-term feasibility—never sales targets.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Standard 2 - Animation from bottom */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2,
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 },
                }}
                viewport={{ margin: "-50px 0px -50px 0px", once: true }}
              >
                <Card className="border-2 border-foreground/10 shadow-2xl shadow-black/20 h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-3xl hover:shadow-[#CBB27A]/20 hover:border-[#CBB27A]/30 cursor-pointer group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold ring-2 ring-[#CBB27A] ring-offset-2 transition-all duration-300 group-hover:scale-110 group-hover:ring-[#CBB27A]/60">
                          02
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-[#CBB27A]">
                          Connect To Customer
                        </h3>
                        <div className="w-12 h-0.5 bg-[#CBB27A] mb-4 transition-all duration-300 group-hover:w-16 group-hover:bg-[#CBB27A]/80"></div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed flex-grow transition-colors duration-300 group-hover:text-foreground/90">
                      Every interaction is built on respect for your goals and context. We focus on understanding the purpose behind each property decision—whether for end-use or investment.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Standard 3 - Animation from right */}
              <motion.div
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3,
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 },
                }}
                viewport={{ margin: "-50px 0px -50px 0px", once: true }}
              >
                <Card className="border-2 border-foreground/10 shadow-2xl shadow-black/20 h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-3xl hover:shadow-[#CBB27A]/20 hover:border-[#CBB27A]/30 cursor-pointer group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold ring-2 ring-[#CBB27A] ring-offset-2 transition-all duration-300 group-hover:scale-110 group-hover:ring-[#CBB27A]/60">
                          03
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-[#CBB27A]">
                          Technology with Purpose
                        </h3>
                        <div className="w-12 h-0.5 bg-[#CBB27A] mb-4 transition-all duration-300 group-hover:w-16 group-hover:bg-[#CBB27A]/80"></div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed flex-grow transition-colors duration-300 group-hover:text-foreground/90">
                      Technology supports our process—not replaces judgment. Data tools enhance efficiency, while experienced advisors ensure every recommendation is context-driven and practical.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Mission Statement */}
            <div className="mt-16 w-full flex justify-center">
              <div className="bg-[#CBB27A]/10 border-2 border-[#CBB27A]/30 rounded-xl p-8 text-center max-w-4xl">
                <p className="text-2xl text-foreground leading-relaxed">
                  <strong>
                    Celeste Abode exists to bring clarity and peace of mind to real estate decisions—so you feel confident at every stage, from evaluation to execution.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Evidence Before Emotion */}
        <Section className="pt-0">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              {/* Heading */}
              <div className="text-center">
                <h2 className="heading-bold text-primary mb-3">
                  The Peace of a Decision Made{" "}
                  <span className="text-[#CBB27A]">Right</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  When clarity replaces confusion in real estate decisions
                </p>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[500px] md:h-[700px] bg-muted">
                <Image
                  src="/philosophy image2.avif"
                  alt="The Morning Light, The View, The Peace You Seek - Philosophy image representing the emotional reward of the perfect property"
                  fill
                  className="object-cover object-[center_75%]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  quality={90}
                />
                <div className="absolute bottom-0 right-0 p-4 md:p-8 text-right max-w-xl ml-auto">
                  <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2">
                    The morning light. The view. The quiet confidence of knowing you chose right.
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90">
                    That&apos;s the value we focus on—where careful evaluation meets personal aspiration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Gold Line */}
        <div className="flex justify-center py-4">
          <div className="w-24 h-1 bg-[#CBB27A] rounded-full"></div>
        </div>

        {/* Final Conversion - Global & Local Reach */}
        <Section className="py-6 md:py-8">
          <div className="bg-gradient-to-br from-primary/10 to-[#CBB27A]/20 rounded-xl shadow-lg w-full max-w-4xl mx-auto p-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-primary mb-3">
                Ready to Make a{" "}
                <span className="text-[#CBB27A]">Confident Property Decision</span>?
              </h2>
              <p className="text-base text-foreground mb-4 leading-relaxed">
                Whether you&apos;re an NRI investing remotely or a family upgrading within Delhi NCR, our advisory team ensures the same standards of diligence, compliance, and clarity. From virtual walkthroughs to digital due diligence, we make informed property decisions seamless—without pressure or guesswork.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 text-base rounded-full w-full sm:w-auto m-0 shrink-0"
                  onClick={() => (window.location.href = "/advisory-session")}
                >
                  Request Advisory Session
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 text-base rounded-full w-full sm:w-auto m-0 shrink-0"
                  onClick={() => (window.location.href = "tel:+919818735258")}
                >
                  Talk to Our Expert Now
                </Button>
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
