import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import type { Property } from "@/types/property";
import { getPropertyUrl } from "@/lib/property-url";
import { LOCATION_SECTION_HEADING_CLASS } from "@/lib/location-page-typography";

function formatConfigurations(property: Property): string {
  if (property.configuration?.length) {
    return property.configuration.slice(0, 3).join(" · ");
  }
  if (property.sizes?.trim()) return property.sizes.trim();
  return "Multiple configurations";
}

type PreLaunchProperty = Property & { locationSlug?: string };

export function PreLaunchPropertiesSection({
  properties,
  locationName,
}: {
  properties: PreLaunchProperty[];
  locationName: string;
}) {
  if (!properties.length) return null;

  const gridClass =
    properties.length === 1
      ? "mx-auto max-w-sm sm:max-w-md"
      : properties.length === 2
        ? "mx-auto max-w-xl sm:max-w-3xl md:grid-cols-2"
        : "mx-auto max-w-5xl md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="pre-launch"
      className="relative overflow-hidden bg-background py-12 md:py-16 scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="prelaunch-heading"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-8 max-w-xl text-center md:mb-10">
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#CBB27A]/30 bg-[#CBB27A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a7340] font-poppins"
          >
            <Sparkles className="h-3 w-3 shrink-0" strokeWidth={2.25} aria-hidden />
            Pre-Launch
          </span>
          <h2
            id="prelaunch-heading"
            className={`${LOCATION_SECTION_HEADING_CLASS} text-foreground`}
          >
            Upcoming in{" "}
            <span className="text-[#8a7340]">{locationName}</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-[15px] md:leading-[1.7] font-poppins">
            Access handpicked upcoming launches with early pricing, priority allotment, and
            personalized guidance before the public launch.
          </p>
        </header>

        <ul className={`grid list-none gap-5 p-0 m-0 ${gridClass}`}>
          {properties.map((property) => (
            <li key={property.id ?? property.slug}>
              <Link
                href={getPropertyUrl(property)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CBB27A]/45 hover:shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden bg-gray-100 sm:h-48 md:h-52">
                  <Image
                    src={property.heroImage}
                    alt={property.heroImageAlt || property.projectName}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 360px, 400px"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3 sm:px-4 sm:pb-3.5">
                    <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#CBB27A] font-poppins">
                      {property.developer}
                    </p>
                    <h3 className="text-base font-bold leading-tight text-white line-clamp-2 font-poppins">
                      {property.projectName}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CBB27A]" aria-hidden />
                    <span className="line-clamp-2 font-poppins">{property.location}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1 font-poppins">
                    {formatConfigurations(property)}
                  </p>
                  {property.priceUnit ? (
                    <p className="text-sm font-semibold text-[#8a7340] font-poppins">
                      {property.priceUnit}
                    </p>
                  ) : null}
                  <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2.5">
                    <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-[#8a7340] font-poppins">
                      View details
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CBB27A]/15 text-[#8a7340] transition-colors group-hover:bg-[#CBB27A] group-hover:text-[#1a1510]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-8 flex max-w-6xl justify-center px-6 md:mt-10" aria-hidden>
        <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#CBB27A]/40 to-transparent" />
      </div>
    </section>
  );
}
