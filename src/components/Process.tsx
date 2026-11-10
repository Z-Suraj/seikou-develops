import React, { useState } from 'react';
import { Building, Hammer, CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  const [activeVertical, setActiveVertical] = useState<'re' | 'const'>('re');

  const reSteps = [
    {
      num: '01',
      title: 'Understand Requirements',
      desc: 'Deep-dive discovery to grasp your exact budget, preferred micro-market locations, lifestyle aspirations, or commercial objectives.',
    },
    {
      num: '02',
      title: 'Property Research',
      desc: 'Exhaustive search across our verified off-market inventories, title records, valuation checks, and infrastructure growth trends.',
    },
    {
      num: '03',
      title: 'Property Selection',
      desc: 'Curated shortlist of matching opportunities, accompanied site walkthroughs, and detailed comparative viability reports.',
    },
    {
      num: '04',
      title: 'Documentation Coordination',
      desc: 'End-to-end legal verification, municipal clearance checks, encumbrance diligence, and title deed examination.',
    },
    {
      num: '05',
      title: 'Client Consultation',
      desc: 'Transparent negotiation framework, fair market terms alignment, and clear structured timelines between all parties.',
    },
    {
      num: '06',
      title: 'Transaction Support',
      desc: 'Complete registry facilitation, secure escrow/payment coordination, handover protocols, and post-sale advisory.',
    },
  ];

  const constSteps = [
    {
      num: '01',
      title: 'Initial Consultation',
      desc: 'Exploration of your architectural vision, site topography, space requirements, budget expectations, and delivery milestones.',
    },
    {
      num: '02',
      title: 'Requirement Analysis',
      desc: 'Soil testing review, municipal setback regulations, structural loading parameters, and utility connectivity assessments.',
    },
    {
      num: '03',
      title: 'Planning & Design Coordination',
      desc: 'AutoCAD drafts, structural civil plans, 3D elevation schematics, and client approvals before site ground-breaking.',
    },
    {
      num: '04',
      title: 'Material & Resource Planning',
      desc: 'Direct procurement of certified high-grade cement, TMT rebar, aggregate, fabrication metal, and specialized machinery.',
    },
    {
      num: '05',
      title: 'Construction Execution',
      desc: 'Excavation, footing, RCC structural casting, brickwork, fabrication, electrical, plumbing, and strict BCW safety standards.',
    },
    {
      num: '06',
      title: 'Finishing & Handover',
      desc: 'Laser-levelled flooring, smooth putty & painting, fixtures, final quality walk-through, and turnkey key handover.',
    },
  ];

  const currentSteps = activeVertical === 're' ? reSteps : constSteps;

  return (
    <section className="py-24 sm:py-36 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              STRUCTURED EXECUTION
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] mb-4">
            Our Work Process
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Every client journey is governed by a clear, phased roadmap designed to provide full transparency, precision, and peace of mind.
          </p>
        </div>

        {/* Process Switcher Tabs in Black & Gold */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="inline-flex p-1.5 rounded-sm bg-[#101010] border border-[#D4AF37]/30 shadow-xl">
            <button
              onClick={() => setActiveVertical('re')}
              className={`flex items-center gap-2.5 px-6 sm:px-9 py-3.5 rounded-sm font-space text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                activeVertical === 're'
                  ? 'bg-[#D4AF37] text-[#080808] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-[#B8B8B8] hover:text-[#D4AF37]'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Real Estate Process</span>
            </button>
            <button
              onClick={() => setActiveVertical('const')}
              className={`flex items-center gap-2.5 px-6 sm:px-9 py-3.5 rounded-sm font-space text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                activeVertical === 'const'
                  ? 'bg-[#D4AF37] text-[#080808] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-[#B8B8B8] hover:text-[#D4AF37]'
              }`}
            >
              <Hammer className="w-4 h-4" />
              <span>Construction Process</span>
            </button>
          </div>
        </div>

        {/* Timeline Grid in Obsidian & Gold */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {currentSteps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-7 sm:p-8 rounded-lg bg-[#171717] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-[#101010] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080808] transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>

                <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between font-space text-[10px] sm:text-[11px] font-bold text-[#777777] uppercase tracking-[0.2em]">
                <span>Phase {idx + 1} of 6</span>
                <span className="text-[#D4AF37]">SEIKOU VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
