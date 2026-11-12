import React from 'react';
import { Plane, Compass, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export const AirportCollaboration: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0c] relative overflow-hidden border-t border-[#D4AF37]/25">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/35 bg-[#121214] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-[#050505] overflow-hidden">
              <img
                src="/assets/images/airport_terminal_modern_1794424925648.jpg"
                alt="Durgapur Airport Infrastructure Region"
                className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.1] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121214]" />

              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808]/90 border border-[#D4AF37]/40 text-[#D4AF37] font-space text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                  <Plane className="w-3.5 h-3.5" />
                  <span>REGIONAL EXPANSION BRIEF</span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-space font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-2.5">
                  <span className="h-[1px] w-6 bg-[#D4AF37]" />
                  <span>A NEW STEP FORWARD</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide mb-4">
                  Expanding Opportunities Around Durgapur.
                </h3>

                <p className="font-manrope text-sm sm:text-base text-[#CCCCCC] leading-relaxed mb-6">
                  SEIKOU DEVELOPS is expanding its business opportunities through a new collaboration associated with the Durgapur airport region, strengthening its focus on real estate and infrastructure opportunities across West Bengal.
                </p>

                {/* Key Regional Strategic Focus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  <div className="p-3.5 rounded-sm bg-[#18181c] border border-neutral-800">
                    <div className="flex items-center gap-2 text-[#D4AF37] font-space text-xs font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Durgapur Aerotropolis Corridor</span>
                    </div>
                    <p className="font-manrope text-[11px] text-[#888888] leading-relaxed">
                      Commercial, logistics, and residential land advisory surrounding the Durgapur airport hub.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-sm bg-[#18181c] border border-neutral-800">
                    <div className="flex items-center gap-2 text-[#D4AF37] font-space text-xs font-semibold mb-1">
                      <Compass className="w-3.5 h-3.5" />
                      <span>South Bengal Connectivity</span>
                    </div>
                    <p className="font-manrope text-[11px] text-[#888888] leading-relaxed">
                      Strategic positioning connecting Bankura, Asansol, and Durgapur industrial belts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Advisory Disclaimer Notice & Action */}
              <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-2 max-w-md">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="font-space text-[10px] text-[#777777] leading-relaxed">
                    * Regional Collaboration Advisory: Preliminary collaboration initiative associated with regional growth; specific operational agreements and commercial parameters are subject to statutory verifications.
                  </span>
                </div>

                <a
                  href={buildWhatsAppUrl("Hello Seikou Develops, I am interested in inquiring about real estate and commercial opportunities around the Durgapur airport region.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.16em] transition-all whitespace-nowrap cursor-pointer shadow-md"
                >
                  <span>Inquire on Durgapur</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
