import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { MessageRow, deleteMessage, fetchMessages, updateMessage } from '@/api/adminApi';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { useAdminQuery } from '@/components/admin/useAdminQuery';
import { useDebounced } from '@/components/admin/useDebounced';
import AdminPager from '@/components/admin/AdminPager';
import { canDelete, formatEventDate, formatReceived, mailtoLink, whatsappLink } from '@/components/admin/adminFormat';

const TABS = [
  { value: 'active', label: 'Inbox' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
  { value: 'archived', label: 'Archived' },
  { value: 'all', label: 'All' },
];

const PAGE_SIZE = 15;

export const AdminMessagesPage: React.FC = () => {
  const { admin, handleError } = useAdminAuth();
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('status');
  const [status, setStatus] = useState(TABS.some((t) => t.value === initial) ? (initial as string) : 'active');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const q = useDebounced(search.trim());

  const { data, error, loading, reload } = useAdminQuery(
    () => fetchMessages({ status, q, page, limit: PAGE_SIZE }),
    [status, q, page]
  );

  useEffect(() => setPage(1), [q]);

  const act = async (id: string, run: () => Promise<unknown>) => {
    setBusyId(id);
    setActionError(null);
    try {
      await run();
      setConfirmId(null);
      reload();
    } catch (err) {
      setActionError(handleError(err));
    } finally {
      setBusyId(null);
    }
  };

  const card = (m: MessageRow) => {
    const wa = whatsappLink(m.phone, `Hello ${m.name}, this is Happy Events replying to your message.`);
    const busy = busyId === m.id;
    return (
      <article key={m.id} className={`adm-card adm-msg${m.isRead ? '' : ' is-unread'}`} aria-label={`Message from ${m.name}`}>
        <div className="adm-msg-head">
          {!m.isRead && <span className="adm-dot" aria-hidden />}
          <span className="adm-msg-name">{m.name}</span>
          {!m.isRead && <span className="adm-chip adm-chip--NEW">Unread</span>}
          {m.isArchived && <span className="adm-chip">Archived</span>}
          <span className="adm-msg-meta">{formatReceived(m.createdAt)}</span>
        </div>
        <div className="adm-msg-meta" style={{ marginBottom: 10 }}>
          {m.email} · {m.phone}
          {m.eventType ? ` · ${m.eventType}` : ''}
          {m.eventDate ? ` · ${formatEventDate(m.eventDate)}` : ''}
          {m.location ? ` · ${m.location}` : ''}
        </div>
        <p className="adm-msg-body">{m.message}</p>

        <div className="adm-actions">
          <a className="adm-btn adm-btn--small" href={mailtoLink(m.email, 'Your message to Happy Events')}>
            <Mail size={14} aria-hidden /> Reply by email
          </a>
          {wa && (
            <a className="adm-btn adm-btn--small" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} aria-hidden /> WhatsApp
            </a>
          )}
          <button type="button" className="adm-btn adm-btn--small" disabled={busy} onClick={() => act(m.id, () => updateMessage(m.id, { isRead: !m.isRead }))}>
            {m.isRead ? 'Mark unread' : 'Mark read'}
          </button>
          <button type="button" className="adm-btn adm-btn--small" disabled={busy} onClick={() => act(m.id, () => updateMessage(m.id, { isArchived: !m.isArchived }))}>
            {m.isArchived ? 'Unarchive' : 'Archive'}
          </button>
          {canDelete(admin.role) && confirmId !== m.id && (
            <button type="button" className="adm-btn adm-btn--small adm-btn--danger" disabled={busy} onClick={() => setConfirmId(m.id)}>
              Delete
            </button>
          )}
        </div>
        {confirmId === m.id && (
          <div className="adm-confirm" role="alert" style={{ marginTop: 12 }}>
            <span>Delete this message permanently?</span>
            <button type="button" className="adm-btn adm-btn--small adm-btn--danger" disabled={busy} onClick={() => act(m.id, () => deleteMessage(m.id))}>
              Yes, delete
            </button>
            <button type="button" className="adm-btn adm-btn--small" onClick={() => setConfirmId(null)}>
              Keep it
            </button>
          </div>
        )}
      </article>
    );
  };

  return (
    <>
      <h1 className="adm-title">Messages</h1>
      <p className="adm-lede">Messages from the Contact page.</p>

      <div className="adm-tabs" role="group" aria-label="Filter messages">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            className="adm-tab"
            aria-pressed={status === t.value}
            onClick={() => {
              setStatus(t.value);
              setPage(1);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="adm-filters">
        <label htmlFor="msg-search" style={{ position: 'absolute', left: -9999 }}>Search messages</label>
        <input id="msg-search" className="adm-input" type="search" placeholder="Search name, email, phone, message…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {(error || actionError) && (
        <p className="adm-alert adm-alert--error" role="alert">
          {actionError ?? error}{' '}
          <button type="button" className="adm-link-btn" onClick={() => { setActionError(null); reload(); }}>Try again</button>
        </p>
      )}

      {loading && !data && <p className="adm-muted" role="status">Loading…</p>}

      {data && data.items.length === 0 && (
        <div className="adm-card adm-empty">{q || status !== 'active' ? 'No messages match.' : 'Your inbox is empty. New messages will appear here.'}</div>
      )}

      {data && data.items.length > 0 && (
        <div aria-busy={loading}>
          {data.items.map(card)}
          <AdminPager page={data.page} totalPages={data.totalPages} total={data.total} onPage={setPage} />
        </div>
      )}
    </>
  );
};

export default AdminMessagesPage;
