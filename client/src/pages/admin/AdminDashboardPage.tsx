import React from 'react';
import { Link } from 'react-router-dom';
import { fetchOverview } from '@/api/adminApi';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { useAdminQuery } from '@/components/admin/useAdminQuery';
import { formatReceived, statusLabel } from '@/components/admin/adminFormat';

export const AdminDashboardPage: React.FC = () => {
  const { admin } = useAdminAuth();
  const { data, error, loading, reload } = useAdminQuery(fetchOverview, []);

  const stats = data?.stats;
  const cards = [
    { label: 'New enquiries', value: stats?.newEnquiries, to: '/admin/enquiries?status=NEW' },
    { label: 'Unread messages', value: stats?.unreadMessages, to: '/admin/messages?status=unread' },
    { label: 'Enquiries this week', value: stats?.enquiriesThisWeek, to: '/admin/enquiries' },
    { label: 'All enquiries', value: stats?.totalEnquiries, to: '/admin/enquiries' },
  ];

  return (
    <>
      <h1 className="adm-title">Welcome back, {admin.name.split(' ')[0]}</h1>
      <p className="adm-lede">Here is what needs your attention.</p>

      {error && (
        <p className="adm-alert adm-alert--error" role="alert">
          {error}{' '}
          <button type="button" className="adm-link-btn" onClick={reload}>
            Try again
          </button>
        </p>
      )}

      <div className="adm-grid">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="adm-card adm-stat">
            <div className="adm-stat-num">{loading && c.value === undefined ? '…' : c.value ?? '–'}</div>
            <div className="adm-stat-label">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="adm-two">
        <section className="adm-card" aria-labelledby="recent-enq">
          <h2 className="adm-h2" id="recent-enq">
            Latest enquiries
          </h2>
          {data && data.recentEnquiries.length === 0 && <p className="adm-muted">No enquiries yet.</p>}
          <ul className="adm-list">
            {data?.recentEnquiries.map((e) => (
              <li key={e.id}>
                <div>
                  <Link to="/admin/enquiries">{e.contactName}</Link>
                  <small>
                    {e.eventType} · {e.location} · {formatReceived(e.createdAt)}
                  </small>
                </div>
                <span className={`adm-chip adm-chip--${e.status}`}>{statusLabel(e.status)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="adm-card" aria-labelledby="recent-msg">
          <h2 className="adm-h2" id="recent-msg">
            Latest messages
          </h2>
          {data && data.recentMessages.length === 0 && <p className="adm-muted">No messages yet.</p>}
          <ul className="adm-list">
            {data?.recentMessages.map((m) => (
              <li key={m.id}>
                <div>
                  <Link to="/admin/messages">{m.name}</Link>
                  <small>{formatReceived(m.createdAt)}</small>
                </div>
                {!m.isRead && <span className="adm-chip adm-chip--NEW">Unread</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default AdminDashboardPage;
