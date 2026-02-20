import { Location } from "@/types/location";

interface WhyInvestSectionProps {
  location: Location;
}

export function WhyInvestSection({ location }: WhyInvestSectionProps) {
  if (!location.whyInvestContent || location.whyInvestContent.length === 0) {
    return null;
  }

  return (
    <article className="mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading Section */}
        <header className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
            Why Invest in <span className="text-[#CBB27A]">{location.locationName}</span>?
          </h2>
        </header>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
            <div className="w-full max-w-none">
              {location.whyInvestContent.map((paragraph, index) => (
                <div
                  key={index}
                  className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0 last:mb-0"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

