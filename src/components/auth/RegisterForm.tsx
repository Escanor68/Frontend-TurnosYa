import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const initialValues: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
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
    validationSchema: formSchemas.register,
    onSubmit: async (values: RegisterFormData) => {
      try {
        await register({
          name: values.firstName,
          surname: values.lastName,
          email: values.email,
          password: values.password,
          phone: values.phone,
        });
        showSuccess('Registro exitoso');
        navigate('/dashboard');
      } catch (error) {
        handleApiError(error);
      }
    },
  });

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await handleChange(name as keyof RegisterFormData, value);
  };

  const handleInputBlur = async (name: keyof RegisterFormData) => {
    await handleBlur(name as keyof typeof values);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('firstName')}
            placeholder="Nombre"
            error={touched.firstName ? errors.firstName : undefined}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('lastName')}
            placeholder="Apellido"
            error={touched.lastName ? errors.lastName : undefined}
            disabled={isSubmitting}
          />
        </div>
      </div>

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
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur('phone')}
          placeholder="Teléfono (opcional)"
          error={touched.phone ? errors.phone : undefined}
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

      <div>
        <Input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur('confirmPassword')}
          placeholder="Confirmar contraseña"
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
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
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
