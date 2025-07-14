import React, { useState, useEffect } from 'react';
import { useFootball } from '../hooks/useFootball';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './common/LoadingSpinner';

const FootballTest: React.FC = () => {
  const { checkHealth, testAuth, getFields, fields, loading, error } =
    useFootball();
  const { user, isAuthenticated } = useAuth();
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [authStatus, setAuthStatus] = useState<string>('');

  useEffect(() => {
    // Verificar salud del backend al cargar el componente
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      setHealthStatus('Verificando...');
      const health = await checkHealth();
      setHealthStatus(`✅ Backend saludable: ${JSON.stringify(health)}`);
    } catch (err) {
      setHealthStatus(
        `❌ Error de conexión: ${
          err instanceof Error ? err.message : 'Error desconocido'
        }`
      );
    }
  };

  const testAuthentication = async () => {
    try {
      setAuthStatus('Verificando...');
      const auth = await testAuth();
      setAuthStatus(`✅ Autenticación exitosa: ${JSON.stringify(auth)}`);
    } catch (err) {
      setAuthStatus(
        `❌ Error de autenticación: ${
          err instanceof Error ? err.message : 'Error desconocido'
        }`
      );
    }
  };

  const loadFields = async () => {
    try {
      await getFields();
    } catch (err) {
      console.error('Error loading fields:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🔧 Pruebas del Backend de Fútbol
      </h1>

      {/* Estado del usuario */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">👤 Estado del Usuario</h2>
        <p>
          <strong>Autenticado:</strong> {isAuthenticated ? '✅ Sí' : '❌ No'}
        </p>
        {user && (
          <p>
            <strong>Usuario:</strong> {user.email} ({user.role})
          </p>
        )}
      </div>

      {/* Pruebas de conexión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Health Check */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🏥 Health Check</h3>
          <p className="text-sm mb-3">{healthStatus || 'No verificado'}</p>
          <button
            onClick={checkBackendHealth}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Verificar Salud'}
          </button>
        </div>

        {/* Test Auth */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🔐 Test Autenticación</h3>
          <p className="text-sm mb-3">{authStatus || 'No verificado'}</p>
          <button
            onClick={testAuthentication}
            disabled={loading || !isAuthenticated}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Probar Auth'}
          </button>
        </div>
      </div>

      {/* Cargar canchas */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">⚽ Cargar Canchas</h3>
        <button
          onClick={loadFields}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Cargar Canchas'}
        </button>
      </div>

      {/* Mostrar error si existe */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Lista de canchas */}
      {fields.length > 0 && (
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            📋 Canchas Disponibles ({fields.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="border border-gray-200 p-3 rounded"
              >
                <h4 className="font-semibold">{field.name}</h4>
                <p className="text-sm text-gray-600">{field.address}</p>
                <p className="text-sm text-gray-600">
                  ${field.pricePerHour}/hora
                </p>
                <p className="text-xs text-gray-500">
                  {field.hasLighting
                    ? '💡 Con iluminación'
                    : '🌙 Sin iluminación'}{' '}
                  |{field.isIndoor ? ' 🏠 Indoor' : ' 🌳 Outdoor'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información de configuración */}
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold mb-2">⚙️ Configuración</h3>
        <div className="text-sm space-y-1">
          <p>
            <strong>API URL:</strong>{' '}
            {import.meta.env.VITE_FOOTBALL_API_URL ||
              'http://localhost:3002/api/v1'}
          </p>
          <p>
            <strong>Puerto Backend:</strong> 3002
          </p>
          <p>
            <strong>Puerto Frontend:</strong> 4000
          </p>
        </div>
      </div>
    </div>
  );
};

export default FootballTest;
