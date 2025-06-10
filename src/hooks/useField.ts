import { useState, useCallback } from 'react';
import { fieldService } from '../services/field.service';
import {
  Field,
  FieldSearchParams,
  FieldAvailability,
  FieldReview,
} from '../types/field';

interface FieldState {
  fields: Field[];
  selectedField: Field | null;
  availability: FieldAvailability | null;
  reviews: FieldReview[];
  isLoading: boolean;
  error: string | null;
}

export const useField = () => {
  const [state, setState] = useState<FieldState>({
    fields: [],
    selectedField: null,
    availability: null,
    reviews: [],
    isLoading: false,
    error: null,
  });

  const searchFields = useCallback(async (params?: FieldSearchParams) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const fields = await fieldService.getFields(params);
      setState((prev) => ({
        ...prev,
        fields,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Error al buscar campos',
      }));
    }
  }, []);

  const getFieldById = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const field = await fieldService.getFieldById(id);
      setState((prev) => ({
        ...prev,
        selectedField: field,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Error al obtener el campo',
      }));
    }
  }, []);

  const getFieldAvailability = useCallback(async (id: string, date: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const availability = await fieldService.getFieldAvailability(id, date);
      setState((prev) => ({
        ...prev,
        availability,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al obtener la disponibilidad',
      }));
    }
  }, []);

  const getFieldReviews = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const reviews = await fieldService.getFieldReviews(id);
      setState((prev) => ({
        ...prev,
        reviews,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al obtener las reseñas',
      }));
    }
  }, []);

  const addFieldReview = useCallback(
    async (id: string, review: Omit<FieldReview, 'id'>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const newReview = await fieldService.addFieldReview(id, review);
        setState((prev) => ({
          ...prev,
          reviews: [...prev.reviews, newReview],
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Error al agregar la reseña',
        }));
      }
    },
    []
  );

  return {
    ...state,
    searchFields,
    getFieldById,
    getFieldAvailability,
    getFieldReviews,
    addFieldReview,
  };
};
