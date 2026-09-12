import React, { useEffect, useState } from 'react';
import {
  CmsLeadershipOfficer,
} from '../../../firebase/types';
import {
  subscribeToLeadership,
  saveLeadershipOfficer,
  deleteLeadershipOfficer,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Mail,
  User,
  X,
} from 'lucide-react';

export function LeadershipTab() {
  const { user } = useAdminAuth();
  const [officers, setOfficers] = useState<CmsLeadershipOfficer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOfficer, setEditingOfficer] = useState<Partial<CmsLeadershipOfficer> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToLeadership((items) => {
      setOfficers(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingOfficer({
      fullName: '',
      position: '',
      title: '',
      constitutionalRole: '',
      biography: '',
      profilePhoto: '',
      country: 'Pan-African',
      email: '',
      socials: { twitter: '@AYLA_Africa', instagram: '@ayla.africa', linkedin: 'AYLA Africa' },
      responsibilities: [],
      displayOrder: officers.length + 1,
      published: true,
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (officer: CmsLeadershipOfficer) => {
    setEditingOfficer({ ...officer });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (officer: CmsLeadershipOfficer) => {
    try {
      await saveLeadershipOfficer(
        { ...officer, published: !officer.published },
        user?.email || 'admin'
      );
      setNotification(`Leader ${officer.fullName} is now ${!officer.published ? 'Published' : 'Unpublished'}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating published status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from the leadership roster?`)) {
      return;
    }
    try {
      await deleteLeadershipOfficer(id, user?.email || 'admin');
      setNotification(`Leader ${name} removed from roster.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error deleting officer: ' + err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file, 'leadership-portraits');
      setEditingOfficer((prev) => (prev ? { ...prev, profilePhoto: url } : prev));
    } catch (err: any) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOfficer || !editingOfficer.fullName || !editingOfficer.position) {
      alert('Please fill in both Full Name and Position/Title.');
      return;
    }

    setIsSaving(true);
    try {
      await saveLeadershipOfficer(editingOfficer, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingOfficer(null);
      setNotification(`Leadership profile for ${editingOfficer.fullName} updated and live on public site!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Error saving leadership profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredOfficers = officers.filter((o) =>
    (o.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.position || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.country || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Council & Directorates</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Leadership Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update portfolios, biographies, and photos. Updates propagate immediately to the public AYLA Leadership page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Leader</span>
        </button>
      </div>

      {/* Success Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, position, or country..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{filteredOfficers.length}</span> leaders
        </div>
      </div>

      {/* Officers Table / Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">
          Loading leadership roster...
        </div>
      ) : filteredOfficers.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Award className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No leadership profiles found</div>
          <p className="text-xs text-slate-400">
            Click "Add New Leader" to add constitutional officers to the Executive Council.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOfficers.map((officer) => (
            <div
              key={officer.id}
              className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                officer.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {officer.profilePhoto ? (
                      <img
                        src={officer.profilePhoto}
                        alt={officer.fullName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                        {officer.fullName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-white tracking-tight">
                        {officer.fullName}
                      </div>
                      <div className="text-xs text-amber-400 font-medium line-clamp-1">
                        {officer.position || officer.title}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {officer.country || 'Pan-African'}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${
                      officer.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {officer.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {officer.biography || 'No biography entered yet.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Order: <span className="text-white font-mono">{officer.displayOrder || 1}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(officer)}
                    title={officer.published ? 'Unpublish' : 'Publish'}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {officer.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(officer)}
                    title="Edit profile"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(officer.id, officer.fullName)}
                    title="Delete profile"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && editingOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Leader Portfolio Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingOfficer.id ? `Edit: ${editingOfficer.fullName || 'Officer'}` : 'Add New Constitutional Officer'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingOfficer.fullName || ''}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, fullName: e.target.value })}
                    placeholder="e.g. Dr. Kwame Mensah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Position / Title *</label>
                  <input
                    type="text"
                    required
                    value={editingOfficer.position || editingOfficer.title || ''}
                    onChange={(e) =>
                      setEditingOfficer({
                        ...editingOfficer,
                        position: e.target.value,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. President & Chairperson of the Executive Council"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country / Region</label>
                  <input
                    type="text"
                    value={editingOfficer.country || ''}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, country: e.target.value })}
                    placeholder="e.g. Ghana / West Africa"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Institutional Email</label>
                  <input
                    type="email"
                    value={editingOfficer.email || ''}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, email: e.target.value })}
                    placeholder="e.g. leadership@aylaafrica.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              {/* Profile Photo Upload / URL */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Profile Photo</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {editingOfficer.profilePhoto ? (
                    <img
                      src={editingOfficer.profilePhoto}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
                      <User className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors border border-slate-700">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isUploading ? 'Uploading & Optimizing...' : 'Upload Picture From Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="text-[11px] text-slate-400">
                      Or paste direct image URL:
                    </div>
                    <input
                      type="text"
                      value={editingOfficer.profilePhoto || ''}
                      onChange={(e) => setEditingOfficer({ ...editingOfficer, profilePhoto: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Biography & Credentials *</label>
                <textarea
                  rows={4}
                  required
                  value={editingOfficer.biography || ''}
                  onChange={(e) => setEditingOfficer({ ...editingOfficer, biography: e.target.value })}
                  placeholder="Provide constitutional background, diplomatic credentials, and pan-African leadership trajectory..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                />
              </div>

              {/* Social Links & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order (Sort weight)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingOfficer.displayOrder || 1}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                  <p className="mt-1 text-[10px] text-slate-500">Lower numbers appear first on the page (1 = President)</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status / Publication</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingOfficer.published !== false}
                        onChange={(e) => setEditingOfficer({ ...editingOfficer, published: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                      />
                      <span className="text-xs text-white">Published on public site</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Portfolio...</span>
                    </>
                  ) : (
                    <span>Save & Publish Live</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
