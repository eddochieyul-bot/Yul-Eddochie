import React, { useState, useEffect } from 'react';
import { CmsEvent, CmsSubscriber } from '../../../firebase/types';
import {
  subscribeToNewsletterSubscribers,
  saveCampaign,
  sendCampaign,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Users,
  Loader2,
  X,
} from 'lucide-react';
import { AylaLogo } from '../../AylaLogo';

interface SendEventNewsletterModalProps {
  event: CmsEvent;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function SendEventNewsletterModal({
  event,
  onClose,
  onSuccess,
}: SendEventNewsletterModalProps) {
  const { user } = useAdminAuth();
  const [subscribers, setSubscribers] = useState<CmsSubscriber[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [customSubject, setCustomSubject] = useState(
    `[AYLA Dispatch] Official Invitation: ${event.title}`
  );
  const [customMessage, setCustomMessage] = useState(
    `Dear Member,\n\nThe All-African Young Leaders Association (AYLA) invites you to participate in the upcoming continental assembly: ${event.title}.\n\nPlease find the official convening details below.`
  );

  useEffect(() => {
    const unsub = subscribeToNewsletterSubscribers((subs) => {
      setSubscribers(subs.filter((s) => s.status === 'active'));
      setLoadingSubs(false);
    });
    return () => unsub();
  }, []);

  const handleSendNewsletter = async () => {
    if (subscribers.length === 0) {
      alert('There are currently no active subscribers in the Continental Dispatch roster.');
      return;
    }

    if (!window.confirm(`Confirm dispatching this event bulletin to ${subscribers.length} registered subscriber(s)?`)) {
      return;
    }

    setIsSending(true);
    try {
      // 1. Create Campaign record
      const campaignId = await saveCampaign(
        {
          subject: customSubject,
          headline: event.title,
          body: `${customMessage}\n\nDate: ${event.date} (${event.startTime || ''})\nLocation: ${event.location}\nFormat: ${event.eventType.toUpperCase()}\n\nDescription: ${event.description}`,
          featuredImage: event.image || '',
          ctaButton: 'Register for Event',
          ctaUrl: event.registrationUrl || 'https://aylaafrica.org/events',
          footer: 'You received this official bulletin as a subscriber to the AYLA Continental Dispatch.',
          status: 'draft',
          recipientCount: subscribers.length,
          recipients: subscribers.map((s) => s.email),
        },
        user?.email || 'admin'
      );

      // 2. Dispatch campaign and notify Secretariat
      await sendCampaign(campaignId, subscribers.length, user?.email || 'admin');

      onSuccess(
        `Event newsletter successfully dispatched to ${subscribers.length} member(s)! Audit record logged.`
      );
      onClose();
    } catch (err: any) {
      alert('Failed to dispatch event newsletter: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Continental Dispatch Bulletin</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-['Outfit']">
            Send Event Announcement to Members
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Broadcast this event directly to registered newsletter subscribers across all member states.
          </p>
        </div>

        {/* Recipients Bar */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Target Audience</div>
              <div className="text-[11px] text-slate-400">Active Continental Dispatch Subscribers</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-amber-400 font-mono">
              {loadingSubs ? '...' : `${subscribers.length} Subscribers`}
            </div>
            <div className="text-[10px] text-slate-500">Auto-filtered for active opt-ins</div>
          </div>
        </div>

        {/* Subject and Message Editor */}
        <div className="space-y-4 mb-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Email Subject Line *
            </label>
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Opening Announcement Note
            </label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Email Visual Preview Card */}
        <div className="mb-6">
          <label className="block text-slate-400 font-semibold text-[11px] uppercase tracking-wider mb-2">
            Institutional Email Preview
          </label>
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 font-sans text-slate-200">
            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <AylaLogo variant="light" showEmblemOnly={false} />
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                Official Dispatch
              </span>
            </div>

            {/* Event Details */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-['Outfit']">
                {event.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{event.startTime || 'Official Time TBD'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {event.registrationUrl && (
                <div className="pt-2">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md pointer-events-none"
                  >
                    <span>Register for Event</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
              <span>All-African Young Leaders Association (AYLA) • Secretariat</span>
              <span>Unsubscribe anytime via dispatch footer</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSending || loadingSubs || subscribers.length === 0}
            onClick={handleSendNewsletter}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Broadcasting to {subscribers.length} Members...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>SEND NEWSLETTER ({subscribers.length})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
