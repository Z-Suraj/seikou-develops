import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Real Estate', href: '#real-estate' },
    { label: 'Construction', href: '#construction' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-2xl shadow-black/80 py-4'
          : 'bg-gradient-to-b from-[#050505]/90 via-[#080808]/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Brand Wordmark & Official Logo */}
          <a
            href="#home"
            className="flex items-center gap-3.5 group whitespace-nowrap shrink-0"
            aria-label="Seikou Develops Home"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white p-0.5 border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/seikou-logo.png"
                alt="Seikou Develops Official Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.12em] text-white group-hover:text-[#D4AF37] transition-colors">
                SEIKOU DEVELOPS
              </span>
              <span className="font-space text-[9px] sm:text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-medium">
                Legacy Since 2008
              </span>
            </div>
          </a>

          {/* Minimalist Luxury Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-space text-[12px] font-medium tracking-[0.16em] uppercase text-[#B8B8B8] hover:text-[#D4AF37] transition-all whitespace-nowrap relative py-1.5 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right-Side Luxury CTA: LET'S TALK */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-space text-[11px] font-bold tracking-[0.22em] uppercase text-[#080808] bg-[#D4AF37] hover:bg-[#E8CB83] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] whitespace-nowrap cursor-pointer border border-[#E8CB83]"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#B8B8B8] hover:text-[#D4AF37] rounded border border-neutral-800 bg-[#101010] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808] border-b border-[#D4AF37]/30 px-6 py-8 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-space text-sm tracking-[0.18em] uppercase text-[#B8B8B8] hover:text-[#D4AF37] py-2 border-b border-neutral-800/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 font-space text-xs font-bold tracking-[0.2em] uppercase text-[#080808] bg-[#D4AF37] hover:bg-[#E8CB83] rounded-sm transition-colors shadow-lg"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
