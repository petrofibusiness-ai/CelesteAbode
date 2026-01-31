"use client";

import { useCallback } from "react";

interface ScheduleConsultationCardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a card (or any content) and opens the global schedule consultation popup on click.
 * Uses the same "open-consultation" event as OpenConsultationTrigger / footer CTA.
 */
export function ScheduleConsultationCardWrapper({
  children,
  className,
}: ScheduleConsultationCardWrapperProps) {
  const openConsultation = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-consultation"));
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) return;
      openConsultation();
    },
    [openConsultation]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openConsultation();
      }
    },
    [openConsultation]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A] focus-visible:ring-offset-2 rounded-2xl ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
