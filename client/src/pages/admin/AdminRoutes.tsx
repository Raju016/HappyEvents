import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';
import AdminEnquiriesPage from './AdminEnquiriesPage';
import AdminMessagesPage from './AdminMessagesPage';
import AdminAccountPage from './AdminAccountPage';

/** Mounted in App.tsx at /admin/*. Everything except /admin/login needs a signed-in admin. */
export const AdminRoutes: React.FC = () => (
  <Routes>
    <Route path="login" element={<AdminLoginPage />} />
    <Route element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="enquiries" element={<AdminEnquiriesPage />} />
      <Route path="messages" element={<AdminMessagesPage />} />
      <Route path="account" element={<AdminAccountPage />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
