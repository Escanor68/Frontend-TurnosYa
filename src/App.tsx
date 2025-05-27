import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Layouts
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';

// Páginas públicas
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import NotFoundPage from './pages/404';
import ForbiddenPage from './pages/403';

// Páginas de administración
import DashboardPage from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';
import CourtsPage from './pages/admin/CourtsPage';
import AdminBookingsPage from './pages/admin/BookingsPage';

// Páginas de propietario
import OwnerCourtsPage from './pages/owner/CourtsPage';
import OwnerBookingsPage from './pages/owner/BookingsPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
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
            {/* Rutas públicas */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />

              {/* Rutas protegidas de administración */}
              <Route path="admin" element={<RequireAuth allowedRoles={['admin']} />}>
                <Route index element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="courts" element={<CourtsPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
              </Route>

              {/* Rutas protegidas de propietario */}
              <Route path="owner" element={<RequireAuth allowedRoles={['owner']} />}>
                <Route path="courts" element={<OwnerCourtsPage />} />
                <Route path="bookings" element={<OwnerBookingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Rutas protegidas de jugador */}
              <Route path="player" element={<RequireAuth allowedRoles={['player']} />}>
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Páginas de error */}
              <Route path="403" element={<ForbiddenPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;