import React, { useEffect, useState } from 'react';
import { CmsEvent } from '../../../firebase/types';
import {
  subscribeToEvents,
  saveEvent,
  deleteEvent,
  uploadImageFile,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { SendEventNewsletterModal } from './SendEventNewsletterModal';
import {
  Calendar,
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
  Clock,
  ExternalLink,
  Mail,
  Sparkles,
  X,
} from 'lucide-react';

export function EventsTab() {
  const { user } = useAdminAuth();
  const [events, setEvents] = useState<CmsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'published' | 'draft'>('all');
  const [editingEvent, setEditingEvent] = useState<Partial<CmsEvent> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletterEvent, setNewsletterEvent] = useState<CmsEvent | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToEvents((items) => {
      setEvents(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent({
      title: '',
      description: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00 GMT',
      endTime: '13:00 GMT',
      location: 'Virtual Assembly & Continental Hubs',
      eventType: 'hybrid',
      registrationUrl: '',
      organizer: 'AYLA Continental Secretariat',
      contactInfo: 'aylafrica.org@gmail.com',
      featured: false,
      published: true,
      status: 'Registration Open',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: CmsEvent) => {
    setEditingEvent({ ...event });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (event: CmsEvent) => {
    try {
      await saveEvent({ ...event, published: !event.published }, user?.email || 'admin');
      setNotification(`Event "${event.title}" is now ${!event.published ? 'Published' : 'Unpublished'}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to update event publish status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the event: "${title}"?`)) {
      return;
    }
    try {
      await deleteEvent(id, user?.email || 'admin');
      setNotification(`Event "${title}" removed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Failed to delete event: ' + err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file, 'event-posters');
      setEditingEvent((prev) => (prev ? { ...prev, image: url } : prev));
    } catch (err: any) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title || !editingEvent.date) {
      alert('Please provide Event Title and Date.');
      return;
    }

    setIsSaving(true);
    try {
      await saveEvent(editingEvent, user?.email || 'admin');
      setIsModalOpen(false);
      setEditingEvent(null);
      setNotification(`Event "${editingEvent.title}" saved and updated live on the website!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Error saving event: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredEvents = events
    .filter((e) => {
      if (filterType === 'published') return e.published;
      if (filterType === 'draft') return !e.published;
      if (filterType === 'upcoming') {
        return new Date(e.date).getTime() >= new Date().setHours(0, 0, 0, 0);
      }
      return true;
    })
    .filter((e) =>
      (e.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Continental Assemblies & Convenings</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Events Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create and schedule assemblies, policy dialogues, and youth summits. Broadcast updates to members via newsletter dispatch.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title or venue..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs w-full sm:w-auto">
          {(['all', 'upcoming', 'published', 'draft'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg capitalize transition-all ${
                filterType === type
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No events found matching your criteria</div>
          <p className="text-xs text-slate-400">Click "Create New Event" to add an event.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                ev.published
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {ev.eventType}
                      </span>
                      {ev.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Featured</span>
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ev.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ev.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-['Outfit'] line-clamp-1">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ev.startTime || '10:00 GMT'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="line-clamp-1">{ev.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              {/* Action Bar with "SEND TO MEMBERS" */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setNewsletterEvent(ev)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>SEND TO MEMBERS</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(ev)}
                    title={ev.published ? 'Unpublish' : 'Publish'}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {ev.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(ev)}
                    title="Edit event"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id, ev.title)}
                    title="Delete event"
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
      {isModalOpen && editingEvent && (
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
                Event Editor
              </span>
              <h2 className="text-xl font-extrabold font-['Outfit']">
                {editingEvent.id ? `Edit: ${editingEvent.title || 'Event'}` : 'Schedule New Event'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="e.g. 5th All-African Youth Continental Assembly"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Time</label>
                  <input
                    type="text"
                    value={editingEvent.startTime || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                    placeholder="10:00 GMT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Format</label>
                  <select
                    value={editingEvent.eventType || 'hybrid'}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        eventType: e.target.value as 'online' | 'physical' | 'hybrid',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="online">Online Webinar / Stream</option>
                    <option value="physical">Physical Assembly</option>
                    <option value="hybrid">Hybrid (Physical & Virtual)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location / Venue</label>
                <input
                  type="text"
                  value={editingEvent.location || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  placeholder="e.g. African Union Headquarters, Addis Ababa & Virtual"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Poster / Banner Image</label>
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-700">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Banner'}</span>
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
                    value={editingEvent.image || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Agenda *</label>
                <textarea
                  rows={4}
                  required
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  placeholder="Outline purpose, keynote delegates, and session deliverables..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Registration Link (URL)</label>
                  <input
                    type="url"
                    value={editingEvent.registrationUrl || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, registrationUrl: e.target.value })}
                    placeholder="https://docs.google.com/... or webinar link"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Organizer / Secretariat Desk</label>
                  <input
                    type="text"
                    value={editingEvent.organizer || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, organizer: e.target.value })}
                    placeholder="AYLA Continental Secretariat"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingEvent.featured || false}
                    onChange={(e) => setEditingEvent({ ...editingEvent, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                  />
                  <span className="text-xs text-white">Highlight as Featured Event</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingEvent.published !== false}
                    onChange={(e) => setEditingEvent({ ...editingEvent, published: e.target.checked })}
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
                      <span>Saving Event...</span>
                    </>
                  ) : (
                    <span>Save Event</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Event Newsletter Modal */}
      {newsletterEvent && (
        <SendEventNewsletterModal
          event={newsletterEvent}
          onClose={() => setNewsletterEvent(null)}
          onSuccess={(msg) => {
            setNotification(msg);
            setTimeout(() => setNotification(null), 5000);
          }}
        />
      )}
    </div>
  );
}
