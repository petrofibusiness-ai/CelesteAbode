import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { ArticleSchema } from "@/lib/structured-data";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { ArticleLeadForm } from "./article-lead-form";
import { NoidaSafe2026Content } from "./noida-safe-2026-content";
import { YamunaExpresswayContent } from "./yamuna-expressway-content";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

const ARTICLE_CONTENT: Record<string, ComponentType> = {
  "is-noida-safe-to-buy-property-2026": NoidaSafe2026Content,
  "yamuna-expressway-growth-corridor-delhi-ncr": YamunaExpresswayContent,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://celesteabode.com";

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
  if (!post) return { title: "Article Not Found" };

  const title = `${post.title} | Celeste Abode Blog`;
  const description = post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

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
  };
  const keywords = keywordsBySlug[post.slug] ?? [
    "property buyers Delhi NCR",
    "real estate investment",
    "Noida property",
    "Greater Noida",
    "real estate advisory",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: post.title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      siteName: "Celeste Abode",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
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
        image={`${SITE_URL}${post.image}`}
        author="Celeste Abode Advisory Team"
        datePublished={post.date}
        url={`${SITE_URL}/blog/${post.slug}`}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-0">
          {/* Hero – image starts from top (behind fixed header) */}
          <header className="relative bg-[#0f1112]">
            <div className="relative h-[75vh] min-h-[480px] max-h-[840px]">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover object-[center_35%]"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
              {/* Hero content overlay on image */}
              <div className="absolute inset-0 flex flex-col justify-end">
              <div className="max-w-[95%] xl:max-w-[1800px] mx-auto px-4 w-full pb-12 pt-10 md:pb-16 md:pt-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.2] font-poppins mb-5 px-2">
                    {post.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/85 font-poppins leading-relaxed mb-7 max-w-2xl mx-auto px-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-poppins text-white/70">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#CBB27A]/90" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#CBB27A]/90" />
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
                          <Link href="/vault" className="text-[#CBB27A] font-semibold hover:underline">
                            Vault
                          </Link>{" "}
                          for more real estate insights, or{" "}
                          <Link href="/services" className="text-[#CBB27A] font-semibold hover:underline">
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
