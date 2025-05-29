import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().required('El email es requerido').email('Email inválido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: yup.string().required('El email es requerido').email('Email inválido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  phone: yup.string().matches(/^[0-9\-+\s]+$/, 'Teléfono inválido'),
});

export const bookingSchema = yup.object().shape({
  date: yup.string().required('La fecha es requerida'),
  time: yup.string().required('La hora es requerida'),
  players: yup
    .number()
    .required('Número de jugadores requerido')
    .min(1, 'Mínimo 1 jugador')
    .max(22, 'Máximo 22 jugadores'),
  contactName: yup.string().required('Nombre es requerido'),
  contactPhone: yup
    .string()
    .required('Teléfono es requerido')
    .matches(/^[0-9\-+\s]+$/, 'Teléfono inválido'),
  contactEmail: yup
    .string()
    .required('Email es requerido')
    .email('Email inválido'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones'),
});

export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: yup.string().required('El email es requerido').email('Email inválido'),
  phone: yup.string().matches(/^[0-9\-+\s]+$/, 'Teléfono inválido'),
});
