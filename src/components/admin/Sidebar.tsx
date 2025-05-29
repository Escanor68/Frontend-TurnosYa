import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/admin/users', icon: Users },
  { name: 'Canchas', href: '/admin/courts', icon: Calendar },
  { name: 'Reservas', href: '/admin/bookings', icon: BookOpen },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
  { name: 'Ayuda', href: '/admin/help', icon: HelpCircle },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-xl font-semibold text-gray-800">
            Admin Panel
          </span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
