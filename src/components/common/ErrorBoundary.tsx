import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { logErrorToService } from '../../utils/errorHanding';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo
    });

    // Log error to service
    logErrorToService(error, 'ErrorBoundary', {
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                  <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Algo salió mal
              </h2>
              
              <p className="text-gray-600 mb-6">
                Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando en solucionarlo.
              </p>

              <div className="space-y-3 w-full">
                <button
                  onClick={this.handleReload}
                  className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
                >
                  Recargar página
                </button>
                
                <button
                  onClick={this.handleReset}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  Intentar recuperar
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left w-full">
                  <p className="text-sm font-medium text-gray-900 mb-2">Error details:</p>
                  <pre className="text-xs text-gray-600 overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}