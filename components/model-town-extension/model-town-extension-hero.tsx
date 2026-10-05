"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Award, Building2, IndianRupee, MapPin, Ruler } from "lucide-react";
import {
  MODEL_TOWN_EXTENSION_DEVELOPER,
  MODEL_TOWN_EXTENSION_HERO_ALT,
  MODEL_TOWN_EXTENSION_HERO_IMAGE,
} from "@/lib/model-town-extension-assets";

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

export function ModelTownExtensionHero() {
  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-[#141816]"
      aria-labelledby="model-town-extension-h1"
      data-site-hero
      data-hero-no-section-pad
    >
      <div className="absolute inset-0">
        <Image
          src={MODEL_TOWN_EXTENSION_HERO_IMAGE}
          alt={MODEL_TOWN_EXTENSION_HERO_ALT}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141816]/75 via-[#141816]/25 to-[#141816]/35" />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-10 pt-[calc(var(--site-header-total,6rem)+0.75rem)] sm:px-6 sm:pb-12 sm:pt-[calc(7rem+var(--site-banner-h,0px))] md:px-10 lg:px-14">
          <div className="pointer-events-auto max-w-5xl text-left">
            <p
              className="font-hero-display text-sm font-semibold uppercase tracking-[0.28em] text-[#CBB27A] sm:text-base"
            >
              GDA sanctioned · Registry in 90 days
            </p>
            <h1
              id="model-town-extension-h1"
              className="font-hero-display mt-2 whitespace-nowrap text-[clamp(1.05rem,4.8vw,3.75rem)] font-semibold uppercase leading-[1.05] tracking-[0.06em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:tracking-[0.1em]"
            >
              Model Town Extension
            </h1>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <p
                className="text-sm font-semibold text-white/95 drop-shadow sm:text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Near Choudhary More, GT Road · GDA Plots
              </p>
            </div>
          </div>

          <div className="pointer-events-auto mt-auto flex w-full justify-start pt-10 sm:pt-12">
            <div className="grid w-full max-w-[min(100%,20rem)] grid-cols-2 gap-2 sm:max-w-2xl sm:grid-cols-4 sm:gap-3">
              <SpecPill label="From" icon={<IndianRupee className="h-4 w-4" aria-hidden />}>
                ₹1.36 Cr*
              </SpecPill>
              <SpecPill label="Rate" icon={<Ruler className="h-4 w-4" aria-hidden />}>
                ₹1.25 Lakh/sq yd*
              </SpecPill>
              <SpecPill label="Plot size" icon={<Building2 className="h-4 w-4" aria-hidden />}>
                109-360 sq yd
              </SpecPill>
              <SpecPill label="Developer" icon={<Award className="h-4 w-4" aria-hidden />}>
                {MODEL_TOWN_EXTENSION_DEVELOPER}
              </SpecPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
