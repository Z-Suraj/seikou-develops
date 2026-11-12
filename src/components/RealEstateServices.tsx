import React from 'react';
import {
  Home,
  Briefcase,
  Trees,
  Scale,
  Handshake,
  TrendingUp,
  FileCheck,
  Search,
  Calculator,
  MapPin,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface RealEstateServicesProps {
  onOpenConsultation: () => void;
  onWhatsAppInquiry: () => void;
}

export const RealEstateServices: React.FC<RealEstateServicesProps> = ({
  onOpenConsultation,
  onWhatsAppInquiry,
}) => {
  const services = [
    {
      icon: Home,
      title: 'Residential Property Consultancy',
      description: 'Expert advisory for luxury apartments, private villas, gated plots, and residential acquisitions tailored to family lifestyles and generational wealth.',
    },
    {
      icon: Briefcase,
      title: 'Commercial Property Consultancy',
      description: 'Strategic placement for corporate offices, retail spaces, commercial showrooms, and business parks with prime footfall and connectivity.',
    },
    {
      icon: Trees,
      title: 'Agricultural & Industrial Land',
      description: 'Comprehensive identification and advisory on fertile agricultural parcels, warehousing plots, and industrial corridors suited for expansion.',
    },
    {
      icon: Scale,
      title: 'Property Buying and Selling',
      description: 'Transparent end-to-end representation ensuring fair market transactions, structured negotiations, and frictionless title transfers.',
    },
    {
      icon: Handshake,
      title: 'Real Estate Brokerage',
      description: 'Professional brokerage with verified inventory, vetted buyers, and dedicated transaction managers who safeguard your interests.',
    },
    {
      icon: TrendingUp,
      title: 'Property Investment Guidance',
      description: 'Data-informed capital allocation, rental yield projections, and appreciation horizon analyses for discerning private investors.',
    },
    {
      icon: FileCheck,
      title: 'Documentation Verification Coordination',
      description: 'Rigorous coordination for legal title diligence, municipal permissions, encumbrance clearances, and registry procedures.',
    },
    {
      icon: Search,
      title: 'Property Market Research',
      description: 'In-depth regional market intelligence, emerging micro-market trends, price movement dynamics, and absorption rate studies.',
    },
    {
      icon: Calculator,
      title: 'Property Valuation Guidance',
      description: 'Accurate and realistic benchmark valuations reflecting current market metrics, infrastructure developments, and asset condition.',
    },
    {
      icon: MapPin,
      title: 'Land Acquisition Consultancy',
      description: 'Strategic land parcel aggregation, zoning analysis, boundary verifications, and regulatory roadmapping for large-scale developments.',
    },
  ];

  return (
    <section id="real-estate" className="py-24 sm:py-36 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              VERTICAL 01 · ADVISORY & BROKERAGE
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] mb-4">
            Real Estate Consultancy & Brokerage
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Navigating property transactions demands absolute market intelligence, transparent due diligence, and discreet advisory. We represent your vision with uncompromising standard.
          </p>
        </div>

        {/* 10 Services Card Grid in Luxury Obsidian & Gold */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-7 sm:p-8 rounded-lg bg-[#171717] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-sm bg-[#101010] border border-[#D4AF37]/35 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080808] transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-space text-xs font-bold text-[#777777] group-hover:text-[#D4AF37] tracking-widest tabular-nums transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Image Banner + Call to Action in Black & Gold */}
        <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#101010]">
          <div className="absolute inset-0">
            <img
              src="/assets/images/luxury_real_estate_banner_1794425271868.jpg"
              alt="Seikou Develops Real Estate Portfolio"
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/80 to-[#101010]/85" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-space text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3 block">
                BESPOKE PROPERTY SEARCH & CONSULTATION
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide mb-3">
                Looking for the Right Property?
              </h3>
              <p className="font-manrope text-sm sm:text-base text-[#B8B8B8] leading-relaxed">
                Whether you seek private residential estates, commercial expansion, or high-yield investment guidance, our senior advisors are at your service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                <span>Talk to Our Property Consultant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onWhatsAppInquiry}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm border border-[#D4AF37]/60 hover:border-[#D4AF37] bg-[#101010]/70 hover:bg-[#171717] text-white font-space font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>Instant WhatsApp Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
