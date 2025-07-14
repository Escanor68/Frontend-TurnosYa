import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  MapPin,
  AlertCircle,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

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
        setIsValidating(true);
        const registerData = {
          name: values.firstName.trim(),
          surname: values.lastName.trim(),
          email: values.email.trim(),
          password: values.password,
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
        showSuccess('¡Registro exitoso! Bienvenido a TurnosYa.');
        navigate('/dashboard');
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsValidating(false);
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

  const isFormValid =
    values.firstName &&
    values.lastName &&
    values.email &&
    values.password &&
    values.confirmPassword &&
    values.phone &&
    !hasRealErrors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Selector de tipo de usuario */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={handleRoleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Información personal */}
        <motion.div
          className="card shadow-sm border-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card-header bg-primary text-white">
            <h3 className="card-title mb-0">
              <User className="me-2" size={20} />
              Información Personal
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label fw-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('firstName')}
                  className={`form-control ${
                    touched.firstName && errors.firstName
                      ? 'is-invalid'
                      : touched.firstName && !errors.firstName
                      ? 'is-valid'
                      : ''
                  }`}
                  placeholder="Tu nombre"
                  disabled={isSubmitting}
                />
                {touched.firstName && errors.firstName && (
                  <div className="invalid-feedback d-block">
                    <AlertCircle className="me-1" size={14} />
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('lastName')}
                  className={`form-control ${
                    touched.lastName && errors.lastName
                      ? 'is-invalid'
                      : touched.lastName && !errors.lastName
                      ? 'is-valid'
                      : ''
                  }`}
                  placeholder="Tu apellido"
                  disabled={isSubmitting}
                />
                {touched.lastName && errors.lastName && (
                  <div className="invalid-feedback d-block">
                    <AlertCircle className="me-1" size={14} />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                <Mail className="me-2" size={16} />
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                className={`form-control ${
                  touched.email && errors.email
                    ? 'is-invalid'
                    : touched.email && !errors.email
                    ? 'is-valid'
                    : ''
                }`}
                placeholder="tu@email.com"
                disabled={isSubmitting}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback d-block">
                  <AlertCircle className="me-1" size={14} />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                <Phone className="me-2" size={16} />
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                onBlur={() => handleBlur('phone')}
                className={`form-control ${
                  touched.phone && errors.phone
                    ? 'is-invalid'
                    : touched.phone && !errors.phone
                    ? 'is-valid'
                    : ''
                }`}
                placeholder="+54 9 11 1234-5678"
                disabled={isSubmitting}
              />
              {touched.phone && errors.phone && (
                <div className="invalid-feedback d-block">
                  <AlertCircle className="me-1" size={14} />
                  {errors.phone}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Información del negocio (solo para dueños) */}
        <AnimatePresence>
          {selectedRole === 'owner' && (
            <motion.div
              className="card shadow-sm border-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-header bg-success text-white">
                <h3 className="card-title mb-0">
                  <Building className="me-2" size={20} />
                  Información del Negocio
                </h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="businessName" className="form-label fw-bold">
                    Nombre del Negocio
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={values.businessName || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('businessName')}
                    className="form-control"
                    placeholder="Nombre de tu cancha o complejo"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="businessAddress"
                    className="form-label fw-bold"
                  >
                    <MapPin className="me-2" size={16} />
                    Dirección del Negocio
                  </label>
                  <input
                    type="text"
                    id="businessAddress"
                    name="businessAddress"
                    value={values.businessAddress || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('businessAddress')}
                    className="form-control"
                    placeholder="Dirección completa"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="businessPhone" className="form-label fw-bold">
                    <Phone className="me-2" size={16} />
                    Teléfono del Negocio
                  </label>
                  <input
                    type="tel"
                    id="businessPhone"
                    name="businessPhone"
                    value={values.businessPhone || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('businessPhone')}
                    className="form-control"
                    placeholder="Teléfono del negocio"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="businessDescription"
                    className="form-label fw-bold"
                  >
                    Descripción del Negocio
                  </label>
                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    value={values.businessDescription || ''}
                    onChange={handleTextareaChange}
                    onBlur={() => handleBlur('businessDescription')}
                    className="form-control"
                    placeholder="Describe tu negocio, servicios, horarios, etc. (opcional)"
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contraseñas */}
        <motion.div
          className="card shadow-sm border-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-header bg-warning text-dark">
            <h3 className="card-title mb-0">
              <Shield className="me-2" size={20} />
              Seguridad
            </h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                <Lock className="me-2" size={16} />
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                  className={`form-control ${
                    touched.password && errors.password
                      ? 'is-invalid'
                      : touched.password && !errors.password
                      ? 'is-valid'
                      : ''
                  }`}
                  placeholder="Mínimo 8 caracteres"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="invalid-feedback d-block">
                  <AlertCircle className="me-1" size={14} />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-bold">
                <Lock className="me-2" size={16} />
                Confirmar Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`form-control ${
                    touched.confirmPassword && errors.confirmPassword
                      ? 'is-invalid'
                      : touched.confirmPassword && !errors.confirmPassword
                      ? 'is-valid'
                      : ''
                  }`}
                  placeholder="Repite tu contraseña"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  <AlertCircle className="me-1" size={14} />
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`btn btn-primary w-100 py-3 fw-bold ${
            !isFormValid ? 'opacity-50' : ''
          }`}
          disabled={isSubmitting || !isFormValid}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          {isSubmitting || isValidating ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Registrando...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </motion.button>

        {/* Login Link */}
        <div className="text-center mt-4">
          <span className="text-muted">
            ¿Ya tienes una cuenta?{' '}
            <a
              href="/login"
              className="text-decoration-none fw-bold text-primary"
            >
              Inicia sesión aquí
            </a>
          </span>
        </div>
      </form>
    </motion.div>
  );
};
