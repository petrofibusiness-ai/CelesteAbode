import type { Metadata } from "next";
import { BreadcrumbSchema, BlogPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Real Estate Insights & Market Analysis | Delhi NCR",
  description:
    "Expert insights on real estate markets, regulations, and investment trends across Delhi NCR—designed to support informed property decisions.",
  keywords: [
    "real estate blog Delhi NCR",
    "Noida property insights",
    "Greater Noida market analysis",
    "Yamuna Expressway investment insights",
    "RERA and property buying guidance",
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
          logo: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
        }}
      />
      {children}
    </>
  );
}
