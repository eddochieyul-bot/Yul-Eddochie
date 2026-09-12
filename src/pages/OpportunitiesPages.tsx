import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Filter,
  Calendar,
  MapPin,
  ExternalLink,
  Tag,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Share2,
  CheckCircle,
  Clock,
  Sparkles,
  Building,
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CmsOpportunity, OpportunityCategory } from '../firebase/types';
import { subscribeToOpportunities } from '../firebase/cmsService';
import { INITIAL_OPPORTUNITIES } from '../data/organizationData';

const ALL_CATEGORIES: ('All' | OpportunityCategory)[] = [
  'All',
  'Scholarships',
  'Fellowships',
  'Internships',
  'Jobs & Careers',
  'Grants',
  'Competitions',
  'Conferences',
  'Training Opportunities',
  'Leadership Opportunities',
  'Volunteer Opportunities',
  'Exchange Programmes',
  'Other Youth Opportunities',
];

interface OpportunitiesPageProps {
  onNavigate: (path: string) => void;
  selectedOpportunityId?: string | null;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  onNavigate,
  selectedOpportunityId,
}) => {
  const [opportunities, setOpportunities] = useState<CmsOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | OpportunityCategory>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToOpportunities((data) => {
      if (data && data.length > 0) {
        setOpportunities(data);
      }
    }, true);
    return () => unsub();
  }, []);

  const singleOpportunity = selectedOpportunityId
    ? opportunities.find((o) => o.id === selectedOpportunityId) ||
      INITIAL_OPPORTUNITIES.find((o) => o.id === selectedOpportunityId)
    : null;

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesRegion =
      selectedRegion === 'All' ||
      item.region.toLowerCase().includes(selectedRegion.toLowerCase()) ||
      item.country.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesRegion && matchesSearch;
  });

  const featuredOpportunities = opportunities.filter((o) => o.featured);

  const handleShare = (opp: CmsOpportunity) => {
    if (navigator.share) {
      navigator
        .share({
          title: opp.title,
          text: `${opp.title} by ${opp.organization} via AYLA Opportunities Hub`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedId(opp.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // -------------------------------------------------------------
  // SINGLE OPPORTUNITY VIEW
  // -------------------------------------------------------------
  if (singleOpportunity) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-emerald-900 text-white py-12 border-b border-emerald-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Breadcrumb
              items={[
                { label: 'Home', path: '/' },
                { label: 'Opportunities', path: '/opportunities' },
                { label: singleOpportunity.title },
              ]}
              onNavigate={onNavigate}
            />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-400/30">
                {singleOpportunity.category}
              </span>
              <span className="px-3 py-1 bg-emerald-800/80 text-emerald-200 rounded-full text-xs font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                {singleOpportunity.country} • {singleOpportunity.region}
              </span>
              {singleOpportunity.featured && (
                <span className="px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {singleOpportunity.title}
            </h1>
            <p className="mt-2 text-lg text-emerald-100 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Host Organization: <strong>{singleOpportunity.organization}</strong></span>
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {singleOpportunity.featuredImage && (
                <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                  <img
                    src={singleOpportunity.featuredImage}
                    alt={singleOpportunity.title}
                    className="w-full h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
                    Overview & Description
                  </h2>
                  <div className="mt-4 text-slate-700 leading-relaxed whitespace-pre-line text-base">
                    {singleOpportunity.description}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    Eligibility Criteria
                  </h3>
                  <p className="mt-3 text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {singleOpportunity.eligibility}
                  </p>
                </div>

                {singleOpportunity.tags && singleOpportunity.tags.length > 0 && (
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                      Focus Areas & Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {singleOpportunity.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3 text-slate-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
                  Application Summary
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider">
                      Application Deadline
                    </span>
                    <span className="font-semibold text-rose-700 flex items-center gap-1.5 mt-1">
                      <Clock className="w-4 h-4 text-rose-600" />
                      {singleOpportunity.applicationDeadline}
                    </span>
                  </div>

                  {singleOpportunity.applicationOpeningDate && (
                    <div>
                      <span className="text-slate-500 block text-xs uppercase tracking-wider">
                        Opening Date
                      </span>
                      <span className="font-medium text-slate-800 flex items-center gap-1.5 mt-1">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {singleOpportunity.applicationOpeningDate}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider">
                      Target Region
                    </span>
                    <span className="font-medium text-slate-800 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {singleOpportunity.country} ({singleOpportunity.region})
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider">
                      Published On
                    </span>
                    <span className="font-medium text-slate-800 flex items-center gap-1.5 mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      {singleOpportunity.publishedDate}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <a
                    href={singleOpportunity.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-sm"
                  >
                    <span>Apply via Official Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleShare(singleOpportunity)}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedId === singleOpportunity.id ? 'Link Copied!' : 'Share Opportunity'}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('/opportunities')}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-medium transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Opportunities Hub</span>
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <p className="font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  AYLA Verification Notice
                </p>
                All listings published in the Opportunities Hub are reviewed by AYLA researchers for youth authenticity. AYLA never charges application fees for verified continental youth opportunities.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LISTING VIEW
  // -------------------------------------------------------------
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 sm:py-20 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Opportunities Hub' },
            ]}
            onNavigate={onNavigate}
          />
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" /> Continental Resource Hub
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              AYLA Opportunities Hub
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-100 leading-relaxed">
              Curated, verified scholarships, continental fellowships, grants, internships, and leadership programmes empowering young Africans to accelerate their educational and career journeys.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Controls */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search opportunities, organizations, tags, or keywords..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              />
            </div>

            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              >
                <option value="All">All African Regions & Diaspora</option>
                <option value="Continental">Pan-African / All AU States</option>
                <option value="West">West Africa</option>
                <option value="East">East Africa</option>
                <option value="Southern">Southern Africa</option>
                <option value="Central">Central Africa</option>
                <option value="North">North Africa</option>
                <option value="Diaspora">Global Diaspora</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Spotlight (if category == All & no search) */}
        {selectedCategory === 'All' && !searchTerm && featuredOpportunities.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Featured Continental Opportunities
              </h2>
              <span className="text-xs font-medium text-slate-500">
                Verified high-impact calls
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredOpportunities.slice(0, 2).map((opp) => (
                <div
                  key={opp.id}
                  className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-xl p-6 shadow-md border border-emerald-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full">
                        {opp.category}
                      </span>
                      <span className="text-xs text-emerald-300 font-medium">
                        Deadline: {opp.applicationDeadline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-white hover:text-amber-300 transition cursor-pointer"
                        onClick={() => onNavigate(`/opportunities/${opp.id}`)}>
                      {opp.title}
                    </h3>
                    <p className="text-xs text-emerald-200 font-medium mt-1">
                      {opp.organization} • {opp.country}
                    </p>
                    <p className="mt-3 text-sm text-slate-200 line-clamp-3 leading-relaxed">
                      {opp.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-800/80 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(`/opportunities/${opp.id}`)}
                      className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition"
                    >
                      <span>View Details & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={opp.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition inline-flex items-center gap-1"
                    >
                      <span>Official Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-slate-600">
            Showing <strong>{filteredOpportunities.length}</strong> opportunity
            {filteredOpportunities.length === 1 ? '' : 'ies'}
          </p>
          {(searchTerm || selectedCategory !== 'All' || selectedRegion !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedRegion('All');
              }}
              className="text-xs text-emerald-700 hover:underline font-semibold"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 font-serif">
              No opportunities found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try adjusting your search terms or category filter to discover available calls.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedRegion('All');
              }}
              className="mt-5 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {opp.featuredImage && (
                  <div className="h-44 overflow-hidden bg-slate-100 relative">
                    <img
                      src={opp.featuredImage}
                      alt={opp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-1">
                      <span className="px-2.5 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white rounded-full text-[11px] font-semibold">
                        {opp.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {!opp.featuredImage && (
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-semibold">
                          {opp.category}
                        </span>
                        {opp.featured && (
                          <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>
                    )}

                    <h3
                      onClick={() => onNavigate(`/opportunities/${opp.id}`)}
                      className="text-base font-bold text-slate-900 font-serif leading-snug hover:text-emerald-700 transition cursor-pointer"
                    >
                      {opp.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 font-medium">
                      {opp.organization}
                    </p>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {opp.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{opp.country}</span>
                      </span>
                      <span className="font-semibold text-rose-700 flex items-center gap-1 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        {opp.applicationDeadline}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onNavigate(`/opportunities/${opp.id}`)}
                        className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition text-center"
                      >
                        View Details
                      </button>
                      <a
                        href={opp.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition"
                        title="Official Application Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
