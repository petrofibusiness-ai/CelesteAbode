"use client";

import type { ReactNode } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { Award, BadgePercent, Building2, IndianRupee, MapPin } from "lucide-react";
import { FUSION_VASUNDHARA_HERO_IMAGE } from "@/lib/fusion-vasundhara-assets";
import { FusionVasundharaGallery, type DemoGallerySlide } from "./fusion-vasundhara-gallery";

const heroPropertyDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export { FUSION_VASUNDHARA_HERO_IMAGE } from "@/lib/fusion-vasundhara-assets";

export const HERO_CAROUSEL_SLIDES: DemoGallerySlide[] = [
  {
    src: FUSION_VASUNDHARA_HERO_IMAGE,
    alt: "Fusion Vasundhara towers and entrance at Sector 7, Vasundhara, Ghaziabad",
    label: "Fusion Vasundhara",
    width: 1920,
    height: 1080,
  },
];

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

export function FusionVasundharaHero() {
  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-black"
      aria-labelledby="fusion-vasundhara-h1"
      data-site-hero
      data-hero-no-section-pad
    >
      <div className="absolute inset-0">
        <FusionVasundharaGallery slides={HERO_CAROUSEL_SLIDES} theme="dark" bare fullscreenHero />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-10 pt-[calc(var(--site-header-total,6rem)+0.75rem)] sm:px-6 sm:pb-12 sm:pt-[calc(7rem+var(--site-banner-h,0px))] md:px-10 lg:px-14">
          <div className="pointer-events-auto max-w-4xl text-left">
            <h1
              id="fusion-vasundhara-h1"
              className={`${heroPropertyDisplay.className} text-[2rem] font-semibold uppercase leading-[1.05] tracking-[0.12em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-5xl sm:tracking-[0.16em] md:text-6xl md:tracking-[0.18em]`}
            >
              Fusion Vasundhara
            </h1>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <p
                className="text-sm font-semibold text-white/95 drop-shadow sm:text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sector 7, Vasundhara, Ghaziabad - 3, 3.5 and 4 BHK (pre-launch)
              </p>
            </div>
          </div>

          <div className="pointer-events-auto mt-auto flex w-full justify-start pt-10 sm:pt-12">
            <div className="grid w-full max-w-[min(100%,20rem)] grid-cols-2 gap-2 sm:max-w-2xl sm:grid-cols-4 sm:gap-3">
              <SpecPill label="EOI" icon={<BadgePercent className="h-4 w-4" aria-hidden />}>
                10%
              </SpecPill>
              <SpecPill label="Configuration" icon={<Building2 className="h-4 w-4" aria-hidden />}>
                3 / 3.5 / 4 BHK
              </SpecPill>
              <SpecPill label="Price" icon={<IndianRupee className="h-4 w-4" aria-hidden />}>
                On request
              </SpecPill>
              <SpecPill label="Developer" icon={<Award className="h-4 w-4" aria-hidden />}>
                Fusion Group
              </SpecPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
