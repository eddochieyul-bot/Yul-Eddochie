import React, { useEffect, useState } from 'react';
import {
  Users,
  Mail,
  Calendar,
  Newspaper,
  BookOpen,
  Image as ImageIcon,
  Award,
  Bell,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Building2,
} from 'lucide-react';
import {
  subscribeToLeadership,
  subscribeToEvents,
  subscribeToNews,
  subscribeToProgrammes,
  subscribeToGallery,
  subscribeToNewsletterSubscribers,
  subscribeToMembershipApplications,
  subscribeToContactMessages,
  subscribeToActivityLogs,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { CmsActivityLog } from '../../../firebase/types';

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
}

export function OverviewTab({ onNavigateTab }: OverviewTabProps) {
  const [memberCount, setMemberCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [activeSubscribers, setActiveSubscribers] = useState(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [programmesCount, setProgrammesCount] = useState(0);
  const [leadersCount, setLeadersCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [activities, setActivities] = useState<CmsActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubLeadership = subscribeToLeadership((items) => setLeadersCount(items.length));
    const unsubEvents = subscribeToEvents((items) => {
      setUpcomingEventsCount(items.filter((e) => e.published).length);
    });
    const unsubNews = subscribeToNews((items) => setNewsCount(items.filter((n) => n.published).length));
    const unsubProg = subscribeToProgrammes((items) => setProgrammesCount(items.filter((p) => p.published).length));
    const unsubGal = subscribeToGallery((items) => setGalleryCount(items.filter((g) => g.published).length));
    const unsubSubs = subscribeToNewsletterSubscribers((items) => {
      setSubscriberCount(items.length);
      setActiveSubscribers(items.filter((s) => s.status === 'active').length);
    });
    const unsubApps = subscribeToMembershipApplications((items) => setMemberCount(items.length));
    const unsubMsgs = subscribeToContactMessages((items) => setContactCount(items.filter((m) => m.status === 'unread').length));
    const unsubLogs = subscribeToActivityLogs((logs) => {
      setActivities(logs);
      setLoading(false);
    });

    return () => {
      unsubLeadership();
      unsubEvents();
      unsubNews();
      unsubProg();
      unsubGal();
      unsubSubs();
      unsubApps();
      unsubMsgs();
      unsubLogs();
    };
  }, []);

  const statsCards = [
    {
      label: 'Membership Applications',
      value: memberCount,
      subtext: 'Official records logged',
      icon: Users,
      color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
      tab: 'membership',
    },
    {
      label: 'Newsletter Subscribers',
      value: activeSubscribers,
      subtext: `${subscriberCount} total (${subscriberCount - activeSubscribers} unsubscribed)`,
      icon: Mail,
      color: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30',
      tab: 'subscribers',
    },
    {
      label: 'Published Events',
      value: upcomingEventsCount,
      subtext: 'Assemblies & webinars active',
      icon: Calendar,
      color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
      tab: 'events',
    },
    {
      label: 'Published News',
      value: newsCount,
      subtext: 'Official communiqués',
      icon: Newspaper,
      color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
      tab: 'news',
    },
    {
      label: 'Programmes & Pillars',
      value: programmesCount,
      subtext: 'Core strategic initiatives',
      icon: BookOpen,
      color: 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30',
      tab: 'programmes',
    },
    {
      label: 'Leadership Profiles',
      value: leadersCount,
      subtext: 'Executive Council roster',
      icon: Award,
      color: 'from-amber-600/20 to-amber-600/5 text-amber-300 border-amber-600/30',
      tab: 'leadership',
    },
    {
      label: 'Media Gallery Items',
      value: galleryCount,
      subtext: 'High-res photography',
      icon: ImageIcon,
      color: 'from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30',
      tab: 'gallery',
    },
    {
      label: 'Unread Inquiries',
      value: contactCount,
      subtext: 'Public Secretariat messages',
      icon: Bell,
      color: 'from-yellow-500/20 to-yellow-500/5 text-yellow-400 border-yellow-500/30',
      tab: 'contact_messages',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Real-time Institutional Data Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Continental Secretariat CMS
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Manage leadership portfolios, continental assemblies, official press communiqués, and the Continental Dispatch subscriber network. All changes reflect instantly on the public AYLA website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('events')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Publish Event</span>
            </button>
            <button
              onClick={() => onNavigateTab('campaigns')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Newsletter</span>
            </button>
          </div>
        </div>

        {/* Administrative Notification Target Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Administrative Alerts Destination:</span>
            <span className="text-amber-400 font-mono font-medium">{OFFICIAL_ADMIN_EMAIL}</span>
          </div>
          <span className="text-slate-500">Cloud Firestore Connected</span>
        </div>
      </div>

      {/* Summary KPI Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Operational Metrics</span>
            <span className="text-xs font-normal text-slate-400">(Live Backend Data)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.label}
                onClick={() => onNavigateTab(card.tab)}
                className={`text-left p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border transition-all cursor-pointer group relative overflow-hidden ${card.color}`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
                    {card.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">
                    {card.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {card.subtext}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Recent Activity & Quick CMS Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Recent Institutional Activity</span>
            </h3>
            <span className="text-[11px] text-slate-400">Audit Trail</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              Loading live activity logs...
            </div>
          ) : activities.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No recent activity recorded yet. New actions by administrators and visitors will appear here in real time.
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold">
                        {act.entity}
                      </span>
                      <span className="text-slate-200 font-medium">{act.description}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>Initiator: {act.adminEmail || 'System'}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Administrative Links */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Management
            </h3>

            <div className="space-y-2">
              {[
                { label: 'Executive Council Leadership', tab: 'leadership', icon: Award },
                { label: 'Continental Events & Webinars', tab: 'events', icon: Calendar },
                { label: 'Press Releases & Communiqués', tab: 'news', icon: Newspaper },
                { label: 'Strategic Programmes & Pillars', tab: 'programmes', icon: BookOpen },
                { label: 'Media & Assembly Photography', tab: 'gallery', icon: ImageIcon },
                { label: 'Official Resources & Constitution', tab: 'resources', icon: FileText },
                { label: 'Regional Focal Hubs & Chapters', tab: 'chapters', icon: Building2 },
                { label: 'Continental Dispatch Subscribers', tab: 'subscribers', icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.tab}
                    onClick={() => onNavigateTab(item.tab)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
