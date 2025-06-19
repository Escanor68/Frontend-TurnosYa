import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  type?: 'error' | 'warning' | 'info';
  showRetry?: boolean;
  showHome?: boolean;
  showBack?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoBack?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Algo salió mal',
  message = 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
  type = 'error',
  showRetry = true,
  showHome = false,
  showBack = false,
  onRetry,
  onGoHome,
  onGoBack,
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      case 'info':
        return <AlertTriangle className="w-12 h-12 text-blue-500" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-red-800';
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${className}`}
    >
      <div className={`max-w-md w-full p-8 rounded-lg border ${getBgColor()}`}>
        <div className="text-center">
          <div className="flex justify-center mb-4">{getIcon()}</div>

          <h2 className={`text-xl font-semibold mb-2 ${getTextColor()}`}>
            {title}
          </h2>

          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </button>
            )}

            {showBack && onGoBack && (
              <button
                onClick={onGoBack}
                className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </button>
            )}

            {showHome && onGoHome && (
              <button
                onClick={onGoHome}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Ir al Inicio
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes específicos para casos de uso comunes
export const NetworkError: React.FC<{ onRetry?: () => void }> = ({
  onRetry,
}) => (
  <ErrorDisplay
    title="Error de Conexión"
    message="No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente."
    type="error"
    showRetry={true}
    onRetry={onRetry}
  />
);

export const NotFoundError: React.FC<{ onGoHome?: () => void }> = ({
  onGoHome,
}) => (
  <ErrorDisplay
    title="Página no encontrada"
    message="La página que buscas no existe o ha sido movida."
    type="warning"
    showHome={true}
    onGoHome={onGoHome}
  />
);

export const PermissionError: React.FC<{ onGoBack?: () => void }> = ({
  onGoBack,
}) => (
  <ErrorDisplay
    title="Acceso Denegado"
    message="No tienes permisos para acceder a esta página."
    type="error"
    showBack={true}
    onGoBack={onGoBack}
  />
);

export default ErrorDisplay;
