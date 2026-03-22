"use client";

import Image from "next/image";

export function ServicesHeroSection() {
  return (
    <section
      className="relative bg-background pt-0 md:pt-24 md:min-h-screen md:flex md:items-center md:justify-center"
      data-site-hero
    >
      <div className="w-full md:max-w-7xl md:mx-auto md:px-6 md:w-full">
        <div className="relative overflow-hidden w-full min-h-screen md:min-h-0 md:h-[500px] lg:h-[580px] xl:h-[620px] md:rounded-3xl md:shadow-2xl md:bg-white">
          <Image
            src="/luxury-villa-with-garden-and-modern-design.avif"
            alt="Real Estate Consulting & Advisory Services for Every Goal - Services"
            fill
            priority
            loading="eager"
            className="object-cover object-center md:object-[center_70%]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {/* Same overlay stack as homepage & properties */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(0,0,0,0.25),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent md:bg-gradient-to-l md:from-black/50 md:via-black/20 md:to-transparent" />

          {/* Mobile: centered. Desktop: right-aligned. */}
          <div className="absolute inset-0 flex items-center justify-center px-4 py-10 md:items-end md:justify-end md:pb-16 md:pr-6 md:pt-0 lg:pb-16 lg:pr-8 md:pl-0">
            <div className="relative text-center text-[#FAFAF8] max-w-2xl mx-auto md:text-right md:mx-0 md:max-w-4xl px-4 md:px-0 md:mr-0">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4 leading-tight text-white tracking-tight"
                style={{
                  textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                  letterSpacing: "-0.01em",
                }}
              >
                <div className="block text-[#FAFAF8]">
                  Real Estate Consulting &
                </div>
                <div className="block text-[#FAFAF8] mt-1 md:mt-2">
                  <span className="text-[#CBB27A]">Advisory Services for Every Goal</span>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
