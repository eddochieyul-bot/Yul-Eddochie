import React, { useEffect, useState } from 'react';
import { PageRoute, LeadershipOfficer } from '../types';
import { LEADERSHIP_OFFICERS } from '../data/organizationData';
import { LeadershipCard } from '../components/LeadershipCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Shield, BookOpen, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { subscribeToLeadership } from '../firebase/cmsService';

interface LeadershipPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  const [officers, setOfficers] = useState<LeadershipOfficer[]>(LEADERSHIP_OFFICERS);

  useEffect(() => {
    const unsub = subscribeToLeadership((items) => {
      if (items && items.length > 0) {
        const mapped: LeadershipOfficer[] = items
          .filter((item) => item.published !== false)
          .map((item) => ({
            id: item.id,
            office: item.office || item.title || item.position,
            title: item.title || item.position,
            constitutionalRole: item.constitutionalRole || 'Executive Stewardship',
            holderName: item.fullName || (item as any).holderName || '[ Profile To Be Announced ]',
            status: item.status || 'active',
            portraitPlaceholder: 'OFFICIAL AYLA PORTRAIT',
            portraitImage: item.profilePhoto || (item as any).portraitImage || '',
            shortBio: item.biography || (item as any).shortBio || '',
            responsibilities: item.responsibilities || [],
            department: item.department || 'Executive Council',
          }));
        if (mapped.length > 0) {
          setOfficers(mapped);
        }
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[{ label: 'About AYLA', route: '/about' }, { label: 'Leadership' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Article 7 of the AYLA Constitution
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            The Executive Council
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            The apex executive, managerial, and administrative organ of Africa's Young Leaders Association. In accordance with Article 7, the Council comprises designated offices charged with the constitutional execution of Assembly resolutions and institutional stewardship.
          </p>
        </div>

        {/* The Executive Council Offices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {officers.map((officer) => (
            <LeadershipCard key={officer.id} officer={officer} />
          ))}
        </div>

        {/* Constitutional Provision Note */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Outfit'] font-bold text-lg text-slate-900">
                Constitutional Accountability & Tenure
              </h3>
              <p className="text-xs text-slate-500">
                Statutory Provisions of Article 7 & Article 11
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Executive Council officers are democratically elected by accredited voting delegates of the All-African Youth Continental Assembly for a constitutionally defined tenure of two (2) years, with re-election governed strictly under Article 11 electoral regulations. All officers must observe the Code of Conduct and remain subject to the oversight of the Advisory Board and the All-African Youth Continental Assembly.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/governance')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Explore Full Governance Structure
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/constitution')}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Read Article 7 in Constitution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
