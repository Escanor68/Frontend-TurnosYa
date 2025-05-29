import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface MenuItemProps {
  to: string;
  label: string;
  icon?: string;
}

const MenuItem = ({ to, label, icon }: MenuItemProps) => (
  <Link
    to={to}
    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
  >
    {icon && <span className="material-icons mr-2">{icon}</span>}
    <span>{label}</span>
  </Link>
);

export const MainMenu = () => {
  const { user } = useAuth();

  const isAdmin = user?.roles.includes('admin');
  const isOwner = user?.roles.includes('owner');

  return (
    <nav className="space-y-1">
      {/* Menú común para todos */}
      <MenuItem to="/fields" label="Buscar Canchas" icon="search" />
      <MenuItem to="/bookings" label="Mis Reservas" icon="calendar_today" />

      {/* Menú para usuarios autenticados */}
      {user && (
        <>
          <MenuItem to="/profile" label="Mi Perfil" icon="person" />
          <MenuItem to="/favorites" label="Mis Favoritos" icon="favorite" />
        </>
      )}

      {/* Menú solo para admin/owner */}
      {(isAdmin || isOwner) && (
        <>
          <div className="px-4 py-2 text-sm font-semibold text-gray-400">
            Administración
          </div>
          <MenuItem
            to="/fields/manage"
            label="Gestionar Canchas"
            icon="sports_soccer"
          />
          <MenuItem
            to="/bookings/all"
            label="Todas las Reservas"
            icon="list_alt"
          />
          <MenuItem to="/fields/stats" label="Estadísticas" icon="analytics" />
        </>
      )}

      {/* Menú solo para admin */}
      {isAdmin && (
        <>
          <div className="px-4 py-2 text-sm font-semibold text-gray-400">
            Configuración
          </div>
          <MenuItem to="/admin/users" label="Usuarios" icon="group" />
          <MenuItem
            to="/admin/settings"
            label="Configuración"
            icon="settings"
          />
        </>
      )}
    </nav>
  );
};
