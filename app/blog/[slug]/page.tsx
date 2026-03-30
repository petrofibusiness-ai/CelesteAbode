import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { ArticleSchema, BreadcrumbSchema, FAQPageSchema } from "@/lib/structured-data";
import { ArticleLeadForm } from "./article-lead-form";
import { NoidaSafe2026Content } from "./noida-safe-2026-content";
import { YamunaExpresswayContent } from "./yamuna-expressway-content";
import { NoidaVsGreaterNoidaContent } from "./noida-vs-greater-noida-content";
import { JewarAirportNcrProperty2026Content } from "./jewar-airport-ncr-property-2026-content";
import { ForestWalkVillaGhaziabadContent } from "./forest-walk-villa-ghaziabad-content";
import { UpcomingLuxuryProjectsNoidaGreaterNoidaContent } from "./upcoming-luxury-projects-noida-greater-noida-content";
import {
  SobhaRivanaGreaterNoidaWestContent,
  sobhaRivanaFaqSchemaItems,
} from "./sobha-rivana-greater-noida-west-content";
import {
  ThreeBhkFlatsGreaterNoida2026Content,
  threeBhkGreaterNoidaWestFaqSchemaItems,
} from "./three-bhk-flats-greater-noida-2026-content";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ARTICLE_CONTENT: Record<string, ComponentType> = {
  "is-noida-safe-to-buy-property-2026": NoidaSafe2026Content,
  "yamuna-expressway-growth-corridor-delhi-ncr": YamunaExpresswayContent,
  "noida-vs-greater-noida-investment-2026": NoidaVsGreaterNoidaContent,
  "jewar-airport-ncr-property-buyers-2026": JewarAirportNcrProperty2026Content,
  "forest-walk-villa-ghaziabad-luxury-living-2026": ForestWalkVillaGhaziabadContent,
  "upcoming-luxury-projects-noida-greater-noida-2026": UpcomingLuxuryProjectsNoidaGreaterNoidaContent,
  "sobha-rivana-greater-noida-west": SobhaRivanaGreaterNoidaWestContent,
  "3bhk-flats-in-greater-noida": ThreeBhkFlatsGreaterNoida2026Content,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "404 Page Not Found | Celeste Abode",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
    };
  }

  const title =
    post.slug === "forest-walk-villa-ghaziabad-luxury-living-2026" ||
    post.slug === "sobha-rivana-greater-noida-west" ||
    post.slug === "3bhk-flats-in-greater-noida"
      ? post.title
      : `${post.title} - Blog`;
  const description = post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const canonicalPath =
    post.slug === "sobha-rivana-greater-noida-west"
      ? "/blog/sobha-rivana-greater-noida-west"
      : `/blog/${post.slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  /** Absolute URL for the hero image; also used for Open Graph and Twitter cards so previews match the page. */
  const heroImageUrl = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

  const keywordsBySlug: Record<string, string[]> = {
    "is-noida-safe-to-buy-property-2026": [
      "is Noida safe to buy property 2026",
      "Noida property 2026",
      "buy property Noida",
      "Noida real estate investment",
      "Noida property investment",
      "property in Noida",
      "Noida residential projects",
      "RERA Noida",
      "Greater Noida properties",
      "real estate Noida",
      "Celeste Abode",
    ],
    "yamuna-expressway-growth-corridor-delhi-ncr": [
      "Yamuna Expressway growth corridor",
      "Yamuna Expressway Delhi NCR",
      "Yamuna Expressway property",
      "Yamuna Expressway real estate",
      "property on Yamuna Expressway",
      "Jewar airport property",
      "YEIDA property",
      "NCR growth corridor",
      "Yamuna Expressway investment",
      "Greater Noida Yamuna",
      "Celeste Abode",
    ],
    "noida-vs-greater-noida-investment-2026": [
      "Noida vs Greater Noida",
      "Noida vs Greater Noida investment",
      "Noida vs Greater Noida 2026",
      "property Noida vs Greater Noida",
      "buy property Noida or Greater Noida",
      "Greater Noida vs Noida",
      "Noida Greater Noida comparison",
      "invest in Noida or Greater Noida",
      "NCR property investment",
      "Celeste Abode",
    ],
    "jewar-airport-ncr-property-buyers-2026": [
      "Jewar airport property",
      "Jewar airport NCR property",
      "Noida International Airport property",
      "property near Jewar airport",
      "Jewar airport impact on real estate",
      "Yamuna Expressway property Jewar",
      "Greater Noida Jewar airport",
      "real estate near Jewar airport",
      "Jewar airport property 2026",
      "NCR property Jewar",
      "Celeste Abode",
    ],
    "forest-walk-villa-ghaziabad-luxury-living-2026": [
      "Forest Walk Villa Ghaziabad",
      "Forest Walk Villa",
      "luxury villas Ghaziabad",
      "villas in Ghaziabad NH-24",
      "4 BHK villas Ghaziabad",
      "RERA villas Ghaziabad",
      "Dasna Ghaziabad villas",
      "Madhusudhan Group villas",
      "SRSD Buildcon Forest Walk",
      "Ghaziabad villa township",
      "properties in Ghaziabad",
      "Celeste Abode",
    ],
    "3bhk-flats-in-greater-noida": [
      "3 BHK flats in Greater Noida West",
      "3 BHK flat for sale in Greater Noida West",
      "3BHK in Greater Noida West",
      "Noida Extension 3 BHK",
      "Greater Noida West apartments",
      "3 BHK Techzone 4",
      "Sector 1 Greater Noida West",
      "flats for sale Greater Noida West",
      "Jewar airport Greater Noida West",
      "Celeste Abode",
    ],
    "sobha-rivana-greater-noida-west": [
      "Sobha Rivana",
      "Sobha Rivana Greater Noida",
      "Sobha Rivana Greater Noida West",
      "Sobha Rivana Sector 1",
      "Sobha Rivana Noida Extension",
      "Sobha Rivana RERA",
      "Sobha Rivana RERA number",
      "Sobha Rivana price",
      "Sobha Rivana price per sq ft",
      "Sobha Rivana floor plan",
      "Sobha Rivana 2 BHK",
      "Sobha Rivana 3 BHK",
      "Sobha Rivana 4 BHK",
      "Sobha Rivana possession",
      "Sobha Rivana location",
      "Sobha Rivana amenities",
      "Sobha Limited Rivana",
      "luxury apartments Greater Noida West",
      "Celeste Abode",
    ],
  };
  const keywords = keywordsBySlug[post.slug] ?? [
    "property buyers Delhi NCR",
    "real estate investment",
    "Noida property",
    "Greater Noida",
    "real estate advisory",
  ];

  // Use custom meta fields if available, otherwise fallback to defaults
  const metaTitle = post.metaTitle || title;
  const metaDescription = post.metaDescription || description;
  const ogImageUrl = heroImageUrl;
  const ogImageAlt = post.ogImageAlt || post.title;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogImageAlt }],
      type: "article",
      publishedTime: post.date,
      siteName: "Celeste Abode",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [{ url: ogImageUrl, alt: ogImageAlt }],
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 4);
  const ArticleContent = ARTICLE_CONTENT[slug];
  const isSobhaRivana = slug === "sobha-rivana-greater-noida-west";
  const isThreeBhkGreaterNoida = slug === "3bhk-flats-in-greater-noida";
  const isNoidaVsGreaterNoida = slug === "noida-vs-greater-noida-investment-2026";
  const isUpcomingLuxury = slug === "upcoming-luxury-projects-noida-greater-noida-2026";
  const isForestWalk = slug === "forest-walk-villa-ghaziabad-luxury-living-2026";
  const usePremiumHero = true;
  const heroTitle = isSobhaRivana ? "Sobha Rivana, Greater Noida West" : post.title;
  const heroEyebrow = isSobhaRivana
    ? "Project Spotlight | Sector 1, Greater Noida West"
    : isThreeBhkGreaterNoida
      ? "Greater Noida West & Noida Extension | 2026"
      : isNoidaVsGreaterNoida
      ? "Market Comparison | Delhi NCR 2026"
      : isUpcomingLuxury
        ? "Luxury Watchlist | Noida and Greater Noida 2026"
      : isForestWalk
        ? "Project Spotlight | NH-24 Ghaziabad"
      : post.category;
  const heroSubtext = isSobhaRivana
    ? "RERA details, pricing, floor plans, and location insights. Everything you need to evaluate before you decide."
    : isThreeBhkGreaterNoida
      ? "Shortlist luxury 3 BHK homes in Greater Noida with accurate pricing, verified inventory, and fast-track site visits."
    : isForestWalk
      ? "Discover Why buyers are shifting to Forest Walk Villa on NH-24 and what makes this project stand out in 2026."
    : post.excerpt;

  const breadcrumbItems = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`}
        author="Celeste Abode Advisory Team"
        datePublished={post.date}
        url={`${SITE_URL}/blog/${post.slug}`}
      />
      {slug === "sobha-rivana-greater-noida-west" ? (
        <FAQPageSchema faqs={sobhaRivanaFaqSchemaItems} />
      ) : null}
      {slug === "3bhk-flats-in-greater-noida" ? (
        <FAQPageSchema faqs={threeBhkGreaterNoidaWestFaqSchemaItems} />
      ) : null}

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-0">
          {/* Hero – image starts from top (behind fixed header) */}
          <header className="relative bg-[#0f1112]" data-site-hero>
            <div
              className="relative min-h-screen min-h-[100svh]"
            >
              <Image
                src={post.image}
                alt={post.ogImageAlt || post.title}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
                unoptimized={post.image.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/40" />
              {/* Hero content overlay on image */}
              <div className="absolute inset-0 flex items-end">
                <div className="max-w-[95%] xl:max-w-[1800px] mx-auto w-full px-3 pb-14 pt-6 sm:px-4 sm:pb-12 sm:pt-10 md:pb-16 md:pt-12">
                  <div
                    className={cn(
                      usePremiumHero
                        ? "max-w-3xl mx-auto rounded-2xl border border-white/20 bg-black/30 px-4 py-4 backdrop-blur-[2px] sm:px-6 sm:py-6 md:backdrop-blur-sm"
                        : "max-w-3xl mx-auto text-center",
                      isThreeBhkGreaterNoida && "text-left"
                    )}
                  >
                    <p
                      className={
                        usePremiumHero && !isThreeBhkGreaterNoida
                          ? "mb-3 text-left text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d7c18b] sm:mb-4 sm:text-xs"
                          : isThreeBhkGreaterNoida
                            ? "mb-3 text-left text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d7c18b] sm:mb-4 sm:text-xs"
                            : "mb-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d7c18b] sm:mb-4 sm:text-xs"
                      }
                    >
                      {heroEyebrow}
                    </p>
                    <h1 className="px-1 text-[1.5rem] font-semibold leading-snug tracking-tight text-white font-poppins sm:px-2 sm:text-4xl sm:leading-[1.15] md:text-5xl mb-3 sm:mb-5">
                      {heroTitle}
                    </h1>
                    <p
                      className={
                        isThreeBhkGreaterNoida
                          ? "mb-5 max-w-2xl px-1 text-[0.95rem] leading-relaxed text-white/88 font-poppins sm:px-2 sm:text-lg sm:mb-7 md:text-xl"
                          : usePremiumHero
                            ? "mx-auto mb-5 max-w-2xl px-1 text-[0.95rem] leading-relaxed text-white/88 font-poppins sm:px-2 sm:text-lg sm:mb-7 md:text-xl"
                            : "mx-auto mb-5 max-w-2xl px-1 text-base leading-relaxed text-white/85 font-poppins sm:px-2 sm:text-lg sm:mb-7 md:text-xl"
                      }
                    >
                      {heroSubtext}
                    </p>
                    {isThreeBhkGreaterNoida ? (
                      <div className="mb-6 flex w-full justify-end px-1 sm:px-2">
                        <div className="inline-grid w-max max-w-full grid-cols-1 justify-items-stretch gap-3 self-end sm:flex sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-end">
                          <Link
                            href="/properties-in-greater-noida"
                            className="inline-flex w-full min-w-0 items-center justify-center rounded-lg bg-[#CBB27A] px-5 py-2.5 text-center text-sm font-semibold text-[#0f1112] transition-colors hover:bg-[#b9a56f] font-poppins sm:inline-flex sm:w-auto"
                          >
                            View available projects
                          </Link>
                          <Link
                            href="/request-a-free-consultation"
                            className="inline-flex w-full min-w-0 items-center justify-center rounded-lg border border-white/35 bg-white/10 px-5 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 font-poppins sm:inline-flex sm:w-auto"
                          >
                            Book a free consultation
                          </Link>
                        </div>
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-poppins text-white/75 sm:gap-x-6 sm:gap-y-2 sm:text-sm",
                        isThreeBhkGreaterNoida ? "justify-end px-1 sm:px-2" : "justify-center"
                      )}
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <Calendar className="size-3.5 shrink-0 text-[#CBB27A]/95 sm:size-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="size-3.5 shrink-0 text-[#CBB27A]/95 sm:size-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Spacer so hero content and main content don’t collide */}
          <div className="h-6 md:h-8 bg-background" />

          {/* Three-column: Left sidebar | Article | Right sidebar */}
          <div className="max-w-[95%] xl:max-w-[1800px] mx-auto px-4 py-10 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left sidebar – You may also like */}
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-28">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-foreground mb-5 font-poppins flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#CBB27A] rounded-full" />
                      You may also like
                    </h3>
                    <ul className="space-y-4">
                      {related.slice(0, 4).map((r) => (
                        <li key={r.id}>
                          <Link
                            href={`/blog/${r.slug}`}
                            className="group block"
                          >
                            <div className="flex gap-3">
                              <div className="relative h-16 w-20 shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={r.image}
                                  alt=""
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                  sizes="80px"
                                  unoptimized={r.image.startsWith("http")}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-semibold text-foreground group-hover:text-[#CBB27A] transition-colors line-clamp-2 font-poppins">
                                  {r.title}
                                </h4>
                                <span className="text-xs text-gray-500 font-poppins">
                                  {r.readTime}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                      {related.length === 0 && (
                        <li className="text-sm text-gray-500 font-poppins italic py-2">
                          More articles coming soon.
                        </li>
                      )}
                    </ul>
                    <Link
                      href="/blog"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#CBB27A] hover:underline font-poppins"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      All blogs
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Center: Article body */}
              <article className="lg:col-span-6 order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                    {ArticleContent ? (
                      <ArticleContent />
                    ) : (
                      <div className="py-8">
                        <p className="text-xl text-gray-600 mb-6 font-poppins leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="text-gray-500 font-poppins">
                          Full article coming soon. Explore our{" "}
                          <Link href="/real-estate-insights" className="text-[#CBB27A] font-semibold hover:underline">
                            Vault
                          </Link>{" "}
                          for more real estate insights, or{" "}
                          <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">
                            our services
                          </Link>{" "}
                          for advisory support.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>

              {/* Right sidebar: Lead form */}
              <aside className="lg:col-span-3 order-3">
                <div className="sticky top-28">
                  <ArticleLeadForm />
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
