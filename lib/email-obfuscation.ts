/**
 * Email obfuscation utility to prevent email scraping
 * Uses base64 encoding and JavaScript decoding to hide emails from bots
 */

/**
 * Obfuscate an email address using base64 encoding
 * This makes it harder for scrapers to find plain text emails
 */
export function obfuscateEmail(email: string): string {
  // Simple base64 encoding (client-side will decode)
  if (typeof window === 'undefined') {
    // Server-side: return encoded version
    return Buffer.from(email).toString('base64');
  }
  // Client-side: decode and return
  try {
    return atob(email);
  } catch {
    return email;
  }
}

/**
 * Get the obfuscated email display text
 * Returns a human-readable obfuscated format
 */
export function getObfuscatedEmailDisplay(): string {
  // Return obfuscated text that users can understand
  return "support at celesteabode dot com";
}

/**
 * Get the actual email address (for mailto links)
 * This will be decoded client-side
 */
export function getEmailForMailto(): string {
  // Base64 encoded: support@celesteabode.com
  return "c3VwcG9ydEBjZWxlc3RlYWJvZGUuY29t";
}

/**
 * Client-side component to decode and display email
 * This prevents bots from easily scraping the email
 */
export function decodeEmail(encoded: string): string {
  if (typeof window === 'undefined') return '';
  try {
    return atob(encoded);
  } catch {
    return '';
  }
}

