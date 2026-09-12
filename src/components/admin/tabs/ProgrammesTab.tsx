import React, { useEffect, useState } from 'react';
import { CmsProgramme } from '../../../firebase/types';
import {
  subscribeToProgrammes,
  saveProgramme,
  deleteProgramme,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Search,
  CheckCircle2,
  Loader2,
  ListOrdered,
  X,
} from 'lucide-react';

export function ProgrammesTab() {
  const { user } = useAdminAuth();
  const [programmes, setProgrammes] = useState<CmsProgramme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProgramme, setEditingProgramme] = useState<Partial<CmsProgramme> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [objectivesText, setObjectivesText] = useState('');

  useEffect(() => {
    const unsub = subscribeToProgrammes((items) => {
      setProgrammes(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingProgramme({
      title: '',
      subtitle: '',
      slug: '',
      category: 'Strategic Pillar',
      description: '',
      fullDetails: '',
      image: '',
      objectives: [],
      impactMetric: '10,000+ Participants Targeted',
      displayOrder: programmes.length + 1,
      published: true,
    });
    setObjectivesText('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (programme: CmsProgramme) => {
    setEditingProgramme({ ...programme });
    setObjectivesText((programme.objectives || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (p: CmsProgramme) => {
    try {
      await saveProgramme({ ...p, published: !p.published }, user?.email || 'admin');
      setNotification(`Programme "${p.title}" is now ${!p.published ? 'Published' : 'Unpublished'}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete programme "${title}"?`)) return;
    try {
      await deleteProgramme(id, user?.email || 'admin');
      setNotification(`Programme deleted.`);
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
      const url = await uploadImageFile(file, 'programmes');
      setEditingProgramme((prev) => (prev ? { ...prev, image: url } : prev));
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgramme || !editingProgramme.title) {
      alert('Please fill in Programme Title.');
      return;
    }

    setIsSaving(true);
    try {
      const slug =
        editingProgramme.slug ||
        editingProgramme.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const objectives = objectivesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      await saveProgramme(
        {
          ...editingProgramme,
          slug,
          route: `/programmes/${slug}`,
          objectives,
        },
        user?.email || 'admin'
      );
      setIsModalOpen(false);
      setEditingProgramme(null);
      setNotification(`Programme saved successfully!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to save programme: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = programmes.filter((p) =>
    (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Strategic Pillars & Initiatives</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Programmes Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage AYLA's continental leadership academies, youth fellowships, and civic engagement pillars.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Programme</span>
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
          placeholder="Search programmes by title or pillar..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading programmes...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No programmes found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prog) => (
            <div
              key={prog.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                prog.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {prog.category || 'Strategic Pillar'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Order: {prog.displayOrder || 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {prog.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                {prog.impactMetric && (
                  <div className="text-[11px] text-amber-400 font-semibold bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                    Impact: {prog.impactMetric}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    prog.published ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {prog.published ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(prog)}
                    title={prog.published ? 'Unpublish' : 'Publish'}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {prog.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(prog)}
                    title="Edit"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(prog.id, prog.title)}
                    title="Delete"
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
      {isModalOpen && editingProgramme && (
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
                Programme Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingProgramme.id ? `Edit: ${editingProgramme.title}` : 'Add New Programme'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingProgramme.title || ''}
                  onChange={(e) => setEditingProgramme({ ...editingProgramme, title: e.target.value })}
                  placeholder="e.g. Continental Leadership Academy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subtitle / Descriptor</label>
                  <input
                    type="text"
                    value={editingProgramme.subtitle || ''}
                    onChange={(e) => setEditingProgramme({ ...editingProgramme, subtitle: e.target.value })}
                    placeholder="e.g. Executive Governance & Ethical Leadership"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProgramme.category || ''}
                    onChange={(e) => setEditingProgramme({ ...editingProgramme, category: e.target.value })}
                    placeholder="e.g. Leadership Development"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProgramme.description || ''}
                  onChange={(e) => setEditingProgramme({ ...editingProgramme, description: e.target.value })}
                  placeholder="Brief summary of programmatic aims..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Curricular Overview</label>
                <textarea
                  rows={5}
                  value={editingProgramme.fullDetails || ''}
                  onChange={(e) => setEditingProgramme({ ...editingProgramme, fullDetails: e.target.value })}
                  placeholder="Full scope, course modules, cohort schedule..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Core Objectives (One per line)</label>
                <textarea
                  rows={4}
                  value={objectivesText}
                  onChange={(e) => setObjectivesText(e.target.value)}
                  placeholder="Objective 1&#10;Objective 2&#10;Objective 3"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Impact Metric</label>
                  <input
                    type="text"
                    value={editingProgramme.impactMetric || ''}
                    onChange={(e) => setEditingProgramme({ ...editingProgramme, impactMetric: e.target.value })}
                    placeholder="e.g. 5,000+ Young Leaders"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={editingProgramme.displayOrder || 1}
                    onChange={(e) => setEditingProgramme({ ...editingProgramme, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProgramme.published !== false}
                    onChange={(e) => setEditingProgramme({ ...editingProgramme, published: e.target.checked })}
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
                  {isSaving ? 'Saving...' : 'Save Programme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
