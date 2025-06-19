import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation, formSchemas } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from '../ui/Link';

interface ForgotPasswordFormData {
  email: string;
}

const initialValues: ForgotPasswordFormData = {
  email: '',
};

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();
  const { showSuccess, handleApiError } = useNotification();

  const form = useFormValidation({
    initialValues,
    validationSchema: formSchemas.forgotPassword,
    onSubmit: async (values: ForgotPasswordFormData) => {
      await requestPasswordReset({ email: values.email });
      showSuccess(
        'Se ha enviado un correo con las instrucciones para restablecer tu contraseña'
      );
      navigate('/login');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await form.handleSubmit(e);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          name="email"
          value={form.values.email}
          onChange={(e) => form.handleChange('email', e.target.value)}
          onBlur={() => form.handleBlur('email')}
          placeholder="Email"
          error={form.touched.email ? form.errors.email : undefined}
          disabled={form.isSubmitting}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={form.isSubmitting}
      >
        {form.isSubmitting ? 'Enviando...' : 'Enviar instrucciones'}
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
