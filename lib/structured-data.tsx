import Script from "next/script";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://www.celesteabode.com/#organization",
    name: "Celeste Abode",
    url: "https://www.celesteabode.com",
    logo: "https://www.celesteabode.com/logoceleste.avif",
    image: "https://www.celesteabode.com/logoceleste.avif",
    description:
      "Premium luxury real estate consulting in NCR. Strategic property investment advisory with data-driven intelligence, RERA compliance, and bespoke lifestyle curation. Expert guidance for high-value investments in Noida, Gurugram, Yamuna Expressway, Greater Noida, and Delhi NCR.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "716, Tower A, Ithum",
      addressLocality: "Sector 62",
      addressRegion: "Noida",
      postalCode: "201309",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9818735258",
      contactType: "Customer Service",
      areaServed: ["IN"],
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/celesteabode",
      "https://www.linkedin.com/company/celesteabode",
      "https://twitter.com/celesteabode",
      "https://www.instagram.com/celesteabode",
    ],
    areaServed: {
      "@type": "City",
      name: ["Noida", "Greater Noida", "Gurugram", "Delhi", "Ghaziabad", "Yamuna Expressway", "Noida Expressway"],
    },
    priceRange: "₹50 Lakhs - ₹5 Crores",
    serviceType: [
      "Luxury Real Estate Consulting",
      "Strategic Property Investment Advisory",
      "Data-Driven Property Intelligence",
      "RERA Compliant Property Advisory",
      "Bespoke Lifestyle Curation",
      "Investment Security Services",
      "NRI Property Services",
      "End-to-End Transaction Security",
      "Property ROI Strategy",
      "Signature Residences Advisory",
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product/Property Schema
export function PropertySchema({
  name,
  description,
  image,
  price,
  priceCurrency = "INR",
  address,
  developer,
  reraId,
  unitTypes,
  area,
  status,
  url,
}: {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency?: string;
  address: string;
  developer: string;
  reraId?: string;
  unitTypes: string[];
  area: string;
  status: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image.startsWith("http") ? image : `https://www.celesteabode.com${image}`,
    brand: {
      "@type": "Brand",
      name: developer,
    },
    offers: {
      "@type": "Offer",
      price: price.replace(/[^\d.]/g, ""),
      priceCurrency: priceCurrency,
      availability: status === "Ready to Move" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: url,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Location",
        value: address,
      },
      {
        "@type": "PropertyValue",
        name: "Developer",
        value: developer,
      },
      ...(reraId
        ? [
            {
              "@type": "PropertyValue",
              name: "RERA ID",
              value: reraId,
            },
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Unit Types",
        value: unitTypes.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Area",
        value: area,
      },
      {
        "@type": "PropertyValue",
        name: "Status",
        value: status,
      },
    ],
  };

  return (
    <Script
      id="property-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQPage Schema
export function FAQPageSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Celeste Abode",
    image: "https://www.celesteabode.com/logoceleste.avif",
    "@id": "https://www.celesteabode.com",
    url: "https://www.celesteabode.com",
    telephone: "+91-9818735258",
    priceRange: "₹50 Lakhs - ₹5 Crores",
    description: "Premium luxury real estate consulting in NCR. Strategic property investment advisory with data-driven intelligence, RERA compliance, and bespoke lifestyle curation for high-value investments in Noida, Gurugram, Yamuna Expressway, and Greater Noida.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "716, Tower A, Ithum",
      addressLocality: "Sector 62",
      addressRegion: "Uttar Pradesh",
      postalCode: "201309",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5355,
      longitude: 77.3910,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Noida",
      },
      {
        "@type": "City",
        name: "Greater Noida",
      },
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "City",
        name: "Delhi",
      },
      {
        "@type": "City",
        name: "Ghaziabad",
      },
      {
        "@type": "City",
        name: "Yamuna Expressway",
      },
    ],
    serviceType: [
      "Luxury Real Estate Consulting",
      "Strategic Property Investment Advisory",
      "Data-Driven Property Intelligence",
      "RERA Compliant Property Advisory",
      "Bespoke Lifestyle Curation",
      "Investment Security Services",
      "NRI Property Services",
      "End-to-End Transaction Security",
    ],
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Celeste Abode",
    url: "https://www.celesteabode.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.celesteabode.com/projects?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

