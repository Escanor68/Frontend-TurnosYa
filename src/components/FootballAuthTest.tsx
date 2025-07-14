import React, { useState } from 'react';
import { useFootball } from '../hooks/useFootball';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './common/LoadingSpinner';

// Tokens de prueba del backend de fútbol
const TEST_TOKENS = {
  PLAYER:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJwbGF5ZXJAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJQTEFZRVIiXSwiaWF0IjoxNzUyMDk4OTIzLCJleHAiOjE3NTIxODUzMjN9.dUxp275jau57RdK_OOv_y42HNQC6uGFjR0GAhnPz5-w',
  FIELD_OWNER:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwiZW1haWwiOiJvd25lckBleGFtcGxlLmNvbSIsInJvbGVzIjpbIkZJRUxEX09XTkVSIl0sImlhdCI6MTc1MjA5ODkyMywiZXhwIjoxNzUyMTg1MzIzfQ.SEB9YfbibdYIcHV4FNg1MBWVdl4bzlcw6prPesX-yWE',
  ADMIN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTU2NjY3Nzc4IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJyb2xlcyI6WyJFETUlOIl0sImlhdCI6MTc1MjA5ODkyMywiZXhwIjoxNzUyMTg1MzIzfQ.krL0-A4oG3GcQWrvFfBFT6kfhTU-FFNkOd-B9d2JrKk',
};

const FootballAuthTest: React.FC = () => {
  const { testAuth, getBookings, createBooking, loading, error } =
    useFootball();
  const { user, isAuthenticated } = useAuth();
  const [authResult, setAuthResult] = useState<string>('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>('');

  const testAuthentication = async (token: string) => {
    try {
      setAuthResult('Verificando...');
      // Guardar el token en localStorage para que el servicio lo use
      localStorage.setItem('token', token);
      const auth = await testAuth();
      setAuthResult(
        `✅ Autenticación exitosa: ${JSON.stringify(auth, null, 2)}`
      );
      setSelectedToken(token);
    } catch (err) {
      setAuthResult(
        `❌ Error de autenticación: ${
          err instanceof Error ? err.message : 'Error desconocido'
        }`
      );
    }
  };

  const loadBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error('Error loading bookings:', err);
    }
  };

  const createTestBooking = async () => {
    try {
      const bookingData = {
        fieldId: 1,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Mañana
        startTime: '20:00',
        endTime: '22:00',
        comments: 'Reserva de prueba desde frontend',
        processPayment: false,
      };

      const booking = await createBooking(bookingData);
      setBookings((prev) => [...prev, booking]);
    } catch (err) {
      console.error('Error creating booking:', err);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    setAuthResult('');
    setSelectedToken('');
    setBookings([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🔐 Pruebas de Autenticación - Backend Fútbol
      </h1>

      {/* Estado actual */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">📊 Estado Actual</h2>
        <p>
          <strong>Token en localStorage:</strong>{' '}
          {localStorage.getItem('token') ? '✅ Presente' : '❌ Ausente'}
        </p>
        <p>
          <strong>Usuario autenticado:</strong>{' '}
          {isAuthenticated ? '✅ Sí' : '❌ No'}
        </p>
        {user && (
          <p>
            <strong>Usuario:</strong> {user.email} ({user.role})
          </p>
        )}
      </div>

      {/* Tokens de prueba */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">🎫 Tokens de Prueba</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-yellow-200 p-3 rounded">
            <h3 className="font-semibold text-yellow-800">👤 PLAYER</h3>
            <p className="text-xs text-yellow-700 mb-2">player@example.com</p>
            <button
              onClick={() => testAuthentication(TEST_TOKENS.PLAYER)}
              disabled={loading}
              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Probar'}
            </button>
          </div>

          <div className="border border-yellow-200 p-3 rounded">
            <h3 className="font-semibold text-yellow-800">🏢 FIELD_OWNER</h3>
            <p className="text-xs text-yellow-700 mb-2">owner@example.com</p>
            <button
              onClick={() => testAuthentication(TEST_TOKENS.FIELD_OWNER)}
              disabled={loading}
              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Probar'}
            </button>
          </div>

          <div className="border border-yellow-200 p-3 rounded">
            <h3 className="font-semibold text-yellow-800">👑 ADMIN</h3>
            <p className="text-xs text-yellow-700 mb-2">admin@example.com</p>
            <button
              onClick={() => testAuthentication(TEST_TOKENS.ADMIN)}
              disabled={loading}
              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Probar'}
            </button>
          </div>
        </div>
      </div>

      {/* Resultado de autenticación */}
      {authResult && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            🔍 Resultado de Autenticación
          </h3>
          <pre className="text-sm text-green-700 bg-green-100 p-3 rounded overflow-auto">
            {authResult}
          </pre>
        </div>
      )}

      {/* Acciones con autenticación */}
      {selectedToken && (
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            ⚡ Acciones Autenticadas
          </h3>
          <div className="flex gap-4 mb-4">
            <button
              onClick={loadBookings}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Cargar Reservas'}
            </button>

            <button
              onClick={createTestBooking}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Crear Reserva de Prueba'
              )}
            </button>

            <button
              onClick={clearAuth}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Limpiar Auth
            </button>
          </div>
        </div>
      )}

      {/* Mostrar error si existe */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Lista de reservas */}
      {bookings.length > 0 && (
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            📋 Reservas ({bookings.length})
          </h3>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 p-3 rounded"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Reserva #{booking.id}</h4>
                    <p className="text-sm text-gray-600">
                      Cancha: {booking.fieldId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Fecha: {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Hora: {booking.startTime} - {booking.endTime}
                    </p>
                    {booking.comments && (
                      <p className="text-sm text-gray-600">
                        Comentarios: {booking.comments}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      ${booking.totalPrice}
                    </p>
                  </div>
                </div>
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
          <p>
            <strong>Tokens válidos hasta:</strong> 2025-07-10 (24 horas)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FootballAuthTest;
