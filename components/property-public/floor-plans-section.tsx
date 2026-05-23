"use client";

import { useState } from "react";
import { Layers, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";

const PLACEHOLDER_CARDS = [
  { label: "Typical unit layout", hint: "Bedrooms, living & kitchen flow" },
  { label: "Tower floor plate", hint: "Core, lifts & unit positions" },
  { label: "Master plan view", hint: "Blocks, amenities & open areas" },
] as const;

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {PLACEHOLDER_CARDS.map((card) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-md"
          >
            <div
              className="aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] via-[#2d2a24] to-[#1a1a1a]"
              aria-hidden
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(203,178,122,0.15) 12px, rgba(203,178,122,0.15) 13px), repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(203,178,122,0.1) 12px, rgba(203,178,122,0.1) 13px)",
                }}
              />
              <div className="absolute inset-0 backdrop-blur-md" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 px-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg">
                <Lock className="h-4 w-4" aria-hidden />
              </div>
              <p
                className="text-sm font-semibold text-white drop-shadow"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {card.label}
              </p>
              <p className="text-xs text-white/80">{card.hint}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="h-12 min-w-[220px] rounded-xl bg-[#CBB27A] px-8 text-sm font-bold text-black shadow-lg transition hover:bg-[#d4c068]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <Layers className="mr-2 h-4 w-4" />
          View floor plans
        </Button>
      </div>
    </>
  );
}
