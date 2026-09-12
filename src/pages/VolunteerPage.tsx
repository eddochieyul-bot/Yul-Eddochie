import React, { useState } from 'react';
import {
  Heart,
  CheckCircle,
  Users,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  Send,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { submitVolunteerApplication } from '../firebase/cmsService';
import { VOLUNTEER_AREAS } from '../data/organizationData';

interface VolunteerPageProps {
  onNavigate: (path: string) => void;
}

export const VolunteerPage: React.FC<VolunteerPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    skills: '',
    areaOfInterest: VOLUNTEER_AREAS[0],
    relevantExperience: '',
    availability: '3-5 hours/week',
    whyVolunteer: '',
    portfolioUrl: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitVolunteerApplication({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        skills: formData.skills.trim(),
        areaOfInterest: formData.areaOfInterest,
        relevantExperience: formData.relevantExperience.trim(),
        availability: formData.availability,
        whyVolunteer: formData.whyVolunteer.trim(),
        portfolioUrl: formData.portfolioUrl?.trim(),
      });
      setSubmitted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error submitting volunteer application:', err);
      setError('An error occurred while submitting your application. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 sm:py-24 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Get Involved', path: '/membership' },
              { label: 'Volunteer with AYLA' },
            ]}
            onNavigate={onNavigate}
          />

          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" /> Volunteer Programme
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Volunteer with AYLA
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-100 leading-relaxed">
              Lend your passion, professional skills, and continental vision to Africa's largest youth leadership movement. Join dynamic teams driving advocacy, community impact, academy facilitation, and regional chapter mobilization.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Volunteer / Impact pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Pan-African Network
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Collaborate directly with young leaders across 55 African Union member states and the diaspora on high-level continental initiatives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Official Recognition
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Earn verified digital certificates of service issued by the AYLA Continental Secretariat, verifiable publicly on the AYLA registry.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Mentorship & Growth
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Receive priority access to AYLA Leadership Academy modules, executive mentoring, and partner scholarship opportunities.
            </p>
          </div>
        </div>

        {/* Volunteer Application Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900">
                    Application Successfully Submitted!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for stepping forward to serve Africa's youth. The AYLA Secretariat Volunteer Coordination Unit has received your application and will contact you via email regarding the next onboarding orientation.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          country: '',
                          city: '',
                          skills: '',
                          areaOfInterest: VOLUNTEER_AREAS[0],
                          relevantExperience: '',
                          availability: '3-5 hours/week',
                          whyVolunteer: '',
                          portfolioUrl: '',
                        });
                      }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
                    >
                      Submit Another Application
                    </button>
                    <button
                      onClick={() => onNavigate('/')}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-900">
                      Volunteer Application Form
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Fill out this form to express your interest in joining an AYLA continental volunteer working group.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-800 flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g., Amara Diallo"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., amara@example.org"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Country of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g., Kenya"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g., Nairobi"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Primary Area of Interest *
                      </label>
                      <select
                        value={formData.areaOfInterest}
                        onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      >
                        {VOLUNTEER_AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Weekly Time Commitment *
                      </label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                      >
                        <option value="2-4 hours/week">2 – 4 hours / week</option>
                        <option value="5-8 hours/week">5 – 8 hours / week</option>
                        <option value="10+ hours/week">10+ hours / week</option>
                        <option value="Flexible / Event-based">Flexible / Event-based</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Key Skills & Core Competencies *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="e.g., Graphic Design, Social Media, Public Policy, Research, Translation (French/English)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Relevant Experience (Past projects, leadership or volunteer roles) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.relevantExperience}
                      onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                      placeholder="Briefly describe your previous experience or community involvement..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Why do you want to volunteer with AYLA? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.whyVolunteer}
                      onChange={(e) => setFormData({ ...formData, whyVolunteer: e.target.value })}
                      placeholder="Share your motivation and what you hope to achieve through your service..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Portfolio / LinkedIn / CV Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username or Google Drive link"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition shadow-sm inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <span>Submit Volunteer Application</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-sm border border-emerald-800">
              <h3 className="text-lg font-bold font-serif text-white">
                Volunteer Working Areas
              </h3>
              <p className="mt-1 text-xs text-emerald-200">
                You can select any of the following focus domains:
              </p>
              <ul className="mt-4 space-y-2 text-xs">
                {VOLUNTEER_AREAS.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-emerald-100">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 font-serif text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                AYLA Volunteer Commitment
              </h4>
              <p>
                Volunteers are expected to uphold the Constitution of AYLA, practice Pan-African solidarity, and represent the alliance with professionalism.
              </p>
              <p>
                Applications are reviewed by regional directors within 5–7 business days. Questions? Contact the volunteer desk directly at{' '}
                <a href="mailto:aylaafrica.org@gmail.com" className="text-emerald-700 font-bold hover:underline">
                  aylaafrica.org@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
