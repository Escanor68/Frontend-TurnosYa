"use client"

import { useState, useCallback } from "react"
import type { ValidationError, ValidationResult } from "../types"

// Tipos de validación disponibles
type ValidationType = "required" | "email" | "minLength" | "maxLength" | "pattern" | "custom"

// Interfaz para las reglas de validación
interface ValidationRule {
  type: ValidationType
  message: string
  value?: any // Para minLength, maxLength, pattern, custom
}

// Interfaz para el esquema de validación
interface ValidationSchema {
  [field: string]: ValidationRule[]
}

// Hook personalizado para validación de formularios
export const useFormValidation = <T extends Record<string, any>>(schema: ValidationSchema) => {
  const [errors, setErrors] = useState<ValidationError[]>([])

  // Función para validar un campo específico
  const validateField = useCallback(
    (field: string, value: any): ValidationError[] => {
      const fieldErrors: ValidationError[] = []
      const rules = schema[field]

      if (!rules) return fieldErrors

      for (const rule of rules) {
        switch (rule.type) {
          case "required":
            if (!value || (typeof value === "string" && value.trim() === "")) {
              fieldErrors.push({ field, message: rule.message })
            }
            break
          case "email":
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              fieldErrors.push({ field, message: rule.message })
            }
            break
          case "minLength":
            if (value && value.length < rule.value) {
              fieldErrors.push({ field, message: rule.message })
            }
            break
          case "maxLength":
            if (value && value.length > rule.value) {
              fieldErrors.push({ field, message: rule.message })
            }
            break
          case "pattern":
            if (value && !new RegExp(rule.value).test(value)) {
              fieldErrors.push({ field, message: rule.message })
            }
            break
          case "custom":
            if (rule.value && !rule.value(value)) {
              fieldErrors.push({ field, message: rule.message })
            }
            break
        }
      }

      return fieldErrors
    },
    [schema],
  )

  // Función para validar todo el formulario
  const validateForm = useCallback(
    (data: T): ValidationResult => {
      let allErrors: ValidationError[] = []

      // Validar cada campo en el esquema
      Object.keys(schema).forEach((field) => {
        const fieldErrors = validateField(field, data[field])
        allErrors = [...allErrors, ...fieldErrors]
      })

      setErrors(allErrors)

      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
      }
    },
    [schema, validateField],
  )

  // Obtener el mensaje de error para un campo específico
  const getFieldError = useCallback(
    (field: string): string | null => {
      const error = errors.find((err) => err.field === field)
      return error ? error.message : null
    },
    [errors],
  )

  // Verificar si un campo tiene error
  const hasError = useCallback(
    (field: string): boolean => {
      return errors.some((err) => err.field === field)
    },
    [errors],
  )

  // Limpiar todos los errores
  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  return {
    errors,
    validateField,
    validateForm,
    getFieldError,
    hasError,
    clearErrors,
  }
}

// Esquemas de validación predefinidos
export const bookingValidationSchema: ValidationSchema = {
  date: [{ type: "required", message: "La fecha es obligatoria" }],
  time: [{ type: "required", message: "La hora es obligatoria" }],
  contactName: [
    { type: "required", message: "El nombre es obligatorio" },
    { type: "minLength", value: 3, message: "El nombre debe tener al menos 3 caracteres" },
  ],
  contactPhone: [
    { type: "required", message: "El teléfono es obligatorio" },
    { type: "minLength", value: 8, message: "El teléfono debe tener al menos 8 caracteres" },
    {
      type: "pattern",
      value: /^[0-9\-+\s$$$$]+$/,
      message: "El teléfono debe contener solo números y caracteres válidos",
    },
  ],
  contactEmail: [
    { type: "required", message: "El email es obligatorio" },
    { type: "email", message: "El email no es válido" },
  ],
  termsAccepted: [
    {
      type: "custom",
      value: (value: boolean) => value === true,
      message: "Debes aceptar los términos y condiciones",
    },
  ],
}

export const loginValidationSchema: ValidationSchema = {
  email: [
    { type: "required", message: "El email es obligatorio" },
    { type: "email", message: "El email no es válido" },
  ],
  password: [
    { type: "required", message: "La contraseña es obligatoria" },
    { type: "minLength", value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
  ],
}

export const registerValidationSchema: ValidationSchema = {
  name: [
    { type: "required", message: "El nombre es obligatorio" },
    { type: "minLength", value: 3, message: "El nombre debe tener al menos 3 caracteres" },
  ],
  email: [
    { type: "required", message: "El email es obligatorio" },
    { type: "email", message: "El email no es válido" },
  ],
  password: [
    { type: "required", message: "La contraseña es obligatoria" },
    { type: "minLength", value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
  ],
  confirmPassword: [
    { type: "required", message: "Confirma tu contraseña" },
    {
      type: "custom",
      value: (value: string, formData: any) => value === formData.password,
      message: "Las contraseñas no coinciden",
    },
  ],
  phone: [
    {
      type: "pattern",
      value: /^[0-9\-+\s$$$$]*$/,
      message: "El teléfono debe contener solo números y caracteres válidos",
    },
  ],
}
