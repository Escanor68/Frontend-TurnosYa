"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { LoadingSpinner } from "../common/LoadingSpinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "owner" | "user"
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Mostrar spinner mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />
  }

  // Verificar rol si se especifica
  if (requiredRole && user.role !== requiredRole) {
    // Si se requiere un rol específico y el usuario no lo tiene, redirigir a la página principal
    return <Navigate to="/" replace />
  }

  // Si está autenticado y tiene el rol requerido (o no se requiere rol específico), mostrar el contenido
  return <>{children}</>
}

export default ProtectedRoute
