"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { Award, BadgePercent, Building2, IndianRupee, MapPin } from "lucide-react";
import {
  ACE_PARKWAY_2_0_HERO_IMAGE,
  ACE_SECTOR_150_PROJECT_NAME,
} from "@/lib/ace-parkway-2-0-assets";

const heroPropertyDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

function SpecPill({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-white/20 bg-black/35 px-3 py-2.5 shadow-lg backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-3">
      <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#CBB27A]/25 text-[#CBB27A] ring-1 ring-[#CBB27A]/35 sm:h-9 sm:w-9">
        {icon}
      </div>
      <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">{label}</p>
      <div
        className="mt-0.5 text-xs font-bold leading-snug text-white sm:text-sm"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

export function AceParkway20Hero() {
  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-[#1a2420]"
      aria-labelledby="ace-parkway-2-0-h1"
      data-site-hero
      data-hero-no-section-pad
    >
      <div className="absolute inset-0">
        <Image
          src={ACE_PARKWAY_2_0_HERO_IMAGE}
          alt="Ace Sector 150 Noida, ultra-luxury towers overlooking central green and golf course"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a2420]/65 via-[#1a2420]/15 to-[#1a2420]/20" />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-10 pt-[calc(var(--site-header-total,6rem)+0.75rem)] sm:px-6 sm:pb-12 sm:pt-[calc(7rem+var(--site-banner-h,0px))] md:px-10 lg:px-14">
          <div className="pointer-events-auto max-w-4xl text-left">
            <p
              className={`${heroPropertyDisplay.className} text-sm font-semibold uppercase tracking-[0.28em] text-[#CBB27A] sm:text-base`}
            >
              Pre-launch · Sector 150
            </p>
            <h1
              id="ace-parkway-2-0-h1"
              className={`${heroPropertyDisplay.className} mt-2 text-[1.65rem] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-4xl sm:tracking-[0.12em] md:text-5xl lg:text-6xl`}
            >
              {ACE_SECTOR_150_PROJECT_NAME}
            </h1>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <p
                className="text-sm font-semibold text-white/95 drop-shadow sm:text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sector 150, Noida · 3, 4 &amp; 4.5 BHK · ultra-luxury low-density living
              </p>
            </div>
          </div>

          <div className="pointer-events-auto mt-auto flex w-full justify-start pt-10 sm:pt-12">
            <div className="grid w-full max-w-[min(100%,20rem)] grid-cols-2 gap-2 sm:max-w-2xl sm:grid-cols-4 sm:gap-3">
              <SpecPill label="Pre-launch BSP" icon={<IndianRupee className="h-4 w-4" aria-hidden />}>
                ₹16,995/sq ft*
              </SpecPill>
              <SpecPill label="Residences" icon={<BadgePercent className="h-4 w-4" aria-hidden />}>
                ~790 units*
              </SpecPill>
              <SpecPill label="Configuration" icon={<Building2 className="h-4 w-4" aria-hidden />}>
                3 / 4 / 4.5 BHK
              </SpecPill>
              <SpecPill label="Developer" icon={<Award className="h-4 w-4" aria-hidden />}>
                ACE Group
              </SpecPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
