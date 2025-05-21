"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Menu, X, User, LogOut, ClubIcon as Soccer, Settings } from "lucide-react"

// Componente de encabezado para toda la aplicación
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    setIsMenuOpen(false)
  }

  // Verificar si el usuario es administrador
  const isAdmin = user?.role === "admin"
  // Verificar si el usuario es propietario de campo
  const isOwner = user?.role === "owner"

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Soccer className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TurnosYa</span>
            </Link>
          </div>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/football/fields" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Canchas
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Nosotros
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Contacto
            </Link>
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Admin
              </Link>
            )}
            {isAuthenticated && isOwner && (
              <Link
                to="/field-owner/dashboard"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Mis Canchas
              </Link>
            )}
          </nav>

          {/* Botones de autenticación para escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                  <span className="font-medium">{user?.name?.split(" ")[0]}</span>
                </button>

                {/* Menú desplegable de perfil */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    {(isAdmin || isOwner) && (
                      <Link
                        to={isAdmin ? "/admin/dashboard" : "/field-owner/dashboard"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/profile/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Mis Reservas
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Botón de menú móvil */}
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-3">
              <Link
                to="/football/fields"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Canchas
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {isAuthenticated && (isOwner || isAdmin) && (
                <Link
                  to="/field-owner/dashboard"
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis Canchas
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-100 pt-2">
                    <Link
                      to="/profile"
                      className="flex items-center text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Mi Perfil
                    </Link>
                    <Link
                      to="/profile/bookings"
                      className="flex items-center text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Mis Reservas
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors py-2 w-full"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-100 pt-2 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
