import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Confirmar contraseña es requerido'),
  })
  .required();

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // TODO: Implementar lógica de reseteo de contraseña
      console.log(
        'Resetear contraseña con token:',
        token,
        'y nueva contraseña:',
        data.password
      );
    } catch (error) {
      console.error('Error al resetear contraseña:', error);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Link inválido
          </h2>
          <p className="text-gray-600 mb-4">
            El link para resetear tu contraseña es inválido o ha expirado.
          </p>
          <Link
            to="/forgot-password"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Solicitar un nuevo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear nueva contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa y confirma tu nueva contraseña
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Nueva contraseña
              </label>
              <input
                {...register('password')}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Nueva contraseña"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isSubmitting ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                </span>
              ) : null}
              Cambiar contraseña
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
