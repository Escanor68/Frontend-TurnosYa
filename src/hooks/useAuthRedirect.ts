import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleCheck } from './useRoleCheck';

export function useAuthRedirect(options: {
  requireAuth?: boolean;
  allowedRoles?: ('admin' | 'owner' | 'player')[];
  redirectAuthenticatedTo?: string;
}) {
  const { requireAuth = false, allowedRoles = [], redirectAuthenticatedTo } = options;
  const { isAuthenticated, isLoading, user } = useAuth();
  const { canAccessRoute } = useRoleCheck();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // Si requiere autenticación y no está autenticado
    if (requireAuth && !isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }

    // Si está autenticado y hay una ruta de redirección para usuarios autenticados
    if (isAuthenticated && redirectAuthenticatedTo) {
      navigate(redirectAuthenticatedTo, { replace: true });
      return;
    }

    // Si hay roles permitidos y el usuario no tiene acceso
    if (allowedRoles.length > 0 && !canAccessRoute(allowedRoles)) {
      navigate('/403', { replace: true });
      return;
    }
  }, [isAuthenticated, isLoading, location, navigate, requireAuth, redirectAuthenticatedTo, allowedRoles, canAccessRoute]);

  return { isLoading, isAuthenticated, user };
} 