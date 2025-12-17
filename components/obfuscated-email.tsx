"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface ObfuscatedEmailProps {
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  variant?: "link" | "text";
}

/**
 * Client-side email component that decodes email on render
 * This prevents bots from easily scraping plain text emails
 */
export function ObfuscatedEmail({
  className = "",
  iconClassName = "",
  showIcon = true,
  variant = "link",
}: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string>("");
  const [displayText, setDisplayText] = useState<string>("support at celesteabode dot com");

  useEffect(() => {
    // Decode email client-side only
    // Base64 encoded: support@celesteabode.com
    const encoded = "c3VwcG9ydEBjZWxlc3RlYWJvZGUuY29t";
    try {
      const decoded = atob(encoded);
      setEmail(decoded);
      setDisplayText(decoded);
    } catch {
      // Fallback if decoding fails
      setEmail("support@celesteabode.com");
      setDisplayText("support at celesteabode dot com");
    }
  }, []);

  if (variant === "link") {
    return (
      <a
        href={email ? `mailto:${email}` : "#"}
        className={className}
        onClick={(e) => {
          if (!email) {
            e.preventDefault();
          }
        }}
      >
        {showIcon && (
          <Mail className={iconClassName || "w-5 h-5 text-white group-hover:text-[#CBB27A] transition-colors"} />
        )}
        <span>{displayText}</span>
      </a>
    );
  }

  return (
    <span className={className}>
      {displayText}
    </span>
  );
}

