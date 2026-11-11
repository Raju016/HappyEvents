import { createContext, useContext } from 'react';
import type { AdminUser } from '@/api/adminApi';

interface AdminAuth {
  admin: AdminUser;
  logout: () => void;
  /** Returns a readable message. Signs the user out if their session has ended. */
  handleError: (error: unknown) => string;
}

export const AdminAuthContext = createContext<AdminAuth | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside the admin layout');
  return ctx;
};
