import { Navigate, useLocation, type RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
  roles?: Array<'admin' | 'owner' | 'player'>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Guardar la ruta actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    // Si el usuario no tiene el rol requerido, redirigir según su rol
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'owner':
        return <Navigate to="/field-owner/dashboard" replace />;
      default:
        return <Navigate to="/profile" replace />;
    }
  }

  return <Component {...rest} />;
}; 