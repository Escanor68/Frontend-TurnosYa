import React from 'react';
import { Link } from 'react-router-dom';

// TODO: Reemplazar con imágenes reales de las canchas
const FEATURED_COURTS = [
  {
    id: 1,
    name: 'Cancha Principal',
    description: 'Césped sintético profesional, iluminación LED',
    image: '/placeholder-court.jpg',
  },
  {
    id: 2,
    name: 'Cancha La 10',
    description: 'Césped natural, vestuarios premium',
    image: '/placeholder-court-2.jpg',
  },
  {
    id: 3,
    name: 'Complejo Deportivo Norte',
    description: 'Multiple canchas, estacionamiento gratuito',
    image: '/placeholder-court-3.jpg',
  },
];

const FeaturedCourts: React.FC = () => {
  return (
    <>
      {/* Mapa de Canchas */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Encuentra canchas cerca de ti
          </h2>
          <div className="mt-8 aspect-w-16 aspect-h-9">
            {/* TODO: Implementar el mapa de Google aquí */}
            <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Mapa de Google será implementado aquí
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Canchas Destacadas */}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Canchas Destacadas
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_COURTS.map(court => (
              <div key={court.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    className="object-cover w-full h-48"
                    src={court.image}
                    alt={court.name}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {court.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {court.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/courts/${court.id}`}
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                    >
                      Ver disponibilidad →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCourts; 