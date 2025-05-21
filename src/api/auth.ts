//import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  hasFields: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Mock data for development
const MOCK_USERS = {
  admin: {
    id: "admin1",
    name: "Administrador",
    email: "admin@example.com",
    isAdmin: true,
    hasFields: true,
  },
  user: {
    id: "user1",
    name: "Demo User",
    email: "demo@example.com",
    isAdmin: false,
    hasFields: true,
  }
};

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock authentication logic
    if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
      return MOCK_USERS.admin;
    }
    
    if (credentials.email === "demo@example.com" && credentials.password === "password") {
      return MOCK_USERS.user;
    }

    throw new Error("Invalid credentials");
  },

  register: async (data: RegisterData): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      isAdmin: false,
      hasFields: false,
    };

    return newUser;
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
};