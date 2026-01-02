"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export function LocationFilterCards() {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "all";

  const locations = [
    {
      id: "noida",
      title: "Noida",
      subtitle: "Planned Urbanism | Smart Living",
      description: "Prime location known for meticulous urban planning, rapid metro expansion, and a robust IT/commercial ecosystem.",
      image: "/NOIDA.avif",
      link: "/properties-in-noida",
      alt: "Noida real estate properties - Premium apartments and residential projects in Noida, Delhi NCR",
    },
    {
      id: "greater-noida",
      title: "Greater Noida",
      subtitle: "Investment Momentum | Aviation Proximity",
      description: "India's premier high-growth investment belt. Strategically positioned for exponential value appreciation powered by the upcoming Jewar International Airport.",
      image: "/GREATER NOIDA.avif",
      link: "/properties-in-greater-noida",
      alt: "Greater Noida real estate properties - Investment properties and residential projects in Greater Noida, Delhi NCR",
    },
    {
      id: "yamuna-expressway",
      title: "Yamuna Expressway",
      subtitle: "High-Growth Zone | Strategic Location",
      description: "Premium investment destination with excellent connectivity and promising infrastructure development. Ideal for investors seeking high returns.",
      image: "/YAMUNA.avif",
      link: "/properties-in-yamuna-expressway",
      alt: "Yamuna Expressway real estate properties - High-growth investment properties and residential projects near Yamuna Expressway, Delhi NCR",
    },
    {
      id: "ghaziabad",
      title: "Ghaziabad / NH-24",
      subtitle: "Value & Vitals | Established Infrastructure",
      description: "Established residential market offering exceptional value, excellent connectivity to Delhi, and mature, family-friendly social infrastructure.",
      image: "/GHAZIABAD.avif",
      link: "/properties-in-ghaziabad",
      alt: "Ghaziabad real estate properties - Value homes and residential projects in Ghaziabad and NH-24 corridor, Delhi NCR",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Filter by <span className="text-[#CBB27A]">Location</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-poppins">
            Explore properties in your preferred location across Delhi NCR
          </p>
        </motion.div>

        {/* Location Cards Grid - 2x2 on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* All Locations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/properties"
              className={`group block h-full ${
                activeLocation === "all" ? "ring-2 ring-[#CBB27A] ring-offset-2" : ""
              }`}
              aria-label="View all properties"
            >
              <div className={`relative h-[280px] md:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                activeLocation === "all" ? "ring-2 ring-[#CBB27A]" : ""
              }`}>
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight group-hover:text-[#CBB27A] transition-colors duration-300">
                    All Locations
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Location Cards */}
          {locations.map((location, index) => {
            const isActive = activeLocation === location.id;
            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
              >
                <Link
                  href={location.link}
                  className={`group block h-full ${
                    isActive ? "ring-2 ring-[#CBB27A] ring-offset-2" : ""
                  }`}
                  aria-label={`View properties in ${location.title}`}
                >
                  <div className={`relative h-[280px] md:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] ${
                    isActive ? "ring-2 ring-[#CBB27A]" : ""
                  }`}>
                    {/* Location Image */}
                    <Image
                      src={location.image}
                      alt={location.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      quality={85}
                      loading="lazy"
                    />

                    {/* Dark Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 transition-opacity duration-500 ${
                      isActive ? "ring-2 ring-[#CBB27A]" : ""
                    }`} />

                    {/* Content Overlay - Centered Location Name */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                      <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight text-center transition-colors duration-300 ${
                        isActive ? "text-[#CBB27A]" : "group-hover:text-[#CBB27A]"
                      }`}>
                        {location.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

