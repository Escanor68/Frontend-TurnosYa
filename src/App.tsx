import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "./context/AuthContext"
import { ErrorBoundary } from "../src/components/common/ErrorBoundary"
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

// Layouts
import AdminLayout from './layouts/AdminLayout'
import MainLayout from './layouts/MainLayout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import ProfilePage from './pages/ProfilePage'
import BookingsPage from './pages/BookingsPage'
import NotFoundPage from './pages/404'
import ForbiddenPage from './pages/403'

// Admin Pages
import AdminDashboardPage from './pages/admin/DashboardPage'
import AdminUsersPage from './pages/admin/UsersPage'
import AdminCourtsPage from './pages/admin/CourtsPage'
import AdminBookingsPage from './pages/admin/BookingsPage'
import AdminSettingsPage from './pages/admin/SettingsPage'
import AdminHelpPage from './pages/admin/HelpPage'

// Owner Pages
import OwnerCourtsPage from './pages/owner/CourtsPage'
import OwnerBookingsPage from './pages/owner/BookingsPage'

// Componentes comunes
import Layout from './components/layout/Layout'
import RequireAuth from './components/auth/RequireAuth'

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
          
          <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow">
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
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="courts" element={<AdminCourtsPage />} />
                    <Route path="bookings" element={<AdminBookingsPage />} />
                  </Route>
                </Route>

                {/* Rutas de propietario */}
                <Route path="/owner" element={<MainLayout />}>
                  <Route path="courts" element={<OwnerCourtsPage />} />
                  <Route path="bookings" element={<OwnerBookingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Rutas de jugador */}
                <Route path="/player" element={<MainLayout />}>
                  <Route path="bookings" element={<BookingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Páginas de error */}
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App