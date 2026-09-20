"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { Award, BadgePercent, Building2, IndianRupee, MapPin } from "lucide-react";
import { GODREJ_DMIC_DEVELOPER, GODREJ_DMIC_HERO_IMAGE } from "@/lib/godrej-dmic-assets";

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

export function GodrejDmicHero() {
  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-[#12161c]"
      aria-labelledby="godrej-dmic-h1"
      data-site-hero
      data-hero-no-section-pad
    >
      <div className="absolute inset-0">
        <Image
          src={GODREJ_DMIC_HERO_IMAGE}
          alt="Godrej DMIC Greater Noida premium residential apartments within Global Business City, DMIC Integrated Township, Greater Noida, by Godrej Properties"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12161c]/75 via-[#12161c]/25 to-[#12161c]/35" />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-10 pt-[calc(var(--site-header-total,6rem)+0.75rem)] sm:px-6 sm:pb-12 sm:pt-[calc(7rem+var(--site-banner-h,0px))] md:px-10 lg:px-14">
          <div className="pointer-events-auto max-w-5xl text-left">
            <p
              className={`${heroPropertyDisplay.className} text-sm font-semibold uppercase tracking-[0.28em] text-[#CBB27A] sm:text-base`}
            >
              Pre-launch · EOI registration ongoing
            </p>
            <h1
              id="godrej-dmic-h1"
              className={`${heroPropertyDisplay.className} mt-2 text-[1.65rem] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-4xl sm:tracking-[0.12em] md:text-5xl lg:text-6xl`}
            >
              Godrej DMIC
              <br />
              Greater Noida
            </h1>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <p
                className="text-sm font-semibold text-white/95 drop-shadow sm:text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Global Business City · 1, 2 &amp; 3 BHK · Pre Launch
              </p>
            </div>
          </div>

          <div className="pointer-events-auto mt-auto flex w-full justify-start pt-10 sm:pt-12">
            <div className="grid w-full max-w-[min(100%,20rem)] grid-cols-2 gap-2 sm:max-w-2xl sm:grid-cols-4 sm:gap-3">
              <SpecPill label="From" icon={<IndianRupee className="h-4 w-4" aria-hidden />}>
                ₹1.35 Cr*
              </SpecPill>
              <SpecPill label="EOI" icon={<BadgePercent className="h-4 w-4" aria-hidden />}>
                ₹2-5 Lakh*
              </SpecPill>
              <SpecPill label="Configuration" icon={<Building2 className="h-4 w-4" aria-hidden />}>
                1 / 2 / 3 BHK
              </SpecPill>
              <SpecPill label="Developer" icon={<Award className="h-4 w-4" aria-hidden />}>
                {GODREJ_DMIC_DEVELOPER}
              </SpecPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
