"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isPropertyPage =
    pathname.startsWith("/projects/") && pathname !== "/projects";
  const isContactPage = pathname === "/contact";

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

  // Mobile: always show black strip, Desktop: contact page & property pages always, other pages only on scroll
  const shouldShowGlassmorphism = isMobile || isPropertyPage || isContactPage || isScrolled;

  return (
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
                priority
                fetchPriority="high"
                loading="eager"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 transition-colors text-white hover:text-white/80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f1112] border border-white/10 rounded-2xl mb-6 overflow-hidden relative z-[9999] mt-4">
            <nav className="py-6">
              <Link
                href="/"
                className="block px-6 py-4 text-white hover:text-[#CBB27A] transition-colors duration-300 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/philosophy"
                className="block px-6 py-4 text-white hover:text-[#CBB27A] transition-colors duration-300 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PHILOSOPHY
              </Link>
              <Link
                href="/services"
                className="block px-6 py-4 text-white hover:text-[#CBB27A] transition-colors duration-300 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link
                href="/vault"
                className="block px-6 py-4 text-white hover:text-[#CBB27A] transition-colors duration-300 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                VAULT
              </Link>
              <Link
                href="/projects"
                className="block px-6 py-4 text-white hover:text-[#CBB27A] transition-colors duration-300 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PROJECTS
              </Link>
              <Link
                href="/contact"
                className="block px-6 py-4 text-white hover:text-[#CBB27A] transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
