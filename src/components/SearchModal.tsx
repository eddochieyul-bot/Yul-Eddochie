import React, { useState, useEffect, useMemo } from 'react';
import { PageRoute } from '../types';
import {
  OBJECTIVES,
  PROGRAMMES,
  MEMBERSHIP_CATEGORIES,
  REGIONAL_CHAPTERS,
  CONSTITUTION_ARTICLES,
  LEADERSHIP_OFFICERS,
  NEWS_ARTICLES,
  RESOURCES,
} from '../data/organizationData';
import { Search, X, ArrowRight, BookOpen, Award, Users, Globe, Shield, FileText, Calendar } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  route: PageRoute;
  icon: any;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Aggregate searchable items
  const allItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [
      // Quick pages
      { id: 'p-home', title: 'Home', subtitle: "Africa's Young Leaders Association Official Portal", category: 'Page', route: '/', icon: Globe },
      { id: 'p-about', title: 'About AYLA', subtitle: 'Our Mandate, History, and Continental Philosophy', category: 'About', route: '/about', icon: Shield },
      { id: 'p-vm', title: 'Vision & Mission', subtitle: 'Continental transformation and ethical statecraft', category: 'About', route: '/vision-mission', icon: Shield },
      { id: 'p-obj', title: 'Core Objectives', subtitle: '10 Major Constitutional Focus Areas', category: 'About', route: '/objectives', icon: Award },
      { id: 'p-const', title: 'The Constitution', subtitle: 'Searchable Articles 1–15, Preamble & Bylaws', category: 'Governance', route: '/constitution', icon: BookOpen },
      { id: 'p-lead', title: 'Leadership & Executive Council', subtitle: 'Offices of President, VP, Sec Gen, Ambassador, Treasurer & DG', category: 'Leadership', route: '/leadership', icon: Users },
      { id: 'p-gov', title: 'Governance Structure', subtitle: 'Advisory Board, Council, Secretariat & Committees', category: 'Governance', route: '/governance', icon: Shield },
      { id: 'p-reg', title: 'Membership Registration', subtitle: 'Submit an application for ordinary or junior membership', category: 'Membership', route: '/membership/register', icon: Users },
      { id: 'p-cats', title: 'Membership Categories', subtitle: 'Ordinary, Honorary, Associate, Corporate, Founding, Junior', category: 'Membership', route: '/membership/categories', icon: Users },
      { id: 'p-part', title: 'Partnerships & Alliances', subtitle: 'Strategic Partners, Sponsorship, and MoUs', category: 'Partnerships', route: '/partnerships', icon: Globe },
      { id: 'p-news', title: 'News & Press Releases', subtitle: 'Institutional announcements and communiqués', category: 'Media', route: '/news', icon: FileText },
      { id: 'p-events', title: 'Events & Assemblies', subtitle: 'Continental Assembly, Youth Summits and Webinars', category: 'Events', route: '/events', icon: Calendar },
      { id: 'p-res', title: 'Institutional Resources', subtitle: 'Constitution, Annual Reports, Whitepapers & Downloads', category: 'Resources', route: '/resources', icon: BookOpen },
      { id: 'p-cont', title: 'Contact Secretariat', subtitle: 'Liaison offices, regional desks, and inquiry form', category: 'Contact', route: '/contact', icon: Globe },
    ];

    // Add Programmes
    PROGRAMMES.forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: 'Programme',
        route: p.route,
        icon: Award,
      });
    });

    // Add Objectives
    OBJECTIVES.forEach((o) => {
      items.push({
        id: o.id,
        title: `Objective ${o.number}: ${o.title}`,
        subtitle: o.shortDescription,
        category: 'Focus Area',
        route: '/objectives',
        icon: Award,
      });
    });

    // Add Chapters
    REGIONAL_CHAPTERS.forEach((c) => {
      items.push({
        id: c.id,
        title: c.name,
        subtitle: `Regional Hub: ${c.focalHub} (${c.countries.length} Nations)`,
        category: 'Chapter',
        route: c.route,
        icon: Globe,
      });
    });

    // Add Constitution Articles
    CONSTITUTION_ARTICLES.forEach((a) => {
      items.push({
        id: a.id,
        title: `${a.articleNumber}: ${a.title}`,
        subtitle: a.summary,
        category: 'Constitution',
        route: '/constitution',
        icon: BookOpen,
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/70 gap-3">
          <Search className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AYLA portal (e.g. Constitution, Leadership, Nairobi, Register, Climate...)"
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm md:text-base outline-none font-medium"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded bg-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-300 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-sm">No institutional records found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for Constitution, Programmes, Membership, Chapters, or Leadership.
              </p>
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-amber-50/60 border border-transparent hover:border-amber-200 text-left transition-all duration-150 group cursor-pointer"
                >
                  <div className="flex items-start gap-3.5 pr-2">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-amber-500/20 text-slate-600 group-hover:text-amber-700 transition-colors flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 group-hover:text-amber-900">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 group-hover:bg-amber-100 text-slate-600 group-hover:text-amber-800">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Official Portal Directory • Africa's Young Leaders Association</span>
          <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
            {results.length} matches
          </span>
        </div>
      </div>
    </div>
  );
};
