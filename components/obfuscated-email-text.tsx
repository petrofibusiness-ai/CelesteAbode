"use client";

import { useEffect, useState } from "react";

/**
 * Simple client-side email text component for server components
 * Decodes email on client-side render to prevent scraping
 */
export function ObfuscatedEmailText() {
  const [email, setEmail] = useState<string>("support at celesteabode dot com");

  useEffect(() => {
    // Decode email client-side only
    // Base64 encoded: support@celesteabode.com
    const encoded = "c3VwcG9ydEBjZWxlc3RlYWJvZGUuY29t";
    try {
      const decoded = atob(encoded);
      setEmail(decoded);
    } catch {
      // Keep fallback text if decoding fails
    }
  }, []);

  return <>{email}</>;
}

