import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plots in Greater Noida – Premium Land for Investment & Living | Celeste Abode",
  description:
    "Explore verified plots in Greater Noida West, Knowledge Park, and the Yamuna corridor. Compare entry price, infra outlook, and long-term upside before investing.",
  keywords: [
    // Location-Focused Keywords
    "real estate consultants in Greater Noida",
    "land investment in Greater Noida",
    "plots for sale Greater Noida",
    "NCR real estate experts",
    "luxury property consultants Delhi NCR",
    "property investment Delhi NCR",
    "premium real estate advisory Greater Noida",
    "Greater Noida property consultants",
    "Delhi NCR property investment advisors",
    
    // Plot-Specific Keywords
    "plots in Greater Noida",
    "residential plots Greater Noida",
    "investment plots Greater Noida",
    "RERA approved plots Greater Noida",
    "plots Yamuna Expressway",
    "plots Greater Noida West",
    "land for sale Greater Noida",
    "buy plot Greater Noida",
    "plot investment Greater Noida",
  ],
  openGraph: {
    title: "Plots in Greater Noida – Premium Land for Investment & Living | Celeste Abode",
    description:
      "Explore verified plots in Greater Noida West, Knowledge Park, and the Yamuna corridor. Compare entry price, infra outlook, and long-term upside before investing.",
    url: "https://www.celesteabode.com/plots-in-greater-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plots in Greater Noida – Premium Land for Investment & Living",
    description:
      "Explore verified plots in Greater Noida West, Knowledge Park, and the Yamuna corridor. Compare entry price, infra outlook, and long-term upside before investing.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/plots-in-greater-noida",
  },
};

export default function PlotsInGreaterNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
