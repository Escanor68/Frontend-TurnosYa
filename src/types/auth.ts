export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  role: 'player' | 'owner';
  points: number;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UserProfile extends User {
  bookingHistory: BookingHistory[];
  reviews: Review[];
  teams: Team[];
  notifications: Notification[];
  socialConnections: SocialConnection[];
}

export interface BookingHistory {
  id: string;
  fieldId: string;
  fieldName: string;
  date: Date;
  status: 'completed' | 'upcoming' | 'cancelled';
  price: number;
  pointsEarned: number;
}

export interface Review {
  id: string;
  fieldId: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  upcomingMatches: Match[];
}

export interface Match {
  id: string;
  fieldId: string;
  teamAId: string;
  teamBId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  type: 'booking' | 'team' | 'social' | 'system';
  message: string;
  read: boolean;
  date: Date;
}

export interface SocialConnection {
  id: string;
  userId: string;
  platform: 'facebook' | 'google' | 'twitter';
  connected: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
