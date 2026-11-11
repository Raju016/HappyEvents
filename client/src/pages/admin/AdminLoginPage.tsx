import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { login } from '@/api/adminApi';
import { useAdminPageMeta } from '@/components/admin/useAdminPageMeta';
import '@/components/admin/admin.css';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useAdminPageMeta('Sign in');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in. Please try again.');
      setBusy(false);
    }
  };

  return (
    <div className="adm-root adm-center">
      <div className="adm-login">
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <Lock size={22} aria-hidden style={{ color: 'var(--adm-gold-deep)' }} />
        </div>
        <h1>Studio sign in</h1>
        <p className="adm-lede">For the Happy Events team only.</p>

        <form className="adm-card" onSubmit={submit} noValidate>
          {error && (
            <p className="adm-alert adm-alert--error" role="alert">
              {error}
            </p>
          )}

          <div className="adm-field">
            <label className="adm-label" htmlFor="adm-email">
              Email
            </label>
            <input
              id="adm-email"
              className="adm-input"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="adm-field">
            <label className="adm-label" htmlFor="adm-password">
              Password
            </label>
            <div className="adm-pw-row">
              <input
                id="adm-password"
                className="adm-input"
                type={show ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="adm-icon-btn"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                aria-pressed={show}
              >
                {show ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
              </button>
            </div>
          </div>

          <button type="submit" className="adm-btn adm-btn--primary" style={{ width: '100%' }} disabled={busy || !email || !password}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
