import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

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
        setIsValidating(true);
        await login(values.email.trim(), values.password);
        showSuccess('¡Inicio de sesión exitoso! Bienvenido de vuelta.');
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
    await handleChange(name as keyof LoginFormData, value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  const isFormValid =
    values.email && values.password && !errors.email && !errors.password;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label fw-bold text-dark mb-2">
            <Mail className="me-2" size={16} />
            Correo Electrónico
          </label>
          <div className="input-group">
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
              aria-describedby="emailHelp"
            />
            {touched.email && !errors.email && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="input-group-text bg-success text-white border-success"
              >
                <CheckCircle size={16} />
              </motion.div>
            )}
          </div>
          {touched.email && errors.email && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="invalid-feedback d-block"
            >
              <AlertCircle className="me-1" size={14} />
              {errors.email}
            </motion.div>
          )}
          <div id="emailHelp" className="form-text">
            Ingresa el correo electrónico con el que te registraste
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label
            htmlFor="password"
            className="form-label fw-bold text-dark mb-2"
          >
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
              placeholder="Tu contraseña"
              disabled={isSubmitting}
              aria-describedby="passwordHelp"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="invalid-feedback d-block"
            >
              <AlertCircle className="me-1" size={14} />
              {errors.password}
            </motion.div>
          )}
          <div id="passwordHelp" className="form-text">
            Mínimo 6 caracteres
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="d-flex justify-content-between align-items-center">
          <a
            href="/forgot-password"
            className="text-decoration-none text-primary fw-medium"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

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
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </motion.button>

        {/* Register Link */}
        <div className="text-center mt-4">
          <span className="text-muted">
            ¿No tienes una cuenta?{' '}
            <a
              href="/register"
              className="text-decoration-none fw-bold text-primary"
            >
              Regístrate aquí
            </a>
          </span>
        </div>
      </form>
    </motion.div>
  );
};
