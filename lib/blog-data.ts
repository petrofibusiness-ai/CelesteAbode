export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured: boolean;
  views?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  /** Taller hero (full viewport) for flagship project stories */
  heroFullscreen?: boolean;
};

/** Canonical URL path for the Sobha Rivana article (use this constant when linking from other pages). */
export const SOBHA_RIVANA_BLOG_PATH = "/blog/sobha-rivana-greater-noida-west" as const;

/** Sobha Rivana elevation / arrival hero (replaces legacy entrance.jpg everywhere). */
export const SOBHA_RIVANA_HERO_IMAGE =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/Elevation-Evening-View.webp" as const;

/** UP RERA project registration id; verify on up-rera.in if the project record updates. */
export const SOBHA_RIVANA_RERA_FULL = "UPRERAPRJ313638" as const;

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Is Investing in Noida Property a Smart Choice in 2026? Expert Guide",
    slug: "is-noida-safe-to-buy-property-2026",
    excerpt:
      "A clear-eyed look at Noida's real estate in 2026: market strength, infrastructure, RERA safety, and how to invest with confidence.",
    category: "Market Analysis",
    readTime: "8 min read",
    date: "January 25, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/is_noida_still_a_safe_place.png",
    featured: true,
    views: "1.2K",
    metaTitle: "Is Investing in Noida Property a Smart Choice in 2026? Expert Guide",
    metaDescription: "Planning to buy property in Noida in 2026? Explore safety, infrastructure growth, and market trends to make a smart investment. Connect with experts today.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/is_noida_still_a_safe_place.png",
    ogImageAlt: "Is Investing in Noida Property a Smart Choice in 2026",
  },
  {
    id: 2,
    title: "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot",
    slug: "yamuna-expressway-growth-corridor-delhi-ncr",
    excerpt:
      "Explore why Yamuna Expressway is emerging as Delhi NCR's fastest-growing real estate corridor. Discover investment potential and connect with property experts today.",
    category: "Location Intelligence",
    readTime: "9 min read",
    date: "January 29, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/yamuna_expressway.png",
    featured: true,
    views: "980",
    metaTitle: "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot",
    metaDescription: "Explore why Yamuna Expressway is emerging as Delhi NCR's fastest-growing real estate corridor. Discover investment potential and connect with property experts today.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/yamuna_expressway.png",
    ogImageAlt: "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot",
  },
  {
    id: 3,
    title: "Noida or Greater Noida: Which is Better for Property Investment in 2026?",
    slug: "noida-vs-greater-noida-investment-2026",
    excerpt:
      "A clear comparison of Noida and Greater Noida: prices, connectivity, infrastructure, and where to invest for the next 3–5 years.",
    category: "Market Analysis",
    readTime: "10 min read",
    date: "February 3, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/noida_vs_greater_noida.png",
    featured: true,
    views: "1.1K",
    heroFullscreen: true,
    metaTitle: "Noida or Greater Noida: Which is Better for Property Investment in 2026?",
    metaDescription: "Compare Noida and Greater Noida property investment opportunities in 2026. Discover prices, infrastructure growth, and ROI potential before buying property.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/noida_vs_greater_noida.png",
    ogImageAlt: "Noida or Greater Noida: Which is Better for Property Investment in 2026?",
  },
  {
    id: 4,
    title: "Jewar Airport Impact on NCR Real Estate: Where to Invest in 2026",
    slug: "jewar-airport-ncr-property-buyers-2026",
    excerpt:
      "Price movement, top micro-markets, and how to enter early without overpaying.",
    category: "Location Intelligence",
    readTime: "9 min read",
    date: "February 9, 2026",
    image: "/YAMUNA.avif",
    featured: true,
    views: "890",
    metaTitle: "Jewar Airport Impact on NCR Real Estate: Where to Invest in 2026",
    metaDescription: "Price movement, top micro-markets, and how to enter early without overpaying.",
    ogImage: "/YAMUNA.avif",
    ogImageAlt: "Jewar Airport Impact on NCR Real Estate: Where to Invest in 2026",
  },
  {
    id: 5,
    title: "Forest Walk Villas Ghaziabad: Luxury 4BHK Villa Living on NH-24",
    slug: "forest-walk-villa-ghaziabad-luxury-living-2026",
    excerpt:
      "Discover why Forest Walk Villas on NH24 Ghaziabad is one of the most sought-after places to live in 2026 with unmatched nature, luxury amenities and excellent connectivity.",
    category: "Project Spotlight",
    readTime: "11 min read",
    date: "January 30, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/forest-walk-villa_hero.avif",
    featured: true,
    views: "760",
    heroFullscreen: true,
    metaTitle: "Forest Walk Villa Ghaziabad | Luxury 4BHK Villa Living on NH-24",
    metaDescription: "Explore Forest Walk Villa in Ghaziabad, a luxury 4BHK villa township on NH-24 with premium amenities and green living. Discover pricing and connect with property experts today.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/forest-walk-villa_hero.avif",
    ogImageAlt: "Forest Walk Villa Ghaziabad | Luxury 4BHK Villa Living on NH-24",
  },
  {
    id: 6,
    title: "Top Upcoming Luxury Real Estate Projects in Noida & Greater Noida for 2026",
    slug: "upcoming-luxury-projects-noida-greater-noida-2026",
    excerpt:
      "A simple, fact‑checked guide to the key upcoming luxury projects in Noida and Greater Noida, how their micro‑markets differ, and what to check before you buy.",
    category: "Project Shortlist",
    readTime: "11 min read",
    date: "March 16, 2026",
    image: "/hero-.avif",
    featured: true,
    views: "0",
    heroFullscreen: true,
    metaTitle: "Upcoming Luxury Projects in Noida & Greater Noida (2026) | Celeste Abode",
    metaDescription:
      "Explore upcoming luxury real estate projects in Noida and Greater Noida, compare key micro‑markets, and see how premium launches stack up for 2026.",
    ogImage: "/hero-.avif",
    ogImageAlt: "Upcoming luxury projects in Noida and Greater Noida",
  },
  {
    id: 7,
    title: "Sobha Rivana Greater Noida West: RERA, Price, Floor Plans & Location (Sector 1)",
    slug: "sobha-rivana-greater-noida-west",
    excerpt:
      "Sobha Limited's flagship launch in Sector 1, Greater Noida West. We unpack UP RERA, connectivity, 2/3/4 BHK, amenities, and the price band buyers are hearing in early 2026.",
    category: "Project Spotlight",
    readTime: "9 min read",
    date: "March 22, 2026",
    image: SOBHA_RIVANA_HERO_IMAGE,
    featured: true,
    views: "0",
    heroFullscreen: true,
    metaTitle: "Sobha Rivana Greater Noida West | RERA, Price, 2/3/4 BHK Floor Plans",
    metaDescription:
      "Discover Sobha Rivana, a new luxury residential launch by SOBHA Group in Sector 1 Greater Noida West with premium apartments, modern amenities, and prime location.",
    ogImage: SOBHA_RIVANA_HERO_IMAGE,
    ogImageAlt: "Sobha Rivana Greater Noida West Sector 1 apartments RERA",
  },
  {
    id: 8,
    title: "3 BHK Flats in Greater Noida – Top Projects, Best Prices & Smart Investment Picks",
    slug: "3bhk-flats-in-greater-noida",
    excerpt:
      "Discover handpicked 3 BHK apartments across Greater Noida's best locations. Compare pricing, builders, and availability before booking your site visit.",
    category: "Buyer Guide",
    readTime: "12 min read",
    date: "March 28, 2026",
    image:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/metro_or_night_view.webp",
    featured: true,
    views: "0",
    heroFullscreen: true,
    metaTitle: "3BHK Flats in Greater Noida | Price, Projects & Investment Guide",
    metaDescription:
      "Explore 3BHK flats in Greater Noida West with price trends, top projects, best sectors, investment guide, and availability in Noida Extension & Greater Noida West.",
    ogImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/metro_or_night_view.webp",
    ogImageAlt:
      "Greater Noida NCR at night with metro and city lights—3 BHK flats and connectivity",
  },
  {
    id: 9,
    title: "Panchsheel Greens 2 Greater Noida West Price & Location Info",
    slug: "panchsheel-greens-2-greater-noida-west",
    excerpt:
      "Explore Panchsheel Greens 2 Greater Noida West price, floor plan, photos, resale flats, location map, nearest metro, pin code and units in Noida Extension area.",
    category: "Project Spotlight",
    readTime: "8 min read",
    date: "March 30, 2026",
    image:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/panchsheel-greens-ii/images/Screenshot%202026-04-22%20at%203.12.42%E2%80%AFAM.png",
    featured: true,
    views: "0",
    heroFullscreen: true,
    metaTitle: "Panchsheel Greens 2 Greater Noida West Price & Location Info",
    metaDescription:
      "Explore Panchsheel Greens 2 Greater Noida West price, floor plan, photos, resale flats, location map, nearest metro, pin code and units in Noida Extension area.",
    ogImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/panchsheel-greens-ii/images/Screenshot%202026-04-22%20at%203.12.42%E2%80%AFAM.png",
    ogImageAlt:
      "Panchsheel Greens 2 Greater Noida West: residential towers, landscaped walkway, and central plaza",
  },
  {
    id: 10,
    title: "Best Locations to Buy Flats in Greater Noida for Future Growth (2026)",
    slug: "greater-noida-best-locations-flats-2026",
    excerpt:
      "Jewar is live, metro lines are extending, and Greater Noida still offers a value base versus core Noida. Here are the sectors that make sense for end users, investors, and rental buyers in 2026—plus what to verify before you book.",
    category: "Location Intelligence",
    readTime: "12 min read",
    date: "April 28, 2026",
    image:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/greater_noida_west_photography.webp",
    featured: true,
    views: "0",
    heroFullscreen: true,
    metaTitle: "Best Locations to Buy Flats in Greater Noida for Future Growth (2026)",
    metaDescription:
      "Top sectors in Greater Noida for 2026: Greater Noida West, Yamuna Expressway, Zeta, Techzone, Knowledge Park. Jewar airport, price bands, 3 BHK reality, and what to check before you buy.",
    ogImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/greater_noida_west_photography.webp",
    ogImageAlt: "Greater Noida West: residential towers and road grid from above",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== currentSlug);
  if (currentSlug === "noida-vs-greater-noida-investment-2026") {
    const prioritySlugs = [
      "greater-noida-best-locations-flats-2026",
      "jewar-airport-ncr-property-buyers-2026",
      "3bhk-flats-in-greater-noida",
      "yamuna-expressway-growth-corridor-delhi-ncr",
    ];
    const picked: BlogPost[] = [];
    for (const s of prioritySlugs) {
      const post = others.find((p) => p.slug === s);
      if (post) picked.push(post);
    }
    const rest = others.filter((p) => !prioritySlugs.includes(p.slug));
    return [...picked, ...rest].slice(0, limit);
  }
  if (currentSlug === "3bhk-flats-in-greater-noida") {
    const prioritySlugs = [
      "greater-noida-best-locations-flats-2026",
      "panchsheel-greens-2-greater-noida-west",
      "noida-vs-greater-noida-investment-2026",
      "upcoming-luxury-projects-noida-greater-noida-2026",
      "sobha-rivana-greater-noida-west",
      "jewar-airport-ncr-property-buyers-2026",
    ];
    const picked: BlogPost[] = [];
    for (const s of prioritySlugs) {
      const post = others.find((p) => p.slug === s);
      if (post) picked.push(post);
    }
    const rest = others.filter((p) => !prioritySlugs.includes(p.slug));
    return [...picked, ...rest].slice(0, limit);
  }
  if (currentSlug === "sobha-rivana-greater-noida-west") {
    const prioritySlugs = [
      "panchsheel-greens-2-greater-noida-west",
      "upcoming-luxury-projects-noida-greater-noida-2026",
      "noida-vs-greater-noida-investment-2026",
      "jewar-airport-ncr-property-buyers-2026",
      "yamuna-expressway-growth-corridor-delhi-ncr",
    ];
    const picked: BlogPost[] = [];
    for (const s of prioritySlugs) {
      const post = others.find((p) => p.slug === s);
      if (post) picked.push(post);
    }
    const rest = others.filter((p) => !prioritySlugs.includes(p.slug));
    return [...picked, ...rest].slice(0, limit);
  }
  if (currentSlug === "panchsheel-greens-2-greater-noida-west") {
    const prioritySlugs = [
      "sobha-rivana-greater-noida-west",
      "3bhk-flats-in-greater-noida",
      "noida-vs-greater-noida-investment-2026",
      "upcoming-luxury-projects-noida-greater-noida-2026",
    ];
    const picked: BlogPost[] = [];
    for (const s of prioritySlugs) {
      const post = others.find((p) => p.slug === s);
      if (post) picked.push(post);
    }
    const rest = others.filter((p) => !prioritySlugs.includes(p.slug));
    return [...picked, ...rest].slice(0, limit);
  }
  if (currentSlug === "greater-noida-best-locations-flats-2026") {
    const prioritySlugs = [
      "noida-vs-greater-noida-investment-2026",
      "jewar-airport-ncr-property-buyers-2026",
      "yamuna-expressway-growth-corridor-delhi-ncr",
      "3bhk-flats-in-greater-noida",
      "panchsheel-greens-2-greater-noida-west",
    ];
    const picked: BlogPost[] = [];
    for (const s of prioritySlugs) {
      const post = others.find((p) => p.slug === s);
      if (post) picked.push(post);
    }
    const rest = others.filter((p) => !prioritySlugs.includes(p.slug));
    return [...picked, ...rest].slice(0, limit);
  }
  return others.slice(0, limit);
}
