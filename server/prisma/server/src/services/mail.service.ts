import { Resend } from 'resend';
import { env } from '../config/env';

const resend = new Resend(env.RESEND_API_KEY);

const mailConfigured = () => env.RESEND_API_KEY && !env.RESEND_API_KEY.startsWith('re_placeholder');

// Escape user-supplied text before putting it in an HTML email.
const esc = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const row = (label: string, value?: string | number | null) =>
  value === undefined || value === null || value === ''
    ? ''
    : `<tr><td style="padding:6px 16px 6px 0;color:#8E8E8E;font-size:13px;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:6px 0;color:#111;font-size:14px">${esc(value)}</td></tr>`;

const wrap = (title: string, rows: string, footer = '') => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee">
    <h2 style="margin:0 0 4px;color:#A6823B;font-weight:600">${esc(title)}</h2>
    <p style="margin:0 0 20px;color:#8E8E8E;font-size:12px">Happy Events website</p>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    ${footer}
  </div>`;

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// Never throws: a mail problem must not lose a lead that is already saved.
async function send({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  if (!mailConfigured()) {
    console.warn('[mail] RESEND_API_KEY not set, skipping email:', subject);
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
      replyTo,
    });
    if (error) {
      console.error('[mail] Resend rejected the email:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[mail] Failed to send email:', err);
    return false;
  }
}

export interface ContactMailData {
  name: string;
  phone: string;
  email: string;
  eventType?: string | null;
  eventDate?: string | null;
  location?: string | null;
  message: string;
}

export interface EnquiryMailData {
  enquiryNumber: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  eventType: string;
  eventDate?: string | null;
  location: string;
  guestCount?: number | null;
  budgetRange?: string | null;
  services: string[];
  specialNotes?: string | null;
}

// Resend's shared test sender can only deliver to the account owner,
// so visitor confirmations only make sense once a real domain is verified.
const canEmailVisitors = () => !env.EMAIL_FROM.includes('resend.dev');

export async function notifyNewContact(data: ContactMailData) {
  await send({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New message from ${data.name}`,
    html: wrap(
      'New contact message',
      row('Name', data.name) +
        row('Phone', data.phone) +
        row('Email', data.email) +
        row('Event type', data.eventType) +
        row('Event date', data.eventDate) +
        row('Location', data.location) +
        row('Message', data.message)
    ),
  });

  if (canEmailVisitors()) {
    await send({
      to: data.email,
      subject: 'We received your message, Happy Events',
      html: wrap(
        `Thank you, ${data.name}`,
        '',
        '<p style="color:#333;font-size:14px;line-height:1.6">We have received your message and will get back to you within 24 hours.</p>'
      ),
    });
  }
}

export async function notifyNewEnquiry(data: EnquiryMailData) {
  await send({
    to: env.ADMIN_EMAIL,
    replyTo: data.contactEmail,
    subject: `New event enquiry ${data.enquiryNumber}: ${data.eventType}`,
    html: wrap(
      `New enquiry ${data.enquiryNumber}`,
      row('Name', data.contactName) +
        row('Phone', data.contactPhone) +
        row('Email', data.contactEmail) +
        row('Event type', data.eventType) +
        row('Event date', data.eventDate) +
        row('Location', data.location) +
        row('Guests', data.guestCount) +
        row('Budget', data.budgetRange) +
        row('Services', data.services.join(', ')) +
        row('Notes', data.specialNotes)
    ),
  });

  if (canEmailVisitors()) {
    await send({
      to: data.contactEmail,
      subject: `We received your enquiry ${data.enquiryNumber}`,
      html: wrap(
        `Thank you, ${data.contactName}`,
        row('Reference', data.enquiryNumber) + row('Event type', data.eventType),
        '<p style="color:#333;font-size:14px;line-height:1.6">Our concierge team is reviewing your details and will reach out within 24 hours with a tailored proposal.</p>'
      ),
    });
  }
}
