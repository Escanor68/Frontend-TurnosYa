import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import footballService, {
  FootballField,
  Booking,
  SpecialHour,
  OwnerStatistics,
  CreateBookingData,
} from '../services/football.service';

export const useFootball = () => {
  const [fields, setFields] = useState<FootballField[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las canchas
  const getFields = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await footballService.getFields();
      setFields(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al obtener las canchas';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener cancha por ID
  const getFieldById = useCallback(async (fieldId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await footballService.getFieldById(fieldId);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al obtener la cancha';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar canchas
  const searchFields = useCallback(async (query: string, city?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await footballService.searchFields(query, city);
      setFields(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al buscar canchas';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener canchas cercanas
  const getNearbyFields = useCallback(
    async (lat: number, lng: number, radius: number = 10) => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.getNearbyFields(lat, lng, radius);
        setFields(data);
        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Error al obtener canchas cercanas';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtener disponibilidad de cancha
  const getFieldAvailability = useCallback(
    async (fieldId: number, date: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.getFieldAvailability(fieldId, date);
        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Error al obtener disponibilidad';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtener reservas
  const getBookings = useCallback(
    async (filters?: { userId?: string; fieldId?: number; date?: string }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.getBookings(filters);
        setBookings(data);
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Error al obtener reservas';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Crear reserva
  const createBooking = useCallback(async (bookingData: CreateBookingData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await footballService.createBooking(bookingData);
      toast.success('Reserva creada exitosamente');
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al crear la reserva';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancelar reserva
  const cancelBooking = useCallback(async (bookingId: number) => {
    setLoading(true);
    setError(null);
    try {
      await footballService.cancelBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      toast.success('Reserva cancelada exitosamente');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al cancelar la reserva';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener canchas de propietario
  const getOwnerFields = useCallback(async (ownerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await footballService.getOwnerFields(ownerId);
      setFields(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error al obtener canchas del propietario';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener estadísticas de propietario
  const getOwnerStatistics = useCallback(
    async (ownerId: string): Promise<OwnerStatistics> => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.getOwnerStatistics(ownerId);
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Error al obtener estadísticas';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Crear cancha
  const createField = useCallback(
    async (fieldData: Omit<FootballField, 'id'>) => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.createField(fieldData);
        setFields((prev) => [...prev, data]);
        toast.success('Cancha creada exitosamente');
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Error al crear la cancha';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Crear horario especial
  const createSpecialHour = useCallback(
    async (
      fieldId: number,
      specialHourData: Omit<SpecialHour, 'id' | 'fieldId'>
    ) => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.createSpecialHour(
          fieldId,
          specialHourData
        );
        toast.success('Horario especial creado exitosamente');
        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Error al crear horario especial';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Crear reseña
  const createReview = useCallback(
    async (
      fieldId: number,
      reviewData: {
        rating: number;
        comment: string;
        userId: string;
      }
    ) => {
      setLoading(true);
      setError(null);
      try {
        const data = await footballService.createReview(fieldId, reviewData);
        toast.success('Reseña creada exitosamente');
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Error al crear la reseña';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Verificar salud del backend
  const checkHealth = useCallback(async () => {
    try {
      const data = await footballService.health();
      return data;
    } catch (err) {
      console.error('Error checking backend health:', err);
      throw err;
    }
  }, []);

  // Verificar autenticación
  const testAuth = useCallback(async () => {
    try {
      const data = await footballService.testAuth();
      return data;
    } catch (err) {
      console.error('Error testing authentication:', err);
      throw err;
    }
  }, []);

  return {
    // Estado
    fields,
    bookings,
    loading,
    error,

    // Acciones
    getFields,
    getFieldById,
    searchFields,
    getNearbyFields,
    getFieldAvailability,
    getBookings,
    createBooking,
    cancelBooking,
    getOwnerFields,
    getOwnerStatistics,
    createField,
    createSpecialHour,
    createReview,
    checkHealth,
    testAuth,
  };
};
