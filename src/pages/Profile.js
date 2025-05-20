import React, { useState } from 'react';
import StudentProfileForm from '../components/profile/StudentProfileForm';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { userProfile } = useAuth();
  const [updatedProfile, setUpdatedProfile] = useState(null);

  const handleProfileUpdate = (profile) => {
    setUpdatedProfile(profile);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">Your Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and preferences.
        </p>
      </div>
      
      <StudentProfileForm onProfileUpdate={handleProfileUpdate} />
    </div>
  );
};

export default Profile;
