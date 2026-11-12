import React from 'react';
import { ShieldCheck, Award, Layers, Building2, MapPin } from 'lucide-react';

export const Credibility: React.FC = () => {
  const credibilityItems = [
    {
      icon: ShieldCheck,
      headline: 'SINCE 2008',
      title: 'Company Legacy',
      description: 'Over 18 years of continuous trust, industry advisory and client-focused real estate delivery.',
    },
    {
      icon: Layers,
      headline: '22+ YEARS',
      title: 'Building Materials Domain',
      description: 'Extensive business background in premium building materials, sourcing, and supply reliability.',
      note: 'Domain experience timeline',
    },
    {
      icon: Award,
      headline: 'AUTHORISED',
      title: 'Dealership Experience',
      description: 'Direct industry relationships ensuring genuine, certified materials for all construction works.',
    },
    {
      icon: Building2,
      headline: 'BCW CONTRACTOR',
      title: 'Contractor Experience',
      description: 'Specialised execution capability adhering to rigorous civil engineering benchmarks.',
    },
    {
      icon: MapPin,
      headline: 'WEST BENGAL',
      title: 'Regional Focus',
      description: 'Serving genuine real estate opportunities and turnkey construction across West Bengal.',
    },
  ];

  return (
    <section
      id="credibility"
      className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-[#101010] border border-[#D4AF37]/30 rounded-lg shadow-2xl p-6 sm:p-10 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/15">
          {credibilityItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col justify-between ${index !== 0 ? 'pt-6 md:pt-0 md:pl-6' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="p-2 rounded-sm bg-[#171717] border border-[#D4AF37]/30 text-[#D4AF37]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wider">
                      {item.headline}
                    </span>
                  </div>

                  <h2 className="font-space text-xs font-bold text-[#D4AF37] uppercase tracking-[0.14em] mb-2">
                    {item.title}
                  </h2>

                  <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.note && (
                  <span className="mt-3 font-space text-[10px] text-[#777777] italic tracking-wide">
                    * {item.note}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
