import type { SportField, AdditionalService, RecurrenceOption, PaymentMethod, User } from "../types"
import { Award, BellIcon as Whistle, Video, Utensils } from "lucide-react"
import React from "react"

// Datos mockeados centralizados para toda la aplicación

// Usuarios de ejemplo
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Usuario",
    email: "admin@turnosya.com",
    phone: "1122334455",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Propietario Ejemplo",
    email: "owner@turnosya.com",
    phone: "1155667788",
    role: "owner",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Usuario Normal",
    email: "user@turnosya.com",
    phone: "1199887766",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
]

// Campos deportivos
export const mockSportFields: SportField[] = [
  {
    id: "1",
    name: "Complejo Deportivo Goleador",
    location: {
      address: "Av. del Libertador 4567",
      city: "Buenos Aires",
      province: "CABA",
      coordinates: {
        lat: -34.5735,
        lng: -58.4173,
      },
    },
    price: 8500,
    type: "Fútbol 5",
    duration: 60,
    players: "5 vs 5",
    image:
      "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hasAdditionalServices: true,
    ownerId: "2",
    rating: 4.5,
    amenities: ["Vestuarios", "Estacionamiento", "Iluminación", "Bar"],
    description: "Complejo deportivo con 4 canchas de fútbol 5 con césped sintético de última generación.",
  },
  {
    id: "2",
    name: "Complejo Messi",
    location: {
      address: "Av. Cabildo 1234",
      city: "Buenos Aires",
      province: "CABA",
      coordinates: {
        lat: -34.5645,
        lng: -58.4573,
      },
    },
    price: 12000,
    type: "Fútbol 7",
    duration: 60,
    players: "7 vs 7",
    image:
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hasAdditionalServices: true,
    ownerId: "2",
    rating: 4.8,
    amenities: ["Vestuarios", "Estacionamiento", "Iluminación", "Bar", "WiFi"],
    description: "Canchas de fútbol 7 con césped sintético profesional y sistema de drenaje.",
  },
  {
    id: "3",
    name: "La Bombonerita",
    location: {
      address: "Brandsen 805",
      city: "Buenos Aires",
      province: "CABA",
      coordinates: {
        lat: -34.6358,
        lng: -58.3659,
      },
    },
    price: 18000,
    type: "Fútbol 11",
    duration: 90,
    players: "11 vs 11",
    image:
      "https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hasAdditionalServices: false,
    ownerId: "2",
    rating: 4.2,
    amenities: ["Vestuarios", "Estacionamiento", "Iluminación"],
    description: "Cancha de fútbol 11 profesional con medidas reglamentarias.",
  },
  {
    id: "4",
    name: "Complejo River",
    location: {
      address: "Av. Figueroa Alcorta 7597",
      city: "Buenos Aires",
      province: "CABA",
      coordinates: {
        lat: -34.5454,
        lng: -58.4512,
      },
    },
    price: 9000,
    type: "Fútbol 5",
    duration: 60,
    players: "5 vs 5",
    image:
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hasAdditionalServices: true,
    ownerId: "2",
    rating: 4.6,
    amenities: ["Vestuarios", "Estacionamiento", "Iluminación", "Bar", "WiFi"],
    description: "Complejo con 6 canchas de fútbol 5 con césped sintético de alta calidad.",
  },
  {
    id: "5",
    name: "Cancha El Monumental",
    location: {
      address: "Av. Rivadavia 5000",
      city: "Buenos Aires",
      province: "CABA",
      coordinates: {
        lat: -34.6058,
        lng: -58.4333,
      },
    },
    price: 11500,
    type: "Fútbol 7",
    duration: 60,
    players: "7 vs 7",
    image:
      "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hasAdditionalServices: true,
    ownerId: "2",
    rating: 4.3,
    amenities: ["Vestuarios", "Estacionamiento", "Iluminación"],
    description: "Canchas de fútbol 7 con césped sintético y sistema de iluminación LED.",
  },
  {
    id: "6",
    name: "Complejo Maradona",
    location: {
      address: "Av. Corrientes 3200",
      city: "Buenos Aires",
      province: "CABA",
      coordinates: {
        lat: -34.6037,
        lng: -58.4112,
      },
    },
    price: 8200,
    type: "Fútbol 5",
    duration: 60,
    players: "5 vs 5",
    image:
      "https://images.pexels.com/photos/186230/pexels-photo-186230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hasAdditionalServices: false,
    ownerId: "2",
    rating: 4.1,
    amenities: ["Vestuarios", "Iluminación"],
    description: "Canchas de fútbol 5 techadas, ideales para jugar con cualquier clima.",
  },
]

// Función para obtener un campo por ID
export const getFieldById = (id: string): SportField | undefined => {
  return mockSportFields.find((field) => field.id === id)
}

// Servicios adicionales disponibles
export const additionalServices: AdditionalService[] = [
  {
    id: "equipment",
    name: "Alquiler de Equipamiento",
    description: "Pelotas, pecheras, conos",
    price: 1500,
    icon: React.createElement(Award, { className: "h-5 w-5" }),
  },
  {
    id: "referee",
    name: "Árbitro",
    description: "Árbitro profesional para tu partido",
    price: 3000,
    icon: React.createElement(Whistle, { className: "h-5 w-5" }),
  },
  {
    id: "recording",
    name: "Grabación del Partido",
    description: "Video HD del partido completo",
    price: 2500,
    icon: React.createElement(Video, { className: "h-5 w-5" }),
  },
  {
    id: "grill",
    name: "Parrilla",
    description: "Acceso a zona de parrilla con equipamiento",
    price: 2000,
    icon: React.createElement(Utensils, { className: "h-5 w-5" }),
  },
]

// Opciones de recurrencia
export const recurrenceOptions: RecurrenceOption[] = [
  { id: "none", name: "Sin recurrencia", discount: 0 },
  { id: "weekly", name: "Semanal", discount: 5 },
  { id: "biweekly", name: "Quincenal", discount: 3 },
  { id: "monthly", name: "Mensual", discount: 2 },
]

// Métodos de pago
export const paymentMethods: PaymentMethod[] = [
  { id: "mercadopago", name: "Mercado Pago", icon: "💳" },
  { id: "transfer", name: "Transferencia Bancaria", icon: "🏦" },
]

// Generar franjas horarias basadas en la fecha
export const generateTimeSlots = (date: string): string[] => {
  // En una aplicación real, esto vendría de una API basada en disponibilidad
  // Por ahora, devolvemos slots fijos
  return ["18:00", "19:00", "20:00", "21:00", "22:00"]
}

// Reservas mockeadas
export const mockBookings = [
  {
    id: "1",
    fieldId: "1",
    userId: "3",
    date: "2023-05-15",
    time: "19:00",
    players: 10,
    contactName: "Usuario Normal",
    contactPhone: "1199887766",
    contactEmail: "user@turnosya.com",
    paymentMethod: "mercadopago",
    status: "confirmed",
    totalPrice: 8500,
    recurrence: "none",
    recurrenceCount: 1,
    additionalServices: [],
    recurrenceExceptions: [],
    createdAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "2",
    fieldId: "2",
    userId: "3",
    date: "2023-05-22",
    time: "20:00",
    players: 14,
    contactName: "Usuario Normal",
    contactPhone: "1199887766",
    contactEmail: "user@turnosya.com",
    paymentMethod: "transfer",
    status: "pending",
    totalPrice: 12000,
    recurrence: "none",
    recurrenceCount: 1,
    additionalServices: ["referee"],
    recurrenceExceptions: [],
    createdAt: "2023-05-18T10:15:00Z",
  },
]
