import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateStudentProfile } from '../../services/api/mockApi';
import { motion } from 'framer-motion';

const StudentProfileForm = ({ onProfileUpdate }) => {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    email: '',
    avatarUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        grade: userProfile.grade || '',
        section: userProfile.section || '',
        email: userProfile.email || '',
        avatarUrl: userProfile.avatarUrl || ''
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!userProfile?.id) {
        throw new Error('User profile not found');
      }

      await updateStudentProfile(userProfile.id, formData);
      
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
      
      if (onProfileUpdate) {
        onProfileUpdate({
          ...userProfile,
          ...formData
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        text: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const gradeOptions = ['7', '8', '9'];
  const sectionOptions = ['A', 'B', 'C'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-display font-bold text-primary-700 mb-6">Student Profile</h2>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded-md ${
          message.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {formData.avatarUrl ? (
                <img 
                  src={formData.avatarUrl} 
                  alt={formData.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL
              </label>
              <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Grade</option>
              {gradeOptions.map(grade => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Section</option>
              {sectionOptions.map(section => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              }`}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentProfileForm;
