import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">100+</span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Canchas Disponibles</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">1000+</span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Usuarios Activos</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">5000+</span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Reservas Realizadas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 