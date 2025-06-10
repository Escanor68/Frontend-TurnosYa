import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from './useBooking';
import { usePayment } from './usePayment';
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
  const { createBooking } = useBooking();
  const { createPayment } = usePayment();
  const { showNotification } = useNotification();

  const [state, setState] = useState<BookingFlowState>({
    step: 1,
    formData: {
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      paymentDetails: {
        method: 'mercadopago',
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
      },
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

      // Crear la reserva
      const booking = await createBooking(state.formData);

      // Procesar el pago
      const payment = await createPayment({
        bookingId: booking.id,
        amount: booking.totalPrice,
        currency: booking.currency,
        method: state.formData.paymentDetails.method,
      });

      showNotification({
        type: 'success',
        message: 'Reserva creada exitosamente',
      });

      navigate(`/bookings/${booking.id}`);
    } catch (error) {
      const errorObj =
        error instanceof Error
          ? error
          : new Error('Error al procesar la reserva');
      setState((prev) => ({ ...prev, error: errorObj }));
      showNotification({
        type: 'error',
        message: errorObj.message,
      });
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [
    state.formData,
    createBooking,
    createPayment,
    showNotification,
    navigate,
  ]);

  return {
    ...state,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
