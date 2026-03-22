"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Phone, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { blogPosts } from "@/lib/blog-data";

const categories = [
  "All Articles",
  "Market Analysis",
  "Legal & Compliance",
  "Financial Planning",
  "Location Intelligence",
  "NRI Advisory",
  "Buying Guide",
];

export default function BlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Market Insights",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name.split(" ")[0] || formData.name,
          lastName: formData.name.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
          message: `Blog subscription - Interest: ${formData.interest}`,
          source: "blog_sidebar",
        }),
      });

      if (response.ok) {
        toast.success("Thank you! We'll reach out to you soon.");
        setFormData({ name: "", email: "", phone: "", interest: "Market Insights" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Popular articles (sorted by views)
  const popularArticles = [...blogPosts].sort((a, b) => 
    parseFloat(b.views || "0") - parseFloat(a.views || "0")
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#0f1112] to-background overflow-hidden">
          <div className="absolute inset-0 bg-[url('/propertyhero.avif')] opacity-5 bg-cover bg-center" />
          <div className="relative max-w-[95%] xl:max-w-[1800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
                The <span className="text-[#CBB27A]">Celeste Abode</span> Journal
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins">
                Expert insights, market analysis, and strategic guidance for confident property decisions in Delhi NCR
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content with Sidebars – full width like article page */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-[95%] xl:max-w-[1800px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Sidebar - Popular Articles (same layout as article page "You may also like") */}
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-28">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <h2 className="text-base font-bold text-foreground mb-5 font-poppins uppercase tracking-wider text-[#CBB27A] flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#CBB27A] rounded-full" />
                      Popular Articles
                    </h2>
                    <ul className="space-y-4">
                      {popularArticles.map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="group block"
                          >
                            <div className="flex gap-3">
                              <div className="relative h-16 w-20 shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={post.image}
                                  alt=""
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                  sizes="80px"
                                  unoptimized={post.image.startsWith("http")}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-semibold text-foreground group-hover:text-[#CBB27A] transition-colors line-clamp-2 mb-2 font-poppins">
                                  {post.title}
                                </h4>
                                <span className="text-xs text-gray-500 font-poppins">
                                  {post.readTime}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/blog"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#CBB27A] hover:underline font-poppins"
                    >
                      All blogs
                    </Link>
                  </motion.div>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="lg:col-span-6 order-1 lg:order-2">
                {/* Featured Articles */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-[#CBB27A]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins">
                      Featured Articles
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {blogPosts.filter(post => post.featured).map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized={post.image.startsWith("http")}
                            />
                            <div className="absolute top-4 left-4">
                              <span className="inline-block px-3 py-1.5 bg-[#CBB27A] text-white text-xs font-semibold rounded-full">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 font-poppins">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                              </span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-[#CBB27A] transition-colors font-poppins line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2 font-poppins">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center gap-2 text-[#CBB27A] font-semibold group-hover:gap-3 transition-all font-poppins">
                              Read Article
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>

                {/* All Articles */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-[#CBB27A]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins">
                      Latest Articles
                    </h2>
                  </div>

                  <div className="grid gap-6">
                    {blogPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <Link href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row">
                          <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized={post.image.startsWith("http")}
                            />
                            <div className="absolute top-3 left-3">
                              <span className="inline-block px-2.5 py-1 bg-[#CBB27A] text-white text-xs font-semibold rounded-full">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-5 flex-1">
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 font-poppins">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#CBB27A] transition-colors font-poppins line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-poppins">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center gap-1.5 text-sm text-[#CBB27A] font-semibold group-hover:gap-2 transition-all font-poppins">
                              Read More
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </main>

              {/* Right Sidebar - Lead Capture Form */}
              <aside className="lg:col-span-3 order-3">
                <div className="sticky top-28">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-[#0f1112] to-[#1a1d1f] rounded-xl p-6 shadow-xl"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-2 font-poppins">
                        Get Expert <span className="text-[#CBB27A]">Insights</span>
                      </h3>
                      <p className="text-sm text-white/80 font-poppins">
                        Personalized property guidance from our advisory team
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
                        />
                      </div>

                      <div>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
                        >
                          <option value="Market Insights" className="bg-[#0f1112]">Market Insights</option>
                          <option value="Investment Advisory" className="bg-[#0f1112]">Investment Advisory</option>
                          <option value="Property Search" className="bg-[#0f1112]">Property Search</option>
                          <option value="Legal Guidance" className="bg-[#0f1112]">Legal Guidance</option>
                          <option value="NRI Services" className="bg-[#0f1112]">NRI Services</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#CBB27A] text-white font-semibold rounded-lg hover:bg-[#B39A6A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-poppins"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Get Expert Guidance"
                        )}
                      </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                      <a
                        href="tel:+919910906306"
                        className="flex items-center gap-3 text-white/90 hover:text-[#CBB27A] transition-colors text-sm font-poppins group"
                      >
                        <div className="w-9 h-9 bg-[#CBB27A]/20 rounded-full flex items-center justify-center group-hover:bg-[#CBB27A]/30 transition-colors">
                          <Phone className="w-4 h-4 text-[#CBB27A]" />
                        </div>
                        <span>+91 9910906306</span>
                      </a>
                      <a
                        href="mailto:support@celesteabode.com"
                        className="flex items-center gap-3 text-white/90 hover:text-[#CBB27A] transition-colors text-sm font-poppins group"
                      >
                        <div className="w-9 h-9 bg-[#CBB27A]/20 rounded-full flex items-center justify-center group-hover:bg-[#CBB27A]/30 transition-colors">
                          <Mail className="w-4 h-4 text-[#CBB27A]" />
                        </div>
                        <span className="text-xs">support@celesteabode.com</span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Full-Width CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-[#0f1112] via-[#1a1d1f] to-[#0f1112] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/propertyhero.avif')] opacity-5 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CBB27A]/20 border border-[#CBB27A]/30 mb-4">
                <span className="text-xs font-semibold text-[#CBB27A] uppercase tracking-wider font-poppins">
                  Beyond Articles — Real Advisory
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-poppins leading-tight">
                Ready to Turn <span className="text-[#CBB27A]">Insights into Action?</span>
              </h2>
              
              <p className="text-base md:text-lg text-white/80 mb-8 font-poppins leading-relaxed max-w-2xl mx-auto">
                Reading about real estate is just the beginning. Our advisory team provides personalized property guidance, market intelligence, and investment strategies tailored to your goals in Delhi NCR.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <Link
                  href="/real-estate-consulting-services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CBB27A] text-white font-semibold rounded-full hover:bg-[#B39A6A] hover:shadow-lg hover:shadow-[#CBB27A]/30 hover:scale-105 active:scale-95 transition-all duration-200 font-poppins"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-poppins"
                >
                  View Properties
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-poppins pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#CBB27A] rounded-full" />
                  <span>RERA Verified Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#CBB27A] rounded-full" />
                  <span>End-to-End Advisory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#CBB27A] rounded-full" />
                  <span>Market Intelligence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
