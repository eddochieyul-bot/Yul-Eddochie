import React, { useEffect, useState } from 'react';
import { CmsWebsiteSettings } from '../../../firebase/types';
import {
  subscribeToWebsiteSettings,
  saveWebsiteSettings,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Shield,
  Loader2,
} from 'lucide-react';

export function WebsiteSettingsTab() {
  const { user } = useAdminAuth();
  const [settings, setSettings] = useState<CmsWebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToWebsiteSettings((s) => {
      setSettings(s);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      await saveWebsiteSettings(settings, user?.email || 'admin');
      setNotification('Institutional website settings updated successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="py-16 text-center text-slate-500 text-xs">Loading institutional configurations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Continental System Registry</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Website & Secretariat Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global institutional attributes, official contact emails, social channels, and portal announcements.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Core Institutional Info */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Institutional Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Organization Name</label>
              <input
                type="text"
                value={settings.siteName || ''}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Institutional Slogan / Tagline</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Site Description / Mission</label>
            <textarea
              rows={2}
              value={settings.description || ''}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>
        </div>

        {/* Official Contact & Secretariat */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Official Secretariat Communications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Official Inquiries & Notifications Email
              </label>
              <input
                type="email"
                required
                value={settings.officialEmail || ''}
                onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                placeholder="aylafrica.org@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                All membership intakes and contact messages trigger notifications here.
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Secretariat Hotline / Phone</label>
              <input
                type="text"
                value={settings.contactPhone || ''}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Headquarters & Bureau Address</label>
            <input
              type="text"
              value={settings.headquartersAddress || ''}
              onChange={(e) => setSettings({ ...settings, headquartersAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Official Membership Registration Google Form URL
            </label>
            <input
              type="url"
              value={settings.membershipGoogleFormUrl || ''}
              onChange={(e) => setSettings({ ...settings, membershipGoogleFormUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-mono"
            />
          </div>
        </div>

        {/* Social Channels */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span>Continental Social Media Coordinates</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Twitter / X</label>
              <input
                type="text"
                value={settings.socialLinks?.twitter || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://x.com/AYLAfrica"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">LinkedIn</label>
              <input
                type="text"
                value={settings.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/company/aylafrica"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Facebook</label>
              <input
                type="text"
                value={settings.socialLinks?.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/aylafrica"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Instagram</label>
              <input
                type="text"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/aylafrica"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Global Banner Announcement */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Top Bar Announcement Banner</span>
          </h2>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcementBannerEnabled || false}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBannerEnabled: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded text-amber-500 accent-amber-500"
              />
              <span className="text-xs text-white font-semibold">Enable Top Site Banner</span>
            </label>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={settings.announcementBannerText || ''}
              onChange={(e) => setSettings({ ...settings, announcementBannerText: e.target.value })}
              placeholder="e.g. Applications for AYLA Continental Youth Fellowship 2026 are now open."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
