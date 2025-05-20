import React from 'react';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Welcome, {userProfile?.name || 'Student'}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your progress, view your skills, and discover your hidden talents.
        </p>
      </div>
      
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;
