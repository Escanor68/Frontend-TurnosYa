import React, { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log('Ruta actual:', window.location.pathname);
  console.log('Estado de autenticación:', auth.isAuthenticated);

  if (auth.isLoading) {
    return <LoadingSpinner />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!auth.user || !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/403" replace />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default RequireAuth;
