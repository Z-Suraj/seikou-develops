import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, X, Check } from 'lucide-react';

interface CookieConsentProps {
  onOpenCookiePolicy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenCookiePolicy }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Cookie states
  const [functionalEnabled, setFunctionalEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('seikou_cookie_consent');
    if (!saved) {
      // Small delay before showing so it doesn't jarringly block initial render
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'seikou_cookie_consent',
      JSON.stringify({ essential: true, functional: true, analytics: true, date: new Date().toISOString() })
    );
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(
      'seikou_cookie_consent',
      JSON.stringify({ essential: true, functional: false, analytics: false, date: new Date().toISOString() })
    );
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'seikou_cookie_consent',
      JSON.stringify({ essential: true, functional: functionalEnabled, analytics: analyticsEnabled, date: new Date().toISOString() })
    );
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {/* Floating Bottom Banner */}
      {showBanner && !showPreferences && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#101010]/95 border border-[#D4AF37]/50 rounded-lg p-5 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 text-neutral-200">
          <div className="flex items-start gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-cinzel text-xs font-bold text-white tracking-wider uppercase">
                Privacy & Cookie Governance
              </h4>
              <p className="font-manrope text-[12px] text-[#B8B8B8] leading-relaxed mt-1">
                We use strictly essential cookies for site functionality and optional anonymous analytics to refine our architectural presentation under the DPDP Act 2023.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-3 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-space text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleEssentialOnly}
              className="flex-1 px-3 py-2 rounded-sm bg-[#171717] hover:bg-[#202020] text-white border border-neutral-700 font-space text-[11px] font-medium uppercase tracking-wider transition-all cursor-pointer"
            >
              Essential Only
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="p-2 rounded-sm bg-[#171717] hover:bg-[#202020] text-[#D4AF37] border border-neutral-700 transition-all cursor-pointer"
              title="Customize Preferences"
              aria-label="Customize cookie preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 text-center">
            <button
              onClick={onOpenCookiePolicy}
              className="font-space text-[10px] text-[#777777] hover:text-[#D4AF37] underline tracking-wider uppercase cursor-pointer"
            >
              Read Full Cookie Policy
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#101010] border border-[#D4AF37]/50 rounded-lg p-6 shadow-2xl text-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                  Cookie Preferences Manager
                </h3>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Essential */}
              <div className="p-3.5 rounded-sm bg-[#171717] border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-space text-xs font-bold text-white uppercase tracking-wider">
                    <span>Strictly Essential Cookies</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-[#D4AF37]">
                      Mandatory
                    </span>
                  </div>
                  <p className="font-manrope text-[11px] text-[#B8B8B8] mt-1">
                    Necessary for site security, form CSRF protection, and page delivery.
                  </p>
                </div>
                <div className="w-5 h-5 rounded-sm bg-[#D4AF37] flex items-center justify-center text-[#080808]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Functional */}
              <div className="p-3.5 rounded-sm bg-[#171717] border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="font-space text-xs font-bold text-white uppercase tracking-wider">
                    Functional Preferences
                  </div>
                  <p className="font-manrope text-[11px] text-[#B8B8B8] mt-1">
                    Retains interactive 3D view states and inquiry draft coordinates.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={functionalEnabled}
                  onChange={(e) => setFunctionalEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-sm bg-[#171717] border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="font-space text-xs font-bold text-white uppercase tracking-wider">
                    Anonymous Analytics
                  </div>
                  <p className="font-manrope text-[11px] text-[#B8B8B8] mt-1">
                    Measures aggregate load performance to optimize high-resolution media.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800 font-space text-xs">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 rounded-sm text-[#B8B8B8] hover:text-white uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] text-[#080808] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
