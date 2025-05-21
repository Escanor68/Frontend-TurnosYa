"use client"

import type React from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "white" | "gray"
  className?: string
}

// Componente reutilizable para mostrar un spinner de carga
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", color = "primary", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  }

  const colorClasses = {
    primary: "border-t-emerald-500 border-b-emerald-500",
    white: "border-t-white border-b-white",
    gray: "border-t-gray-500 border-b-gray-500",
  }

  return (
    <div
      className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-r-transparent border-l-transparent ${className}`}
    ></div>
  )
}
