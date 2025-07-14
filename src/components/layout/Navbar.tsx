import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  LogOut,
  Home,
  Calendar,
  Users,
  Settings,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const closeUserMenu = useCallback(() => {
    setIsUserMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
    closeUserMenu();
  }, [logout, closeMobileMenu, closeUserMenu]);

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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom sticky-top">
      <div className="container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fw-bold text-success"
          onClick={closeMobileMenu}
        >
          <div
            className="bg-success text-white rounded-3 d-flex align-items-center justify-content-center me-2"
            style={{ width: '32px', height: '32px' }}
          >
            <span className="fw-bold small">TY</span>
          </div>
          <span className="h4 mb-0">TurnosYa</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && roleLinks.length > 0 && (
              <>
                {roleLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.to} className="nav-item">
                      <Link
                        to={link.to}
                        className="nav-link d-flex align-items-center gap-2 fw-medium"
                      >
                        <Icon size={16} />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </ul>

          {/* Right side items */}
          <div className="d-flex align-items-center gap-3">
            {/* Language Selector */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Globe size={16} />
                <span>Idioma</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#es">
                    Español
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#en">
                    English
                  </a>
                </li>
              </ul>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  onClick={toggleUserMenu}
                >
                  <User size={16} />
                  <span>{user?.name || 'Usuario'}</span>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.ul
                      className="dropdown-menu show"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <li>
                        <Link
                          to={`/${user?.role}/profile`}
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={closeUserMenu}
                        >
                          <User size={16} />
                          Mi Perfil
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item d-flex align-items-center gap-2 text-danger"
                        >
                          <LogOut size={16} />
                          Cerrar Sesión
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-primary">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-success">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar-collapse"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {isAuthenticated && roleLinks.length > 0 && (
                  <>
                    {roleLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.to} className="nav-item">
                          <Link
                            to={link.to}
                            className="nav-link d-flex align-items-center gap-2"
                            onClick={closeMobileMenu}
                          >
                            <Icon size={18} />
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="nav-item">
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`/${user?.role}/profile`}
                        className="nav-link d-flex align-items-center gap-2"
                        onClick={closeMobileMenu}
                      >
                        <User size={18} />
                        Mi Perfil
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="nav-link d-flex align-items-center gap-2 text-danger border-0 bg-transparent w-100 text-start"
                      >
                        <LogOut size={18} />
                        Cerrar Sesión
                      </button>
                    </li>
                  </>
                )}

                {!isAuthenticated && (
                  <li className="nav-item">
                    <div className="d-grid gap-2">
                      <Link
                        to="/login"
                        className="btn btn-outline-primary"
                        onClick={closeMobileMenu}
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-success"
                        onClick={closeMobileMenu}
                      >
                        Registrarse
                      </Link>
                    </div>
                  </li>
                )}
              </ul>

              {/* Language Selector Mobile */}
              <div className="border-top pt-3">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle w-100 d-flex align-items-center justify-content-between"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center gap-2">
                      <Globe size={16} />
                      Idioma
                    </span>
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li>
                      <a className="dropdown-item" href="#es">
                        Español
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#en">
                        English
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default React.memo(Navbar);
