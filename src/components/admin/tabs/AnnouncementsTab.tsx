import React, { useEffect, useState } from 'react';
import { CmsAnnouncement } from '../../../firebase/types';
import {
  subscribeToAnnouncements,
  saveAnnouncement,
  deleteAnnouncement,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ExternalLink,
  X,
} from 'lucide-react';

export function AnnouncementsTab() {
  const { user } = useAdminAuth();
  const [announcements, setAnnouncements] = useState<CmsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<CmsAnnouncement> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToAnnouncements((items) => {
      setAnnouncements(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      content: '',
      publishDate: new Date().toISOString().split('T')[0],
      isImportant: false,
      linkUrl: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ann: CmsAnnouncement) => {
    setEditingItem({ ...ann });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (ann: CmsAnnouncement) => {
    try {
      await saveAnnouncement({ ...ann, published: !ann.published }, user?.email || 'admin');
      setNotification(`Announcement status updated.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete announcement "${title}"?`)) return;
    try {
      await deleteAnnouncement(id, user?.email || 'admin');
      setNotification(`Announcement deleted.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.content) {
      alert('Please fill in both Title and Content.');
      return;
    }

    setIsSaving(true);
    try {
      await saveAnnouncement(editingItem, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingItem(null);
      setNotification(`Announcement saved successfully!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to save announcement: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = announcements.filter(
    (a) =>
      (a.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Institutional Notices & Alerts</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Announcements Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish official alerts, deadline reminders, and statutory gazette notices to the AYLA membership.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Notice</span>
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search announcements..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
      </div>

      {/* List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading announcements...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Bell className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No announcements found</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ann) => (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                ann.isImportant
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : ann.published
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {ann.isImportant && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500 text-slate-950 flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      <span>Important Notice</span>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{ann.publishDate}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {ann.content}
                </p>

                {ann.linkUrl && (
                  <a
                    href={ann.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline pt-1"
                  >
                    <span>Attached Document / Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleTogglePublish(ann)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {ann.published ? (
                    <Eye className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                <button
                  onClick={() => handleOpenEdit(ann)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(ann.id, ann.title)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                Notice Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingItem.id ? 'Edit Notice' : 'Draft Institutional Notice'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Secretariat Notice on General Assembly Resolutions"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Date</label>
                <input
                  type="date"
                  value={editingItem.publishDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, publishDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Content / Resolution *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  placeholder="Official text of the declaration or notice..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Attachment or Reference Link</label>
                <input
                  type="text"
                  value={editingItem.linkUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, linkUrl: e.target.value })}
                  placeholder="https://... or /constitution"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.isImportant || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isImportant: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                  />
                  <span className="text-xs text-amber-400 font-bold">Mark as Urgent / Priority Notice</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                  />
                  <span className="text-xs text-white">Published</span>
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
                  {isSaving ? 'Saving...' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
