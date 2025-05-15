import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

// Types
interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  hasFields: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

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
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This would be replaced with an actual API call
      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Admin user credentials
      if (email === "admin@example.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin1",
          name: "Administrador",
          email: "admin@example.com",
          isAdmin: true,
          hasFields: true,
        }

        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        return true
      }

      // Regular user credentials
      if (email === "demo@example.com" && password === "password") {
        const userData: User = {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
          isAdmin: false,
          hasFields: true,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // This would be replaced with an actual API call
      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 800))

      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        isAdmin: false,
        hasFields: false,
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
