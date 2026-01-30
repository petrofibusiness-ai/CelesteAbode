"use client";

import { useState, useEffect } from "react";
import { ConsultationPopup } from "@/components/consultation-popup";

export function ConsultationModalGlobal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-consultation", open);
    return () => window.removeEventListener("open-consultation", open);
  }, []);

  return <ConsultationPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
