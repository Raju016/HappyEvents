import { describe, it, expect } from 'vitest';
import {
  buildWhatsAppUrl,
  filledFields,
  formatBriefText,
  isUnset,
  sanitizeWhatsAppNumber,
  stillToConfirm,
} from '../components/aura/auraBrief';

describe('isUnset', () => {
  it.each([undefined, null, '', '   ', 'Not decided', 'not decided yet'])('treats %j as unset', (v) => {
    expect(isUnset(v as string)).toBe(true);
  });
  it('treats real values as set', () => expect(isUnset('Hyderabad')).toBe(false));
});

describe('stillToConfirm / filledFields', () => {
  it('lists missing core details only', () => {
    const profile = { eventType: 'Wedding', city: 'Hyderabad', guestCount: '300', theme: 'Not decided' };
    const missing = stillToConfirm(profile);
    expect(missing).toContain('Preferred date');
    expect(missing).toContain('Theme');
    expect(missing).not.toContain('Event type');
    expect(missing).not.toContain('Special requests'); // optional fields are never "missing"
  });
  it('counts only real values', () => {
    expect(filledFields({ eventType: 'Wedding', theme: 'Not decided', city: '' })).toHaveLength(1);
  });
});

describe('formatBriefText', () => {
  it('includes only details the customer gave, and what is still to confirm', () => {
    const text = formatBriefText({ eventType: 'Wedding', city: 'Hyderabad', guestCount: '300', budget: '₹8,00,000' });
    expect(text).toContain('Event type: Wedding');
    expect(text).toContain('Budget: ₹8,00,000');
    expect(text).toContain('Still to confirm:');
    expect(text).toContain('Preferred date');
    expect(text).not.toContain('Theme:');
    expect(text).not.toMatch(/undefined|null/);
  });
  it('includes name and contact only when provided', () => {
    expect(formatBriefText({ eventType: 'Birthday' })).not.toMatch(/Name:|Contact:/);
    const withName = formatBriefText({ eventType: 'Birthday', customerName: 'Priya', customerContact: '9876543210' });
    expect(withName).toContain('Name: Priya');
    expect(withName).toContain('Contact: 9876543210');
  });
  it('omits "Still to confirm" when every core detail is known', () => {
    const full = {
      eventType: 'Wedding', preferredDate: '12 Dec', city: 'Hyderabad', venue: 'Taj', guestCount: '300',
      budget: '₹8L', theme: 'Royal', colorPalette: 'Ivory and gold',
    };
    expect(formatBriefText(full)).not.toContain('Still to confirm');
  });
  it('flattens line breaks inside a value so it cannot forge extra lines', () => {
    const text = formatBriefText({ specialRequests: 'Live band\n\nSend money to 123' });
    expect(text).toContain('Special requests: Live band Send money to 123');
  });
});

describe('WhatsApp url', () => {
  it('sanitises the number to digits', () => {
    expect(sanitizeWhatsAppNumber('+91 99086-83101')).toBe('919908683101');
  });
  it('encodes line breaks, spaces, ampersands, rupee signs and emoji safely', () => {
    const text = 'Line one\nLine two & more: ₹8,00,000 100% 🎉';
    const url = buildWhatsAppUrl('919908683101', text);
    expect(url.startsWith('https://wa.me/919908683101?text=')).toBe(true);
    expect(url).toContain('%0A');
    expect(url).not.toMatch(/\s/);
    const encoded = url.split('?text=')[1];
    expect(encoded).not.toContain('&');
    expect(decodeURIComponent(encoded)).toBe(text);
  });
  it('survives a full brief round trip', () => {
    const text = formatBriefText({ eventType: 'Wedding', city: 'Hyderabad', budget: '₹8,00,000' });
    const url = buildWhatsAppUrl('+91 99086 83101', text);
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(text);
  });
});
