"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BrandCarousel() {
  // Developer logos from Carousel folder
  const developers = [
    { name: "CRC Building", image: "/Carousel/crc-building.avif" },
    { name: "Max Estates", image: "/Carousel/max-estates.avif" },
    { name: "Irish", image: "/Carousel/irish.avif" },
    { name: "Fusion", image: "/Carousel/fusion.avif" },
    { name: "Abode", image: "/Carousel/abode.avif" },
    { name: "Country Group", image: "/Carousel/country-group.avif" },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-bold text-primary mb-6">
            Trusted <span className="text-[#CBB27A]">partners</span>, better
            outcomes
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Working with RERA-registered developers across Delhi NCR.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12 items-center"
            animate={{
              x: [0, -100 * developers.length],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* First set of logos */}
            {developers.map((developer, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="w-24 h-16 md:w-32 md:h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={developer.image}
                    alt={developer.name}
                    fill
                    className="object-contain border border-black rounded-lg"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {developers.map((developer, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="w-24 h-16 md:w-32 md:h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={developer.image}
                    alt={developer.name}
                    fill
                    className="object-contain border border-black rounded-lg"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
