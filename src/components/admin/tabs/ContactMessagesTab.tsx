import React, { useEffect, useState } from 'react';
import { CmsContactMessage } from '../../../firebase/types';
import {
  subscribeToContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  OFFICIAL_ADMIN_EMAIL,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  MessageSquare,
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Reply,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';

export function ContactMessagesTab() {
  const { user } = useAdminAuth();
  const [messages, setMessages] = useState<CmsContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToContactMessages((msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: 'unread' | 'read' | 'replied'
  ) => {
    try {
      await updateContactMessageStatus(id, status, user?.email || 'admin');
      setNotification(`Message marked as ${status}.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete message from ${name}?`)) return;
    try {
      await deleteContactMessage(id, user?.email || 'admin');
      setNotification(`Message deleted.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleReply = (msg: CmsContactMessage) => {
    handleUpdateStatus(msg.id, 'replied');
    const subject = encodeURIComponent(`Re: ${msg.subject || 'AYLA Secretariat Inquiry'}`);
    const body = encodeURIComponent(
      `Dear ${msg.fullName},\n\nThank you for contacting the African Youth Leadership Assembly (AYLA).\n\nIn reference to your message:\n"${msg.message}"\n\n\n---\nAYLA Continental Secretariat\n${OFFICIAL_ADMIN_EMAIL}`
    );
    window.location.href = `mailto:${msg.email}?subject=${subject}&body=${body}`;
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const filtered = messages
    .filter((m) => (statusFilter === 'all' ? true : m.status === statusFilter))
    .filter(
      (m) =>
        (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.message || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Continental Inquiries & Secretariat Mailbox</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            Contact Messages & Inquiries
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Incoming inquiries submitted through the AYLA public portal. Live alerts forwarded to {OFFICIAL_ADMIN_EMAIL}.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
          Unread Inquiries: <strong className="text-amber-400 font-bold">{unreadCount}</strong>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries by sender, email, subject, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs w-full sm:w-auto">
          {(['all', 'unread', 'read', 'replied'] as const).map((st) => (
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

      {/* List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading contact messages...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-white">No inquiries found</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                msg.status === 'unread'
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      msg.status === 'unread'
                        ? 'bg-amber-500 text-slate-950'
                        : msg.status === 'replied'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {msg.status}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{new Date(msg.submittedAt).toLocaleString()}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">
                    {msg.subject || 'AYLA General Inquiry'}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    From: <strong className="text-amber-400">{msg.name}</strong> &lt;{msg.email}&gt;
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.message}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-start pt-2 md:pt-0">
                <button
                  onClick={() => handleReply(msg)}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>

                {msg.status === 'unread' && (
                  <button
                    onClick={() => handleUpdateStatus(msg.id, 'read')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => handleDelete(msg.id, msg.name)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
