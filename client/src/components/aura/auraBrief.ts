// Pure helpers for Aura's event brief and WhatsApp handoff. No React in here,
// so everything is easy to test.

export const PROFILE_FIELDS = [
  'eventType',
  'preferredDate',
  'city',
  'venue',
  'guestCount',
  'budget',
  'theme',
  'colorPalette',
  'decor',
  'catering',
  'entertainment',
  'specialRequests',
  'customerName',
  'customerContact',
] as const;

export type ProfileField = (typeof PROFILE_FIELDS)[number];
export type EventProfile = Partial<Record<ProfileField, string>>;

export interface FieldMeta {
  key: ProfileField;
  label: string;
  /** Counts toward "still to confirm" when empty. */
  core: boolean;
  multiline?: boolean;
  group: 'event' | 'you';
}

export const FIELD_META: FieldMeta[] = [
  { key: 'eventType', label: 'Event type', core: true, group: 'event' },
  { key: 'preferredDate', label: 'Preferred date', core: true, group: 'event' },
  { key: 'city', label: 'City', core: true, group: 'event' },
  { key: 'venue', label: 'Venue', core: true, group: 'event' },
  { key: 'guestCount', label: 'Guest count', core: true, group: 'event' },
  { key: 'budget', label: 'Budget', core: true, group: 'event' },
  { key: 'theme', label: 'Theme', core: true, group: 'event' },
  { key: 'colorPalette', label: 'Colour palette', core: true, group: 'event' },
  { key: 'decor', label: 'Decor preferences', core: false, multiline: true, group: 'event' },
  { key: 'catering', label: 'Catering', core: false, group: 'event' },
  { key: 'entertainment', label: 'Entertainment', core: false, group: 'event' },
  { key: 'specialRequests', label: 'Special requests', core: false, multiline: true, group: 'event' },
  { key: 'customerName', label: 'Your name', core: false, group: 'you' },
  { key: 'customerContact', label: 'Your contact (optional)', core: false, group: 'you' },
];

export const MAX_FIELD_LENGTH = 300;

export const isUnset = (value?: string | null) =>
  !value || value.trim() === '' || /^not decided( yet)?$/i.test(value.trim());

/** Fields that have a real, customer-supplied value. */
export const filledFields = (profile: EventProfile) =>
  FIELD_META.filter((f) => !isUnset(profile[f.key]));

/** Labels of core details still missing or undecided. */
export const stillToConfirm = (profile: EventProfile) =>
  FIELD_META.filter((f) => f.core && isUnset(profile[f.key])).map((f) => f.label);

const clean = (value: string) =>
  value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_FIELD_LENGTH);

/** The customer-approved message that goes to WhatsApp. Only filled details are included. */
export const formatBriefText = (profile: EventProfile) => {
  const lines = ['Hello Happy Events team,', '', "I'd like to enquire about planning an event. Here are my details:", ''];

  for (const meta of FIELD_META) {
    const value = profile[meta.key];
    if (isUnset(value)) continue;
    const label = meta.key === 'customerName' ? 'Name' : meta.key === 'customerContact' ? 'Contact' : meta.label;
    lines.push(`${label}: ${clean(value as string)}`);
  }

  const missing = stillToConfirm(profile);
  if (missing.length > 0) {
    lines.push('', `Still to confirm: ${missing.join(', ')}`);
  }

  lines.push('', 'Could you please follow up with me? Thank you!');
  return lines.join('\n');
};

/** Digits only, e.g. "+91 99086 83101" -> "919908683101". */
export const sanitizeWhatsAppNumber = (value: string) => value.replace(/\D/g, '');

export const buildWhatsAppUrl = (number: string, text: string) =>
  `https://wa.me/${sanitizeWhatsAppNumber(number)}?text=${encodeURIComponent(text)}`;
