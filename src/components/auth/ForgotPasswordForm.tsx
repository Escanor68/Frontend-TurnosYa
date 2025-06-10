import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface ForgotPasswordFormData {
  email: string;
  [key: string]: string;
}

const initialValues: ForgotPasswordFormData = {
  email: '',
};

const validationRules = {
  email: [
    (value: string) => !value && 'El email es requerido',
    (value: string) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && 'Email inválido',
  ],
};

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation<ForgotPasswordFormData>({
      initialValues,
      validationRules,
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          await resetPassword(formData.email);
          showNotification({
            type: 'success',
            message:
              'Se ha enviado un correo con las instrucciones para restablecer tu contraseña',
          });
          navigate('/login');
        } catch (error) {
          showNotification({
            type: 'error',
            message:
              error instanceof Error
                ? error.message
                : 'Error al enviar el correo',
          });
        } finally {
          setIsLoading(false);
        }
      },
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof ForgotPasswordFormData, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur('email')}
          placeholder="Email"
          error={touched.email ? errors.email : undefined}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
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
