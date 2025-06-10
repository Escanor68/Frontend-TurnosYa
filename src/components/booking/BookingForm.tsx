'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const { bookingData, handleInputChange, currentStep, handlePrevStep } =
    useBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Lógica de envío
      navigate('/payment');
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={bookingData.date}
            onChange={handleInputChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
            )}
            aria-label="Fecha de la reserva"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Hora de inicio
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={bookingData.time}
            onChange={handleInputChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
            )}
            aria-label="Hora de inicio"
          />
        </div>

        <div>
          <label
            htmlFor="players"
            className="block text-sm font-medium text-gray-700"
          >
            Número de jugadores
          </label>
          <input
            type="number"
            id="players"
            name="players"
            min="2"
            max="22"
            value={bookingData.players}
            onChange={handleInputChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
            )}
            aria-label="Número de jugadores"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
