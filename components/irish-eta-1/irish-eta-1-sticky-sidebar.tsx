"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Download, FileText, Loader2 } from "lucide-react";
import { IRISH_ETA_1_PROJECT_NAME, IRISH_ETA_1_SLUG } from "@/lib/irish-eta-1-assets";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";
import { Button } from "@/components/ui/button";
import { isValidName, isValidPhone, sanitizeInput } from "@/lib/security";

const PROPERTY_NAME = IRISH_ETA_1_PROJECT_NAME;
const PROPERTY_SLUG = IRISH_ETA_1_SLUG;

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14027.5!2d77.52!3d28.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce7a0c0c0c0c1%3A0x0!2sSector%20ETA%20I%2C%20Greater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1778250504313!5m2!1sen!2sin";

export function IrishEta1MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg md:rounded-3xl ${className}`}
    >
      <iframe
        src={MAPS_EMBED_SRC}
        title={`${IRISH_ETA_1_PROJECT_NAME} on Google Maps`}
        className="h-[min(420px,70vw)] w-full border-0 sm:h-[450px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function IrishEta1StickySidebar({
  idPrefix = "irish",
  part = "all",
}: {
  idPrefix?: string;
  part?: "all" | "brochure" | "callback";
}) {
  const WHATSAPP_NUMBER = "919910906306";
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePhoneChange = (v: string) => {
    const filtered = v.replace(/[^0-9+\s\-()]/g, "");
    setPhone(filtered);
    if (submitError) setSubmitError("");
    if (filtered.trim() && !isValidPhone(filtered)) {
      setPhoneError("Enter a valid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setSubmitError("Name and phone are required.");
      return;
    }
    const parts = trimmedName.split(/\s+/);
    const firstName = sanitizeInput(parts[0] || trimmedName);
    const lastName = sanitizeInput(parts.slice(1).join(" ") || "Not Provided");
    if (!isValidName(firstName) || !isValidName(lastName)) {
      setSubmitError("Please enter a valid name (letters, 2+ characters per part).");
      return;
    }
    if (!isValidPhone(trimmedPhone)) {
      setPhoneError("Enter a valid phone number");
      return;
    }

    const whatsappText = `Hello, I want to enquire more about ${PROPERTY_NAME}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!whatsappWindow) {
      setSubmitError("Please allow pop-ups to continue to WhatsApp.");
      return;
    }

    const message = `WhatsApp enquiry for ${IRISH_ETA_1_PROJECT_NAME} (pre-launch). Submitted from the property page.`;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: sanitizeInput(trimmedPhone),
          message,
          formSource: `property-page-${IRISH_ETA_1_SLUG}`,
          propertyTitle: PROPERTY_NAME,
          propertyLocation: "Sector ETA-1, Greater Noida",
          propertySlug: PROPERTY_SLUG,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(typeof data.error === "string" ? data.error : "Something went wrong. Try again.");
        return;
      }
      setIsDone(true);
      setName("");
      setPhone("");
      setTimeout(() => setIsDone(false), 5000);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showBrochure = part === "all" || part === "brochure";
  const showCallback = part === "all" || part === "callback";

  return (
    <>
      {showBrochure ? (
        <BrochureDownloadDialog
          isOpen={brochureOpen}
          onClose={() => setBrochureOpen(false)}
          propertyName={PROPERTY_NAME}
          propertySlug={PROPERTY_SLUG}
        />
      ) : null}

      <div className="flex flex-col gap-2.5">
        {showBrochure ? (
          <div
            className="rounded-xl border border-[#CBB27A]/40 p-3 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 [color-scheme:dark] sm:rounded-2xl sm:p-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(165deg, #0f0f0f 0%, #030303 42%, #141414 100%)",
            }}
          >
            <div className="flex gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CBB27A]/15 text-[#CBB27A] ring-1 ring-[#CBB27A]/30">
                <FileText className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#CBB27A]/90">
                  {PROPERTY_NAME}
                </p>
                <p className="mt-0.5 text-sm font-bold leading-tight text-white">Brochure &amp; floor plans</p>
                <p className="mt-1 text-[11px] leading-snug text-gray-400">
                  EOI allotment is first-come, first-served. Share your details and we&apos;ll send the pre-launch brief.
                </p>
              </div>
            </div>
            <div className="mt-3 mx-auto flex w-max max-w-full flex-col items-stretch gap-1.5 lg:mx-0 lg:w-full">
              <Button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="h-auto min-h-9 whitespace-nowrap rounded-lg border-0 bg-[#CBB27A] px-6 py-2 text-center text-xs font-bold text-black shadow-md transition hover:bg-[#d4c068] lg:w-full"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="inline-flex items-center justify-center gap-1.5">
                  <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Request brochure
                </span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto min-h-9 whitespace-nowrap rounded-lg border-2 border-white/25 bg-transparent px-6 py-2 text-xs font-bold text-white hover:bg-white/10 hover:text-white lg:w-full"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Link href="/request-a-free-consultation" className="inline-flex items-center justify-center gap-1.5">
                  Contact Celeste Abode
                </Link>
              </Button>
            </div>
          </div>
        ) : null}

        {showCallback ? (
          <div
            className="property-inquiry-dark-card rounded-xl border border-[#CBB27A]/40 p-3.5 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 [color-scheme:dark] sm:p-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(165deg, #0f0f0f 0%, #030303 42%, #141414 100%)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#CBB27A]/90">{PROPERTY_NAME}</p>
            <h3 className="mt-1.5 text-base font-bold leading-snug text-white">We&apos;d be happy to call you</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
              Share your name and number. We&apos;ll walk you through EOI, unit preference, and how this ETA-1 launch
              compares, without pressure.
            </p>

            {isDone ? (
              <div className="mt-5 rounded-xl border border-[#CBB27A]/30 bg-[#CBB27A]/10 px-4 py-4 text-center text-sm text-white">
                Thank you. We&apos;ll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div>
                  <label htmlFor={`${idPrefix}-inquiry-name`} className="mb-1 block text-xs font-semibold text-gray-400">
                    Name
                  </label>
                  <input
                    id={`${idPrefix}-inquiry-name`}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor={`${idPrefix}-inquiry-phone`} className="mb-1 block text-xs font-semibold text-gray-400">
                    Phone
                  </label>
                  <input
                    id={`${idPrefix}-inquiry-phone`}
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40 ${
                      phoneError ? "border-red-400 focus:border-red-400" : "border-white/20 focus:border-[#CBB27A]"
                    }`}
                    placeholder="Mobile number"
                  />
                  {phoneError ? <p className="mt-1 text-xs text-red-400">{phoneError}</p> : null}
                </div>
                {submitError ? <p className="text-xs text-red-400">{submitError}</p> : null}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !phone.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#CBB27A] py-2.5 text-xs font-bold text-black transition hover:bg-[#d4c068] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Submitting…
                    </>
                  ) : (
                    "Request a callback"
                  )}
                </button>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
