// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('@/api/adminApi', async () => {
  const actual = await vi.importActual<typeof import('@/api/adminApi')>('@/api/adminApi');
  return {
    ...actual,
    fetchMe: vi.fn(),
    login: vi.fn(),
    fetchOverview: vi.fn(),
    fetchEnquiries: vi.fn(),
    fetchEnquiry: vi.fn(),
    updateEnquiry: vi.fn(),
    deleteEnquiry: vi.fn(),
    fetchMessages: vi.fn(),
    updateMessage: vi.fn(),
    deleteMessage: vi.fn(),
    changePassword: vi.fn(),
  };
});

import * as api from '@/api/adminApi';
import type { AdminUser } from '@/api/adminApi';
import AdminRoutes from '@/pages/admin/AdminRoutes';

const m = api as unknown as Record<string, ReturnType<typeof vi.fn>>;
const { AdminApiError, TOKEN_KEY } = api;

const owner: AdminUser = { id: 'a1', name: 'George Owner', email: 'g@happyevents.co', role: 'SUPER_ADMIN' };
const editor: AdminUser = { ...owner, role: 'EDITOR' };

const enquiry = {
  id: 'e1', enquiryNumber: 'EVT-2026-000123', eventType: 'Wedding', eventDate: '2026-12-12T00:00:00.000Z',
  location: 'Hyderabad', guestCount: 300, budgetRange: '₹15 – 40 Lakhs', specialNotes: 'Floral mandap please',
  status: 'NEW' as const, internalNotes: null, assignedTo: null, createdAt: '2026-10-27T10:30:00.000Z',
  updatedAt: '2026-10-27T10:30:00.000Z', contactName: 'Priya Sharma', contactEmail: 'priya@example.com', contactPhone: '9908683101',
};
const message = {
  id: 'm1', name: 'Rahul Verma', phone: '9876543210', email: 'rahul@example.com', eventType: 'Birthday',
  eventDate: null, location: 'Pune', message: 'Do you plan surprise parties?', isRead: false, isArchived: false,
  createdAt: '2026-10-27T09:00:00.000Z',
};
const page = <T,>(items: T[]) => ({ items, total: items.length, page: 1, pageSize: 15, totalPages: 1 });

// Mounted exactly like App.tsx does it: <Route path="/admin/*" element={<AdminRoutes />} />
const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[`/admin${path}`]}>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  Object.values(m).forEach((fn) => fn.mockReset?.());
});
afterEach(cleanup);

const signedIn = (admin: AdminUser = owner) => {
  localStorage.setItem(TOKEN_KEY, 'token');
  m.fetchMe.mockResolvedValue(admin);
};

describe('signing in and out', () => {
  it('sends signed-out visitors to the login page', async () => {
    renderAt('/enquiries');
    expect(await screen.findByRole('heading', { name: /studio sign in/i })).toBeInTheDocument();
    expect(m.fetchMe).not.toHaveBeenCalled();
  });

  it('shows the dashboard to a signed-in admin', async () => {
    signedIn();
    m.fetchOverview.mockResolvedValue({
      stats: { unreadMessages: 2, totalMessages: 5, newEnquiries: 3, totalEnquiries: 11, enquiriesThisWeek: 4 },
      recentEnquiries: [enquiry], recentMessages: [message],
    });
    renderAt('/dashboard');
    expect(await screen.findByRole('heading', { name: /welcome back, george/i })).toBeInTheDocument();
    expect(await screen.findByText('11')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
  });

  it('signs out when the server rejects the session', async () => {
    localStorage.setItem(TOKEN_KEY, 'expired');
    m.fetchMe.mockRejectedValue(new AdminApiError('Please sign in to continue.', 401));
    renderAt('/dashboard');
    expect(await screen.findByRole('heading', { name: /studio sign in/i })).toBeInTheDocument();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('stays signed in when the server is simply unreachable', async () => {
    localStorage.setItem(TOKEN_KEY, 'good');
    m.fetchMe.mockRejectedValue(new AdminApiError("Can't reach the server. Is it running?"));
    renderAt('/dashboard');
    expect(await screen.findByText(/couldn.t reach the server/i)).toBeInTheDocument();
    expect(localStorage.getItem(TOKEN_KEY)).toBe('good');
  });

  it('shows the server message for wrong details, then signs in', async () => {
    const user = userEvent.setup();
    m.login.mockRejectedValueOnce(new AdminApiError('Incorrect email or password.', 401));
    renderAt('/login');
    await user.type(screen.getByLabelText('Email'), 'g@happyevents.co');
    await user.type(screen.getByLabelText('Password'), 'wrong-pass-1');
    await user.click(screen.getByRole('button', { name: /^sign in$/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Incorrect email or password.');

    m.login.mockResolvedValueOnce(owner);
    m.fetchMe.mockResolvedValue(owner);
    m.fetchOverview.mockResolvedValue({ stats: { unreadMessages: 0, totalMessages: 0, newEnquiries: 0, totalEnquiries: 0, enquiriesThisWeek: 0 }, recentEnquiries: [], recentMessages: [] });
    localStorage.setItem(TOKEN_KEY, 'token'); // the real login() stores this
    await user.clear(screen.getByLabelText('Password'));
    await user.type(screen.getByLabelText('Password'), 'Correct-horse-9');
    await user.click(screen.getByRole('button', { name: /^sign in$/i }));
    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  it('lets people reveal the password they are typing', async () => {
    const user = userEvent.setup();
    renderAt('/login');
    const field = screen.getByLabelText('Password');
    expect(field).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: /show password/i }));
    expect(field).toHaveAttribute('type', 'text');
  });
});

describe('enquiries', () => {
  const open = async (admin: AdminUser = owner) => {
    signedIn(admin);
    m.fetchEnquiries.mockResolvedValue(page([enquiry]));
    m.fetchEnquiry.mockResolvedValue({ ...enquiry, services: [{ id: 's1', name: 'Stage & Floral Decoration', slug: 'stage' }] });
    const user = userEvent.setup();
    renderAt('/enquiries');
    await user.click(await screen.findByRole('button', { name: 'Priya Sharma' }));
    return { user, dialog: await screen.findByRole('dialog') };
  };

  it('lists enquiries and opens the details', async () => {
    const { dialog } = await open();
    expect(await within(dialog).findByText('Stage & Floral Decoration')).toBeInTheDocument();
    expect(within(dialog).getByText('Floral mandap please')).toBeInTheDocument();
    expect(within(dialog).getByText('12 Dec 2026')).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', expect.stringContaining('wa.me/919908683101'));
  });

  it('saves a new status and private notes', async () => {
    const { user, dialog } = await open();
    await within(dialog).findByText('Stage & Floral Decoration');
    const save = within(dialog).getByRole('button', { name: /save changes/i });
    expect(save).toBeDisabled(); // nothing changed yet

    m.updateEnquiry.mockResolvedValue({ ...enquiry, status: 'CONTACTED' });
    await user.selectOptions(within(dialog).getByLabelText('Status'), 'CONTACTED');
    await user.type(within(dialog).getByLabelText(/private notes/i), 'Called, quote tomorrow');
    await user.click(save);
    await waitFor(() =>
      expect(m.updateEnquiry).toHaveBeenCalledWith('e1', { status: 'CONTACTED', internalNotes: 'Called, quote tomorrow', assignedTo: null })
    );
    expect(await within(dialog).findByText('Saved.')).toBeInTheDocument();
  });

  it('hides Delete from editors', async () => {
    const { dialog } = await open(editor);
    await within(dialog).findByText('Stage & Floral Decoration');
    expect(within(dialog).queryByRole('button', { name: /delete enquiry/i })).not.toBeInTheDocument();
  });

  it('asks before an admin deletes', async () => {
    const { user, dialog } = await open();
    await within(dialog).findByText('Stage & Floral Decoration');
    await user.click(within(dialog).getByRole('button', { name: /delete enquiry/i }));
    expect(m.deleteEnquiry).not.toHaveBeenCalled();
    m.deleteEnquiry.mockResolvedValue(undefined);
    await user.click(within(dialog).getByRole('button', { name: /yes, delete/i }));
    await waitFor(() => expect(m.deleteEnquiry).toHaveBeenCalledWith('e1'));
  });

  it('closes the details with Escape', async () => {
    const { user } = await open();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('shows a friendly empty state', async () => {
    signedIn();
    m.fetchEnquiries.mockResolvedValue(page([]));
    renderAt('/enquiries');
    expect(await screen.findByText(/no enquiries yet/i)).toBeInTheDocument();
  });

  it('starts filtered when linked from the overview', async () => {
    signedIn();
    m.fetchEnquiries.mockResolvedValue(page([]));
    renderAt('/enquiries?status=NEW');
    await waitFor(() => expect(m.fetchEnquiries).toHaveBeenCalledWith(expect.objectContaining({ status: 'NEW' })));
  });
});

describe('messages', () => {
  it('marks a message read and archives it', async () => {
    const user = userEvent.setup();
    signedIn();
    m.fetchMessages.mockResolvedValue(page([message]));
    m.updateMessage.mockResolvedValue({ ...message, isRead: true });
    renderAt('/messages');

    const card = await screen.findByRole('article', { name: /message from rahul verma/i });
    expect(within(card).getByText('Unread')).toBeInTheDocument();
    expect(within(card).getByText('Do you plan surprise parties?')).toBeInTheDocument();

    await user.click(within(card).getByRole('button', { name: /mark read/i }));
    await waitFor(() => expect(m.updateMessage).toHaveBeenCalledWith('m1', { isRead: true }));
    await user.click(within(card).getByRole('button', { name: /^archive$/i }));
    await waitFor(() => expect(m.updateMessage).toHaveBeenCalledWith('m1', { isArchived: true }));
  });

  it('switches filter tabs', async () => {
    const user = userEvent.setup();
    signedIn();
    m.fetchMessages.mockResolvedValue(page([]));
    renderAt('/messages');
    await user.click(await screen.findByRole('button', { name: 'Unread' }));
    await waitFor(() => expect(m.fetchMessages).toHaveBeenLastCalledWith(expect.objectContaining({ status: 'unread' })));
  });

  it('hides Delete from editors', async () => {
    signedIn(editor);
    m.fetchMessages.mockResolvedValue(page([message]));
    renderAt('/messages');
    const card = await screen.findByRole('article', { name: /rahul/i });
    expect(within(card).queryByRole('button', { name: /^delete$/i })).not.toBeInTheDocument();
  });
});

describe('account', () => {
  const open = async () => {
    signedIn();
    renderAt('/account');
    await screen.findByRole('heading', { name: /your account/i });
    return userEvent.setup();
  };
  const fill = async (user: ReturnType<typeof userEvent.setup>, cur: string, next: string, again: string) => {
    await user.type(screen.getByLabelText('Current password'), cur);
    await user.type(screen.getByLabelText('New password'), next);
    await user.type(screen.getByLabelText('Repeat new password'), again);
    await user.click(screen.getByRole('button', { name: /change password/i }));
  };

  it('checks the new password before calling the server', async () => {
    const user = await open();
    await fill(user, 'Correct-horse-9', 'short1', 'short1');
    expect(await screen.findByRole('alert')).toHaveTextContent(/at least 10/i);
    expect(m.changePassword).not.toHaveBeenCalled();
  });

  it('catches mismatched passwords', async () => {
    const user = await open();
    await fill(user, 'Correct-horse-9', 'Brand-new-pass-7', 'Brand-new-pass-8');
    expect(await screen.findByRole('alert')).toHaveTextContent(/do not match/i);
    expect(m.changePassword).not.toHaveBeenCalled();
  });

  it('shows a wrong current password without signing out', async () => {
    const user = await open();
    m.changePassword.mockRejectedValue(new AdminApiError('Your current password is not correct.', 400));
    await fill(user, 'wrong-wrong-1', 'Brand-new-pass-7', 'Brand-new-pass-7');
    expect(await screen.findByRole('alert')).toHaveTextContent('Your current password is not correct.');
    expect(localStorage.getItem(TOKEN_KEY)).toBe('token');
  });

  it('confirms success and clears the form', async () => {
    const user = await open();
    m.changePassword.mockResolvedValue(undefined);
    await fill(user, 'Correct-horse-9', 'Brand-new-pass-7', 'Brand-new-pass-7');
    expect(await screen.findByText('Password changed.')).toBeInTheDocument();
    expect(screen.getByLabelText('New password')).toHaveValue('');
  });
});
