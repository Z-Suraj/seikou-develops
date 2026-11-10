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
  CheckCircle,
  ArrowRight,
  Hammer
} from 'lucide-react';

interface ConstructionServicesProps {
  onStartProject: () => void;
}

export const ConstructionServices: React.FC<ConstructionServicesProps> = ({ onStartProject }) => {
  const constructionCategories = [
    {
      index: '01',
      title: 'Civil Construction',
      icon: HardHat,
      desc: 'Robust earthworks, deep footing, reinforced RCC pillars, slab casting, and load-bearing masonry to national safety codes.',
    },
    {
      index: '02',
      title: 'Residential & Commercial Buildings',
      icon: Building,
      desc: 'Ground-up execution of residential villas, multi-storey apartment blocks, and commercial establishments built for durability.',
    },
    {
      index: '03',
      title: 'Turnkey Construction',
      icon: KeyRound,
      desc: 'Single-contract accountability covering architectural planning, procurement, structural execution, interior work, and final keys.',
    },
    {
      index: '04',
      title: 'Civil Engineering Guidance',
      icon: Compass,
      desc: 'Structural engineering oversight, soil suitability testing, load calculations, and site safety management by senior engineers.',
    },
    {
      index: '05',
      title: 'AutoCAD Planning',
      icon: FileSpreadsheet,
      desc: 'Precision 2D/3D architectural drafts, floor layout optimization, structural working drawings, and elevation blueprints.',
    },
    {
      index: '06',
      title: 'Architectural Coordination',
      icon: Layers,
      desc: 'Seamless translation from design vision to on-site civil reality, preventing costly rework and execution discrepancies.',
    },
    {
      index: '07',
      title: 'Branded Building Materials',
      icon: ShieldCheck,
      desc: 'Direct leveraging of our 22+ years materials legacy: genuine TMT bars, certified cement, premium aggregates, and waterproofing.',
    },
    {
      index: '08',
      title: 'Windows, Gates & Fabrication',
      icon: Hammer,
      desc: 'Custom heavy MS/SS fabrication, automated security entrance gates, safety grills, and high-spec UPVC/aluminium window systems.',
    },
    {
      index: '09',
      title: 'Tiles & Flooring',
      icon: Grid,
      desc: 'Precision laser-levelled installation of vitrified tiles, Italian marble, granite counters, wooden flooring, and outdoor pavers.',
    },
    {
      index: '10',
      title: 'Painting & Finishing',
      icon: Paintbrush,
      desc: 'Multi-coat wall putty preparation, damp-proof priming, luxury emulsion applications, and weatherproof exterior coatings.',
    },
    {
      index: '11',
      title: 'Interior Designing',
      icon: Sparkles,
      desc: 'Bespoke modular kitchens, false ceiling concepts, custom lighting schematics, and functional carpentry for refined spaces.',
    },
    {
      index: '12',
      title: 'Complete Project Handover',
      icon: CheckCircle,
      desc: 'Comprehensive post-construction defect checklist inspection, deep cleaning, operational testing, and documentation handover.',
    },
  ];

  return (
    <section id="construction" className="py-24 sm:py-36 bg-[#101010] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Visual Storytelling Editorial Strip with Gold Accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="relative rounded-lg overflow-hidden h-64 border border-[#D4AF37]/25 shadow-xl group bg-[#050505]">
            <img
              src="/src/assets/images/civil_construction_engineering_1794335448396.jpg"
              alt="Civil Structural Framing"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block mb-1">
                STAGE 01
              </span>
              <h3 className="font-cinzel text-base font-bold text-white">
                Structural Civil Framework & Core Engineering
              </h3>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden h-64 border border-[#D4AF37]/25 shadow-xl group bg-[#050505]">
            <img
              src="/src/assets/images/project_commercial_complex_1794335447966.jpg"
              alt="Fabrication and Exterior Glazing"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block mb-1">
                STAGE 02
              </span>
              <h3 className="font-cinzel text-base font-bold text-white">
                Windows, Gates & Precision Fabrication
              </h3>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden h-64 border border-[#D4AF37]/25 shadow-xl group bg-[#050505]">
            <img
              src="/src/assets/images/project_luxury_residence_1794335447445.jpg"
              alt="Interior and Handover Finish"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block mb-1">
                STAGE 03
              </span>
              <h3 className="font-cinzel text-base font-bold text-white">
                Turnkey Finishing, Tiles & Handover
              </h3>
            </div>
          </div>
        </div>

        {/* 12 Categories Grid in Luxury Obsidian & Gold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {constructionCategories.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.index}
                className="p-6 sm:p-7 rounded-lg bg-[#171717] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-sm bg-[#101010] text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-[#080808] transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-space text-xs font-bold text-[#777777] group-hover:text-[#D4AF37] transition-colors">
                      {item.index}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-white mb-2.5 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-xs text-[#B8B8B8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
