import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

const initialValues: RegisterFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationRules = {
  name: [
    (value: string) => !value && 'El nombre es requerido',
    (value: string) =>
      value.length < 2 && 'El nombre debe tener al menos 2 caracteres',
  ],
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
  confirmPassword: [
    (value: string) => !value && 'La confirmación de contraseña es requerida',
    (value: string, formData: RegisterFormData) =>
      value !== formData.password && 'Las contraseñas no coinciden',
  ],
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation<RegisterFormData>({
      initialValues,
      validationRules,
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          await register(formData.name, formData.email, formData.password);
          showNotification({
            type: 'success',
            message: 'Registro exitoso',
          });
          navigate('/dashboard');
        } catch (error) {
          showNotification({
            type: 'error',
            message:
              error instanceof Error ? error.message : 'Error al registrarse',
          });
        } finally {
          setIsLoading(false);
        }
      },
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof RegisterFormData, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          onBlur={() => handleBlur('name')}
          placeholder="Nombre completo"
          error={touched.name ? errors.name : undefined}
          disabled={isLoading}
        />
      </div>

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

      <div>
        <Input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          onBlur={() => handleBlur('confirmPassword')}
          placeholder="Confirmar contraseña"
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
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            Inicia sesión
          </Link>
        </span>
      </div>
    </form>
  );
};
