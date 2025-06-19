import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface LoginFormData {
  email: string;
  password: string;
}

const initialValues: LoginFormData = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    validationSchema: formSchemas.login,
    onSubmit: async (values: LoginFormData) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        });
        showSuccess('Inicio de sesión exitoso');
        navigate('/dashboard');
      } catch (error) {
        handleApiError(error);
      }
    },
  });

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await handleChange(name as keyof LoginFormData, value);
  };

  const handleInputBlur = async (name: keyof LoginFormData) => {
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
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur('email')}
          placeholder="Email"
          error={touched.email ? errors.email : undefined}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur('password')}
          placeholder="Contraseña"
          error={touched.password ? errors.password : undefined}
          disabled={isSubmitting}
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
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
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
