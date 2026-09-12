import React, { useRef } from 'react';
import { CmsMembershipApplication } from '../../../firebase/types';
import { issueMemberCertificate } from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Award,
  Printer,
  Mail,
  X,
  ShieldCheck,
  CheckCircle,
  Copy,
  Calendar,
  Globe,
} from 'lucide-react';

interface OfficialCertificateModalProps {
  member: CmsMembershipApplication;
  onClose: () => void;
  onOpenEmailModal: (member: CmsMembershipApplication, certIssued?: boolean) => void;
  onCertificateUpdated?: (updatedMember: CmsMembershipApplication) => void;
}

export function OfficialCertificateModal({
  member,
  onClose,
  onOpenEmailModal,
  onCertificateUpdated,
}: OfficialCertificateModalProps) {
  const { user } = useAdminAuth();
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [isIssuing, setIsIssuing] = React.useState(false);
  const [currentMember, setCurrentMember] = React.useState(member);

  const certNumber =
    currentMember.certificateNumber ||
    `AYLA-CERT-2026-${(currentMember.membershipId || currentMember.id).replace(/[^a-zA-Z0-9]/g, '').slice(-5).toUpperCase() || '89104'}`;

  const membershipId =
    currentMember.membershipId ||
    `AYLA-${(currentMember.countryOfResidence || currentMember.nationality || 'AF').slice(0, 2).toUpperCase()}-2026-PENDING`;

  const issueDate = currentMember.certificateIssuedAt
    ? new Date(currentMember.certificateIssuedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const handlePrint = () => {
    window.print();
  };

  const handleIssueAndSave = async () => {
    setIsIssuing(true);
    try {
      const generatedNumber = await issueMemberCertificate(currentMember.id, certNumber, user?.email || undefined);
      const updated: CmsMembershipApplication = {
        ...currentMember,
        certificateIssuedAt: new Date().toISOString(),
        certificateNumber: generatedNumber,
        status: 'approved',
      };
      setCurrentMember(updated);
      if (onCertificateUpdated) {
        onCertificateUpdated(updated);
      }
    } catch (err: any) {
      alert('Failed to record certificate: ' + err.message);
    } finally {
      setIsIssuing(false);
    }
  };

  const handleCopySerial = () => {
    navigator.clipboard.writeText(certNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full my-8 text-white shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Institutional Membership Certificate
              </h2>
              <p className="text-xs text-slate-400">
                Official accreditation certificate for Africa's Young Leaders Association (AYLA)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Container with Print Area */}
        <div className="flex-1 overflow-y-auto px-1 py-2 scrollbar-thin scrollbar-thumb-slate-800">
          <div
            ref={printRef}
            id="ayla-printable-certificate"
            className="bg-gradient-to-br from-amber-50/95 via-amber-100/70 to-amber-50/95 text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border-8 border-double border-amber-600/40 relative overflow-hidden select-text"
            style={{
              fontFamily: 'serif',
            }}
          >
            {/* Guilloche / Watermark Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <img
                src="/ayla-official-logo.jpg"
                alt=""
                className="w-96 h-96 object-contain grayscale"
                onError={(e) => {
                  e.currentTarget.src = '/ayla-logo.svg';
                }}
              />
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-600/80" />
            <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-600/80" />
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-600/80" />
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-600/80" />

            {/* Certificate Header */}
            <div className="text-center space-y-2 relative z-10">
              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 rounded-full bg-slate-900 p-1.5 border-2 border-amber-500 shadow-md flex items-center justify-center">
                  <img
                    src="/ayla-official-logo.jpg"
                    alt="AYLA Seal"
                    className="w-full h-full object-contain rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = '/ayla-logo.svg';
                    }}
                  />
                </div>
              </div>

              <div className="text-xs font-black uppercase tracking-[0.25em] text-emerald-900 font-sans">
                Africa's Young Leaders Association (AYLA)
              </div>
              <div className="text-[11px] uppercase tracking-widest text-amber-800 font-sans italic">
                Young Minds. Bold Vision. United Africa.
              </div>

              <div className="pt-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide uppercase font-serif">
                  Certificate of Accreditation
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2" />
              </div>
            </div>

            {/* Body Attestation */}
            <div className="text-center my-6 space-y-4 relative z-10">
              <p className="text-sm sm:text-base text-slate-700 italic">
                This is to solemnly attest and certify that
              </p>

              <div className="py-2 border-b-2 border-amber-700/30 max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-serif tracking-tight">
                  {currentMember.fullName}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans">
                has satisfied all requirements established under the Supreme Constitution of Africa's Young Leaders
                Association and is hereby admitted as an official accredited{' '}
                <strong className="text-amber-900 font-serif text-base">
                  {currentMember.membershipTier || currentMember.membershipCategory || 'Accredited Youth Delegate'}
                </strong>
                . Committed to the Pan-African ideals of ethical governance, continental integration, transformative
                youth leadership, and sustainable advancement across the Motherland.
              </p>
            </div>

            {/* Accreditation Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-amber-600/30 text-center font-sans text-xs my-6 relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Membership ID</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm">{membershipId}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Member State / Hub</span>
                <span className="font-semibold text-slate-900">
                  {currentMember.countryOfResidence || currentMember.nationality || 'Continental Chapter'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Conferment Date</span>
                <span className="font-semibold text-slate-900">{issueDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Certificate Serial</span>
                <span className="font-bold text-amber-800 font-mono text-[11px] truncate block">{certNumber}</span>
              </div>
            </div>

            {/* Signature & Seal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-amber-600/30 relative z-10 font-sans">
              <div className="text-center sm:text-left">
                <div className="font-serif italic font-semibold text-slate-800 text-sm">
                  Executive President & Convener
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                  AYLA Continental Assembly
                </div>
              </div>

              {/* Gold Hologram Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 p-1 border-2 border-amber-600 shadow-lg flex items-center justify-center text-slate-900">
                  <div className="text-center">
                    <ShieldCheck className="w-6 h-6 mx-auto text-emerald-950" />
                    <span className="text-[7px] font-black uppercase tracking-tighter block leading-none mt-0.5">
                      OFFICIAL SEAL
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-amber-800 mt-1 font-semibold">VERIFIED RECORD</span>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-serif italic font-semibold text-slate-800 text-sm">
                  Secretary General & Head
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Secretariat Directorate of Membership
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Serial:</span>
            <span className="text-amber-400 font-bold">{certNumber}</span>
            <button
              onClick={handleCopySerial}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Copy Serial Number"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {!currentMember.certificateIssuedAt && (
              <button
                onClick={handleIssueAndSave}
                disabled={isIssuing}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Award className="w-4 h-4" />
                <span>{isIssuing ? 'Recording...' : 'Record Issue in DB'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenEmailModal(currentMember, true);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Email to Member</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
