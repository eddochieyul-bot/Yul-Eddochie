import React, { useState, useMemo } from 'react';
import { CONSTITUTION_ARTICLES, AYLA_INFO } from '../data/organizationData';
import { AylaLogo } from './AylaLogo';
import {
  Search,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Share2,
  Check,
  ShieldAlert,
  List,
} from 'lucide-react';

export const ConstitutionViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>(() => {
    // Expand Preamble, Article 1, Article 4, and Article 7 by default
    return {
      'art-preamble': true,
      'art-1': true,
      'art-3': true,
      'art-4': true,
      'art-7': true,
    };
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return CONSTITUTION_ARTICLES;
    const q = searchQuery.toLowerCase();
    return CONSTITUTION_ARTICLES.filter((article) => {
      const matchTitle = article.title.toLowerCase().includes(q) || article.articleNumber.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchClauses = article.clauses.some(
        (c) => c.text.toLowerCase().includes(q) || (c.subclauses && c.subclauses.some((s) => s.toLowerCase().includes(q)))
      );
      return matchTitle || matchSummary || matchClauses;
    });
  }, [searchQuery]);

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    CONSTITUTION_ARTICLES.forEach((a) => (all[a.id] = true));
    setExpandedArticles(all);
  };

  const collapseAll = () => {
    setExpandedArticles({});
  };

  const handleCopyLink = (id: string) => {
    setCopiedId(id);
    navigator.clipboard?.writeText(`${window.location.origin}/constitution#${id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Official Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 md:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Authoritative Organic Law
          </div>

          <h1 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            The Constitution of AYLA
          </h1>

          <p className="text-amber-400 font-['Outfit'] font-bold text-base sm:text-lg mb-3 tracking-wide">
            "{AYLA_INFO.motto}"
          </p>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            The supreme foundational charter of Africa's Young Leaders Association, codifying our sovereign youth covenant, continental objectives, executive offices, and democratic governance structures.
          </p>

          {/* Metadata & Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400">
              Adoption: <strong className="text-slate-200">Ratified by Inaugural Continental Assembly</strong>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400">
              Jurisdiction: <strong className="text-slate-200">Continental & Global Diaspora</strong>
            </span>

            <div className="ml-auto flex items-center gap-2 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print Document</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert("Initiating secure download of the Official AYLA Constitution (Complete Ratified Edition PDF).");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF (1.4 MB)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Constitution Layout: Table of Contents + Interactive Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table of Contents Sticky Sidebar (Desktop) */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm lg:sticky lg:top-24 max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <h3 className="font-['Outfit'] font-bold text-sm text-slate-900 flex items-center gap-2">
              <List className="w-4 h-4 text-amber-600" /> Table of Contents
            </h3>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">
              {CONSTITUTION_ARTICLES.length} Articles
            </span>
          </div>

          <div className="overflow-y-auto space-y-1 text-xs pr-1 flex-1">
            {CONSTITUTION_ARTICLES.map((art) => {
              const isCurrentExpanded = !!expandedArticles[art.id];
              return (
                <a
                  key={art.id}
                  href={`#${art.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedArticles((prev) => ({ ...prev, [art.id]: true }));
                    const element = document.getElementById(art.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`block p-2 rounded-lg transition-colors leading-snug cursor-pointer ${
                    isCurrentExpanded
                      ? 'bg-amber-50 text-amber-950 font-semibold border-l-2 border-amber-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-[11px] text-amber-700">{art.articleNumber}</div>
                  <div className="truncate text-slate-800">{art.title}</div>
                </a>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="text-amber-800 hover:text-amber-950 font-medium cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </aside>

        {/* Content Column */}
        <main className="lg:col-span-8 space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, keywords, clauses..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto justify-between sm:justify-end">
              <span>Showing {filteredArticles.length} of {CONSTITUTION_ARTICLES.length}</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-amber-700 font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Articles Accordion Stack */}
          <div className="space-y-4">
            {filteredArticles.map((article) => {
              const isExpanded = !!expandedArticles[article.id];
              return (
                <div
                  key={article.id}
                  id={article.id}
                  className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                    isExpanded
                      ? 'border-amber-400/80 shadow-md ring-1 ring-amber-400/20'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Article Accordion Header */}
                  <div
                    onClick={() => toggleArticle(article.id)}
                    className="p-5 flex items-start justify-between cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-amber-600/10 text-amber-700 border border-amber-600/20">
                          {article.articleNumber}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          AYLA Supreme Law
                        </span>
                      </div>
                      <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(article.id);
                        }}
                        title="Copy direct anchor link"
                        className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        {copiedId === article.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                      <div className="p-1.5 rounded-full bg-slate-100 text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Clauses Body */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-200 bg-white space-y-4">
                      {article.clauses.map((clause, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-800 text-xs sm:text-sm leading-relaxed"
                        >
                          <span className="font-mono font-bold text-amber-700 text-xs bg-amber-100/70 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                            {clause.clauseNumber}
                          </span>
                          <div className="space-y-2 flex-1">
                            <p>{clause.text}</p>
                            {clause.subclauses && clause.subclauses.length > 0 && (
                              <ul className="pl-4 space-y-1.5 list-disc text-xs text-slate-600">
                                {clause.subclauses.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Constitutional Attestation / Seal */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/ayla-logo.svg" alt="AYLA Seal" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="font-['Outfit'] font-bold text-base text-amber-950">
                Official Certification of Authenticity
              </h4>
              <p className="text-xs text-amber-900/80 leading-relaxed mt-1">
                This digital edition reflects the verbatim text of the Constitution of Africa's Young Leaders Association (AYLA) as ratified. Any purported amendments require formal ratification pursuant to Article 14.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
