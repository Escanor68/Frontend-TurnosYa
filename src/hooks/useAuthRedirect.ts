import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface AuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export const useAuthRedirect = ({
  redirectTo = '/',
  requireAuth = false,
  requireGuest = false,
}: AuthRedirectOptions = {}) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !user) {
      navigate(redirectTo);
    }

    if (requireGuest && user) {
      navigate(redirectTo);
    }
  }, [user, isLoading, requireAuth, requireGuest, redirectTo, navigate]);

  return {
    isAuthenticated: !!user,
    isLoading,
  };
};
