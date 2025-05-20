import { auth } from './config';

// Mock user data
const mockUsers = {
  'alex.j@example.com': {
    uid: 'student1',
    email: 'alex.j@example.com',
    displayName: 'Alex Johnson',
    password: 'password123'
  },
  'jamie.s@example.com': {
    uid: 'student2',
    email: 'jamie.s@example.com',
    displayName: 'Jamie Smith',
    password: 'password123'
  },
  'taylor.w@example.com': {
    uid: 'student3',
    email: 'taylor.w@example.com',
    displayName: 'Taylor Wilson',
    password: 'password123'
  }
};

// Helper function to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Register a new user
export const registerUser = async (email, password, displayName) => {
  await delay(800); // Simulate network delay
  
  try {
    if (mockUsers[email]) {
      throw new Error('Email already in use');
    }
    
    const newUser = {
      uid: `user-${Date.now()}`,
      email,
      displayName,
      password
    };
    
    // In a real app, this would save to Firebase
    mockUsers[email] = newUser;
    
    // Update the mock auth current user
    auth.currentUser = newUser;
    
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Sign in existing user
export const loginUser = async (email, password) => {
  await delay(600); // Simulate network delay
  
  try {
    const user = mockUsers[email];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Update the mock auth current user
    auth.currentUser = user;
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Sign out user
export const logoutUser = async () => {
  await delay(400); // Simulate network delay
  
  try {
    // Clear the mock auth current user
    auth.currentUser = null;
    return true;
  } catch (error) {
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  await delay(500); // Simulate network delay
  
  try {
    const user = mockUsers[email];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, this would send an email
    console.log(`Password reset email sent to ${email}`);
    
    return true;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
