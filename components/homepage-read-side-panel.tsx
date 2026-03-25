"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type HomepageReadSidePanelProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  /** Optional id for aria-labelledby */
  titleId?: string;
};

/**
 * Homepage-only: right-hand read panel with backdrop. Content remains in the React tree when open;
 * pair with always-in-DOM SEO copy elsewhere as needed.
 */
export function HomepageReadSidePanel({
  open,
  onClose,
  title,
  children,
  titleId = "homepage-read-panel-title",
}: HomepageReadSidePanelProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop: main page content stays in DOM underneath */}
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Close panel"
      />

      {/* Panel: ~75% viewport on mobile; ~40–50% from sm and up. */}
      <aside
        role="dialog"
        aria-labelledby={titleId}
        className="relative z-[61] h-full w-[75vw] max-w-[75vw] min-w-0 sm:w-1/2 sm:min-w-[40vw] sm:max-w-[50vw] bg-background shadow-2xl border-l border-border flex flex-col"
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-border shrink-0">
          <h2 id={titleId} className="text-lg sm:text-xl font-semibold text-foreground leading-snug pr-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A] focus-visible:ring-offset-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 text-sm md:text-base text-muted-foreground leading-relaxed">
          {children}
        </div>
      </aside>
    </div>,
    document.body
  );
}
