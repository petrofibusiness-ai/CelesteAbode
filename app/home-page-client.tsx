"use client"

import { IntentPayload } from "@/lib/analytics"
import dynamic from "next/dynamic"

// Client-side interactive component wrapper
const SegmentedEntry = dynamic(
  () => import("@/components/segmented-entry/SegmentedEntry").then(mod => ({ default: mod.SegmentedEntry })),
  { ssr: false, loading: () => <div className="min-h-[300px] md:min-h-[400px]" /> }
)

export function HomePageClient() {
  const handleIntentSubmit = (payload: IntentPayload) => {
    console.log('Intent submitted:', payload)
    // TODO: Send to backend/CRM
  }

  const handleWhatsAppClick = (payload: IntentPayload) => {
    console.log('WhatsApp clicked:', payload)
    // TODO: Open WhatsApp with pre-filled message
  }

  return (
    <SegmentedEntry 
      onSubmit={handleIntentSubmit}
      onWhatsApp={handleWhatsAppClick}
      defaultMicroMarkets={["Noida Expressway", "Yamuna Expressway", "Gaur City"]}
    />
  )
}
