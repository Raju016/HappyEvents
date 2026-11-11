import React, { useState } from 'react';
import { AdminApiError, changePassword } from '@/api/adminApi';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { PASSWORD_HINT, passwordProblem, roleLabel } from '@/components/admin/adminFormat';

export const AdminAccountPage: React.FC = () => {
  const { admin, handleError } = useAdminAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [again, setAgain] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDone(false);
    setError(null);

    const problem = passwordProblem(next);
    if (problem) return setError(problem);
    if (next !== again) return setError('The new passwords do not match.');
    if (next === current) return setError('Choose a password different from your current one.');

    setBusy(true);
    try {
      await changePassword(current, next);
      setCurrent('');
      setNext('');
      setAgain('');
      setDone(true);
    } catch (err) {
      // A wrong current password is a 400 and shows here. A real 401 signs the person out.
      setError(err instanceof AdminApiError && err.status === 401 ? handleError(err) : (err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h1 className="adm-title">Your account</h1>
      <p className="adm-lede">Your details and password.</p>

      <div className="adm-two">
        <section className="adm-card" aria-labelledby="acc-details">
          <h2 className="adm-h2" id="acc-details">
            Details
          </h2>
          <dl className="adm-dl" style={{ marginBottom: 0 }}>
            <div>
              <dt>Name</dt>
              <dd>{admin.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{admin.email}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{roleLabel(admin.role)}</dd>
            </div>
          </dl>
        </section>

        <form className="adm-card" onSubmit={submit} aria-labelledby="acc-pw" noValidate>
          <h2 className="adm-h2" id="acc-pw">
            Change password
          </h2>
          {error && (
            <p className="adm-alert adm-alert--error" role="alert">
              {error}
            </p>
          )}
          {done && (
            <p className="adm-alert adm-alert--ok" role="status">
              Password changed.
            </p>
          )}

          <div className="adm-field">
            <label className="adm-label" htmlFor="pw-current">
              Current password
            </label>
            <input id="pw-current" className="adm-input" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pw-new">
              New password
            </label>
            <input id="pw-new" className="adm-input" type="password" autoComplete="new-password" aria-describedby="pw-hint" value={next} onChange={(e) => setNext(e.target.value)} />
            <p className="adm-hint" id="pw-hint">
              {PASSWORD_HINT}
            </p>
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pw-again">
              Repeat new password
            </label>
            <input id="pw-again" className="adm-input" type="password" autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} />
          </div>
          <button type="submit" className="adm-btn adm-btn--primary" disabled={busy || !current || !next || !again}>
            {busy ? 'Saving…' : 'Change password'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAccountPage;
