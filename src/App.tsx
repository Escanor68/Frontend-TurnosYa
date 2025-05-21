import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "./context/AuthContext"
import { ErrorBoundary } from "../src/components/common/ErrorBoundary"
import Layout from "../src/components/layout/Layout"
import HomePage from "../src/pages/common/Home"
import LoginPage from "../src/pages/auth/Login"
import RegisterPage from "../src/pages/auth/Register"
import ProfilePage from "../src/pages/user/Profile"
import BookingsPage from "../src/pages/user/Bookings"
import FieldsPage from "../src/pages/sports/football/Fields"
import FieldDetailPage from "../src/pages/sports/football/FieldDetails"
import Booking from "../src/pages/sports/football/Booking"
import AdminDashboard from "../src/pages/admin/Dashboard"
import OwnerDashboard from "../src/pages/field-owner/ManageFields"
import AboutPage from "../src/pages/About"
import ContactPage from "../src/pages/Contact"
import NotFoundPage from "../src/pages/common/NotFound"
import ProtectedRoute from "../src/components/auth/ProtectedRoute"
import DirectBookingForm from "../src/pages/sports/football/DirctBookingForm"

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* Rutas protegidas para usuarios */}
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile/bookings"
                element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                }
              />

              {/* Rutas para canchas de fútbol */}
              <Route path="football/fields" element={<FieldsPage />} />
              <Route path="football/fields/:fieldId" element={<FieldDetailPage />} />
              <Route
                path="football/booking/:fieldId"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="football/direct-booking/:fieldId"
                element={
                  <ProtectedRoute>
                    <DirectBookingForm />
                  </ProtectedRoute>
                }
              />

              {/* Rutas protegidas para administradores */}
              <Route
                path="admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Rutas protegidas para propietarios de canchas */}
              <Route
                path="field-owner/dashboard"
                element={
                  <ProtectedRoute requiredRole="owner">
                    <OwnerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Ruta para páginas no encontradas */}
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App