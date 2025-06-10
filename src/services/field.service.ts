import { apiService } from './api';
import type {
  Field,
  FieldAvailability,
  SpecialHours,
  FieldReview,
  FieldStatistics,
  FieldSearchParams,
} from '../types/field';

class FieldService {
  private static instance: FieldService;

  private constructor() {}

  public static getInstance(): FieldService {
    if (!FieldService.instance) {
      FieldService.instance = new FieldService();
    }
    return FieldService.instance;
  }

  public async getFields(params?: FieldSearchParams): Promise<Field[]> {
    const response = await apiService.get<Field[]>('/fields', { params });
    return response.data;
  }

  public async getFieldById(id: string): Promise<Field> {
    const response = await apiService.get<Field>(`/fields/${id}`);
    return response.data;
  }

  public async createField(field: Partial<Field>): Promise<Field> {
    const response = await apiService.post<Field>('/fields', field);
    return response.data;
  }

  public async updateField(id: string, field: Partial<Field>): Promise<Field> {
    const response = await apiService.put<Field>(`/fields/${id}`, field);
    return response.data;
  }

  public async deleteField(id: string): Promise<void> {
    await apiService.delete(`/fields/${id}`);
  }

  public async getFieldAvailability(
    id: string,
    date: string
  ): Promise<FieldAvailability> {
    const response = await apiService.get<FieldAvailability>(
      `/fields/${id}/availability`,
      {
        params: { date },
      }
    );
    return response.data;
  }

  public async addFieldReview(
    id: string,
    review: Omit<FieldReview, 'id'>
  ): Promise<FieldReview> {
    const response = await apiService.post<FieldReview>(
      `/fields/${id}/reviews`,
      review
    );
    return response.data;
  }

  public async updateFieldReview(
    id: string,
    reviewId: string,
    review: Partial<FieldReview>
  ): Promise<FieldReview> {
    const response = await apiService.put<FieldReview>(
      `/fields/${id}/reviews/${reviewId}`,
      review
    );
    return response.data;
  }

  public async deleteFieldReview(id: string, reviewId: string): Promise<void> {
    await apiService.delete(`/fields/${id}/reviews/${reviewId}`);
  }

  public async getFieldReviews(id: string): Promise<FieldReview[]> {
    const response = await apiService.get<FieldReview[]>(
      `/fields/${id}/reviews`
    );
    return response.data;
  }

  public async getOwnerStatistics(ownerId: string): Promise<FieldStatistics> {
    const response = await apiService.get<FieldStatistics>(
      `/fields/owner/${ownerId}/statistics`
    );
    return response.data;
  }

  public async addSpecialHours(
    fieldId: string,
    specialHours: Omit<SpecialHours, 'id' | 'fieldId'>
  ): Promise<SpecialHours> {
    const response = await apiService.post<SpecialHours>(
      `/fields/${fieldId}/special-hours`,
      specialHours
    );
    return response.data;
  }

  public async getSpecialHours(fieldId: string): Promise<SpecialHours[]> {
    const response = await apiService.get<SpecialHours[]>(
      `/fields/${fieldId}/special-hours`
    );
    return response.data;
  }

  public async getFieldsByOwner(ownerId: string): Promise<Field[]> {
    const response = await apiService.get<Field[]>(`/fields/owner/${ownerId}`);
    return response.data;
  }
}

export const fieldService = FieldService.getInstance();
