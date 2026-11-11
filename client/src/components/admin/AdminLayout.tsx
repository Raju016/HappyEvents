import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { AdminApiError, AdminUser, clearToken, fetchMe, getToken } from '@/api/adminApi';
import { AdminAuthContext } from './AdminAuthContext';
import { roleLabel } from './adminFormat';
import { useAdminPageMeta } from './useAdminPageMeta';
import './admin.css';

const NAV = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/enquiries', label: 'Enquiries' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/account', label: 'Account' },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  useAdminPageMeta('Admin');

  const logout = useCallback(() => {
    clearToken();
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof AdminApiError && error.status === 401) {
        logout();
        return 'Your session has ended. Please sign in again.';
      }
      return error instanceof Error ? error.message : 'Something went wrong.';
    },
    [logout]
  );

  useEffect(() => {
    if (!getToken()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    let cancelled = false;
    fetchMe()
      .then((me) => {
        if (!cancelled) {
          setAdmin(me);
          setChecking(false);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        // Only a rejected session signs the person out. A network blip should not.
        if (err instanceof AdminApiError && err.status === 401) logout();
        else setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate, logout]);

  const value = useMemo(() => (admin ? { admin, logout, handleError } : null), [admin, logout, handleError]);

  if (checking) {
    return (
      <div className="adm-root adm-center">
        <p className="adm-muted" role="status">
          Checking your session…
        </p>
      </div>
    );
  }

  if (!value) {
    return (
      <div className="adm-root adm-center">
        <div className="adm-card" style={{ maxWidth: 420, textAlign: 'center' }}>
          <p>We couldn&apos;t reach the server to check your session.</p>
          <button type="button" className="adm-btn adm-btn--primary" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={value}>
      <div className="adm-root">
        <a href="#adm-main" className="adm-skip">
          Skip to content
        </a>
        <header className="adm-header">
          <div className="adm-brand">
            <span className="adm-brand-name">Happy Events</span>
            <span className="adm-brand-sub">Studio admin</span>
          </div>
          <nav className="adm-nav" aria-label="Admin sections">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `adm-nav-link${isActive ? ' is-active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="adm-user">
            <span className="adm-user-text">
              {value.admin.name}
              <small>{roleLabel(value.admin.role)}</small>
            </span>
            <button type="button" className="adm-icon-btn" onClick={logout} aria-label="Sign out" title="Sign out">
              <LogOut size={18} aria-hidden />
            </button>
          </div>
        </header>
        <main id="adm-main" className="adm-main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </AdminAuthContext.Provider>
  );
};

export default AdminLayout;
