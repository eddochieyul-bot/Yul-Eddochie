import React from 'react';
import { PageRoute } from '../types';
import {
  AYLA_INFO,
  OBJECTIVES,
  LEADERSHIP_OFFICERS,
  PROGRAMMES,
  MEMBERSHIP_CATEGORIES,
  NEWS_ARTICLES,
  EVENTS,
  IMPACT_METRICS,
  STRATEGIC_PARTNERS,
} from '../data/organizationData';
import { LeadershipCard } from '../components/LeadershipCard';
import { AfricaMap } from '../components/AfricaMap';
import { SocialLinks } from '../components/SocialLinks';
import {
  ArrowRight,
  Award,
  Vote,
  Zap,
  Globe,
  BookOpen,
  Users,
  HeartPulse,
  Leaf,
  Handshake,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenPortal: () => void;
}

// Icon helper for objectives
const getObjectiveIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award':
      return Award;
    case 'Vote':
      return Vote;
    case 'Zap':
      return Zap;
    case 'Globe':
      return Globe;
    case 'BookOpen':
      return BookOpen;
    case 'Users':
      return Users;
    case 'HeartPulse':
      return HeartPulse;
    case 'Leaf':
      return Leaf;
    case 'Handshake':
      return Handshake;
    case 'CheckCircle2':
      return CheckCircle2;
    default:
      return Award;
  }
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenPortal }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ==================================================
          SECTION 1 — HERO
          ================================================== */}
      <section className="relative bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
        {/* Background graphic elements & elegant overlay */}
        <div className="absolute inset-0 z-0">
          {/* Subtle SVG continent watermark & sunburst */}
          <div className="absolute -right-24 -top-24 w-[700px] h-[700px] opacity-15 pointer-events-none filter blur-sm">
            <img src="/ayla-logo.svg" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Deep institutional background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))]" />

          {/* Subtle geometric grid lines representing African unity */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Top Institutional Crest Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Africa's Young Leaders Association • Official Portal</span>
            </div>

            {/* Official Headline */}
            <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Young Minds. <span className="text-amber-400">Bold Vision.</span> <br className="hidden sm:inline" />
              United Africa.
            </h1>

            {/* Supporting Statement */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              Uniting, empowering and equipping young African leaders to drive meaningful change across communities, nations and the continent.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/membership/register')}
                className="px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-600/30 hover:shadow-xl hover:translate-y-[-1px] transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <span>JOIN AYLA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/programmes')}
                className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-['Outfit'] font-bold text-sm uppercase tracking-wider border border-slate-700 hover:border-amber-500/50 transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <span>EXPLORE OUR PROGRAMMES</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Quick Stat / Key Pillars Micro Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-xl text-xs">
              <div>
                <span className="block font-['Outfit'] font-bold text-lg text-amber-400">54 Nations</span>
                <span className="text-slate-400">Pan-African Scope</span>
              </div>
              <div>
                <span className="block font-['Outfit'] font-bold text-lg text-amber-400">Article 9</span>
                <span className="text-slate-400">AU Regional Blocs</span>
              </div>
              <div>
                <span className="block font-['Outfit'] font-bold text-lg text-amber-400">100% Youth-Led</span>
                <span className="text-slate-400">Ethical Governance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — INTRODUCTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
            Institutional Mandate
          </span>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Building Africa's Next Generation of Leaders
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Africa's Young Leaders Association (AYLA) is a Pan-African youth-led organization established to champion transformative leadership development, civic engagement, Pan-African unity, youth empowerment, and sustainable continental transformation under the supreme authority of the AYLA Constitution.
          </p>
        </div>

        {/* 3 Elegant Cards: Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-600 group-hover:h-2 transition-all" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-3">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {AYLA_INFO.vision}
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Article 3.1 Mandate
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/vision-mission')}
                className="text-xs font-semibold text-slate-800 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900 group-hover:h-2 transition-all" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-3">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {AYLA_INFO.mission}
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Article 3.2 Mandate
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/vision-mission')}
                className="text-xs font-semibold text-slate-800 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Core Values Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-700 group-hover:h-2 transition-all" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100/60 border border-amber-200 flex items-center justify-center text-amber-900 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-3">
                Core Values
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {AYLA_INFO.values.slice(0, 4).map((val, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-800">{val.title}:</strong> {val.description.slice(0, 75)}...
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Ethical Pillars
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="text-xs font-semibold text-slate-800 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Values</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — OUR FOCUS AREAS (Major Objectives)
          ================================================== */}
      <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
                Article 4 Constitutional Pillars
              </span>
              <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Focus Areas
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Ten core objectives codifying our interventions across public governance, youth development, and continental integration.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/objectives')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider cursor-pointer"
            >
              <span>View All 10 Constitutional Objectives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 10 Professional Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {OBJECTIVES.map((obj) => {
              const Icon = getObjectiveIcon(obj.iconName);
              return (
                <div
                  key={obj.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-amber-600 text-amber-400 group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-amber-700">
                        #{obj.number.toString().padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-['Outfit'] font-bold text-base text-slate-900 mb-2 group-hover:text-amber-800 transition-colors leading-snug">
                      {obj.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {obj.shortDescription}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('/objectives')}
                    className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-amber-800 transition-colors cursor-pointer w-full text-left"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — LEADERSHIP
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
            Article 7 Executive Organ
          </span>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Executive Council
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            The apex executive and policy-implementing body mandated by the AYLA Constitution, accountable to the All-African Youth Continental Assembly.
          </p>
        </div>

        {/* 6 Leadership Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP_OFFICERS.map((officer) => (
            <LeadershipCard key={officer.id} officer={officer} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/governance')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
          >
            <span>Explore Full Governance Hierarchy & Committees</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — PAN-AFRICAN REACH (Interactive Map)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AfricaMap onNavigate={onNavigate} />
      </section>

      {/* ==================================================
          SECTION 6 — FEATURED PROGRAMMES
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
              Continental Interventions
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Programmes
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Equipping young minds through specialized academies, venture accelerators, and research fellowships.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/programmes')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider cursor-pointer"
          >
            <span>View All Programmes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Featured Programmes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMMES.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              {/* Header block with category badge */}
              <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {prog.category}
                  </span>
                  <span className="text-[11px] font-bold font-mono text-slate-500">
                    {prog.impactMetric}
                  </span>
                </div>
                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {prog.title}
                </h3>
                <p className="text-xs text-amber-700 font-medium mt-1">
                  {prog.subtitle}
                </p>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Pillars:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {prog.pillars.slice(0, 3).map((pillar, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span className="line-clamp-1">{pillar}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(prog.route)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-amber-600 hover:bg-amber-50/50 text-slate-800 hover:text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
                >
                  <span>Explore Programme Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — MEMBERSHIP
          ================================================== */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-8 border border-slate-800 px-6 sm:px-12 shadow-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Constitutional Enrolment
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Become Part of Africa's Young Leadership Movement
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Article 5 of the AYLA Constitution establishes six statutory categories of membership designed to accommodate emerging leaders, students, senior advisors, and corporate allies across all 54 African Union nations and the global diaspora.
            </p>
          </div>

          {/* 6 Membership Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MEMBERSHIP_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {cat.status}
                    </span>
                    {cat.ageBracket && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {cat.ageBracket}
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Outfit'] font-bold text-xl text-white mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium mb-3">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cat.eligibility}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Voting Rights: <strong className="text-slate-300">{cat.votingRights ? 'Yes (Statutory)' : 'Advisory / None'}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/membership/register')}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h4 className="font-['Outfit'] font-bold text-xl sm:text-2xl">
                Ready to Join the Continental Vanguard?
              </h4>
              <p className="text-xs sm:text-sm text-amber-100 mt-1">
                Submit your official application in less than 5 minutes and receive your digital credential upon chapter accreditation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/membership/register')}
              className="px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-md flex-shrink-0"
            >
              JOIN AYLA NOW
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — NEWS & EVENTS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
              Institutional Media Desk
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              News & Upcoming Events
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Official press communiqués, continental convocations, and chapter milestones.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/news')}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              All News
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/events')}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Continental Calendar
            </button>
          </div>
        </div>

        {/* Grid: 2 News Cards + 2 Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest News Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 border-b border-slate-200 pb-2">
              Latest Official News
            </h3>
            <div className="space-y-4">
              {NEWS_ARTICLES.slice(0, 2).map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200/60">
                        {item.category}
                      </span>
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h4 className="font-['Outfit'] font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug mb-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-medium">By {item.author}</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('/news')}
                      className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Communiqué</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Upcoming Events Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 border-b border-slate-200 pb-2">
              Upcoming Continental Events
            </h3>
            <div className="space-y-4">
              {EVENTS.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-amber-400 transition-colors flex gap-4"
                >
                  {/* Date Block */}
                  <div className="w-16 h-18 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center flex-shrink-0 text-center p-2">
                    <Calendar className="w-4 h-4 text-amber-400 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      2026
                    </span>
                    <span className="text-[11px] font-bold leading-tight line-clamp-1">
                      {evt.date.split(' ')[0]}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {evt.type}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {evt.status}
                        </span>
                      </div>
                      <h5 className="font-['Outfit'] font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                        {evt.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{evt.location}</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('/events')}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <span>Event Registration</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9 — PARTNERS
          ================================================== */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
              Multilateral & Institutional Alliances
            </span>
            <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 tracking-tight">
              Strategic Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Pursuant to Article 4.9 of the Constitution, AYLA collaborates with premier universities, development agencies, and civil society coalitions across the continent.
            </p>
          </div>

          {/* Institutional Partner Placeholder Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {STRATEGIC_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center text-center justify-between shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-slate-900 mb-1">
                    {partner.category}
                  </h4>
                  <span className="inline-block text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 mb-2">
                    {partner.statusNote}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Partner CTA */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('/partnerships')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              Partner With AYLA
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10 — IMPACT STATISTICS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Empirical Progress & Reach
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Continental Footprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Measuring our operational growth across member states and regional chapters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {IMPACT_METRICS.map((stat) => (
              <div key={stat.editableKey} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="font-['Outfit'] font-black text-3xl sm:text-4xl text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10.5 — OFFICIAL SOCIAL MEDIA & COMMUNITY (@ayla.africa)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
                Official Digital Identity
              </span>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Follow AYLA Across the Continent
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Stay updated with real-time institutional communiqués, assembly livestreams, youth opportunities, and grassroots chapter activities.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 font-mono text-xs font-bold self-start md:self-auto">
              <span className="text-slate-500 font-sans font-medium">Official Identity:</span>
              <span className="text-amber-700 font-bold">@ayla.africa</span>
            </div>
          </div>
          <SocialLinks variant="cards" />
        </div>
      </section>

      {/* ==================================================
          SECTION 11 — FINAL CALL TO ACTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-16 border-2 border-amber-500/30 shadow-2xl relative overflow-hidden text-center">
          {/* Background Watermark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
            <img src="/ayla-logo.svg" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Join the Vanguard
            </span>

            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Shape Africa's Future With Us
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join a growing network of young African leaders committed to unity, innovation, leadership and meaningful transformation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('/membership/register')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-600/30 hover:shadow-xl transition-all cursor-pointer"
              >
                JOIN AYLA
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/partnerships')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-['Outfit'] font-bold text-sm uppercase tracking-wider border border-slate-600 transition-colors cursor-pointer"
              >
                PARTNER WITH US
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
