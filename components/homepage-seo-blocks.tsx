"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const CONTENT_CLASS = "w-full max-w-none text-sm md:text-base text-gray-700 font-poppins leading-[1.8] [&>p]:w-full [&>p]:max-w-none [&>p]:block [&>h3]:w-full [&>h3]:max-w-none";

const TOTAL_BLOCKS = 5;

function BlurAndButtons({ 
  currentLevel, 
  blockLevel, 
  onExpand, 
  onCollapse 
}: { 
  currentLevel: number; 
  blockLevel: number; 
  onExpand: () => void; 
  onCollapse: () => void;
}) {
  const isLastBlock = blockLevel === TOTAL_BLOCKS - 1;
  const showBlur = currentLevel === blockLevel && !isLastBlock;
  
  return (
    <div className="relative mt-8">
      {/* Gradient blur overlay */}
      <div 
        className={`absolute -top-64 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300 ${
          showBlur ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      
      {/* Buttons */}
      <div className="w-full flex justify-center gap-4 mb-3 relative z-10">
        {/* Read More button - show if not at last block (LEFT) */}
        {!isLastBlock && (
          <button
            onClick={onExpand}
            className="group flex items-center justify-center gap-2 w-40 md:w-44 py-3.5 bg-white border-2 border-[#CBB27A] rounded-full text-foreground font-semibold font-poppins text-sm md:text-base hover:bg-[#CBB27A] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Read More
            <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          </button>
        )}
        
        {/* Show Less button - always show if we're past block 0 (RIGHT) */}
        {currentLevel > 0 && (
          <button
            onClick={onCollapse}
            className="group flex items-center justify-center gap-2 w-40 md:w-44 py-3.5 bg-white border-2 border-gray-300 rounded-full text-foreground font-semibold font-poppins text-sm md:text-base hover:border-[#CBB27A] hover:text-[#CBB27A] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Show Less
            <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function HomepageSeoBlocks() {
  const [expandedLevel, setExpandedLevel] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleExpand = () => {
    if (expandedLevel < TOTAL_BLOCKS - 1) {
      setExpandedLevel(expandedLevel + 1);
    }
  };

  const handleCollapse = () => {
    // First collapse the content
    setExpandedLevel(0);
    
    // After collapse animation, scroll to show the first block with header offset
    setTimeout(() => {
      if (sectionRef.current) {
        const headerOffset = 100;
        const elementPosition = sectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 350);
  };

  // CSS classes for showing/hiding blocks while keeping them in DOM for SEO
  const getBlockVisibility = (blockIndex: number) => {
    const isVisible = expandedLevel >= blockIndex;
    return isVisible 
      ? "opacity-100 max-h-[5000px] visible transition-all duration-500 ease-out" 
      : "opacity-0 max-h-0 overflow-hidden invisible transition-all duration-300 ease-in";
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Block 1: Trusted Property Consultant - Always Visible */}
        <article className="w-full mb-4 md:mb-6">
          <header className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
              Trusted <span className="text-[#CBB27A]">Property Consultant</span> in Noida &amp; Delhi NCR
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Buyers usually come to us after too many calls, too many listings, and too much confusion. We keep it simple. First we understand your goal. Then we verify projects. Then we shortlist.
            </p>
          </header>
          <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
              <div className={CONTENT_CLASS}>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Residential Property Consulting</h3>
                <p className="mb-6">A self-use buyer and an investor should not get the same advice. Our real estate consultants in Noida start with your budget, possession target, and location comfort. After that, we shortlist only projects that clear legal and developer checks. If you are comparing <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-medium hover:underline">flats for sale in Noida</Link>, we focus on fit, not noise. Most buyers looking for property consultants in Delhi NCR are not asking for more options, they are asking for better options.</p>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Commercial Property Advisory</h3>
                <p className="mb-6">Commercial decisions fail when buyers chase only brochure yield. As a property consultant in Noida, we check tenant demand, lease terms, vacancy risk, and compliance before we discuss returns. If you are exploring <Link href="/commercial-property-in-noida" className="text-[#CBB27A] font-medium hover:underline">commercial property in Noida</Link>, we compare each zone on active leasing data. Buyers who work with a real estate consultant in Delhi NCR usually stay for this level of screening.</p>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Luxury Property Investment Guidance</h3>
                <p className="mb-0">Luxury buying needs calm decisions and clean facts. We look at location strength, builder history, execution quality, and resale depth. Our real estate consultants in Noida apply these checks even for a <Link href="/villa-in-noida" className="text-[#CBB27A] font-medium hover:underline">luxury villa in Noida</Link>. If you want a trusted property consultant in Noida and Delhi NCR, this is what matters most.</p>
              </div>
            </div>
          </div>
        </article>

        {/* Blur + Buttons after Block 1 */}
        {expandedLevel === 0 && (
          <BlurAndButtons 
            currentLevel={expandedLevel} 
            blockLevel={0} 
            onExpand={handleExpand} 
            onCollapse={handleCollapse} 
          />
        )}

        {/* Block 2: Best Real Estate Property Consultant - Always in DOM */}
        <div className={getBlockVisibility(1)}>
          <div className="w-full flex justify-center py-6 md:py-8">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>
          <article className="w-full mb-4 md:mb-6">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
                Best Real Estate <span className="text-[#CBB27A]">Property Consultant</span> in Noida for Buyers &amp; Investors
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Good consulting reduces mistakes early. You should know why a project fits, what can go wrong, and what your backup option is.
              </p>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Personalized Property Consultation</h3>
                  <p className="mb-6">No brief is standard. We map income flow, down payment comfort, commute, and possession timeline before we share recommendations. Our real estate consultants in Noida keep the advice personal and practical. If you are comparing property consultants in Delhi NCR, this is the depth you should expect. You can begin with an <Link href="/advisory-session" className="text-[#CBB27A] font-medium hover:underline">advisory session</Link> and review one focused shortlist.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Verified Property Listings</h3>
                  <p className="mb-6">Every shortlist passes internal checks on RERA data, title trail, approvals, and delivery track record. That is the main difference between advisory and random listing feeds. Buyers comparing real estate consulting firms in Delhi NCR often realize this step saves both time and money. You can review our <Link href="/properties" className="text-[#CBB27A] font-medium hover:underline">verified property listings</Link> and then narrow down by your risk profile.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Market Research &amp; Price Analysis</h3>
                  <p className="mb-0">As a property consultant in Noida, we track active pricing, inventory pressure, and launch-to-delivery timelines. Asking rates and deal rates can differ a lot in fast corridors. We use this gap to plan negotiation and entry timing. Our <Link href="/real-estate-insights" className="text-[#CBB27A] font-medium hover:underline">market research</Link> follows the same method used in client advisory calls.</p>
                  
                  
                </div>
              </div>
            </div>
          </article>

          {/* Blur + Buttons after Block 2 */}
          {expandedLevel === 1 && (
            <BlurAndButtons 
              currentLevel={expandedLevel} 
              blockLevel={1} 
              onExpand={handleExpand} 
              onCollapse={handleCollapse} 
            />
          )}
        </div>

        {/* Block 3: Our Real Estate Consulting Services - Always in DOM */}
        <div className={getBlockVisibility(2)}>
          <div className="w-full flex justify-center py-6 md:py-8">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>
          <article className="w-full mb-4 md:mb-6">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
                Our <span className="text-[#CBB27A]">Real Estate Consulting Services</span> in Delhi NCR
              </h2>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <p className="mb-6">The same method should work for end-use and investment, with only the filters changing. That is why buyers working with a property consultant in Noida ask for support beyond discovery, they want legal clarity, pricing logic, and booking support.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property Investment Consulting</h3>
                  <p className="mb-6">Investment advice starts with exit horizon, rental goal, and risk limit. Our real estate consultants in Noida compare Noida, Greater Noida, Ghaziabad, and Lucknow by demand strength, not by launch buzz. If you are evaluating land-led options, start with <Link href="/plots-in-noida" className="text-[#CBB27A] font-medium hover:underline">plots in Noida</Link> and then compare corridor-by-corridor upside.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Residential Property Buying Assistance</h3>
                  <p className="mb-6">From shortlist to possession, we support site planning, comparison, agreement review, and lender coordination. Buyers looking for a best real estate property consultant in Noida often discover that most friction starts after token booking. We stay involved in that stage so cost and timeline surprises stay low. You can begin with <Link href="/residential-property-in-noida" className="text-[#CBB27A] font-medium hover:underline">residential property in Noida</Link> and expand only when the value case is clear.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Commercial Property Consulting</h3>
                  <p className="mb-6">Commercial support includes lease screening, tenant quality review, vacancy modeling, and compliance checks. As a property consultant in Noida, we look at downside first and return second. Buyers evaluating <Link href="/commercial-property-in-noida" className="text-[#CBB27A] font-medium hover:underline">commercial assets in Noida</Link> get a clean side-by-side of risk, yield, and liquidity.</p>

                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Real Estate Portfolio Advisory</h3>
                  <p className="mb-0">Portfolio advisory helps investors avoid overexposure to one location or one builder. The service covers concentration review, timing, and reallocation ideas. You can explore details on our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-medium hover:underline">real estate consulting services</Link> page.</p>
                </div>
              </div>
            </div>
          </article>

          {/* Blur + Buttons after Block 3 */}
          {expandedLevel === 2 && (
            <BlurAndButtons 
              currentLevel={expandedLevel} 
              blockLevel={2} 
              onExpand={handleExpand} 
              onCollapse={handleCollapse} 
            />
          )}
        </div>

        {/* Block 4: Explore Properties - Always in DOM */}
        <div className={getBlockVisibility(3)}>
          <div className="w-full flex justify-center py-6 md:py-8">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>
          <article className="w-full mb-4 md:mb-6">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
                Explore Properties with <span className="text-[#CBB27A]">Real Estate Consultants</span> in Delhi NCR
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Every corridor moves on its own cycle. Price, rental demand, and delivery quality can change sharply from one zone to another.
              </p>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Property in Noida</h3>
                  <p className="mb-6">Noida offers broad inventory, from entry apartments to premium towers and villas. The better pockets combine access, social infrastructure, and stable end-user demand. If you are comparing options, start with <Link href="/properties-in-noida" className="text-[#CBB27A] font-medium hover:underline">property in Noida</Link> and score each option on commute, ticket size, and delivery risk.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property in Greater Noida</h3>
                  <p className="mb-6">Greater Noida and Greater Noida West attract buyers who want value with growth potential. Infrastructure expansion supports demand, but project quality still varies. For active options, review <Link href="/properties-in-greater-noida" className="text-[#CBB27A] font-medium hover:underline">property in Greater Noida</Link> and prioritize builders with clean handover records.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property in Ghaziabad</h3>
                  <p className="mb-6">Ghaziabad suits buyers who want metro-linked housing with strong Delhi access. Still, each pocket performs differently. Compare possession reliability and resale depth, not just launch price. Browse <Link href="/properties-in-ghaziabad" className="text-[#CBB27A] font-medium hover:underline">property in Ghaziabad</Link> and shortlist areas with stable user demand.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property in Lucknow</h3>
                  <p className="mb-0">Lucknow works for buyers who want a different risk-return profile than core NCR. Demand remains healthy in corridors where jobs and infrastructure move together. Explore <Link href="/properties-in-lucknow" className="text-[#CBB27A] font-medium hover:underline">property in Lucknow</Link> and compare options by budget and holding period.</p>
                </div>
              </div>
            </div>
          </article>

          {/* Blur + Buttons after Block 4 */}
          {expandedLevel === 3 && (
            <BlurAndButtons 
              currentLevel={expandedLevel} 
              blockLevel={3} 
              onExpand={handleExpand} 
              onCollapse={handleCollapse} 
            />
          )}
        </div>

        {/* Block 5: How Our Property Consultants Help (Last Block) - Always in DOM */}
        <div className={getBlockVisibility(4)}>
          <div className="w-full flex justify-center py-6 md:py-8">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>
          <article className="w-full mb-4 md:mb-6">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
                How Our <span className="text-[#CBB27A]">Property Consultants</span> Help You Buy the Right Property
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                A strong consultant should do more than show you options. The real difference from a channel partner is what happens before the site visit and after the booking. Here is how ours works.
              </p>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Understanding Your Investment Goals</h3>
                  <p className="mb-6">We start with your real goal, end-use, rental income, appreciation, or a mix. Budget, timeline, and risk comfort shape the shortlist from the start. Our <Link href="/advisory-philosophy" className="text-[#CBB27A] font-medium hover:underline">advisory philosophy</Link> is simple, if a project does not fit, we say no early.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Shortlisting the Best Property Options</h3>
                  <p className="mb-6">Our real estate consultants in Noida filter each shortlist through RERA checks, title review, delivery history, payment structure, and construction stage. What reaches you is already risk-screened. Whether you are viewing <Link href="/flats-for-sale-in-greater-noida" className="text-[#CBB27A] font-medium hover:underline">flats in Greater Noida</Link> or Noida options, the aim is decision clarity.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Site Visits &amp; Project Evaluation</h3>
                  <p className="mb-6">A property consultant in Noida should brief you before each visit. We check construction stage against RERA timelines, carpet area clarity, and whether site claims match filed records. After the visit, we compare observations with agreement terms before any booking move.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Complete Booking &amp; Documentation Support</h3>
                  <p className="mb-0">This stage includes agreement review, loan coordination, registration support, and post-booking follow-up. Most buyers face the highest stress here, not at discovery. A property consultant in Noida who stays involved can prevent avoidable delay and cost. If you want a review of your current plan, <Link href="/contact" className="text-[#CBB27A] font-medium hover:underline">contact us</Link>.</p>
                </div>
              </div>
            </div>
          </article>

          {/* Only Show Less button after last block */}
          {expandedLevel >= 4 && (
            <div className="relative mt-8">
              <div className="w-full flex justify-center mb-3 relative z-10">
                <button
                  onClick={handleCollapse}
                  className="group flex items-center justify-center gap-2 w-40 md:w-44 py-3.5 bg-white border-2 border-[#CBB27A] rounded-full text-foreground font-semibold font-poppins text-sm md:text-base hover:bg-[#CBB27A] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Show Less
                  <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
