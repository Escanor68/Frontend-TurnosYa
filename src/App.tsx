import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Páginas comunes
import Home from "./pages/common/Home"
import NotFound from "./pages/common/NotFound"

// Páginas de autenticación
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

// Páginas de administrador
import Dashboard from "./pages/admin/Dashboard"
import FieldManagement from "./pages/admin/FieldManagement"

// Páginas de propietario de campo
import ManageFields from "./pages/field-owner/ManageFields"

// Páginas de usuario
import Profile from "./pages/user/Profile"

// Páginas de deportes - Fútbol
import FootballFields from "./pages/sports/football/Fields"
import FootballFieldDetails from "./pages/sports/football/FieldDetails"
import FootballBooking from "./pages/sports/football/Booking"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Rutas comunes */}
              <Route path="/" element={<Home />} />

              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas de administrador */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/fields" element={<FieldManagement />} />

              {/* Rutas de propietario de campo */}
              <Route path="/field-owner/fields" element={<ManageFields />} />

              {/* Rutas de usuario */}
              <Route path="/profile" element={<Profile />} />

              {/* Rutas de deportes - Fútbol */}
              <Route path="/football/fields" element={<FootballFields />} />
              <Route path="/football/fields/:id" element={<FootballFieldDetails />} />
              <Route path="/football/booking/:id" element={<FootballBooking />} />

              {/* Ruta de redirección para campos */}
              <Route path="/fields" element={<Navigate to="/football/fields" replace />} />

              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
