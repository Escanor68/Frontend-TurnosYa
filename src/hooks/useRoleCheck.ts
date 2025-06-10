import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { UserRole } from '../types/user';

interface RoleCheckOptions {
  redirectTo?: string;
  requiredRoles?: UserRole[];
}

export const useRoleCheck = ({
  redirectTo = '/',
  requiredRoles = [],
}: RoleCheckOptions = {}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const checkRole = useCallback(() => {
    if (!user) {
      navigate(redirectTo);
      return false;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      navigate(redirectTo);
      return false;
    }

    return true;
  }, [user, requiredRoles, redirectTo, navigate]);

  const hasRole = useCallback(
    (role: UserRole) => {
      return user?.role === role;
    },
    [user]
  );

  const hasAnyRole = useCallback(
    (roles: UserRole[]) => {
      return user ? roles.includes(user.role) : false;
    },
    [user]
  );

  const hasAllRoles = useCallback(
    (roles: UserRole[]) => {
      return user ? roles.every((role) => user.role === role) : false;
    },
    [user]
  );

  const canAccessRoute = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    if (allowedRoles.length === 0) return true;
    return hasAnyRole(allowedRoles);
  };

  const isOwner = () => hasRole('owner');
  const isPlayer = () => hasRole('player');

  const canManageFields = () => {
    return hasAnyRole(['owner', 'owner']);
  };

  const canManageBookings = () => {
    return hasAnyRole(['owner', 'owner', 'player']);
  };

  return {
    checkRole,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    canAccessRoute,
    isOwner,
    isPlayer,
    canManageFields,
    canManageBookings,
  };
};
