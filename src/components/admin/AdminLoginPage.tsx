import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AylaLogo } from '../AylaLogo';
import { ShieldCheck, Lock, Mail, KeyRound, AlertCircle, ArrowLeft, Loader2, Sparkles, Eye, EyeOff } from 'lucide-react';

interface AdminLoginPageProps {
  onBackToWebsite: () => void;
}

export function AdminLoginPage({ onBackToWebsite }: AdminLoginPageProps) {
  const { loginWithEmail, loginWithGoogle, registerAuthorizedAdmin, resetPassword, error, clearError } = useAdminAuth();

  const [mode, setMode] = useState<'login' | 'setup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessNotice(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else if (mode === 'setup') {
        await registerAuthorizedAdmin(email, password, displayName);
        setSuccessNotice('Administrative credentials provisioned successfully! Signing you in...');
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessNotice(`Password reset instructions dispatched to ${email}. Please check your inbox.`);
      }
    } catch (err) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    setSuccessNotice(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-['Plus_Jakarta_Sans'] text-slate-100 selection:bg-amber-500 selection:text-white">
      {/* Pan-African background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top utility bar */}
      <div className="absolute top-6 left-6 sm:left-10 z-10">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        {/* Official Header Branding */}
        <div className="flex justify-center mb-5">
          <AylaLogo variant="light" showEmblemOnly={false} />
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AYLA Institutional CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Administrative Portal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Secure content management & continental secretariat operations
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 z-10">
        <div className="bg-slate-900/90 border border-slate-800/90 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-md">
          {/* Status notices */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/90 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {successNotice && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-800/80 text-emerald-200 text-xs flex items-start gap-2.5 leading-relaxed">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>{successNotice}</div>
            </div>
          )}

          {/* Primary Recommended: Google Institutional Sign-In */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-700 hover:border-amber-500/50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
                />
              </svg>
              <span>Sign in with Google Account</span>
            </button>
            <p className="mt-1.5 text-[11px] text-center text-slate-400">
              Instant login for authorized administrators (<code className="text-amber-300">eddochieyul@gmail.com</code> / <code className="text-amber-300">aylaafrica.org@gmail.com</code>)
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2.5 bg-slate-900 text-slate-500 font-medium">
                Or authenticate with email
              </span>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                clearError();
              }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('setup');
                clearError();
              }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                mode === 'setup'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Setup Access
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('forgot');
                clearError();
              }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                mode === 'forgot'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Recover
            </button>
          </div>

          {/* Form - Clean, No hardcoded credentials listed */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'setup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Administrative Name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Secretariat Lead"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Institutional Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@aylaafrica.org"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Authorized AYLA Secretariat & Directorate accounts only.
              </p>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Administrative Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Verification...</span>
                </>
              ) : mode === 'login' ? (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              ) : mode === 'setup' ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Provision Admin Account</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Recovery Email</span>
                </>
              )}
            </button>
          </form>

          {/* Institutional Compliance Notice */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed">
            <p>
              Access to this console is strictly governed by the AYLA Data Protection Charter and Constitution. All administrative operations, content revisions, and newsletter dispatches are audited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
