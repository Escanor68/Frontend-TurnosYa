'use client';

import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const BookingForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { bookingData, handleInputChange, currentStep, handlePrevStep } =
    useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'No puedes reservar fechas pasadas';
      }
    }

    if (!bookingData.time) {
      newErrors.time = 'La hora es requerida';
    }

    if (!bookingData.players || bookingData.players < 2) {
      newErrors.players = 'Mínimo 2 jugadores';
    } else if (bookingData.players > 22) {
      newErrors.players = 'Máximo 22 jugadores';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [bookingData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        // Simular delay de procesamiento
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Lógica de envío
        navigate('/payment');
      } catch (error) {
        console.error('Error al crear la reserva:', error);
        setErrors({
          submit: 'Error al procesar la reserva. Intenta nuevamente.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate, validateForm]
  );

  const handlePrevStepClick = useCallback(() => {
    handlePrevStep();
  }, [handlePrevStep]);

  const handleInputChangeLocal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;

      // Limpiar error del campo cuando el usuario empiece a escribir
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      handleInputChange(e);
    },
    [errors, handleInputChange]
  );

  const isFirstStep = currentStep === 1;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Detalles de la Reserva
          </h2>
          <span className="text-sm text-gray-500">Paso {currentStep} de 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{errors.submit}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Date Field */}
        <div className="relative">
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Fecha de la reserva
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={bookingData.date}
            onChange={handleInputChangeLocal}
            className={cn(
              'w-full px-4 py-3 border rounded-xl text-base transition-all duration-200',
              'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              'placeholder-gray-400',
              errors.date
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 bg-white hover:border-gray-400'
            )}
            aria-label="Fecha de la reserva"
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <div
              id="date-error"
              className="mt-2 flex items-center space-x-2 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.date}</span>
            </div>
          )}
        </div>

        {/* Time Field */}
        <div className="relative">
          <label
            htmlFor="time"
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Hora de inicio
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={bookingData.time}
            onChange={handleInputChangeLocal}
            className={cn(
              'w-full px-4 py-3 border rounded-xl text-base transition-all duration-200',
              'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              'placeholder-gray-400',
              errors.time
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 bg-white hover:border-gray-400'
            )}
            aria-label="Hora de inicio"
            aria-describedby={errors.time ? 'time-error' : undefined}
          />
          {errors.time && (
            <div
              id="time-error"
              className="mt-2 flex items-center space-x-2 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.time}</span>
            </div>
          )}
        </div>

        {/* Players Field */}
        <div className="relative">
          <label
            htmlFor="players"
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            <Users className="w-4 h-4 inline mr-2" />
            Número de jugadores
          </label>
          <input
            type="number"
            id="players"
            name="players"
            min="2"
            max="22"
            value={bookingData.players}
            onChange={handleInputChangeLocal}
            className={cn(
              'w-full px-4 py-3 border rounded-xl text-base transition-all duration-200',
              'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              'placeholder-gray-400',
              errors.players
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 bg-white hover:border-gray-400'
            )}
            aria-label="Número de jugadores"
            aria-describedby={errors.players ? 'players-error' : undefined}
          />
          {errors.players && (
            <div
              id="players-error"
              className="mt-2 flex items-center space-x-2 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.players}</span>
            </div>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Mínimo 2, máximo 22 jugadores
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handlePrevStepClick}
          disabled={isFirstStep || isSubmitting}
          className={cn(
            'flex items-center justify-center px-6 py-3 border rounded-xl text-base font-medium transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isFirstStep
              ? 'border-gray-200 text-gray-400 bg-gray-50'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400'
          )}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Anterior
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105 shadow-md hover:shadow-lg'
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Continuar
            </>
          )}
        </button>
      </div>
    </form>
  );
});

BookingForm.displayName = 'BookingForm';
