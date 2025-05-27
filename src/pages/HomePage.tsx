import React from 'react';
import { CalendarIcon, CogIcon, CreditCardIcon } from '@heroicons/react/outline';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Bienvenido a</span>
            <span className="block text-primary-600">TurnosYA</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            La forma más fácil de reservar tu cancha deportiva
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Características principales */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                    <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Reserva Fácil</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Encuentra y reserva tu cancha en minutos
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                    <CogIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Gestión Simple</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Administra tus reservas desde cualquier dispositivo
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                    <CreditCardIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Pago Seguro</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Múltiples métodos de pago seguros
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 