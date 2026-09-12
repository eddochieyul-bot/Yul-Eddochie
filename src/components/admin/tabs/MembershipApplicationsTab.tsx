import React, { useEffect, useState } from 'react';
import { CmsMembershipApplication, CmsSubscriber } from '../../../firebase/types';
import {
  subscribeToMembershipApplications,
  updateMembershipApplicationStatus,
  recordMembershipApplication,
  deleteMembershipApplication,
  subscribeToSubscribers,
  generateInstitutionalMembershipId,
  assignMembershipId,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { OfficialCertificateModal } from '../modals/OfficialCertificateModal';
import { SendMemberEmailModal } from '../modals/SendMemberEmailModal';
import { MassEmailModal } from '../modals/MassEmailModal';
import { GenerateMembershipIdModal } from '../modals/GenerateMembershipIdModal';
import { ImportGoogleFormCsvModal } from '../modals/ImportGoogleFormCsvModal';
import {
  Users,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  UserCheck,
  Mail,
  Phone,
  Globe,
  Plus,
  X,
  Download,
  Award,
  CreditCard,
  Megaphone,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  Shield,
  Sparkles,
  Filter,
} from 'lucide-react';

const OFFICIAL_GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd96IKbbyBeVbfmNfkTEhwNkwiPiVWJFYoRST7vk6uyC6knzQ/viewform?usp=header';

export function MembershipApplicationsTab() {
  const { user } = useAdminAuth();
  const [applications, setApplications] = useState<CmsMembershipApplication[]>([]);
  const [subscribers, setSubscribers] = useState<CmsSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'reviewed' | 'pending' | 'has_id' | 'has_cert'>('all');
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [selectedCertificateMember, setSelectedCertificateMember] = useState<CmsMembershipApplication | null>(null);
  const [selectedEmailMember, setSelectedEmailMember] = useState<CmsMembershipApplication | null>(null);
  const [certificateEmailContext, setCertificateEmailContext] = useState(false);
  const [selectedGenerateIdMember, setSelectedGenerateIdMember] = useState<CmsMembershipApplication | null>(null);
  const [isMassEmailOpen, setIsMassEmailOpen] = useState(false);
  const [isImportCsvOpen, setIsImportCsvOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual Form state
  const [manualForm, setManualForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryOfResidence: '',
    nationality: '',
    chapterOfInterest: 'West Africa',
    membershipCategory: 'Accredited Youth Delegate',
    motivationStatement: '',
    generateIdNow: true,
  });

  useEffect(() => {
    const unsubApps = subscribeToMembershipApplications((apps) => {
      setApplications(apps);
      setLoading(false);
    });
    const unsubSubs = subscribeToSubscribers((subs) => {
      setSubscribers(subs);
    });

    return () => {
      unsubApps();
      unsubSubs();
    };
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'reviewed' | 'approved') => {
    try {
      await updateMembershipApplicationStatus(id, newStatus, undefined, user?.email || 'admin');
      setNotification(`Application status updated to ${newStatus}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleQuickAssignId = async (member: CmsMembershipApplication) => {
    try {
      const generated = generateInstitutionalMembershipId(
        member.countryOfResidence || member.nationality
      );
      await assignMembershipId(
        member.id,
        generated,
        member.membershipTier || member.membershipCategory || 'Accredited Youth Delegate',
        user?.email || undefined
      );
      setNotification(`Conferred Membership ID ${generated} to ${member.fullName}!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Failed to assign ID: ' + err.message);
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the record for ${name}? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteMembershipApplication(id, user?.email || undefined);
      setNotification(`Record for ${name} removed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to delete member: ' + err.message);
    }
  };

  const handleCopyId = (idString: string) => {
    navigator.clipboard.writeText(idString);
    setCopiedId(idString);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName.trim() || !manualForm.email.trim()) {
      alert('Full name and email are required.');
      return;
    }

    try {
      const appId = await recordMembershipApplication({
        fullName: manualForm.fullName.trim(),
        email: manualForm.email.trim().toLowerCase(),
        phone: manualForm.phone.trim(),
        countryOfResidence: manualForm.countryOfResidence.trim(),
        nationality: manualForm.nationality.trim(),
        chapterOfInterest: manualForm.chapterOfInterest,
        membershipCategory: manualForm.membershipCategory,
        motivationStatement: manualForm.motivationStatement.trim(),
        source: 'Manual Secretariat Intake',
      });

      if (manualForm.generateIdNow && appId) {
        const genId = generateInstitutionalMembershipId(
          manualForm.countryOfResidence || manualForm.nationality
        );
        await assignMembershipId(
          appId,
          genId,
          manualForm.membershipCategory,
          user?.email || undefined
        );
      }

      setIsManualModalOpen(false);
      setManualForm({
        fullName: '',
        email: '',
        phone: '',
        countryOfResidence: '',
        nationality: '',
        chapterOfInterest: 'West Africa',
        membershipCategory: 'Accredited Youth Delegate',
        motivationStatement: '',
        generateIdNow: true,
      });

      setNotification(`Member record recorded and added to AYLA Institutional Roster!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Error recording application: ' + err.message);
    }
  };

  const handleExportCSV = () => {
    if (filtered.length === 0) {
      alert('No records available to export with current filters.');
      return;
    }
    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Country of Residence',
      'Nationality',
      'Chapter',
      'Category / Tier',
      'Membership ID',
      'Status',
      'Certificate Serial',
      'Certificate Issued Date',
      'Submitted At',
    ];
    const rows = filtered.map((a) => [
      `"${a.fullName || ''}"`,
      `"${a.email || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.countryOfResidence || ''}"`,
      `"${a.nationality || ''}"`,
      `"${a.chapterOfInterest || a.assignedChapter || ''}"`,
      `"${a.membershipTier || a.membershipCategory || ''}"`,
      `"${a.membershipId || ''}"`,
      `"${a.status || 'pending'}"`,
      `"${a.certificateNumber || ''}"`,
      `"${a.certificateIssuedAt ? new Date(a.certificateIssuedAt).toLocaleDateString() : ''}"`,
      `"${a.submittedAt || ''}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `AYLA_Accredited_Members_Roster_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalRegistered = applications.length;
  const approvedMembers = applications.filter((a) => a.status === 'approved').length;
  const withMembershipIds = applications.filter((a) => Boolean(a.membershipId)).length;
  const withCertificates = applications.filter((a) => Boolean(a.certificateIssuedAt)).length;

  // Filtering
  const filtered = applications.filter((a) => {
    // Status Filter
    if (statusFilter === 'approved' && a.status !== 'approved') return false;
    if (statusFilter === 'reviewed' && a.status !== 'reviewed') return false;
    if (statusFilter === 'pending' && a.status !== 'pending') return false;
    if (statusFilter === 'has_id' && !a.membershipId) return false;
    if (statusFilter === 'has_cert' && !a.certificateIssuedAt) return false;

    // Search Term
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (a.fullName || '').toLowerCase().includes(term) ||
      (a.email || '').toLowerCase().includes(term) ||
      (a.membershipId || '').toLowerCase().includes(term) ||
      (a.countryOfResidence || '').toLowerCase().includes(term) ||
      (a.nationality || '').toLowerCase().includes(term) ||
      (a.certificateNumber || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Continental Directorate of Membership & Accreditation</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Registered Members & Secretariat Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage registered members, generate Pan-African membership IDs, issue institutional certificates, and dispatch single or mass communications.
          </p>
        </div>

        {/* Global Header Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <a
            href={OFFICIAL_GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Open official AYLA registration Google Form"
          >
            <span>Google Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsImportCsvOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Import exported CSV responses from Google Forms"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => setIsMassEmailOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Send broadcast email to all or filtered members"
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Mass Broadcast</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Intake</span>
          </button>
        </div>
      </div>

      {/* Institutional Registry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Registered
            </div>
            <div className="text-2xl font-black text-white font-['Outfit'] mt-0.5">
              {totalRegistered}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Accredited Members
            </div>
            <div className="text-2xl font-black text-emerald-400 font-['Outfit'] mt-0.5">
              {approvedMembers}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              IDs Conferred
            </div>
            <div className="text-2xl font-black text-amber-400 font-['Outfit'] mt-0.5">
              {withMembershipIds}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Certificates Issued
            </div>
            <div className="text-2xl font-black text-purple-400 font-['Outfit'] mt-0.5">
              {withCertificates}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Official Form Integration Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>Official AYLA Google Form Registry</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">
                LIVE
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Form responses queue alerts directly to <strong className="text-amber-400">aylaafrica.org@gmail.com</strong>. You can view responses live or upload the exported CSV to batch-generate credentials.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsImportCsvOpen(true)}
            className="text-xs text-amber-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Batch Import Responses</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by member name, email, country, or Membership ID (e.g. AYLA-GH-2026-XXXX)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 font-medium"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All' },
            { id: 'approved', label: 'Accredited' },
            { id: 'has_id', label: 'With ID' },
            { id: 'has_cert', label: 'With Certificate' },
            { id: 'pending', label: 'Pending' },
            { id: 'reviewed', label: 'Reviewed' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Members & Applications Roster */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">
          Loading institutional membership roster...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-3">
          <Users className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No registered members found</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria, record a direct intake, or import responses from the Google Form.
          </p>
          <button
            onClick={() => setIsImportCsvOpen(true)}
            className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Import Google Form Responses</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((member) => {
            const hasId = Boolean(member.membershipId);
            const hasCert = Boolean(member.certificateIssuedAt);

            return (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-4 shadow-sm"
              >
                {/* Member Profile Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        member.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : member.status === 'reviewed'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {member.status === 'approved' ? 'Accredited Member' : member.status || 'Pending Intake'}
                    </span>

                    {/* Membership ID Chip */}
                    {hasId ? (
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-950 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold">
                        <CreditCard className="w-3 h-3 text-amber-400" />
                        <span>{member.membershipId}</span>
                        <button
                          onClick={() => handleCopyId(member.membershipId!)}
                          className="hover:text-white transition-colors ml-0.5 cursor-pointer"
                          title="Copy Membership ID"
                        >
                          {copiedId === member.membershipId ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">No Membership ID assigned</span>
                    )}

                    {/* Certificate Status Chip */}
                    {hasCert && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300 text-[10px] font-semibold">
                        <Award className="w-3 h-3 text-purple-400" />
                        <span>Certified</span>
                      </span>
                    )}

                    <span className="text-[10px] text-slate-500 ml-auto xl:ml-0">
                      Registered: {new Date(member.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h3 className="text-base font-bold text-white font-['Outfit'] tracking-wide">
                      {member.fullName}
                    </h3>
                    <span className="text-xs text-amber-400/90 font-medium">
                      • {member.membershipTier || member.membershipCategory || 'Accredited Youth Delegate'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>{member.email}</span>
                    </div>

                    {member.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{member.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      <span>{member.countryOfResidence || member.nationality || 'African Citizen'}</span>
                    </div>

                    {member.chapterOfInterest && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span className="text-slate-500">Hub:</span>
                        <span className="text-slate-300">{member.chapterOfInterest}</span>
                      </div>
                    )}
                  </div>

                  {member.motivationStatement && (
                    <p className="text-xs text-slate-400 italic line-clamp-2 pt-1 border-t border-slate-800/60 mt-1">
                      "{member.motivationStatement}"
                    </p>
                  )}
                </div>

                {/* Primary Action Buttons (ID, Certificate, Email, Status) */}
                <div className="flex flex-wrap items-center gap-2 self-start xl:self-center pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-800 w-full xl:w-auto justify-end">
                  {/* Membership ID Action */}
                  {hasId ? (
                    <button
                      onClick={() => setSelectedGenerateIdMember(member)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Edit Membership ID or Tier"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit ID</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleQuickAssignId(member)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="Auto-generate and confer Membership ID"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Generate ID</span>
                    </button>
                  )}

                  {/* Certificate Action */}
                  <button
                    onClick={() => setSelectedCertificateMember(member)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="View, Print, or Issue Official Certificate"
                  >
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>{hasCert ? 'View Certificate' : 'Certificate'}</span>
                  </button>

                  {/* Single Email Action */}
                  <button
                    onClick={() => {
                      setCertificateEmailContext(false);
                      setSelectedEmailMember(member);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Send direct email to member"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </button>

                  {/* Quick Status Dropdown */}
                  <div className="flex items-center rounded-xl bg-slate-950 p-0.5 border border-slate-800">
                    <button
                      onClick={() => handleUpdateStatus(member.id, 'reviewed')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                        member.status === 'reviewed'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(member.id, 'approved')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                        member.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Approve
                    </button>
                  </div>

                  {/* Delete / Archive */}
                  <button
                    onClick={() => handleDeleteMember(member.id, member.fullName)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors cursor-pointer"
                    title="Delete member record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Official Certificate Modal */}
      {selectedCertificateMember && (
        <OfficialCertificateModal
          member={selectedCertificateMember}
          onClose={() => setSelectedCertificateMember(null)}
          onOpenEmailModal={(mem, isCert) => {
            setCertificateEmailContext(Boolean(isCert));
            setSelectedEmailMember(mem);
          }}
          onCertificateUpdated={(updated) => {
            setApplications((prev) =>
              prev.map((a) => (a.id === updated.id ? updated : a))
            );
          }}
        />
      )}

      {/* Single Email Dispatch Modal */}
      {selectedEmailMember && (
        <SendMemberEmailModal
          member={selectedEmailMember}
          certificateContext={certificateEmailContext}
          onClose={() => {
            setSelectedEmailMember(null);
            setCertificateEmailContext(false);
          }}
          onSuccess={() => {
            setNotification(`Official email transmitted to ${selectedEmailMember.fullName}!`);
            setTimeout(() => setNotification(null), 4000);
          }}
        />
      )}

      {/* Mass Email Broadcast Modal */}
      {isMassEmailOpen && (
        <MassEmailModal
          applications={applications}
          subscribers={subscribers}
          onClose={() => setIsMassEmailOpen(false)}
          onSuccess={() => {
            setNotification('Mass institutional broadcast successfully dispatched!');
            setTimeout(() => setNotification(null), 4000);
          }}
        />
      )}

      {/* Membership ID Generator Modal */}
      {selectedGenerateIdMember && (
        <GenerateMembershipIdModal
          member={selectedGenerateIdMember}
          onClose={() => setSelectedGenerateIdMember(null)}
          onSuccess={(updated) => {
            setApplications((prev) =>
              prev.map((a) => (a.id === updated.id ? updated : a))
            );
            setNotification(`Membership ID ${updated.membershipId} saved!`);
            setTimeout(() => setNotification(null), 4000);
          }}
        />
      )}

      {/* Import Google Form CSV Modal */}
      {isImportCsvOpen && (
        <ImportGoogleFormCsvModal
          onClose={() => setIsImportCsvOpen(false)}
          onImportComplete={() => {
            setNotification('Google Form responses imported into Institutional Roster!');
            setTimeout(() => setNotification(null), 4000);
          }}
        />
      )}

      {/* Manual Intake Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full my-8 text-white shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Direct Secretariat Intake
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                Record Member Intake
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Register a new member directly into the AYLA Continental Roster
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="delegate@aylaafrica.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="+233..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country of Residence</label>
                  <input
                    type="text"
                    value={manualForm.countryOfResidence}
                    onChange={(e) => setManualForm({ ...manualForm, countryOfResidence: e.target.value })}
                    placeholder="e.g. Ghana"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nationality</label>
                  <input
                    type="text"
                    value={manualForm.nationality}
                    onChange={(e) => setManualForm({ ...manualForm, nationality: e.target.value })}
                    placeholder="e.g. Ghanaian"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chapter / Hub</label>
                  <select
                    value={manualForm.chapterOfInterest}
                    onChange={(e) => setManualForm({ ...manualForm, chapterOfInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  >
                    <option value="West Africa">West Africa Hub</option>
                    <option value="East Africa">East Africa Hub</option>
                    <option value="Southern Africa">Southern Africa Hub</option>
                    <option value="North Africa">North Africa Hub</option>
                    <option value="Central Africa">Central Africa Hub</option>
                    <option value="Diaspora">Global Diaspora Chapter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Membership Category</label>
                  <select
                    value={manualForm.membershipCategory}
                    onChange={(e) => setManualForm({ ...manualForm, membershipCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  >
                    <option value="Accredited Youth Delegate">Accredited Youth Delegate</option>
                    <option value="Ordinary Member">Ordinary Member</option>
                    <option value="Chapter Executive">Chapter Executive</option>
                    <option value="Continental Fellow">Continental Fellow</option>
                    <option value="Associate Member">Associate Member</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Motivation / Bio</label>
                <textarea
                  rows={2}
                  value={manualForm.motivationStatement}
                  onChange={(e) => setManualForm({ ...manualForm, motivationStatement: e.target.value })}
                  placeholder="Civic focus, chapter interests, policy portfolio..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={manualForm.generateIdNow}
                  onChange={(e) => setManualForm({ ...manualForm, generateIdNow: e.target.checked })}
                  className="rounded accent-amber-500"
                />
                <span>Automatically generate and assign Pan-African Membership ID now</span>
              </label>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Record & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
