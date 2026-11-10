import React from 'react';
import { ArrowRight, Check, Building, Hammer } from 'lucide-react';

interface VerticalsProps {
  onSelectRealEstate: () => void;
  onSelectConstruction: () => void;
}

export const Verticals: React.FC<VerticalsProps> = ({
  onSelectRealEstate,
  onSelectConstruction,
}) => {
  const realEstateServices = [
    'Residential Properties',
    'Commercial Properties',
    'Agricultural Properties',
    'Industrial Properties',
    'Property Buying and Selling',
    'Real Estate Brokerage',
    'Investment Guidance',
    'Documentation Verification Coordination',
    'Market Research',
    'Property Valuation Guidance',
    'Land Acquisition',
    'Project Consultancy',
  ];

  const constructionServices = [
    'Complete Civil Construction',
    'Residential Buildings',
    'Commercial Buildings',
    'Turnkey Construction',
    'Civil Engineering Guidance',
    'AutoCAD Planning',
    'Architectural Coordination',
    'Building Materials',
    'Windows and Gates',
    'Fabrication',
    'Tiles and Flooring',
    'Putty and Painting',
    'Interior Designing',
    'Complete Finishing',
    'Final Project Handover',
  ];

  return (
    <section id="expertise" className="py-24 sm:py-36 bg-[#101010] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              OUR TWO SPECIALISED VERTICALS
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] mb-4">
            Unified Expertise. Dual Powerhouses.
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Whether securing strategic real estate or constructing architectural landmarks from the foundation up, we deliver uncompromising excellence.
          </p>
        </div>

        {/* The Two Distinctive Interactive Luxury Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* CARD 01: REAL ESTATE */}
          <div className="group relative rounded-lg overflow-hidden border border-[#D4AF37]/25 bg-[#171717] shadow-2xl flex flex-col justify-between transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]">
            {/* Background Image Container */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#050505]">
              <img
                src="/src/assets/images/real_estate_luxury_property_1794335446043.jpg"
                alt="Luxury Real Estate Consultancy and Brokerage"
                className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808]/90 border border-[#D4AF37]/40 text-[#D4AF37] font-space text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                  <Building className="w-3.5 h-3.5" />
                  <span>Vertical 01</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3 group-hover:text-[#D4AF37] transition-colors">
                  REAL ESTATE CONSULTANCY & BROKERAGE
                </h3>
                <p className="font-manrope text-sm text-[#B8B8B8] leading-relaxed mb-6">
                  Professional property consultancy, brokerage and investment guidance to help clients make informed property decisions.
                </p>

                {/* Service Tags Grid */}
                <div className="mb-8">
                  <h4 className="font-space text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-4">
                    Key Advisory & Transactional Scope:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {realEstateServices.map((service, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-300">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="font-manrope">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-5 border-t border-neutral-800">
                <button
                  onClick={onSelectRealEstate}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <span>Explore Real Estate Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CARD 02: CONSTRUCTION & TURNKEY */}
          <div className="group relative rounded-lg overflow-hidden border border-[#D4AF37]/25 bg-[#171717] shadow-2xl flex flex-col justify-between transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]">
            {/* Background Image Container */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#050505]">
              <img
                src="/src/assets/images/civil_construction_engineering_1794335448396.jpg"
                alt="Turnkey Construction and Civil Engineering"
                className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808]/90 border border-[#D4AF37]/40 text-[#D4AF37] font-space text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                  <Hammer className="w-3.5 h-3.5" />
                  <span>Vertical 02</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3 group-hover:text-[#D4AF37] transition-colors">
                  CONSTRUCTION & TURNKEY SOLUTIONS
                </h3>
                <p className="font-manrope text-sm text-[#B8B8B8] leading-relaxed mb-6">
                  End-to-end construction and finishing solutions supported by engineering expertise, quality materials and practical execution.
                </p>

                {/* Service Tags Grid */}
                <div className="mb-8">
                  <h4 className="font-space text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-4">
                    Complete Execution Scope:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {constructionServices.map((service, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-300">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="font-manrope">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-5 border-t border-neutral-800">
                <button
                  onClick={onSelectConstruction}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <span>Explore Construction Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
