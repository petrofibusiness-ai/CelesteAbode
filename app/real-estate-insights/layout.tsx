import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Vault - Property Terms, FAQs & Investment Guide",
  description:
    "Master property buying with clear real estate terms, FAQs, legal basics, and investment frameworks—built to help buyers and investors make safer, smarter decisions.",
  keywords: [
    "real estate terms glossary",
    "property buying FAQ",
    "real estate investment guide India",
    "RERA guide for buyers",
    "property due diligence basics",
  ],
  openGraph: {
    title: "Real Estate Vault - Property Terms, FAQs & Investment Guide",
    description:
      "Learn real estate terms, RERA basics, due-diligence checklists, and practical FAQs to make safer property decisions in Delhi NCR.",
    url: "https://www.celesteabode.com/real-estate-insights",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/vaulthero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Vault - Real Estate Knowledge Base",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Vault - Property Terms, FAQs & Investment Guide",
    description:
      "Get practical real estate FAQs, legal basics, and investment explainers to make confident property decisions.",
    images: ["/vaulthero.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/real-estate-insights",
  },
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

