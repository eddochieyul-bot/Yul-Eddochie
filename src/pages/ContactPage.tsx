import React, { useState } from 'react';
import { PageRoute } from '../types';
import { AYLA_INFO } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { SocialLinks } from '../components/SocialLinks';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Globe, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    department: 'Secretariat General Inquiries',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Contact Secretariat' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Institutional Secretariat
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Contact AYLA Secretariat
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Reach out to the Continental Secretariat, regional liaison desks, membership accreditation directors, or media relations officers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Details & Regional Desks Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                Official Liaison Desks
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">
                      Secretariat & Liaison Hubs:
                    </strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      • East Africa Hub: Nairobi, Kenya<br />
                      • West Africa Hub: Accra, Ghana<br />
                      • AU Diplomatic Desk: Addis Ababa, Ethiopia<br />
                      • Southern Africa Hub: Johannesburg, South Africa
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">
                      Institutional Email:
                    </strong>
                    <a
                      href={`mailto:${AYLA_INFO.email}`}
                      className="font-mono text-slate-800 hover:text-amber-700 underline font-semibold block mt-0.5"
                    >
                      {AYLA_INFO.email}
                    </a>
                    <span className="text-[11px] text-slate-400">
                      General inquiries, press & delegate queries. Clickable to email directly.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">
                      Official Liaison Telephones:
                    </strong>
                    <a
                      href={`tel:${AYLA_INFO.phoneTel}`}
                      className="font-mono text-slate-800 hover:text-amber-700 underline font-semibold block mt-0.5"
                    >
                      {AYLA_INFO.phone}
                    </a>
                    <span className="text-[11px] text-slate-400">
                      Secretariat contact line (mobile tap-to-call supported).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">
                      Official Web Portal:
                    </strong>
                    <a
                      href={AYLA_INFO.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-slate-800 hover:text-amber-700 underline font-semibold block mt-0.5"
                    >
                      {AYLA_INFO.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">
                      Secretariat Working Hours:
                    </strong>
                    <span className="text-slate-600 block mt-0.5">
                      Monday – Friday: 08:30 – 17:30 (EAT / GMT / SAST)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">
                      Official Social Channels:
                    </strong>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      @ayla.africa
                    </span>
                  </div>
                  <SocialLinks variant="contact" />
                  <p className="text-[11px] text-slate-500 leading-relaxed pt-0.5">
                    Follow <strong>@ayla.africa</strong> on Instagram & TikTok, <strong>@AYLA_Africa</strong> on X, and <strong>AYLA Africa</strong> on LinkedIn & Facebook for continental communiqués, live assembly broadcasts, and youth leadership opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-3">
              <h4 className="font-['Outfit'] font-bold text-lg text-white">
                Member Status Inquiries
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Already applied or seeking to verify an institutional digital credential? Contact the Directorate of Membership directly or access the digital portal.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/membership/register')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Membership Register
              </button>
            </div>
          </div>

          {/* Contact Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-2xl text-slate-900">
                  Message Transmitted
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your communication has been dispatched to the{' '}
                  <strong className="text-slate-800">{formData.department}</strong>. An institutional officer will respond to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-['Outfit'] font-bold text-2xl text-slate-900 mb-2">
                  Send an Official Dispatch
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Fill out the form below to communicate with the appropriate directorate.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@organization.org"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Organization / University
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. University of Nairobi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-amber-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Directorate / Department *
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-amber-600"
                      >
                        <option value="Secretariat General Inquiries">Secretariat General Inquiries</option>
                        <option value="Executive Council Bureau">Executive Council Bureau</option>
                        <option value="Membership & Chapter Accreditation Desk">Membership & Chapter Accreditation Desk</option>
                        <option value="Programmes & Continental Leadership Academy">Programmes & Continental Leadership Academy</option>
                        <option value="Strategic Partnerships & MoUs">Strategic Partnerships & MoUs</option>
                        <option value="Press, Communications & Media Desk">Press, Communications & Media Desk</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Message / Inquiry *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your inquiry, proposed institutional collaboration, or chapter question..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Transmit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
