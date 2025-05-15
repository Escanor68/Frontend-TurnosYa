import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layout components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Common pages
import Home from "./pages/common/Home"
import NotFound from "./pages/common/NotFound"

// Auth pages
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

// User pages
import UserProfile from "./pages/user/Profile"

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard"
import AdminFieldManagement from "./pages/admin/FieldManagement"

// Sports pages - Football
import FootballFields from "./pages/sports/football/Fields"
import FootballFieldDetails from "./pages/sports/football/FieldDetails"
import FootballBooking from "./pages/sports/football/Booking"

// Field owner pages
import ManageFields from "./pages/field-owner/ManageFields"

// Context
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Common routes */}
              <Route path="/" element={<Home />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User routes */}
              <Route path="/profile" element={<UserProfile />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/fields" element={<AdminFieldManagement />} />

              {/* Field owner routes */}
              <Route path="/manage-fields" element={<ManageFields />} />

              {/* Sports routes - Football */}
              <Route path="/fields" element={<FootballFields />} />
              <Route path="/fields/:id" element={<FootballFieldDetails />} />
              <Route path="/booking/:fieldId" element={<FootballBooking />} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  )
}

export default App
