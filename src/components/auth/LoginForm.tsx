import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface LoginFormData {
  email: string;
  password: string;
  [key: string]: string;
}

const initialValues: LoginFormData = {
  email: '',
  password: '',
};

const validationRules = {
  email: [
    (value: string) => !value && 'El email es requerido',
    (value: string) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && 'Email inválido',
  ],
  password: [
    (value: string) => !value && 'La contraseña es requerida',
    (value: string) =>
      value.length < 6 && 'La contraseña debe tener al menos 6 caracteres',
  ],
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation<LoginFormData>({
      initialValues,
      validationRules,
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          await login(formData.email, formData.password);
          showNotification({
            type: 'success',
            message: 'Inicio de sesión exitoso',
          });
          navigate('/dashboard');
        } catch (error) {
          showNotification({
            type: 'error',
            message:
              error instanceof Error
                ? error.message
                : 'Error al iniciar sesión',
          });
        } finally {
          setIsLoading(false);
        }
      },
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof LoginFormData, value);
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

      <div>
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          onBlur={() => handleBlur('password')}
          placeholder="Contraseña"
          error={touched.password ? errors.password : undefined}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link
            to="/register"
            className="text-primary-600 hover:text-primary-700"
          >
            Regístrate
          </Link>
        </span>
      </div>
    </form>
  );
};
