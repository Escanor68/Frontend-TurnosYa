import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useFormRateLimit } from '../../hooks/useRateLimit';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

interface SecureFormProps<T> {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
  children: (formProps: {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    handleChange: (field: keyof T, value: unknown) => void;
    handleBlur: (field: keyof T) => void;
    handleSubmit: (e?: React.FormEvent) => void;
    reset: () => void;
  }) => React.ReactNode;
  rateLimitOptions?: {
    maxAttempts?: number;
    timeWindow?: number;
    cooldownPeriod?: number;
  };
  className?: string;
}

const SecureForm = <T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  rateLimitOptions,
  className = '',
}: SecureFormProps<T>) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const rateLimit = useFormRateLimit(rateLimitOptions);

  const form = useFormValidation({
    initialValues,
    validationSchema,
    onSubmit: async (values: T) => {
      // Verificar rate limit antes de enviar
      if (!rateLimit.attempt()) {
        setSubmitError(
          `Demasiados intentos. Intenta nuevamente en ${rateLimit.formatRemainingTime()}`
        );
        return;
      }

      try {
        setSubmitError(null);
        await onSubmit(values);
        rateLimit.reset(); // Resetear rate limit en éxito
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al enviar el formulario';
        setSubmitError(message);
      }
    },
  });

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (rateLimit.isBlocked) {
        setSubmitError(
          `Demasiados intentos. Intenta nuevamente en ${rateLimit.formatRemainingTime()}`
        );
        return;
      }
      form.handleSubmit(e);
    },
    [form, rateLimit]
  );

  const handleRetry = useCallback(() => {
    setSubmitError(null);
    rateLimit.reset();
  }, [rateLimit]);

  return (
    <div className={className}>
      {submitError && (
        <ErrorDisplay
          title="Error al enviar"
          message={submitError}
          type="error"
          showRetry={true}
          onRetry={handleRetry}
          className="mb-4"
        />
      )}

      {rateLimit.isBlocked && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Formulario bloqueado temporalmente
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Has excedido el límite de intentos. Intenta nuevamente en{' '}
                  <span className="font-mono font-bold">
                    {rateLimit.formatRemainingTime()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {children({
          values: form.values,
          errors: form.errors,
          touched: form.touched,
          isSubmitting: form.isSubmitting,
          handleChange: form.handleChange,
          handleBlur: form.handleBlur,
          handleSubmit: form.handleSubmit,
          reset: form.reset,
        })}
      </form>

      {form.isSubmitting && (
        <div className="mt-4">
          <LoadingSpinner size="sm" showText={true} text="Enviando..." />
        </div>
      )}
    </div>
  );
};

// Componentes específicos para formularios comunes
export const SecureLoginForm: React.FC<{
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  children: (formProps: {
    values: { email: string; password: string };
    errors: Partial<Record<'email' | 'password', string>>;
    touched: Partial<Record<'email' | 'password', boolean>>;
    isSubmitting: boolean;
    handleChange: (field: 'email' | 'password', value: unknown) => void;
    handleBlur: (field: 'email' | 'password') => void;
    handleSubmit: (e?: React.FormEvent) => void;
    reset: () => void;
  }) => React.ReactNode;
}> = ({ onSubmit, children }) => (
  <SecureForm
    initialValues={{ email: '', password: '' }}
    validationSchema={formSchemas.login}
    onSubmit={onSubmit}
    rateLimitOptions={{
      maxAttempts: 3,
      timeWindow: 300000, // 5 minutos
      cooldownPeriod: 900000, // 15 minutos
    }}
  >
    {children}
  </SecureForm>
);

export const SecureRegisterForm: React.FC<{
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
  }) => Promise<void>;
  children: (formProps: {
    values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      phone: string;
    };
    errors: Partial<
      Record<
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'password'
        | 'confirmPassword'
        | 'phone',
        string
      >
    >;
    touched: Partial<
      Record<
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'password'
        | 'confirmPassword'
        | 'phone',
        boolean
      >
    >;
    isSubmitting: boolean;
    handleChange: (
      field:
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'password'
        | 'confirmPassword'
        | 'phone',
      value: unknown
    ) => void;
    handleBlur: (
      field:
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'password'
        | 'confirmPassword'
        | 'phone'
    ) => void;
    handleSubmit: (e?: React.FormEvent) => void;
    reset: () => void;
  }) => React.ReactNode;
}> = ({ onSubmit, children }) => (
  <SecureForm
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    }}
    validationSchema={formSchemas.register}
    onSubmit={onSubmit}
    rateLimitOptions={{
      maxAttempts: 5,
      timeWindow: 600000, // 10 minutos
      cooldownPeriod: 1800000, // 30 minutos
    }}
  >
    {children}
  </SecureForm>
);

export default SecureForm;
