'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import type { BookingFormData, SportField } from '../types';
import {
  getFieldById,
  generateTimeSlots,
  additionalServices,
  recurrenceOptions,
} from '../services/mockData';

// Hook personalizado para manejar la lógica de reservas
export const useBooking = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [field, setField] = useState<SportField | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [showRecurrenceOptions, setShowRecurrenceOptions] = useState(false);
  const [showAdditionalServices, setShowAdditionalServices] = useState(false);

  // Estado inicial para el formulario de reserva
  const [bookingData, setBookingData] = useState<BookingFormData>({
    date: '',
    time: '',
    players: 10,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    paymentMethod: 'mercadopago',
    termsAccepted: false,
    recurrence: 'none',
    recurrenceCount: 4,
    additionalServices: [],
    additionalServicesNotes: '',
    recurrenceExceptions: [],
    weekDay: 0,
  });

  // Actualizar datos de contacto cuando el usuario está autenticado
  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        contactName: user.name || prev.contactName,
        contactEmail: user.email || prev.contactEmail,
        contactPhone: user.phone || prev.contactPhone,
      }));
    }
  }, [user]);

  // Analizar parámetros de consulta
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get('date');
    const timeSlotId = params.get('time');

    if (date) {
      setBookingData((prev) => ({ ...prev, date }));

      // Generar franjas horarias basadas en la fecha
      const slots = generateTimeSlots(date);
      setTimeSlots(slots);

      // Si se seleccionó una franja horaria, encontrar la hora correspondiente
      if (timeSlotId) {
        const mockTimeSlots = [
          { id: '1', time: '18:00' },
          { id: '2', time: '19:00' },
          { id: '3', time: '20:00' },
          { id: '4', time: '21:00' },
          { id: '5', time: '22:00' },
        ];

        const selectedSlot = mockTimeSlots.find(
          (slot) => slot.id === timeSlotId
        );
        if (selectedSlot) {
          setBookingData((prev) => ({ ...prev, time: selectedSlot.time }));
        }
      }
    }
  }, [location.search]);

  // Obtener datos del campo
  useEffect(() => {
    if (fieldId) {
      // Simular llamada a API
      setTimeout(() => {
        const fieldData = getFieldById(fieldId);
        setField(fieldData || null);
        setLoading(false);
      }, 500);
    }
  }, [fieldId]);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.info('Debes iniciar sesión para realizar una reserva');
      navigate(
        `/login?redirect=/football/booking/${fieldId}${location.search}`
      );
    }
  }, [loading, isAuthenticated, navigate, fieldId, location.search]);

  // Manejadores de eventos
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setBookingData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }));
  };

  // Manejar cambio de recurrencia desde el RecurrenceSelector
  const handleRecurrenceChange = (recurrence: {
    type: string;
    weekDay: number;
    count: number;
  }) => {
    setBookingData((prev) => ({
      ...prev,
      recurrence: recurrence.type,
      weekDay: recurrence.weekDay,
      recurrenceCount: recurrence.count,
    }));
  };

  // Manejar cambio en el contador de recurrencia
  const handleRecurrenceCountChange = (increment: boolean) => {
    setBookingData((prev) => ({
      ...prev,
      recurrenceCount: increment
        ? Math.min(prev.recurrenceCount + 1, 12)
        : Math.max(prev.recurrenceCount - 1, 2),
    }));
  };

  // Manejar selección de servicios adicionales
  const handleServiceToggle = (serviceId: string) => {
    setBookingData((prev) => {
      if (prev.additionalServices.includes(serviceId)) {
        return {
          ...prev,
          additionalServices: prev.additionalServices.filter(
            (id) => id !== serviceId
          ),
        };
      } else {
        return {
          ...prev,
          additionalServices: [...prev.additionalServices, serviceId],
        };
      }
    });
  };

  // Obtener fechas recurrentes
  const getRecurrenceDates = (): string[] => {
    if (!bookingData.date || bookingData.recurrence === 'none') return [];

    const dates: string[] = [];
    const startDate = new Date(bookingData.date);

    // Ajustar la fecha inicial al próximo día de la semana seleccionado
    while (startDate.getDay() !== bookingData.weekDay) {
      startDate.setDate(startDate.getDate() + 1);
    }

    for (let i = 0; i < bookingData.recurrenceCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i * 7);

      // Verificar si la fecha está en las excepciones
      const dateString = currentDate.toISOString().split('T')[0];
      if (!bookingData.recurrenceExceptions.includes(dateString)) {
        dates.push(dateString);
      }
    }

    return dates;
  };

  // Calcular precio total con el 10% de seña
  const calculateTotalPrice = (): { total: number; deposit: number } => {
    if (!field) return { total: 0, deposit: 0 };

    // Precio base por reserva
    const basePrice = field.price;

    // Multiplicar por la cantidad de reservas
    const totalReservations =
      bookingData.recurrence === 'none' ? 1 : bookingData.recurrenceCount;
    const subtotal = basePrice * totalReservations;

    // Calcular precio de servicios adicionales
    const servicesPrice = bookingData.additionalServices.reduce(
      (total, serviceId) => {
        const service = additionalServices.find((s) => s.id === serviceId);
        return total + (service ? service.price : 0);
      },
      0
    );

    // Precio total
    const total = subtotal + servicesPrice;

    // Calcular el 10% de seña
    const deposit = Math.ceil(total * 0.1);

    return { total, deposit };
  };

  // Navegación entre pasos
  const handleNextStep = () => {
    // Validar paso actual
    if (currentStep === 1) {
      if (!bookingData.date || !bookingData.time) {
        toast.error('Por favor selecciona fecha y hora');
        return;
      }
    } else if (currentStep === 2) {
      if (
        !bookingData.contactName ||
        !bookingData.contactPhone ||
        !bookingData.contactEmail
      ) {
        toast.error('Por favor completa todos los datos de contacto');
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(bookingData.contactEmail)) {
        toast.error('Por favor ingresa un email válido');
        return;
      }

      // Validar formato de teléfono (validación simple)
      if (bookingData.contactPhone.length < 8) {
        toast.error('Por favor ingresa un número de teléfono válido');
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!field) return;

    try {
      setLoading(true);

      // Obtener todas las fechas recurrentes
      const bookingDates = getRecurrenceDates();
      const { total, deposit } = calculateTotalPrice();

      // Crear objeto de reserva
      const bookingPayload = {
        fieldId: field.id,
        userId: user?.id,
        dates: bookingDates.map((date) => ({
          date,
          time: bookingData.time,
        })),
        contactInfo: {
          name: bookingData.contactName,
          phone: bookingData.contactPhone,
          email: bookingData.contactEmail,
        },
        recurrence: {
          type: bookingData.recurrence,
          weekDay: bookingData.weekDay,
          count: bookingData.recurrenceCount,
          exceptions: bookingData.recurrenceExceptions,
        },
        additionalServices: bookingData.additionalServices,
        additionalServicesNotes: bookingData.additionalServicesNotes,
        paymentMethod: bookingData.paymentMethod,
        totalPrice: total,
        deposit,
      };

      // Llamada al backend
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la reserva');
      }

      const data = await response.json();

      // Mostrar mensaje de éxito
      toast.success(
        bookingData.recurrence === 'none'
          ? '¡Reserva realizada con éxito!'
          : `¡Se han programado ${bookingDates.length} reservas con éxito!`
      );

      // Redireccionar al checkout para pagar la seña
      navigate(`/checkout/${data.bookingId}`);
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      toast.error(
        'Ocurrió un error al procesar la reserva. Por favor, intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return {
    field,
    loading,
    currentStep,
    bookingData,
    timeSlots,
    showRecurrenceOptions,
    showAdditionalServices,
    handleInputChange,
    handleTimeSelect,
    handleRecurrenceChange,
    handleRecurrenceCountChange,
    handleServiceToggle,
    calculateTotalPrice,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    formatDate,
    getRecurrenceDates,
    setShowRecurrenceOptions,
    setShowAdditionalServices,
    navigate,
  };
};
