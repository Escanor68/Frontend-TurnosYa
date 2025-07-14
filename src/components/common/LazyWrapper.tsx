import React, { Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner';

// Componentes pre-configurados para lazy loading
export const LazyMap = lazy(() => import('./GoogleMap'));
export const LazyChat = lazy(() => import('../chat/Chat'));
export const LazyPaymentForm = lazy(() => import('../payments/PaymentForm'));
export const LazyFieldDetails = lazy(() => import('../fields/FieldDetails'));

// Componente wrapper genérico para lazy loading
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = React.memo(
  ({ children, fallback }) => {
    const defaultFallback = (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner size="lg" />
      </div>
    );

    return (
      <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
    );
  }
);

LazyWrapper.displayName = 'LazyWrapper';
