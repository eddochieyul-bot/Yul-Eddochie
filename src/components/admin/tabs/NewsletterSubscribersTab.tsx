import React, { useEffect, useState } from 'react';
import { CmsSubscriber } from '../../../firebase/types';
import {
  subscribeToNewsletterSubscribers,
  updateSubscriberStatus,
  deleteSubscriber,
  addNewsletterSubscriber,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Mail,
  Search,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  UserPlus,
  Calendar,
  Globe,
  Loader2,
  X,
} from 'lucide-react';

export function NewsletterSubscribersTab() {
  const { user } = useAdminAuth();
  const [subscribers, setSubscribers] = useState<CmsSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');
  const [newEmail, setNewEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToNewsletterSubscribers((subs) => {
      setSubscribers(subs);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleToggleStatus = async (sub: CmsSubscriber) => {
    const newStatus = sub.status === 'active' ? 'unsubscribed' : 'active';
    try {
      await updateSubscriberStatus(sub.id, newStatus, user?.email || 'admin');
      setNotification(`Subscriber ${sub.email} marked as ${newStatus}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating subscriber: ' + err.message);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Permanently remove ${email} from subscribers?`)) return;
    try {
      await deleteSubscriber(id, user?.email || 'admin');
      setNotification(`Subscriber ${email} deleted.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error deleting subscriber: ' + err.message);
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setIsAdding(true);
    try {
      const res = await addNewsletterSubscriber(newEmail, 'AYLA Admin Manual Entry');
      if (res.success) {
        setNotification(res.message);
        setNewEmail('');
        setIsAddModalOpen(false);
      } else {
        alert(res.message);
      }
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert('Failed to enroll subscriber: ' + err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      alert('No subscribers to export.');
      return;
    }
    const headers = ['Email', 'Status', 'Source', 'Subscribed At', 'Unsubscribed At'];
    const rows = subscribers.map((s) => [
      `"${s.email}"`,
      `"${s.status}"`,
      `"${s.source || ''}"`,
      `"${s.subscribedAt || ''}"`,
      `"${s.unsubscribedAt || ''}"`,
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encoded = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `AYLA_Continental_Dispatch_Subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeCount = subscribers.filter((s) => s.status === 'active').length;
  const unsubCount = subscribers.filter((s) => s.status === 'unsubscribed').length;

  const filtered = subscribers
    .filter((s) => (statusFilter === 'all' ? true : s.status === statusFilter))
    .filter((s) => (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Continental Dispatch Community</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Newsletter Subscribers
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real subscriber roster with live subscriptions from the public AYLA website. Alerts dispatched to {OFFICIAL_ADMIN_EMAIL}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Subscriber</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Total Registered</div>
          <div className="text-2xl font-black text-white font-['Outfit'] mt-1">{subscribers.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-900/30">
          <div className="text-xs font-semibold text-emerald-400">Active Opt-ins</div>
          <div className="text-2xl font-black text-emerald-400 font-['Outfit'] mt-1">{activeCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Unsubscribed</div>
          <div className="text-2xl font-black text-slate-400 font-['Outfit'] mt-1">{unsubCount}</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subscribers by email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs w-full sm:w-auto">
          {(['all', 'active', 'unsubscribed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg capitalize transition-all ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading subscribers...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Mail className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No subscribers found</div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Email Address</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Subscribed Date</th>
                  <th className="px-5 py-3.5">Acquisition Source</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white font-mono">
                      {sub.email}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          sub.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sub.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'
                          }`}
                        />
                        <span>{sub.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {sub.source || 'Website Footer'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(sub)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          {sub.status === 'active' ? 'Deactivate' : 'Reactivate'}
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id, sub.email)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Newsletter Intake
              </span>
              <h2 className="text-lg font-bold font-['Outfit']">Enroll Subscriber</h2>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="subscriber@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  {isAdding ? 'Adding...' : 'Enroll'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
