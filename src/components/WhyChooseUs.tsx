import React from 'react';
import {
  BookOpen,
  Compass,
  Boxes,
  Cpu,
  MessagesSquare,
  Workflow,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Industry Knowledge',
      desc: 'Deep real estate domain intelligence, local zoning comprehension, and market trend foresight built over decades.',
    },
    {
      icon: Compass,
      title: 'Professional Guidance',
      desc: 'Transparent advisory ensuring every client decision is protected by rigorous title vetting and valuation metrics.',
    },
    {
      icon: Boxes,
      title: 'Quality Building Materials',
      desc: 'Over 22 years of building materials dealership heritage guaranteeing genuine, code-tested structural components.',
    },
    {
      icon: Cpu,
      title: 'Practical Engineering Solutions',
      desc: 'Civil engineering mastery translated into constructible, cost-efficient AutoCAD blueprints and durable execution.',
    },
    {
      icon: MessagesSquare,
      title: 'Transparent Communication',
      desc: 'Milestone-based progress reporting, clear budget schedules, and honest consultations with zero hidden surprises.',
    },
    {
      icon: Workflow,
      title: 'End-to-End Property Solutions',
      desc: 'From initial land acquisition to civil foundation, fabrication, and turnkey interior handover under a single trusted roof.',
    },
    {
      icon: Sparkles,
      title: 'Commitment to Quality',
      desc: 'Strict BCW contractor execution benchmarks, laser-levelled tile finishes, and zero-compromise structural standards.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Focused Approach',
      desc: 'Long-term client partnerships rooted in accountability, respectful relationship stewardship, and personalized attention.',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#101010] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              OUR CORE ADVANTAGE
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] mb-4">
            Experience. Expertise. Execution.
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            What sets Seikou Develops apart is our rare combination of high-level property brokerage and grounded, hands-on civil construction mastery.
          </p>
        </div>

        {/* 8 Pillars Grid in Obsidian & Gold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-lg bg-[#171717] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-[#101010] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080808] transition-colors duration-300 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-white mb-2.5 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] leading-relaxed">
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
