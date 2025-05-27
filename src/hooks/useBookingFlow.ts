import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { footballService } from '../services/football.service';
import { paymentService } from '../services/payment.service';
import { useAuth } from './useAuth';
import { CreateBookingDTO, Booking } from '../types/booking';
import { toast } from 'react-hot-toast';

export const useBookingFlow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const startBooking = async (bookingData: CreateBookingDTO) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Verificar disponibilidad
      const availability = await footballService.checkFieldAvailability(
        bookingData.fieldId,
        bookingData.date
      );

      const isAvailable = availability.some(slot => 
        slot.startTime <= bookingData.startTime && slot.endTime >= bookingData.endTime
      );

      if (!isAvailable) {
        throw new Error('El horario seleccionado no está disponible');
      }

      // 2. Crear la reserva
      const booking = await footballService.createBooking(bookingData);
      setCurrentBooking(booking);

      // 3. Crear preferencia de pago
      const paymentPreference = await paymentService.createPreference({
        items: [{
          title: `Reserva cancha ${booking.field.name}`,
          quantity: 1,
          unit_price: booking.totalPrice,
          currency_id: 'ARS'
        }],
        payer: {
          email: user?.email || '',
          name: user?.name || ''
        },
        back_urls: {
          success: `${window.location.origin}/bookings/${booking.id}/success`,
          failure: `${window.location.origin}/bookings/${booking.id}/failure`
        }
      });

      // 4. Redirigir al checkout
      window.location.href = paymentPreference.init_point;

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al procesar la reserva';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (bookingId: string) => {
    try {
      setLoading(true);
      const booking = await footballService.getBookingById(bookingId);
      setCurrentBooking(booking);
      toast.success('Pago procesado correctamente');
      navigate(`/bookings/${bookingId}`);
    } catch (err) {
      toast.error('Error al verificar el estado del pago');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      setLoading(true);
      await footballService.cancelBooking(bookingId);
      toast.success('Reserva cancelada correctamente');
      navigate('/bookings');
    } catch (err) {
      toast.error('Error al cancelar la reserva');
    } finally {
      setLoading(false);
    }
  };

  return {
    startBooking,
    handlePaymentSuccess,
    cancelBooking,
    loading,
    error,
    currentBooking
  };
}; 