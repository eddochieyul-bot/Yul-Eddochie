import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Users,
  Search,
  Sparkles,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CmsAcademyCourse } from '../firebase/types';
import { subscribeToAcademyCourses } from '../firebase/cmsService';
import { INITIAL_ACADEMY_COURSES } from '../data/organizationData';

interface AcademyPageProps {
  onNavigate: (path: string) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onNavigate }) => {
  const [courses, setCourses] = useState<CmsAcademyCourse[]>(INITIAL_ACADEMY_COURSES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CmsAcademyCourse | null>(null);

  useEffect(() => {
    const unsub = subscribeToAcademyCourses((data) => {
      if (data && data.length > 0) {
        setCourses(data);
      }
    }, true);
    return () => unsub();
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 sm:py-24 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'AYLA Leadership Academy' },
            ]}
            onNavigate={onNavigate}
          />

          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" /> Centre for Executive Leadership
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              AYLA Leadership Academy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-100 leading-relaxed">
              Equipping emerging African changemakers with world-class competencies in Pan-African diplomacy, climate governance, public policy, civic technology, and institutional ethics.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#courses"
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm transition shadow-sm"
              >
                Browse Academy Courses
              </a>
              <button
                onClick={() => onNavigate('/verify-certificate')}
                className="px-5 py-3 bg-emerald-800/80 hover:bg-emerald-750 text-white font-semibold rounded-lg text-sm transition border border-emerald-700 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verify Graduate Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Academy Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 font-serif text-base">
              Afrocentric Curriculum
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Rooted in the African Union Agenda 2063 and contemporary continental public management frameworks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 font-serif text-base">
              Distinguished Faculty
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Taught by former AU envoys, senior diplomats, university deans, and civil society directors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 font-serif text-base">
              Verified Certification
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Each graduate receives a unique cryptographic serial number verifiable by employers and universities worldwide.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 font-serif text-base">
              Scholarship Support
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Up to 100% need-based tuition waivers for grassroots community leaders and women fellows across Africa.
            </p>
          </div>
        </div>

        {/* Courses Section */}
        <div id="courses" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                Academy Courses & Masterclasses
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore specialized cohorts currently accepting registrations or upcoming in 2026.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or topics..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
              >
                {course.image && (
                  <div className="h-44 bg-slate-100 overflow-hidden relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-emerald-950/80 backdrop-blur-sm text-emerald-300 text-[11px] font-semibold rounded-full">
                      {course.category}
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {!course.image && (
                      <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-semibold mb-3">
                        {course.category}
                      </span>
                    )}

                    <h3 className="text-lg font-bold font-serif text-slate-900 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Faculty: <strong>{course.instructor}</strong> ({course.instructorTitle})
                    </p>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Duration: <strong>{course.duration}</strong> ({course.deliveryMethod})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Cohort Start: <strong>{course.startDate}</strong></span>
                      </div>
                    </div>

                    {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <h4 className="text-[11px] uppercase font-bold text-slate-400 mb-1.5">
                          Key Learning Modules
                        </h4>
                        <ul className="space-y-1">
                          {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
                    >
                      Syllabus Details
                    </button>

                    <button
                      onClick={() => {
                        if (course.registrationUrl.startsWith('#')) {
                          onNavigate(course.registrationUrl.replace('#', ''));
                        } else {
                          window.open(course.registrationUrl, '_blank');
                        }
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{course.registrationButtonText || 'Enroll Now'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Syllabus details */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold">
                    {selectedCourse.category}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mt-2">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Instructor: {selectedCourse.instructor} • {selectedCourse.instructorTitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Course Overview
                  </h4>
                  <p>{selectedCourse.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block">Duration & Format</span>
                    <span className="font-semibold text-slate-800">
                      {selectedCourse.duration} • {selectedCourse.deliveryMethod}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Start Date</span>
                    <span className="font-semibold text-slate-800">
                      {selectedCourse.startDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Registration Deadline</span>
                    <span className="font-semibold text-slate-800">
                      {selectedCourse.registrationDeadline}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Certificate Credential</span>
                    <span className="font-semibold text-emerald-700">
                      {selectedCourse.certificateAvailable ? 'Verified Digital Certificate' : 'Audit Only'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Learning Outcomes & Modules
                  </h4>
                  <ul className="space-y-2">
                    {selectedCourse.learningOutcomes?.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Eligibility
                  </h4>
                  <p className="text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                    {selectedCourse.eligibility}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const url = selectedCourse.registrationUrl;
                    setSelectedCourse(null);
                    if (url.startsWith('#')) {
                      onNavigate(url.replace('#', ''));
                    } else {
                      window.open(url, '_blank');
                    }
                  }}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <span>{selectedCourse.registrationButtonText || 'Enroll in Cohort'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
