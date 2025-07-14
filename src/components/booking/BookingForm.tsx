'use client';

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BookingForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { bookingData, handleInputChange, currentStep, handlePrevStep } =
    useBooking();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Lógica de envío
        navigate('/payment');
      } catch (error) {
        console.error('Error al crear la reserva:', error);
      }
    },
    [navigate]
  );

  const handlePrevStepClick = useCallback(() => {
    handlePrevStep();
  }, [handlePrevStep]);

  const isFirstStep = currentStep === 1;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3"
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
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base sm:text-sm p-3 sm:p-2 transition-colors'
            )}
            aria-label="Fecha de la reserva"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3"
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
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base sm:text-sm p-3 sm:p-2 transition-colors'
            )}
            aria-label="Hora de inicio"
          />
        </div>

        <div>
          <label
            htmlFor="players"
            className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3"
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
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base sm:text-sm p-3 sm:p-2 transition-colors'
            )}
            aria-label="Número de jugadores"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
        <button
          type="button"
          onClick={handlePrevStepClick}
          disabled={isFirstStep}
          className="inline-flex items-center justify-center px-4 py-3 sm:py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 sm:order-1"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-3 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors order-1 sm:order-2"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
});

BookingForm.displayName = 'BookingForm';
