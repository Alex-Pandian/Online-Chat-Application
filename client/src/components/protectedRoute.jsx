import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;