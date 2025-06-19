import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from './useBooking';
import { useNotification } from './useNotification';
import type { BookingFormData } from '../types/booking';

interface BookingFlowState {
  step: number;
  formData: BookingFormData;
  isLoading: boolean;
  error: Error | null;
}

export const useBookingFlow = () => {
  const navigate = useNavigate();
  const { handleSubmit: submitBooking } = useBooking();
  const { showSuccess, showError } = useNotification();

  const [state, setState] = useState<BookingFlowState>({
    step: 1,
    formData: {
      fieldId: '',
      userId: '',
      date: '',
      time: '',
      players: 10,
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      paymentMethod: 'mercadopago',
      status: 'pending',
      paymentDetails: {
        cardNumber: '',
        expiryDate: '',
        cardholderName: '',
      },
      termsAccepted: false,
      recurrence: 'none',
      recurrenceCount: 4,
      additionalServices: [],
      additionalServicesNotes: '',
      recurrenceExceptions: [],
      price: 0,
    },
    isLoading: false,
    error: null,
  });

  const updateFormData = useCallback((data: Partial<BookingFormData>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...data },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: prev.step + 1,
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: prev.step - 1,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Crear la reserva usando el método handleSubmit del useBooking
      // Crear un evento sintético para simular el submit del formulario
      const syntheticEvent = {
        preventDefault: () => {},
      } as React.FormEvent;

      await submitBooking(syntheticEvent);

      showSuccess('Reserva creada exitosamente');

      // Navegar a la página de reservas
      navigate('/bookings');
    } catch (error) {
      const errorObj =
        error instanceof Error
          ? error
          : new Error('Error al procesar la reserva');
      setState((prev) => ({ ...prev, error: errorObj }));
      showError(errorObj.message);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [submitBooking, showSuccess, showError, navigate]);

  return {
    ...state,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
