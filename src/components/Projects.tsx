import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { MapPin, CheckCircle2, MessageSquare, ArrowUpRight, X, Sparkles, Building2, Compass, Layers, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl, PRESET_MESSAGES } from '../lib/whatsapp';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Residential Developments',
    'Commercial Projects',
    'Turnkey Construction',
    'Architectural Planning',
    'Interior & Finishing',
  ];

  const filteredProjects = activeCategory === 'All'
    ? INITIAL_PROJECTS
    : INITIAL_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-36 bg-[#080808] relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A46D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              FEATURED PORTFOLIO
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] mb-4">
            Turning Ideas Into Reality.
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            A curated showcase of our civil engineering capabilities, residential turnkey mastery, and commercial landmark developments.
          </p>
        </div>

        {/* Minimalist Luxury Category Filters (Horizontally scrollable on mobile without wrapping overflow) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-12 overflow-x-auto pb-3 sm:pb-0 scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-sm font-space text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-[#080808] shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-[#E8CB83]'
                  : 'bg-[#101010] text-[#B8B8B8] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            // Asymmetrical layout rhythm: 1st item spans 7 cols, 2nd spans 5 cols, 3rd spans 4, 4th spans 4, 5th spans 4
            const isWide = index === 0 && filteredProjects.length > 1;
            const isMedium = index === 1 && filteredProjects.length > 1;
            const gridColClass = isWide
              ? 'lg:col-span-7'
              : isMedium
              ? 'lg:col-span-5'
              : 'lg:col-span-4';

            return (
              <div
                key={project.id}
                className={`group bg-[#141414] rounded-lg overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.18)] transition-all duration-500 flex flex-col justify-between ${gridColClass}`}
              >
                <div>
                  {/* Image Container with Consistent Aspect Ratio */}
                  <div className={`relative w-full overflow-hidden bg-[#050505] ${isWide ? 'h-72 sm:h-84' : 'h-64 sm:h-72'}`}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-106"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent opacity-95" />

                    {/* Category Chip */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-sm bg-[#080808]/90 backdrop-blur-md font-space text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] border border-[#D4AF37]/40 shadow-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Engineering Scope Chip */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-sm bg-[#080808]/90 font-space text-[10px] font-semibold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5 backdrop-blur-md shadow-md">
                        <Layers className="w-3 h-3 text-[#D4AF37]" />
                        <span>{project.engineeringScope}</span>
                      </span>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-1.5 font-space text-xs text-[#D4AF37] tracking-wider mb-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {project.name}
                    </h3>

                    <p className="font-manrope text-xs sm:text-[13px] text-[#B8B8B8] line-clamp-3 mb-5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architectural Highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="font-space text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#0c0c0c] text-neutral-300 border border-neutral-800"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Touch-Friendly Action Footer */}
                <div className="p-6 pt-0 mt-4 flex items-center justify-between border-t border-neutral-800/80 pt-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-[0.16em] text-[#B8B8B8] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span>Project Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsAppUrl(PRESET_MESSAGES.projectSpecific(project.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#E8CB83] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demonstration Notice Banner */}
        <div className="mt-14 p-4 rounded-sm bg-[#101010] border border-[#D4AF37]/25 text-center font-space text-xs text-[#888888] max-w-3xl mx-auto tracking-wide">
          <span className="block sm:inline text-[#D4AF37] font-semibold mr-1">Architectural Advisory:</span>
          <span>Portfolio items illustrate Seikou Develops' structural engineering, civil framing, and turnkey finishing standards. Project dossiers and on-site engineering consultations are available upon private request.</span>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#121212] rounded-lg border border-[#D4AF37]/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#080808]/85 text-[#B8B8B8] hover:text-[#D4AF37] transition-colors cursor-pointer border border-neutral-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-60 sm:h-72 w-full relative bg-[#050505] shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover filter brightness-[0.82]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex items-center gap-3 mb-2 font-space">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {selectedProject.category}
                </span>
                <span className="text-[#777777]">·</span>
                <span className="text-xs text-[#B8B8B8] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {selectedProject.location}
                </span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">
                {selectedProject.name}
              </h3>

              <p className="font-manrope text-sm text-[#B8B8B8] leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="font-space text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-2.5">
                  Key Scope Elements & Specifications:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="font-space text-xs px-3 py-1.5 rounded-sm bg-[#1a1a1a] text-white border border-[#D4AF37]/35"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 font-space rounded-sm text-xs font-semibold text-[#B8B8B8] hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={buildWhatsAppUrl(PRESET_MESSAGES.projectSpecific(selectedProject.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss Similar Project</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
