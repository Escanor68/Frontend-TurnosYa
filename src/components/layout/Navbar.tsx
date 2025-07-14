import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Calendar,
  Users,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LanguageSelector } from '../common/LanguageSelector';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
  }, [logout, closeMobileMenu]);

  const getRoleLinks = () => {
    if (!isAuthenticated || !user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { to: '/admin', label: 'Dashboard', icon: Home },
          { to: '/admin/users', label: 'Usuarios', icon: Users },
          { to: '/admin/courts', label: 'Canchas', icon: Settings },
          { to: '/admin/bookings', label: 'Reservas', icon: Calendar },
        ];
      case 'owner':
        return [
          { to: '/owner', label: 'Dashboard', icon: Home },
          { to: '/owner/courts', label: 'Mis Canchas', icon: Settings },
          { to: '/owner/bookings', label: 'Reservas', icon: Calendar },
          { to: '/owner/users', label: 'Usuarios', icon: Users },
        ];
      case 'player':
        return [
          { to: '/player/bookings', label: 'Mis Reservas', icon: Calendar },
        ];
      default:
        return [];
    }
  };

  const roleLinks = getRoleLinks();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TY</span>
              </div>
              <span>TurnosYa</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isAuthenticated && roleLinks.length > 0 && (
              <div className="flex items-center space-x-1">
                {roleLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Language Selector */}
            <div className="ml-4">
              <LanguageSelector variant="dropdown" />
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to={`/${user?.role}/profile`}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-all duration-200 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Perfil</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-all duration-200 group"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated && roleLinks.length > 0 && (
              <>
                {roleLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-base font-medium transition-all duration-200"
                      onClick={closeMobileMenu}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  to={`/${user?.role}/profile`}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  <User className="w-5 h-5" />
                  <span>Mi Perfil</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-base font-medium transition-all duration-200"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-base font-medium transition-all duration-200 text-center"
                  onClick={closeMobileMenu}
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Language Selector Mobile */}
            <div className="border-t border-gray-200 pt-2">
              <LanguageSelector variant="dropdown" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default React.memo(Navbar);
