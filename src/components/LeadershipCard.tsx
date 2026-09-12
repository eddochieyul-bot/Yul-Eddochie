import React, { useState } from 'react';
import { LeadershipOfficer } from '../types';
import { User, Shield, ChevronRight, X, BookOpen, CheckCircle } from 'lucide-react';

interface LeadershipCardProps {
  officer: LeadershipOfficer;
}

export const LeadershipCard: React.FC<LeadershipCardProps> = ({ officer }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
        {/* Top Portrait Placeholder Area */}
        <div className="relative bg-gradient-to-b from-slate-100 to-slate-200/80 p-6 flex flex-col items-center justify-center border-b border-slate-100">
          {/* Subtle badge for office */}
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-900/10 text-slate-700">
            {officer.department || 'Executive Council'}
          </span>

          {/* Institutional Portrait Avatar Placeholder or Uploaded Image */}
          {(officer as any).portraitImage ? (
            <img
              src={(officer as any).portraitImage}
              alt={officer.holderName || officer.title}
              className="w-24 h-24 rounded-full object-cover border-4 border-amber-500/40 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300">
              <User className="w-12 h-12 text-amber-400/80" />
            </div>
          )}

          <div className="mt-3 text-center">
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
              {officer.portraitPlaceholder}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 block mb-1">
              {officer.office}
            </span>

            <h4 className="font-['Outfit'] font-bold text-lg text-slate-900 leading-snug mb-1">
              {officer.title}
            </h4>

            {/* Official Name / Profile Coming Soon */}
            <div className="mb-3">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                {officer.holderName}
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
              {officer.shortBio}
            </p>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-amber-600 hover:bg-amber-50/50 text-slate-800 hover:text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            <span>View Constitutional Mandate</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
          </button>
        </div>
      </div>

      {/* Constitutional Mandate Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-sm text-white">
                    {officer.office}
                  </h3>
                  <p className="text-[11px] text-amber-400">
                    Article 7 Statutory Mandate • AYLA Constitution
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Title & Office
                </span>
                <p className="font-['Outfit'] font-bold text-base text-slate-900 mt-0.5">
                  {officer.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-500">Current Officer:</span>
                  <span className="text-xs font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {officer.holderName}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" /> Institutional Overview
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {officer.shortBio}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Constitutional Duties & Powers
                </h5>
                <ul className="space-y-2">
                  {officer.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-800 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
