import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plots in Noida – Invest in Space, Build Your Dream",
  description:
    "Compare RERA-approved plots in Noida across Sector 150, 162, and 117. Get clear insights on pricing, legal checks, and long-term investment potential.",
  keywords: [
    "plots in Noida",
    "residential plots Noida",
    "RERA approved plots Noida",
    "plot investment Noida",
    "land for sale Noida sectors",
  ],
  openGraph: {
    title: "Plots in Noida – Invest in Space, Build Your Dream",
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
