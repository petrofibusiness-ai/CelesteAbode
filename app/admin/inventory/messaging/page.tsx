"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Download, Loader2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Property } from "@/types/property";
import {
  buildCelesteWhatsAppMessagingTemplate,
  whatsAppComposeUrlNoRecipient,
  whatsAppComposeUrlWithRecipient,
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

export default function AdminInventoryMessagingPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Keep a per-property phone input so agents can send to specific numbers.
  const [phoneByPropertyKey, setPhoneByPropertyKey] = useState<Record<string, string>>({});
  const [downloadingByPropertyKey, setDownloadingByPropertyKey] = useState<Record<string, boolean>>({});
  const [downloadingAssetSlot, setDownloadingAssetSlot] = useState<Record<string, boolean>>({});

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/properties?page=${p}&limit=${PAGE_SIZE}&t=${Date.now()}`,
        { credentials: "include", cache: "no-store" }
      );
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
      setTotalPages(Math.max(1, typeof tp === "number" && tp > 0 ? tp : 1));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load(page);
  }, [load, page]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            WhatsApp messaging
          </h1>
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
                No properties found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ fontFamily: "Poppins, sans-serif" }}>
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
                  const isDownloading = Boolean(downloadingByPropertyKey[propertyKey]);
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

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <h2 className="text-base font-semibold text-gray-900 leading-snug [overflow-wrap:anywhere]">
                          {p.projectName}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 [overflow-wrap:anywhere]">
                          {p.location || "—"}
                        </p>

                        <div className="mt-auto pt-4">
                          <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Brochure
                          </p>
                          {hasBrochure ? (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              disabled={isDownloading}
                              className="w-full border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 gap-1.5 disabled:opacity-70"
                              onClick={async () => {
                                if (isDownloading) return;
                                setDownloadingByPropertyKey((prev) => ({ ...prev, [propertyKey]: true }));
                                try {
                                  const response = await fetch(brochureHref, {
                                    method: "GET",
                                    credentials: "include",
                                  });
                                  if (!response.ok) {
                                    throw new Error("Download request failed");
                                  }
                                  const blob = await response.blob();
                                  const objectUrl = URL.createObjectURL(blob);
                                  const filenameBase = (p.slug || p.projectName || "property")
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)/g, "");
                                  const filename = `${filenameBase || "property"}_celeste_abode.pdf`;

                                  const link = document.createElement("a");
                                  link.href = objectUrl;
                                  link.download = filename;
                                  link.style.display = "none";
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  URL.revokeObjectURL(objectUrl);
                                } catch {
                                  // Fallback to direct browser download path if fetch/blob fails.
                                  window.open(brochureHref, "_blank", "noopener,noreferrer");
                                } finally {
                                  setDownloadingByPropertyKey((prev) => ({ ...prev, [propertyKey]: false }));
                                }
                              }}
                            >
                              {isDownloading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  Download brochure
                                </>
                              )}
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              disabled
                              className="w-full border-zinc-300 bg-white text-zinc-400 gap-1.5"
                            >
                              <Download className="w-4 h-4" />
                              Brochure unavailable
                            </Button>
                          )}

                          {hasAssets ? (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Images{" "}
                                <span className="font-normal normal-case text-zinc-400">
                                  ({propertyImages.length})
                                </span>
                              </p>
                              <div
                                className={
                                  propertyImages.length > 8
                                    ? "max-h-[7.5rem] overflow-y-auto overflow-x-hidden pr-0.5 [-webkit-overflow-scrolling:touch]"
                                    : ""
                                }
                              >
                                <div className="flex flex-wrap gap-1.5">
                                  {propertyImages.map((imageUrl, i) => {
                                    const slot = assetSlotKey(propertyKey, i);
                                    const slotLoading = Boolean(downloadingAssetSlot[slot]);
                                    const filenameBase = (p.slug || p.projectName || "property")
                                      .toLowerCase()
                                      .replace(/[^a-z0-9]+/g, "-")
                                      .replace(/(^-|-$)/g, "");
                                    const filename = `${filenameBase || "property"}_asset_${i + 1}.${assetImageExtension(imageUrl)}`;
                                    const proxyHref = getAssetProxyHref(imageUrl, filename);
                                    return (
                                      <Button
                                        key={slot}
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        disabled={slotLoading}
                                        title={`Download image ${i + 1}`}
                                        className="h-8 min-w-[2.75rem] shrink-0 border-zinc-300 bg-white px-2 text-xs text-zinc-900 hover:bg-zinc-100 gap-1 disabled:opacity-70"
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
                                        <span className="tabular-nums font-medium">{i + 1}</span>
                                      </Button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-lg border border-dashed border-zinc-200 bg-white px-3 py-2 text-center text-xs text-zinc-400">
                              No gallery images
                            </div>
                          )}

                          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            WhatsApp actions
                          </p>
                          <Button
                            asChild
                            size="sm"
                            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-1.5"
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
                              className="w-full bg-black hover:bg-zinc-900 text-white gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => {
                                if (!canSendToNumber) return;
                                const url = whatsAppComposeUrlWithRecipient(phoneDigits, messageText);
                                window.open(url, "_blank", "noopener,noreferrer");
                              }}
                            >
                              <Send className="w-4 h-4" />
                              Send to entered number
                            </Button>
                            {phone.length > 0 && phoneError ? (
                              <p className="text-xs text-red-600">{phoneError}</p>
                            ) : (
                              <p className="text-xs text-zinc-500">Use country code if needed (example: 91...).</p>
                            )}
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
  );
}
