import React, { useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  onExploreExpertise: () => void;
  onDiscussProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreExpertise, onDiscussProject }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reliable, high-definition modern architectural high-rise aerial footage
  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-buildings-and-high-rises-41584-large.mp4';
  const fallbackPoster = '/assets/images/hero_modern_architecture_1794335445299.jpg';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Cinematic Fullscreen Background Video & High-Resolution Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Poster Image (always mounted to prevent any flash of unstyled content) */}
        <img
          src={fallbackPoster}
          alt="Modern Architectural Complex by Seikou Develops"
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15] transition-opacity duration-1000 ${
            isVideoLoaded && !videoError ? 'opacity-30' : 'opacity-100'
          }`}
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Cinematic Video Layer */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={fallbackPoster}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.12] transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-85' : 'opacity-0'
            }`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Measured Obsidian & Luxury Gold Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#050505]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/50 to-[#050505]/95" />
      </div>

      {/* Subtle Architectural Hairline Framing */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full border-x border-[#D4AF37]/25 grid grid-cols-4">
          <div className="border-r border-[#D4AF37]/15 h-full" />
          <div className="border-r border-[#D4AF37]/15 h-full hidden sm:block" />
          <div className="border-r border-[#D4AF37]/15 h-full hidden md:block" />
        </div>
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-24">
        {/* Editorial Eyebrow Label */}
        <div className="inline-flex items-center gap-2.5 mb-8 px-5 py-1.5 rounded-full border border-[#D4AF37]/45 bg-[#101010]/85 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="font-space text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#E8CB83] uppercase">
            SEIKOU DEVELOPS · REAL ESTATE & CONSTRUCTION
          </span>
        </div>

        {/* Main Headline in Grand Cinzel Typography */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-white tracking-[0.04em] leading-[1.08] mb-8 text-balance">
          BUILDING TRUST.{' '}
          <span className="block mt-2 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EA] via-[#D4AF37] to-[#B89650]">
            CREATING FUTURES.
          </span>
        </h1>

        {/* Supporting Narrative in Refined Manrope */}
        <p className="font-manrope max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#B8B8B8] leading-relaxed font-normal mb-12 text-balance">
          From identifying high-value property to executing end-to-end civil construction, Seikou Develops brings architectural expertise, financial transparency and turnkey execution under one distinguished roof.
        </p>

        {/* Action Buttons in Black & Gold */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onExploreExpertise}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-space text-xs font-bold tracking-[0.2em] uppercase text-[#080808] bg-[#D4AF37] hover:bg-[#E8CB83] active:scale-[0.98] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] cursor-pointer border border-[#E8CB83]"
          >
            <span>Explore Our Expertise</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onDiscussProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-space text-xs font-semibold tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#101010]/60 hover:bg-[#171717] backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>Discuss Your Project</span>
          </button>
        </div>

        {/* Credibility Ribbon */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 font-space text-xs sm:text-[13px] text-[#B8B8B8] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">EST. 2008</span>
            <span className="text-[#777777]">·</span>
            <span>18+ Years Legacy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">22+ Years</span>
            <span className="text-[#777777]">·</span>
            <span>Building Materials Domain</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">BCW</span>
            <span className="text-[#777777]">·</span>
            <span>Contractor Excellence</span>
          </div>
        </div>
      </div>

      {/* Gold Scroll-Down Indicator */}
      <a
        href="#credibility"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#777777] hover:text-[#D4AF37] transition-colors group cursor-pointer"
        aria-label="Scroll down to credibility section"
      >
        <span className="font-space text-[10px] uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100">
          SCROLL
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
      </a>
    </section>
  );
};
