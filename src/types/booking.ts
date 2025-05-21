// Tipos relacionados con reservas

export interface Booking {
  id: string
  fieldId: string
  userId: string
  date: string
  time: string
  players: number
  contactName: string
  contactPhone: string
  contactEmail: string
  paymentMethod: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  totalPrice: number
  recurrence: string
  recurrenceCount: number
  additionalServices: string[]
  additionalServicesNotes?: string
  recurrenceExceptions: string[]
  createdAt: string
}

export interface BookingFormData {
  date: string
  time: string
  players: number
  contactName: string
  contactPhone: string
  contactEmail: string
  paymentMethod: string
  termsAccepted: boolean
  recurrence: string
  recurrenceCount: number
  additionalServices: string[]
  additionalServicesNotes: string
  recurrenceExceptions: string[]
}

export interface RecurrenceOption {
  id: string
  name: string
  discount: number
}
