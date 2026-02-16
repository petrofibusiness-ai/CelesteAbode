import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plots in Greater Noida – Premium Land for Investment & Living",
  description:
    "Explore verified plots in Greater Noida West, Knowledge Park, and the Yamuna corridor. Compare entry price, infra outlook, and long-term upside before investing.",
  keywords: [
    "plots in Greater Noida",
    "residential plots Greater Noida",
    "RERA approved plots Greater Noida",
    "plot investment Greater Noida",
    "Yamuna corridor plots",
  ],
  openGraph: {
    title: "Plots in Greater Noida – Premium Land for Investment & Living",
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
