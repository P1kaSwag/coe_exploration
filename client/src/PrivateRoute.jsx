import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authentication/AuthComponent';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth status
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
