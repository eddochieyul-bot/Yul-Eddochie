import React, { useState, useRef } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  X,
  Check,
} from 'lucide-react';
import { addNewsletterSubscriber } from '../firebase/cmsService';

interface NewsletterSubscriptionProps {
  source?: string;
  className?: string;
  variant?: 'footer' | 'card' | 'inline';
}

/**
 * Validates email addresses strictly on the client-side
 * before submitting to Firestore.
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const trimmed = email.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Please enter your email address.' };
  }

  if (trimmed.length > 254) {
    return {
      isValid: false,
      error: 'Email address exceeds maximum permitted length (254 characters).',
    };
  }

  if (/\s/.test(trimmed)) {
    return { isValid: false, error: 'Email address cannot contain spaces.' };
  }

  if (!trimmed.includes('@')) {
    return {
      isValid: false,
      error: "Missing '@' in email address (e.g., leader@domain.org).",
    };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: "Email address must contain exactly one '@' symbol.",
    };
  }

  const [localPart, domainPart] = parts;

  if (!localPart || localPart.length === 0) {
    return {
      isValid: false,
      error: "Please enter the username before '@' (e.g., name@domain.org).",
    };
  }

  if (!domainPart || domainPart.length === 0) {
    return {
      isValid: false,
      error: "Please enter the domain after '@' (e.g., ayla.africa or domain.org).",
    };
  }

  if (!domainPart.includes('.')) {
    return {
      isValid: false,
      error: "Domain must include an extension (e.g., .org, .edu, .africa, .com).",
    };
  }

  if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return {
      isValid: false,
      error: 'Domain name cannot start or end with a period.',
    };
  }

  if (trimmed.includes('..')) {
    return {
      isValid: false,
      error: "Email address cannot contain consecutive dots ('..').",
    };
  }

  const domainSegments = domainPart.split('.');
  const tld = domainSegments[domainSegments.length - 1];
  if (tld.length < 2) {
    return {
      isValid: false,
      error: 'Domain extension must be at least 2 characters long (e.g., .org, .com).',
    };
  }

  // RFC 5322 compliant regex check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please provide a valid email format (e.g., leader@ayla.africa).',
    };
  }

  return { isValid: true };
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  source = 'Website Public Footer',
  className = '',
  variant = 'footer',
}) => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Perform client-side validation
  const checkValidation = (value: string, markTouched = false): boolean => {
    if (markTouched) {
      setTouched(true);
    }
    const result = validateEmail(value);
    if (!result.isValid) {
      setValidationError(result.error || 'Invalid email address.');
      return false;
    } else {
      setValidationError(null);
      return true;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);

    // If server error was showing, clear it on new typing
    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }

    // If field has already been touched, validate on keystroke for immediate feedback
    if (touched) {
      checkValidation(val, false);
    }
  };

  const handleBlur = () => {
    // Validate upon field blur if text has been entered
    if (email.trim().length > 0) {
      checkValidation(email, true);
    }
  };

  const handleClear = () => {
    setEmail('');
    setValidationError(null);
    setTouched(false);
    setStatus({ type: 'idle', message: '' });
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger full client-side validation on submit
    const isValid = checkValidation(email, true);

    if (!isValid) {
      inputRef.current?.focus();
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const res = await addNewsletterSubscriber(cleanEmail, source);
      if (res.success) {
        setStatus({
          type: 'success',
          message:
            res.message ||
            'Thank you for subscribing! Your email has been added to the AYLA Secretariat dispatch list.',
        });
        setEmail('');
        setTouched(false);
        setValidationError(null);
      } else {
        setStatus({
          type: 'error',
          message: res.message || 'Subscription could not be completed. Please try again.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message:
          err.message ||
          'A network error occurred while connecting to the AYLA dispatch service. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const isInvalid = touched && !!validationError;
  const isValidAndFilled = touched && !validationError && email.trim().length > 0;

  return (
    <div id="footer-newsletter-subscription" className={`w-full ${className}`}>
      {status.type === 'success' ? (
        <div
          id="footer-newsletter-success"
          className="bg-emerald-950/70 border border-emerald-500/50 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-lg backdrop-blur-sm transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-['Outfit'] font-bold text-white text-sm">
              Subscription Confirmed
            </h4>
            <p className="text-xs text-emerald-300/90 mt-1 leading-relaxed">
              {status.message}
            </p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-400/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Directly synchronized with the AYLA Secretariat Dispatch Registry</span>
            </div>
            <button
              type="button"
              id="footer-newsletter-another-btn"
              onClick={() => {
                setStatus({ type: 'idle', message: '' });
                setTouched(false);
                setValidationError(null);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="mt-3 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Subscribe another email address
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              {/* Left icon: Mail */}
              <div
                className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                  isInvalid
                    ? 'text-rose-400'
                    : isValidAndFilled
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>

              {/* Email Input */}
              <input
                ref={inputRef}
                id="footer-newsletter-email-input"
                name="email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={isInvalid}
                aria-describedby={
                  isInvalid
                    ? 'footer-newsletter-validation-error'
                    : status.type === 'error'
                    ? 'footer-newsletter-server-error'
                    : undefined
                }
                placeholder="Enter your official or university email..."
                className={`w-full pl-10 pr-16 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-xs transition-all disabled:opacity-50 ${
                  isInvalid
                    ? 'border-2 border-rose-500/90 focus:outline-none focus:ring-2 focus:ring-rose-500/40 bg-rose-950/20'
                    : isValidAndFilled
                    ? 'border-2 border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-emerald-950/10'
                    : 'border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                }`}
              />

              {/* Status Indicator & Clear Button inside input */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                {email && !loading && (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear input"
                    aria-label="Clear email input"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {isValidAndFilled && (
                  <span
                    title="Valid email format"
                    className="text-emerald-400 flex items-center justify-center animate-in fade-in zoom-in-75 duration-200"
                  >
                    <Check className="w-4 h-4" />
                  </span>
                )}
                {isInvalid && (
                  <span
                    title="Invalid email format"
                    className="text-rose-400 flex items-center justify-center animate-in fade-in zoom-in-75 duration-200"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="footer-newsletter-submit-btn"
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Client-Side Validation Error Message */}
          {isInvalid && (
            <div
              id="footer-newsletter-validation-error"
              role="alert"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs shadow-sm animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span className="font-medium">{validationError}</span>
            </div>
          )}

          {/* Server / Network Error Message */}
          {status.type === 'error' && !isInvalid && (
            <div
              id="footer-newsletter-server-error"
              role="alert"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-950/70 border border-amber-500/50 text-amber-300 text-xs shadow-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Trust badges and information */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Confidential & secure • Zero spam guarantee</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Continental Dispatches, Policy Briefs & Assembly Calls</span>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
