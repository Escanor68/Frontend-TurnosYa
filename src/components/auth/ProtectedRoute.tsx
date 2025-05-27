"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useRoleCheck } from "../../hooks/useRoleCheck"
import type { User } from "../../types/auth"
import { LoadingSpinner } from "../common/LoadingSpinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('admin' | 'owner' | 'player')[]
}

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const { canAccessRoute } = useRoleCheck()
  const location = useLocation()

  // Mostrar spinner mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (!isAuthenticated) {
    // Guardar la ruta actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si hay roles permitidos y el usuario no tiene el rol adecuado
  if (allowedRoles.length > 0 && !canAccessRoute(allowedRoles)) {
    return <Navigate to="/403" replace />
  }

  // Si todo está bien, mostrar el contenido protegido
  return <>{children}</>
}

// Componente de acceso denegado
export const AccessDeniedPage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acceso Denegado
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No tienes permisos para acceder a esta página.
          </p>
          {user && (
            <p className="mt-1 text-sm text-gray-500">
              Tu rol actual es: {user.role}
            </p>
          )}
        </div>
        <div className="mt-4">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  )
}
