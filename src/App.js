import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import QuizList from './pages/QuizList';
import QuizDetails from './pages/QuizDetails';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminDashboard from './pages/AdminDashboard';

// Auth Guard Component
const PrivateRoute = ({ children }) => {
  // For demo purposes, we'll always allow access
  // In a real app, this would check if the user is authenticated
  return children;
};

const AdminRoute = ({ children }) => {
  // For demo purposes, we'll always allow access
  // In a real app, this would check if the user is an admin
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quizzes" element={<QuizList />} />
            <Route path="quizzes/:quizId" element={<QuizDetails />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
          </Route>
          
          <Route path="/admin" element={
            <AdminRoute>
              <MainLayout isAdmin={true} />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
