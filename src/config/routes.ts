import type { RouteConfig } from '../types';

// Importar los componentes de página
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import BookingsPage from '../pages/BookingsPage';
import NotFoundPage from '../pages/404';
import ForbiddenPage from '../pages/403';

// Admin Pages
import AdminDashboardPage from '../pages/owner/DashboardPage';
import AdminUsersPage from '../pages/owner/UsersPage';
import AdminCourtsPage from '../pages/owner/CourtsPage';
import AdminBookingsPage from '../pages/owner/BookingsPage';
import AdminSettingsPage from '../pages/owner/SettingsPage';
import AdminHelpPage from '../pages/owner/HelpPage';

// Owner Pages
import OwnerCourtsPage from '../pages/owner/CourtsPage';
import OwnerBookingsPage from '../pages/owner/BookingsPage';

export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/login',
    element: LoginPage,
  },
  {
    path: '/register',
    element: RegisterPage,
  },
  {
    path: '/forgot-password',
    element: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    element: ResetPasswordPage,
  },
  {
    path: '/403',
    element: ForbiddenPage,
  },
  {
    path: '*',
    element: NotFoundPage,
  },
];

export const adminRoutes: RouteConfig[] = [
  {
    path: '/owner',
    element: null,
    requireAuth: true,
    allowedRoles: ['owner'],
    children: [
      {
        path: 'dashboard',
        element: AdminDashboardPage,
      },
      {
        path: 'users',
        element: AdminUsersPage,
      },
      {
        path: 'courts',
        element: AdminCourtsPage,
      },
      {
        path: 'bookings',
        element: AdminBookingsPage,
      },
      {
        path: 'settings',
        element: AdminSettingsPage,
      },
      {
        path: 'help',
        element: AdminHelpPage,
      },
    ],
  },
];

export const ownerRoutes: RouteConfig[] = [
  {
    path: '/owner',
    element: null,
    requireAuth: true,
    allowedRoles: ['owner'],
    children: [
      {
        path: 'courts',
        element: OwnerCourtsPage,
      },
      {
        path: 'bookings',
        element: OwnerBookingsPage,
      },
      {
        path: 'profile',
        element: ProfilePage,
      },
    ],
  },
];

export const playerRoutes: RouteConfig[] = [
  {
    path: '/player',
    element: null,
    requireAuth: true,
    allowedRoles: ['player'],
    children: [
      {
        path: 'bookings',
        element: BookingsPage,
      },
      {
        path: 'profile',
        element: ProfilePage,
      },
    ],
  },
];
