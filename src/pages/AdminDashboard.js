import React from 'react';
import AdminPanel from '../components/admin/AdminPanel';

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage quizzes, view analytics, and generate performance reports.
        </p>
      </div>
      
      <AdminPanel />
    </div>
  );
};

export default AdminDashboard;
