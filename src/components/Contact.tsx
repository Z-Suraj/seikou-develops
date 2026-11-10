import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Instagram,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Hammer,
  ShieldCheck
} from 'lucide-react';
import { submitRealEstateInquiry, submitConstructionInquiry } from '../lib/supabase';
import { RealEstateInquiry, ConstructionInquiry } from '../types';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface ContactProps {
  onOpenPrivacyPolicy: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenPrivacyPolicy }) => {
  const [activeForm, setActiveForm] = useState<'re' | 'const'>('re');

  // Form A State (Real Estate)
  const [reData, setReData] = useState<Omit<RealEstateInquiry, 'id' | 'createdAt'>>({
    fullName: '',
    phone: '',
    email: '',
    propertyCategory: 'Residential',
    requirement: 'Buy',
    preferredLocation: '',
    budgetRange: '',
    message: '',
  });
  const [reConsent, setReConsent] = useState(true);

  // Form B State (Construction)
  const [constData, setConstData] = useState<Omit<ConstructionInquiry, 'id' | 'createdAt'>>({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Turnkey Construction',
    projectLocation: '',
    approximateSize: '',
    requirementDescription: '',
    message: '',
  });
  const [constConsent, setConstConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reStatus, setReStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string; refId?: string }>({
    type: 'idle',
    message: '',
  });
  const [constStatus, setConstStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string; refId?: string }>({
    type: 'idle',
    message: '',
  });

  // Validation helpers
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => phone.replace(/[^0-9]/g, '').length >= 10;

  const handleReSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reData.fullName.trim()) {
      setReStatus({ type: 'error', message: 'Please provide your full name.' });
      return;
    }
    if (!validatePhone(reData.phone)) {
      setReStatus({ type: 'error', message: 'Please provide a valid 10-digit phone number.' });
      return;
    }
    if (!validateEmail(reData.email)) {
      setReStatus({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }
    if (!reConsent) {
      setReStatus({ type: 'error', message: 'Please acknowledge the privacy policy consent checkbox to proceed.' });
      return;
    }

    setIsSubmitting(true);
    setReStatus({ type: 'idle', message: '' });

    try {
      const res = await submitRealEstateInquiry(reData);
      if (res.success) {
        setReStatus({
          type: 'success',
          refId: res.id,
          message: res.persistedToSupabase
            ? 'Your real estate enquiry has been logged successfully in our system. Our advisor will reach out shortly.'
            : 'Your enquiry has been received and logged locally. Our advisor will reach out shortly.',
        });
        setReData({
          fullName: '',
          phone: '',
          email: '',
          propertyCategory: 'Residential',
          requirement: 'Buy',
          preferredLocation: '',
          budgetRange: '',
          message: '',
        });
      }
    } catch (err: any) {
      setReStatus({
        type: 'error',
        message: err?.message || 'Submission encountered an issue. Please use our direct email or WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConstSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!constData.fullName.trim()) {
      setConstStatus({ type: 'error', message: 'Please enter your full name.' });
      return;
    }
    if (!validatePhone(constData.phone)) {
      setConstStatus({ type: 'error', message: 'Please enter a valid phone number with country/area code.' });
      return;
    }
    if (!validateEmail(constData.email)) {
      setConstStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (!constConsent) {
      setConstStatus({ type: 'error', message: 'Please acknowledge the privacy policy consent checkbox to proceed.' });
      return;
    }

    setIsSubmitting(true);
    setConstStatus({ type: 'idle', message: '' });

    try {
      const res = await submitConstructionInquiry(constData);
      if (res.success) {
        setConstStatus({
          type: 'success',
          refId: res.id,
          message: res.persistedToSupabase
            ? 'Your construction enquiry has been logged successfully. Our project engineer will contact you shortly.'
            : 'Your construction project details have been received and logged locally. Our team will review your specifications.',
        });
        setConstData({
          fullName: '',
          phone: '',
          email: '',
          projectType: 'Turnkey Construction',
          projectLocation: '',
          approximateSize: '',
          requirementDescription: '',
          message: '',
        });
      }
    } catch (err: any) {
      setConstStatus({
        type: 'error',
        message: err?.message || 'An error occurred during submission. Please reach out via WhatsApp or email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              CONTACT & CONSULTATION
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.02em] mb-4">
            Let's Build Something Meaningful Together.
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Whether you are looking for the right property or planning your next construction project, our team is ready to understand your requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Company Details Column in Black & Gold */}
          <div className="lg:col-span-5 bg-[#101010] p-8 sm:p-10 rounded-lg border border-[#D4AF37]/30 shadow-2xl">
            <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
              SEIKOU DEVELOPS
            </h3>
            <p className="font-space text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-8">
              Integrated Real Estate, Construction & Infrastructure Solutions
            </p>

            <div className="space-y-6 text-sm text-[#B8B8B8]">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-space text-xs text-[#777777] block uppercase font-bold tracking-wider">
                    Official Email
                  </span>
                  <a
                    href="mailto:seikou.develops10@gmail.com"
                    className="font-manrope font-semibold text-white hover:text-[#D4AF37] transition-colors break-all"
                  >
                    seikou.develops10@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-space text-xs text-[#777777] block uppercase font-bold tracking-wider">
                    Business Line & WhatsApp
                  </span>
                  <a
                    href={buildWhatsAppUrl("Hello Seikou Develops, I would like to schedule a consultation.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manrope font-semibold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    +91 86702 79597
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-space text-xs text-[#777777] block uppercase font-bold tracking-wider">
                    Official Instagram
                  </span>
                  <a
                    href="https://www.instagram.com/seikou_develops/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manrope font-semibold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    @seikou_develops
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-space text-xs text-[#777777] block uppercase font-bold tracking-wider">
                    Working Hours
                  </span>
                  <p className="font-manrope font-medium text-white">
                    Monday – Saturday: 09:00 AM – 07:00 PM
                  </p>
                  <p className="font-manrope text-xs text-[#777777]">Sunday by prior appointment</p>
                </div>
              </div>
            </div>

            {/* Direct Mailto Fallback Link */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <a
                href="mailto:seikou.develops10@gmail.com?subject=Consultation%20Inquiry%20-%20Seikou%20Develops"
                className="font-space text-xs text-[#D4AF37] hover:text-[#FFF9EA] flex items-center gap-1.5 transition-colors"
              >
                <span>Prefer default email client? Click to compose email directly</span>
              </a>
            </div>
          </div>

          {/* Dual Inquiry Form Column in Obsidian & Gold */}
          <div className="lg:col-span-7 bg-[#171717] p-6 sm:p-10 rounded-lg border border-[#D4AF37]/30 shadow-2xl">
            {/* Form Selector Tabs */}
            <div className="flex rounded-sm bg-[#101010] p-1.5 mb-8 border border-[#D4AF37]/20">
              <button
                type="button"
                onClick={() => setActiveForm('re')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-space text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] rounded-sm transition-all cursor-pointer ${
                  activeForm === 're'
                    ? 'bg-[#D4AF37] text-[#080808] shadow-md'
                    : 'text-[#B8B8B8] hover:text-[#D4AF37]'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Real Estate Enquiry</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveForm('const')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-space text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] rounded-sm transition-all cursor-pointer ${
                  activeForm === 'const'
                    ? 'bg-[#D4AF37] text-[#080808] shadow-md'
                    : 'text-[#B8B8B8] hover:text-[#D4AF37]'
                }`}
              >
                <Hammer className="w-4 h-4" />
                <span>Construction Enquiry</span>
              </button>
            </div>

            {/* FORM A: REAL ESTATE */}
            {activeForm === 're' && (
              <form onSubmit={handleReSubmit} className="space-y-4 sm:space-y-5">
                {reStatus.type === 'error' && (
                  <div className="p-4 rounded-sm bg-red-950/40 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-manrope">{reStatus.message}</span>
                  </div>
                )}

                {reStatus.type === 'success' && (
                  <div className="p-4 rounded-sm bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-manrope">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Enquiry Successfully Registered</span>
                    </div>
                    <p>{reStatus.message}</p>
                    {reStatus.refId && (
                      <span className="block mt-2 font-space text-[11px] text-emerald-300">
                        Reference ID: {reStatus.refId}
                      </span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reData.fullName}
                      onChange={(e) => setReData({ ...reData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={reData.phone}
                      onChange={(e) => setReData({ ...reData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={reData.email}
                    onChange={(e) => setReData({ ...reData, email: e.target.value })}
                    placeholder="e.g. client@example.com"
                    className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Property Category
                    </label>
                    <select
                      value={reData.propertyCategory}
                      onChange={(e) => setReData({ ...reData, propertyCategory: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agricultural">Agricultural Land</option>
                      <option value="Industrial">Industrial Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Requirement Type
                    </label>
                    <select
                      value={reData.requirement}
                      onChange={(e) => setReData({ ...reData, requirement: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    >
                      <option value="Buy">Buy Property</option>
                      <option value="Sell">Sell Property</option>
                      <option value="Rent">Rent / Lease</option>
                      <option value="Investment">Capital Investment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      value={reData.preferredLocation}
                      onChange={(e) => setReData({ ...reData, preferredLocation: e.target.value })}
                      placeholder="e.g. City Center / Sector 4"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Budget Range
                    </label>
                    <input
                      type="text"
                      value={reData.budgetRange}
                      onChange={(e) => setReData({ ...reData, budgetRange: e.target.value })}
                      placeholder="e.g. ₹50 Lakhs - ₹1.5 Cr"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                    Specific Requirements or Message
                  </label>
                  <textarea
                    rows={3}
                    value={reData.message}
                    onChange={(e) => setReData({ ...reData, message: e.target.value })}
                    placeholder="Describe your desired specifications, timeline, or investment vision..."
                    className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope resize-none"
                  />
                </div>

                {/* Consent Checkbox linked to Privacy Policy */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="re-consent"
                    checked={reConsent}
                    onChange={(e) => setReConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                  />
                  <label htmlFor="re-consent" className="font-manrope text-xs text-[#B8B8B8] cursor-pointer">
                    I agree to the processing of my contact details for consultation purposes in accordance with the{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="text-[#D4AF37] underline hover:text-[#FFF9EA]"
                    >
                      Privacy Policy
                    </button>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] active:scale-[0.99] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Real Estate Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* FORM B: CONSTRUCTION */}
            {activeForm === 'const' && (
              <form onSubmit={handleConstSubmit} className="space-y-4 sm:space-y-5">
                {constStatus.type === 'error' && (
                  <div className="p-4 rounded-sm bg-red-950/40 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-manrope">{constStatus.message}</span>
                  </div>
                )}

                {constStatus.type === 'success' && (
                  <div className="p-4 rounded-sm bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-manrope">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Project Details Registered</span>
                    </div>
                    <p>{constStatus.message}</p>
                    {constStatus.refId && (
                      <span className="block mt-2 font-space text-[11px] text-emerald-300">
                        Reference ID: {constStatus.refId}
                      </span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={constData.fullName}
                      onChange={(e) => setConstData({ ...constData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={constData.phone}
                      onChange={(e) => setConstData({ ...constData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={constData.email}
                      onChange={(e) => setConstData({ ...constData, email: e.target.value })}
                      placeholder="e.g. developer@example.com"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={constData.projectType}
                      onChange={(e) => setConstData({ ...constData, projectType: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    >
                      <option value="Turnkey Construction">Turnkey Construction</option>
                      <option value="Residential Building">Residential Building</option>
                      <option value="Commercial Building">Commercial Building</option>
                      <option value="Renovation & Finishing">Renovation & Finishing</option>
                      <option value="Fabrication & Civil">Fabrication & Civil Works</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Project Location
                    </label>
                    <input
                      type="text"
                      value={constData.projectLocation}
                      onChange={(e) => setConstData({ ...constData, projectLocation: e.target.value })}
                      placeholder="e.g. North Enclave Plot 12"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                      Approximate Project Size
                    </label>
                    <input
                      type="text"
                      value={constData.approximateSize}
                      onChange={(e) => setConstData({ ...constData, approximateSize: e.target.value })}
                      placeholder="e.g. 3,500 sq.ft. (G+2 Floors)"
                      className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                    Requirement Description
                  </label>
                  <input
                    type="text"
                    value={constData.requirementDescription}
                    onChange={(e) => setConstData({ ...constData, requirementDescription: e.target.value })}
                    placeholder="e.g. Complete RCC structure + AutoCAD planning + fabrication"
                    className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs font-semibold uppercase tracking-wider text-[#B8B8B8] mb-1.5">
                    Additional Message or Notes
                  </label>
                  <textarea
                    rows={3}
                    value={constData.message}
                    onChange={(e) => setConstData({ ...constData, message: e.target.value })}
                    placeholder="Specific architectural preferences, desired start date..."
                    className="w-full px-4 py-3 rounded-sm bg-[#101010] border border-neutral-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-white text-sm font-manrope resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="const-consent"
                    checked={constConsent}
                    onChange={(e) => setConstConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                  />
                  <label htmlFor="const-consent" className="font-manrope text-xs text-[#B8B8B8] cursor-pointer">
                    I acknowledge that project estimates are indicative and consent to inquiry processing per the{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="text-[#D4AF37] underline hover:text-[#FFF9EA]"
                    >
                      Privacy Policy
                    </button>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E8CB83] active:scale-[0.99] text-[#080808] font-space font-bold text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                >
                  {isSubmitting ? (
                    <span>Submitting Project Details...</span>
                  ) : (
                    <>
                      <span>Submit Construction Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
