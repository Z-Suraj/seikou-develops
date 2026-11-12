import React from 'react';
import { ArrowUpRight, Award, Compass, Sparkles, UserCheck } from 'lucide-react';
import { buildWhatsAppUrl, PRESET_MESSAGES } from '../lib/whatsapp';

export const Founder: React.FC = () => {
  return (
    <section id="founder" className="py-24 sm:py-36 bg-[#080808] relative overflow-hidden border-t border-[#D4AF37]/25">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C5A46D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="text-center sm:text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              LEADERSHIP & VISION
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37] sm:hidden" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em]">
            Executive Leadership
          </h2>
        </div>

        {/* Editorial 2-Column Founder Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Large Founder Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#121212] group max-w-md mx-auto lg:max-w-none">
              {/* Corner Reticles */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />

              {/* Founder Photograph */}
              <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden bg-[#0c0c0e]">
                <img
                  src="/assets/sayan-mahanta.png"
                  alt="Sayan Mahanta — Founder & Entrepreneur, Seikou Develops"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.95] transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85" />
              </div>

              {/* Floating Name Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-sm bg-[#101010]/95 backdrop-blur-md border border-[#D4AF37]/35 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                      SAYAN MAHANTA
                    </h3>
                    <p className="font-space text-xs text-[#D4AF37] font-semibold tracking-wider">
                      Founder & Entrepreneur · SEIKOU DEVELOPS
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-space text-[10px] text-[#888888] uppercase block tracking-widest">
                      Age
                    </span>
                    <span className="font-cinzel text-base font-bold text-[#E8CB83]">
                      21 Years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Narrative & Professional Biography */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3.5 py-1 rounded-sm bg-[#171717] border border-[#D4AF37]/30 text-[#D4AF37] font-space text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                FOUNDER'S PROFILE
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide mb-4">
                One of West Bengal's Young Real Estate Entrepreneurs.
              </h3>

              <div className="space-y-4 font-manrope text-sm sm:text-base text-[#B8B8B8] leading-relaxed mb-8">
                <p>
                  At 21 years of age, <strong className="text-white font-medium">Sayan Mahanta</strong> represents a dynamic, forward-looking generation of real estate entrepreneurs in West Bengal. Grounded in a strong regional heritage, he is dedicated to developing transparent property consultancy, reliable brokerage frameworks, and modern turnkey construction solutions.
                </p>
                <p>
                  Under his leadership, <strong className="text-white font-medium">SEIKOU DEVELOPS</strong> bridges institutional discipline with grassroots regional execution—connecting families, business owners, and commercial investors with verified property opportunities primarily concentrated in Bankura, Durgapur, and emerging growth corridors across West Bengal.
                </p>
                <p>
                  Supported by the company's legacy since 2008 and over two decades of family business background in building materials, Sayan's entrepreneurial philosophy prioritizes strict documentation verification, zero client ambiguity, and high civil construction standards from foundation to final finish.
                </p>
              </div>

              {/* Core Leadership Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-sm bg-[#121214] border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#D4AF37]">
                    <UserCheck className="w-4 h-4" />
                    <span className="font-space text-xs font-bold uppercase tracking-wider">Direct Trust</span>
                  </div>
                  <p className="font-manrope text-xs text-[#999999] leading-snug">
                    Personal oversight on client property advisory and commercial transactions.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#121214] border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#D4AF37]">
                    <Compass className="w-4 h-4" />
                    <span className="font-space text-xs font-bold uppercase tracking-wider">Regional Focus</span>
                  </div>
                  <p className="font-manrope text-xs text-[#999999] leading-snug">
                    Deep micro-market roots across Bankura, Durgapur, and South Bengal.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#121214] border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#D4AF37]">
                    <Award className="w-4 h-4" />
                    <span className="font-space text-xs font-bold uppercase tracking-wider">Quality Standards</span>
                  </div>
                  <p className="font-manrope text-xs text-[#999999] leading-snug">
                    BCW-grade execution benchmarks and genuine building materials.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-space text-[10px] text-[#777777] uppercase tracking-widest block">
                  Office of the Founder
                </span>
                <span className="font-manrope text-xs text-[#B8B8B8]">
                  Available for strategic consultations & joint ventures across West Bengal.
                </span>
              </div>

              <a
                href={buildWhatsAppUrl("Hello Sayan Mahanta, I would like to schedule a strategic consultation with Seikou Develops regarding real estate opportunities in West Bengal.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md whitespace-nowrap cursor-pointer"
              >
                <span>Connect with Founder</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
