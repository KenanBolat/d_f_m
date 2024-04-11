// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  
  if (!auth.accessToken) {
    // User is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  return children;
};
