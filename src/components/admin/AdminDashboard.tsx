import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminLoginPage } from './AdminLoginPage';
import { OverviewTab } from './tabs/OverviewTab';
import { LeadershipTab } from './tabs/LeadershipTab';
import { EventsTab } from './tabs/EventsTab';
import { NewsTab } from './tabs/NewsTab';
import { ProgrammesTab } from './tabs/ProgrammesTab';
import { GalleryTab } from './tabs/GalleryTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';
import { ResourcesTab } from './tabs/ResourcesTab';
import { ChaptersTab } from './tabs/ChaptersTab';
import { MembershipApplicationsTab } from './tabs/MembershipApplicationsTab';
import { NewsletterSubscribersTab } from './tabs/NewsletterSubscribersTab';
import { NewsletterCampaignsTab } from './tabs/NewsletterCampaignsTab';
import { ContactMessagesTab } from './tabs/ContactMessagesTab';
import { WebsiteSettingsTab } from './tabs/WebsiteSettingsTab';
import { AdminUsersTab } from './tabs/AdminUsersTab';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  BookOpen,
  Image as ImageIcon,
  Bell,
  FileText,
  Globe,
  UserCheck,
  Mail,
  Send,
  MessageSquare,
  Settings,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPublicSite: () => void;
}

export type AdminTabKey =
  | 'overview'
  | 'leadership'
  | 'events'
  | 'news'
  | 'programmes'
  | 'gallery'
  | 'announcements'
  | 'resources'
  | 'chapters'
  | 'membership'
  | 'subscribers'
  | 'campaigns'
  | 'messages'
  | 'settings'
  | 'admins';

interface NavGroup {
  label: string;
  items: {
    key: AdminTabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Command Center',
    items: [
      { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Governance & Structure',
    items: [
      { key: 'leadership', label: 'Executive Leadership', icon: Users },
      { key: 'chapters', label: 'Regional Chapters', icon: Globe },
      { key: 'resources', label: 'Treaties & Documents', icon: FileText },
    ],
  },
  {
    label: 'Editorial & Public Affairs',
    items: [
      { key: 'news', label: 'News & Press', icon: Newspaper },
      { key: 'events', label: 'Summits & Events', icon: Calendar },
      { key: 'programmes', label: 'Programmes & Pillars', icon: BookOpen },
      { key: 'gallery', label: 'Visual Archive (Gallery)', icon: ImageIcon },
      { key: 'announcements', label: 'Announcements', icon: Bell },
    ],
  },
  {
    label: 'Secretariat Inquiries',
    items: [
      { key: 'membership', label: 'Membership Applications', icon: UserCheck },
      { key: 'messages', label: 'Contact Messages', icon: MessageSquare },
    ],
  },
  {
    label: 'Continental Dispatch',
    items: [
      { key: 'subscribers', label: 'Subscribers Roster', icon: Mail },
      { key: 'campaigns', label: 'Newsletter Broadcasts', icon: Send },
    ],
  },
  {
    label: 'Administration',
    items: [
      { key: 'settings', label: 'Website Settings', icon: Settings },
      { key: 'admins', label: 'Access Control (RBAC)', icon: ShieldCheck },
    ],
  },
];

export function AdminDashboard({ onBackToPublicSite }: AdminDashboardProps) {
  const { user, role, isSuperAdmin, logout, loading, isAuthorized, isAuthorizedAdmin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTabKey>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If not logged in or not authorized, show login screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4 text-center">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
          Securing Institutional Session...
        </p>
        <button
          type="button"
          onClick={logout}
          className="text-xs text-amber-400/80 hover:text-amber-300 underline cursor-pointer transition-colors"
        >
          Cancel & Return to Login
        </button>
      </div>
    );
  }

  const isAuthed = Boolean(isAuthorized || isAuthorizedAdmin || (user && isSuperAdmin));

  if (!user || !isAuthed) {
    return <AdminLoginPage onBackToWebsite={onBackToPublicSite} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'leadership':
        return <LeadershipTab />;
      case 'events':
        return <EventsTab />;
      case 'news':
        return <NewsTab />;
      case 'programmes':
        return <ProgrammesTab />;
      case 'gallery':
        return <GalleryTab />;
      case 'announcements':
        return <AnnouncementsTab />;
      case 'resources':
        return <ResourcesTab />;
      case 'chapters':
        return <ChaptersTab />;
      case 'membership':
        return <MembershipApplicationsTab />;
      case 'subscribers':
        return <NewsletterSubscribersTab />;
      case 'campaigns':
        return <NewsletterCampaignsTab />;
      case 'messages':
        return <ContactMessagesTab />;
      case 'settings':
        return <WebsiteSettingsTab />;
      case 'admins':
        return <AdminUsersTab />;
      default:
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Navigation Bar */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/ayla_logo.png"
            alt="AYLA Logo"
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <div className="text-xs font-black tracking-wider text-amber-400 uppercase font-['Outfit']">
              AYLA ADMIN
            </div>
            <div className="text-[10px] text-slate-400">Continental Secretariat</div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 lg:flex-shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/ayla-official-logo.jpg"
                  alt="AYLA Logo"
                  className="w-10 h-10 object-contain rounded-full bg-slate-950 p-0.5 border border-amber-500/30 drop-shadow"
                  onError={(e) => {
                    e.currentTarget.src = '/ayla-logo.svg';
                  }}
                />
                <div>
                  <div className="text-sm font-black text-white tracking-wide font-['Outfit']">
                    AYLA ADMIN
                  </div>
                  <div className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                    Institutional CMS
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current user badge */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div className="truncate pr-2">
                <div className="text-[11px] font-semibold text-white truncate">
                  {user.email}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="capitalize">{(role || 'super_admin').replace('_', ' ')}</span>
                </div>
              </div>
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {group.label}
                </div>

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setActiveTab(item.key);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-950/40">
            <button
              onClick={onBackToPublicSite}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Website</span>
            </button>

            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{renderActiveTab()}</div>
      </main>
    </div>
  );
}
