'use client';

import { useState, useCallback } from 'react';
import type { ValidationError, ValidationResult } from '../types';

// Tipos de validación disponibles
type ValidationType =
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'custom';

// Interfaz para las reglas de validación
interface ValidationRule {
  type: ValidationType;
  message: string;
  value?: any; // Para minLength, maxLength, pattern, custom
}

// Interfaz para el esquema de validación
interface ValidationSchema {
  [field: string]: ValidationRule[];
}

type ValidationRule<T> = (value: T) => string | undefined;
type ValidationRules<T> = Partial<
  Record<keyof T, ValidationRule<T[keyof T]>[]>
>;

interface ValidationState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
}

interface UseFormValidationOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => void | Promise<void>;
}

// Hook personalizado para validación de formularios
export const useFormValidation = <T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormValidationOptions<T>) => {
  const [state, setState] = useState<ValidationState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: true,
  });

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const rules = validationRules[name] || [];
      for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
      }
      return undefined;
    },
    [validationRules]
  );

  const validateForm = useCallback(() => {
    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const fieldKey = key as keyof T;
      const error = validateField(fieldKey, state.values[fieldKey]);
      if (error) {
        errors[fieldKey] = error;
        isValid = false;
      }
    });

    setState((prev) => ({ ...prev, errors, isValid }));
    return isValid;
  }, [state.values, validateField, validationRules]);

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        errors: { ...prev.errors, [name]: validateField(name, value) },
      }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
        errors: {
          ...prev.errors,
          [name]: validateField(name, prev.values[name]),
        },
      }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const isValid = validateForm();
      if (isValid && onSubmit) {
        await onSubmit(state.values);
      }
    },
    [state.values, validateForm, onSubmit]
  );

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};

// Esquemas de validación predefinidos
export const bookingValidationSchema: ValidationSchema = {
  date: [{ type: 'required', message: 'La fecha es obligatoria' }],
  time: [{ type: 'required', message: 'La hora es obligatoria' }],
  contactName: [
    { type: 'required', message: 'El nombre es obligatorio' },
    {
      type: 'minLength',
      value: 3,
      message: 'El nombre debe tener al menos 3 caracteres',
    },
  ],
  contactPhone: [
    { type: 'required', message: 'El teléfono es obligatorio' },
    {
      type: 'minLength',
      value: 8,
      message: 'El teléfono debe tener al menos 8 caracteres',
    },
    {
      type: 'pattern',
      value: /^[0-9\-+\s$$$$]+$/,
      message: 'El teléfono debe contener solo números y caracteres válidos',
    },
  ],
  contactEmail: [
    { type: 'required', message: 'El email es obligatorio' },
    { type: 'email', message: 'El email no es válido' },
  ],
  termsAccepted: [
    {
      type: 'custom',
      value: (value: boolean) => value === true,
      message: 'Debes aceptar los términos y condiciones',
    },
  ],
};

export const loginValidationSchema: ValidationSchema = {
  email: [
    { type: 'required', message: 'El email es obligatorio' },
    { type: 'email', message: 'El email no es válido' },
  ],
  password: [
    { type: 'required', message: 'La contraseña es obligatoria' },
    {
      type: 'minLength',
      value: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
    },
  ],
};

export const registerValidationSchema: ValidationSchema = {
  name: [
    { type: 'required', message: 'El nombre es obligatorio' },
    {
      type: 'minLength',
      value: 3,
      message: 'El nombre debe tener al menos 3 caracteres',
    },
  ],
  email: [
    { type: 'required', message: 'El email es obligatorio' },
    { type: 'email', message: 'El email no es válido' },
  ],
  password: [
    { type: 'required', message: 'La contraseña es obligatoria' },
    {
      type: 'minLength',
      value: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
    },
  ],
  confirmPassword: [
    { type: 'required', message: 'Confirma tu contraseña' },
    {
      type: 'custom',
      value: (value: string, formData: any) => value === formData.password,
      message: 'Las contraseñas no coinciden',
    },
  ],
  phone: [
    {
      type: 'pattern',
      value: /^[0-9\-+\s$$$$]*$/,
      message: 'El teléfono debe contener solo números y caracteres válidos',
    },
  ],
};
