"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Cormorant_Garamond } from "next/font/google";
import {
  ArrowUpRight,
  Award,
  Building2,
  Download,
  Eye,
  GraduationCap,
  Home,
  Landmark,
  Layers,
  MapPin,
  MessageSquare,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  IndianRupee,
  FileText,
  Loader2,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbSchema, PropertySchema } from "@/lib/structured-data";
import { SobhaRivanaGallery, type DemoGallerySlide } from "@/components/demo-property/sobha-rivana-gallery";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";
import { Button } from "@/components/ui/button";
import { AmenityIcon } from "@/lib/amenity-icons";
import type { Property } from "@/types/property";
import { isValidPhone, isValidName, sanitizeInput } from "@/lib/security";

const heroTitleFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const NCR_LINKS = [
  { href: "/properties-in-greater-noida", title: "Greater Noida", sub: "Expressway belt & new launches" },
  { href: "/properties-in-noida", title: "Noida", sub: "Metro & office corridors" },
  { href: "/properties-in-ghaziabad", title: "Ghaziabad", sub: "NCR east" },
  { href: "/properties", title: "All NCR", sub: "Browse all projects" },
];

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

function buildHeroSlides(property: Property): DemoGallerySlide[] {
  const urls: string[] = [];
  const hero = property.heroImage?.trim();
  if (hero) urls.push(hero);
  for (const img of property.images || []) {
    const u = typeof img === "string" ? img.trim() : "";
    if (u && !urls.includes(u)) urls.push(u);
  }
  const plain = stripTags(property.projectName) || "Project";
  return urls.map((src, i) => ({
    src,
    alt: property.heroImageAlt || `${plain} — ${i === 0 ? "hero" : `image ${i + 1}`}`,
    label: i === 0 ? "Project" : `View ${i + 1}`,
    width: i === 0 ? 1920 : 1600,
    height: i === 0 ? 1080 : 1000,
  }));
}

function iconForLocationRow(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("road") || l.includes("highway") || l.includes("express")) return Route;
  if (l.includes("air") || l.includes("rail") || l.includes("metro") || l.includes("airport")) return Plane;
  if (l.includes("daily") || l.includes("shop") || l.includes("mall") || l.includes("retail")) return Store;
  if (l.includes("health") || l.includes("hospital")) return Stethoscope;
  if (l.includes("school") || l.includes("education")) return GraduationCap;
  if (l.includes("leisure") || l.includes("golf") || l.includes("entertain")) return Landmark;
  return MapPin;
}

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  id,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className="mb-8 max-w-4xl text-left lg:mr-auto">
      <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CBB27A]/10 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 text-[#CBB27A] sm:h-6 sm:w-6" aria-hidden />
        </div>
        {id ? (
          <h2
            id={id}
            className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl" style={{ fontFamily: "Poppins, sans-serif" }}>
            {title}
          </h2>
        )}
      </div>
      <div className="mb-6 h-1 w-16 bg-[#CBB27A] sm:mb-8 sm:w-20" />
      {subtitle ? <p className="max-w-3xl text-base leading-relaxed text-gray-600">{subtitle}</p> : null}
    </div>
  );
}

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
      <div className="mt-0.5 text-xs font-bold leading-snug text-white sm:text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

function PropertyDemoHero({
  property,
  slides,
  inventoryConfigurationLabels,
}: {
  property: Property;
  slides: DemoGallerySlide[];
  inventoryConfigurationLabels: string[];
}) {
  const rera = property.reraId?.trim() || "N/A";

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-black" aria-labelledby="property-hero-h1">
      <div className="absolute inset-0">
        {slides.length > 0 ? (
          <SobhaRivanaGallery slides={slides} theme="dark" bare fullscreenHero />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 md:px-10 lg:px-14">
          <div className="max-w-4xl text-left pointer-events-auto">
            <h1
              id="property-hero-h1"
              className={`${heroTitleFont.className} text-[2rem] font-semibold uppercase leading-[1.05] tracking-[0.12em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-5xl sm:tracking-[0.16em] md:text-6xl md:tracking-[0.18em]`}
              dangerouslySetInnerHTML={{ __html: property.projectName }}
            />
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
              <p
                className="text-sm font-semibold text-white/95 drop-shadow sm:text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {property.location || "—"}
              </p>
            </div>
          </div>

          <div className="mt-auto flex w-full justify-start pt-10 sm:pt-12 pointer-events-auto">
            <div className="grid w-full max-w-[min(100%,20rem)] grid-cols-2 gap-2 sm:max-w-2xl sm:grid-cols-4 sm:gap-3">
              <SpecPill label="RERA" icon={<ShieldCheck className="h-4 w-4" aria-hidden />}>
                <span className="line-clamp-3 text-[11px] leading-tight sm:line-clamp-none sm:text-xs">{rera}</span>
              </SpecPill>
              <SpecPill label="Configuration" icon={<Building2 className="h-4 w-4" aria-hidden />}>
                {inventoryConfigurationLabels.length > 0 ? (
                  <ul className="max-h-[5.5rem] space-y-1 overflow-y-auto text-[11px] font-semibold leading-snug sm:max-h-none sm:text-xs">
                    {inventoryConfigurationLabels.map((c) => (
                      <li key={c} className="flex gap-1.5">
                        <span className="text-[#CBB27A]" aria-hidden>
                          •
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </SpecPill>
              <SpecPill label="Price" icon={<IndianRupee className="h-4 w-4" aria-hidden />}>
                On request
              </SpecPill>
              <SpecPill label="Developer" icon={<Award className="h-4 w-4" aria-hidden />}>
                <span
                  className="line-clamp-4 text-[11px] leading-tight sm:line-clamp-none sm:text-xs"
                  dangerouslySetInnerHTML={{ __html: property.developer }}
                />
              </SpecPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyMapEmbed({ src, title, className = "" }: { src: string; title: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg md:rounded-3xl ${className}`}>
      <iframe
        src={src}
        title={title}
        className="h-[min(420px,70vw)] w-full border-0 sm:h-[450px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function PropertyDemoStickySidebar({
  idPrefix = "prop",
  property,
  projectNamePlain,
  configurationOptions = [],
}: {
  idPrefix?: string;
  property: Property;
  projectNamePlain: string;
  configurationOptions?: string[];
}) {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [configuration, setConfiguration] = useState("");
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

    const configRequired = configurationOptions.length > 0;
    if (configRequired && !configuration.trim()) {
      setSubmitError("Please select a configuration.");
      return;
    }

    const configNote = configuration.trim() ? ` Configuration of interest: ${configuration.trim()}.` : "";
    const message = `Request for a callback about ${projectNamePlain}${property.location ? ` (${property.location})` : ""}.${configNote} Submitted from the property page.`;

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
          formSource: "property-page-demo-layout-sidebar",
          propertyTitle: projectNamePlain,
          propertyLocation: property.location,
          propertySlug: property.slug,
          unitConfiguration: configuration.trim() || undefined,
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
      setConfiguration("");
      setTimeout(() => setIsDone(false), 5000);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasBrochure = Boolean(property.brochureUrl?.trim());
  const configRequired = configurationOptions.length > 0;
  const fieldShell =
    "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40";

  return (
    <>
      {hasBrochure ? (
        <BrochureDownloadDialog
          isOpen={brochureOpen}
          onClose={() => setBrochureOpen(false)}
          propertyName={projectNamePlain}
          propertySlug={property.slug}
          brochureUrl={property.brochureUrl}
        />
      ) : null}

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
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#CBB27A]/90">{projectNamePlain}</p>
              <p className="mt-0.5 text-sm font-bold leading-tight text-white">Brochure &amp; details</p>
              <p className="mt-1 text-[11px] leading-snug text-gray-400">
                PDF, pricing snapshot, formats — we liaise with the builder so you skip the chase.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {hasBrochure ? (
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
            ) : null}
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
          <p className="text-xs font-semibold uppercase tracking-wider text-[#CBB27A]/90">{projectNamePlain}</p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-white">Request a callback</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Share your details — a Celeste Abode advisor calls back with a focused briefing on this project.
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
              {configRequired ? (
                <div>
                  <label htmlFor={`${idPrefix}-inquiry-config`} className="mb-1 block text-xs font-semibold text-gray-400">
                    Configuration
                  </label>
                  <select
                    id={`${idPrefix}-inquiry-config`}
                    name="configuration"
                    value={configuration}
                    onChange={(e) => setConfiguration(e.target.value)}
                    required
                    className={`${fieldShell} cursor-pointer pr-2`}
                  >
                    <option value="">Select configuration</option>
                    {configurationOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              {submitError ? <p className="text-xs text-red-400">{submitError}</p> : null}
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !name.trim() ||
                  !phone.trim() ||
                  (configRequired && !configuration.trim())
                }
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

function PropertyDemoFooterCta({ property, projectNamePlain }: { property: Property; projectNamePlain: string }) {
  const [open, setOpen] = useState(false);
  const hasBrochure = Boolean(property.brochureUrl?.trim());

  return (
    <>
      {hasBrochure ? (
        <BrochureDownloadDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          propertyName={projectNamePlain}
          propertySlug={property.slug}
          brochureUrl={property.brochureUrl}
        />
      ) : null}
      <section
        id="property-footer-cta"
        className="relative overflow-hidden bg-gradient-to-br from-[#2B3035] via-[#1a1d22] to-[#2B3035] py-16 md:py-20"
        aria-label={`Enquire about ${projectNamePlain}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-[#CBB27A] blur-3xl" />
          <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#CBB27A] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="mx-auto max-w-2xl text-center sm:max-w-3xl">
            <h2
              className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ready to explore{" "}
              <span className="text-[#CBB27A]" dangerouslySetInnerHTML={{ __html: property.projectName }} />?
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Download the brochure or book time with us — we coordinate site visits, decode the builder sheet with you,
              and place this project in context against other options that match your brief.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              {hasBrochure ? (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#CBB27A] px-6 py-3 text-sm font-bold text-gray-900 shadow-lg transition hover:bg-[#b8a066] sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Download className="h-5 w-5" aria-hidden />
                  Download brochure
                </button>
              ) : null}
              <Link
                href="/request-a-free-consultation"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:text-base"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MessageSquare className="h-5 w-5 text-[#CBB27A]" aria-hidden />
                Contact Celeste Abode
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PropertyDemoLayout({
  property,
  canonicalUrl,
  inventoryConfigurationLabels = [],
}: {
  property: Property;
  canonicalUrl: string;
  inventoryConfigurationLabels?: string[];
}) {
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

  const projectNamePlain = useMemo(
    () => stripTags(property.projectName) || "this project",
    [property.projectName]
  );

  const heroSlides = useMemo(() => buildHeroSlides(property), [property]);

  const floorPlanSlides: DemoGallerySlide[] = useMemo(() => {
    const plans = property.floorPlans || [];
    return plans.map((p, i) => ({
      src: p.src,
      alt: p.alt || `${projectNamePlain} — layout ${i + 1}`,
      label: p.label || `Plan ${i + 1}`,
      width: p.width ?? 1600,
      height: p.height ?? 1000,
    }));
  }, [property.floorPlans, projectNamePlain]);

  const amenitiesToShow = useMemo(() => {
    const list = property.amenities?.filter((a) => a && String(a).trim()) || [];
    return list.slice(0, 8);
  }, [property.amenities]);

  const exploreHref = property.locationSlug ? `/properties-in-${property.locationSlug}` : "/properties";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: projectNamePlain,
    description: stripTags(property.description).slice(0, 500),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location || undefined,
      addressCountry: "IN",
    },
    developer: { "@type": "Organization", name: stripTags(property.developer) || undefined },
  };

  const whyTitle = property.whyBlock?.title?.trim() || "Why this project?";
  const whyPoints = property.whyBlock?.points?.length ? property.whyBlock.points : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Properties", url: `${siteUrl}/properties` },
          { name: projectNamePlain, url: canonicalUrl },
        ]}
      />
      <PropertySchema
        name={projectNamePlain}
        description={stripTags(property.description)}
        image={property.heroImage}
        priceMin={undefined}
        priceMax={undefined}
        priceUnit="On request"
        address={property.location || ""}
        developer={stripTags(property.developer)}
        reraId={property.reraId}
        configuration={inventoryConfigurationLabels.length > 0 ? inventoryConfigurationLabels : undefined}
        area={property.sizes?.trim() || "N/A"}
        status={property.projectStatus || "Not specified"}
        url={canonicalUrl}
      />

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />

        <main className="pb-8 pt-0">
          <PropertyDemoHero
            property={property}
            slides={heroSlides}
            inventoryConfigurationLabels={inventoryConfigurationLabels}
          />

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(288px,380px)] lg:items-start lg:gap-x-10 xl:gap-x-14">
              <div className="min-w-0">
                <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="about-h2">
                  <div className="mb-8 max-w-4xl text-left lg:mr-auto">
                    <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CBB27A]/10 sm:h-12 sm:w-12">
                        <Eye className="h-5 w-5 text-[#CBB27A] sm:h-6 sm:w-6" aria-hidden />
                      </div>
                      <h2
                        id="about-h2"
                        className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: `About ${property.projectName}` }}
                      />
                    </div>
                    <div className="mb-6 h-1 w-16 bg-[#CBB27A] sm:mb-8 sm:w-20" />
                  </div>
                  <div className="relative max-w-4xl overflow-hidden rounded-2xl border border-[#CBB27A]/20 bg-gradient-to-br from-white via-[#CBB27A]/5 to-white p-6 shadow-2xl sm:rounded-3xl sm:p-8 md:p-12 lg:mr-auto">
                    <p
                      className="text-base leading-[1.8] text-gray-800 md:text-lg"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: property.description }}
                    />
                  </div>
                </section>

                <div className="mb-10 scroll-mt-28 lg:hidden">
                  <PropertyDemoStickySidebar
                    idPrefix="mob"
                    property={property}
                    projectNamePlain={projectNamePlain}
                    configurationOptions={inventoryConfigurationLabels}
                  />
                </div>

                {property.projectSnapshot && property.projectSnapshot.length > 0 ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="snapshot-h2">
                    <SectionHeading id="snapshot-h2" icon={Home} title="Project snapshot" />
                    <ul className="grid max-w-4xl gap-3 sm:grid-cols-2 lg:mr-auto" role="list">
                      {property.projectSnapshot.map((item, idx) => (
                        <li
                          key={`${idx}-${item.slice(0, 48)}`}
                          className="flex gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left text-sm font-semibold leading-snug text-gray-900 shadow-sm"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBB27A]" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {whyPoints.length > 0 ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="why-h2">
                    <SectionHeading id="why-h2" icon={Building2} title={whyTitle} />
                    <ul className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mr-auto" role="list">
                      {whyPoints.map((line, idx) => (
                        <li
                          key={`${idx}-${line.slice(0, 48)}`}
                          className="rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-left text-sm font-semibold leading-relaxed text-gray-900 sm:text-base"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 max-w-3xl text-left text-sm text-gray-600">
                      Explore complementary projects in{" "}
                      <Link href={exploreHref} className="font-semibold text-[#CBB27A] hover:underline">
                        this area
                      </Link>{" "}
                      — we shortlist what actually fits your brief.
                    </p>
                  </section>
                ) : null}

                {floorPlanSlides.length > 0 ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="floor-plans-h2">
                    <SectionHeading
                      id="floor-plans-h2"
                      icon={Layers}
                      title="Floor plans & layouts"
                      subtitle="Site layout, typical unit, and clubhouse views — a strong feel for scale and lifestyle before you step on site."
                    />
                    <div className="max-w-4xl lg:mr-auto">
                      <SobhaRivanaGallery slides={floorPlanSlides} theme="dark" cinema />
                    </div>
                  </section>
                ) : null}

                {amenitiesToShow.length > 0 ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="amenities-h2">
                    <SectionHeading id="amenities-h2" icon={Sparkles} title="Key amenities" />
                    <div className="grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:mr-auto">
                      {amenitiesToShow.map((label) => (
                        <div
                          key={label}
                          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-[#CBB27A]/30 hover:shadow-xl sm:p-6"
                        >
                          <div className="flex flex-col items-center space-y-3 text-center sm:space-y-4">
                            <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#CBB27A]/10 bg-gradient-to-br from-[#CBB27A]/10 via-[#CBB27A]/5 to-[#CBB27A]/10 shadow-sm transition group-hover:border-[#CBB27A]/20 sm:h-20 sm:w-20">
                              <AmenityIcon
                                amenityName={label}
                                className="h-8 w-8 text-[#CBB27A] sm:h-9 sm:w-9"
                                color="#CBB27A"
                                strokeWidth={2}
                              />
                            </div>
                            <p
                              className="min-h-[2.5em] text-xs font-semibold leading-tight text-gray-900 sm:text-sm md:text-base"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}

                {property.locationAdvantage && property.locationAdvantage.length > 0 ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="location-advantage-h2">
                    <SectionHeading id="location-advantage-h2" icon={MapPin} title="Location advantage" />
                    <ul
                      className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mr-auto"
                      role="list"
                    >
                      {property.locationAdvantage.map(({ label, text }) => {
                        const RowIcon = iconForLocationRow(label);
                        return (
                          <li
                            key={`${label}-${text.slice(0, 24)}`}
                            className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-[#CBB27A]/30 hover:shadow-md sm:p-5"
                          >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#CBB27A]/15 bg-[#CBB27A]/10">
                              <RowIcon className="h-6 w-6 text-[#CBB27A]" strokeWidth={2} aria-hidden />
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
                              <p
                                className="mt-1.5 text-sm leading-relaxed text-gray-900"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                              >
                                {text}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {property.mapLink ? (
                      <div className="mt-10 max-w-5xl lg:mr-auto sm:mt-12">
                        <PropertyMapEmbed src={property.mapLink} title={`${projectNamePlain} on map`} />
                      </div>
                    ) : null}
                  </section>
                ) : property.mapLink ? (
                  <section className="mb-12 sm:mb-16 md:mb-24" aria-labelledby="map-h2">
                    <SectionHeading id="map-h2" icon={MapPin} title="Location map" />
                    <div className="max-w-5xl lg:mr-auto">
                      <PropertyMapEmbed src={property.mapLink} title={`${projectNamePlain} on map`} />
                    </div>
                  </section>
                ) : null}

                <section className="mb-4 sm:mb-8" aria-labelledby="ncr-h2">
                  <SectionHeading id="ncr-h2" icon={Building2} title="Explore more in NCR" />
                  <ul className="grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:mr-auto" role="list">
                    {NCR_LINKS.map((card) => (
                      <li key={card.href}>
                        <Link
                          href={card.href}
                          className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-[#CBB27A]/40 hover:shadow-md"
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {card.title}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#CBB27A]" />
                          </span>
                          <span className="mt-1 text-left text-xs text-gray-600">{card.sub}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside
                id="property-demo-sidebar"
                className="mt-10 hidden scroll-mt-28 self-start lg:sticky lg:top-24 lg:mt-0 lg:block xl:top-28"
              >
                <PropertyDemoStickySidebar
                  idPrefix="desk"
                  property={property}
                  projectNamePlain={projectNamePlain}
                  configurationOptions={inventoryConfigurationLabels}
                />
              </aside>
            </div>
          </div>
        </main>

        <PropertyDemoFooterCta property={property} projectNamePlain={projectNamePlain} />
        <Footer />
      </div>
    </>
  );
}
