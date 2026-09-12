import React from 'react';
import { PageRoute, RegionalChapter } from '../types';
import { REGIONAL_CHAPTERS, AYLA_INFO } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { AfricaMap } from '../components/AfricaMap';
import { Globe, MapPin, Users, Mail, Phone, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface ChaptersPagesProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const ChaptersPages: React.FC<ChaptersPagesProps> = ({ currentRoute, onNavigate }) => {
  const currentChapter = REGIONAL_CHAPTERS.find((c) => c.route === currentRoute);

  // If specific regional chapter
  if (currentChapter) {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Chapters', route: '/chapters' }, { label: currentChapter.name }]}
          onNavigate={onNavigate}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Article 9 Regional Directorate
            </span>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              {currentChapter.name}
            </h1>
            <p className="text-amber-400 font-['Outfit'] font-bold text-base sm:text-lg mt-2">
              Focal Hub Secretariat: {currentChapter.focalHub}
            </p>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              Coordinating youth leadership chapters, parliamentary simulations, and community engagement across {currentChapter.countries.length} sovereign member states.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Member States Roster */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                  Accredited Sovereign Member States ({currentChapter.countries.length})
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {currentChapter.countries.map((country, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-50 text-slate-800 hover:text-amber-900 border border-slate-200 text-xs font-semibold transition-colors"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regional Priority Programmes */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                  Regional Focus & Strategic Priorities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {(currentChapter.keyFocus || currentChapter.regionalPriorities || []).map((focus, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium">
                        {focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                <h3 className="font-['Outfit'] font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                  Regional Liaison Desk
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Headquarter Hub</span>
                      <span className="font-bold text-slate-800">{currentChapter.focalHub}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Chapter Inquiries</span>
                      <a
                        href={`mailto:${AYLA_INFO.email}`}
                        className="font-mono text-slate-800 hover:text-amber-600 underline font-medium"
                      >
                        {AYLA_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Liaison Telephone</span>
                      <a
                        href={`tel:${AYLA_INFO.phoneTel}`}
                        className="font-mono text-slate-800 hover:text-amber-600 underline font-medium"
                      >
                        {AYLA_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Regional Coordinator</span>
                      <span className="text-slate-800 font-medium">{currentChapter.coordinator || currentChapter.coordinatorStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onNavigate('/membership/register')}
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer text-center"
                  >
                    Join this Chapter
                  </button>
                </div>
              </div>

              {/* Other Chapters links */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 space-y-3">
                <h4 className="font-['Outfit'] font-bold text-sm text-slate-900">
                  Other Regional Directorates
                </h4>
                <div className="space-y-2 text-xs">
                  {REGIONAL_CHAPTERS.filter((c) => c.id !== currentChapter.id).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onNavigate(c.route)}
                      className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200/80 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-amber-900 truncate">
                        {c.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 flex-shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // General /chapters page
  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Regional Chapters' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Article 9 of the AYLA Constitution
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Pan-African Regional Chapters
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            AYLA's continental operations are anchored in five geographical regional directorates aligned with the African Union regional economic communities, complemented by the 6th Region Global Diaspora network.
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <AfricaMap onNavigate={onNavigate} />
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONAL_CHAPTERS.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 inline-block mb-2">
                  Hub: {c.focalHub}
                </span>
                <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-2">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Encompassing {c.countries.length} nations across the region.
                </p>

                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Strategic Focus:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {(c.keyFocus || c.regionalPriorities || []).slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(c.route)}
                className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer w-full text-left"
              >
                <span>View Chapter Secretariat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
