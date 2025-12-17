"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isPropertyPage =
    pathname.startsWith("/projects/") && pathname !== "/projects";
  const isContactPage = pathname === "/contact";
  const isSEOPage = pathname === "/villa-in-noida" || pathname === "/villas-in-greater-noida";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Mobile: always show black strip, Desktop: contact page, property pages, and SEO pages always, other pages only on scroll
  const shouldShowGlassmorphism = isMobile || isPropertyPage || isContactPage || isSEOPage || isScrolled;

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldShowGlassmorphism
          ? "glass-metallic header-scrolled"
          : "header-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-24">
          {/* Mobile Layout */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Logo - Left on Mobile */}
            <Link href="/">
              <Image
                src="/logoceleste.avif"
                alt="Celeste Abode Logo"
                width={95}
                height={95}
                sizes="95px"
                quality={85}
                priority
                fetchPriority="high"
                loading="eager"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-offset-2 focus:ring-offset-[#0f1112] rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center w-full">
            {/* Left Menu Group */}
            <nav className="flex items-center space-x-8 mr-16">
              <Link href="/" className="nav-link">
                HOME
              </Link>
              <Link href="/philosophy" className="nav-link">
                PHILOSOPHY
              </Link>
              <Link href="/services" className="nav-link">
                SERVICES
              </Link>
            </nav>

            {/* Center Logo */}
            <Link href="/">
              <Image
                src="/logoceleste.avif"
                alt="Celeste Abode Logo"
                width={95}
                height={95}
                sizes="95px"
                quality={85}
                priority
                fetchPriority="high"
                loading="eager"
              />
            </Link>

            {/* Right Menu Group */}
            <nav className="flex items-center space-x-8 ml-16">
              <Link href="/vault" className="nav-link">
                VAULT
              </Link>
              <Link href="/projects" className="nav-link">
                PROJECTS
              </Link>
              <Link href="/contact" className="nav-link">
                CONTACT
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Side Menu - Slides from Right (Outside header to break stacking context) */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Side Menu */}
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0f1112] shadow-2xl z-[99999] md:hidden flex flex-col"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Image
                  src="/logoceleste.avif"
                  alt="Celeste Abode Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Celeste Abode
                </h2>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#CBB27A] hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4">
              <Link
                href="/"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Home page"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                HOME
              </Link>
              <Link
                href="/philosophy"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Philosophy page"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                PHILOSOPHY
              </Link>
              <Link
                href="/services"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Services page"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                SERVICES
              </Link>
              <Link
                href="/vault"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Vault page"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                VAULT
              </Link>
              <Link
                href="/projects"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Projects page"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                PROJECTS
              </Link>
              <Link
                href="/contact"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Contact page"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                CONTACT
              </Link>
            </nav>

            {/* Menu Footer */}
            <div className="px-6 py-4 border-t border-white/10 space-y-4">
              <a
                href="tel:+919818735258"
                className="flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group m-0"
                style={{ fontFamily: "Poppins, sans-serif", marginLeft: 0, marginRight: 0 }}
              >
                <div className="w-10 h-10 bg-[#CBB27A]/20 rounded-full flex items-center justify-center border border-[#CBB27A]/30 group-hover:bg-[#CBB27A]/30 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#CBB27A]" />
                </div>
                <span className="text-sm font-medium">+91 9818735258</span>
              </a>
              <a
                href="mailto:support@celesteabode.com"
                className="flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group m-0"
                style={{ fontFamily: "Poppins, sans-serif", marginLeft: 0, marginRight: 0 }}
              >
                <div className="w-10 h-10 bg-[#CBB27A]/20 rounded-full flex items-center justify-center border border-[#CBB27A]/30 group-hover:bg-[#CBB27A]/30 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#CBB27A]" />
                </div>
                <span className="text-sm font-medium">support@celesteabode.com</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
