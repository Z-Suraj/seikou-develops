import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Building,
  Hammer,
  FileCode,
  Download,
  CheckCircle,
  Copy,
  Mail,
  Phone,
  Calendar,
  Lock,
  Scale,
  ShieldAlert
} from 'lucide-react';
import {
  isSupabaseConfigured,
  supabase,
  getStoredRealEstateInquiries,
  getStoredConstructionInquiries,
  SUPABASE_SETUP_SQL
} from '../lib/supabase';
import { RealEstateInquiry, ConstructionInquiry } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'re' | 'const' | 'setup' | 'legal'>('re');
  const [reInquiries, setReInquiries] = useState<RealEstateInquiry[]>([]);
  const [constInquiries, setConstInquiries] = useState<ConstructionInquiry[]>([]);
  const [copiedSql, setCopiedSql] = useState(false);

  // Supabase Auth State
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [sessionUser, setSessionUser] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setReInquiries(getStoredRealEstateInquiries());
      setConstInquiries(getStoredConstructionInquiries());

      if (isSupabaseConfigured && supabase) {
        supabase.auth.getSession().then(({ data }) => {
          if (data.session) {
            setSessionUser(data.session.user);
          }
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });
    if (error) {
      setAuthError(error.message);
    } else if (data.session) {
      setSessionUser(data.session.user);
    }
  };

  const handleExportCsv = (type: 're' | 'const') => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (type === 're') {
      csvContent += 'ID,Full Name,Phone,Email,Category,Requirement,Location,Budget,Created At\n';
      reInquiries.forEach((item) => {
        csvContent += `"${item.id}","${item.fullName}","${item.phone}","${item.email}","${item.propertyCategory}","${item.requirement}","${item.preferredLocation}","${item.budgetRange}","${item.createdAt}"\n`;
      });
    } else {
      csvContent += 'ID,Full Name,Phone,Email,Project Type,Location,Approx Size,Created At\n';
      constInquiries.forEach((item) => {
        csvContent += `"${item.id}","${item.fullName}","${item.phone}","${item.email}","${item.projectType}","${item.projectLocation}","${item.approximateSize}","${item.createdAt}"\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `seikou_${type}_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#101010] border border-[#D4AF37]/40 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#B8B8B8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#080808] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-sm bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/35">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                Seikou Develops — Business Operations & Governance Portal
              </h3>
              <div className="flex items-center gap-2 font-space text-xs mt-0.5">
                <span className="text-[#777777]">Database Status:</span>
                {isSupabaseConfigured ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Supabase Connected
                  </span>
                ) : (
                  <span className="text-[#D4AF37] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    Local Storage Mode (Supabase Ready)
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 bg-[#101010] border-b border-neutral-800 flex items-center gap-5 overflow-x-auto">
          <button
            onClick={() => setTab('re')}
            className={`pb-3.5 font-space text-xs font-bold uppercase tracking-[0.16em] transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              tab === 're'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Real Estate ({reInquiries.length})</span>
          </button>
          <button
            onClick={() => setTab('const')}
            className={`pb-3.5 font-space text-xs font-bold uppercase tracking-[0.16em] transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              tab === 'const'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <Hammer className="w-4 h-4" />
            <span>Construction ({constInquiries.length})</span>
          </button>
          <button
            onClick={() => setTab('setup')}
            className={`pb-3.5 font-space text-xs font-bold uppercase tracking-[0.16em] transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              tab === 'setup'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Supabase Setup</span>
          </button>
          <button
            onClick={() => setTab('legal')}
            className={`pb-3.5 font-space text-xs font-bold uppercase tracking-[0.16em] transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              tab === 'legal'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Legal & RERA Advisory</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: REAL ESTATE INQUIRIES */}
          {tab === 're' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="font-manrope text-xs text-[#B8B8B8]">
                  Client inquiries submitted via the Real Estate Consultation form.
                </p>
                {reInquiries.length > 0 && (
                  <button
                    onClick={() => handleExportCsv('re')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#171717] hover:bg-[#1f1f1f] text-[#D4AF37] border border-[#D4AF37]/30 font-space text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>

              {reInquiries.length === 0 ? (
                <div className="p-12 text-center rounded-lg bg-[#171717] border border-neutral-800">
                  <Building className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="font-space text-sm font-semibold text-white">No real estate inquiries submitted yet.</p>
                  <p className="font-manrope text-xs text-[#777777] mt-1">Submit a test enquiry from the Contact section to verify live retention.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-lg bg-[#171717] border border-neutral-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="font-cinzel text-sm">{inq.fullName}</span>
                        <span className="font-space text-[#D4AF37] text-[11px]">{inq.id}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[#B8B8B8] font-manrope">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#777777]" />
                          <span>{inq.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#777777]" />
                          <span className="truncate">{inq.email}</span>
                        </div>
                        <div>
                          <span className="text-[#777777]">Category: </span>
                          <span className="text-white font-medium">{inq.propertyCategory} ({inq.requirement})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#777777]" />
                          <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {inq.message && (
                        <div className="pt-2 border-t border-neutral-800 text-neutral-400 font-manrope italic">
                          "{inq.message}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONSTRUCTION INQUIRIES */}
          {tab === 'const' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="font-manrope text-xs text-[#B8B8B8]">
                  Project requests submitted via the Construction & Turnkey form.
                </p>
                {constInquiries.length > 0 && (
                  <button
                    onClick={() => handleExportCsv('const')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#171717] hover:bg-[#1f1f1f] text-[#D4AF37] border border-[#D4AF37]/30 font-space text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>

              {constInquiries.length === 0 ? (
                <div className="p-12 text-center rounded-lg bg-[#171717] border border-neutral-800">
                  <Hammer className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="font-space text-sm font-semibold text-white">No construction inquiries submitted yet.</p>
                  <p className="font-manrope text-xs text-[#777777] mt-1">Submit test project specifications from the Contact section.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {constInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-lg bg-[#171717] border border-neutral-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="font-cinzel text-sm">{inq.fullName}</span>
                        <span className="font-space text-[#D4AF37] text-[11px]">{inq.id}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[#B8B8B8] font-manrope">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#777777]" />
                          <span>{inq.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#777777]" />
                          <span className="truncate">{inq.email}</span>
                        </div>
                        <div>
                          <span className="text-[#777777]">Type: </span>
                          <span className="text-white font-medium">{inq.projectType}</span>
                        </div>
                        <div>
                          <span className="text-[#777777]">Size: </span>
                          <span className="text-white font-medium">{inq.approximateSize || 'Not specified'}</span>
                        </div>
                      </div>
                      {inq.requirementDescription && (
                        <div className="pt-2 border-t border-neutral-800 text-neutral-300 font-manrope">
                          <span className="font-semibold text-white">Scope: </span>
                          {inq.requirementDescription}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETUP GUIDE & SQL SCRIPT */}
          {tab === 'setup' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#B8B8B8]">
              <div className="p-5 rounded-lg bg-[#171717] border border-[#D4AF37]/30 space-y-3">
                <h4 className="font-cinzel font-bold text-white text-base flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#D4AF37]" />
                  <span>How to Connect Your Free Supabase Project</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-2 font-manrope text-[#B8B8B8]">
                  <li>
                    Create a free project at{' '}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] underline"
                    >
                      supabase.com
                    </a>.
                  </li>
                  <li>Go to <strong>SQL Editor</strong> in the Supabase Dashboard.</li>
                  <li>Copy and paste the schema SQL below, then click <strong>Run</strong>.</li>
                  <li>
                    Go to <strong>Project Settings → API</strong> and copy your <strong>Project URL</strong> and <strong>anon public key</strong>.
                  </li>
                  <li>
                    Add them to your environment variables or <code className="text-[#D4AF37]">.env</code>:
                    <pre className="mt-2 p-3 bg-[#080808] rounded-sm font-mono text-xs border border-neutral-800">
                      VITE_SUPABASE_URL="https://your-project.supabase.co"{"\n"}
                      VITE_SUPABASE_ANON_KEY="your-anon-public-key"
                    </pre>
                  </li>
                </ol>
              </div>

              {/* Copyable SQL Schema */}
              <div>
                <div className="flex items-center justify-between mb-2 font-space">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">
                    Ready-to-Run SQL Schema & RLS Policies:
                  </span>
                  <button
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#D4AF37] text-[#080808] font-bold text-xs uppercase cursor-pointer hover:bg-[#E8CB83] transition-colors"
                  >
                    {copiedSql ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-lg bg-[#080808] border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto max-h-56 leading-relaxed">
                  {SUPABASE_SETUP_SQL}
                </pre>
              </div>

              {/* Protected Supabase Auth Login */}
              {isSupabaseConfigured && !sessionUser && (
                <div className="p-4 rounded-lg bg-[#171717] border border-neutral-800">
                  <h5 className="font-cinzel font-bold text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Administrator Authentication</span>
                  </h5>
                  {authError && <p className="text-xs text-red-400 mb-2">{authError}</p>}
                  <form onSubmit={handleSupabaseLogin} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Admin email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="px-3 py-2 rounded-sm bg-[#080808] border border-neutral-700 text-xs text-white"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="px-3 py-2 rounded-sm bg-[#080808] border border-neutral-700 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-sm bg-[#D4AF37] text-[#080808] font-space font-bold text-xs uppercase"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              )}

              {sessionUser && (
                <div className="p-3 rounded-sm bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-manrope">
                  Logged in as verified administrator: {sessionUser.email}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: LEGAL & RERA STATUTORY ADVISORY */}
          {tab === 'legal' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#B8B8B8]">
              <div className="p-5 rounded-lg bg-[#171717] border border-[#D4AF37]/40 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <div>
                    <h4 className="font-cinzel font-bold text-white text-base">
                      Statutory Production Publication Notice
                    </h4>
                    <span className="font-space text-[10px] text-[#D4AF37] uppercase tracking-wider block">
                      Indian Law & Regulatory Review Protocol
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-[#080808] border border-neutral-800 space-y-2 font-manrope text-xs text-neutral-300">
                  <p className="font-semibold text-white">
                    * MANDATORY LEGAL CLEARANCE NOTICE FOR PRODUCTION:
                  </p>
                  <p>
                    All legal documents provided on this website (Terms & Conditions, Privacy Policy, Cookie Policy, General & Real Estate Disclaimer, Intellectual Property Notice, and Inquiry & Communication Policy) are structured in accordance with applicable Indian legislation:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                    <li>The Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
                    <li>The Real Estate (Regulation and Development) Act, 2016 (RERA)</li>
                    <li>The Information Technology Act, 2000 (and Electronic Records Rules)</li>
                    <li>The Indian Contract Act, 1872 & Specific Relief Act</li>
                  </ul>
                  <p className="pt-2 text-[#D4AF37] font-medium">
                    Before final live commercial deployment, the company management must ensure these documents are formally reviewed, customized with the company's final statutory RERA registration numbers, and approved by a qualified Indian legal advocate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#080808] border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white font-space text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
