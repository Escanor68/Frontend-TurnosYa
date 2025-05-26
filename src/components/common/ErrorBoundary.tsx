import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logErrorToService } from '../../utils/errorHanding';
import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    logErrorToService(error, 'ErrorBoundary', {
      componentStack: errorInfo.componentStack,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-2xl">!</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Algo salió mal
            </h2>
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6">
                <div className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-h-48">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                    {this.state.error?.toString()}
                  </pre>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
              >
                Recargar página
              </button>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Intentar recuperar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}