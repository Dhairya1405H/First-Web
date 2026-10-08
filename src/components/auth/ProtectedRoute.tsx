import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useEco } from '../../context/EcoContext';
import { TreePine } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'student' | 'teacher' | 'admin'>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, activeRole, authLoading } = useEco();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-eco-bg flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-eco-dark to-eco-primary flex items-center justify-center text-white shadow-lg animate-bounce mb-3">
          <TreePine className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-eco-muted animate-pulse">Verifying EcoQuest Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated visitors to Login, remembering the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    // Redirect authorized users to their corresponding dashboard if trying to access another portal
    return <Navigate to={`/${activeRole}/dashboard`} replace />;
  }

  return <>{children}</>;
};
