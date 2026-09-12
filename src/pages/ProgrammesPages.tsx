import React from 'react';
import { PageRoute, Programme } from '../types';
import { PROGRAMMES } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Award,
  Zap,
  Vote,
  BookOpen,
  Leaf,
  TrendingUp,
  CheckCircle2,
  Users,
  Calendar,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ProgrammesPagesProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const ProgrammesPages: React.FC<ProgrammesPagesProps> = ({ currentRoute, onNavigate }) => {
  // Check if a specific programme was requested
  const currentProg = PROGRAMMES.find((p) => p.route === currentRoute);

  // If specific programme page
  if (currentProg) {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Programmes', route: '/programmes' }, { label: currentProg.title }]}
          onNavigate={onNavigate}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Hero Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {currentProg.category}
              </span>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Target: {currentProg.impactMetric}
              </span>
            </div>

            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              {currentProg.title}
            </h1>
            <p className="text-amber-400 font-['Outfit'] font-bold text-base sm:text-lg mt-2">
              {currentProg.subtitle}
            </p>
            <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-3xl leading-relaxed">
              {currentProg.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Main content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Detailed Overview */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900">
                  Strategic Scope & Curriculum
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentProg.fullDetails || currentProg.description}
                </p>
              </div>

              {/* Core Pillars */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                  Core Implementation Pillars
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentProg.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        {pillar}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with enrollment & cohort info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                <h3 className="font-['Outfit'] font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                  Programme Cohort Schedule
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Cohort Frequency</span>
                      <span className="font-bold text-slate-800">{currentProg.duration || 'Annual Cohort / 12 Weeks'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Accreditation</span>
                      <span className="text-slate-800 font-semibold">Executive Secretariat Certificate</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 font-semibold block">Target Capacity</span>
                      <span className="text-slate-800 font-mono font-bold">{currentProg.impactMetric}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onNavigate('/membership/register')}
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer text-center"
                  >
                    Apply for this Programme
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Open to registered AYLA members across all chapters.
                  </p>
                </div>
              </div>

              {/* Other programmes list */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 space-y-3">
                <h4 className="font-['Outfit'] font-bold text-sm text-slate-900">
                  Explore Other Programmes
                </h4>
                <div className="space-y-2 text-xs">
                  {PROGRAMMES.filter((p) => p.id !== currentProg.id).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onNavigate(p.route)}
                      className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200/80 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-amber-900 truncate">
                        {p.title}
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

  // General /programmes directory page
  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Our Programmes' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Interventions
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Transformative Continental Programmes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            AYLA delivers high-impact, evidence-based curricula and interventions designed to cultivate democratic leadership, accelerate youth entrepreneurship under AfCFTA, advance climate resilience, and unite young African voices.
          </p>
        </div>

        {/* Programme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROGRAMMES.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {prog.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {prog.duration || 'Annual / Ongoing'}
                  </span>
                </div>
                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {prog.title}
                </h3>
                <p className="text-xs text-amber-700 font-medium mt-1">
                  {prog.subtitle}
                </p>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Pillars:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {prog.pillars.map((pillar, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-amber-600 flex-shrink-0" />
                          <span className="line-clamp-1">{pillar}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {prog.impactMetric}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate(prog.route)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
