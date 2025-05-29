import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface PublicRouteProps {
  children: React.ReactNode;
}

const getDefaultRoute = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'owner':
      return '/owner/courts';
    case 'player':
      return '/bookings';
    default:
      return '/';
  }
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultRoute(user.role)} replace />;
  }

  return <>{children}</>;
};
