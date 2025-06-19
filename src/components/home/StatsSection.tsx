import React, { useMemo } from 'react';

const StatsSection: React.FC = React.memo(() => {
  const stats = useMemo(
    () => [
      {
        value: '100+',
        label: 'Canchas Disponibles',
      },
      {
        value: '1000+',
        label: 'Usuarios Activos',
      },
      {
        value: '5000+',
        label: 'Reservas Realizadas',
      },
    ],
    []
  );

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {stat.value}
              </span>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
