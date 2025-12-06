import Script from "next/script";

// Homepage-specific Service Schema
export function HomepageServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Luxury Real Estate Consulting",
    provider: {
      "@type": "RealEstateAgent",
      name: "Celeste Abode",
      url: "https://www.celesteabode.com",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Noida",
      },
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "City",
        name: "Greater Noida",
      },
      {
        "@type": "City",
        name: "Delhi",
      },
      {
        "@type": "City",
        name: "Ghaziabad",
      },
    ],
    description: "Strategic property investment advisory with data-driven intelligence, RERA compliance, and bespoke lifestyle curation for high-value investments in NCR region.",
    offers: {
      "@type": "Offer",
      priceRange: "₹50 Lakhs - ₹5 Crores",
      priceCurrency: "INR",
    },
  };

  return (
    <Script
      id="homepage-service-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList Schema for Services
export function HomepageServicesListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Celeste Abode Real Estate Services",
    description: "Comprehensive luxury real estate consulting services in NCR",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Bespoke Lifestyle Curation",
          description: "AI-powered intelligence and profiling to match your lifestyle with verified luxury projects",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Data-Driven ROI Strategy",
          description: "Custom investment plans aligned with financial goals and risk appetite",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "End-to-End Transaction Security",
          description: "Complete transaction support from due diligence through RERA verification",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Exclusive Signature Residences",
          description: "Access to vetted premium properties tailored to design preferences",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "Global NRI Client Solutions",
          description: "Seamless digital processes for regulatory requirements and remote property management",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "Advanced Digital Clarity",
          description: "Interactive dashboards and transparent insights for informed property decisions",
        },
      },
    ],
  };

  return (
    <Script
      id="homepage-services-list-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// AggregateRating Schema (if you have reviews)
export function AggregateRatingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "RealEstateAgent",
      name: "Celeste Abode",
    },
    ratingValue: "4.8",
    reviewCount: "2500",
    bestRating: "5",
    worstRating: "1",
  };

  return (
    <Script
      id="aggregate-rating-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

