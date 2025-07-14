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

// Estado inicial del formulario
const getInitialFormData = (): BookingFormData => ({
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
});

// Función auxiliar para crear evento sintético
const createSyntheticEvent = (): React.FormEvent =>
  ({
    preventDefault: () => {},
  } as React.FormEvent);

// Función auxiliar para manejo de errores
const handleBookingError = (error: unknown): Error => {
  return error instanceof Error
    ? error
    : new Error('Error al procesar la reserva');
};

export const useBookingFlow = () => {
  const navigate = useNavigate();
  const { handleSubmit: submitBooking } = useBooking();
  const { showSuccess, showError } = useNotification();

  const [state, setState] = useState<BookingFlowState>({
    step: 1,
    formData: getInitialFormData(),
    isLoading: false,
    error: null,
  });

  // Función auxiliar para actualizar el estado
  const updateState = useCallback((updates: Partial<BookingFlowState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Función auxiliar para actualizar solo los datos del formulario
  const updateFormData = useCallback(
    (data: Partial<BookingFormData>) => {
      updateState({
        formData: { ...state.formData, ...data },
      });
    },
    [state.formData, updateState]
  );

  // Función auxiliar para manejar la navegación entre pasos
  const navigateStep = useCallback(
    (direction: 'next' | 'prev') => {
      updateState({
        step: direction === 'next' ? state.step + 1 : state.step - 1,
      });
    },
    [state.step, updateState]
  );

  const nextStep = useCallback(() => {
    navigateStep('next');
  }, [navigateStep]);

  const prevStep = useCallback(() => {
    navigateStep('prev');
  }, [navigateStep]);

  // Función auxiliar para procesar la reserva
  const processBooking = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null });

      const syntheticEvent = createSyntheticEvent();
      await submitBooking(syntheticEvent);

      showSuccess('Reserva creada exitosamente');
      navigate('/bookings');
    } catch (error) {
      const errorObj = handleBookingError(error);
      updateState({ error: errorObj });
      showError(errorObj.message);
    } finally {
      updateState({ isLoading: false });
    }
  }, [submitBooking, showSuccess, showError, navigate, updateState]);

  const handleSubmit = useCallback(async () => {
    await processBooking();
  }, [processBooking]);

  return {
    ...state,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
