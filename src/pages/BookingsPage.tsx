import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const BookingsPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Mis Reservas
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Historial y estado de tus reservas
            </p>
          </div>
          <div className="border-t border-gray-200">
            {/* Lista de reservas - Placeholder */}
            <div className="bg-gray-50 px-4 py-5 sm:p-6">
              <div className="text-center text-gray-500">
                <p>No hay reservas para mostrar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 