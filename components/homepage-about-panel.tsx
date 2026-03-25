"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { HomepageReadSidePanel } from "@/components/homepage-read-side-panel";
import {
  HomepageAboutPanelBody,
  homepageAboutPanelTitle,
} from "@/components/homepage-about-panel-body";

type AboutPanelContextValue = {
  openAboutPanel: () => void;
};

const HomepageAboutPanelContext = createContext<AboutPanelContextValue | null>(null);

export function useHomepageAboutPanel() {
  const ctx = useContext(HomepageAboutPanelContext);
  if (!ctx) {
    throw new Error("useHomepageAboutPanel must be used within HomepageAboutPanelProvider");
  }
  return ctx;
}

export function HomepageAboutPanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openAboutPanel = useCallback(() => setOpen(true), []);

  const value = useMemo(() => ({ openAboutPanel }), [openAboutPanel]);

  return (
    <HomepageAboutPanelContext.Provider value={value}>
      {children}
      <HomepageReadSidePanel
        open={open}
        onClose={() => setOpen(false)}
        title={homepageAboutPanelTitle}
        titleId="homepage-about-panel-title"
      >
        <HomepageAboutPanelBody />
      </HomepageReadSidePanel>
    </HomepageAboutPanelContext.Provider>
  );
}
