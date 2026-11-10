import React from 'react';
import { Mail, Phone, Instagram, ArrowUp, Lock, ShieldCheck, Scale, FileText } from 'lucide-react';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenLegalDoc: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenLegalDoc }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const legalLinks = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'cookies', label: 'Cookie Policy' },
    { id: 'disclaimer', label: 'General & Real Estate Disclaimer' },
    { id: 'ip', label: 'Intellectual Property Notice' },
    { id: 'inquiry', label: 'Inquiry & Communication Policy' },
  ];

  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/30 text-[#B8B8B8] pt-24 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Architectural Brand Showcase Centerpiece */}
        <div className="pb-16 border-b border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Significantly Larger Luxury Official Logo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white p-1.5 border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.4)] shrink-0 transition-transform duration-500 hover:scale-105">
              <img
                src="/assets/seikou-logo.png"
                alt="Seikou Develops Official Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <span className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[0.06em] block">
                SEIKOU DEVELOPS
              </span>
              <span className="font-space text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-[0.28em] block mt-1">
                BUILDING TRUST. CREATING FUTURES.
              </span>
              <p className="font-manrope text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
                Integrated Real Estate Consultancy, Property Brokerage, Civil Construction & Turnkey Solutions since 2008.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/seikou_develops/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-sm bg-[#101010] hover:bg-[#D4AF37] hover:text-[#080808] border border-[#D4AF37]/40 flex items-center justify-center text-white transition-all duration-300 shadow-md"
              aria-label="Follow Seikou Develops on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="mailto:seikou.develops10@gmail.com"
              className="w-11 h-11 rounded-sm bg-[#101010] hover:bg-[#D4AF37] hover:text-[#080808] border border-[#D4AF37]/40 flex items-center justify-center text-white transition-all duration-300 shadow-md"
              aria-label="Email Seikou Develops"
            >
              <Mail className="w-5 h-5" />
            </a>

            <a
              href={buildWhatsAppUrl("Hello Seikou Develops, I am reaching out from your website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-sm bg-[#101010] hover:bg-[#D4AF37] hover:text-[#080808] border border-[#D4AF37]/40 flex items-center justify-center text-white transition-all duration-300 shadow-md"
              aria-label="Chat on WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 4-Column Navigation, Services, Legal & Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 border-b border-neutral-800">
          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 font-space text-xs tracking-wider uppercase text-[#B8B8B8]">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-[#D4AF37] transition-colors">
                  Our Expertise
                </a>
              </li>
              <li>
                <a href="#real-estate" className="hover:text-[#D4AF37] transition-colors">
                  Real Estate Advisory
                </a>
              </li>
              <li>
                <a href="#construction" className="hover:text-[#D4AF37] transition-colors">
                  Turnkey Construction
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#D4AF37] transition-colors">
                  Projects Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact & Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3 font-manrope text-xs text-[#B8B8B8]">
              <li>Residential & Commercial Advisory</li>
              <li>Turnkey Civil Construction</li>
              <li>AutoCAD Planning & Blueprints</li>
              <li>Fabrication & Security Gates</li>
              <li>Tiles, Flooring & Interiors</li>
              <li>Documentation & Verification</li>
              <li>Building Materials Dealership</li>
            </ul>
          </div>

          {/* Legal Documentation Links */}
          <div>
            <h4 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Legal Documentation</span>
            </h4>
            <ul className="space-y-3 font-space text-xs text-[#B8B8B8]">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onOpenLegalDoc(link.id)}
                    className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Details */}
          <div>
            <h4 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">
              Direct Contact
            </h4>
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="font-space text-[10px] uppercase font-bold text-[#777777] block tracking-wider mb-1">
                  Corporate Email
                </span>
                <a
                  href="mailto:seikou.develops10@gmail.com"
                  className="font-manrope text-white hover:text-[#D4AF37] transition-colors break-all"
                >
                  seikou.develops10@gmail.com
                </a>
              </div>
              <div>
                <span className="font-space text-[10px] uppercase font-bold text-[#777777] block tracking-wider mb-1">
                  WhatsApp & Phone
                </span>
                <a
                  href={buildWhatsAppUrl("Hello Seikou Develops, I am reaching out to discuss a property requirement.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-manrope text-white hover:text-[#D4AF37] transition-colors"
                >
                  +91 86702 79597
                </a>
              </div>
              <div>
                <span className="font-space text-[10px] uppercase font-bold text-[#777777] block tracking-wider mb-1">
                  Social Presence
                </span>
                <a
                  href="https://www.instagram.com/seikou_develops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-manrope text-white hover:text-[#D4AF37] transition-colors"
                >
                  instagram.com/seikou_develops
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Statutory Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-space text-xs text-[#777777] tracking-wider">
          <p>© 2026 Seikou Develops. All Rights Reserved. Indian Law & DPDP Act 2023 Compliant.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[#777777] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin & Backend Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#777777] hover:text-white transition-colors cursor-pointer uppercase tracking-[0.16em]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
