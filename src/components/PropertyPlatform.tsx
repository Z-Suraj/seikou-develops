import React, { useState, useMemo } from 'react';
import { PropertyListing } from '../types';
import { WEST_BENGAL_PROPERTIES } from '../data/propertiesData';
import {
  MapPin,
  ShieldCheck,
  Search,
  Filter,
  MessageSquare,
  ArrowUpRight,
  X,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { buildWhatsAppUrl, PRESET_MESSAGES } from '../lib/whatsapp';

interface PropertyPlatformProps {
  onOpenConsultation?: () => void;
}

export const PropertyPlatform: React.FC<PropertyPlatformProps> = ({ onOpenConsultation }) => {
  const [selectedCity, setSelectedCity] = useState<'All' | 'Bankura' | 'Durgapur'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  const categories = [
    'All',
    'Commercial Land',
    'Commercial Properties',
    'Residential Plots',
    'Residential Opportunities',
    'Agricultural Land',
  ];

  const filteredProperties = useMemo(() => {
    return WEST_BENGAL_PROPERTIES.filter((item) => {
      const matchCity = selectedCity === 'All' || item.city === selectedCity;
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchIntent = selectedIntent === 'All' || item.intent === selectedIntent;
      const matchQuery = searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCity && matchCategory && matchIntent && matchQuery;
    });
  }, [selectedCity, selectedCategory, selectedIntent, searchQuery]);

  return (
    <section id="properties" className="py-24 sm:py-36 bg-[#09090b] relative overflow-hidden border-t border-[#D4AF37]/25">
      {/* Background glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C5A46D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              WEST BENGAL PROPERTY PLATFORM
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide mb-3">
            Verified Property Opportunities
          </h2>

          <div className="inline-block px-4 py-1.5 rounded-sm bg-[#121214] border border-[#D4AF37]/40 text-[#D4AF37] font-space text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            Serving Real Estate Opportunities Across West Bengal.
          </div>

          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Focused exclusively within Bankura, Durgapur, and South Bengal growth corridors. Every published opportunity adheres to genuine verification protocols with zero fictional listings.
          </p>
        </div>

        {/* Filter and Search Control Center */}
        <div className="p-6 rounded-lg bg-[#121214] border border-[#D4AF37]/30 shadow-2xl mb-12">
          {/* Location Tabs (Bankura / Durgapur / All West Bengal) */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-space text-xs font-bold text-white uppercase tracking-wider">
                Primary Territory:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['All', 'Bankura', 'Durgapur'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-sm font-space text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#D4AF37] text-[#080808] shadow-md border border-[#E8CB83]'
                      : 'bg-[#18181c] text-[#A0A0A0] hover:text-[#D4AF37] border border-neutral-800'
                  }`}
                >
                  {city === 'All' ? 'All West Bengal' : `${city}, WB`}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input & Intent Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-5">
            {/* Search Query */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, locality, or land scope (e.g. Bankura, Durgapur, Plot, Commercial)..."
                className="w-full pl-10 pr-4 py-3 rounded-sm bg-[#18181c] border border-neutral-800 text-white font-manrope text-xs sm:text-sm placeholder-[#666666] focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Intent Select (Buy / Sell / Investment) */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="font-space text-xs text-[#888888] whitespace-nowrap">Intent:</span>
              <div className="flex gap-1.5 w-full">
                {['All', 'Buy', 'Investment'].map((intent) => (
                  <button
                    key={intent}
                    onClick={() => setSelectedIntent(intent)}
                    className={`flex-1 py-2.5 rounded-sm font-space text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer text-center ${
                      selectedIntent === intent
                        ? 'bg-[#222226] text-[#D4AF37] border border-[#D4AF37]/60'
                        : 'bg-[#18181c] text-[#888888] hover:text-white border border-neutral-800'
                    }`}
                  >
                    {intent}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Pills (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-neutral-800/80">
            <span className="font-space text-[10px] text-[#777777] uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#D4AF37]" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm font-space text-[10px] uppercase font-bold tracking-wider shrink-0 transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#080808]'
                    : 'bg-[#18181c] text-[#A0A0A0] hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid or Honest Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="group bg-[#141416] rounded-lg overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.18)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#0c0c0e]">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/20 to-transparent" />

                    {/* Category Chip */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-sm bg-[#080808]/90 font-space text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] border border-[#D4AF37]/40 shadow-md backdrop-blur-md">
                        {prop.category}
                      </span>
                    </div>

                    {/* Location Chip */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-sm bg-[#080808]/90 font-space text-[10px] font-semibold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5 backdrop-blur-md shadow-md">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>{prop.city}, WB</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 font-space text-xs text-[#D4AF37] tracking-wider mb-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="line-clamp-1">{prop.location}</span>
                    </div>

                    <h3 className="font-cinzel text-lg font-bold text-white mb-2.5 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {prop.title}
                    </h3>

                    <p className="font-manrope text-xs text-[#B8B8B8] line-clamp-3 mb-4 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Scope & Guide Metrics */}
                    <div className="p-3 rounded-sm bg-[#1a1a1e] border border-neutral-800 space-y-1 mb-4">
                      {prop.size && (
                        <div className="flex items-center justify-between text-[11px] font-space">
                          <span className="text-[#888888] uppercase tracking-wider">Scope / Area:</span>
                          <span className="text-white font-medium">{prop.size}</span>
                        </div>
                      )}
                      {prop.price && (
                        <div className="flex items-center justify-between text-[11px] font-space">
                          <span className="text-[#888888] uppercase tracking-wider">Advisory Guide:</span>
                          <span className="text-[#D4AF37] font-semibold">{prop.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-800/80 pt-4">
                  <button
                    onClick={() => setSelectedProperty(prop)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-[0.16em] text-[#B8B8B8] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span>Consultation Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsAppUrl(`Hello Seikou Develops, I am inquiring about the property: "${prop.title}" located in ${prop.location}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#E8CB83] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Honest Empty State per Client Instruction */
          <div className="p-12 sm:p-16 rounded-lg bg-[#121214] border border-[#D4AF37]/30 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-[#18181c] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">
              New property opportunities are being updated.
            </h3>
            <p className="font-manrope text-sm text-[#B8B8B8] mb-6 leading-relaxed">
              Contact our team for current availability across Bankura, Durgapur, and South Bengal. We only publish verified parcels with confirmed title documents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCity('All');
                  setSelectedCategory('All');
                  setSelectedIntent('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-sm border border-neutral-700 text-[#B8B8B8] hover:text-white font-space text-xs uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
              <a
                href={buildWhatsAppUrl("Hello Seikou Develops, I am looking for property opportunities in West Bengal (Bankura/Durgapur). Please share current verified availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Our Property Desk</span>
              </a>
            </div>
          </div>
        )}

        {/* Sell / List Your Property in West Bengal Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-lg bg-[#121214] border border-[#D4AF37]/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
              <Building className="w-4 h-4" />
              <span>Looking to Sell or List Property in West Bengal?</span>
            </div>
            <p className="font-manrope text-xs sm:text-sm text-[#B8B8B8] leading-relaxed">
              We connect title-verified landowners in Bankura, Durgapur, and neighboring districts with qualified buyers and investors. Submit your property for thorough document diligence and direct advisory.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-all shadow-md cursor-pointer"
          >
            Submit Property for Verification
          </button>
        </div>
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#141416] rounded-lg border border-[#D4AF37]/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#080808]/85 text-[#B8B8B8] hover:text-[#D4AF37] transition-colors cursor-pointer border border-neutral-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-60 sm:h-72 w-full relative bg-[#050505] shrink-0">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover filter brightness-[0.82]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex items-center gap-3 mb-2 font-space">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {selectedProperty.category}
                </span>
                <span className="text-[#777777]">·</span>
                <span className="text-xs text-[#B8B8B8] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {selectedProperty.location}
                </span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">
                {selectedProperty.title}
              </h3>

              <p className="font-manrope text-sm text-[#B8B8B8] leading-relaxed mb-6">
                {selectedProperty.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-sm bg-[#1b1b1f] border border-neutral-800">
                <div>
                  <span className="font-space text-[10px] text-[#777777] uppercase tracking-wider block">Scope / Size</span>
                  <span className="font-manrope text-sm font-semibold text-white">{selectedProperty.size || 'On Application'}</span>
                </div>
                <div>
                  <span className="font-space text-[10px] text-[#777777] uppercase tracking-wider block">Pricing Guidance</span>
                  <span className="font-manrope text-sm font-semibold text-[#D4AF37]">{selectedProperty.price || 'Direct Advisory'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs font-space text-[#777777] mb-6 p-3 rounded-sm bg-[#101012] border border-neutral-800/80">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Notice: Specific registry dag/khatian records and CAD demarcations are released upon client identity verification to prevent unauthorized broker solicitations.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="w-full sm:w-auto px-5 py-2.5 font-space rounded-sm text-xs font-semibold text-[#B8B8B8] hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={buildWhatsAppUrl(`Hello Seikou Develops, I am interested in scheduling a consultation regarding "${selectedProperty.title}" in ${selectedProperty.location}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
