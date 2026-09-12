import React, { useState } from 'react';
import { PageRoute } from '../types';
import { RESOURCES } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { FileText, Download, Search, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = RESOURCES.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (res: any) => {
    alert(`Downloading verified copy of "${res.title}" (${res.format} • ${res.fileSize}).`);
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Institutional Resources & Downloads' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Repository
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Official Documents & Resources
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Public downloads of the AYLA Constitution, continental assembly roadmaps, chapter establishment manuals, policy whitepapers, and ethical codes of conduct.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter official publications by title, category, or keyword..."
            className="w-full text-sm text-slate-800 outline-none placeholder-slate-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    {res.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {res.fileSize}
                  </span>
                </div>

                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-2 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono uppercase font-semibold">
                  Format: {res.format || res.fileFormat || 'PDF'}
                </span>

                <button
                  type="button"
                  onClick={() => handleDownload(res)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Constitution Quick Link Box */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Supreme Foundational Law
            </span>
            <h3 className="font-['Outfit'] font-bold text-xl text-amber-950">
              Interactive Digital Constitution Viewer
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 max-w-xl">
              Access the complete searchable 15 articles, preamble, and bylaws directly in your browser.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/constitution')}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex-shrink-0"
          >
            Open Constitution Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
