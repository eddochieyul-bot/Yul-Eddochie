import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { NEWS_ARTICLES, EVENTS } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { SocialLinks } from '../components/SocialLinks';
import { Calendar, Clock, MapPin, Tag, ArrowRight, Share2, Search, Filter, X, ExternalLink } from 'lucide-react';
import { subscribeToNews, subscribeToEvents } from '../firebase/cmsService';

interface NewsEventsPagesProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const NewsEventsPages: React.FC<NewsEventsPagesProps> = ({ currentRoute, onNavigate }) => {
  const isEvents = currentRoute === '/events';
  const [newsFilter, setNewsFilter] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const [liveNews, setLiveNews] = useState<any[]>(NEWS_ARTICLES);
  const [liveEvents, setLiveEvents] = useState<any[]>(EVENTS);

  useEffect(() => {
    const unsubNews = subscribeToNews((items) => {
      if (items && items.length > 0) {
        const mapped = items
          .filter((item) => item.published !== false)
          .map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            date: item.publishDate,
            excerpt: item.excerpt,
            author: item.author,
            content: item.content,
            featuredImage: item.featuredImage,
          }));
        if (mapped.length > 0) {
          setLiveNews(mapped);
        }
      }
    });

    const unsubEvents = subscribeToEvents((items) => {
      if (items && items.length > 0) {
        const mapped = items
          .filter((item) => item.published !== false)
          .map((item) => ({
            id: item.id,
            title: item.title,
            type: item.eventType || 'Continental Summit',
            status: item.status || 'Confirmed',
            date: item.date,
            location: item.location,
            description: item.description,
            registrationLink: item.registrationUrl,
          }));
        if (mapped.length > 0) {
          setLiveEvents(mapped);
        }
      }
    });

    return () => {
      unsubNews();
      unsubEvents();
    };
  }, []);

  const filteredNews = newsFilter === 'All'
    ? liveNews
    : liveNews.filter((item) => item.category === newsFilter);

  if (isEvents) {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb items={[{ label: 'Continental Calendar & Events' }]} onNavigate={onNavigate} />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Statutory Convocations & Assemblies
            </span>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Continental Events Calendar
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              Official schedule of All-African Youth Continental Assemblies, regional youth leadership colloquiums, and thematic policy summits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {evt.type}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-2 leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="font-medium text-slate-700">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="font-medium text-slate-700">{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="p-6 pt-0">
                  {evt.registrationLink && evt.registrationLink.startsWith('http') ? (
                    <a
                      href={evt.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Register as Delegate</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('/membership/register');
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Register as Delegate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // News & Press releases
  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'News & Media' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Press Desk
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            News, Communiqués & Statements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Official announcements, resolutions of the Executive Council, press releases, and reports from regional chapters.
          </p>
        </div>

        {/* Official Social Media Broadcast Strip */}
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold text-slate-800">
              Live Continental Dispatches:
            </span>
            <span className="text-xs text-slate-600">
              Follow official announcements on <strong>@ayla.africa</strong>:
            </span>
          </div>
          <SocialLinks variant="pills" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs font-semibold">
          {['All', 'Governance', 'Climate Action', 'AfCFTA & Innovation', 'Constitution'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setNewsFilter(cat)}
              className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                newsFilter === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">By {item.author}</span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(item)}
                  className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Official Press Communiqué
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedArticle.category}
                </span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.author}</span>
              </div>

              <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed font-serif">
                {selectedArticle.fullContent}
              </p>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
                <div>Institutional Release • AYLA Directorate of Communications & Public Diplomacy</div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-semibold text-slate-700">Follow @ayla.africa:</span>
                  <SocialLinks variant="pills" />
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
