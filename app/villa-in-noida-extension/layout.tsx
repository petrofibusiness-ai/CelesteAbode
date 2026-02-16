import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villa in Noida Extension – Elegant Living & Smart Investment",
  description:
    "Discover RERA-verified villas in Noida Extension (Greater Noida West). Compare Techzone and Bisrakh options, pricing bands, and connectivity before you buy.",
  keywords: [
    "villa in Noida Extension",
    "villas in Greater Noida West",
    "Techzone villas",
    "Bisrakh villas",
    "RERA verified villas Noida Extension",
  ],
  openGraph: {
    title: "Villa in Noida Extension – Elegant Living & Smart Investment",
    description:
      "Discover RERA-verified villas in Noida Extension (Greater Noida West). Compare Techzone and Bisrakh options, pricing bands, and connectivity before you buy.",
    url: "https://www.celesteabode.com/villa-in-noida-extension",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa in Noida Extension – Elegant Living & Smart Investment",
    description:
      "Discover RERA-verified villas in Noida Extension (Greater Noida West). Compare Techzone and Bisrakh options, pricing bands, and connectivity before you buy.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/villa-in-noida-extension",
  },
};

export default function VillaInNoidaExtensionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
