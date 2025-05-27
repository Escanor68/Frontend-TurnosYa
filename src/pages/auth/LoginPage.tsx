import { LoginForm } from '../../components/auth/LoginForm';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export default function LoginPage() {
  const { isLoading } = useAuthRedirect({
    redirectAuthenticatedTo: '/dashboard',
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <LoginForm />;
} 