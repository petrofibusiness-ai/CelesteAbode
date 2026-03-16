"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Mail, ChevronDown, Instagram, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  alwaysBlack?: boolean; // Force black/glassmorphic style always
}

export function Header({ alwaysBlack = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] = useState(false);
  const propertiesMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isPropertyPage =
    (pathname.startsWith("/properties-in-") && pathname !== "/properties") ||
    (pathname.startsWith("/properties/") && pathname !== "/properties");
  const isContactPage = pathname === "/contact";
  const isSEOPage = pathname === "/villa-in-noida" || pathname === "/villas-in-greater-noida" || pathname === "/villa-in-noida-extension" || pathname === "/buy-villa-in-noida" || pathname === "/plots-in-noida" || pathname === "/plots-in-greater-noida";
  // Admin routes (including login) should always show black header
  const isAdminRoute = pathname?.startsWith("/admin");
  const isStaticPage = isAdminRoute || alwaysBlack;

  useEffect(() => {
    // Don't add scroll listener for static pages that should always show black header
    if (isStaticPage) {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }

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
  }, [isStaticPage]);

  // Always show black header
  const shouldShowGlassmorphism = true;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        propertiesMenuRef.current &&
        !propertiesMenuRef.current.contains(event.target as Node)
      ) {
        setIsPropertiesOpen(false);
      }
    };

    if (isPropertiesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPropertiesOpen]);

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
          {/* Mobile Layout - logo left, menu right; phone capsule desktop only */}
          <div className="flex items-center justify-between w-full md:hidden">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp"
                alt="Celeste Abode Logo"
                width={95}
                height={95}
                sizes="95px"
                quality={60}
                priority
                fetchPriority="high"
                loading="eager"
                style={{ width: "auto", height: "auto" }}
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

          {/* Desktop Layout - nav centered, Contact button absolute right */}
          <div className="hidden md:block relative w-full h-24">
            {/* Left capsule removed (phone number no longer shown in header) */}
            {/* Centered nav (left links + logo + right links) - shifted right */}
            <div className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+2.5rem)] -translate-y-1/2 flex items-center pl-6 pr-6">
              {/* Left Menu Group: Home | Properties | Services */}
              <nav className="flex items-center space-x-8 mr-12">
                <Link href="/" className="nav-link">
                  HOME
                </Link>
                
                {/* Properties Dropdown */}
                <div
                  ref={propertiesMenuRef}
                  className="relative"
                  onMouseEnter={() => !isMobile && setIsPropertiesOpen(true)}
                  onMouseLeave={() => !isMobile && setIsPropertiesOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
                    className="nav-link cursor-pointer no-underline-animation"
                    aria-expanded={isPropertiesOpen}
                    aria-haspopup="true"
                  >
                    PROPERTIES
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isPropertiesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-72 z-[100]"
                        style={{ 
                          marginTop: '0px'
                        }}
                      >
                        <div className="bg-[#0f1112] border-l border-r border-b border-l-[#0f1112] border-r-[#0f1112] border-b-white/10 rounded-b-xl shadow-2xl overflow-hidden backdrop-blur-md">
                          <div className="py-2" style={{ paddingTop: '28px' }}>
                          <Link
                            href="/properties-in-noida"
                            className="block px-4 py-3 text-sm text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-200 font-poppins"
                            onClick={() => setIsPropertiesOpen(false)}
                          >
                            Properties in Noida
                          </Link>
                          <Link
                            href="/properties-in-greater-noida"
                            className="block px-4 py-3 text-sm text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-200 font-poppins"
                            onClick={() => setIsPropertiesOpen(false)}
                          >
                            Properties in Greater Noida
                          </Link>
                          <Link
                            href="/properties-in-yamuna-expressway"
                            className="block px-4 py-3 text-sm text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-200 font-poppins"
                            onClick={() => setIsPropertiesOpen(false)}
                          >
                            Properties in Yamuna Expressway
                          </Link>
                          <Link
                            href="/properties-in-ghaziabad"
                            className="block px-4 py-3 text-sm text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-200 font-poppins"
                            onClick={() => setIsPropertiesOpen(false)}
                          >
                            Properties in Ghaziabad
                          </Link>
                          <Link
                            href="/properties-in-lucknow"
                            className="block px-4 py-3 text-sm text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-200 font-poppins"
                            onClick={() => setIsPropertiesOpen(false)}
                          >
                            Properties in Lucknow
                          </Link>
                          <div className="border-t border-white/10 my-1"></div>
                          <Link
                            href="/properties"
                            className="block px-4 py-3 text-sm font-semibold text-[#CBB27A] hover:bg-[#CBB27A]/10 transition-all duration-200 font-poppins"
                            onClick={() => setIsPropertiesOpen(false)}
                          >
                            View all properties
                          </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link href="/real-estate-consulting-services" className="nav-link">
                  SERVICES
                </Link>
              </nav>

              {/* Center Logo - explicit height so it doesn't collapse in flex layout */}
              <Link href="/" className="flex items-center shrink-0 h-20">
                <Image
                  src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp"
                  alt="Celeste Abode Logo"
                  width={95}
                  height={95}
                  sizes="95px"
                  quality={60}
                  priority
                  fetchPriority="high"
                  loading="eager"
                  className="h-20 w-auto object-contain"
                />
              </Link>

              {/* Right Menu Group: Vault | Blogs | Philosophy */}
              <nav className="flex items-center space-x-8 ml-12">
                <Link href="/real-estate-insights" className="nav-link">
                  VAULT
                </Link>
                <Link href="/blog" className="nav-link">
                  BLOGS
                </Link>
                <Link href="/advisory-philosophy" className="nav-link">
                  PHILOSOPHY
                </Link>
              </nav>
            </div>
            
            {/* Contact Capsule Button - absolute right, same width as phone capsule */}
            <Link
              href="/contact"
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[180px] min-w-[180px] h-10 px-5 bg-gradient-to-r from-[#CBB27A] to-[#B39A6A] text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-[#CBB27A]/30 hover:scale-105 active:scale-95 transition-all duration-200 font-poppins whitespace-nowrap"
            >
              Contact Us
            </Link>
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
                  src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp"
                  alt="Celeste Abode Logo"
                  width={40}
                  height={40}
                  sizes="40px"
                  quality={70}
                  className="rounded-lg"
                  style={{ width: "auto", height: "auto" }}
                />
                <h2 className="text-lg font-semibold text-white font-poppins">
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
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Home page"
              >
                HOME
              </Link>
              
              {/* Mobile Properties Dropdown */}
              <div className="border-l-4 border-transparent">
                <button
                  onClick={() => setIsMobilePropertiesOpen(!isMobilePropertiesOpen)}
                  className="w-full px-6 py-4 min-h-[48px] flex items-center justify-between text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                  aria-expanded={isMobilePropertiesOpen}
                >
                  <span>PROPERTIES</span>
                  <motion.div
                    animate={{ rotate: isMobilePropertiesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isMobilePropertiesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pr-6 pb-2 space-y-1">
                        <Link
                          href="/properties-in-noida"
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#CBB27A] hover:bg-white/5 rounded-lg transition-all duration-200 font-poppins"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          Properties in Noida
                        </Link>
                        <Link
                          href="/properties-in-greater-noida"
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#CBB27A] hover:bg-white/5 rounded-lg transition-all duration-200 font-poppins"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          Properties in Greater Noida
                        </Link>
                        <Link
                          href="/properties-in-yamuna-expressway"
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#CBB27A] hover:bg-white/5 rounded-lg transition-all duration-200 font-poppins"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          Properties in Yamuna Expressway
                        </Link>
                        <Link
                          href="/properties-in-ghaziabad"
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#CBB27A] hover:bg-white/5 rounded-lg transition-all duration-200 font-poppins"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          Properties in Ghaziabad
                        </Link>
                        <Link
                          href="/properties-in-lucknow"
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#CBB27A] hover:bg-white/5 rounded-lg transition-all duration-200 font-poppins"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          Properties in Lucknow
                        </Link>
                        <div className="border-t border-white/10 my-2"></div>
                        <Link
                          href="/properties"
                          className="block px-4 py-2 text-sm font-semibold text-[#CBB27A] hover:bg-[#CBB27A]/10 rounded-lg transition-all duration-200 font-poppins"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          View all properties
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link
                href="/real-estate-consulting-services"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Services page"
              >
                SERVICES
              </Link>
              <Link
                href="/real-estate-insights"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Vault page"
              >
                VAULT
              </Link>
              <Link
                href="/blog"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Blogs page"
              >
                BLOGS
              </Link>
              <Link
                href="/advisory-philosophy"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Philosophy page"
              >
                PHILOSOPHY
              </Link>
              <Link
                href="/contact"
                className="block px-6 py-4 min-h-[48px] flex items-center text-white hover:text-[#CBB27A] hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-inset font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Navigate to Contact page"
              >
                CONTACT US
              </Link>

              {/* Social links - horizontal, below Contact Us (mobile only) */}
              <div className="px-6 py-4 flex items-center justify-start gap-4">
                <a
                  href="https://www.instagram.com/celesteabode/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label="Instagram"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/celeste-abode/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-[#004182] transition-colors"
                  aria-label="LinkedIn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/919818735258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
                  aria-label="WhatsApp"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </nav>

            {/* Menu Footer */}
            <div className="px-6 py-4 border-t border-white/10 space-y-4">
              <a
                href="mailto:support@celesteabode.com"
                className="flex items-center gap-3 text-white hover:text-[#CBB27A] transition-colors group m-0 font-poppins"
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
