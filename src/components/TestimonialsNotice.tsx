import React from 'react';
import { ShieldCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export const TestimonialsNotice: React.FC = () => {
  return (
    <section className="py-24 bg-[#101010] relative border-y border-[#D4AF37]/25">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#171717] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <span className="font-space text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3 block">
          CLIENT CONFIDENTIALITY & TRUST
        </span>

        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[0.02em] mb-4">
          Partnerships Built on Discretion & Integrity
        </h2>

        <p className="font-manrope max-w-2xl mx-auto text-sm sm:text-base text-[#B8B8B8] leading-relaxed mb-10">
          In high-value property brokerage and private turnkey construction, client privacy is paramount. Verified client references, private portfolio walk-throughs, and completion certificates are shared confidentially upon one-on-one consultation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href={buildWhatsAppUrl("Hello Seikou Develops, I would like to request confidential client references and project credentials.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Verified Client References</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-sm border border-[#D4AF37]/50 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] bg-[#171717] font-space font-semibold text-xs uppercase tracking-[0.2em] transition-all"
          >
            <span>Book Private Discussion</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
