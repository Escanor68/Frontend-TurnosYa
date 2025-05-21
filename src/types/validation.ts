// Tipos relacionados con validación de formularios

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationSchema {
  [field: string]: ValidationRule[];
}

export interface ValidationRule {
  type: "required" | "email" | "minLength" | "maxLength" | "pattern" | "custom";
  message: string;
  value?: any; // Para minLength, maxLength, pattern, custom
}
