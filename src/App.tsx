import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { routerConfig } from './router/config';

// Layouts
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';

// Páginas públicas
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import NotFoundPage from './pages/404';
import ForbiddenPage from './pages/403';

// Páginas protegidas
const DashboardPage = React.lazy(() => import('./pages/admin/DashboardPage'));
const UsersPage = React.lazy(() => import('./pages/admin/UsersPage'));
const CourtsPage = React.lazy(() => import('./pages/admin/CourtsPage'));
const AdminBookingsPage = React.lazy(() => import('./pages/admin/BookingsPage'));
const OwnerCourtsPage = React.lazy(() => import('./pages/owner/CourtsPage'));
const OwnerBookingsPage = React.lazy(() => import('./pages/owner/BookingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const BookingsPage = React.lazy(() => import('./pages/BookingsPage'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Routes>
          <Route element={<Layout />}>
            {/* Rutas públicas */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="403" element={<ForbiddenPage />} />

            {/* Rutas protegidas */}
            <Route path="admin" element={<RequireAuth allowedRoles={['admin']} />}>
              <Route index element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <DashboardPage />
                </Suspense>
              } />
              <Route path="users" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <UsersPage />
                </Suspense>
              } />
              <Route path="courts" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <CourtsPage />
                </Suspense>
              } />
              <Route path="bookings" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <AdminBookingsPage />
                </Suspense>
              } />
            </Route>

            <Route path="owner" element={<RequireAuth allowedRoles={['owner']} />}>
              <Route path="courts" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <OwnerCourtsPage />
                </Suspense>
              } />
              <Route path="bookings" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <OwnerBookingsPage />
                </Suspense>
              } />
              <Route path="profile" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <ProfilePage />
                </Suspense>
              } />
            </Route>

            <Route path="player" element={<RequireAuth allowedRoles={['player']} />}>
              <Route path="bookings" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <BookingsPage />
                </Suspense>
              } />
              <Route path="profile" element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <ProfilePage />
                </Suspense>
              } />
            </Route>

            {/* Ruta 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;