import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">
          Aquí podrás configurar las preferencias de tu cuenta y notificaciones.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
