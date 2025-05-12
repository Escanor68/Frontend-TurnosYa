import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, Percent as Soccer, CalendarDays } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-emerald-600 text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Soccer className="w-8 h-8" />
          <span className="text-xl font-bold">FútbolYa</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-emerald-200 transition-colors">
            Inicio
          </Link>
          <Link to="/fields" className="hover:text-emerald-200 transition-colors">
            Canchas
          </Link>
          {isAuthenticated ? (
            <>
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-emerald-200 transition-colors">
                  <span>{user?.name}</span>
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition-colors"
                  >
                    Mi Perfil
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition-colors"
                    >
                      Panel de Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-emerald-100 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-emerald-700 hover:bg-emerald-800 transition-colors"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md border border-white hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="text-white py-2 hover:bg-emerald-600 px-3 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/fields"
              className="text-white py-2 hover:bg-emerald-600 px-3 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Canchas
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-white py-2 hover:bg-emerald-600 px-3 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-white py-2 hover:bg-emerald-600 px-3 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Panel de Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white py-2 hover:bg-emerald-600 px-3 rounded transition-colors text-left flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white py-2 bg-emerald-600 px-3 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="text-white py-2 border border-white px-3 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;