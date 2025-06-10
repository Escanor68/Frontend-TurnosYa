'use client';

import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import type { BookingFormData, SportField } from '../types';
import bookingService from '../services/booking.service';
import fieldService from '../services/FieldService';
import { paymentService } from '../services/payment.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const RECURRENCE_OPTIONS = [
  { id: 'none', name: 'Sin recurrencia', discount: 0 },
  { id: 'weekly', name: 'Semanal', discount: 10 },
  { id: 'biweekly', name: 'Quincenal', discount: 15 },
  { id: 'monthly', name: 'Mensual', discount: 20 },
] as const;

const INITIAL_BOOKING_DATA: BookingFormData = {
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
};

export const useBooking = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [field, setField] = useState<SportField | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] =
    useState<BookingFormData>(INITIAL_BOOKING_DATA);

  // Actualizar datos de contacto cuando el usuario está autenticado
  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        contactName: user.name || prev.contactName,
        contactEmail: user.email || prev.contactEmail,
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
      const slots = generateTimeSlots();
      setTimeSlots(slots);

      if (timeSlotId) {
        const selectedSlot = slots.find((slot) => slot === timeSlotId);
        if (selectedSlot) {
          setBookingData((prev) => ({ ...prev, time: selectedSlot }));
        }
      }
    }
  }, [location.search]);

  // Obtener datos del campo
  useEffect(() => {
    const fetchField = async () => {
      if (!fieldId) return;

      try {
        const fieldData = await fieldService.getFieldById(fieldId);
        const sportField: SportField = {
          id: fieldData.id,
          name: fieldData.name,
          type: 'fútbol',
          price: fieldData.pricePerHour,
          duration: 60,
          players: fieldData.size,
          image: fieldData.images[0] || '',
          hasAdditionalServices: fieldData.hasAdditionalServices,
          additionalServices: fieldData.additionalServices,
          location: {
            address: fieldData.address,
            city: fieldData.city,
            province: fieldData.state,
          },
          ownerId: fieldData.ownerId,
          description: fieldData.description,
        };
        setField(sportField);
      } catch (err) {
        console.error('Error fetching field:', err);
        setError('Error al cargar los datos del campo');
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [fieldId]);

  // Verificar autenticación
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.info('Debes iniciar sesión para realizar una reserva');
      navigate(
        `/login?redirect=/football/booking/${fieldId}${location.search}`
      );
    }
  }, [loading, isAuthenticated, navigate, fieldId, location.search]);

  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 18; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

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

  const handleRecurrenceChange = (recurrence: {
    type: string;
    count: number;
  }) => {
    setBookingData((prev) => ({
      ...prev,
      recurrence: recurrence.type,
      recurrenceCount: recurrence.count,
    }));
  };

  const handleRecurrenceCountChange = (increment: boolean) => {
    setBookingData((prev) => ({
      ...prev,
      recurrenceCount: increment
        ? Math.min(prev.recurrenceCount + 1, 12)
        : Math.max(prev.recurrenceCount - 1, 2),
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setBookingData((prev) => {
      const services = prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter((id) => id !== serviceId)
        : [...prev.additionalServices, serviceId];
      return { ...prev, additionalServices: services };
    });
  };

  const calculateTotalPrice = () => {
    if (!field) return 0;

    let total = field.price;

    if (bookingData.recurrence !== 'none') {
      const recurrenceOption = RECURRENCE_OPTIONS.find(
        (o) => o.id === bookingData.recurrence
      );
      if (recurrenceOption) {
        total = total * (1 - recurrenceOption.discount / 100);
      }
    }

    total = total * bookingData.recurrenceCount;

    bookingData.additionalServices.forEach((serviceId) => {
      const service = field.additionalServices?.find((s) => s.id === serviceId);
      if (service) {
        total += service.price;
      }
    });

    return total;
  };

  const calculateEndTime = (startTime: string): string => {
    const [hour, minute] = startTime.split(':');
    const endHour = parseInt(hour) + 1;
    return `${endHour.toString().padStart(2, '0')}:${minute}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !field) {
      toast.error('Debes iniciar sesión para realizar una reserva');
      navigate('/login', { state: { from: location } });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const booking = await bookingService.createBooking({
        fieldId: field.id,
        field: {
          id: field.id,
          name: field.name,
          description: field.description || '',
          address: field.location.address,
          city: field.location.city,
          state: field.location.province,
          country: 'Argentina',
          latitude: 0,
          longitude: 0,
          pricePerHour: field.price,
          currency: 'ARS',
          surfaceType: 'ARTIFICIAL_GRASS',
          size: field.players as '5' | '7' | '11',
          hasLighting: true,
          hasParking: true,
          hasShowers: true,
          hasChangingRooms: true,
          hasEquipment: true,
          hasAdditionalServices: field.hasAdditionalServices,
          additionalServices: field.additionalServices,
          images: [field.image],
          ownerId: field.ownerId || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        userId: user?.id || '',
        date: bookingData.date,
        startTime: bookingData.time,
        endTime: calculateEndTime(bookingData.time),
        status: 'PENDING',
        totalPrice: calculateTotalPrice(),
        currency: 'ARS',
        paymentStatus: 'PENDING',
      });

      const paymentPreference = await paymentService.createPaymentPreference(
        booking.id
      );
      window.location.href = paymentPreference.initPoint;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al procesar la reserva';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: es });
  };

  const getRecurrenceDates = () => {
    if (bookingData.recurrence === 'none' || !bookingData.date) {
      return [bookingData.date];
    }

    const dates: string[] = [];
    const startDate = new Date(bookingData.date);
    const currentDate = new Date(startDate);

    for (let i = 0; i < bookingData.recurrenceCount; i++) {
      dates.push(currentDate.toISOString().split('T')[0]);
      switch (bookingData.recurrence) {
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case 'biweekly':
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }
    return dates;
  };

  return {
    field,
    loading,
    error,
    currentStep,
    timeSlots,
    bookingData,
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
    setCurrentStep,
  };
};
