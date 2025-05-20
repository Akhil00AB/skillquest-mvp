import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchStudentProfile } from '../services/api/mockApi';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // For demo purposes, we'll use a mock student ID
          // In a real app, this would come from the user's data in Firestore
          const mockStudentId = 'student1';
          const profile = await fetchStudentProfile(mockStudentId);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // For demo purposes, we'll also provide a function to set a mock user profile
  const setMockUserProfile = async (studentId) => {
    try {
      const profile = await fetchStudentProfile(studentId);
      setUserProfile(profile);
      return profile;
    } catch (error) {
      console.error('Error setting mock user profile:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    setMockUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
