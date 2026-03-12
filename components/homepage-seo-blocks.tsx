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
              Advisory built around your decision, not our inventory. Whether you are buying to live, to invest, or to diversify, the approach is the same: verification first, recommendation second.
            </p>
          </header>
          <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
              <div className={CONTENT_CLASS}>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Residential Property Consulting</h3>
                <p className="mb-6">End-users and investors in the NCR need completely different shortlists. A family buying near a school zone in Sector 93 has different priorities than an investor targeting 6% rental yield in Greater Noida West. Our real estate consultants in Noida build each brief from scratch, verify the shortlist for RERA status and developer track record, and only then schedule site visits. Whether you are looking at <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-medium hover:underline">flats in Noida</Link> or options across the Expressway, nothing in the list has been pushed by a developer. Everything has been checked by us.</p>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Commercial Property Advisory</h3>
                <p className="mb-6"><Link href="/commercial-property-in-noida" className="text-[#CBB27A] font-medium hover:underline">Commercial real estate in Noida</Link> rewards buyers who understand occupier demand, not just floor area. Sector 62 and Sector 132 have active corporate leasing. Pre-leased office assets in Gomti Nagar, Lucknow carry 5 to 7% net yields. As a property consultant in Noida with commercial experience, we verify occupancy certificates, review existing lease terms, and assess vacancy probability before recommending anything. Yield figures on paper and yield figures after vacancy are two very different numbers.</p>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Luxury Property Investment Guidance</h3>
                <p className="mb-0">Luxury demand in the NCR grew 28% year-on-year in Q1 2025. Projects in Sector 150, Sector 94, and the Yamuna Expressway corridor are drawing high-net-worth buyers who expect more than a premium price tag. They expect verified fundamentals: developer pedigree, actual possession track record, and resale liquidity data. Our consultants apply the same due diligence rigour to a <Link href="/villa-in-noida" className="text-[#CBB27A] font-medium hover:underline">luxury villa brief</Link> as to a Rs 60 lakh flat. The numbers are bigger. The checks have to be too.</p>
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

        {/* Block 2: Our Real Estate Consulting Services - Always in DOM */}
        <div className={getBlockVisibility(1)}>
          <div className="w-full flex justify-center py-6 md:py-8">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>
          <article className="w-full mb-4 md:mb-6">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
                Our <span className="text-[#CBB27A]">Real Estate Consulting Services</span> in Delhi NCR
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Each service below is delivered by real estate consultants in Noida with direct on-ground market experience. The brief drives the process. Verification steps are not skipped regardless of transaction size or timeline pressure.
              </p>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Property Investment Consulting</h3>
                  <p className="mb-6">Micro-market selection, developer vetting, yield modelling, and capital appreciation analysis across Noida, Greater Noida, and the Yamuna Expressway. Whether you are evaluating <Link href="/plots-in-noida" className="text-[#CBB27A] font-medium hover:underline">plots in Noida</Link> or apartment inventory, a property consultant with investment-focused experience separates projects with real appreciation fundamentals from those riding short-term launch momentum. We map that difference clearly for every investment brief, so the decision is based on data, not marketing.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Residential Property Buying Assistance</h3>
                  <p className="mb-6">From the first consultation to possession: site visit coordination, agreement review, documentation support, home loan processing, and construction milestone tracking. Buyers exploring <Link href="/residential-property-in-noida" className="text-[#CBB27A] font-medium hover:underline">residential property in Noida</Link> who expect that advisory to end at booking will find something different here. The problems in most real estate transactions surface between signing and handover. That is exactly when our involvement is most active.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Commercial Property Consulting</h3>
                  <p className="mb-6">Office spaces, retail units, pre-leased assets, and industrial plots across NCR. Our real estate consultants in Noida evaluate occupancy certificates, lease terms, tenant covenant strength, and yield sustainability before recommending any commercial asset. Buyers who want a structured comparison of commercial yield versus residential appreciation receive exactly that, built on verified numbers rather than promotional return projections.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Real Estate Portfolio Advisory</h3>
                  <p className="mb-0">For investors with existing NCR holdings or those building a portfolio from scratch. We assess concentration risk, rebalance across asset types, and identify reinvestment opportunities based on current market conditions. Our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-medium hover:underline">consulting services</Link> go beyond transactional brokerage to provide that structured review, including an honest assessment of holdings that may have underperformed.</p>
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

        {/* Block 3: Best Real Estate Property Consultant - Always in DOM */}
        <div className={getBlockVisibility(2)}>
          <div className="w-full flex justify-center py-6 md:py-8">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent" />
          </div>
          <article className="w-full mb-4 md:mb-6">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 font-poppins leading-tight">
                Best Real Estate <span className="text-[#CBB27A]">Property Consultant</span> in Noida for Buyers &amp; Investors
              </h2>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <p className="mb-6">Buyers searching for a property consultant near me in the Noida and Greater Noida market are usually dealing with one problem: too many options, no clear way to separate the credible from the commission-driven. The answer is not more options. It is fewer, better-checked ones. A shortlist filtered for legal standing and developer track record, like the one in our <Link href="/properties" className="text-[#CBB27A] font-medium hover:underline">verified property listings</Link>, is a different thing from a list of available inventory.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Personalised Property Consultation</h3>
                  <p className="mb-6">Every brief is different. Before any shortlist is built, we establish what the buyer is actually solving for: budget ceiling, cash flow position, possession urgency, preferred geography, and whether the priority is end-use or investment return. Buyers who arrive with a specific project or sector already in mind can <Link href="/advisory-session" className="text-[#CBB27A] font-medium hover:underline">book a consultation</Link> to assess that against their real financial profile. Sometimes it fits. Sometimes the data says otherwise, and we say so before anyone walks a site.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Verified Property Listings</h3>
                  <p className="mb-6">Every project our real estate consultants in Noida recommend has been through an internal check: RERA registration, land title verification, NOC status, developer financial standing, and delivery history on previous phases. A project can be RERA-registered and still carry complications. Encumbered land, financing drawn against the plot, or a developer with two delayed phases on record are all things that do not appear in a listing. They only appear if someone looked for them.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Market Research &amp; Price Analysis</h3>
                  <p className="mb-0">Listed prices and actual transaction values can differ by 15 to 30% in the NCR. A property consultant in Noida who tracks current micro-market data prevents buyers from committing at the wrong price point or being caught by stamp duty recalculations after circle rate revisions. Our <Link href="/real-estate-insights" className="text-[#CBB27A] font-medium hover:underline">market insights</Link> cover transacted rates, developer cost positions, unsold inventory levels, and infrastructure delivery timelines across each corridor so that pricing conversations are grounded in current reality.</p>
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
                Each corridor in the NCR has its own demand cycle, pricing behaviour, and infrastructure drivers. Our real estate consultants in Noida track each market independently. Here is what the current data shows.
              </p>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Property in Noida</h3>
                  <p className="mb-6">Sector 150 leads the <Link href="/flats-for-sale-in-noida" className="text-[#CBB27A] font-medium hover:underline">Noida property market</Link> at 43% year-on-year appreciation. Sector 94 for ultra-luxury. Expressway corridor for mid-segment growth. Average premium sector prices: Rs 7,500 to Rs 12,000 per sq ft. NCR inventory overhang at 7 months, its lowest in years.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property in Greater Noida</h3>
                  <p className="mb-6"><Link href="/flats-for-sale-in-greater-noida" className="text-[#CBB27A] font-medium hover:underline">Greater Noida West</Link> averaging Rs 8,450 per sq ft with 24% year-on-year growth. 62% of combined NCR transactions in Q3 2024. Alpha/Beta circle rates revised to Rs 36,000 per sq metre in 2025. GNIDA belt resale plots: Rs 40,000 to Rs 75,000 per sq metre.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property in Ghaziabad</h3>
                  <p className="mb-6">Indirapuram: Rs 9,950 per sq ft, 73% appreciation FY21 to FY25. Vaishali: Rs 9,650 per sq ft, 30.4% year-on-year growth. Vasundhara: Rs 7,900 per sq ft, 81% over 3 years. The FNG corridor is driving sustained demand across the <Link href="/flats-in-ghaziabad" className="text-[#CBB27A] font-medium hover:underline">Ghaziabad belt</Link>.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Property in Lucknow</h3>
                  <p className="mb-0">The <Link href="/commercial-and-residential-property-in-lucknow" className="text-[#CBB27A] font-medium hover:underline">Lucknow market</Link> is growing at 12% CAGR. Gomti Nagar: Rs 9,577 per sq ft, 64.8% appreciation over 10 years. Circle rates revised to Rs 70,000 per sq metre in August 2025. Faizabad Road: 3.4% rental yield. Sultanpur Road: strongest mid-term appreciation at a lower entry point.</p>
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
                A property consultant near me should do more than show you options. The process that separates a useful consultant from a channel partner is what happens before the site visit and after the booking. Here is how ours works.
              </p>
            </header>
            <div className="w-full max-w-none bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full max-w-none p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={CONTENT_CLASS}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-0">Understanding Your Investment Goals</h3>
                  <p className="mb-6">The first conversation covers what you are actually solving for: end-use, rental income, capital appreciation, or a combination. Budget, timeline, geography, and risk tolerance all feed into how the shortlist gets built. This <Link href="/advisory-philosophy" className="text-[#CBB27A] font-medium hover:underline">advisory philosophy</Link> means we assess every project against your actual profile. When the numbers say it is the wrong fit, we say so before you waste a day on a site visit.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Shortlisting the Best Property Options</h3>
                  <p className="mb-6">Our real estate consultants in Noida build every shortlist against our internal verification process: RERA status, land title, developer delivery record, payment plan structure, and construction stage. What reaches you has already been filtered for legal and financial risk. The shortlist a buyer receives, whether for <Link href="/flats-for-sale-in-greater-noida" className="text-[#CBB27A] font-medium hover:underline">flats in Greater Noida</Link> or elsewhere, is not a list of what is available. It is a list of what is actually worth considering.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Site Visits &amp; Project Evaluation</h3>
                  <p className="mb-6">A property consultant in Noida should brief buyers before every visit, not during it. We cover what to look for: construction stage against RERA schedule, actual carpet area versus super built-up claims, and whether the developer&apos;s answers at the site align with what is filed. After the visit, observations are compared against the builder-buyer agreement before any booking conversation starts.</p>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">Complete Booking &amp; Documentation Support</h3>
                  <p className="mb-0">Agreement review, home loan coordination, sub-registrar scheduling, and documentation prep. A property consultant who stays involved through this stage prevents the problems most buyers find too late. Construction milestone tracking continues to possession. That post-booking period is where the advisory relationship earns its real value. Ready to start? <Link href="/contact" className="text-[#CBB27A] font-medium hover:underline">Get in touch</Link>.</p>
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
