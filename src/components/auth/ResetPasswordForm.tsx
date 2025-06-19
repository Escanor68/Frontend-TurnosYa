import { ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const initialValues: ResetPasswordFormData = {
  password: '',
  confirmPassword: '',
};

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { confirmPasswordReset } = useAuth();
  const { showSuccess, handleApiError } = useNotification();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormValidation({
    initialValues,
    validationSchema: formSchemas.resetPassword,
    onSubmit: async (values: ResetPasswordFormData) => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          throw new Error('Token no válido');
        }

        await confirmPasswordReset({
          token,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });

        showSuccess('Contraseña restablecida exitosamente');
        navigate('/login');
      } catch (error) {
        handleApiError(error);
      }
    },
  });

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await handleChange(name as keyof ResetPasswordFormData, value);
  };

  const handleInputBlur = async (name: keyof ResetPasswordFormData) => {
    await handleBlur(name as keyof typeof values);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur('password')}
          placeholder="Nueva contraseña"
          error={touched.password ? errors.password : undefined}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur('confirmPassword')}
          placeholder="Confirmar nueva contraseña"
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Restableciendo...' : 'Restablecer contraseña'}
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
