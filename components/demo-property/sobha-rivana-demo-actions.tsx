"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";

type Variant = "hero" | "inline";

export function SobhaRivanaDemoActions({ variant = "inline" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);

  if (variant === "hero") {
    return (
      <>
        <BrochureDownloadDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          propertyName="Sobha Rivana"
          propertySlug="sobha-rivana"
        />
        <div className="w-full min-w-0 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/80 p-4 shadow-md ring-1 ring-black/[0.04] sm:p-5">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CBB27A]/15 text-[#CBB27A] ring-1 ring-[#CBB27A]/25">
              <FileText className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                Brochure &amp; details
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                Get the brochure and a clear read on pricing, formats, and next steps — we handle the
                builder coordination so you get answers without the runaround.
              </p>
              <div className="mt-3 flex w-full min-w-0 flex-col gap-2">
                <Button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="h-auto min-h-10 w-full whitespace-normal rounded-xl bg-black px-4 py-2.5 text-center text-sm font-bold text-white shadow-md hover:bg-gray-900"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Download className="h-4 w-4 shrink-0" aria-hidden />
                    Download brochure
                  </span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-10 w-full whitespace-normal rounded-xl border-2 border-gray-900 bg-transparent py-2.5 font-bold text-gray-900 hover:bg-gray-50"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Link
                    href="/request-a-free-consultation"
                    className="inline-flex items-center justify-center gap-2 px-4"
                  >
                    Contact Celeste Abode
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BrochureDownloadDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        propertyName="Sobha Rivana"
        propertySlug="sobha-rivana"
      />
      <div className="rounded-2xl border border-[#CBB27A]/30 bg-gradient-to-r from-[#CBB27A]/10 via-white to-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#8a7340]">Sobha Rivana</p>
            <h3
              className="mt-1 text-xl font-bold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Brochure &amp; payment overview
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600">
              Full project PDF plus how we help you read payment structure and milestones alongside your
              loan and cash-flow plan.
            </p>
          </div>
          <div className="flex w-full min-w-0 shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              type="button"
              onClick={() => setOpen(true)}
              size="lg"
              className="w-full rounded-xl bg-black font-bold text-white hover:bg-gray-900 sm:w-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden />
              Download
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-xl border-2 border-gray-900 font-bold text-gray-900 hover:bg-gray-50 sm:w-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Link href="/request-a-free-consultation" className="inline-flex items-center">
                Free consultation
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
