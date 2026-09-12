import React, { useState } from 'react';
import { CmsMembershipApplication } from '../../../firebase/types';
import { sendMemberEmail } from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Mail,
  Send,
  X,
  ExternalLink,
  CheckCircle2,
  FileText,
  Sparkles,
  User,
  Shield,
} from 'lucide-react';

interface SendMemberEmailModalProps {
  member: CmsMembershipApplication;
  certificateContext?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SendMemberEmailModal({
  member,
  certificateContext = false,
  onClose,
  onSuccess,
}: SendMemberEmailModalProps) {
  const { user } = useAdminAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    certificateContext ? 'certificate' : 'induction'
  );
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const membershipId =
    member.membershipId ||
    `AYLA-${(member.countryOfResidence || member.nationality || 'AF').slice(0, 2).toUpperCase()}-2026-PENDING`;

  const certNumber =
    member.certificateNumber ||
    `AYLA-CERT-2026-${(member.membershipId || member.id).replace(/[^a-zA-Z0-9]/g, '').slice(-5).toUpperCase() || '89104'}`;

  // Initialize templates on mount or selection
  React.useEffect(() => {
    switch (selectedTemplate) {
      case 'induction':
        setSubject(`Official AYLA Membership Induction & ID Conferment: ${membershipId}`);
        setBody(
          `Dear ${member.fullName},\n\n` +
            `On behalf of the Continental Secretariat and the Executive Council of Africa's Young Leaders Association (AYLA), we are honoured to formally welcome you into the Continental Fellowship.\n\n` +
            `Your institutional details are as follows:\n` +
            `• Full Name: ${member.fullName}\n` +
            `• Official Membership ID: ${membershipId}\n` +
            `• Membership Category: ${member.membershipTier || member.membershipCategory || 'Accredited Youth Delegate'}\n` +
            `• Member State / Hub: ${member.countryOfResidence || member.nationality || 'Continental Chapter'}\n` +
            `• Official Motto: Young Minds. Bold Vision. United Africa.\n\n` +
            `As an accredited AYLA member, you are authorized to participate in our regional chapter working groups, Continental Assemblies, and policy innovation summits. Please ensure you retain your Membership ID for all official convocations.\n\n` +
            `In Solidarity and African Unity,\n` +
            `Directorate of Membership & Accreditation\n` +
            `Africa's Young Leaders Association (AYLA)\n` +
            `Secretariat Email: aylaafrica.org@gmail.com\n` +
            `Website: https://aylaafrica.org`
        );
        break;

      case 'certificate':
        setSubject(`Official AYLA Certificate of Membership Conferment (${certNumber})`);
        setBody(
          `Dear ${member.fullName},\n\n` +
            `We are delighted to transmit the formal notification of your Certificate of Accreditation under the Supreme Constitution of Africa's Young Leaders Association (AYLA).\n\n` +
            `Accreditation Summary:\n` +
            `• Member Name: ${member.fullName}\n` +
            `• Official Membership ID: ${membershipId}\n` +
            `• Certificate Serial Number: ${certNumber}\n` +
            `• Status: Fully Accredited & Sealed in Institutional Records\n\n` +
            `Your digital certificate has been duly recorded in the Continental Secretariat Archives. You may access and verify your standing through the official AYLA registry at any time.\n\n` +
            `Continue to champion ethical leadership, continental unity, and transformative empowerment across our beloved continent.\n\n` +
            `With Highest Institutional Regard,\n` +
            `The Executive Council & Secretariat General\n` +
            `Africa's Young Leaders Association (AYLA)\n` +
            `Official Contact: aylaafrica.org@gmail.com`
        );
        break;

      case 'assembly':
        setSubject(`Convocation Notice: AYLA Continental Assembly & Working Session`);
        setBody(
          `Dear ${member.fullName},\n\n` +
            `You are cordially invited to the upcoming AYLA Continental Working Session and Regional Chapter Assembly.\n\n` +
            `As an accredited member (ID: ${membershipId}), your presence and strategic contribution are vital as we deliberate on upcoming continental youth policies, cross-border leadership initiatives, and sustainable development campaigns.\n\n` +
            `Date & Schedule: Detailed agenda and virtual access links will be circulated via the official communications portal.\n\n` +
            `Please confirm your availability by replying directly to this communication.\n\n` +
            `Warm regards,\n` +
            `Secretariat Bureau of Programmes\n` +
            `Africa's Young Leaders Association (AYLA)`
        );
        break;

      case 'custom':
      default:
        setSubject(`Official Communication from AYLA Secretariat: ${member.fullName}`);
        setBody(
          `Dear ${member.fullName},\n\n` +
            `We write from the Continental Secretariat of Africa's Young Leaders Association regarding your membership registration (ID: ${membershipId}).\n\n` +
            `[Enter your specific message here]\n\n` +
            `Sincerely,\n` +
            `AYLA Secretariat Desk\n` +
            `aylaafrica.org@gmail.com`
        );
        break;
    }
  }, [selectedTemplate, member.fullName, membershipId, certNumber, member.membershipTier, member.membershipCategory, member.countryOfResidence, member.nationality]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      alert('Please fill in both the email subject and message body.');
      return;
    }

    setIsSending(true);
    try {
      await sendMemberEmail({
        recipientEmail: member.email,
        recipientName: member.fullName,
        subject,
        body,
        templateUsed: selectedTemplate,
        applicationId: member.id,
        adminEmail: user?.email || undefined,
      });

      setSentSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      alert('Failed to send email: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleMailtoClient = () => {
    const mailtoUrl = `mailto:${encodeURIComponent(member.email)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 text-white shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Dispatch Official Email
              </h2>
              <p className="text-xs text-slate-400">
                Send direct secretariat notice to {member.fullName} ({member.email})
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

        {sentSuccess ? (
          <div className="py-12 text-center space-y-4 my-auto">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Official Email Dispatched!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Message logged in Institutional Dispatches and recorded on {member.fullName}'s membership timeline.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 flex-1 overflow-y-auto pr-1">
            {/* Recipient Profile Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">{member.fullName}</div>
                  <div className="text-[11px] text-slate-400">{member.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[10px] font-bold">
                  {membershipId}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                  {member.countryOfResidence || member.nationality || 'Africa'}
                </span>
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Official Template Preset</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'induction', label: 'Induction & ID' },
                  { id: 'certificate', label: 'Certificate' },
                  { id: 'assembly', label: 'Assembly Call' },
                  { id: 'custom', label: 'Custom Notice' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      selectedTemplate === t.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Subject */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Official Message Content</span>
                <span className="text-[10px] text-slate-500">Supports direct secretariat styling</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={9}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 font-mono leading-relaxed resize-none"
              />
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleMailtoClient}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Mail App</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Dispatching...' : 'Dispatch Email'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
