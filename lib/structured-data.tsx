import Script from "next/script";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.celesteabode.com/#organization",
    name: "Celeste Abode",
    legalName: "Celeste Abode Private Limited",
    alternateName: ["Celeste Abode", "Celeste Abode Real Estate"],
    url: "https://www.celesteabode.com",
    logo: "https://www.celesteabode.com/logoceleste.avif",
    image: "https://www.celesteabode.com/logoceleste.avif",
    slogan: "The Convergence of Data Intelligence and Luxury Living",
    description:
      "Independent real estate advisory providing compliant, data-backed property guidance across Delhi NCR. We help buyers, investors, and NRIs make informed property decisions in Noida, Greater Noida, and Yamuna Expressway through RERA compliance, market intelligence, and transparent advisory services.",
    foundingDate: "2024",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10-50"
    },
    knowsAbout: [
      "Real Estate Advisory",
      "Property Investment Advisory",
      "Data-Driven Property Intelligence",
      "RERA Compliance",
      "Real Estate Market Analysis",
      "Property ROI Strategy",
      "NRI Property Services",
      "Delhi NCR Real Estate"
    ],
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
    areaServed: [
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Greater Noida" },
      { "@type": "City", "name": "Gurugram" },
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Ghaziabad" },
      { "@type": "AdministrativeArea", "name": "Yamuna Expressway" },
      { "@type": "AdministrativeArea", "name": "Noida Expressway" }
    ],
    priceRange: "₹50 Lakhs - ₹5 Crores",
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
  price?: string;
  priceCurrency?: string;
  address: string;
  developer: string;
  reraId?: string;
  unitTypes: string[];
  area: string;
  status: string;
  url: string;
}) {
  // Prepare offers object - only include price if it exists
  const offers: any = {
    "@type": "Offer",
    availability: status === "Ready to Move" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    url: url,
  };

  // Only add price if it exists and is not empty
  if (price && price.trim() !== "") {
    offers.price = price.replace(/[^\d.]/g, "");
    offers.priceCurrency = priceCurrency;
  }

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
    offers: offers,
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
    description: "Celeste Abode - Premium luxury real estate advisory in NCR. Real estate investment advisory services, property portfolio advisory, and high-value property investment advisory. Expert real estate consultants in Noida, Greater Noida, Gurugram, Yamuna Expressway, and Delhi NCR.",
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
      "Luxury Real Estate Advisory",
      "Real Estate Investment Advisory Services",
      "Property Portfolio Advisory Services",
      "Real Estate Transaction Consulting",
      "End-to-End Property Advisory",
      "Personalized Real Estate Advisory",
      "Strategic Property Investment Planning",
      "Residential Real Estate Advisory",
      "NRI Real Estate Advisory",
      "High-Value Property Investment Advisory",
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

// WebSite Schema
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Celeste Abode",
    alternateName: "Celeste Abode Real Estate Consulting",
    url: "https://www.celesteabode.com",
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      logo: {
        "@type": "ImageObject",
        url: "https://www.celesteabode.com/logoceleste.avif"
      }
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

// Brand Schema for enhanced LLM recognition
export function BrandSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "Celeste Abode",
    alternateName: ["Celeste Abode Real Estate", "Celeste Abode Private Limited"],
    slogan: "The Convergence of Data Intelligence and Luxury Living",
    description: "Celeste Abode - Premium luxury real estate advisory brand specializing in real estate investment advisory services, property portfolio advisory, high-value property investment advisory, and personalized real estate advisory in Delhi NCR.",
    logo: "https://www.celesteabode.com/logoceleste.avif",
    url: "https://www.celesteabode.com",
    sameAs: [
      "https://www.facebook.com/celesteabode",
      "https://www.linkedin.com/company/celesteabode",
      "https://twitter.com/celesteabode",
      "https://www.instagram.com/celesteabode"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <Script
      id="brand-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList Schema for Properties Collection Page
export function ItemListSchema({
  items,
  name,
  description,
  url,
}: {
  items: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
  }>;
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    url: url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        url: item.url,
        ...(item.image && {
          image: item.image.startsWith("http") ? item.image : `https://www.celesteabode.com${item.image}`,
        }),
        ...(item.description && { description: item.description }),
      },
    })),
  };

  return (
    <Script
      id="itemlist-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// CollectionPage Schema for Properties Page
export function CollectionPageSchema({
  name,
  description,
  url,
  image,
  mainEntity,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  mainEntity: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: name,
    description: description,
    url: url,
    image: image.startsWith("http") ? image : `https://www.celesteabode.com${image}`,
    mainEntity: {
      "@id": mainEntity,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.celesteabode.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Properties",
          item: "https://www.celesteabode.com/properties",
        },
      ],
    },
  };

  return (
    <Script
      id="collectionpage-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

