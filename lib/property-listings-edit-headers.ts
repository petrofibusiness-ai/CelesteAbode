/**
 * Headers the browser sends for inventory PATCH/POST/DELETE.
 * Uses both a custom header and `Authorization: Bearer` so auth survives proxies
 * that drop non-standard names.
 */
export function propertyListingsEditFetchHeaders(token: string | null | undefined): Record<string, string> {
  const k = (token ?? "").trim();
  const headers: Record<string, string> = {
    "X-Ca-Property-Listings-Edit-Key": k,
  };
  if (k) {
    headers.Authorization = `Bearer ${k}`;
  }
  return headers;
}
