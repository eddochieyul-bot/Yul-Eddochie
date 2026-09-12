import React, { useState, useEffect } from 'react';
import { PageRoute, NavItem } from '../types';
import { AYLA_INFO } from '../data/organizationData';
import { AylaLogo } from './AylaLogo';
import { SocialLinks } from './SocialLinks';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  UserCheck,
  Globe2,
  ExternalLink,
  BookOpen,
  Users,
  Award,
  Shield,
  Phone,
  Mail,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'FR' | 'PT' | 'AR' | 'SW'>('EN');

  // Close mobile menu on route change
  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (category: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const navItems: NavItem[] = [
    {
      label: 'HOME',
      href: '/',
    },
    {
      label: 'ABOUT AYLA',
      href: '/about',
      description: 'The premier Pan-African youth leadership movement',
      children: [
        { label: 'About AYLA', href: '/about', description: 'Our history, foundational covenant & continental mandate' },
        { label: 'Vision & Mission', href: '/vision-mission', description: 'Core principles and 2030 continental vision' },
        { label: 'Core Objectives', href: '/objectives', description: '10 constitutional focus areas & strategic priorities' },
        { label: 'Constitution', href: '/constitution', description: 'Official supreme law & articles 1 through 15' },
        { label: 'Leadership', href: '/leadership', description: 'Executive Council offices & constitutional roles' },
        { label: 'Governance Structure', href: '/governance', description: 'Advisory Board, Council, Secretariat & Committees' },
      ],
    },
    {
      label: 'PROGRAMMES',
      href: '/programmes',
      description: 'Transformative continental interventions',
      children: [
        { label: 'Overview & Curricula', href: '/programmes', description: 'Comprehensive programmatic architecture' },
        { label: 'Leadership Development', href: '/programmes/leadership-development', description: 'Continental Leadership Academy & statecraft' },
        { label: 'Youth Empowerment', href: '/programmes/youth-empowerment', description: 'Technical skills, AI literacy & career mobility' },
        { label: 'Civic Engagement', href: '/programmes/civic-engagement', description: 'Democratic literacy & shadow youth parliaments' },
        { label: 'Education & Research', href: '/programmes/education-research', description: 'Youth policy think-tank & empirical whitepapers' },
        { label: 'Environment & Climate', href: '/programmes/environment', description: 'Sahelian reforestation & climate diplomacy' },
        { label: 'Entrepreneurship & Trade', href: '/programmes/entrepreneurship', description: 'AfCFTA venture accelerator & capital access' },
      ],
    },
    {
      label: 'MEMBERSHIP',
      href: '/membership',
      description: 'Join the continental youth vanguard',
      children: [
        { label: 'Why Join AYLA', href: '/membership', description: 'Empowerment, continental network & fellowship' },
        { label: 'Membership Categories', href: '/membership/categories', description: 'Ordinary, Junior, Associate, Corporate, Honorary' },
        { label: 'Membership Registration', href: '/membership/register', description: 'Submit formal statutory application' },
        { label: 'Member Portal & ID', href: '/membership', description: 'Verifiable digital credentials and chapter rosters' },
      ],
    },
    {
      label: 'GOVERNANCE',
      href: '/governance',
      description: 'Statutory bodies and oversight organs',
      children: [
        { label: 'Governance Architecture', href: '/governance', description: 'Advisory Board, Council & Secretariat hierarchy' },
        { label: 'Executive Council', href: '/leadership', description: 'President, VP, Sec Gen, Ambassador, Treasurer & DG' },
        { label: 'Regional Chapters', href: '/chapters', description: 'East, West, North, Central, Southern & Diaspora' },
      ],
    },
    {
      label: 'PARTNERSHIPS',
      href: '/partnerships',
      description: 'Multilateral and academic covenants',
      children: [
        { label: 'Strategic Partners', href: '/partnerships', description: 'Multilateral, university & civil society alliances' },
        { label: 'Become a Partner', href: '/partnerships', description: 'Institutional collaboration and MoUs' },
      ],
    },
    {
      label: 'NEWS & MEDIA',
      href: '/news',
      description: 'Official announcements and events',
      children: [
        { label: 'News & Announcements', href: '/news', description: 'Press statements and institutional communiqués' },
        { label: 'Events & Summits', href: '/events', description: 'Continental assemblies & regional colloquiums' },
        { label: 'Media Gallery', href: '/gallery', description: 'Photo albums & youth movement documentaries' },
      ],
    },
    {
      label: 'RESOURCES',
      href: '/resources',
      description: 'Official documents and downloads',
      children: [
        { label: 'AYLA Constitution (PDF)', href: '/constitution', description: 'Full downloadable ratified document' },
        { label: 'Policy Briefs & Reports', href: '/resources', description: 'Whitepapers, annual reports & chapter guides' },
      ],
    },
    {
      label: 'CONTACT',
      href: '/contact',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* 1. TOP UTILITY BAR (Institutional University Style) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Official Motto / Tagline Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-['Outfit'] font-bold text-white tracking-wider text-[11px] sm:text-xs">
              "{AYLA_INFO.motto}"
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              Pan-African Youth Leadership Movement
            </span>
          </div>

          {/* Social Media Links for @ayla.africa (Desktop) */}
          <SocialLinks variant="header" className="hidden lg:flex" />

          {/* Quick links & utilities */}
          <div className="flex items-center gap-4 text-[11px]">
            {/* Language Selector */}
            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-white">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold">{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-slate-900 border border-slate-700 rounded shadow-lg py-1 z-50 min-w-[100px]">
                {(['EN', 'FR', 'PT', 'AR', 'SW'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className="w-full text-left px-3 py-1 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-amber-400"
                  >
                    {lang === 'EN' && 'English'}
                    {lang === 'FR' && 'Français'}
                    {lang === 'PT' && 'Português'}
                    {lang === 'AR' && 'العربية'}
                    {lang === 'SW' && 'Kiswahili'}
                  </button>
                ))}
              </div>
            </div>

            {/* Member Portal Trigger */}
            <button
              type="button"
              onClick={onOpenPortal}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Member Portal</span>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
              title="Search institutional portal"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline font-mono text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRANDING ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo and Brand Mark */}
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="text-left cursor-pointer transition-opacity hover:opacity-95 focus:outline-none"
        >
          <AylaLogo size="md" variant="horizontal" />
        </button>

        {/* Right side CTA & Quick Contact on desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="text-right text-xs pr-4 border-r border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
              Continental Secretariat
            </span>
            <a
              href={`mailto:${AYLA_INFO.email}`}
              className="font-mono text-slate-800 hover:text-amber-700 font-bold text-[11px] block transition-colors"
              title="Email AYLA Secretariat"
            >
              {AYLA_INFO.email}
            </a>
            <a
              href={`tel:${AYLA_INFO.phoneTel}`}
              className="font-mono text-amber-700 hover:text-amber-900 font-semibold text-[10px] block transition-colors"
              title="Call AYLA Secretariat"
            >
              {AYLA_INFO.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('/membership/register')}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-black text-xs uppercase tracking-wider shadow-md shadow-amber-600/20 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>JOIN AYLA</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-900 hover:bg-slate-100 cursor-pointer focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. DESKTOP MAIN NAVIGATION BAR */}
      <nav className="hidden lg:block bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-xs font-['Outfit'] font-bold tracking-wider">
            {navItems.map((item) => {
              const isActive = currentRoute === item.href || (item.href !== '/' && currentRoute.startsWith(item.href));
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li
                  key={item.label}
                  className="relative group py-3 px-2.5"
                  onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center gap-1 py-1 px-2 rounded transition-colors cursor-pointer ${
                      isActive
                        ? 'text-amber-400 bg-slate-800/80 font-extrabold'
                        : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasChildren && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-amber-400" />}
                  </button>

                  {/* Mega Dropdown Menu */}
                  {hasChildren && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full mt-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 text-slate-900 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-4 pb-2 mb-2 border-b border-slate-100 text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                        {item.description}
                      </div>
                      <div className="space-y-1 px-2">
                        {item.children?.map((sub) => (
                          <button
                            key={sub.label}
                            type="button"
                            onClick={() => handleNavClick(sub.href)}
                            className="w-full text-left p-2 rounded-lg hover:bg-amber-50 group/sub transition-colors cursor-pointer"
                          >
                            <div className="text-xs font-bold text-slate-900 group-hover/sub:text-amber-900">
                              {sub.label}
                            </div>
                            {sub.description && (
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                {sub.description}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Right Button */}
          <button
            type="button"
            onClick={() => handleNavClick('/constitution')}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold py-1.5 px-3 rounded bg-amber-500/10 border border-amber-500/20 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>AYLA Constitution</span>
          </button>
        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 flex flex-col justify-between shadow-2xl">
          <div className="p-4 space-y-3">
            {/* Prominent Mobile Join Button */}
            <button
              type="button"
              onClick={() => handleNavClick('/membership/register')}
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider shadow-md text-center cursor-pointer"
            >
              JOIN AYLA NOW
            </button>

            {/* Navigation List */}
            <div className="divide-y divide-slate-100 border-y border-slate-100">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = !!mobileExpanded[item.label];

                return (
                  <div key={item.label} className="py-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.href)}
                        className="text-left font-['Outfit'] font-bold text-sm text-slate-900 hover:text-amber-700 py-1 cursor-pointer"
                      >
                        {item.label}
                      </button>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
                          aria-label={`Expand ${item.label} submenu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? 'rotate-180 text-amber-600' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu on mobile */}
                    {hasChildren && isExpanded && (
                      <div className="mt-2 pl-3 border-l-2 border-amber-500 space-y-2 py-1 bg-slate-50 rounded-r-lg">
                        {item.children?.map((sub) => (
                          <button
                            key={sub.label}
                            type="button"
                            onClick={() => handleNavClick(sub.href)}
                            className="block w-full text-left py-1 text-xs font-semibold text-slate-700 hover:text-amber-800"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Footer Drawer Details */}
          <div className="p-4 bg-slate-900 text-white border-t border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="flex items-center gap-1.5 text-amber-400 font-bold"
              >
                <UserCheck className="w-4 h-4" />
                <span>Member Portal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-1.5 text-slate-300"
              >
                <Search className="w-4 h-4" />
                <span>Search Portal</span>
              </button>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${AYLA_INFO.email}`} className="text-slate-200 hover:text-amber-400 font-mono">
                  {AYLA_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <a href={`tel:${AYLA_INFO.phoneTel}`} className="text-slate-200 hover:text-amber-400 font-mono font-semibold">
                  {AYLA_INFO.phone}
                </a>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">
                Official Channels (@ayla.africa)
              </span>
              <SocialLinks variant="footer" />
            </div>

            <p className="text-slate-500 text-[10px] leading-relaxed">
              Continental Secretariat • Liaison Hubs in Nairobi, Accra, Addis Ababa & Johannesburg
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
