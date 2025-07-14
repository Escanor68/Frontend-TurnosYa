import React, { useEffect, useState } from 'react';
import { useBackMP } from '../hooks/useBackMP';

interface BackMPStatusProps {
  showDetails?: boolean;
}

const BackMPStatus: React.FC<BackMPStatusProps> = ({ showDetails = false }) => {
  const { healthCheck, backFutbolHealthCheck, isLoading, error } = useBackMP();
  const [backMPStatus, setBackMPStatus] = useState<boolean | null>(null);
  const [backFutbolStatus, setBackFutbolStatus] = useState<boolean | null>(
    null
  );
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkStatus = async () => {
    try {
      const [backMP, backFutbol] = await Promise.all([
        healthCheck(),
        backFutbolHealthCheck(),
      ]);

      setBackMPStatus(backMP);
      setBackFutbolStatus(backFutbol);
      setLastCheck(new Date());
    } catch (error) {
      console.error('Error checking BackMP status:', error);
    }
  };

  useEffect(() => {
    checkStatus();

    // Verificar cada 30 segundos
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: boolean | null) => {
    if (status === null) return 'text-gray-500';
    return status ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return '⏳';
    return status ? '✅' : '❌';
  };

  const getStatusText = (status: boolean | null) => {
    if (status === null) return 'Verificando...';
    return status ? 'Conectado' : 'Desconectado';
  };

  if (!showDetails) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <span className={getStatusColor(backMPStatus)}>
          {getStatusIcon(backMPStatus)} BackMP
        </span>
        {backFutbolStatus !== null && (
          <span className={getStatusColor(backFutbolStatus)}>
            {getStatusIcon(backFutbolStatus)} BackFutbol
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Estado de Servicios</h3>

      <div className="space-y-3">
        {/* BackMP Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getStatusIcon(backMPStatus)}</span>
            <span className="font-medium">BackMP (Pagos)</span>
          </div>
          <div className="text-right">
            <div className={getStatusColor(backMPStatus)}>
              {getStatusText(backMPStatus)}
            </div>
            <div className="text-xs text-gray-500">localhost:3003</div>
          </div>
        </div>

        {/* BackFutbol Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getStatusIcon(backFutbolStatus)}</span>
            <span className="font-medium">BackFutbol (Principal)</span>
          </div>
          <div className="text-right">
            <div className={getStatusColor(backFutbolStatus)}>
              {getStatusText(backFutbolStatus)}
            </div>
            <div className="text-xs text-gray-500">Conectividad</div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="text-sm text-red-800">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Last Check */}
        {lastCheck && (
          <div className="text-xs text-gray-500 mt-2">
            Última verificación: {lastCheck.toLocaleTimeString()}
          </div>
        )}

        {/* Refresh Button */}
        <button
          onClick={checkStatus}
          disabled={isLoading}
          className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verificando...' : 'Verificar Estado'}
        </button>
      </div>
    </div>
  );
};

export default BackMPStatus;
