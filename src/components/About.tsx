import React from 'react';
import { Compass, Target, ArrowRight } from 'lucide-react';

interface AboutProps {
  onLearnMore: () => void;
}

export const About: React.FC<AboutProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-24 sm:py-36 bg-[#080808] relative overflow-hidden">
      {/* Subtle Architectural Glow & Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#C5A46D]/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural / Construction Photography in Luxury Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-2xl group bg-[#101010]">
              <img
                src="/assets/images/about_corporate_architecture_1794425239207.jpg"
                alt="Seikou Develops Corporate Headquarters & Architecture"
                className="w-full h-[480px] sm:h-[560px] object-cover filter brightness-[0.85] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />

              {/* Inset Credibility Overlay in Deep Black & Gold */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-md bg-[#101010]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    INTEGRATED EXECUTION
                  </span>
                  <span className="font-space text-[11px] text-[#B8B8B8] tracking-wider">
                    Consultancy + Contracting
                  </span>
                </div>
                <p className="font-manrope text-xs sm:text-sm font-medium text-white leading-relaxed">
                  Bridging real estate insight with heavy civil engineering standards.
                </p>
              </div>
            </div>

            {/* Geometric Luxury Accent Corner */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] -z-1 pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] -z-1 pointer-events-none hidden sm:block" />
          </div>

          {/* Right Column: Company Story & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
                ABOUT SEIKOU DEVELOPS
              </span>
            </div>

            {/* Section Heading in Cinzel and Bodoni Moda */}
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] leading-[1.18] mb-6 text-balance">
              More Than Property.{' '}
              <span className="block font-bodoni italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EA] via-[#D4AF37] to-[#B89650]">
                A Partnership Built on Trust.
              </span>
            </h2>

            {/* Narrative Prose */}
            <div className="space-y-4 font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Seikou Develops is a real estate consultancy, brokerage and construction solutions company committed to delivering reliable property services and quality construction experiences.
              </p>
              <p>
                With a legacy dating back to 2008 and over 22 years of experience in the building materials business, we bring together industry knowledge, professional guidance and practical execution under one roof.
              </p>
              <p className="text-neutral-400">
                Our expertise extends across Real Estate Consultancy & Brokerage and Construction & Turnkey Solutions. From helping clients identify the right property, understand market opportunities and navigate documentation to executing complete civil construction projects, we aim to make every stage of the property journey easier, more transparent and more convenient.
              </p>
            </div>

            {/* Two Distinctive Content Blocks: Vision & Promise in Black & Gold */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Vision Card */}
              <div className="p-6 rounded-md bg-[#171717] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-sm bg-[#101010] text-[#D4AF37] border border-[#D4AF37]/30">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-white">
                    Our Vision
                  </h3>
                </div>
                <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] leading-relaxed">
                  To become a trusted name in real estate and construction by making property acquisition, investment and development more accessible, efficient and rewarding.
                </p>
              </div>

              {/* Promise Card */}
              <div className="p-6 rounded-md bg-[#171717] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-sm bg-[#101010] text-[#D4AF37] border border-[#D4AF37]/30">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-white">
                    Our Promise
                  </h3>
                </div>
                <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] leading-relaxed">
                  One company. Two specialised verticals. Complete property and construction solutions.
                </p>
              </div>
            </div>

            {/* Action Link */}
            <div>
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center gap-2.5 font-space text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#FFF9EA] transition-colors cursor-pointer"
              >
                <span>Discover our core verticals & capabilities</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
