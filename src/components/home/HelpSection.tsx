import React from 'react';
import { Link } from 'react-router-dom';

const HelpSection: React.FC = () => {
  return (
    <div id="ayuda" className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Centro de Ayuda
        </h2>
        
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Para Jugadores */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Para Jugadores</h3>
              <dl className="mt-4 space-y-6">
                <div>
                  <dt className="text-lg font-medium text-gray-900 dark:text-white">
                    ¿Cómo reservo una cancha?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Inicia sesión, selecciona la cancha y el horario deseado, y confirma tu reserva.
                    El proceso es simple y rápido.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-medium text-gray-900 dark:text-white">
                    ¿Puedo cancelar mi reserva?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Sí, puedes cancelar hasta 24 horas antes de tu turno sin cargo alguno.
                    Después de ese plazo, aplican políticas específicas de cada establecimiento.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-medium text-gray-900 dark:text-white">
                    ¿Cómo pago mi reserva?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Aceptamos múltiples métodos de pago seguros. Puedes pagar en línea
                    o en el establecimiento según la política de cada cancha.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Para Dueños */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Para Dueños de Canchas</h3>
              <dl className="mt-4 space-y-6">
                <div>
                  <dt className="text-lg font-medium text-gray-900 dark:text-white">
                    ¿Cómo agrego mi cancha?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Regístrate como dueño, verifica tu cuenta y sigue el proceso de alta de canchas.
                    Nuestro equipo te guiará en cada paso.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-medium text-gray-900 dark:text-white">
                    ¿Cómo gestiono las reservas?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Desde tu dashboard podrás ver y gestionar todas las reservas, horarios,
                    precios y disponibilidad en tiempo real.
                  </dd>
                </div>
                <div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection; 