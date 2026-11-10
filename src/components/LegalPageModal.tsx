import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, ArrowLeft, Printer, FileText, Check } from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalDocument } from '../data/legalDocuments';

interface LegalPageModalProps {
  documentId: string | null;
  onClose: () => void;
  onSelectDocument: (id: string) => void;
}

export const LegalPageModal: React.FC<LegalPageModalProps> = ({
  documentId,
  onClose,
  onSelectDocument,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (documentId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [documentId, onClose]);

  if (!documentId) return null;

  const currentDoc: LegalDocument = LEGAL_DOCUMENTS[documentId] || LEGAL_DOCUMENTS.terms;

  const navItems = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'cookies', label: 'Cookie Policy' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'ip', label: 'Intellectual Property' },
    { id: 'inquiry', label: 'Inquiry Policy' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const fullText = currentDoc.sections
      .map((s) => `${s.title}\n\n${s.content.join('\n\n')}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(`${currentDoc.title}\nLast Updated: ${currentDoc.lastUpdated}\n\n${fullText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#101010] border border-[#D4AF37]/40 rounded-lg shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-neutral-200">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#080808] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-[#171717] hover:bg-[#202020] text-[#B8B8B8] hover:text-[#D4AF37] border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider">
                  {currentDoc.title}
                </h2>
              </div>
              <span className="font-space text-[10px] text-[#777777] uppercase tracking-wider block mt-0.5">
                Official Legal Disclosure · Seikou Develops · Last Updated: {currentDoc.lastUpdated}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-sm bg-[#171717] hover:bg-[#202020] text-[#B8B8B8] hover:text-[#D4AF37] border border-neutral-700 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
              title="Copy Document Text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="font-space text-[11px] uppercase tracking-wider hidden sm:inline">Copy</span>}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-sm bg-[#171717] hover:bg-[#202020] text-[#B8B8B8] hover:text-[#D4AF37] border border-neutral-700 transition-colors cursor-pointer"
              title="Print Document"
              aria-label="Print legal document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-[#171717] hover:bg-[#202020] text-[#B8B8B8] hover:text-white border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Nav Bar between all 6 Legal Documents */}
        <div className="px-5 sm:px-6 py-3 bg-[#0c0c0c] border-b border-neutral-800 flex items-center gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectDocument(item.id)}
              className={`px-3.5 py-1.5 rounded-sm font-space text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                documentId === item.id
                  ? 'bg-[#D4AF37] text-[#080808] shadow-md'
                  : 'text-[#B8B8B8] hover:text-[#D4AF37] bg-[#171717] border border-neutral-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-8 font-manrope text-sm leading-relaxed text-[#B8B8B8]">
          {/* Statutory Counsel Notice */}
          <div className="p-4 rounded-sm bg-[#171717] border border-[#D4AF37]/35 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="font-space text-xs">
              <span className="font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                STATUTORY REVIEW ADVISORY
              </span>
              <p className="text-neutral-400 leading-normal">
                {currentDoc.leadNotice || 'This corporate documentation is prepared in accordance with applicable Indian laws (including the DPDP Act 2023, RERA Act 2016, and IT Act 2000). Prior to commercial execution, terms must be formally reviewed by a qualified advocate.'}
              </p>
            </div>
          </div>

          {/* Document Sections */}
          <div className="space-y-6">
            {currentDoc.sections.map((section, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="font-cinzel text-base font-bold text-white tracking-wide pb-1 border-b border-neutral-800">
                  {section.title}
                </h3>
                {section.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-[13px] sm:text-sm text-[#B8B8B8] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Official Sign-off */}
          <div className="pt-6 border-t border-neutral-800 font-space text-xs text-[#777777] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>SEIKOU DEVELOPS · CORPORATE LEGAL DIVISION</span>
            <span>CONTACT: seikou.develops10@gmail.com</span>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-[#080808] border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
