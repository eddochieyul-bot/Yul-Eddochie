import React, { useEffect, useState } from 'react';
import { CmsAdminProfile } from '../../../firebase/types';
import {
  subscribeToAdmins,
  saveAdminUser,
  revokeAdminUser,
  fetchAuditLogs,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  CheckCircle2,
  Clock,
  Shield,
  Search,
  History,
  AlertCircle,
  X,
} from 'lucide-react';

export function AdminUsersTab() {
  const { user, isSuperAdmin } = useAdminAuth();
  const [admins, setAdmins] = useState<CmsAdminProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: '',
    displayName: '',
    role: 'editor' as 'super_admin' | 'admin' | 'editor',
  });

  useEffect(() => {
    const unsub = subscribeToAdmins((adm) => {
      setAdmins(adm);
      setLoading(false);
    });
    fetchAuditLogs(20).then(setAuditLogs);
    return () => unsub();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;

    try {
      await saveAdminUser(
        {
          email: form.email.toLowerCase().trim(),
          displayName: form.displayName || form.email.split('@')[0],
          role: form.role,
          active: true,
        },
        user?.email || 'admin'
      );
      setIsModalOpen(false);
      setForm({ email: '', displayName: '', role: 'editor' });
      setNotification(`Administrator ${form.email} granted ${form.role} privileges.`);
      setTimeout(() => setNotification(null), 3000);
      fetchAuditLogs(20).then(setAuditLogs);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleRevoke = async (admin: CmsAdminProfile) => {
    if (admin.email === OFFICIAL_ADMIN_EMAIL) {
      alert('Cannot revoke the primary institutional super admin account.');
      return;
    }
    if (!window.confirm(`Revoke administrative access for ${admin.email}?`)) return;

    try {
      const targetId = admin.id || admin.uid || admin.email.replace(/[^a-zA-Z0-9]/g, '_');
      await revokeAdminUser(targetId, admin.email, user?.email || 'admin');
      setNotification(`Administrative privileges revoked for ${admin.email}.`);
      setTimeout(() => setNotification(null), 3000);
      fetchAuditLogs(20).then(setAuditLogs);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Admin Access & Governance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Authorize secretariat officers, assign editorial roles, and audit security actions.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Authorize Admin</span>
          </button>
        )}
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin List */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Authorized Secretariat Administrators</span>
          </h2>
          <span className="text-xs text-slate-400">
            {admins.length} accounts authorized
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading administrators...</div>
          ) : (
            admins.map((adm) => (
              <div
                key={adm.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {adm.displayName || adm.email}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        adm.role === 'super_admin'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                          : adm.role === 'admin'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {adm.role.replace('_', ' ')}
                    </span>
                    {!adm.active && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-400">
                        Deactivated
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{adm.email}</div>
                  {adm.lastLogin && (
                    <div className="text-[11px] text-slate-500">
                      Last access: {new Date(adm.lastLogin).toLocaleString()}
                    </div>
                  )}
                </div>

                {isSuperAdmin && adm.email !== OFFICIAL_ADMIN_EMAIL && adm.email !== user?.email && (
                  <button
                    onClick={() => handleRevoke(adm)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revoke</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <span>Administrative Audit Log</span>
          </h2>
          <span className="text-[11px] text-slate-400">Immutable governance records</span>
        </div>

        <div className="divide-y divide-slate-800/40 text-xs max-h-80 overflow-y-auto">
          {auditLogs.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No recent audit events logged.</div>
          ) : (
            auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-white">{log.action}</span>{' '}
                  <span className="text-slate-400">on</span>{' '}
                  <span className="text-amber-400 font-medium">{log.entity}</span>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    By: {log.performedBy}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 text-right whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Authorize Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Access Provisioning
              </span>
              <h2 className="text-lg font-bold font-['Outfit']">Authorize Administrator</h2>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Admin Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="officer@aylafrica.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Display Name / Title</label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  placeholder="Secretariat Officer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Permissions</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none text-xs"
                >
                  <option value="editor">Editor (Publish News, Events, Gallery, Resources)</option>
                  <option value="admin">Administrator (Full Content & Membership)</option>
                  <option value="super_admin">Super Administrator (Full System & User Control)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
