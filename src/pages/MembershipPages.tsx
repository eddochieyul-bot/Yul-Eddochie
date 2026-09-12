import React, { useState } from 'react';
import { PageRoute, MembershipFormData } from '../types';
import { MEMBERSHIP_CATEGORIES, REGIONAL_CHAPTERS, AYLA_INFO } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { SocialLinks } from '../components/SocialLinks';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Globe,
  Award,
  ArrowRight,
  Send,
  Sparkles,
  QrCode,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Info,
  Copy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface MembershipPagesProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenPortal: () => void;
}

const initialForm: MembershipFormData = {
  fullName: '',
  email: '',
  phone: '',
  countryOfResidence: '',
  nationality: '',
  dateOfBirth: '',
  gender: '',
  educationalBackground: '',
  profession: '',
  chapterOfInterest: 'East Africa Chapter (Nairobi Hub)',
  membershipCategory: 'Ordinary Member (Ages 18–35)',
  motivationStatement: '',
  agreedToConstitution: false,
};

export const MembershipPages: React.FC<MembershipPagesProps> = ({
  currentRoute,
  onNavigate,
  onOpenPortal,
}) => {
  const [formData, setFormData] = useState<MembershipFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [showScriptGuide, setShowScriptGuide] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const googleAppsScriptCode = `// Google Apps Script: AYLA Membership Application Notification
// Setup instructions:
// 1. In your official AYLA Google Form, click the three dots (More) -> "Script editor".
// 2. Paste this code into Code.gs and save.
// 3. Click "Triggers" (alarm icon on the left) -> "+ Add Trigger".
// 4. Choose "onFormSubmit" as the function, "From form" as event source, and "On form submit" as event type.

function onFormSubmit(e) {
  var recipient = "aylafrica.org@gmail.com";
  var subject = "New AYLA Membership Application";
  
  var itemResponses = e.response.getItemResponses();
  var message = "AFRICA'S YOUNG LEADERS ASSOCIATION (AYLA)\\n";
  message += "Continental Secretariat - Membership Intake Notification\\n\\n";
  message += "A new membership application has been submitted via the official Google Form.\\n\\n";
  message += "APPLICANT SUBMISSION DETAILS:\\n";
  message += "========================================\\n";
  
  for (var i = 0; i < itemResponses.length; i++) {
    var response = itemResponses[i];
    message += response.getItem().getTitle() + ": " + response.getResponse() + "\\n";
  }
  
  message += "========================================\\n";
  message += "Submission Timestamp: " + new Date().toUTCString() + "\\n\\n";
  message += "STATUTORY DIRECTIVE:\\n";
  message += "Please review this applicant's dossier in accordance with Article 5 of the AYLA Constitution.\\n";
  message += "Note: An intake acknowledgement will be sent to the applicant. Official approval is subject to Directorate ratification.\\n";
  
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: message
  });
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone Number is required';
    if (!formData.countryOfResidence.trim()) errs.countryOfResidence = 'Country of Residence is required';
    if (!formData.nationality.trim()) errs.nationality = 'Nationality is required';
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) errs.gender = 'Please specify your gender';
    if (!formData.educationalBackground.trim()) errs.educationalBackground = 'Educational background is required';
    if (!formData.profession.trim()) errs.profession = 'Occupation/Profession is required';
    if (!formData.motivationStatement.trim()) {
      errs.motivationStatement = 'Please provide a short motivation statement';
    } else if (formData.motivationStatement.trim().length < 30) {
      errs.motivationStatement = 'Motivation statement should be at least 30 characters';
    }
    if (!formData.agreedToConstitution) {
      errs.agreedToConstitution = 'You must agree to uphold the AYLA Constitution';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate simulated official AYLA Application Reference
      const randomRef = 'AYLA-' + new Date().getFullYear() + '-APP-' + Math.floor(1000 + Math.random() * 9000);
      setGeneratedId(randomRef);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If on /membership/register
  if (currentRoute === '/membership/register') {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Membership', route: '/membership' }, { label: 'Membership Registration' }]}
          onNavigate={onNavigate}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Institutional Header Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 opacity-10 pointer-events-none">
              <img src="/ayla-logo.svg" alt="" className="w-full h-full object-contain" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Official Statutory Enrollment</span>
              </div>

              <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white">
                AYLA Membership Registration
              </h1>

              <p className="text-amber-400 text-xs sm:text-sm font-semibold italic">
                "{AYLA_INFO.motto}"
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Welcome to Africa's Young Leaders Association official membership onboarding. Complete the official registration below to join our continental movement across all 54 African nations.
              </p>

              {/* Primary Prominent Register Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={AYLA_INFO.officialFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-600/30 hover:shadow-xl transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <span>REGISTER AS AN AYLA MEMBER</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${AYLA_INFO.email}?subject=Membership%20Registration%20Enquiry`}
                  className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 hover:border-amber-500/50 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Enquiries Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Official Confirmation & Processing Notice */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                  Official Applicant Acknowledgment & Notice
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed italic bg-white/80 p-3.5 rounded-xl border border-amber-200">
                  "Thank you for applying to join Africa's Young Leaders Association (AYLA). Your membership application has been received. The AYLA team will review your application and contact you using the information provided."
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Statutory Notice:</strong> Pursuant to Article 5 of the AYLA Constitution, all membership applications undergo formal review by the Directorate of Membership & Chapter Affairs and designated regional chapter desks. Submission of this form acknowledges your commitment to the Association's principles; official membership status is confirmed upon chapter ratification.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Official Google Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-900">Official AYLA Google Form</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600">Secure Institutional Enrollment</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={AYLA_INFO.officialFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
                >
                  <span>Open in Full Google Forms Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Iframe Container */}
            <div className="w-full bg-slate-50/50 p-2 sm:p-4 flex flex-col items-center">
              <iframe
                src={AYLA_INFO.officialFormEmbedUrl}
                width="100%"
                height="1150"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Official AYLA Membership Application Form"
                className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                Loading AYLA Official Membership Application Form…
              </iframe>

              <div className="pt-4 pb-2 text-center">
                <a
                  href={AYLA_INFO.officialFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>REGISTER AS AN AYLA MEMBER (FULL SCREEN)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Membership Application Flow Architecture */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Official Membership Intake & Notification Protocol</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center mx-auto">
                  1
                </div>
                <h4 className="font-bold text-xs text-slate-900">AYLA Website</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Prospective members access verified institutional information and criteria.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center mx-auto">
                  2
                </div>
                <h4 className="font-bold text-xs text-slate-900">Official Google Form</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Statutory registration submitted with regional & demographic details.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center mx-auto">
                  3
                </div>
                <h4 className="font-bold text-xs text-slate-900">Email Notification</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Instant submission alert routed directly to <span className="font-mono text-slate-700 font-bold">{AYLA_INFO.email}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center mx-auto">
                  4
                </div>
                <h4 className="font-bold text-xs text-slate-900">Directorate Review</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Applicant contacted and accredited into chapter roster under Article 5.
                </p>
              </div>
            </div>

            {/* Support & Direct Contact Strip */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600" />
                <span>Secretariat Registration Desk: </span>
                <a href={`mailto:${AYLA_INFO.email}`} className="font-mono text-slate-900 font-bold hover:text-amber-600 underline">
                  {AYLA_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Helpline: </span>
                <a href={`tel:${AYLA_INFO.phoneTel}`} className="font-mono text-slate-900 font-bold hover:text-amber-600 underline">
                  {AYLA_INFO.phone}
                </a>
              </div>
            </div>

            {/* Official Social Media Community (@ayla.africa) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium">
                Connect with the continental community on <strong>@ayla.africa</strong>:
              </span>
              <SocialLinks variant="pills" />
            </div>
          </div>

          {/* Administrative Automation Setup Documentation (Collapsible for Secretariat Officers) */}
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setShowScriptGuide(!showScriptGuide)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-850 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-white">
                    Secretariat Setup Guide: Form Notification Automation
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Google Apps Script trigger configuration for notifications to {AYLA_INFO.email}
                  </p>
                </div>
              </div>
              {showScriptGuide ? (
                <ChevronUp className="w-5 h-5 text-amber-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-amber-400" />
              )}
            </button>

            {showScriptGuide && (
              <div className="p-6 border-t border-slate-800 space-y-4 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  This secure serverless integration uses Google Forms' built-in Google Apps Script engine. No passwords, credentials, or private keys are exposed to website visitors. Whenever an applicant submits the form, a structured intake alert is dispatched to <strong className="text-white font-mono">{AYLA_INFO.email}</strong> with subject <strong className="text-amber-300">New AYLA Membership Application</strong>.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Google Apps Script (Code.gs)</span>
                    <button
                      type="button"
                      onClick={copyScriptToClipboard}
                      className="flex items-center gap-1 text-amber-400 hover:text-amber-300 cursor-pointer font-sans text-xs font-bold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedScript ? 'Copied to Clipboard!' : 'Copy Script'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950 rounded-xl text-slate-300 font-mono text-[11px] overflow-x-auto border border-slate-800 max-h-72">
                    {googleAppsScriptCode}
                  </pre>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-slate-300 text-[11px] space-y-1">
                  <strong className="text-amber-400 block font-semibold">3-Step Implementation Instructions:</strong>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                    <li>Open the official AYLA Google Form in Google Drive &rarr; click <strong>⋮ (More)</strong> &rarr; <strong>Script editor</strong>.</li>
                    <li>Paste the code above into the script editor and click the <strong>Save</strong> disk icon.</li>
                    <li>In the left sidebar, click <strong>Triggers</strong> (& alarm icon) &rarr; <strong>Add Trigger</strong> &rarr; select <strong>onFormSubmit</strong> &rarr; Event type: <strong>On form submit</strong> &rarr; Save.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentRoute === '/membership/categories') {
    return (
      <div className="space-y-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Membership', route: '/membership' }, { label: 'Categories' }]}
          onNavigate={onNavigate}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Article 5 of the AYLA Constitution
            </span>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Six Statutory Membership Categories
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              The AYLA Constitution defines six specialized membership classifications to engage youth at every stage of their civic and professional progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MEMBERSHIP_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      {cat.status}
                    </span>
                    {cat.ageBracket && (
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {cat.ageBracket}
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mb-3">
                    {cat.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.eligibility}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Key Entitlements:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {cat.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Voting: <strong className="text-slate-900">{cat.votingRights ? 'Yes (Statutory)' : 'Non-Voting'}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/membership/register')}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Select & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // General /membership overview page
  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Membership' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Pan-African Fellowship
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Why Join AYLA?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Becoming an AYLA member connects you to a dynamic, continental network of young public servants, tech founders, civil advocates, and university leaders across all 54 African countries.
          </p>
          <div className="pt-6 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/membership/register')}
              className="px-7 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              Apply for Membership
            </button>
            <button
              type="button"
              onClick={onOpenPortal}
              className="px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors cursor-pointer"
            >
              Member Portal & ID Card
            </button>
          </div>
        </div>

        {/* 4 Pillars of Member Benefit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Continental Leadership Academy',
              desc: 'Access fully funded masterclasses in ethical statecraft, public policy, and Pan-African diplomacy.',
              icon: Award,
            },
            {
              title: 'Verified Digital Credential',
              desc: 'Receive an institutional identification card recognized at youth assemblies and partner forums.',
              icon: ShieldCheck,
            },
            {
              title: 'AfCFTA Innovation Network',
              desc: 'Connect with venture mentors, investor circles, and cross-border trade opportunities.',
              icon: Globe,
            },
            {
              title: 'Democratic Voting Rights',
              desc: 'Ordinary members participate directly in biennial Continental Assembly leadership elections.',
              icon: UserCheck,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-base text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
