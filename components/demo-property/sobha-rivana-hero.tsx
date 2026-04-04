"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Award, Building2, IndianRupee, MapPin, ShieldCheck } from "lucide-react";
import { SOBHA_RIVANA_HERO_IMAGE, SOBHA_RIVANA_RERA_FULL } from "@/lib/blog-data";
import { SobhaRivanaGallery, type DemoGallerySlide } from "./sobha-rivana-gallery";
import { SobhaRivanaDemoActions } from "./sobha-rivana-demo-actions";

export const HERO_CAROUSEL_SLIDES: DemoGallerySlide[] = [
  {
    src: SOBHA_RIVANA_HERO_IMAGE,
    alt: "Sobha Rivana — elevation, Sector 1 Greater Noida West",
    label: "Elevation",
    width: 1920,
    height: 1080,
  },
  {
    src: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-interior.avif",
    alt: "Sobha Rivana — sample apartment interior",
    label: "Interior",
    width: 1600,
    height: 1000,
  },
  {
    src: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-clubhouse.avif",
    alt: "Sobha Rivana — clubhouse",
    label: "Clubhouse",
    width: 1600,
    height: 1000,
  },
];

function SpecTile({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#CBB27A]/15 ring-1 ring-[#CBB27A]/25">
        <span className="text-[#CBB27A]">{icon}</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <div
        className="mt-1 text-sm font-bold leading-snug text-gray-900 sm:text-base"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

export function SobhaRivanaHero() {
  return (
    <section
      className="border-b border-gray-200 bg-white lg:min-h-[calc(100svh-6rem)]"
      aria-labelledby="demo-hero-h1"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 md:px-12 lg:flex-row lg:items-stretch lg:gap-8 lg:py-8">
        <div className="flex min-h-[min(48vh,400px)] flex-1 flex-col overflow-hidden rounded-2xl bg-black shadow-2xl lg:min-h-[min(520px,calc(100svh-8rem))]">
          <SobhaRivanaGallery
            slides={HERO_CAROUSEL_SLIDES}
            theme="dark"
            fillParent
            bare
            className="min-h-0 flex-1"
          />
        </div>

        <div className="flex w-full shrink-0 flex-col justify-between gap-5 lg:w-[min(100%,380px)]">
          <div className="text-left">
            <p className="text-xs text-gray-600">
              <Link href="/" className="hover:text-[#CBB27A]">
                Home
              </Link>
              <span className="mx-1.5 text-gray-300">/</span>
              <span className="text-gray-700">Sobha Rivana</span>
            </p>
            <h1
              id="demo-hero-h1"
              className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Sobha Rivana
            </h1>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <p className="text-sm font-semibold text-gray-800 sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                Sector 1, Greater Noida West · 2, 3 &amp; 4 BHK
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <SpecTile label="RERA" icon={<ShieldCheck className="h-4 w-4" aria-hidden />}>
              {SOBHA_RIVANA_RERA_FULL}
            </SpecTile>
            <SpecTile label="Configuration" icon={<Building2 className="h-4 w-4" aria-hidden />}>
              2 / 3 / 4 BHK
            </SpecTile>
            <SpecTile label="Price" icon={<IndianRupee className="h-4 w-4" aria-hidden />}>
              On request
              <span className="mt-0.5 block text-[11px] font-normal text-gray-600">
                ~₹2.25 Cr* indicative
              </span>
            </SpecTile>
            <SpecTile label="Developer" icon={<Award className="h-4 w-4" aria-hidden />}>
              Sobha Ltd.
            </SpecTile>
          </div>

          <SobhaRivanaDemoActions variant="hero" />
        </div>
      </div>
    </section>
  );
}
