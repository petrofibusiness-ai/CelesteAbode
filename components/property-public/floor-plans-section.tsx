"use client";

import { useState } from "react";
import { ArrowRight, Layers, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";

const PLACEHOLDER_CARDS = [
  { label: "Typical unit layout", hint: "Bedrooms, living & kitchen flow" },
  { label: "Tower floor plate", hint: "Core, lifts & unit positions" },
  { label: "Master plan view", hint: "Blocks, amenities & open areas" },
] as const;

function FloorPlanPreview({ variant }: { variant: number }) {
  const rotations = ["rotate-0", "rotate-[0.5deg]", "-rotate-[0.5deg]"] as const;
  return (
    <div
      className={`absolute inset-0 ${rotations[variant % 3]}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3efe6] via-[#e5dfd2] to-[#d8d0c0]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(138,115,64,0.12) 12px, rgba(138,115,64,0.12) 13px), repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(138,115,64,0.08) 12px, rgba(138,115,64,0.08) 13px)",
        }}
      />
      <div className="absolute inset-[10%] rounded-md border border-[#8a7340]/25 bg-white/50 shadow-inner" />
      <div className="absolute left-[16%] top-[20%] h-[40%] w-[26%] rounded-sm border border-[#CBB27A]/20 bg-white/55 shadow-sm" />
      <div className="absolute right-[14%] top-[22%] h-[36%] w-[28%] rounded-sm border border-[#CBB27A]/20 bg-white/50 shadow-sm" />
      <div className="absolute bottom-[16%] left-[12%] right-[12%] h-[24%] rounded-sm border border-[#8a7340]/15 bg-white/40" />
      <div className="absolute left-1/2 top-[48%] h-[8%] w-[6%] -translate-x-1/2 rounded-full bg-[#CBB27A]/15" />
    </div>
  );
}

export function FloorPlansSection({
  propertyName,
  propertySlug,
  floorPlanUrl,
}: {
  propertyName: string;
  propertySlug: string;
  floorPlanUrl: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <BrochureDownloadDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        propertyName={propertyName}
        propertySlug={propertySlug}
        downloadUrl={floorPlanUrl}
        purpose="floor-plans"
      />

      <div className="relative isolate overflow-hidden rounded-xl sm:rounded-2xl">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {PLACEHOLDER_CARDS.map((card, index) => (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-lg border border-gray-200/90 bg-white shadow-md sm:rounded-2xl"
            >
              <span
                className="absolute left-1.5 top-1.5 z-[2] flex h-5 w-5 items-center justify-center rounded-full bg-[#CBB27A]/90 text-[9px] font-bold text-black shadow-md sm:left-3 sm:top-3 sm:h-7 sm:w-7 sm:text-[11px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/3]">
                <FloorPlanPreview variant={index} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 hidden rounded-b-2xl bg-gradient-to-t from-[#2B3035]/85 via-[#2B3035]/50 to-transparent px-4 pb-3.5 pt-12 sm:block">
                <p
                  className="text-sm font-semibold tracking-tight text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {card.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-white/75">{card.hint}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-xl sm:rounded-2xl" aria-hidden>
          <div className="absolute inset-0 rounded-xl bg-[#1a1814]/15 backdrop-blur-[12px] backdrop-saturate-150 sm:rounded-2xl sm:backdrop-blur-[16px]" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-[#2B3035]/25 sm:rounded-2xl" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-3 py-4 sm:gap-3 sm:px-4 sm:py-8">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-[#CBB27A] shadow-lg backdrop-blur-sm sm:h-11 sm:w-11">
            <Lock className="h-3.5 w-3.5 sm:h-5 sm:w-5" strokeWidth={2.25} aria-hidden />
          </span>
          <Button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="pointer-events-auto group/btn h-9 whitespace-nowrap rounded-lg border-0 bg-[#CBB27A] px-6 text-xs font-bold text-[#1a1814] shadow-[0_8px_28px_-8px_rgba(203,178,122,0.85),0_4px_16px_rgba(0,0,0,0.2)] ring-2 ring-white/25 transition hover:bg-[#d9c67a] sm:h-12 sm:min-w-[220px] sm:rounded-xl sm:px-8 sm:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <Layers className="mr-1.5 h-3.5 w-3.5 shrink-0 sm:mr-2 sm:h-4 sm:w-4" aria-hidden />
            View floor plans
            <ArrowRight
              className="ml-1.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover/btn:translate-x-0.5 sm:ml-2 sm:h-4 sm:w-4"
              aria-hidden
            />
          </Button>
        </div>
      </div>
    </>
  );
}
