import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';
import {
  EnquiryStatus,
  deleteEnquiry,
  fetchEnquiries,
  fetchEnquiry,
  updateEnquiry,
} from '@/api/adminApi';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { useAdminQuery } from '@/components/admin/useAdminQuery';
import { useDebounced } from '@/components/admin/useDebounced';
import AdminPager from '@/components/admin/AdminPager';
import {
  ENQUIRY_STATUS_OPTIONS,
  canDelete,
  formatEventDate,
  formatReceived,
  isEnquiryStatus,
  mailtoLink,
  statusLabel,
  whatsappLink,
} from '@/components/admin/adminFormat';

const PAGE_SIZE = 15;

const EnquiryDrawer: React.FC<{ id: string; onClose: () => void; onChanged: () => void }> = ({ id, onClose, onChanged }) => {
  const { admin, handleError } = useAdminAuth();
  const { data, error, loading, reload } = useAdminQuery(() => fetchEnquiry(id), [id]);

  const [status, setStatus] = useState<EnquiryStatus>('NEW');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<Element | null>(document.activeElement);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setNotes(data.internalNotes ?? '');
      setAssignedTo(data.assignedTo ?? '');
    }
  }, [data]);

  useEffect(() => {
    headingRef.current?.focus();
    const opener = openerRef.current as HTMLElement | null;
    return () => opener?.focus?.();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return onClose();
    if (e.key !== 'Tab' || !drawerRef.current) return;
    const items = drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select, textarea, input');
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const save = async () => {
    setBusy(true);
    setMessage(null);
    try {
      await updateEnquiry(id, { status, internalNotes: notes, assignedTo: assignedTo.trim() || null });
      setMessage({ kind: 'ok', text: 'Saved.' });
      onChanged();
      reload();
    } catch (err) {
      setMessage({ kind: 'error', text: handleError(err) });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await deleteEnquiry(id);
      onChanged();
      onClose();
    } catch (err) {
      setMessage({ kind: 'error', text: handleError(err) });
      setConfirmDelete(false);
      setBusy(false);
    }
  };

  const dirty =
    !!data && (status !== data.status || notes !== (data.internalNotes ?? '') || assignedTo !== (data.assignedTo ?? ''));

  return (
    <>
      <div className="adm-backdrop" onClick={onClose} aria-hidden />
      <div ref={drawerRef} className="adm-drawer" role="dialog" aria-modal="true" aria-labelledby="enq-title" onKeyDown={onKeyDown}>
        <div className="adm-drawer-head">
          <div>
            <h2 id="enq-title" ref={headingRef} tabIndex={-1}>
              {data ? data.contactName : 'Enquiry'}
            </h2>
            {data && <div className="adm-muted" style={{ fontSize: 13 }}>{data.enquiryNumber}</div>}
          </div>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="Close details">
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="adm-drawer-body">
          {loading && !data && <p className="adm-muted" role="status">Loading…</p>}
          {error && !data && (
            <p className="adm-alert adm-alert--error" role="alert">
              {error}
            </p>
          )}

          {data && (
            <>
              <div className="adm-actions" style={{ marginBottom: 18 }}>
                <a className="adm-btn adm-btn--small" href={`tel:${data.contactPhone}`}>
                  <Phone size={14} aria-hidden /> Call
                </a>
                <a className="adm-btn adm-btn--small" href={mailtoLink(data.contactEmail, `Your Happy Events enquiry ${data.enquiryNumber}`)}>
                  <Mail size={14} aria-hidden /> Email
                </a>
                {whatsappLink(data.contactPhone, `Hello ${data.contactName}, this is Happy Events about your enquiry ${data.enquiryNumber}.`) && (
                  <a
                    className="adm-btn adm-btn--small"
                    href={whatsappLink(data.contactPhone, `Hello ${data.contactName}, this is Happy Events about your enquiry ${data.enquiryNumber}.`)!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={14} aria-hidden /> WhatsApp
                  </a>
                )}
              </div>

              <dl className="adm-dl">
                <div><dt>Received</dt><dd>{formatReceived(data.createdAt)}</dd></div>
                <div><dt>Email</dt><dd>{data.contactEmail}</dd></div>
                <div><dt>Phone</dt><dd>{data.contactPhone}</dd></div>
                <div><dt>Event</dt><dd>{data.eventType}</dd></div>
                <div><dt>Event date</dt><dd>{formatEventDate(data.eventDate)}</dd></div>
                <div><dt>Location</dt><dd>{data.location}</dd></div>
                <div><dt>Guests</dt><dd>{data.guestCount ?? '—'}</dd></div>
                <div><dt>Budget</dt><dd>{data.budgetRange ?? '—'}</dd></div>
                <div>
                  <dt>Services</dt>
                  <dd>{data.services.length ? data.services.map((s) => s.name).join(', ') : 'See notes below'}</dd>
                </div>
              </dl>

              {data.specialNotes && (
                <>
                  <h3 className="adm-section" style={{ marginTop: 0 }}>From the customer</h3>
                  <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', margin: '0 0 8px' }}>{data.specialNotes}</p>
                </>
              )}

              <h3 className="adm-section">Your handling</h3>
              {message && (
                <p className={`adm-alert adm-alert--${message.kind}`} role={message.kind === 'error' ? 'alert' : 'status'}>
                  {message.text}
                </p>
              )}
              <div className="adm-field">
                <label className="adm-label" htmlFor="enq-status">Status</label>
                <select id="enq-status" className="adm-select" value={status} onChange={(e) => setStatus(e.target.value as EnquiryStatus)}>
                  {ENQUIRY_STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="enq-assigned">Handled by</label>
                <input id="enq-assigned" className="adm-input" maxLength={100} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="enq-notes">Private notes (customers never see these)</label>
                <textarea id="enq-notes" className="adm-textarea" maxLength={5000} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="adm-actions">
                <button type="button" className="adm-btn adm-btn--primary" onClick={save} disabled={busy || !dirty}>
                  {busy ? 'Saving…' : 'Save changes'}
                </button>
                {canDelete(admin.role) && !confirmDelete && (
                  <button type="button" className="adm-btn adm-btn--danger" onClick={() => setConfirmDelete(true)} disabled={busy}>
                    Delete enquiry
                  </button>
                )}
              </div>
              {confirmDelete && (
                <div className="adm-confirm" role="alert" style={{ marginTop: 14 }}>
                  <span>Delete this enquiry permanently?</span>
                  <button type="button" className="adm-btn adm-btn--small adm-btn--danger" onClick={remove} disabled={busy}>
                    Yes, delete
                  </button>
                  <button type="button" className="adm-btn adm-btn--small" onClick={() => setConfirmDelete(false)}>
                    Keep it
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const AdminEnquiriesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('status');
  const [status, setStatus] = useState<string>(isEnquiryStatus(initial) ? initial : 'all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const q = useDebounced(search.trim());

  const { data, error, loading, reload } = useAdminQuery(
    () => fetchEnquiries({ status: status === 'all' ? undefined : status, q, page, limit: PAGE_SIZE }),
    [status, q, page]
  );

  useEffect(() => setPage(1), [q]);
  const closeDrawer = useCallback(() => setOpenId(null), []);

  return (
    <>
      <h1 className="adm-title">Enquiries</h1>
      <p className="adm-lede">Event requests from the Plan Your Event form.</p>

      <div className="adm-filters">
        <label className="adm-sr-only" htmlFor="enq-search" style={{ position: 'absolute', left: -9999 }}>Search enquiries</label>
        <input id="enq-search" className="adm-input" type="search" placeholder="Search name, phone, email, reference…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <label htmlFor="enq-filter" style={{ position: 'absolute', left: -9999 }}>Filter by status</label>
        <select
          id="enq-filter"
          className="adm-select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All statuses</option>
          {ENQUIRY_STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="adm-alert adm-alert--error" role="alert">
          {error}{' '}
          <button type="button" className="adm-link-btn" onClick={reload}>Try again</button>
        </p>
      )}

      {loading && !data && <p className="adm-muted" role="status">Loading…</p>}

      {data && data.items.length === 0 && (
        <div className="adm-card adm-empty">{q || status !== 'all' ? 'No enquiries match those filters.' : 'No enquiries yet. New ones will appear here.'}</div>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="adm-table-wrap" aria-busy={loading}>
            <table className="adm-table">
              <caption className="adm-sr-only" style={{ position: 'absolute', left: -9999 }}>Enquiries, newest first</caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Event</th>
                  <th scope="col">Event date</th>
                  <th scope="col">Location</th>
                  <th scope="col">Status</th>
                  <th scope="col">Received</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((e) => (
                  <tr key={e.id} className="is-clickable" onClick={() => setOpenId(e.id)}>
                    <td data-label="Name">
                      <button type="button" className="adm-link-btn" onClick={(ev) => { ev.stopPropagation(); setOpenId(e.id); }}>
                        {e.contactName}
                      </button>
                      <div className="adm-muted" style={{ fontSize: 12 }}>{e.enquiryNumber}</div>
                    </td>
                    <td data-label="Event">{e.eventType}</td>
                    <td data-label="Event date">{formatEventDate(e.eventDate)}</td>
                    <td data-label="Location">{e.location}</td>
                    <td data-label="Status"><span className={`adm-chip adm-chip--${e.status}`}>{statusLabel(e.status)}</span></td>
                    <td data-label="Received">{formatReceived(e.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdminPager page={data.page} totalPages={data.totalPages} total={data.total} onPage={setPage} />
        </>
      )}

      {openId && <EnquiryDrawer id={openId} onClose={closeDrawer} onChanged={reload} />}
    </>
  );
};

export default AdminEnquiriesPage;
