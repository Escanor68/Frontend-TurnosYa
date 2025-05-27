import { User } from '../../types/auth';

// Usuarios mock
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@turnosya.com',
    name: 'Administrador',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    email: 'owner@turnosya.com',
    name: 'Dueño de Canchas',
    role: 'owner',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    email: 'player@turnosya.com',
    name: 'Jugador',
    role: 'player',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

// Canchas mock
export const mockCourts = [
  {
    id: '1',
    name: 'Cancha Principal',
    description: 'Cancha de fútbol 11 con césped sintético',
    type: 'football',
    price: 15000,
    ownerId: '2',
    status: 'active',
    images: ['https://via.placeholder.com/400x300'],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Cancha de Tenis',
    description: 'Cancha de tenis profesional',
    type: 'tennis',
    price: 10000,
    ownerId: '2',
    status: 'active',
    images: ['https://via.placeholder.com/400x300'],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

// Reservas mock
export const mockBookings = [
  {
    id: '1',
    courtId: '1',
    userId: '3',
    date: '2024-05-01',
    startTime: '18:00',
    endTime: '19:00',
    status: 'confirmed',
    totalPrice: 15000,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    courtId: '2',
    userId: '3',
    date: '2024-05-02',
    startTime: '17:00',
    endTime: '18:00',
    status: 'pending',
    totalPrice: 10000,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]; 