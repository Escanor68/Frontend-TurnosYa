import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-red-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acceso Denegado
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          No tienes permisos para acceder a esta página
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <p className="text-center text-sm text-gray-500">
              Si crees que esto es un error, por favor contacta al administrador
            </p>
            <div>
              <button
                onClick={() => navigate(-1)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Volver
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate('/')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
