import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villa in Noida Extension – Elegant Living & Smart Investment | Celeste Abode",
  description:
    "Discover RERA-verified villas in Noida Extension (Greater Noida West). Compare Techzone and Bisrakh options, pricing bands, and connectivity before you buy.",
  keywords: [
    // Location-Focused Keywords
    "real estate consultants in Noida",
    "luxury homes in Noida Extension",
    "properties in Greater Noida West",
    "NCR real estate experts",
    "luxury property consultants Delhi NCR",
    "property investment Delhi NCR",
    "premium real estate advisory Noida Extension",
    "Noida Extension property consultants",
    "Delhi NCR property investment advisors",
    
    // Villa-Specific Keywords
    "villa in Noida Extension",
    "luxury villas Noida Extension",
    "villas for sale Noida Extension",
    "premium villas Noida Extension",
    "villas in Greater Noida West",
    "Noida Extension villas",
    "RERA approved villas Noida Extension",
    "buy villa Noida Extension",
    "villa investment Noida Extension",
  ],
  openGraph: {
    title: "Villa in Noida Extension – Elegant Living & Smart Investment | Celeste Abode",
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
