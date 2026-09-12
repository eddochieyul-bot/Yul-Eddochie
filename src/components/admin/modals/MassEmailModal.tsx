import React, { useState } from 'react';
import { CmsMembershipApplication, CmsSubscriber } from '../../../firebase/types';
import { sendMassMemberEmail } from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Megaphone,
  Send,
  X,
  Users,
  CheckCircle2,
  Filter,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface MassEmailModalProps {
  applications: CmsMembershipApplication[];
  subscribers?: CmsSubscriber[];
  onClose: () => void;
  onSuccess?: () => void;
}

export function MassEmailModal({
  applications,
  subscribers = [],
  onClose,
  onSuccess,
}: MassEmailModalProps) {
  const { user } = useAdminAuth();
  const [targetGroup, setTargetGroup] = useState<'approved' | 'all_applicants' | 'west_africa' | 'east_africa' | 'southern_africa' | 'subscribers'>('approved');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('bulletin');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  // Compute recipient list based on target group
  const getRecipients = (): { name: string; email: string }[] => {
    switch (targetGroup) {
      case 'approved':
        return applications
          .filter((a) => a.status === 'approved' && a.email)
          .map((a) => ({ name: a.fullName, email: a.email }));
      case 'all_applicants':
        return applications
          .filter((a) => a.email)
          .map((a) => ({ name: a.fullName, email: a.email }));
      case 'west_africa':
        return applications
          .filter(
            (a) =>
              (a.chapterOfInterest?.toLowerCase().includes('west') ||
                ['nigeria', 'ghana', 'senegal', 'cote', 'benin', 'togo', 'liberia', 'sierra', 'gambia'].some(
                  (c) =>
                    (a.countryOfResidence || '').toLowerCase().includes(c) ||
                    (a.nationality || '').toLowerCase().includes(c)
                )) &&
              a.email
          )
          .map((a) => ({ name: a.fullName, email: a.email }));
      case 'east_africa':
        return applications
          .filter(
            (a) =>
              (a.chapterOfInterest?.toLowerCase().includes('east') ||
                ['kenya', 'uganda', 'tanzania', 'rwanda', 'ethiopia'].some(
                  (c) =>
                    (a.countryOfResidence || '').toLowerCase().includes(c) ||
                    (a.nationality || '').toLowerCase().includes(c)
                )) &&
              a.email
          )
          .map((a) => ({ name: a.fullName, email: a.email }));
      case 'southern_africa':
        return applications
          .filter(
            (a) =>
              (a.chapterOfInterest?.toLowerCase().includes('south') ||
                ['south africa', 'zimbabwe', 'zambia', 'namibia', 'botswana', 'malawi'].some(
                  (c) =>
                    (a.countryOfResidence || '').toLowerCase().includes(c) ||
                    (a.nationality || '').toLowerCase().includes(c)
                )) &&
              a.email
          )
          .map((a) => ({ name: a.fullName, email: a.email }));
      case 'subscribers':
        return subscribers
          .filter((s) => s.status === 'active' && s.email)
          .map((s) => ({ name: 'Subscribed Member', email: s.email }));
      default:
        return [];
    }
  };

  const recipients = getRecipients();
  const recipientEmails = Array.from(new Set(recipients.map((r) => r.email.toLowerCase().trim())));

  // Preset templates
  React.useEffect(() => {
    switch (selectedTemplate) {
      case 'bulletin':
        setSubject("AYLA Continental Communiqué: Advancing Young Leadership Across Africa");
        setBody(
          "Dear AYLA Member & Fellow Leader,\n\n" +
            "We convey warm institutional greetings from the Continental Secretariat of Africa's Young Leaders Association (AYLA).\n\n" +
            "As we accelerate our pan-African mission under the banner 'Young Minds. Bold Vision. United Africa.', we are pleased to present our quarterly leadership briefing:\n\n" +
            "1. Regional Chapter Assemblies: Chapter coordinating committees across West, East, Southern, North, and Central Africa are finalizing upcoming physical and digital summits.\n" +
            "2. Policy Working Groups: AYLA working groups on Democratic Governance, Climate Action, Youth Employment, and AfCFTA Integration are actively receiving delegate contributions.\n" +
            "3. Membership Accreditation: Please ensure your institutional membership ID is updated and verified on the official registry.\n\n" +
            "Thank you for your unyielding dedication to our collective continental destiny.\n\n" +
            "In Solidarity and African Excellence,\n" +
            "Continental Secretariat General\n" +
            "Africa's Young Leaders Association (AYLA)\n" +
            "aylaafrica.org@gmail.com | https://aylaafrica.org"
        );
        break;

      case 'assembly':
        setSubject("CONVOCATION NOTICE: 2026 AYLA Extraordinary Continental Assembly");
        setBody(
          "Distinguished AYLA Delegates & Chapter Representatives,\n\n" +
            "Notice is hereby given for the upcoming Extraordinary Continental Assembly of Africa's Young Leaders Association.\n\n" +
            "Agenda:\n" +
            "• Secretariat Institutional Report & 2026-2028 Strategic Roadmap\n" +
            "• Chartering of New Regional Chapter Hubs\n" +
            "• Review of Continental Youth Policy Declarations\n" +
            "• Formal Induction of New Accredited Members\n\n" +
            "Accredited delegates will receive designated security passes and virtual assembly links 48 hours prior to commencement.\n\n" +
            "By Order of the Executive Council,\n" +
            "Secretariat Bureau of Governance & Convocations\n" +
            "Africa's Young Leaders Association"
        );
        break;

      case 'census':
        setSubject("URGENT: AYLA Continental Membership Audit & Accreditation Verification");
        setBody(
          "Dear Registered AYLA Member,\n\n" +
            "The Continental Directorate of Membership is currently executing an institutional census to verify all active delegates and issue official AYLA Digital Certificates of Membership.\n\n" +
            "If you have not yet received your official alphanumeric Membership ID (e.g. AYLA-XX-2026-XXXX) or membership certificate, kindly reply to this email with your updated country of residence and telephone contact.\n\n" +
            "Ensuring your details are current guarantees full voting rights in chapter elections and delegate accreditation for international summits.\n\n" +
            "Yours Faithfully,\n" +
            "Directorate of Membership & Registry\n" +
            "Africa's Young Leaders Association (AYLA)"
        );
        break;

      case 'custom':
      default:
        setSubject("Official Notice from the Continental Secretariat | AYLA");
        setBody(
          "Dear Valued Members and Delegates,\n\n" +
            "[Draft your institutional announcement, working group update, or event notification here]\n\n" +
            "In Pan-African Unity,\n" +
            "Africa's Young Leaders Association (AYLA)\n" +
            "Secretariat: aylaafrica.org@gmail.com"
        );
        break;
    }
  }, [selectedTemplate]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipientEmails.length === 0) {
      alert('No recipients found in the selected target group.');
      return;
    }
    if (!subject.trim() || !body.trim()) {
      alert('Subject and body content are required.');
      return;
    }

    if (!confirm(`Are you sure you want to dispatch this mass broadcast to ${recipientEmails.length} recipient(s)?`)) {
      return;
    }

    setIsSending(true);
    try {
      await sendMassMemberEmail({
        targetGroup,
        recipientEmails,
        subject,
        body,
        templateUsed: selectedTemplate,
        adminEmail: user?.email || undefined,
      });

      setSentCount(recipientEmails.length);
      setSentSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err: any) {
      alert('Failed to dispatch mass email: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 text-white shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Mass Secretariat Broadcast
              </h2>
              <p className="text-xs text-slate-400">
                Send collective institutional updates to registered members and chapter delegations
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
            <h3 className="text-lg font-bold text-white font-['Outfit']">Mass Broadcast Dispatched!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Broadcast recorded and transmitted to <strong>{sentCount} recipients</strong> across target segment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 flex-1 overflow-y-auto pr-1">
            {/* Audience Segment Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  <span>Target Recipient Segment</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  {recipientEmails.length} active recipient{recipientEmails.length === 1 ? '' : 's'}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'approved', label: 'Accredited Members' },
                  { id: 'all_applicants', label: 'All Registered' },
                  { id: 'west_africa', label: 'West Africa Hub' },
                  { id: 'east_africa', label: 'East Africa Hub' },
                  { id: 'southern_africa', label: 'Southern Africa' },
                  { id: 'subscribers', label: 'Newsletter List' },
                ].map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => setTargetGroup(grp.id as any)}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                      targetGroup === grp.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {grp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Broadcast Template Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'bulletin', label: 'Quarterly Communiqué' },
                  { id: 'assembly', label: 'Assembly Notice' },
                  { id: 'census', label: 'Accreditation Audit' },
                  { id: 'custom', label: 'Custom Message' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`py-1.5 px-3 rounded-xl text-[11px] font-semibold border transition-all text-center cursor-pointer ${
                      selectedTemplate === t.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
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

            {/* Body Text */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Broadcast Content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={9}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 font-mono leading-relaxed resize-none"
              />
            </div>

            {recipientEmails.length === 0 && (
              <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-800/80 text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>No registered emails match this filter. Select another target group.</span>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Sending from: <strong className="text-amber-400">aylaafrica.org@gmail.com</strong>
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending || recipientEmails.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Transmitting...' : `Dispatch to ${recipientEmails.length}`}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
