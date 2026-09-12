import React from 'react';
import { PageRoute } from '../types';
import { AYLA_INFO } from '../data/organizationData';
import { AylaLogo } from './AylaLogo';
import { SocialLinks } from './SocialLinks';
import { NewsletterSubscription } from './NewsletterSubscription';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Shield,
  Globe,
  ArrowRight,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Newsletter & Vision Top Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 mb-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Continental Dispatch
            </span>
            <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-white">
              Stay Informed on Pan-African Youth Leadership
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              Subscribe for official assembly communiqués, leadership academy applications, and regional chapter reports.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            <NewsletterSubscription source="Website Public Footer" />
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Organization Identity & Motto */}
          <div className="lg:col-span-2 space-y-4">
            <AylaLogo variant="white" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              Africa's Young Leaders Association (AYLA) is a non-partisan, pan-African institutional body dedicated to unifying, equipping, and mobilizing young African minds for democratic governance, economic emancipation, and continental transformation.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-2">
                Official Motto
              </span>
              <p className="font-['Outfit'] font-bold text-white text-sm italic">
                "{AYLA_INFO.motto}"
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Official Social Channels (@ayla.africa)
              </span>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'About AYLA', route: '/about' as PageRoute },
                { label: 'Vision & Mission', route: '/vision-mission' as PageRoute },
                { label: 'Core Objectives', route: '/objectives' as PageRoute },
                { label: 'Our Programmes', route: '/programmes' as PageRoute },
                { label: 'Membership Categories', route: '/membership/categories' as PageRoute },
                { label: 'Governance & Council', route: '/governance' as PageRoute },
                { label: 'Strategic Partnerships', route: '/partnerships' as PageRoute },
                { label: 'News & Press Releases', route: '/news' as PageRoute },
                { label: 'Contact Secretariat', route: '/contact' as PageRoute },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.route)}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500/70" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional Resources & Governance */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Resources & Law
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'AYLA Constitution (Full)', route: '/constitution' as PageRoute },
                { label: 'Annual Progress Reports', route: '/resources' as PageRoute },
                { label: 'Policy Whitepapers', route: '/resources' as PageRoute },
                { label: 'Chapter Handbooks', route: '/resources' as PageRoute },
                { label: 'Continental Summits', route: '/events' as PageRoute },
                { label: 'Media Gallery', route: '/gallery' as PageRoute },
                { label: 'Document Downloads', route: '/resources' as PageRoute },
              ].map((res) => (
                <li key={res.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(res.route)}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500/70" />
                    <span>{res.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Secretariat Contacts */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Secretariat Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Head Office & Liaison Hubs:</strong>
                  <span>Nairobi, Kenya • Accra, Ghana • Addis Ababa, Ethiopia • Johannesburg, South Africa</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Official Inquiries:</strong>
                  <a
                    href={`mailto:${AYLA_INFO.email}`}
                    className="font-mono text-slate-300 hover:text-amber-400 underline"
                  >
                    {AYLA_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Liaison Telephones:</strong>
                  <a
                    href={`tel:${AYLA_INFO.phoneTel}`}
                    className="font-mono text-slate-300 hover:text-amber-400 underline"
                  >
                    {AYLA_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Official Website:</strong>
                  <a
                    href={AYLA_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-slate-300 hover:text-amber-400 underline"
                  >
                    {AYLA_INFO.website}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/membership/register')}
                  className="w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors cursor-pointer text-center block shadow-md uppercase tracking-wider"
                >
                  Register as an AYLA Member
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accreditation */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span>© 2026 Africa's Young Leaders Association (AYLA). All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => onNavigate('/constitution')}
              className="hover:text-slate-300 cursor-pointer"
            >
              Constitutional Code
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('/governance')}
              className="hover:text-slate-300 cursor-pointer"
            >
              Governance Organs
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="hover:text-slate-300 cursor-pointer"
            >
              Contact & Desks
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className="hover:text-amber-400 cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-amber-500" />
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <span className="text-amber-500/80 font-mono">Ver. 2026.1 Institutional Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
