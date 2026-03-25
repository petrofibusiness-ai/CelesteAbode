"use client";

import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { homepageH1, homepageHeroSubtext } from "@/app/metadata";

export function HeroSection() {
  return (
    <section
      className="relative bg-background pt-0 md:pt-24 md:min-h-screen md:flex md:items-center md:justify-center"
      data-site-hero
    >
      <div className="w-full md:max-w-7xl md:mx-auto md:px-6 md:w-full">
        <div
          className={
            "relative overflow-hidden w-full min-h-screen md:min-h-0 md:h-[580px] lg:h-[620px] md:rounded-2xl lg:rounded-3xl md:shadow-2xl md:bg-white"
          }
        >
          <div className="absolute inset-0 w-full h-full md:hidden">
            <Image
              src="/propertyhero.avif"
              alt="Real estate consultant in Delhi NCR guiding property decisions - Noida, Greater Noida, and Yamuna Expressway"
              fill
              priority
              fetchPriority="high"
              className="w-full h-full object-cover object-center"
              sizes="100vw"
              quality={60}
              loading="eager"
            />
          </div>

          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
          >
            <source
              src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/HEROVIDEO%20(1).mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(0,0,0,0.25),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center px-4 py-10 md:items-end md:justify-start md:pb-10 md:pl-8 md:pt-0 lg:pb-20 lg:pl-10 md:px-0">
            <div className="relative text-center text-[#FAFAF8] max-w-2xl mx-auto md:text-left md:mx-0 md:max-w-3xl">
              <div className="text-[10px] sm:text-xs mb-3 md:mb-2 font-medium tracking-[0.2em] uppercase text-[#CBB27A] md:tracking-wide">
                From Masterpieces of Time To Masterpieces of Living
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold mb-3 leading-tight text-white tracking-tight md:text-3xl md:mb-3 lg:text-4xl xl:text-5xl">
                {homepageH1}
              </h1>

              <p className="text-sm sm:text-base text-white/90 mb-6 max-w-lg mx-auto font-poppins leading-relaxed md:mx-0 md:mb-4 md:max-w-xl">
                {homepageHeroSubtext}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center md:justify-start md:flex-row">
                <PillButton
                  variant="primary"
                  size="sm"
                  className="text-xs md:text-sm px-5 py-2.5 bg-white text-[#2B3035] hover:bg-white/90 rounded-full min-w-[220px] whitespace-nowrap text-center m-0"
                  asChild
                >
                  <a href="/properties" className="m-0">
                    Explore Properties
                  </a>
                </PillButton>
                <PillButton
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm px-5 py-2.5 border-2 border-white text-white hover:bg-white/20 rounded-full min-w-[220px] whitespace-nowrap text-center m-0"
                  asChild
                >
                  <a href="/request-a-free-consultation" className="m-0">
                    Book a Free Consultation
                  </a>
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
