"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export function Footer() {
  return (
    // EDIT: changed footer bg from primary (yellow) to a lighter black hex for a premium dark footer
    <footer className="bg-[#0f1112] text-white">
      {" "}
      {/* EDIT: lighter shade of black to match bottom image */}
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-12 justify-items-start sm:justify-items-start">
          {/* Logo Column - Centered */}
          <div className="flex justify-center w-full lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/logoceleste.avif"
                alt="Celeste Abode Logo"
                width={170}
                height={156}
                sizes="(max-width: 640px) 130px, 170px"
                quality={60}
                className=""
                loading="lazy"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>

          {/* Contact Column */}
          <div className="pl-0">
            <h3 className="h4 mb-6 text-[#CBB27A]">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-white group-hover:text-[#CBB27A] transition-colors" />
                <span className="text-sm text-white group-hover:text-[#CBB27A] transition-colors">
                  +91 9818735258
                </span>
              </div>
              <ObfuscatedEmail
                variant="link"
                className="flex items-center gap-3 text-sm text-white group-hover:text-[#CBB27A] transition-colors group cursor-pointer"
                iconClassName="w-5 h-5 text-white group-hover:text-[#CBB27A] transition-colors"
                showIcon={true}
              />
              <div className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="w-6 h-6 text-white group-hover:text-[#CBB27A] transition-colors mt-0.5 flex-shrink-0" />
                <address className="text-sm text-white group-hover:text-[#CBB27A] transition-colors not-italic">
                  615, 6th Floor, Galaxy Blue Sapphire Plaza<br />
                  Sector 4, Greater Noida (West), U.P - 201309<br />
                  India
                </address>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="pl-0 ml-0">
            <h3 className="h4 mb-6 text-[#CBB27A]">Quick Links</h3>
            <div className="flex flex-col gap-3" style={{ marginLeft: 0 }}>
              <Link
                href="/"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Home
              </Link>
              <Link
                href="/advisory-philosophy"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Philosophy
              </Link>
              <Link
                href="/real-estate-consulting-services"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Services
              </Link>
              <Link
                href="/properties"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Properties
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Locations Column */}
          <div className="pl-0 ml-0">
            <h3 className="h4 mb-6 text-[#CBB27A]">Locations</h3>
            <div className="flex flex-col gap-3" style={{ marginLeft: 0 }}>
              <Link
                href="/properties-in-noida"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Properties in Noida
              </Link>
              <Link
                href="/residential-property-in-noida"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Residential Property in Noida
              </Link>
              <Link
                href="/commercial-property-in-noida"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Commercial Property in Noida
              </Link>
              <Link
                href="/flats-for-sale-in-noida"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Flats for Sale in Noida
              </Link>
              <Link
                href="/properties-in-greater-noida"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Properties in Greater Noida
              </Link>
              <Link
                href="/flats-for-sale-in-greater-noida"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Flats for Sale in Greater Noida
              </Link>
              <Link
                href="/properties-in-yamuna-expressway"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Properties in Yamuna Expressway
              </Link>
              <Link
                href="/properties-in-ghaziabad"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Properties in Ghaziabad
              </Link>
              <Link
                href="/flats-in-ghaziabad"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Flats in Ghaziabad
              </Link>
              <Link
                href="/properties-in-lucknow"
                className="block text-sm text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                style={{ marginLeft: 0 }}
              >
                Properties in Lucknow
              </Link>
            </div>
          </div>

          {/* Social & Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#CBB27A]">
              Social & Newsletter
            </h3>
            <div className="space-y-4">
              {/* Social Links */}
              <div className="flex gap-3">
                <Link
                  href="https://www.instagram.com/celesteabode/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 hover:scale-110 transition-all duration-200 group"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white group-hover:text-[#CBB27A] transition-colors" />
                </Link>
                <Link
                  href="https://wa.me/919818735258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  title="WhatsApp"
                >
                  <Image
                    src="/pngtree-whatsapp-icon-png-image_3584844.jpg"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-full"
                  />
                </Link>
              </div>

              {/* Legal Links */}
              <div className="flex flex-col gap-1" style={{ marginLeft: 0 }}>
                <Link
                  href="/privacy-policy"
                  className="text-xs text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                  style={{ marginLeft: 0 }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-white hover:text-[#CBB27A] transition-colors !m-0 !ml-0"
                  style={{ marginLeft: 0 }}
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        {/* EDIT: adjusted top border to use border-border/40 to better suit the new footer background */}
        {/* Copyright and Powered by */}
        <div className="pt-4 mt-6">
          {/* Separator line */}
          <div className="border-t border-gray-600/40 mb-4"></div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-gray-400">
              © 2024 Celeste Abode Private Limited. All rights reserved.
            </p>
            <p className="text-xs text-white">
              Powered by{" "}
              <Link
                href="https://www.vitespace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CBB27A] hover:text-[#CBB27A]/80 transition-colors"
              >
                Vitespace
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
