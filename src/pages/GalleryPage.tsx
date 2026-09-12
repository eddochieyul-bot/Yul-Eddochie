import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { GALLERY_ITEMS } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { SocialLinks } from '../components/SocialLinks';
import { Image as ImageIcon, Camera, Calendar, MapPin, X } from 'lucide-react';
import { subscribeToGallery } from '../firebase/cmsService';

interface GalleryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState('All');
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [items, setItems] = useState<any[]>(GALLERY_ITEMS);

  useEffect(() => {
    const unsub = subscribeToGallery((liveItems) => {
      if (liveItems && liveItems.length > 0) {
        const mapped = liveItems
          .filter((item) => item.published !== false)
          .map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.caption || item.title,
            location: item.location,
            date: item.date || item.year || '2025',
            imageUrl: item.imageUrl,
          }));
        if (mapped.length > 0) {
          setItems(mapped);
        }
      }
    });
    return () => unsub();
  }, []);

  const filteredItems = filter === 'All'
    ? items
    : items.filter((item) => item.category === filter);

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Media Gallery' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Archive
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Media & Event Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Photographic and visual documentation of continental youth assemblies, leadership retreats, grassroots civic campaigns, and regional diplomatic colloquiums.
          </p>
        </div>

        {/* Video & Media Broadcast Callout */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 mb-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Live Streams & Video Repertoire
            </span>
            <p className="text-xs text-slate-300">
              High-definition assembly recordings, youth leader interviews, and short-form policy reels are published on <strong>@ayla.africa</strong>:
            </p>
          </div>
          <SocialLinks variant="footer" />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs font-semibold">
          {['All', 'Assembly', 'Summit', 'Community', 'Civic', 'Diplomacy', 'Innovation'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center text-white">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.5),transparent_70%)]" />
                    <div className="text-center p-4 relative z-10">
                      <Camera className="w-8 h-8 mx-auto text-amber-400/80 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                        Official Institutional Archive
                      </span>
                    </div>
                  </>
                )}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 border border-amber-500/20">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-['Outfit'] font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                  {item.description || item.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{item.location}</span>
                  </span>
                  <span>{item.date || item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {activeItem.category} Archive Record
              </span>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
              {activeItem.imageUrl ? (
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <Camera className="w-16 h-16 text-amber-400/60 mb-2" />
                  <p className="text-xs font-mono text-slate-400">High-Resolution Institutional Negative</p>
                </>
              )}
            </div>

            <div className="p-6 space-y-3">
              <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                {activeItem.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeItem.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-200">
                <span>Location: <strong className="text-slate-800">{activeItem.location}</strong></span>
                <span>•</span>
                <span>Date: <strong className="text-slate-800">{activeItem.date}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
