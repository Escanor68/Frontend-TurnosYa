"use client"

import type React from "react"
import { useState } from "react"

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string | number | boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  required?: boolean
  error?: string | null
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  helpText?: string
  as?: "input" | "textarea" | "select"
  rows?: number
  min?: number
  max?: number
}

// Componente reutilizable para campos de formulario
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
  children,
  icon,
  helpText,
  as = "input",
  rows = 3,
  min,
  max,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const baseClasses = `w-full border ${
    error ? "border-red-500" : isFocused ? "border-emerald-500" : "border-gray-300"
  } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`

  const iconClasses = icon ? "pl-10" : ""

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}

        {as === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value as string}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`${baseClasses} ${iconClasses}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={rows}
          />
        ) : as === "select" ? (
          <select
            id={name}
            name={name}
            value={value as string}
            onChange={onChange}
            required={required}
            className={`${baseClasses} ${iconClasses}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {children}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={type === "checkbox" ? undefined : (value as string)}
            checked={type === "checkbox" ? (value as boolean) : undefined}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`${baseClasses} ${iconClasses}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            min={min}
            max={max}
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  )
}
