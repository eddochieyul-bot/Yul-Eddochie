import React, { useEffect, useState } from 'react';
import { CmsNewsletterCampaign, CmsSubscriber } from '../../../firebase/types';
import {
  subscribeToNewsletterCampaigns,
  subscribeToNewsletterSubscribers,
  saveNewsletterCampaign,
  sendNewsletterCampaign,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Send,
  Plus,
  Mail,
  CheckCircle2,
  Clock,
  Users,
  Search,
  Loader2,
  Calendar,
  Sparkles,
  Eye,
  AlertCircle,
  X,
} from 'lucide-react';

export function NewsletterCampaignsTab() {
  const { user } = useAdminAuth();
  const [campaigns, setCampaigns] = useState<CmsNewsletterCampaign[]>([]);
  const [subscribers, setSubscribers] = useState<CmsSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [campaignForm, setCampaignForm] = useState<Partial<CmsNewsletterCampaign>>({
    title: '',
    subject: '',
    previewText: '',
    content: '',
    status: 'draft',
  });
  const [testEmailAddress, setTestEmailAddress] = useState(user?.email || OFFICIAL_ADMIN_EMAIL);

  useEffect(() => {
    const unsubCamp = subscribeToNewsletterCampaigns((camps) => {
      setCampaigns(camps);
      setLoading(false);
    });
    const unsubSubs = subscribeToNewsletterSubscribers((subs) => {
      setSubscribers(subs);
    });
    return () => {
      unsubCamp();
      unsubSubs();
    };
  }, []);

  const activeSubscribers = subscribers.filter((s) => s.status === 'active');

  const handleOpenNew = () => {
    setCampaignForm({
      title: 'AYLA Continental Bulletin #' + (campaigns.length + 1),
      subject: 'AYLA Continental Dispatch: Updates & Resolutions',
      previewText: 'Key youth governance resolutions from the African Youth Leadership Assembly.',
      content: `Dear Fellow African Leader,

The African Youth Leadership Assembly (AYLA) continues its mission across all 55 African member states and the global diaspora.

In this dispatch:
• Updates on Regional Youth Focal Hubs
• Upcoming Continental Summits & Assemblies
• Open Calls for Fellowship & Delegation

Together, we forge the sovereign, united Africa envisioned by Agenda 2063.

Warm regards,
AYLA Continental Secretariat
${OFFICIAL_ADMIN_EMAIL}`,
      status: 'draft',
    });
    setIsModalOpen(true);
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignForm.title || !campaignForm.subject || !campaignForm.content) {
      alert('Title, subject, and content are required.');
      return;
    }

    try {
      await saveNewsletterCampaign(campaignForm, user?.email || 'admin');
      setIsModalOpen(false);
      setNotification('Campaign draft saved successfully.');
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error saving campaign: ' + err.message);
    }
  };

  const handleDispatch = async (campaign: CmsNewsletterCampaign) => {
    const confirmMsg = `Send "${campaign.subject}" to all ${activeSubscribers.length} active subscribers now?`;
    if (!window.confirm(confirmMsg)) return;

    setSendingId(campaign.id);
    try {
      const res = await sendNewsletterCampaign(campaign.id, user?.email || 'admin');
      setNotification(`Dispatched to ${res.sentCount} subscribers successfully!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Dispatch failed: ' + err.message);
    } finally {
      setSendingId(null);
    }
  };

  const handleSendTest = (campaign: CmsNewsletterCampaign) => {
    const subject = encodeURIComponent(`[TEST PREVIEW] ${campaign.subject}`);
    const body = encodeURIComponent(
      `--- PREVIEW OF AYLA DISPATCH ---\n\n${campaign.content || campaign.body || ''}\n\n--- RECIPIENT: ${testEmailAddress} ---`
    );
    window.location.href = `mailto:${testEmailAddress}?subject=${subject}&body=${body}`;
    setNotification(`Test draft opened in your mail client for ${testEmailAddress}.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Send className="w-3.5 h-3.5" />
            <span>Continental Dispatch Studio</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Newsletter Campaigns
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and broadcast official communiqués, summit recaps, and announcements to the entire pan-African subscriber network.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Audience Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Active Audience Reach</div>
            <div className="text-lg font-black text-white font-['Outfit']">
              {activeSubscribers.length} Verified Subscribers
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          Official Sender: <strong className="text-amber-400">{OFFICIAL_ADMIN_EMAIL}</strong>
        </div>
      </div>

      {/* Campaigns List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Send className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No campaigns created yet</div>
          <p className="text-xs text-slate-400">Click "New Campaign" to draft your first newsletter broadcast.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      camp.status === 'sent'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {camp.status === 'sent' ? 'Sent Broadcast' : 'Draft'}
                  </span>
                  {camp.sentAt && (
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Sent on {new Date(camp.sentAt).toLocaleString()}</span>
                    </span>
                  )}
                  {camp.recipientCount !== undefined && camp.status === 'sent' && (
                    <span className="text-[10px] text-slate-400">
                      • {camp.recipientCount} recipients reached
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {camp.title}
                </h3>
                <div className="text-xs font-semibold text-amber-400">
                  Subject: {camp.subject}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">
                  {camp.previewText || camp.content.slice(0, 140)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                <button
                  onClick={() => handleSendTest(camp)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Send Test</span>
                </button>

                {camp.status !== 'sent' ? (
                  <button
                    onClick={() => handleDispatch(camp)}
                    disabled={sendingId === camp.id}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {sendingId === camp.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Broadcasting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Broadcast ({activeSubscribers.length})</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleDispatch(camp)}
                    disabled={sendingId === camp.id}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Re-send</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Newsletter Broadcast Studio
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                Compose Continental Newsletter
              </h2>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Internal Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={campaignForm.title || ''}
                  onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                  placeholder="e.g. Q1 2026 Executive Summary Dispatch"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Subject Line *</label>
                <input
                  type="text"
                  required
                  value={campaignForm.subject || ''}
                  onChange={(e) => setCampaignForm({ ...campaignForm, subject: e.target.value })}
                  placeholder="e.g. AYLA Communiqué: Pan-African Youth Leadership Assembly"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preview Preheader Snippet</label>
                <input
                  type="text"
                  value={campaignForm.previewText || ''}
                  onChange={(e) => setCampaignForm({ ...campaignForm, previewText: e.target.value })}
                  placeholder="Appears in recipient inbox beside the subject line..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Newsletter Body & Announcements *</label>
                <textarea
                  rows={9}
                  required
                  value={campaignForm.content || ''}
                  onChange={(e) => setCampaignForm({ ...campaignForm, content: e.target.value })}
                  placeholder="Draft newsletter paragraphs, updates, and leadership links..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-sans leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
