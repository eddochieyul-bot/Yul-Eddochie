import React, { useEffect, useState } from 'react';
import { CmsResource } from '../../../firebase/types';
import {
  subscribeToResources,
  saveResource,
  deleteResource,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Search,
  CheckCircle2,
  Download,
  Calendar,
  ExternalLink,
  X,
} from 'lucide-react';

export function ResourcesTab() {
  const { user } = useAdminAuth();
  const [resources, setResources] = useState<CmsResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<CmsResource> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToResources((items) => {
      setResources(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      description: '',
      category: 'Policy Brief',
      fileUrl: '/constitution',
      fileSize: '1.2 MB',
      fileFormat: 'PDF',
      publishDate: new Date().toISOString().split('T')[0],
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (res: CmsResource) => {
    setEditingItem({ ...res });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (res: CmsResource) => {
    try {
      await saveResource({ ...res, published: !res.published }, user?.email || 'admin');
      setNotification(`Document status updated.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete document "${title}"?`)) return;
    try {
      await deleteResource(id, user?.email || 'admin');
      setNotification(`Document removed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file, 'resources-docs');
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      setEditingItem((prev) =>
        prev
          ? {
              ...prev,
              fileUrl: url,
              fileSize: sizeMB,
              fileFormat: ext,
            }
          : prev
      );
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.fileUrl) {
      alert('Please fill in Document Title and File Link.');
      return;
    }

    setIsSaving(true);
    try {
      await saveResource(editingItem, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingItem(null);
      setNotification(`Document saved and available for members!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to save document: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = resources.filter(
    (r) =>
      (r.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Institutional Publications & Archives</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Resources & Publications Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deposit official constitutional treaties, annual reports, policy whitepapers, and legislative memos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
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
          placeholder="Search resources by title or category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading publications...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <FileText className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No documents found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((res) => (
            <div
              key={res.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                res.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {res.fileFormat || 'PDF'} • {res.fileSize || '1 MB'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-['Outfit'] line-clamp-2">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{res.publishDate}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={res.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Access Document</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(res)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {res.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(res)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(res.id, res.title)}
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

      {/* Modal */}
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
                Document Repository Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingItem.id ? 'Edit Document Entry' : 'Deposit New Publication'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. AYLA Annual State of African Youth Report"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingItem.category || 'Policy Brief'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  >
                    <option value="Constitution">Constitution</option>
                    <option value="Policy Brief">Policy Brief</option>
                    <option value="Annual Report">Annual Report</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Governance Guide">Governance Guide</option>
                    <option value="Press Communiqué">Press Communiqué</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={editingItem.publishDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, publishDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description / Abstract</label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Brief summary of treaty, findings, or institutional mandate..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">File Attachment / URL *</label>
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-700">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isUploading ? 'Uploading...' : 'Upload PDF/Doc From Device'}</span>
                    <input
                      type="file"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.fileUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                    placeholder="Or paste external PDF URL (https://... or /constitution)"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Format</label>
                  <input
                    type="text"
                    value={editingItem.fileFormat || 'PDF'}
                    onChange={(e) => setEditingItem({ ...editingItem, fileFormat: e.target.value })}
                    placeholder="PDF"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">File Size</label>
                  <input
                    type="text"
                    value={editingItem.fileSize || '1.5 MB'}
                    onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                    placeholder="1.5 MB"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                  />
                  <span className="text-xs text-white">Published in public resources library</span>
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
                  disabled={isSaving || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
