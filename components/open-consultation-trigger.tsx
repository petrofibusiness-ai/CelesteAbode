"use client";

import { useCallback } from "react";

interface OpenConsultationTriggerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders children and triggers the global consultation popup on click.
 * Use for "Schedule Consultation" CTAs so they open the popup instead of navigating.
 */
export function OpenConsultationTrigger({ children, className }: OpenConsultationTriggerProps) {
  const open = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-consultation"));
    }
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className={className}
    >
      {children}
    </button>
  );
}
