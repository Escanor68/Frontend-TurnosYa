import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Panel de Propietario</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Gestionar Canchas</h2>
          <p className="text-gray-600 mb-4">
            Administra tus canchas, agrega nuevas o edita las existentes.
          </p>
          <Link
            to="/owner/courts"
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Ir a Mis Canchas
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Gestionar Reservas</h2>
          <p className="text-gray-600 mb-4">
            Consulta y gestiona las reservas de tus canchas.
          </p>
          <Link
            to="/owner/bookings"
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Ir a Reservas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
