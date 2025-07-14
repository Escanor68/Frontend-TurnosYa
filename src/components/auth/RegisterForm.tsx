import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';
import { UserRole } from '../../types/user';
import { RoleSelector } from './RoleSelector';

interface RegisterFormData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: UserRole;
  // Campos específicos para dueños
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessDescription?: string;
}

const initialValues: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: 'player',
  businessName: '',
  businessAddress: '',
  businessPhone: '',
  businessDescription: '',
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showSuccess, handleApiError } = useNotification();
  const [selectedRole, setSelectedRole] = useState<UserRole>('player');

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormValidation<RegisterFormData>({
    initialValues,
    validationSchema: formSchemas.register,
    onSubmit: async (values: RegisterFormData) => {
      try {
        const registerData = {
          name: values.firstName.trim(),
          surname: values.lastName.trim(),
          email: values.email.trim(),
          password: values.password, // No se trimea la contraseña
          phone: values.phone.trim(),
          role: values.role,
          // Incluir datos específicos del negocio si es dueño
          ...(values.role === 'owner' && {
            businessName: values.businessName?.trim(),
            businessAddress: values.businessAddress?.trim(),
            businessPhone: values.businessPhone?.trim(),
            businessDescription: values.businessDescription?.trim(),
          }),
        };

        await register(registerData);
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

  const handleTextareaChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleRoleChange = async (role: UserRole) => {
    setSelectedRole(role);
    await setFieldValue('role', role);
  };

  const hasRealErrors = Object.values(errors).some(
    (error) => error !== undefined && error !== ''
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Selector de tipo de usuario */}
      <RoleSelector
        selectedRole={selectedRole}
        onRoleChange={handleRoleChange}
        disabled={isSubmitting}
      />

      {/* Información personal */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Información Personal
        </h3>
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
            placeholder="Teléfono"
            error={touched.phone ? errors.phone : undefined}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Información del negocio (solo para dueños) */}
      {selectedRole === 'owner' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Información del Negocio
          </h3>
          <div>
            <Input
              type="text"
              name="businessName"
              value={values.businessName || ''}
              onChange={handleInputChange}
              onBlur={() => handleInputBlur('businessName')}
              placeholder="Nombre del negocio"
              error={touched.businessName ? errors.businessName : undefined}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Input
              type="text"
              name="businessAddress"
              value={values.businessAddress || ''}
              onChange={handleInputChange}
              onBlur={() => handleInputBlur('businessAddress')}
              placeholder="Dirección del negocio"
              error={
                touched.businessAddress ? errors.businessAddress : undefined
              }
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Input
              type="tel"
              name="businessPhone"
              value={values.businessPhone || ''}
              onChange={handleInputChange}
              onBlur={() => handleInputBlur('businessPhone')}
              placeholder="Teléfono del negocio"
              error={touched.businessPhone ? errors.businessPhone : undefined}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <textarea
              name="businessDescription"
              value={values.businessDescription || ''}
              onChange={handleTextareaChange}
              onBlur={() => handleInputBlur('businessDescription')}
              placeholder="Descripción del negocio (opcional)"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                touched.businessDescription && errors.businessDescription
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              rows={3}
              disabled={isSubmitting}
            />
            {touched.businessDescription && errors.businessDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessDescription}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Contraseñas */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Seguridad</h3>
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
      </div>

      <Button
        type="submit"
        variant="primary"
        className={`w-full ${
          isSubmitting ||
          !values.firstName ||
          !values.lastName ||
          !values.email ||
          !values.password ||
          !values.confirmPassword ||
          !values.phone ||
          hasRealErrors
            ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400 focus-visible:ring-gray-400'
            : ''
        }`}
        disabled={
          isSubmitting ||
          !values.firstName ||
          !values.lastName ||
          !values.email ||
          !values.password ||
          !values.confirmPassword ||
          !values.phone ||
          hasRealErrors
        }
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
