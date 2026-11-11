import type { AdminRole, EnquiryStatus } from '@/api/adminApi';

export const ENQUIRY_STATUS_OPTIONS: { value: EnquiryStatus; label: string }[] = [
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'QUOTED', label: 'Quoted' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export const isEnquiryStatus = (value: string | null): value is EnquiryStatus =>
  ENQUIRY_STATUS_OPTIONS.some((o) => o.value === value);

export const statusLabel = (status: string) =>
  ENQUIRY_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;

export const roleLabel = (role: AdminRole) =>
  ({ SUPER_ADMIN: 'Super admin', ADMIN: 'Admin', EDITOR: 'Editor' })[role] ?? role;

/** Editors can read and update; only admins can delete. */
export const canDelete = (role: AdminRole) => role === 'SUPER_ADMIN' || role === 'ADMIN';

const parse = (iso?: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
};

/** For a date the customer picked (no time of day). Shown in UTC so it never slips a day. */
export const formatEventDate = (iso?: string | null) => {
  const d = parse(iso);
  return d
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d)
    : '—';
};

/** For when something was received, in the viewer's own time zone. */
export const formatReceived = (iso?: string | null) => {
  const d = parse(iso);
  return d
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(d)
    : '—';
};

/** Builds a wa.me link from however the customer typed their number. Returns null if unusable. */
export const whatsappLink = (phone: string, text?: string) => {
  let digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`; // Indian mobile typed without country code
  if (digits.length < 11 || digits.length > 15) return null;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

export const mailtoLink = (email: string, subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;

export const PASSWORD_HINT = 'At least 10 characters, with a letter and a number.';

/** Same rules as the server, so people get instant feedback. The server still decides. */
export const passwordProblem = (password: string) => {
  if (password.length < 10) return 'Use at least 10 characters.';
  if (password.length > 72) return 'Use at most 72 characters.';
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return 'Include at least one letter and one number.';
  return null;
};
