import React from 'react';
import { Navigate } from 'react-router';
import { useApp } from '../contexts/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: ('User' | 'Admin' | 'Financial Advisor')[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'Admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'Financial Advisor') {
      return <Navigate to="/advisor-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
