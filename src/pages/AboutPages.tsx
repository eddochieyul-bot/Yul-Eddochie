import React from 'react';
import { PageRoute } from '../types';
import { AYLA_INFO, OBJECTIVES } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Shield,
  Globe,
  Award,
  Vote,
  Zap,
  BookOpen,
  Users,
  HeartPulse,
  Leaf,
  Handshake,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface AboutPagesProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const getObjectiveIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award': return Award;
    case 'Vote': return Vote;
    case 'Zap': return Zap;
    case 'Globe': return Globe;
    case 'BookOpen': return BookOpen;
    case 'Users': return Users;
    case 'HeartPulse': return HeartPulse;
    case 'Leaf': return Leaf;
    case 'Handshake': return Handshake;
    case 'CheckCircle2': return CheckCircle2;
    default: return Award;
  }
};

export const AboutPages: React.FC<AboutPagesProps> = ({ currentRoute, onNavigate }) => {
  if (currentRoute === '/objectives') {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb
          items={[{ label: 'About AYLA', route: '/about' }, { label: 'Core Objectives' }]}
          onNavigate={onNavigate}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Article 4 of the AYLA Constitution
            </span>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Ten Core Constitutional Objectives
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              These ten statutory focus areas represent the supreme programmatic imperatives of Africa's Young Leaders Association, guiding resource deployment, regional chapter priorities, and continental advocacy.
            </p>
          </div>

          {/* Detailed Objectives List */}
          <div className="space-y-6">
            {OBJECTIVES.map((obj) => {
              const Icon = getObjectiveIcon(obj.iconName);
              return (
                <div
                  key={obj.id}
                  id={obj.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-block mb-1">
                        Objective {obj.number.toString().padStart(2, '0')}
                      </span>
                      <h2 className="font-['Outfit'] font-bold text-xl text-slate-900 leading-snug">
                        {obj.title}
                      </h2>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {obj.fullDescription}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Statutory Targets & Interventions:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {obj.keyTargets.map((target, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-8 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <h3 className="font-['Outfit'] font-bold text-xl text-amber-950 mb-2">
              Learn How Objectives Translate to Real Programmes
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 max-w-xl mx-auto mb-4">
              Explore our active academies, civic engagement labs, and environmental coalitions operational across Africa.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/programmes')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Explore Our Programmes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentRoute === '/vision-mission') {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb
          items={[{ label: 'About AYLA', route: '/about' }, { label: 'Vision & Mission' }]}
          onNavigate={onNavigate}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Article 3 of the AYLA Constitution
            </span>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Vision, Mission & Core Values
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              The overarching philosophical doctrine, ethical imperatives, and continental blueprint guiding Africa's Young Leaders Association.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Vision */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="font-['Outfit'] font-black text-2xl text-slate-900">
                Our Continental Vision
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {AYLA_INFO.vision}
              </p>
              <div className="pt-4 border-t border-slate-100 text-xs text-amber-700 font-bold uppercase tracking-wider">
                Article 3, Clause 3.1
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="font-['Outfit'] font-black text-2xl text-slate-900">
                Our Continental Mission
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {AYLA_INFO.mission}
              </p>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-700 font-bold uppercase tracking-wider">
                Article 3, Clause 3.2
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm">
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900 mb-6">
              Our Five Guiding Core Values (Article 3.3)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AYLA_INFO.values.map((val, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-base text-slate-900">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // General /about page
  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'About AYLA' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Overview
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            About Africa's Young Leaders Association
          </h1>
          <p className="text-amber-400 font-['Outfit'] font-bold text-base sm:text-lg mt-2">
            "{AYLA_INFO.motto}"
          </p>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            {AYLA_INFO.tagline}
          </p>
        </div>

        {/* Narrative & Mandate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900 mb-3">
                Our Genesis & Historical Covenant
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Africa's Young Leaders Association (AYLA) was established through the solemn ratification of its Constitution by conveners and youth leaders spanning all five geographical sub-regions of the African Union and the global African diaspora.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mt-3">
                Grounded in the unyielding belief that Africa's demographic majority must no longer remain passive observers in the stewardship of their nations, AYLA serves as an institutional vehicle for cultivating ethical statesmen, democratic defenders, civic innovators, and cross-border industrialists.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-['Outfit'] font-bold text-base text-slate-900 mb-2">
                The Constitutional Principle of Pan-Africanism
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike fragmented local clubs, AYLA is anchored in constitutional pan-Africanism. Pursuant to Article 9, the Association coordinates decentralized chapters across East Africa, West Africa, North Africa, Central Africa, Southern Africa, and the 6th Region Diaspora, ensuring unified continental policy advocacy.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/constitution')}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Read the Constitution
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/leadership')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Executive Council
              </button>
            </div>
          </div>

          {/* Quick Institutional Facts Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <h3 className="font-['Outfit'] font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                Institutional Facts
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block">Official Name</span>
                  <span className="font-bold text-slate-800">{AYLA_INFO.name} ({AYLA_INFO.acronym})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block">Official Motto</span>
                  <span className="font-semibold text-amber-800 italic">"{AYLA_INFO.motto}"</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block">Headquarters & Liaison</span>
                  <span className="text-slate-700">{AYLA_INFO.headquarters}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block">Governance Type</span>
                  <span className="text-slate-700">Constitutional Pan-African Youth Association</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm space-y-3">
              <h3 className="font-['Outfit'] font-bold text-base text-white">
                Join the Association
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with chapter leaders in your region and access fellowship opportunities across the continent.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/membership/register')}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
