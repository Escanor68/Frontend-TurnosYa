'use client';

import { useState, useCallback, useEffect } from 'react';
import { z } from 'zod';
import { VALIDATION_RULES } from '../config';

// Esquemas de validación comunes
export const validationSchemas = {
  email: z
    .string()
    .email('El email debe tener un formato válido')
    .min(1, 'El email es requerido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña no puede tener más de 20 caracteres'),
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El nombre solo puede contener letras y espacios'
    ),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El apellido solo puede contener letras y espacios'
    ),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede tener más de 15 caracteres')
    .regex(
      /^[\d\s\-+()]+$/,
      'El teléfono solo puede contener números, espacios, guiones y paréntesis'
    ),
  address: z
    .string()
    .max(
      VALIDATION_RULES.ADDRESS_MAX_LENGTH,
      `La dirección no puede tener más de ${VALIDATION_RULES.ADDRESS_MAX_LENGTH} caracteres`
    ),
  description: z
    .string()
    .max(
      VALIDATION_RULES.DESCRIPTION_MAX_LENGTH,
      `La descripción no puede tener más de ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} caracteres`
    ),
  required: z.string().min(1, 'Este campo es requerido'),
  number: z.number().positive('Debe ser un número positivo'),
  positiveNumber: z.number().positive('Debe ser un número positivo'),
  date: z.string().min(1, 'La fecha es requerida'),
  time: z
    .string()
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Debe ser una hora válida (HH:MM)'
    ),
  url: z.string().url('URL inválida').optional(),
};

// Esquemas de validación para formularios específicos
export const formSchemas = {
  login: z.object({
    email: validationSchemas.email,
    password: validationSchemas.password,
  }),
  register: z
    .object({
      firstName: validationSchemas.firstName,
      lastName: validationSchemas.lastName,
      email: validationSchemas.email,
      password: validationSchemas.password,
      confirmPassword: validationSchemas.confirmPassword,
      phone: validationSchemas.phone,
      role: z.enum(['player', 'owner', 'admin'] as const),
      businessName: z.string().optional(),
      businessAddress: z.string().optional(),
      businessPhone: z.string().optional(),
      businessDescription: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Las contraseñas deben coincidir',
      path: ['confirmPassword'],
    }),
  profile: z.object({
    firstName: validationSchemas.firstName,
    lastName: validationSchemas.lastName,
    email: validationSchemas.email,
    phone: validationSchemas.phone,
    address: validationSchemas.address,
  }),
  changePassword: z
    .object({
      currentPassword: validationSchemas.password,
      newPassword: validationSchemas.password,
      confirmPassword: validationSchemas.confirmPassword,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Las contraseñas deben coincidir',
      path: ['confirmPassword'],
    }),
  forgotPassword: z.object({
    email: validationSchemas.email,
  }),
  resetPassword: z
    .object({
      password: validationSchemas.password,
      confirmPassword: validationSchemas.confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Las contraseñas deben coincidir',
      path: ['confirmPassword'],
    }),
  booking: z.object({
    fieldId: validationSchemas.required,
    date: validationSchemas.date,
    time: validationSchemas.time,
    duration: z.number().min(1, 'La duración debe ser al menos 1 hora'),
    players: z.number().min(1, 'Debe haber al menos 1 jugador'),
  }),
  field: z.object({
    name: validationSchemas.required,
    description: validationSchemas.description,
    address: validationSchemas.address,
    price: validationSchemas.positiveNumber,
  }),
};

interface ValidationState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

interface UseFormValidationOptions<T> {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export const useFormValidation = <T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormValidationOptions<T>) => {
  const [state, setState] = useState<ValidationState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: false,
    isSubmitting: false,
  });

  // Validar formulario completo
  const validateForm = useCallback(
    async (values: T) => {
      try {
        await validationSchema.parseAsync(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Partial<Record<keyof T, string>> = {};
          error.errors.forEach((err: z.ZodIssue) => {
            const path = err.path[0] as keyof T;
            errors[path] = err.message;
          });
          return errors;
        }
        return {};
      }
    },
    [validationSchema]
  );

  // Validar campo específico
  const validateField = useCallback(async (field: keyof T, value: unknown) => {
    try {
      // Crear un esquema temporal para el campo específico
      const tempSchema = z.object({ [field]: z.any() });
      await tempSchema.parseAsync({ [field]: value });
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || 'Campo inválido';
      }
      return 'Campo inválido';
    }
  }, []);

  // Sanitizar valor
  const sanitizeValue = useCallback(
    (value: unknown, field: keyof T): unknown => {
      if (typeof value === 'string') {
        // Remover caracteres peligrosos
        let sanitized = value
          .replace(/[<>]/g, '') // Remover < y >
          .replace(/javascript:/gi, '') // Remover javascript:
          .replace(/on\w+=/gi, '') // Remover event handlers
          .trim();

        // Sanitización específica por campo
        switch (field) {
          case 'email':
            sanitized = sanitized.toLowerCase();
            break;
          case 'phone':
            sanitized = sanitized.replace(/[^\d\s\-+()]/g, '');
            break;
          case 'name':
          case 'firstName':
          case 'lastName':
            sanitized = sanitized.replace(/[^\w\sáéíóúñÁÉÍÓÚÑ]/g, '');
            break;
        }

        return sanitized;
      }
      return value;
    },
    []
  );

  // Manejar cambio de campo
  const handleChange = useCallback(
    async (field: keyof T, value: unknown) => {
      const sanitizedValue = sanitizeValue(value, field);

      const newValues = { ...state.values, [field]: sanitizedValue };
      const newTouched = { ...state.touched, [field]: true };

      setState((prev) => ({
        ...prev,
        values: newValues,
        touched: newTouched,
      }));

      if (validateOnChange) {
        const fieldError = await validateField(field, sanitizedValue);
        setState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [field]: fieldError,
          },
        }));
      }
    },
    [
      state.values,
      state.touched,
      validateOnChange,
      sanitizeValue,
      validateField,
    ]
  );

  // Manejar blur de campo
  const handleBlur = useCallback(
    async (field: keyof T) => {
      if (validateOnBlur) {
        const fieldError = await validateField(field, state.values[field]);
        setState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [field]: fieldError,
          },
        }));
      }
    },
    [state.values, validateOnBlur, validateField]
  );

  // Manejar envío del formulario
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      setState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        const errors = await validateForm(state.values);

        if (Object.keys(errors).length === 0) {
          await onSubmit(state.values);
          setState((prev) => ({ ...prev, isSubmitting: false }));
        } else {
          setState((prev) => ({
            ...prev,
            errors,
            touched: Object.keys(state.values).reduce(
              (acc, key) => ({
                ...acc,
                [key]: true,
              }),
              {}
            ),
            isSubmitting: false,
          }));
        }
      } catch (error) {
        setState((prev) => ({ ...prev, isSubmitting: false }));
        throw error;
      }
    },
    [state.values, validateForm, onSubmit]
  );

  // Resetear formulario
  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false,
    });
  }, [initialValues]);

  // Validar formulario completo cuando cambian los valores
  useEffect(() => {
    const validateFormAsync = async () => {
      const errors = await validateForm(state.values);
      const isValid = Object.keys(errors).length === 0;
      setState((prev) => ({ ...prev, errors, isValid }));
    };

    validateFormAsync();
  }, [state.values, validateForm]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue: handleChange,
    setFieldError: (field: keyof T, error: string) => {
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [field]: error },
      }));
    },
  };
};

// Validaciones comunes
export const commonValidations = {
  email: z.string().email('Email inválido').min(1, 'Email es requerido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  required: z.string().min(1, 'Este campo es requerido'),
  url: z.string().url('URL inválida').optional(),
  number: z.number().min(0, 'El número debe ser mayor a 0'),
  date: z.string().min(1, 'Fecha es requerida'),
};
