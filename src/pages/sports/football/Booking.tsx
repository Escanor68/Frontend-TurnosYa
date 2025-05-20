"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { toast } from "react-toastify"
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Repeat,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Utensils,
  BellIcon as Whistle,
  Video,
  Award,
} from "lucide-react"

// Mock data para campos específicos - en una app real, esto vendría de una API
const getFieldData = (id: string) => {
  // Datos de ejemplo para diferentes campos
  const fields = {
    "1": {
      id: "1",
      name: "Complejo Deportivo Goleador",
      location: {
        address: "Av. del Libertador 4567",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 8500,
      type: "Fútbol 5",
      duration: 60,
      players: "5 vs 5",
      image:
        "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      hasAdditionalServices: true,
    },
    "2": {
      id: "2",
      name: "Complejo Messi",
      location: {
        address: "Av. Cabildo 1234",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 12000,
      type: "Fútbol 7",
      duration: 60,
      players: "7 vs 7",
      image:
        "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      hasAdditionalServices: true,
    },
    "3": {
      id: "3",
      name: "La Bombonerita",
      location: {
        address: "Brandsen 805",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 18000,
      type: "Fútbol 11",
      duration: 90,
      players: "11 vs 11",
      image:
        "https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      hasAdditionalServices: false,
    },
    "4": {
      id: "4",
      name: "Complejo River",
      location: {
        address: "Av. Figueroa Alcorta 7597",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 9000,
      type: "Fútbol 5",
      duration: 60,
      players: "5 vs 5",
      image:
        "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      hasAdditionalServices: true,
    },
    "5": {
      id: "5",
      name: "Cancha El Monumental",
      location: {
        address: "Av. Rivadavia 5000",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 11500,
      type: "Fútbol 7",
      duration: 60,
      players: "7 vs 7",
      image:
        "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      hasAdditionalServices: true,
    },
    "6": {
      id: "6",
      name: "Complejo Maradona",
      location: {
        address: "Av. Corrientes 3200",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 8200,
      type: "Fútbol 5",
      duration: 60,
      players: "5 vs 5",
      image:
        "https://images.pexels.com/photos/186230/pexels-photo-186230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      hasAdditionalServices: false,
    },
  }

  // Devolver el campo correspondiente o un campo por defecto si no existe
  return fields[id as keyof typeof fields] || fields["1"]
}

// Métodos de pago
const paymentMethods = [
  { id: "mercadopago", name: "Mercado Pago", icon: "💳" },
  { id: "transfer", name: "Transferencia Bancaria", icon: "🏦" },
]

// Servicios adicionales disponibles
const additionalServices = [
  {
    id: "equipment",
    name: "Alquiler de Equipamiento",
    description: "Pelotas, pecheras, conos",
    price: 1500,
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: "referee",
    name: "Árbitro",
    description: "Árbitro profesional para tu partido",
    price: 3000,
    icon: <Whistle className="h-5 w-5" />,
  },
  {
    id: "recording",
    name: "Grabación del Partido",
    description: "Video HD del partido completo",
    price: 2500,
    icon: <Video className="h-5 w-5" />,
  },
  {
    id: "grill",
    name: "Parrilla",
    description: "Acceso a zona de parrilla con equipamiento",
    price: 2000,
    icon: <Utensils className="h-5 w-5" />,
  },
]

// Opciones de recurrencia
const recurrenceOptions = [
  { id: "none", name: "Sin recurrencia", discount: 0 },
  { id: "weekly", name: "Semanal", discount: 5 },
  { id: "biweekly", name: "Quincenal", discount: 3 },
  { id: "monthly", name: "Mensual", discount: 2 },
]

const Booking: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()
  const [field, setField] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    players: 10,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    paymentMethod: "mercadopago",
    termsAccepted: false,
    // Nuevo campo para recurrencia por día
    dayRecurrence: "none",
    recurrenceCount: 4,
    // Campo para notas de servicios adicionales
    additionalServicesNotes: "",
  })
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [showRecurrenceOptions, setShowRecurrenceOptions] = useState(false)
  const [showAdditionalServices, setShowAdditionalServices] = useState(false)

  // Actualizar datos de contacto cuando el usuario está autenticado
  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        contactName: user.name || prev.contactName,
        contactEmail: user.email || prev.contactEmail,
        contactPhone: user.phone || prev.contactPhone,
      }))
    }
  }, [user])

  // Analizar parámetros de consulta
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const date = params.get("date")
    const timeSlotId = params.get("time")

    if (date) {
      setBookingData((prev) => ({ ...prev, date }))

      // Generar franjas horarias basadas en la fecha
      const slots = ["18:00", "19:00", "20:00", "21:00", "22:00"]
      setTimeSlots(slots)

      // Si se seleccionó una franja horaria, encontrar la hora correspondiente
      if (timeSlotId) {
        const mockTimeSlots = [
          { id: "1", time: "18:00" },
          { id: "2", time: "19:00" },
          { id: "3", time: "20:00" },
          { id: "4", time: "21:00" },
          { id: "5", time: "22:00" },
        ]

        const selectedSlot = mockTimeSlots.find((slot) => slot.id === timeSlotId)
        if (selectedSlot) {
          setBookingData((prev) => ({ ...prev, time: selectedSlot.time }))
        }
      }
    }
  }, [location.search])

  // Obtener datos del campo
  useEffect(() => {
    if (fieldId) {
      // Simular llamada a API
      setTimeout(() => {
        setField(getFieldData(fieldId))
        setLoading(false)
      }, 500)
    }
  }, [fieldId])

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.info("Debes iniciar sesión para realizar una reserva")
      navigate(`/login?redirect=/football/booking/${fieldId}${location.search}`)
    }
  }, [loading, isAuthenticated, navigate, fieldId, location.search])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }))
  }

  // Manejar cambio de recurrencia
  const handleRecurrenceChange = (recurrenceId: string) => {
    setBookingData((prev) => ({
      ...prev,
      recurrence: recurrenceId,
    }))
  }

  // Manejar cambio en el contador de recurrencia
  const handleRecurrenceCountChange = (increment: boolean) => {
    setBookingData((prev) => ({
      ...prev,
      recurrenceCount: increment ? Math.min(prev.recurrenceCount + 1, 12) : Math.max(prev.recurrenceCount - 1, 2),
    }))
  }

  // Manejar selección de servicios adicionales
  const handleServiceToggle = (serviceId: string) => {
    setBookingData((prev) => {
      if (prev.additionalServices.includes(serviceId)) {
        return {
          ...prev,
          additionalServices: prev.additionalServices.filter((id) => id !== serviceId),
        }
      } else {
        return {
          ...prev,
          additionalServices: [...prev.additionalServices, serviceId],
        }
      }
    })
  }

  // Calcular precio total con descuentos y servicios adicionales
  const calculateTotalPrice = () => {
    if (!field) return 0

    // Precio base
    const basePrice = field.price

    // Aplicar descuento por recurrencia si corresponde
    const recurrenceOption = recurrenceOptions.find((option) => option.id === bookingData.recurrence)
    const recurrenceDiscount = recurrenceOption ? recurrenceOption.discount / 100 : 0

    // Calcular precio con descuento
    const discountedPrice = basePrice * (1 - recurrenceDiscount)

    // Multiplicar por la cantidad de recurrencias si no es "none"
    const recurrenceMultiplier = bookingData.recurrence !== "none" ? bookingData.recurrenceCount : 1

    // Calcular precio de servicios adicionales
    const servicesPrice = bookingData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId)
      return total + (service ? service.price : 0)
    }, 0)

    // Precio total
    return discountedPrice * recurrenceMultiplier + servicesPrice
  }

  const handleNextStep = () => {
    // Validar paso actual
    if (currentStep === 1) {
      if (!bookingData.date || !bookingData.time) {
        toast.error("Por favor selecciona fecha y hora")
        return
      }
    } else if (currentStep === 2) {
      if (!bookingData.contactName || !bookingData.contactPhone || !bookingData.contactEmail) {
        toast.error("Por favor completa todos los datos de contacto")
        return
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(bookingData.contactEmail)) {
        toast.error("Por favor ingresa un email válido")
        return
      }

      // Validar formato de teléfono (validación simple)
      if (bookingData.contactPhone.length < 8) {
        toast.error("Por favor ingresa un número de teléfono válido")
        return
      }
    }

    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!bookingData.termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones")
      return
    }

    // Simular envío de reserva
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("¡Reserva realizada con éxito!")
      navigate("/profile")
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  }

  // Obtener fechas recurrentes basadas en la configuración
  const getRecurrenceDates = () => {
    if (bookingData.recurrence === "none" || !bookingData.date) return []

    const dates = []
    const startDate = new Date(bookingData.date)

    for (let i = 0; i < bookingData.recurrenceCount; i++) {
      const currentDate = new Date(startDate)

      if (bookingData.recurrence === "weekly") {
        currentDate.setDate(currentDate.getDate() + i * 7)
      } else if (bookingData.recurrence === "biweekly") {
        currentDate.setDate(currentDate.getDate() + i * 14)
      } else if (bookingData.recurrence === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + i)
      }

      // Verificar si la fecha está en excepciones
      const dateString = currentDate.toISOString().split("T")[0]
      if (!bookingData.recurrenceExceptions.includes(dateString)) {
        dates.push(dateString)
      }
    }

    return dates
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/football/fields/${fieldId}`)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Volver a detalles de la cancha
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-white">Reservar Cancha</h1>
              <div className="text-white font-semibold">{field.name}</div>
            </div>

            {/* Progress Steps */}
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 1 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-2 text-gray-600">Fecha y Hora</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? "bg-emerald-600" : "bg-gray-200"}`}></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 2 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-2 text-gray-600">Datos de Contacto</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? "bg-emerald-600" : "bg-gray-200"}`}></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 3 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-sm mt-2 text-gray-600">Pago</span>
                </div>
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              {/* Step 1: Date and Time */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img
                          src={field.image || "/placeholder.svg"}
                          alt={field.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">{field.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                            <span>
                              {field.location.address}, {field.location.city}, {field.location.province}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                            <span>Duración: {field.duration} minutos</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-emerald-600" />
                            <span>
                              Tipo: {field.type} ({field.players})
                            </span>
                          </div>
                          <div className="flex items-center font-semibold text-emerald-600">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <span>${field.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Reserva</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="date"
                            value={bookingData.date}
                            onChange={handleInputChange}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Horario Disponible</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => handleTimeSelect(time)}
                              className={`py-2 px-3 rounded-lg text-center transition-colors ${
                                bookingData.time === time
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        {timeSlots.length === 0 && (
                          <p className="text-sm text-gray-500 mt-2">
                            Selecciona una fecha para ver los horarios disponibles
                          </p>
                        )}
                      </div>

                      {/* Reservas Recurrentes */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <button
                          type="button"
                          onClick={() => setShowRecurrenceOptions(!showRecurrenceOptions)}
                          className="flex justify-between items-center w-full"
                        >
                          <div className="flex items-center">
                            <Repeat className="h-5 w-5 mr-2 text-emerald-600" />
                            <span className="font-medium">Reservas Recurrentes</span>
                          </div>
                          {showRecurrenceOptions ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>

                        {showRecurrenceOptions && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Repetir reserva</label>
                              <select
                                name="dayRecurrence"
                                value={bookingData.dayRecurrence || "none"}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                              >
                                <option value="none">Sin repetición</option>
                                <option value="monday">Todos los lunes</option>
                                <option value="tuesday">Todos los martes</option>
                                <option value="wednesday">Todos los miércoles</option>
                                <option value="thursday">Todos los jueves</option>
                                <option value="friday">Todos los viernes</option>
                                <option value="saturday">Todos los sábados</option>
                                <option value="sunday">Todos los domingos</option>
                              </select>
                            </div>

                            {bookingData.dayRecurrence && bookingData.dayRecurrence !== "none" && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Número de semanas
                                </label>
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRecurrenceCountChange(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-8 w-8 rounded-l-lg flex items-center justify-center"
                                    disabled={bookingData.recurrenceCount <= 2}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <div className="h-8 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                                    {bookingData.recurrenceCount}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRecurrenceCountChange(true)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-8 w-8 rounded-r-lg flex items-center justify-center"
                                    disabled={bookingData.recurrenceCount >= 12}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                  <span className="ml-3 text-sm text-gray-600">semanas</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad de Jugadores</label>
                        <input
                          type="number"
                          name="players"
                          min="1"
                          max="22"
                          value={bookingData.players}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">Esto nos ayuda a preparar la cancha adecuadamente</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                      <input
                        type="text"
                        name="contactName"
                        value={bookingData.contactName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono de Contacto</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={bookingData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="11-1234-5678"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={bookingData.contactEmail}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Te enviaremos la confirmación de la reserva a este email
                      </p>
                    </div>
                  </div>

                  {/* Servicios Adicionales */}
                  {field.hasAdditionalServices && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <button
                        type="button"
                        onClick={() => setShowAdditionalServices(!showAdditionalServices)}
                        className="flex justify-between items-center w-full"
                      >
                        <div className="flex items-center">
                          <Plus className="h-5 w-5 mr-2 text-emerald-600" />
                          <span className="font-medium">Servicios Adicionales</span>
                        </div>
                        {showAdditionalServices ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>

                      {showAdditionalServices && (
                        <div className="mt-4 space-y-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ¿Necesitas algún servicio adicional?
                          </label>
                          <textarea
                            name="additionalServicesNotes"
                            value={bookingData.additionalServicesNotes || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={3}
                            placeholder="Describe qué servicios adicionales necesitas (árbitro, pelotas, pecheras, etc.)"
                          />
                          <p className="text-sm text-gray-500">
                            Los servicios adicionales serán coordinados directamente con el propietario de la cancha.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Información importante</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Llega 15 minutos antes de tu horario reservado</li>
                            <li>Trae tu propio equipo (pelotas, pecheras, etc.)</li>
                            <li>En caso de lluvia, la cancha puede estar cerrada</li>
                            <li>Cancelaciones con menos de 24hs tienen un cargo del 50%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Resumen de la Reserva</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Cancha:</p>
                        <p className="font-medium">{field.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tipo:</p>
                        <p className="font-medium">{field.type}</p>
                      </div>

                      {bookingData.recurrence === "none" ? (
                        <>
                          <div>
                            <p className="text-gray-600">Fecha:</p>
                            <p className="font-medium">{formatDate(bookingData.date)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Hora:</p>
                            <p className="font-medium">{bookingData.time}hs</p>
                          </div>
                        </>
                      ) : (
                        <div className="md:col-span-2">
                          <p className="text-gray-600">Fechas:</p>
                          <div className="font-medium">
                            <p className="mb-1">
                              {recurrenceOptions.find((o) => o.id === bookingData.recurrence)?.name} -
                              {bookingData.recurrence === "weekly"
                                ? "semanas"
                                : bookingData.recurrence === "biweekly"
                                  ? "quincenas"
                                  : "meses"}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                              {getRecurrenceDates().map((date, index) => (
                                <p key={date}>
                                  {index + 1}. {formatDate(date)} - {bookingData.time}hs
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-gray-600">Duración:</p>
                        <p className="font-medium">{field.duration} minutos</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Jugadores:</p>
                        <p className="font-medium">{bookingData.players}</p>
                      </div>
                    </div>

                    {/* Servicios adicionales seleccionados */}
                    {bookingData.additionalServices.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-2">Servicios adicionales:</p>
                        <div className="space-y-2">
                          {bookingData.additionalServices.map((serviceId) => {
                            const service = additionalServices.find((s) => s.id === serviceId)
                            return service ? (
                              <div key={service.id} className="flex justify-between">
                                <div className="flex items-center">
                                  <div className="p-1 bg-emerald-100 rounded-full mr-2 text-emerald-600">
                                    {service.icon}
                                  </div>
                                  <span>{service.name}</span>
                                </div>
                                <span className="font-medium">${service.price}</span>
                              </div>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Método de Pago</label>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            bookingData.paymentMethod === method.id
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={bookingData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <span className="text-xl mr-3">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    {/* Desglose de precios */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Precio base</span>
                        <span className="font-medium">${field.price}</span>
                      </div>

                      {bookingData.recurrence !== "none" && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Descuento por reserva{" "}
                            {recurrenceOptions.find((o) => o.id === bookingData.recurrence)?.name.toLowerCase()}
                          </span>
                          <span className="font-medium text-green-600">
                            -{recurrenceOptions.find((o) => o.id === bookingData.recurrence)?.discount}%
                          </span>
                        </div>
                      )}

                      {bookingData.recurrence !== "none" && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Subtotal por {bookingData.recurrenceCount}{" "}
                            {bookingData.recurrence === "weekly"
                              ? "semanas"
                              : bookingData.recurrence === "biweekly"
                                ? "quincenas"
                                : "meses"}
                          </span>
                          <span className="font-medium">
                            $
                            {(
                              field.price *
                              (1 -
                                (recurrenceOptions.find((o) => o.id === bookingData.recurrence)?.discount || 0) / 100) *
                              bookingData.recurrenceCount
                            ).toFixed(0)}
                          </span>
                        </div>
                      )}

                      {bookingData.additionalServices.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Servicios adicionales</span>
                          <span className="font-medium">
                            $
                            {bookingData.additionalServices.reduce((total, serviceId) => {
                              const service = additionalServices.find((s) => s.id === serviceId)
                              return total + (service ? service.price : 0)
                            }, 0)}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-2 mt-2"></div>
                    </div>

                    <div className="flex justify-between font-semibold text-lg mt-4">
                      <span>Total</span>
                      <span className="text-emerald-600">${calculateTotalPrice().toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={bookingData.termsAccepted}
                        onChange={handleInputChange}
                        className="h-4 w-4 mt-1 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Acepto los{" "}
                        <a href="#" className="text-emerald-600 hover:underline">
                          términos y condiciones
                        </a>{" "}
                        y la{" "}
                        <a href="#" className="text-emerald-600 hover:underline">
                          política de privacidad
                        </a>
                      </span>
                    </label>
                  </div>
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Se realizará un cargo del 10% del valor total a través de Mercado Pago o Transferencia Bancaria
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Confirmar Reserva
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
