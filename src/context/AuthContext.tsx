"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

// Types
interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean // Para super administradores (solo 3 personas)
  hasFields: boolean,
  isOwner: boolean // Para propietarios de canchas (reemplaza hasFields)
  phone?: string // Añadir teléfono opcional
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, userType: string, phone?: string) => Promise<boolean>
  logout: () => void
}

// Usuarios mockeados para desarrollo
const MOCK_USERS = [
  {
    id: "admin1",
    name: "Super Admin",
    email: "admin@example.com",
    password: "admin123",
    hasFields: true,
    isOwner: false,
  },
  {
    id: "owner1",
    name: "Propietario Demo",
    email: "owner@example.com",
    password: "owner123",
    hasFields: false,
    isOwner: true,
    phone: "1155667788",
  },
  {
    id: "user1",
    name: "Demo Usuario",
    email: "demo@example.com",
    password: "password",
    hasFields: false,
    isOwner: false,
    phone: "1198765432",
  },
]

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing stored user:", e)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log("Intentando login con:", { email, password })

      // Buscar usuario en la lista de usuarios mockeados
      const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (foundUser) {
        // Crear objeto de usuario sin incluir la contraseña
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
          hasFields: foundUser.hasFields,
          isOwner: foundUser.isOwner,
          phone: foundUser.phone,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        console.log("Login exitoso:", userData)
        return true
      }

      console.log("Credenciales inválidas")
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    userType: string,
    phone?: string,
  ): Promise<boolean> => {
    try {
      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 800))

      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        isAdmin: false,
        isOwner: userType === "owner",
        phone,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
