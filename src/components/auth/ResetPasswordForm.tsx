import { useState, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

const initialValues: ResetPasswordFormData = {
  password: '',
  confirmPassword: '',
};

const validationRules = {
  password: [
    (value: string) => !value && 'La contraseña es requerida',
    (value: string) =>
      value.length < 6 && 'La contraseña debe tener al menos 6 caracteres',
  ],
  confirmPassword: [
    (value: string) => !value && 'La confirmación de contraseña es requerida',
    (value: string, formData: ResetPasswordFormData) =>
      value !== formData.password && 'Las contraseñas no coinciden',
  ],
};

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { confirmPasswordReset } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation<ResetPasswordFormData>({
      initialValues,
      validationRules,
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          const token = searchParams.get('token');
          if (!token) {
            throw new Error('Token no válido');
          }
          await confirmPasswordReset(token, formData.password);
          showNotification({
            type: 'success',
            message: 'Contraseña restablecida exitosamente',
          });
          navigate('/login');
        } catch (error) {
          showNotification({
            type: 'error',
            message:
              error instanceof Error
                ? error.message
                : 'Error al restablecer la contraseña',
          });
        } finally {
          setIsLoading(false);
        }
      },
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof ResetPasswordFormData, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          onBlur={() => handleBlur('password')}
          placeholder="Nueva contraseña"
          error={touched.password ? errors.password : undefined}
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          onBlur={() => handleBlur('confirmPassword')}
          placeholder="Confirmar nueva contraseña"
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            Inicia sesión
          </Link>
        </span>
      </div>
    </form>
  );
};
