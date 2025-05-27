import { mockUsers, mockCourts, mockBookings } from './mockData';
import { User } from '../../types/auth';

// Variable para controlar si usamos mock o API real
const USE_MOCK = true;

class MockService {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    // En un entorno de prueba, cualquier contraseña es válida
    return {
      user,
      token: 'mock-token-' + user.role
    };
  }

  async register(email: string, password: string, name: string, role: string): Promise<{ user: User; token: string }> {
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role: role as 'admin' | 'owner' | 'player',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return {
      user: newUser,
      token: 'mock-token-' + newUser.role
    };
  }

  // Courts
  async getCourts() {
    return mockCourts;
  }

  async getCourtById(id: string) {
    const court = mockCourts.find(c => c.id === id);
    if (!court) throw new Error('Cancha no encontrada');
    return court;
  }

  async createCourt(courtData: any) {
    const newCourt = {
      id: String(mockCourts.length + 1),
      ...courtData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCourts.push(newCourt);
    return newCourt;
  }

  // Bookings
  async getBookings() {
    return mockBookings;
  }

  async getBookingById(id: string) {
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Reserva no encontrada');
    return booking;
  }

  async createBooking(bookingData: any) {
    const newBooking = {
      id: String(mockBookings.length + 1),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBookings.push(newBooking);
    return newBooking;
  }

  // Users
  async getUsers() {
    return mockUsers;
  }

  async getUserById(id: string) {
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }
}

export const mockService = new MockService();
export { USE_MOCK };