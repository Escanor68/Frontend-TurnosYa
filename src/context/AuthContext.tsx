import React, { createContext, useState, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  hasFields: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Update the admin user credentials to include hasFields
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin1",
        name: "Administrador",
        email: "admin@example.com",
        isAdmin: true,
        hasFields: true, // Allow admin to manage fields
      }

      setUser(adminUser)
      localStorage.setItem("user", JSON.stringify(adminUser))
      return true
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}