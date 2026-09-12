import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Shield,
  Users,
  Building2,
  Scale,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface GovernancePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const GovernancePage: React.FC<GovernancePageProps> = ({ onNavigate }) => {
  const governanceTiers = [
    {
      level: 'Tier 1 • Supreme Authority',
      name: 'All-African Youth Continental Assembly',
      mandate: 'Article 6',
      description:
        'The sovereign general assembly comprising registered ordinary, founding, and accredited delegates across all 54 African nations. Convenes biennially to ratify constitutional amendments, elect Executive Council officers, and determine continental policy directives.',
      powers: [
        'Election and ratification of the Executive Council',
        'Consideration and approval of audited accounts and budgets',
        'Supreme authority to amend the AYLA Constitution pursuant to Article 14',
        'Declaration of continental themes and strategic decade roadmaps',
      ],
      icon: Users,
    },
    {
      level: 'Tier 2 • Custodial & Advisory',
      name: 'Board of Trustees & Advisory Council',
      mandate: 'Article 8',
      description:
        'A distinguished council of senior continental statesmen, seasoned jurists, university scholars, and civil society leaders providing intergenerational mentorship, strategic counsel, and fiduciary guardianship of AYLA assets and legal standing.',
      powers: [
        'Intergenerational counsel on high-stakes continental diplomacy',
        'Custodianship of real property, trusts, and endowed funds',
        'Mediation in matters of high dispute or constitutional impasse',
        'Annual governance and compliance audit review',
      ],
      icon: Scale,
    },
    {
      level: 'Tier 3 • Apex Executive Organ',
      name: 'The Executive Council',
      mandate: 'Article 7',
      description:
        'Composed of the President, Vice President, Secretary General, Global Ambassador, Executive Treasurer, and Director General. Acts as the collective executive cabinet executing Assembly mandates and directing continental programmatic initiatives.',
      powers: [
        'Day-to-day governance, leadership, and public representation',
        'Formulation and submission of continental budgets and work plans',
        'Accreditation and chartering of regional and national chapters',
        'Oversight of the Continental Secretariat and appointment of Directors',
      ],
      icon: Shield,
    },
    {
      level: 'Tier 4 • Operational Secretariat & Directorates',
      name: 'The Continental Secretariat',
      mandate: 'Article 7 & Article 10',
      description:
        'Headed administratively by the Director General in coordination with the Secretary General. Operates central departments, programme delivery desks, chapter liaison coordinators, and communications infrastructure.',
      powers: [
        'Execution of programmatic curricula and academy cohorts',
        'Membership register administration and credential issuance',
        'Financial management, accounting, and institutional compliance',
        'Liaison coordination across regional hubs and diaspora networks',
      ],
      icon: Building2,
    },
  ];

  const statutoryCommittees = [
    {
      name: 'Electoral & Credentials Committee',
      article: 'Article 11',
      desc: 'Independent body vetting candidate qualifications, credentialing voting delegates, and conducting electronic and physical secret balloting during Continental Assemblies.',
    },
    {
      name: 'Finance, Audit & Compliance Committee',
      article: 'Article 12',
      desc: 'Conducts quarterly internal audits, verifies banking controls, reviews funding covenants, and prepares annual statutory balance sheets for external review.',
    },
    {
      name: 'Constitutional Affairs & Legal Committee',
      article: 'Article 14',
      desc: 'Oversees legal compliance in host countries, reviews proposed constitutional amendments, interprets provisions upon referral, and maintains legal repository.',
    },
    {
      name: 'Regional Chapter Accreditation Desk',
      article: 'Article 9',
      desc: 'Supervises minimum compliance thresholds for establishing new national chapters, institutional university branches, and diaspora focal hubs.',
    },
    {
      name: 'Gender Inclusivity & Equal Opportunity Directorate',
      article: 'Article 4.6',
      desc: 'Guarantees equitable gender parity across all committee appointments, leadership delegations, and scholarship distributions.',
    },
    {
      name: 'Strategic Partnerships & Multilateral Desk',
      article: 'Article 4.9',
      desc: 'Negotiates and monitors Memoranda of Understanding with universities, the African Union Commission, ECOWAS, EAC, SADC, and global partners.',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Governance Structure' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Architecture
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            AYLA Governance Structure
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            The governance framework of Africa's Young Leaders Association is organized to ensure democratic accountability, intergenerational wisdom, operational agility, and Pan-African representation as codified in the AYLA Constitution.
          </p>
        </div>

        {/* 4 Governance Tiers */}
        <div className="space-y-6 mb-16">
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900 mb-4">
            Institutional Governance Hierarchy
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {governanceTiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 block mb-1">
                          {tier.level}
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          {tier.mandate}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                      {tier.name}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Key Constitutional Powers & Responsibilities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {tier.powers.map((power, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{power}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Committees & Directorates */}
        <div className="bg-slate-100/80 rounded-2xl border border-slate-200/80 p-8 sm:p-10 mb-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
              Operational Organs
            </span>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900">
              Statutory Committees & Specialized Directorates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Established under Executive Council authority to administer specialized functions with technical rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {statutoryCommittees.map((comm, cIdx) => (
              <div
                key={cIdx}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {comm.article}
                    </span>
                  </div>
                  <h4 className="font-['Outfit'] font-bold text-base text-slate-900">
                    {comm.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {comm.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links to related sections */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h3 className="font-['Outfit'] font-bold text-base text-slate-900">
              Want to review the exact statutory clauses?
            </h3>
            <p className="text-xs text-slate-500">
              Read Articles 6, 7, 8, 9, 11, and 12 in the official AYLA Constitution.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/leadership')}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              View Officers
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/constitution')}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Read Constitution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
