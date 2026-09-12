import React, { useEffect, useState } from 'react';
import { CmsNewsArticle } from '../../../firebase/types';
import {
  subscribeToNews,
  saveNewsArticle,
  deleteNewsArticle,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Search,
  CheckCircle2,
  Loader2,
  Calendar,
  User,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';

export function NewsTab() {
  const { user } = useAdminAuth();
  const [articles, setArticles] = useState<CmsNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingArticle, setEditingArticle] = useState<Partial<CmsNewsArticle> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToNews((items) => {
      setArticles(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingArticle({
      title: '',
      slug: '',
      category: 'Press Release',
      author: 'AYLA Continental Secretariat',
      publishDate: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '',
      featuredImage: '',
      featured: false,
      tags: ['Pan-African', 'Governance'],
      published: true,
      readTime: '4 min read',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: CmsNewsArticle) => {
    setEditingArticle({ ...article });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (article: CmsNewsArticle) => {
    try {
      await saveNewsArticle({ ...article, published: !article.published }, user?.email || 'admin');
      setNotification(`Article "${article.title}" is now ${!article.published ? 'Published' : 'Unpublished'}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      await deleteNewsArticle(id, user?.email || 'admin');
      setNotification(`Article removed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file, 'news-media');
      setEditingArticle((prev) => (prev ? { ...prev, featuredImage: url } : prev));
    } catch (err: any) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title || !editingArticle.content) {
      alert('Please provide Title and Content.');
      return;
    }

    setIsSaving(true);
    try {
      const slug =
        editingArticle.slug ||
        editingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      await saveNewsArticle({ ...editingArticle, slug }, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingArticle(null);
      setNotification(`News article published and live on website!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Error saving news article: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      (a.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Continental Press & Communiqués</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            News & Editorial Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish official resolutions, press statements, and chapter communiqués directly to the AYLA News Portal.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

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
            placeholder="Search news by headline or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{filteredArticles.length}</span> articles
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading articles...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Newspaper className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No articles found</div>
          <p className="text-xs text-slate-400">Click "Write Article" to publish news.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                art.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {art.category}
                  </span>
                  {art.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white font-['Outfit'] line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {art.excerpt || art.content.slice(0, 150)}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{art.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    <span className="line-clamp-1">{art.author}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    art.published ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {art.published ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(art)}
                    title={art.published ? 'Unpublish' : 'Publish'}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {art.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(art)}
                    title="Edit article"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    title="Delete article"
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
      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                News Desk Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingArticle.id ? `Edit: ${editingArticle.title || 'Article'}` : 'Compose News Communiqué'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="e.g. AYLA Executive Council Convenes in Addis Ababa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingArticle.category || 'Press Release'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="Official Announcement">Official Announcement</option>
                    <option value="Continental Summit">Continental Summit</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Chapter Update">Chapter Update</option>
                    <option value="Policy Dialogue">Policy Dialogue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Author / Bylines</label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    placeholder="AYLA Continental Secretariat"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={editingArticle.publishDate || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, publishDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Featured Article Image</label>
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-700">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
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
                    value={editingArticle.featuredImage || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, featuredImage: e.target.value })}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Executive Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  placeholder="One or two sentence summary that appears on news cards and preview meta..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Article Text & Resolutions *</label>
                <textarea
                  rows={8}
                  required
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Draft paragraphs, institutional resolutions, quotes from delegates..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArticle.featured || false}
                    onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                  />
                  <span className="text-xs text-white">Feature in Hero News Spotlights</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArticle.published !== false}
                    onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
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
                  disabled={isSaving || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <span>Publish Article</span>
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
