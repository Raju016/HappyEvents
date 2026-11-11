import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Same key the rest of the app's API client reads.
export const TOKEN_KEY = 'momenta_auth_token';

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUOTED'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface EnquiryRow {
  id: string;
  enquiryNumber: string;
  eventType: string;
  eventDate: string | null;
  location: string;
  guestCount: number | null;
  budgetRange: string | null;
  specialNotes: string | null;
  status: EnquiryStatus;
  internalNotes: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface EnquiryDetail extends EnquiryRow {
  services: { id: string; name: string; slug: string }[];
}

export interface MessageRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string | null;
  eventDate: string | null;
  location: string | null;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Overview {
  stats: {
    unreadMessages: number;
    totalMessages: number;
    newEnquiries: number;
    totalEnquiries: number;
    enquiriesThisWeek: number;
  };
  recentEnquiries: EnquiryRow[];
  recentMessages: MessageRow[];
}

/** Keeps the HTTP status so callers can tell "signed out" from other failures. */
export class AdminApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const http = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ERR_NETWORK' ? "Can't reach the server. Is it running?" : error.message) ||
      'Something went wrong.';
    return Promise.reject(new AdminApiError(message, error.response?.status));
  }
);

interface ListParams {
  status?: string;
  q?: string;
  page?: number;
  limit?: number;
}

const clean = (params: ListParams) =>
  Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''));

export const login = async (email: string, password: string) => {
  const { data } = await http.post('/auth/login', { email, password });
  setToken(data.token as string);
  return data.admin as AdminUser;
};

export const fetchMe = async () => (await http.get('/auth/me')).data.admin as AdminUser;

export const changePassword = async (currentPassword: string, newPassword: string) => {
  await http.post('/auth/change-password', { currentPassword, newPassword });
};

export const fetchOverview = async () => (await http.get('/admin/stats')).data as Overview;

export const fetchEnquiries = async (params: ListParams) =>
  (await http.get('/admin/enquiries', { params: clean(params) })).data as Paged<EnquiryRow>;

export const fetchEnquiry = async (id: string) =>
  (await http.get(`/admin/enquiries/${id}`)).data.item as EnquiryDetail;

export const updateEnquiry = async (
  id: string,
  patch: { status?: EnquiryStatus; internalNotes?: string | null; assignedTo?: string | null }
) => (await http.patch(`/admin/enquiries/${id}`, patch)).data.item as EnquiryRow;

export const deleteEnquiry = async (id: string) => {
  await http.delete(`/admin/enquiries/${id}`);
};

export const fetchMessages = async (params: ListParams) =>
  (await http.get('/admin/messages', { params: clean(params) })).data as Paged<MessageRow>;

export const updateMessage = async (id: string, patch: { isRead?: boolean; isArchived?: boolean }) =>
  (await http.patch(`/admin/messages/${id}`, patch)).data.item as MessageRow;

export const deleteMessage = async (id: string) => {
  await http.delete(`/admin/messages/${id}`);
};
