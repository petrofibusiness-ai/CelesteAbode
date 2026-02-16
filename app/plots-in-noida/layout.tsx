import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plots in Noida – Invest in Space, Build Your Dream | Celeste Abode",
  description:
    "Compare RERA-approved plots in Noida across Sector 150, 162, and 117. Get clear insights on pricing, legal checks, and long-term investment potential.",
  keywords: [
    // Location-Focused Keywords
    "real estate consultants in Noida",
    "land investment in Noida",
    "plots for sale Noida",
    "NCR real estate experts",
    "luxury property consultants Delhi NCR",
    "property investment Delhi NCR",
    "premium real estate advisory Noida",
    "Noida property consultants",
    "Delhi NCR property investment advisors",
    
    // Plot-Specific Keywords
    "plots in Noida",
    "residential plots Noida",
    "investment plots Noida",
    "RERA approved plots Noida",
    "plots Noida Expressway",
    "plots Sector 150 Noida",
    "land for sale Noida",
    "buy plot Noida",
    "plot investment Noida",
  ],
  openGraph: {
    title: "Plots in Noida – Invest in Space, Build Your Dream | Celeste Abode",
    description:
      "Compare RERA-approved plots in Noida across Sector 150, 162, and 117. Get clear insights on pricing, legal checks, and long-term investment potential.",
    url: "https://www.celesteabode.com/plots-in-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plots in Noida – Invest in Space, Build Your Dream",
    description:
      "Compare RERA-approved plots in Noida across Sector 150, 162, and 117. Get clear insights on pricing, legal checks, and long-term investment potential.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/plots-in-noida",
  },
};

export default function PlotsInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
