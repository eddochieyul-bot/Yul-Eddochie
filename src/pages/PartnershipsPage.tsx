import React, { useState } from 'react';
import { PageRoute } from '../types';
import { STRATEGIC_PARTNERS, AYLA_INFO } from '../data/organizationData';
import { Breadcrumb } from '../components/Breadcrumb';
import { SocialLinks } from '../components/SocialLinks';
import { Building2, Handshake, CheckCircle2, Send, Globe, Award, Shield, Mail, Phone } from 'lucide-react';

interface PartnershipsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PartnershipsPage: React.FC<PartnershipsPageProps> = ({ onNavigate }) => {
  const [partnerForm, setPartnerForm] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Multilateral Institution / Intergovernmental Body',
    scopeProposal: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerForm.institutionName && partnerForm.email) {
      setSubmitted(true);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={[{ label: 'Partnerships & Alliances' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Article 4.9 Constitutional Mandate
          </span>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Strategic Partnerships & Alliances
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            AYLA actively collaborates with premier universities, continental intergovernmental institutions, youth ministries, development agencies, and technological leaders to scale youth-led transformation across Africa.
          </p>
        </div>

        {/* Categories of Institutional Alliances */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900">
              Institutional Engagement Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              All formal agreements are ratified under Memoranda of Understanding executed by the Executive Council.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STRATEGIC_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-500 mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {partner.statusNote}
                    </span>
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-2">
                    {partner.category}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <span>Cooperation Protocol: Formal Bilateral MoU</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Proposal Submission Form */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-8 sm:p-12 max-w-3xl mx-auto shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-['Outfit'] font-bold text-2xl text-slate-900">
                Partnership Expression Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, {partnerForm.contactPerson}. Your institutional proposal on behalf of{' '}
                <strong>{partnerForm.institutionName}</strong> has been transmitted to the AYLA Strategic Partnerships & Multilateral Desk.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider"
              >
                Submit Additional Inquiry
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
                  Institutional Dialogue
                </span>
                <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-slate-900">
                  Partner With AYLA
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Initiate a dialogue with the Continental Secretariat to explore joint programmes, academic fellowships, or co-sponsored assemblies.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Organization / University / Entity Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.institutionName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, institutionName: e.target.value })}
                      placeholder="e.g. Continental Research Institute"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Representative / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.contactPerson}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. Amina Diop"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Institutional Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      placeholder="partnerships@institution.org"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Partnership Classification *
                    </label>
                    <select
                      value={partnerForm.category}
                      onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-amber-600"
                    >
                      <option value="Academic & University Institution">Academic & University Institution</option>
                      <option value="Multilateral & Intergovernmental Body">Multilateral & Intergovernmental Body</option>
                      <option value="Development Agency & Philanthropy">Development Agency & Philanthropy</option>
                      <option value="Private Sector / Venture Accelerator">Private Sector / Venture Accelerator</option>
                      <option value="Civil Society & Youth Coalition">Civil Society & Youth Coalition</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Scope of Proposed Collaboration *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={partnerForm.scopeProposal}
                      onChange={(e) => setPartnerForm({ ...partnerForm, scopeProposal: e.target.value })}
                      placeholder="Describe the proposed synergy, geographical focus, target youth demographic, or resource commitment..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-amber-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Partnership Proposal</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Direct Bilateral Inquiries Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Direct Bilateral Desk: </span>
              <a href={`mailto:${AYLA_INFO.email}`} className="font-mono text-slate-900 font-bold hover:text-amber-600 underline">
                {AYLA_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Liaison Phone: </span>
              <a href={`tel:${AYLA_INFO.phoneTel}`} className="font-mono text-slate-900 font-bold hover:text-amber-600 underline">
                {AYLA_INFO.phone}
              </a>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-medium">
              Institutional social presence (<strong>@ayla.africa</strong>):
            </span>
            <SocialLinks variant="pills" />
          </div>
        </div>
      </div>
    </div>
  );
};
