import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Trophy, Calendar, User, Settings, LogOut } from 'lucide-react';

export const MainMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Menú para usuarios no autenticados
  const publicMenuItems = [
    {
      to: '/football/fields',
      icon: <Trophy className="w-5 h-5" />,
      label: 'Canchas',
    },
    {
      to: '/about',
      label: 'Nosotros',
    },
    {
      to: '/contact',
      label: 'Contacto',
    },
  ];

  // Menú para jugadores
  const playerMenuItems = [
    {
      to: '/football/fields',
      icon: <Trophy className="w-5 h-5" />,
      label: 'Canchas',
    },
    {
      to: '/profile/bookings',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Mis Reservas',
    },
    {
      to: '/profile',
      icon: <User className="w-5 h-5" />,
      label: 'Mi Perfil',
    },
  ];

  // Menú para dueños de canchas
  const ownerMenuItems = [
    {
      to: '/field-owner/dashboard',
      icon: <Trophy className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      to: '/fields/manage',
      icon: <Settings className="w-5 h-5" />,
      label: 'Mis Canchas',
    },
    {
      to: '/profile',
      icon: <User className="w-5 h-5" />,
      label: 'Mi Perfil',
    },
  ];

  // Seleccionar los items del menú según el rol
  const getMenuItems = () => {
    if (!isAuthenticated) return publicMenuItems;

    switch (user?.role) {
      case 'owner':
        return ownerMenuItems;
      case 'player':
        return playerMenuItems;
      default:
        return publicMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Trophy className="h-8 w-8 text-emerald-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  TurnosYa
                </span>
              </Link>
            </div>

            {/* Menú principal */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive(item.to)
                      ? 'border-b-2 border-emerald-500 text-gray-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Botones de autenticación */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-500 hover:text-gray-700">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
                >
                  Registrarse
                </Link>
              </div>
            ) : (
              <button
                onClick={() => logout()}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                isActive(item.to)
                  ? 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700'
                  : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </div>
            </Link>
          ))}

          {/* Botones de autenticación móvil */}
          {!isAuthenticated ? (
            <div className="mt-4 space-y-2 px-3">
              <Link
                to="/login"
                className="block text-gray-500 hover:text-gray-700"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="block bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 text-center"
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <button
              onClick={() => logout()}
              className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar Sesión
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
