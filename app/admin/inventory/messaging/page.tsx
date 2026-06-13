"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Download, Loader2, MessageCircle, Search, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Property } from "@/types/property";
import {
  buildCelesteWhatsAppMessagingTemplate,
  openWhatsAppSendToNumber,
  whatsAppComposeUrlNoRecipient,
} from "@/lib/whatsapp-compose";

const PAGE_SIZE = 100;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;

function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function getPhoneValidationError(value: string): string {
  if (!value.trim()) return "Enter a phone number.";
  const digits = normalizePhoneDigits(value);
  if (digits.length < PHONE_MIN_DIGITS || digits.length > PHONE_MAX_DIGITS) {
    return `Use a valid WhatsApp number (${PHONE_MIN_DIGITS}-${PHONE_MAX_DIGITS} digits including country code).`;
  }
  return "";
}

function resolveBrochureUrl(property: Property): string {
  // Be resilient to mixed API payload shapes while backend caches refresh.
  const fromCamel = typeof property.brochureUrl === "string" ? property.brochureUrl : "";
  const fromSnake =
    typeof (property as Property & { brochure_url?: string | null }).brochure_url === "string"
      ? ((property as Property & { brochure_url?: string | null }).brochure_url ?? "")
      : "";
  return (fromCamel || fromSnake).trim();
}

function getBrochureDownloadHref(property: Property): string {
  const rawUrl = resolveBrochureUrl(property);
  if (!rawUrl) return "";
  const filenameBase = (property.slug || property.projectName || "property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const filename = `${filenameBase || "property"}_celeste_abode.pdf`;
  return `/api/brochure-download/proxy?url=${encodeURIComponent(rawUrl)}&filename=${encodeURIComponent(filename)}`;
}

function resolveFloorPlanUrl(property: Property): string {
  const fromCamel = typeof property.floorPlanUrl === "string" ? property.floorPlanUrl : "";
  const fromSnake =
    typeof (property as Property & { floor_plans?: string | null }).floor_plans === "string"
      ? ((property as Property & { floor_plans?: string | null }).floor_plans ?? "")
      : "";
  return (fromCamel || fromSnake).trim();
}

function getFloorPlanDownloadHref(property: Property): string {
  const rawUrl = resolveFloorPlanUrl(property);
  if (!rawUrl) return "";
  const filenameBase = (property.slug || property.projectName || "property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const filename = `${filenameBase || "property"}_floor_plans.pdf`;
  return `/api/brochure-download/proxy?url=${encodeURIComponent(rawUrl)}&filename=${encodeURIComponent(filename)}`;
}

function propertyFilenameBase(property: Property): string {
  return (property.slug || property.projectName || "property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "property";
}

async function downloadViaProxy(href: string, filename: string): Promise<void> {
  const response = await fetch(href, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Download request failed");
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

/** Same-origin proxy avoids browser CORS when downloading R2 / storage URLs. */
function getAssetProxyHref(imageUrl: string, filename: string): string {
  return `/api/brochure-download/proxy?url=${encodeURIComponent(imageUrl)}&filename=${encodeURIComponent(filename)}`;
}

function assetImageExtension(imageUrl: string): string {
  try {
    const clean = imageUrl.split("?")[0] || "";
    const ext = clean.split(".").pop() || "jpg";
    return ext.replace(/[^a-z0-9]/gi, "") || "jpg";
  } catch {
    return "jpg";
  }
}

function assetSlotKey(propertyKey: string, index: number): string {
  return `${propertyKey}:${index}`;
}

const ASSET_SECTION_LABEL =
  "text-xs font-semibold uppercase tracking-wide text-zinc-500 shrink-0";

const ASSET_DOWNLOAD_BUTTON =
  "h-8 w-full border-zinc-300 bg-white text-zinc-900 hover:!bg-black hover:!text-white hover:!border-black gap-1.5 disabled:opacity-70";

const ASSET_UNAVAILABLE_BUTTON =
  "h-8 w-full border-zinc-300 bg-white text-zinc-400 gap-1.5";

function AssetDownloadRow({
  label,
  available,
  loading,
  loadingLabel,
  actionLabel,
  unavailableLabel,
  onDownload,
}: {
  label: string;
  available: boolean;
  loading: boolean;
  loadingLabel: string;
  actionLabel: string;
  unavailableLabel: string;
  onDownload: () => void;
}) {
  return (
    <div className="flex h-[4.25rem] shrink-0 flex-col justify-between">
      <p className={ASSET_SECTION_LABEL}>{label}</p>
      {available ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={loading}
          className={ASSET_DOWNLOAD_BUTTON}
          onClick={onDownload}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {loadingLabel}
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {actionLabel}
            </>
          )}
        </Button>
      ) : (
        <Button type="button" size="sm" variant="outline" disabled className={ASSET_UNAVAILABLE_BUTTON}>
          <Download className="w-4 h-4" />
          {unavailableLabel}
        </Button>
      )}
    </div>
  );
}

export default function AdminInventoryMessagingPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Keep a per-property phone input so agents can send to specific numbers.
  const [phoneByPropertyKey, setPhoneByPropertyKey] = useState<Record<string, string>>({});
  const [downloadingBrochureByPropertyKey, setDownloadingBrochureByPropertyKey] = useState<Record<string, boolean>>({});
  const [downloadingFloorPlanByPropertyKey, setDownloadingFloorPlanByPropertyKey] = useState<Record<string, boolean>>({});
  const [downloadingAssetSlot, setDownloadingAssetSlot] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = searchInput.trim();
      setSearch((prev) => {
        if (prev !== next) setPage(1);
        return next;
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const load = useCallback(async (p: number, q: string) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("page", String(p));
      params.set("limit", String(PAGE_SIZE));
      params.set("t", String(Date.now()));
      if (q) params.set("search", q);

      const res = await fetch(`/api/admin/properties?${params.toString()}`, {
        credentials: "include",
        cache: "no-store",
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "Failed to load properties");
      }
      const data = await res.json();
      setProperties(data.properties || []);
      const tp = data.pagination?.totalPages;
      const total = data.pagination?.total;
      setTotalPages(Math.max(1, typeof tp === "number" && tp > 0 ? tp : 1));
      setTotalCount(typeof total === "number" ? total : (data.properties || []).length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load(page, search);
  }, [load, page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-10 pt-4 sm:pt-6 md:pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg sm:h-14 sm:w-14">
            <MessageCircle className="h-6 w-6 text-white sm:h-7 sm:w-7" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1
              className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              WhatsApp messaging
            </h1>
            <p className="mt-1 text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
              Find a project, download assets, and send ready-made WhatsApp messages to clients.
            </p>
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:gap-6">
            <div className="shrink-0 lg:w-56">
              <p className="text-sm font-semibold text-zinc-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                Search projects
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                By project name, developer, location, or slug
              </p>
            </div>

            <div className="relative min-w-0 flex-1 lg:max-w-2xl">
              <div
                className="pointer-events-none absolute left-3.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-zinc-100/90"
                aria-hidden
              >
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. Sobha, Fusion Vasundhara, Sector 150…"
                className="h-11 w-full rounded-xl border-zinc-200 bg-zinc-50/60 pl-[3.25rem] pr-11 text-sm text-zinc-900 shadow-inner transition placeholder:text-zinc-400 focus-visible:border-[#CBB27A]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#CBB27A]/20"
                aria-label="Search project"
              />
              {searchInput ? (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
            </div>

            {search || loading ? (
              <div className="flex shrink-0 items-center lg:w-32 lg:justify-end">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 tabular-nums">
                  {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#CBB27A]" aria-hidden /> : null}
                  {loading ? "Searching…" : `${totalCount} ${totalCount === 1 ? "match" : "matches"}`}
                </span>
              </div>
            ) : (
              <div className="hidden shrink-0 items-center lg:flex lg:w-32 lg:justify-end">
                <span className="text-xs text-zinc-400 tabular-nums">
                  {totalCount} {totalCount === 1 ? "project" : "projects"}
                </span>
              </div>
            )}
          </div>
        </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-600 gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            Loading properties…
          </div>
        ) : (
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {properties.length === 0 ? (
              <div className="py-12 text-center text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                {search ? `No projects match "${search}".` : "No properties found."}
              </div>
            ) : (
              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                {properties.map((p) => {
                  const propertyKey = p.id ?? p.slug;
                  const messageText = buildCelesteWhatsAppMessagingTemplate({
                    projectName: p.projectName,
                    location: p.location,
                    projectSnapshot: p.projectSnapshot ?? [],
                    locationAdvantage: p.locationAdvantage ?? [],
                    inventoryLines: p.messagingInventoryLines ?? [],
                  });
                  const phone = phoneByPropertyKey[propertyKey] ?? "";
                  const phoneDigits = normalizePhoneDigits(phone);
                  const phoneError = getPhoneValidationError(phone);
                  const canSendToNumber = phoneError.length === 0;
                  const brochureHref = getBrochureDownloadHref(p);
                  const hasBrochure = brochureHref.length > 0;
                  const isDownloadingBrochure = Boolean(downloadingBrochureByPropertyKey[propertyKey]);
                  const floorPlanHref = getFloorPlanDownloadHref(p);
                  const hasFloorPlan = floorPlanHref.length > 0;
                  const isDownloadingFloorPlan = Boolean(downloadingFloorPlanByPropertyKey[propertyKey]);
                  const filenameBase = propertyFilenameBase(p);
                  const propertyImages = Array.isArray(p.images) ? p.images.filter((img) => typeof img === "string" && img.trim()) : [];
                  const hasAssets = propertyImages.length > 0;

                  return (
                    <article
                      key={propertyKey}
                      className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] w-full bg-zinc-100">
                        {p.heroImage ? (
                          <Image
                            src={p.heroImage}
                            alt={p.heroImageAlt || p.projectName}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover"
                            priority={false}
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                        <div className="absolute left-3 top-3">
                          <span
                            className={
                              p.isPublished
                                ? "inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800"
                                : "inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800"
                            }
                          >
                            {p.isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>

                      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                        <div className="min-h-[4.25rem] shrink-0">
                          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 [overflow-wrap:anywhere]">
                            {p.projectName}
                          </h2>
                          <p className="mt-1 line-clamp-1 text-sm text-gray-600 [overflow-wrap:anywhere]">
                            {p.location || "—"}
                          </p>
                        </div>

                        <div className="mt-4 flex min-h-[26.5rem] flex-1 flex-col">
                          <div className="flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                            <AssetDownloadRow
                              label="Brochure"
                              available={hasBrochure}
                              loading={isDownloadingBrochure}
                              loadingLabel="Downloading..."
                              actionLabel="Download brochure"
                              unavailableLabel="Brochure unavailable"
                              onDownload={async () => {
                                if (isDownloadingBrochure) return;
                                setDownloadingBrochureByPropertyKey((prev) => ({ ...prev, [propertyKey]: true }));
                                const filename = `${filenameBase}_celeste_abode.pdf`;
                                try {
                                  await downloadViaProxy(brochureHref, filename);
                                } catch {
                                  window.open(brochureHref, "_blank", "noopener,noreferrer");
                                } finally {
                                  setDownloadingBrochureByPropertyKey((prev) => ({ ...prev, [propertyKey]: false }));
                                }
                              }}
                            />

                            <AssetDownloadRow
                              label="Floor plans"
                              available={hasFloorPlan}
                              loading={isDownloadingFloorPlan}
                              loadingLabel="Downloading..."
                              actionLabel="Download floor plans"
                              unavailableLabel="Floor plans unavailable"
                              onDownload={async () => {
                                if (isDownloadingFloorPlan) return;
                                setDownloadingFloorPlanByPropertyKey((prev) => ({ ...prev, [propertyKey]: true }));
                                const filename = `${filenameBase}_floor_plans.pdf`;
                                try {
                                  await downloadViaProxy(floorPlanHref, filename);
                                } catch {
                                  window.open(floorPlanHref, "_blank", "noopener,noreferrer");
                                } finally {
                                  setDownloadingFloorPlanByPropertyKey((prev) => ({ ...prev, [propertyKey]: false }));
                                }
                              }}
                            />

                            <div className="flex h-[7.75rem] shrink-0 flex-col gap-2">
                              <p className={ASSET_SECTION_LABEL}>
                                Images{" "}
                                <span className="font-normal normal-case text-zinc-400">
                                  ({propertyImages.length})
                                </span>
                              </p>
                              <div className="h-[6.25rem] overflow-y-auto overflow-x-hidden rounded-lg border border-zinc-200 bg-white p-2 [-webkit-overflow-scrolling:touch]">
                                {hasAssets ? (
                                  <div className="flex flex-wrap gap-1.5">
                                    {propertyImages.map((imageUrl, i) => {
                                      const slot = assetSlotKey(propertyKey, i);
                                      const slotLoading = Boolean(downloadingAssetSlot[slot]);
                                      const imageFilenameBase = (p.slug || p.projectName || "property")
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")
                                        .replace(/(^-|-$)/g, "");
                                      const filename = `${imageFilenameBase || "property"}_asset_${i + 1}.${assetImageExtension(imageUrl)}`;
                                      const proxyHref = getAssetProxyHref(imageUrl, filename);
                                      return (
                                        <Button
                                          key={slot}
                                          type="button"
                                          size="sm"
                                          variant="outline"
                                          disabled={slotLoading}
                                          title={`Download image ${i + 1}`}
                                          className="h-8 min-w-[2.75rem] shrink-0 border-zinc-300 bg-white px-2 text-xs text-zinc-900 hover:!bg-black hover:!text-white hover:!border-black gap-1 disabled:opacity-70"
                                          onClick={async () => {
                                            if (slotLoading) return;
                                            setDownloadingAssetSlot((prev) => ({ ...prev, [slot]: true }));
                                            try {
                                              const response = await fetch(proxyHref, {
                                                method: "GET",
                                                credentials: "include",
                                              });
                                              if (!response.ok) return;
                                              const blob = await response.blob();
                                              const objectUrl = URL.createObjectURL(blob);
                                              const link = document.createElement("a");
                                              link.href = objectUrl;
                                              link.download = filename;
                                              link.style.display = "none";
                                              document.body.appendChild(link);
                                              link.click();
                                              document.body.removeChild(link);
                                              URL.revokeObjectURL(objectUrl);
                                            } finally {
                                              setDownloadingAssetSlot((prev) => ({ ...prev, [slot]: false }));
                                            }
                                          }}
                                        >
                                          {slotLoading ? (
                                            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
                                          ) : (
                                            <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                          )}
                                          <span className="font-medium tabular-nums">{i + 1}</span>
                                        </Button>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="flex h-full min-h-[4.75rem] items-center justify-center px-2 text-center text-xs text-zinc-400">
                                    No gallery images
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-zinc-200 pt-3">
                              <p className={ASSET_SECTION_LABEL}>WhatsApp actions</p>
                              <Button
                                asChild
                                size="sm"
                                className="h-8 w-full bg-[#25D366] text-white gap-1.5 hover:bg-[#20BD5A]"
                              >
                                <a href={whatsAppComposeUrlNoRecipient(messageText)} rel="noopener noreferrer">
                                  <MessageCircle className="w-4 h-4" />
                                  Choose chat in WhatsApp
                                </a>
                              </Button>

                              <div className="flex flex-col gap-2">
                                <label className="sr-only" htmlFor={`phone-${propertyKey}`}>
                                  Phone number
                                </label>
                                <Input
                                  id={`phone-${propertyKey}`}
                                  value={phone}
                                  onChange={(e) =>
                                    setPhoneByPropertyKey((prev) => ({
                                      ...prev,
                                      [propertyKey]: e.target.value,
                                    }))
                                  }
                                  placeholder="Phone number"
                                  inputMode="tel"
                                  className="h-9 flex-1 border-zinc-300"
                                  autoComplete="off"
                                  aria-invalid={phone.length > 0 && !canSendToNumber}
                                />

                                <Button
                                  type="button"
                                  size="sm"
                                  disabled={!canSendToNumber}
                                  className="h-8 w-full bg-black text-white gap-1.5 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                                  onClick={() => {
                                    if (!canSendToNumber) return;
                                    openWhatsAppSendToNumber(phoneDigits, messageText);
                                  }}
                                >
                                  <Send className="w-4 h-4" />
                                  Send to entered number
                                </Button>
                                <p
                                  className={`min-h-[2.5rem] text-xs leading-relaxed ${
                                    phone.length > 0 && phoneError ? "text-red-600" : "text-zinc-500"
                                  }`}
                                >
                                  {phone.length > 0 && phoneError
                                    ? phoneError
                                    : "Use country code if needed (example: 91...)."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}
