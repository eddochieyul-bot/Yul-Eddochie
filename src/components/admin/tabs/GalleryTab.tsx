import React, { useEffect, useState } from 'react';
import { CmsGalleryItem } from '../../../firebase/types';
import {
  subscribeToGallery,
  saveGalleryItem,
  deleteGalleryItem,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Search,
  CheckCircle2,
  Loader2,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';

export function GalleryTab() {
  const { user } = useAdminAuth();
  const [items, setItems] = useState<CmsGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<CmsGalleryItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToGallery((gal) => {
      setItems(gal);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      caption: '',
      category: 'Pan-African Events',
      imageUrl: '',
      date: new Date().getFullYear().toString(),
      year: new Date().getFullYear().toString(),
      location: 'Continental Headquarters',
      displayOrder: items.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsGalleryItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (item: CmsGalleryItem) => {
    try {
      await saveGalleryItem({ ...item, published: !item.published }, user?.email || 'admin');
      setNotification(`Photo "${item.title}" status updated.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}" from the gallery?`)) return;
    try {
      await deleteGalleryItem(id, user?.email || 'admin');
      setNotification(`Photo deleted.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file, 'gallery-media');
      setEditingItem((prev) => (prev ? { ...prev, imageUrl: url } : prev));
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title) {
      alert('Please provide a Title.');
      return;
    }

    setIsSaving(true);
    try {
      await saveGalleryItem(editingItem, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingItem(null);
      setNotification(`Gallery media saved successfully!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to save gallery item: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = items.filter(
    (i) =>
      (i.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Continental Assemblies Visual Archive</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Gallery Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload and organize high-resolution photography from leadership summits, youth forums, and community outreach.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media</span>
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
          placeholder="Search gallery by title, category, or location..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading media archive...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <ImageIcon className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No gallery items found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                item.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div>
                <div className="h-44 rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800/80 relative">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                  )}

                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-950/80 text-amber-400 border border-slate-800 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-['Outfit'] line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {item.caption || 'No caption entered.'}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{item.year || item.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    item.published ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {item.published ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
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
                Visual Media Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingItem.id ? 'Edit Media Entry' : 'Upload Gallery Photo'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Inaugural General Assembly Opening Ceremony"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={editingItem.category || 'Pan-African Events'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option value="Leadership">Leadership</option>
                  <option value="Events">Events</option>
                  <option value="Programmes">Programmes</option>
                  <option value="Youth Forums">Youth Forums</option>
                  <option value="Regional Chapters">Regional Chapters</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Pan-African Events">Pan-African Events</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image Upload / URL</label>
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-700">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isUploading ? 'Uploading...' : 'Choose File From Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={editingItem.imageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    placeholder="Or paste direct image URL (https://...)"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Contextual description of delegates or summit activity..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Kigali, Rwanda"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year / Date</label>
                  <input
                    type="text"
                    value={editingItem.year || editingItem.date || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, year: e.target.value, date: e.target.value })
                    }
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
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
                  <span className="text-xs text-white">Published in public gallery</span>
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
                  {isSaving ? 'Saving...' : 'Save Media'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
