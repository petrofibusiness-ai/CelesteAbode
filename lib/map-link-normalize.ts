/**
 * Normalize map embed input: accepts a plain https URL or a full <iframe ...> snippet
 * (as from Google Maps "Embed a map"). Returns a single URL suitable for <iframe src>.
 */
export function normalizeMapLinkFromInput(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  let s = String(raw).trim().replace(/^\uFEFF/, "");
  if (!s) return null;

  const decodeEntities = (url: string): string =>
    url
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#0*39;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");

  let candidate = s;

  if (/<iframe/i.test(s)) {
    const quoted = s.match(/<iframe[\s\S]*?\ssrc\s*=\s*["']([^"']+)["']/i);
    if (quoted?.[1]) {
      candidate = quoted[1].trim();
    } else {
      const unquoted = s.match(/<iframe[\s\S]*?\ssrc\s*=\s*([^\s<>"']+)/i);
      if (unquoted?.[1]) {
        candidate = unquoted[1].trim().replace(/^["']|["']$/g, "");
      } else {
        return null;
      }
    }
  }

  candidate = decodeEntities(candidate).trim();
  if (!candidate) return null;

  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}
