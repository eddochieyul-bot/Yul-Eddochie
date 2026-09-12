import React, { useState } from 'react';
import { REGIONAL_CHAPTERS } from '../data/organizationData';
import { RegionalChapterItem, PageRoute } from '../types';
import { Globe, ArrowRight, ShieldCheck, MapPin, Building2, Users } from 'lucide-react';

interface AfricaMapProps {
  onNavigate: (route: PageRoute) => void;
}

export const AfricaMap: React.FC<AfricaMapProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>('chap-east');

  const selectedChapter = REGIONAL_CHAPTERS.find((c) => c.id === selectedId) || REGIONAL_CHAPTERS[0];

  // Colors per region for rich distinction
  const regionColors: Record<string, { fill: string; activeFill: string; border: string }> = {
    'chap-north': { fill: '#FDE68A', activeFill: '#F59E0B', border: '#D97706' },
    'chap-west': { fill: '#FED7AA', activeFill: '#F97316', border: '#EA580C' },
    'chap-central': { fill: '#BBF7D0', activeFill: '#22C55E', border: '#16A34A' },
    'chap-east': { fill: '#BAE6FD', activeFill: '#0EA5E9', border: '#0284C7' },
    'chap-southern': { fill: '#DDD6FE', activeFill: '#8B5CF6', border: '#7C3AED' },
    'chap-diaspora': { fill: '#E2E8F0', activeFill: '#64748B', border: '#334155' },
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 md:p-10 shadow-2xl overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" /> Continental Architecture
          </div>
          <h3 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            One Africa. One Vision. One Generation.
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Pursuant to Article 9 of the AYLA Constitution, operations span five African Union regions and the 6th Region Global Diaspora.
          </p>
        </div>

        {/* Region selector pill buttons */}
        <div className="flex flex-wrap gap-1.5">
          {REGIONAL_CHAPTERS.map((chapter) => {
            const isSelected = chapter.id === selectedId;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => setSelectedId(chapter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                }`}
              >
                {chapter.name.replace(' Chapter', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Map & Detail Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive Map Area */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <div className="w-full max-w-md aspect-[4/4.4] relative flex items-center justify-center">
            <svg
              viewBox="0 0 500 550"
              className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Region 1: North Africa */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedId('chap-north')}
              >
                <path
                  d="M 120,80 C 180,40 280,30 380,40 C 440,70 470,120 440,160 C 370,180 300,180 200,190 C 130,190 90,170 80,140 C 70,110 90,90 120,80 Z"
                  fill={selectedId === 'chap-north' ? '#F59E0B' : '#334155'}
                  stroke={selectedId === 'chap-north' ? '#FEF3C7' : '#475569'}
                  strokeWidth={selectedId === 'chap-north' ? '3' : '1.5'}
                  className="hover:opacity-90"
                />
                <text
                  x="260"
                  y="120"
                  fill={selectedId === 'chap-north' ? '#0F172A' : '#94A3B8'}
                  fontSize="14"
                  fontWeight="800"
                  fontFamily="'Outfit', sans-serif"
                  textAnchor="middle"
                >
                  NORTH AFRICA
                </text>
              </g>

              {/* Region 2: West Africa */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedId('chap-west')}
              >
                <path
                  d="M 80,145 C 140,175 190,185 200,200 C 210,230 220,270 200,300 C 160,305 110,310 70,290 C 40,275 25,240 30,210 C 35,170 50,155 80,145 Z"
                  fill={selectedId === 'chap-west' ? '#F97316' : '#1E293B'}
                  stroke={selectedId === 'chap-west' ? '#FFEDD5' : '#475569'}
                  strokeWidth={selectedId === 'chap-west' ? '3' : '1.5'}
                  className="hover:opacity-90"
                />
                <text
                  x="115"
                  y="235"
                  fill={selectedId === 'chap-west' ? '#FFFFFF' : '#94A3B8'}
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="'Outfit', sans-serif"
                  textAnchor="middle"
                >
                  WEST AFRICA
                </text>
              </g>

              {/* Region 3: Central Africa */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedId('chap-central')}
              >
                <path
                  d="M 200,195 C 270,185 300,195 300,240 C 300,290 310,330 280,365 C 240,365 210,360 190,320 C 185,280 180,240 200,195 Z"
                  fill={selectedId === 'chap-central' ? '#22C55E' : '#1E293B'}
                  stroke={selectedId === 'chap-central' ? '#DCFCE7' : '#475569'}
                  strokeWidth={selectedId === 'chap-central' ? '3' : '1.5'}
                  className="hover:opacity-90"
                />
                <text
                  x="245"
                  y="280"
                  fill={selectedId === 'chap-central' ? '#0F172A' : '#94A3B8'}
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="'Outfit', sans-serif"
                  textAnchor="middle"
                >
                  CENTRAL
                </text>
              </g>

              {/* Region 4: East Africa & Horn */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedId('chap-east')}
              >
                <path
                  d="M 305,185 C 380,180 450,190 460,230 C 470,260 440,290 410,320 C 390,360 365,390 330,390 C 310,370 300,310 300,240 C 300,205 300,190 305,185 Z"
                  fill={selectedId === 'chap-east' ? '#0EA5E9' : '#1E293B'}
                  stroke={selectedId === 'chap-east' ? '#E0F2FE' : '#475569'}
                  strokeWidth={selectedId === 'chap-east' ? '3' : '1.5'}
                  className="hover:opacity-90"
                />
                <text
                  x="375"
                  y="275"
                  fill={selectedId === 'chap-east' ? '#0F172A' : '#94A3B8'}
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="'Outfit', sans-serif"
                  textAnchor="middle"
                >
                  EAST AFRICA
                </text>
              </g>

              {/* Region 5: Southern Africa + Madagascar */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedId('chap-southern')}
              >
                <path
                  d="M 210,345 C 270,355 330,380 330,410 C 320,470 280,515 240,515 C 205,510 185,460 190,410 C 190,370 200,350 210,345 Z"
                  fill={selectedId === 'chap-southern' ? '#8B5CF6' : '#1E293B'}
                  stroke={selectedId === 'chap-southern' ? '#EDE9FE' : '#475569'}
                  strokeWidth={selectedId === 'chap-southern' ? '3' : '1.5'}
                  className="hover:opacity-90"
                />
                {/* Madagascar */}
                <path
                  d="M 400,380 C 420,380 430,430 410,460 C 390,470 380,430 395,390 Z"
                  fill={selectedId === 'chap-southern' ? '#8B5CF6' : '#1E293B'}
                  stroke={selectedId === 'chap-southern' ? '#EDE9FE' : '#475569'}
                  strokeWidth={selectedId === 'chap-southern' ? '2.5' : '1'}
                />
                <text
                  x="260"
                  y="440"
                  fill={selectedId === 'chap-southern' ? '#FFFFFF' : '#94A3B8'}
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="'Outfit', sans-serif"
                  textAnchor="middle"
                >
                  SOUTHERN
                </text>
              </g>

              {/* Pin indicator for active region */}
              <circle
                cx={
                  selectedId === 'chap-north'
                    ? 260
                    : selectedId === 'chap-west'
                    ? 120
                    : selectedId === 'chap-central'
                    ? 245
                    : selectedId === 'chap-east'
                    ? 370
                    : 260
                }
                cy={
                  selectedId === 'chap-north'
                    ? 85
                    : selectedId === 'chap-west'
                    ? 210
                    : selectedId === 'chap-central'
                    ? 250
                    : selectedId === 'chap-east'
                    ? 240
                    : 410
                }
                r="6"
                fill="#DC2626"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" /> Click any region to view chapter details
          </span>
        </div>

        {/* Selected Chapter Details Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full bg-slate-800/40 rounded-xl border border-slate-700/60 p-6 md:p-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Regional Secretariat Hub
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                {selectedChapter.stats.activeFocalPoints}
              </span>
            </div>

            <h4 className="font-['Outfit'] text-2xl font-black text-white mb-2">
              {selectedChapter.name}
            </h4>

            <p className="text-sm text-slate-300 mb-4 font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{selectedChapter.focalHub}</span>
            </p>

            {/* Focal Countries Tag Cloud */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Member Nations ({selectedChapter.countries.length} Nations Represented):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {selectedChapter.countries.map((country) => (
                  <span
                    key={country}
                    className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/60 text-xs text-slate-300 font-medium"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>

            {/* Regional Strategic Priorities */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
                Key Strategic Priorities:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedChapter.regionalPriorities.map((priority, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Coordinating Bureau: <span className="text-slate-200 font-semibold">{selectedChapter.coordinatorStatus}</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(selectedChapter.route)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              Explore {selectedChapter.name}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
