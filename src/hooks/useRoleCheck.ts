import { useAuth } from '../context/AuthContext';
import type { User } from '../types/auth';

export function useRoleCheck() {
  const { user } = useAuth();

  const hasRole = (role: User['role']) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: User['role'][]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const canAccessRoute = (allowedRoles: User['role'][]) => {
    if (!user) return false;
    if (allowedRoles.length === 0) return true;
    return hasAnyRole(allowedRoles);
  };

  const isAdmin = () => hasRole('admin');
  const isOwner = () => hasRole('owner');
  const isPlayer = () => hasRole('player');

  const canManageFields = () => {
    return hasAnyRole(['admin', 'owner']);
  };

  const canManageBookings = () => {
    return hasAnyRole(['admin', 'owner', 'player']);
  };

  const canAccessAdminPanel = () => {
    return isAdmin();
  };

  return {
    hasRole,
    hasAnyRole,
    canAccessRoute,
    isAdmin,
    isOwner,
    isPlayer,
    canManageFields,
    canManageBookings,
    canAccessAdminPanel,
  };
} 