import React, { useState } from 'react';
import { AylaLogo } from './AylaLogo';
import { X, ShieldCheck, QrCode, User, Mail, Globe, Award, Sparkles, CheckCircle } from 'lucide-react';

interface MemberPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRegister: () => void;
}

export const MemberPortalModal: React.FC<MemberPortalModalProps> = ({
  isOpen,
  onClose,
  onNavigateToRegister,
}) => {
  const [tab, setTab] = useState<'preview' | 'login'>('preview');
  const [memberName, setMemberName] = useState('Kofi Amara Mensah');
  const [memberCategory, setMemberCategory] = useState('Ordinary Member (Executive Cadre)');
  const [chapter, setChapter] = useState('West Africa Chapter (Accra Hub)');
  const [membershipId, setMembershipId] = useState('AYLA-2026-WA-0842');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Outfit'] font-bold text-base text-white">
                AYLA Digital Member Portal
              </h3>
              <p className="text-[11px] text-amber-400 font-medium">
                Verified Continental Credential System
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              tab === 'preview'
                ? 'border-b-2 border-amber-600 text-amber-900 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Digital Membership Card & ID
          </button>
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              tab === 'login'
                ? 'border-b-2 border-amber-600 text-amber-900 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Member Sign-in & Authentication
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {tab === 'preview' ? (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>System Architecture Note:</strong> Active and ratified AYLA members receive an encrypted digital credential and verifiable physical identification badge for statutory continental access.
                </p>
              </div>

              {/* The Institutional ID Card Representation */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 shadow-xl border-2 border-amber-500/40 overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 pointer-events-none">
                  <img src="/ayla-logo.svg" alt="Watermark" className="w-full h-full object-contain" />
                </div>

                {/* Card Top */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-4">
                  <AylaLogo variant="white" size="sm" showMotto={false} />
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <CheckCircle className="w-3 h-3" /> VERIFIED CREDENTIAL
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{membershipId}</p>
                  </div>
                </div>

                {/* Card Center */}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 rounded-lg bg-slate-800 border border-amber-500/30 flex flex-col items-center justify-center text-slate-400 flex-shrink-0">
                    <User className="w-10 h-10 text-amber-400/70 mb-1" />
                    <span className="text-[9px] uppercase font-bold text-slate-300">Photo ID</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-['Outfit'] font-black text-lg text-white leading-tight">
                      {memberName}
                    </h4>
                    <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      {memberCategory}
                    </p>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      {chapter}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Valid: <span className="text-slate-200 font-mono">2026 – 2028</span> • Status: <span className="text-emerald-400 font-semibold">Good Standing</span>
                    </p>
                  </div>
                </div>

                {/* Card Bottom / QR Code */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-amber-400 bg-white/10 p-1 rounded border border-amber-400/20" />
                    <div>
                      <p className="text-slate-300">SECURE DIGITAL HASH</p>
                      <p className="text-[9px] text-slate-500">ayla.org/verify/{membershipId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-300 font-sans font-bold uppercase tracking-wider text-[9px]">
                      CONSTITUTIONAL SEAL
                    </p>
                    <p className="text-[8px] text-slate-500">EXECUTIVE COUNCIL CERTIFIED</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToRegister();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer text-center"
                >
                  Apply For Membership
                </button>
                <button
                  type="button"
                  onClick={() => alert('Credential verification simulation: ID AYLA-2026-WA-0842 is valid and recognized by the Continental Secretariat.')}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer text-center"
                >
                  Simulate QR Verification
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
                Sign in using your designated AYLA Membership Identification Number or registered email address.
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Membership ID or Registered Email
                  </label>
                  <input
                    type="text"
                    defaultValue="AYLA-2026-WA-0842"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
                    placeholder="e.g. AYLA-2026-EA-0192 or member@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secretariat Access Token / Password
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-amber-600" />
                  Remember credentials
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Reset token dispatched to registered email.'); }} className="text-amber-700 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert('Member authentication confirmed. Welcome, Kofi Amara Mensah!');
                  setTab('preview');
                }}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Access Member Portal
              </button>

              <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-200">
                Not yet registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToRegister();
                  }}
                  className="text-amber-700 font-bold hover:underline cursor-pointer"
                >
                  Submit Membership Application
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
          <span>AYLA Directorate of Membership & Chapter Affairs</span>
          <span className="font-mono">Security Level: High</span>
        </div>
      </div>
    </div>
  );
};
