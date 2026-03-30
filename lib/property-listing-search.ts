/** Sanitize search for ilike: trim, cap length, strip LIKE wildcards. */
export function sanitizeProjectNameSearch(raw: string): string {
  return raw
    .trim()
    .slice(0, 100)
    .replace(/%/g, "")
    .replace(/_/g, " ");
}
