"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import type { User, AuthState, AuthContextType, RegisterData } from "../types"
import { mockUsers } from "../services/mockData"

// Valores iniciales para el contexto de autenticación
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

// Crear el contexto
const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  updateProfile: async () => {},
})

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState)
  const navigate = useNavigate()

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          try {
            const user = JSON.parse(storedUser) as User
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (parseError) {
            console.error("Error parsing user from localStorage:", parseError)
            localStorage.removeItem("user") // Eliminar datos inválidos
            setAuthState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: "Error al procesar los datos de usuario",
            })
          }
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: "Error al verificar la autenticación",
        })
      }
    }

    checkAuth()
  }, [])

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuario en datos mockeados (en una app real, esto sería una llamada a API)
      const user = mockUsers.find((u) => u.email === email)

      if (user) {
        // En una app real, verificaríamos la contraseña con el backend
        localStorage.setItem("user", JSON.stringify(user))

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })

        toast.success(`¡Bienvenido, ${user.name}!`)

        // Redirigir según el rol
        if (user.role === "admin") {
          navigate("/admin/dashboard")
        } else if (user.role === "owner") {
          navigate("/field-owner/dashboard")
        } else {
          navigate("/profile")
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: "Credenciales inválidas",
        })
        toast.error("Email o contraseña incorrectos")
      }
    } catch (error) {
      console.error("Login error:", error)
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Error al iniciar sesión",
      })
      toast.error("Error al iniciar sesión")
    }
  }

  // Función para cerrar sesión
  const logout = (): void => {
    try {
      localStorage.removeItem("user")
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      toast.info("Has cerrado sesión")
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Error al cerrar sesión")
    }
  }

  // Función para registrar un nuevo usuario
  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar si el email ya existe
      const existingUser = mockUsers.find((u) => u.email === userData.email)

      if (existingUser) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: "El email ya está registrado",
        }))
        toast.error("El email ya está registrado")
        return
      }

      // Crear nuevo usuario (en una app real, esto sería una llamada a API)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role || "user",
      }

      // En una app real, no guardaríamos el usuario en localStorage directamente
      localStorage.setItem("user", JSON.stringify(newUser))

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      toast.success("¡Registro exitoso!")
      navigate("/profile")
    } catch (error) {
      console.error("Registration error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error al registrar usuario",
      }))
      toast.error("Error al registrar usuario")
    }
  }

  // Función para actualizar el perfil del usuario
  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      if (!authState.user) {
        throw new Error("No hay usuario autenticado")
      }

      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar usuario (en una app real, esto sería una llamada a API)
      const updatedUser: User = {
        ...authState.user,
        ...userData,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      toast.success("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Update profile error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error al actualizar perfil",
      }))
      toast.error("Error al actualizar perfil")
    }
  }

  // Valor del contexto
  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
    updateProfile,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
