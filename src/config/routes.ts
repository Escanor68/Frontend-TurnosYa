import { lazy } from 'react';
import type { RouteConfig } from '../types';

// Importar los componentes de página con lazy loading
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(
  () => import('../pages/auth/ForgotPasswordPage')
);
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const ProfilePage = lazy(() =>
  import('../pages/profile/ProfilePage').then((module) => ({
    default: module.ProfilePage,
  }))
);
const BookingsPage = lazy(() => import('../pages/BookingsPage'));
const NotFoundPage = lazy(() => import('../pages/404'));
const ForbiddenPage = lazy(() => import('../pages/403'));

// Admin Pages - Lazy loading para páginas pesadas
const AdminDashboardPage = lazy(() => import('../pages/owner/DashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/owner/UsersPage'));
const AdminCourtsPage = lazy(() => import('../pages/owner/CourtsPage'));
const AdminBookingsPage = lazy(() => import('../pages/owner/BookingsPage'));
const AdminSettingsPage = lazy(() => import('../pages/owner/SettingsPage'));
const AdminHelpPage = lazy(() => import('../pages/owner/HelpPage'));

// Owner Pages - Lazy loading para páginas pesadas
const OwnerCourtsPage = lazy(() => import('../pages/owner/CourtsPage'));
const OwnerBookingsPage = lazy(() => import('../pages/owner/BookingsPage'));

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
