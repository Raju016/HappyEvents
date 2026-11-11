import { describe, it, expect } from 'vitest';
import {
  canDelete,
  formatEventDate,
  formatReceived,
  isEnquiryStatus,
  mailtoLink,
  passwordProblem,
  statusLabel,
  whatsappLink,
} from '../components/admin/adminFormat';

describe('whatsappLink', () => {
  it.each([
    ['9908683101', 'https://wa.me/919908683101'],
    ['99086 83101', 'https://wa.me/919908683101'],
    ['+91 99086 83101', 'https://wa.me/919908683101'],
    ['09908683101', 'https://wa.me/919908683101'],
    ['91-9908683101', 'https://wa.me/919908683101'],
    ['+1 (415) 555-0132', 'https://wa.me/14155550132'],
  ])('normalises %s', (input, expected) => expect(whatsappLink(input)).toBe(expected));

  it.each(['', '12345', 'abc', '1'.repeat(16)])('returns null for unusable number %j', (input) => {
    expect(whatsappLink(input)).toBeNull();
  });

  it('encodes an optional message', () => {
    expect(whatsappLink('9908683101', 'Hi & hello\nThanks')).toBe('https://wa.me/919908683101?text=Hi%20%26%20hello%0AThanks');
  });
});

describe('dates', () => {
  it('keeps a picked event date on the same calendar day', () => {
    expect(formatEventDate('2026-12-12T00:00:00.000Z')).toBe('12 Dec 2026');
  });
  it('falls back for missing or invalid dates', () => {
    expect(formatEventDate(null)).toBe('—');
    expect(formatEventDate('garbage')).toBe('—');
    expect(formatReceived(undefined)).toBe('—');
    expect(formatReceived('2026-10-27T10:30:00.000Z')).toMatch(/2026/);
  });
});

describe('helpers', () => {
  it('knows the enquiry statuses', () => {
    expect(isEnquiryStatus('QUOTED')).toBe(true);
    expect(isEnquiryStatus('quoted')).toBe(false);
    expect(isEnquiryStatus(null)).toBe(false);
    expect(statusLabel('IN_PROGRESS')).toBe('In progress');
    expect(statusLabel('SOMETHING_NEW')).toBe('SOMETHING_NEW');
  });
  it('restricts deleting to admins', () => {
    expect(canDelete('SUPER_ADMIN')).toBe(true);
    expect(canDelete('ADMIN')).toBe(true);
    expect(canDelete('EDITOR')).toBe(false);
  });
  it('encodes mailto subjects', () => {
    expect(mailtoLink('a@b.co', 'Your enquiry & quote')).toBe('mailto:a@b.co?subject=Your%20enquiry%20%26%20quote');
  });
  it('mirrors the server password rules', () => {
    expect(passwordProblem('short1')).toMatch(/10/);
    expect(passwordProblem('nodigitshere')).toMatch(/number/);
    expect(passwordProblem('1234567890')).toMatch(/letter/);
    expect(passwordProblem('Correct-horse-9')).toBeNull();
  });
});
