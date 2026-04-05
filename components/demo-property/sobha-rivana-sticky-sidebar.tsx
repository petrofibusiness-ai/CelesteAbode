"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Download, FileText, Loader2 } from "lucide-react";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";
import { Button } from "@/components/ui/button";
import { isValidPhone, isValidName, sanitizeInput } from "@/lib/security";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29641.97145142861!2d77.39002720241957!3d28.55566019520524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef32213980d5%3A0xd250f82d12a9cc79!2sSobha%20Rivana!5e1!3m2!1sen!2sin!4v1774780221315!5m2!1sen!2sin";

export function SobhaRivanaMapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg md:rounded-3xl ${className}`}>
      <iframe
        src={MAPS_EMBED_SRC}
        title="Sobha Rivana on Google Maps"
        className="h-[min(420px,70vw)] w-full border-0 sm:h-[450px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function SobhaRivanaStickySidebar({ idPrefix = "demo" }: { idPrefix?: string }) {
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

    const message =
      "Request for a callback about Sobha Rivana (Sector 1, Greater Noida West). Submitted from the demo property page.";

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
          formSource: "demo-property-sobha-rivana",
          propertyTitle: "Sobha Rivana",
          propertyLocation: "Sector 1, Greater Noida West",
          propertySlug: "sobha-rivana",
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

  return (
    <>
      <BrochureDownloadDialog
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        propertyName="Sobha Rivana"
        propertySlug="sobha-rivana"
      />

      <div className="flex flex-col gap-3">
        <div
          className="rounded-2xl border border-[#CBB27A]/40 p-4 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 [color-scheme:dark] sm:p-4"
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
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#CBB27A]/90">Sobha Rivana</p>
              <p className="mt-0.5 text-sm font-bold leading-tight text-white">Brochure &amp; details</p>
              <p className="mt-1 text-[11px] leading-snug text-gray-400">
                PDF, pricing snapshot, formats — we liaise with the builder so you skip the chase.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <Button
              type="button"
              onClick={() => setBrochureOpen(true)}
              className="h-auto min-h-9 w-full whitespace-normal rounded-lg border-0 bg-[#CBB27A] px-3 py-2 text-center text-xs font-bold text-black shadow-md transition hover:bg-[#d4c068]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Download brochure
              </span>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto min-h-9 w-full whitespace-normal rounded-lg border-2 border-white/25 bg-transparent py-2 text-xs font-bold text-white hover:bg-white/10 hover:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Link href="/request-a-free-consultation" className="inline-flex items-center justify-center gap-1.5 px-3">
                Contact Celeste Abode
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="property-inquiry-dark-card rounded-2xl border border-[#CBB27A]/40 p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 [color-scheme:dark] sm:p-6"
          style={{
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(165deg, #0f0f0f 0%, #030303 42%, #141414 100%)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#CBB27A]/90">Sobha Rivana</p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-white">Request a callback</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Share your details — a Celeste Abode advisor calls back with a focused briefing on Rivana:
            formats, pricing bands, and how it stacks up for your budget and commute.
          </p>

          {isDone ? (
            <div className="mt-5 rounded-xl border border-[#CBB27A]/30 bg-[#CBB27A]/10 px-4 py-4 text-center text-sm text-white">
              Thanks — we&apos;ll be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40"
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
                  className={`w-full rounded-xl border bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40 ${
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#CBB27A] py-3 text-sm font-bold text-black transition hover:bg-[#d4c068] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
