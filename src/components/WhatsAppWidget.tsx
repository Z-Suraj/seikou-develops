import React, { useState } from 'react';
import { MessageCircle, X, Building, Hammer, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, PRESET_MESSAGES } from '../lib/whatsapp';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Action Card in Obsidian & Gold */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-lg bg-[#101010] border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(0,0,0,0.8)] p-5 text-white animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-white tracking-wide">Seikou Develops</h4>
                <span className="font-space text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold block">
                  Official Business WhatsApp
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close WhatsApp card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="font-manrope text-xs text-[#B8B8B8] leading-relaxed mb-4">
            Connect directly with our senior consultants on WhatsApp (+91 86702 79597). Choose your requirement:
          </p>

          <div className="space-y-2.5">
            {/* Real Estate Action */}
            <a
              href={buildWhatsAppUrl(PRESET_MESSAGES.realEstate)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-sm bg-[#171717] hover:bg-[#1f1f1f] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm bg-[#101010] text-[#D4AF37] border border-[#D4AF37]/30">
                  <Building className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-cinzel text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    Real Estate Consultation
                  </div>
                  <div className="font-space text-[10px] text-[#777777] uppercase tracking-wider">
                    Buying, Selling & Advisory
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Construction Action */}
            <a
              href={buildWhatsAppUrl(PRESET_MESSAGES.construction)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-sm bg-[#171717] hover:bg-[#1f1f1f] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm bg-[#101010] text-[#D4AF37] border border-[#D4AF37]/30">
                  <Hammer className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-cinzel text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    Construction Consultation
                  </div>
                  <div className="font-space text-[10px] text-[#777777] uppercase tracking-wider">
                    Turnkey, Civil & Finishing
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="mt-3.5 pt-3 border-t border-neutral-800 text-center font-space text-[10px] text-[#777777] tracking-wider uppercase">
            Direct click-to-chat · Response within working hours
          </div>
        </div>
      )}

      {/* Primary Floating Button in Obsidian & Gold */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#101010] hover:bg-[#171717] active:scale-95 text-white font-space font-bold text-xs uppercase tracking-[0.16em] shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all cursor-pointer group border border-[#D4AF37]"
        aria-label="Open WhatsApp Consultation Menu"
      >
        <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white">
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
        </div>
        <span className="hidden sm:inline text-white group-hover:text-[#D4AF37] transition-colors">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
