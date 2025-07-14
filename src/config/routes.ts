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
  }VM2270:1  Console Ninja extension is connected to Vite, see https://tinyurl.com/2vt8jxzw for more info.
  chunk-DVT5INTC.js?v=d8d3c9a9:122 Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
  VM2270:1 Warning: React does not recognize the `fetchPriority` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `fetchpriority` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
      at img
      at http://localhost:4000/src/components/common/OptimizedImage.tsx:23:7
      at div
      at div
      at HeroSection (http://localhost:4000/src/components/home/HeroSection.tsx:35:37)
      at div
      at HomePage
      at uo (http://localhost:4000/node_modules/.vite/deps/react-router-dom.js?v=b2e612f2:4:3285)
      at So (http://localhost:4000/node_modules/.vite/deps/react-router-dom.js?v=b2e612f2:4:10741)
      at main
      at div
      at Layout
      at PublicRoute (http://localhost:4000/src/components/auth/PublicRoute.tsx:31:31)
      at uo (http://localhost:4000/node_modules/.vite/deps/react-router-dom.js?v=b2e612f2:4:3285)
      at No (http://localhost:4000/node_modules/.vite/deps/react-router-dom.js?v=b2e612f2:4:11825)
      at Suspense
      at ErrorBoundary (http://localhost:4000/src/components/common/ErrorBoundary.tsx:5:8)
      at App
      at PaymentProvider (http://localhost:4000/src/context/PaymentContext.tsx:27:3)
      at UserProvider (http://localhost:4000/src/context/UserContext.tsx:24:3)
      at AuthProvider (http://localhost:4000/src/context/AuthContext.tsx:24:3)
      at AccessibilityProvider (http://localhost:4000/src/components/common/AccessibilityProvider.tsx:24:3)
      at ThemeProvider (http://localhost:4000/src/context/ThemeContext.tsx:21:3)
      at Ze (http://localhost:4000/node_modules/.vite/deps/react-router-dom.js?v=b2e612f2:4:10934)
      at Ei (http://localhost:4000/node_modules/.vite/deps/react-router-dom.js?v=b2e612f2:4:23449)
      at Cs (http://localhost:4000/node_modules/.vite/deps/@tanstack_react-query.js?v=b2e612f2:1:44994)
  eval @ VM2270:1
  ul @ chunk-DVT5INTC.js?v=d8d3c9a9:1
  f @ chunk-DVT5INTC.js?v=d8d3c9a9:1
  Vp @ chunk-DVT5INTC.js?v=d8d3c9a9:9
  WS @ chunk-DVT5INTC.js?v=d8d3c9a9:9
  IS @ chunk-DVT5INTC.js?v=d8d3c9a9:9
  Kl @ chunk-DVT5INTC.js?v=d8d3c9a9:9
  gR @ chunk-DVT5INTC.js?v=d8d3c9a9:10
  kR @ chunk-DVT5INTC.js?v=d8d3c9a9:10
  dg @ chunk-DVT5INTC.js?v=d8d3c9a9:80
  qg @ chunk-DVT5INTC.js?v=d8d3c9a9:93
  $g @ chunk-DVT5INTC.js?v=d8d3c9a9:93
  DM @ chunk-DVT5INTC.js?v=d8d3c9a9:93
  xM @ chunk-DVT5INTC.js?v=d8d3c9a9:93
  Hg @ chunk-DVT5INTC.js?v=d8d3c9a9:93
  ol @ chunk-DVT5INTC.js?v=d8d3c9a9:1
  Ya @ chunk-DVT5INTC.js?v=d8d3c9a9:1
  xi @ chunk-DVT5INTC.js?v=d8d3c9a9:1
  ,
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
