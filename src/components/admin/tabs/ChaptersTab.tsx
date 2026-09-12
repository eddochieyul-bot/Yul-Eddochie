import React, { useEffect, useState } from 'react';
import { CmsChapter } from '../../../firebase/types';
import {
  subscribeToChapters,
  saveChapter,
  deleteChapter,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Globe,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  MapPin,
  Building2,
  Mail,
  X,
} from 'lucide-react';

export function ChaptersTab() {
  const { user } = useAdminAuth();
  const [chapters, setChapters] = useState<CmsChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<CmsChapter> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToChapters((items) => {
      setChapters(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      region: 'West Africa',
      country: 'Nigeria, Ghana, Senegal',
      chapterName: 'West Africa Regional Bureau',
      coordinator: 'Regional Bureau Interim Secretariat',
      contactInfo: 'westafrica@aylaafrica.org',
      description: 'Coordinates national youth councils and focal points across member states.',
      status: 'Active Focal Hub',
      published: true,
      focalHub: 'Accra, Ghana',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chap: CmsChapter) => {
    setEditingItem({ ...chap });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (chap: CmsChapter) => {
    try {
      await saveChapter({ ...chap, published: !chap.published }, user?.email || 'admin');
      setNotification(`Chapter status updated.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete chapter "${name}"?`)) return;
    try {
      await deleteChapter(id, user?.email || 'admin');
      setNotification(`Chapter removed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.chapterName || !editingItem.region) {
      alert('Please fill in Chapter Name and Region.');
      return;
    }

    setIsSaving(true);
    try {
      await saveChapter(editingItem, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingItem(null);
      setNotification(`Chapter saved successfully!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to save chapter: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = chapters.filter(
    (c) =>
      (c.chapterName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.region || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.country || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Pan-African Regional Focal Hubs</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Regional Chapters Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage East, West, North, Central, Southern Africa, and Global Diaspora youth bureaus.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Chapter / Hub</span>
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chapters by name, region, or member nations..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading regional chapters...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Globe className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No chapters found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((chap) => (
            <div
              key={chap.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                chap.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {chap.region}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {chap.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {chap.chapterName}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {chap.description}
                </p>

                <div className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Focal Hub: <strong className="text-white">{chap.focalHub || 'Regional Bureau'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span className="line-clamp-1">Coordinator: {chap.coordinator}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span className="line-clamp-1">{chap.contactInfo}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    chap.published ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {chap.published ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(chap)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {chap.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(chap)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(chap.id, chap.chapterName)}
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

      {/* Editor Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Regional Hub Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingItem.id ? 'Edit Regional Bureau' : 'Establish Chapter / Hub'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Region *</label>
                  <select
                    value={editingItem.region || 'West Africa'}
                    onChange={(e) => setEditingItem({ ...editingItem, region: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  >
                    <option value="West Africa">West Africa</option>
                    <option value="East Africa">East Africa</option>
                    <option value="Southern Africa">Southern Africa</option>
                    <option value="Central Africa">Central Africa</option>
                    <option value="North Africa">North Africa</option>
                    <option value="Global African Diaspora">Global African Diaspora</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chapter Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.chapterName || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, chapterName: e.target.value })}
                    placeholder="e.g. West Africa Regional Bureau"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Member Countries / Coverage</label>
                <input
                  type="text"
                  value={editingItem.country || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })}
                  placeholder="e.g. Ghana, Nigeria, Senegal, Côte d'Ivoire..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Focal Hub City</label>
                  <input
                    type="text"
                    value={editingItem.focalHub || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, focalHub: e.target.value })}
                    placeholder="e.g. Accra, Ghana"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={editingItem.status || 'Active Focal Hub'}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as 'Active Focal Hub' | 'Chartering' | 'Regional Bureau',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  >
                    <option value="Active Focal Hub">Active Focal Hub</option>
                    <option value="Regional Bureau">Regional Bureau</option>
                    <option value="Chartering">Chartering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lead Coordinator</label>
                  <input
                    type="text"
                    value={editingItem.coordinator || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, coordinator: e.target.value })}
                    placeholder="Regional Bureau Coordinator"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Contact Email</label>
                  <input
                    type="email"
                    value={editingItem.contactInfo || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, contactInfo: e.target.value })}
                    placeholder="aylafrica.org@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Strategic Focus</label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Overview of regional initiatives, focal points, and cross-border programmes..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                  />
                  <span className="text-xs text-white">Published on public site</span>
                </label>
              </div>

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
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Regional Bureau'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
