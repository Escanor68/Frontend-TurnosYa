import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export default function AdminDashboardPage() {
  const { isLoading } = useAuthRedirect({
    requireAuth: true,
    allowedRoles: ['admin'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta de Usuarios */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Usuarios</h3>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los usuarios de la plataforma
            </p>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <a
              href="/admin/users"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Ver todos los usuarios
            </a>
          </div>
        </div>

        {/* Tarjeta de Canchas */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Canchas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Administra las canchas registradas
            </p>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <a
              href="/admin/courts"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Ver todas las canchas
            </a>
          </div>
        </div>

        {/* Tarjeta de Reservas */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Reservas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Visualiza y gestiona las reservas
            </p>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <a
              href="/admin/bookings"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Ver todas las reservas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 