"use client"

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from '../../components/auth/LoginForm';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir según su rol
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'owner':
          navigate('/field-owner/dashboard');
          break;
        default:
          navigate('/profile');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <ErrorBoundary>
      <LoginForm />
    </ErrorBoundary>
  );
};

export default LoginPage;
