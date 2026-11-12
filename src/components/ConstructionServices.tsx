import React from 'react';
import {
  HardHat,
  Building,
  KeyRound,
  Compass,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  Grid,
  Paintbrush,
  Sparkles,
  ArrowRight,
  Hammer,
  Palette,
  CheckCircle,
  Home,
  SunMedium,
  Lamp
} from 'lucide-react';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface ConstructionServicesProps {
  onStartProject: () => void;
}

export const ConstructionServices: React.FC<ConstructionServicesProps> = ({ onStartProject }) => {
  // Exact 12-Service Grid per Client Specifications
  const constructionCategories = [
    {
      index: '01',
      title: 'Civil Construction',
      icon: HardHat,
      desc: 'Robust earthworks, deep footing, reinforced RCC pillars, slab casting, and load-bearing masonry executed with appropriate engineering supervision and applicable safety requirements.',
    },
    {
      index: '02',
      title: 'Residential & Commercial Buildings',
      icon: Building,
      desc: 'Ground-up execution of residential villas, multi-storey apartment blocks, and commercial establishments built with a focus on durability and functionality.',
    },
    {
      index: '03',
      title: 'Turnkey Construction',
      icon: KeyRound,
      desc: 'Coordinated construction solutions covering architectural planning, procurement, structural execution, interior work, and finishing, subject to an agreed project scope.',
    },
    {
      index: '04',
      title: 'Civil Engineering Guidance',
      icon: Compass,
      desc: 'Engineering coordination covering structural planning, site suitability, load-related assessments and construction safety considerations through appropriately qualified professionals.',
    },
    {
      index: '05',
      title: 'AutoCAD Planning',
      icon: FileSpreadsheet,
      desc: 'Precision 2D and 3D architectural drafts, floor layout planning, structural working drawings and elevation blueprints.',
    },
    {
      index: '06',
      title: 'Architectural Coordination',
      icon: Layers,
      desc: 'Coordination between architectural design and on-site construction to improve execution accuracy and minimise avoidable discrepancies.',
    },
    {
      index: '07',
      title: 'Branded Building Materials',
      icon: ShieldCheck,
      desc: 'Building material solutions supported by our stated 22+ years of building-material business experience, including TMT bars, cement, aggregates and waterproofing products.',
    },
    {
      index: '08',
      title: 'Windows, Gates & Fabrication',
      icon: Hammer,
      desc: 'Custom MS and SS fabrication, entrance gates, safety grills, and UPVC and aluminium window systems.',
    },
    {
      index: '09',
      title: 'Tiles & Flooring',
      icon: Grid,
      desc: 'Installation solutions for vitrified tiles, marble, granite, wooden flooring and outdoor paving.',
    },
    {
      index: '10',
      title: 'Painting & Finishing',
      icon: Paintbrush,
      desc: 'Wall preparation, putty, priming, interior painting and exterior protective coatings.',
    },
    {
      index: '11',
      title: 'Interior Designing',
      icon: Sparkles,
      desc: 'Bespoke modular kitchens, false ceiling concepts, custom lighting, furniture planning and functional carpentry.',
    },
    {
      index: '12',
      title: 'Interior Execution & Finishing',
      icon: Palette,
      desc: 'Coordinated interior implementation, finishing details, fixtures, surface treatments and space refinement.',
    },
  ];

  return (
    <section id="construction" className="py-24 sm:py-36 bg-[#101010] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetrical Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
                VERTICAL 02 · CIVIL & TURNKEY SOLUTIONS
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] leading-tight mb-4">
              From Foundation to Final Finish.
            </h2>
            <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed max-w-3xl">
              Our construction solutions combine professional civil engineering guidance, AutoCAD planning, quality building materials, fabrication, windows and gates, painting, flooring, interior designing and complete finishing solutions.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={onStartProject}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
            >
              <span>Start Your Construction Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Three Visual Construction Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Stage 01 */}
          <div className="relative rounded-lg overflow-hidden h-72 border border-[#D4AF37]/30 shadow-xl group bg-[#050505]">
            <img
              src="/assets/images/civil_construction_engineering_1794335448396.jpg"
              alt="Structural Civil Framework & Core Engineering"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block mb-1">
                STAGE 01
              </span>
              <h3 className="font-cinzel text-base font-bold text-white mb-1">
                Structural Civil Framework & Core Engineering
              </h3>
              <p className="font-manrope text-[11px] text-[#A0A0A0] line-clamp-2">
                RCC structural framework, building columns, deep footing, and precision slab casting.
              </p>
            </div>
          </div>

          {/* Stage 02 */}
          <div className="relative rounded-lg overflow-hidden h-72 border border-[#D4AF37]/30 shadow-xl group bg-[#050505]">
            <img
              src="/assets/images/structural_fabrication_glazing_1794424926847.jpg"
              alt="Windows, Gates & Precision Fabrication"
              className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block mb-1">
                STAGE 02
              </span>
              <h3 className="font-cinzel text-base font-bold text-white mb-1">
                Windows, Gates & Precision Fabrication
              </h3>
              <p className="font-manrope text-[11px] text-[#A0A0A0] line-clamp-2">
                Architectural window systems, glass curtain facades, and custom entrance gates.
              </p>
            </div>
          </div>

          {/* Stage 03 */}
          <div className="relative rounded-lg overflow-hidden h-72 border border-[#D4AF37]/30 shadow-xl group bg-[#050505]">
            <img
              src="/assets/images/luxury_interior_finishing_1794424928066.jpg"
              alt="Interior Design & Finishing"
              className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block mb-1">
                STAGE 03
              </span>
              <h3 className="font-cinzel text-base font-bold text-white mb-1">
                Interior Design & Finishing
              </h3>
              <p className="font-manrope text-[11px] text-[#A0A0A0] line-clamp-2">
                Bespoke modular kitchens, false ceilings, architectural lighting, and premium flooring.
              </p>
            </div>
          </div>
        </div>

        {/* 12-Service Construction Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-space text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] block mb-2">
              COMPREHENSIVE CAPABILITIES
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              End-to-End Construction Disciplines
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {constructionCategories.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.index}
                  className="p-6 sm:p-7 rounded-lg bg-[#161618] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-2.5 rounded-sm bg-[#101012] text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-[#080808] transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-space text-xs font-bold text-[#777777] group-hover:text-[#D4AF37] transition-colors">
                        {item.index}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-base font-bold text-white mb-2.5 group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-manrope text-xs text-[#B8B8B8] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 6: Interior Visual Experience Showcase */}
        <div className="mb-24 p-8 sm:p-12 rounded-lg bg-[#141416] border border-[#D4AF37]/30 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                INTERIOR VISUAL EXPERIENCE
              </span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Spatial Sophistication & Material Finishes
            </h3>
            <p className="font-manrope text-sm text-[#B8B8B8] leading-relaxed">
              Experience the harmony of architectural lighting, bespoke woodwork, and polished surfaces. Our interior execution brings understated grandeur to residential villas and executive commercial spaces.
            </p>
          </div>

          {/* Asymmetrical Editorial Interior Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Primary Large Interior Feature */}
            <div className="md:col-span-7 relative rounded-lg overflow-hidden min-h-[380px] border border-[#D4AF37]/30 group bg-[#050505]">
              <img
                src="/assets/images/real_estate_luxury_property_1794335446043.jpg"
                alt="Luxury Living Room & Open Concept Residence"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] block mb-1">
                  CONCEPTUAL LIVING SPACES
                </span>
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white mb-1.5">
                  Panoramic Living Suites & High-Ceiling Architecture
                </h4>
                <p className="font-manrope text-xs text-[#B8B8B8] line-clamp-2">
                  Seamless acoustic glazing, Italian marble flooring, and concealed ambient ceiling channels.
                </p>
              </div>
            </div>

            {/* Stacked Interior Columns */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="relative rounded-lg overflow-hidden h-[180px] sm:h-[195px] border border-[#D4AF37]/25 group bg-[#050505]">
                <img
                  src="/assets/images/modern_modular_kitchen_1794424949167.jpg"
                  alt="Modular Kitchens & Dining Concepts"
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-space text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                    MODULAR KITCHENS & JOINERY
                  </span>
                  <h5 className="font-cinzel text-sm font-bold text-white">
                    Ergonomic Cabinetry & Quartz Countertops
                  </h5>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden h-[180px] sm:h-[195px] border border-[#D4AF37]/25 group bg-[#050505]">
                <img
                  src="/assets/images/luxury_master_bedroom_1794424950658.jpg"
                  alt="Architectural Lighting & False Ceiling Concepts"
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-space text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                    ARCHITECTURAL ILLUMINATION
                  </span>
                  <h5 className="font-cinzel text-sm font-bold text-white">
                    Multi-Tier False Ceilings & Warm Rim Light
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Replace Hill Craft Executive with LUXURY VILLA */}
        <div id="luxury-villa" className="relative rounded-lg overflow-hidden border border-[#D4AF37]/45 shadow-2xl bg-[#141416]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Villa Image Column */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-[#050505] overflow-hidden">
              <img
                src="/assets/images/luxury_villa_exterior_1794424927417.jpg"
                alt="Luxury Villa — Contemporary Private Residence Elevation"
                className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141416]" />

              {/* Conceptual Demonstration Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 rounded-sm bg-[#080808]/90 border border-[#D4AF37]/40 text-[#D4AF37] font-space text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
                  RESIDENTIAL DESIGN CONCEPT
                </span>
              </div>
            </div>

            {/* Villa Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-space text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-2">
                  <Home className="w-4 h-4" />
                  <span>RESIDENTIAL SPECIALIZATION</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide mb-4">
                  LUXURY VILLA
                </h3>

                <p className="font-manrope text-sm text-[#CCCCCC] leading-relaxed mb-6">
                  Experience bespoke private villa design crafted for discerning families across West Bengal. Our turnkey residential model harmonizes contemporary exterior elevation, landscaped entrances, natural light, and elegant outdoor spaces.
                </p>

                {/* Key Villa Design Highlights */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="font-manrope text-xs sm:text-[13px] text-neutral-300">
                      Contemporary exterior elevations with natural stone and thermal-break glazing.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="font-manrope text-xs sm:text-[13px] text-neutral-300">
                      Private landscaped grounds, vehicular driveways, and secure compound walls.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="font-manrope text-xs sm:text-[13px] text-neutral-300">
                      Turnkey civil coordination from deep foundation to custom interior carpentry.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onStartProject}
                  className="px-6 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md text-center cursor-pointer"
                >
                  Plan Your Luxury Villa
                </button>
                <a
                  href={buildWhatsAppUrl("Hello Seikou Develops, I am interested in exploring turnkey luxury villa design and construction in West Bengal.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-sm border border-[#D4AF37]/50 hover:border-[#D4AF37] text-white font-space font-semibold text-xs uppercase tracking-[0.18em] transition-all text-center"
                >
                  WhatsApp Villa Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
