import type { Metadata } from "next";
import { BreadcrumbSchema, BlogPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Real Estate Insights & Market Analysis | Delhi NCR",
  description:
    "Expert insights on real estate markets, regulations, and investment trends across Delhi NCR—designed to support informed property decisions.",
  keywords: [
    "real estate blog",
    "Delhi NCR property insights",
    "real estate market analysis",
    "property investment guide",
    "Noida real estate news",
    "Greater Noida property updates",
    "Yamuna Expressway investment",
    "RERA compliance guide",
    "NRI property investment",
    "real estate legal advice",
    "property buying tips",
    "real estate consulting blog",
    "Delhi NCR property trends",
    "real estate advisory insights",
    "property market intelligence",
  ],
  authors: [{ name: "Celeste Abode Advisory Team" }],
  creator: "Celeste Abode",
  publisher: "Celeste Abode",
  openGraph: {
    title: "Real Estate Insights & Market Analysis | Delhi NCR",
    description:
      "Expert insights on real estate markets, regulations, and investment trends across Delhi NCR—designed to support informed property decisions.",
    url: "https://www.celesteabode.com/blog",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/propertyhero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Real Estate Blog - Delhi NCR Property Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Insights & Market Analysis | Delhi NCR",
    description:
      "Expert insights on real estate markets, regulations, and investment trends across Delhi NCR—designed to support informed property decisions.",
    images: ["/propertyhero.avif"],
    creator: "@celesteabode",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Real Estate",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbItems = [
    { name: "Home", url: "https://www.celesteabode.com/" },
    { name: "Blog", url: "https://www.celesteabode.com/blog" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogPageSchema
        name="Celeste Abode Real Estate Blog"
        description="Expert insights on real estate markets, regulations, and investment trends across Delhi NCR—designed to support informed property decisions."
        url="https://www.celesteabode.com/blog"
        publisher={{
          name: "Celeste Abode",
          logo: "https://www.celesteabode.com/logoceleste.avif",
        }}
      />
      {children}
    </>
  );
}
