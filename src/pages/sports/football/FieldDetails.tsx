"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MapPin, Star, Clock, Users, DollarSign, Calendar, ChevronLeft } from "lucide-react"

// Mock data for fields
const mockFields = {
  "1": {
    id: 1,
    name: "Cancha de Fútbol 5 - El Campito",
    location: {
      address: "Av. Siempreviva 742",
      city: "Buenos Aires",
      province: "CABA",
    },
    type: "Fútbol 5",
    rating: 4.5,
    description:
      "Cancha de fútbol 5 con césped sintético de última generación. Cuenta con iluminación LED, vestuarios completos y estacionamiento gratuito. Ideal para partidos entre amigos o torneos.",
    images: [
      "https://images.unsplash.com/photo-1508035353492-2a2a97a04a31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    ],
    amenities: ["Vestuarios", "Iluminación", "Estacionamiento", "Duchas", "Kiosco", "Wifi"],
    duration: 60,
    players: "5 vs 5",
    price: 8000,
    reviews: [
      {
        id: 1,
        user: "Juan Pérez",
        rating: 5,
        date: "2025-02-15",
        comment: "Excelente cancha, muy bien mantenida y el personal muy amable.",
      },
      {
        id: 2,
        user: "María García",
        rating: 4,
        date: "2025-02-10",
        comment: "Buena cancha, pero los vestuarios podrían estar más limpios.",
      },
      {
        id: 3,
        user: "Carlos López",
        rating: 5,
        date: "2025-01-28",
        comment: "La mejor cancha de la zona, volveremos pronto!",
      },
    ],
  },
  "2": {
    id: 2,
    name: "Cancha de Fútbol 7 - Club Victoria",
    location: {
      address: "Calle Falsa 123",
      city: "Buenos Aires",
      province: "CABA",
    },
    type: "Fútbol 7",
    rating: 4.2,
    description:
      "Cancha de fútbol 7 con césped natural. Cuenta con iluminación, vestuarios y estacionamiento. Ideal para partidos entre amigos o torneos.",
    images: [
      "https://images.unsplash.com/photo-1560275774-c945485b9336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    amenities: ["Vestuarios", "Iluminación", "Estacionamiento", "Duchas"],
    duration: 90,
    players: "7 vs 7",
    price: 12000,
    reviews: [
      {
        id: 1,
        user: "Pedro Gómez",
        rating: 4,
        date: "2025-02-20",
        comment: "Buena cancha, bien mantenida.",
      },
    ],
  },
  "3": {
    id: 3,
    name: "Cancha de Fútbol 11 - Estadio Municipal",
    location: {
      address: "Avenida Siempre Viva 742",
      city: "Buenos Aires",
      province: "CABA",
    },
    type: "Fútbol 11",
    rating: 4.8,
    description:
      "Cancha de fútbol 11 profesional con césped natural. Cuenta con iluminación, vestuarios, estacionamiento y tribunas.",
    images: [
      "https://images.unsplash.com/photo-1662299397095-c2b1549509a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    amenities: ["Vestuarios", "Iluminación", "Estacionamiento", "Duchas", "Tribunas"],
    duration: 60,
    players: "11 vs 11",
    price: 10000,
    reviews: [
      {
        id: 1,
        user: "Ana Martínez",
        rating: 5,
        date: "2025-02-18",
        comment: "Excelente cancha, muy profesional.",
      },
    ],
  },
}

// Mock data for available time slots
const mockTimeSlots = [
  { id: "1", date: "2025-03-20", time: "18:00", available: true },
  { id: "2", date: "2025-03-20", time: "19:00", available: true },
  { id: "3", date: "2025-03-20", time: "20:00", available: false },
  { id: "4", date: "2025-03-20", time: "21:00", available: true },
  { id: "5", date: "2025-03-20", time: "22:00", available: true },
  { id: "6", date: "2025-03-21", time: "18:00", available: true },
  { id: "7", date: "2025-03-21", time: "19:00", available: false },
  { id: "8", date: "2025-03-21", time: "20:00", available: false },
  { id: "9", date: "2025-03-21", time: "21:00", available: true },
  { id: "10", date: "2025-03-21", time: "22:00", available: true },
  { id: "11", date: "2025-03-22", time: "18:00", available: true },
  { id: "12", date: "2025-03-22", time: "19:00", available: true },
  { id: "13", date: "2025-03-22", time: "20:00", available: true },
  { id: "14", date: "2025-03-22", time: "21:00", available: true },
  { id: "15", date: "2025-03-22", time: "22:00", available: false },
]

const FieldDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [field, setField] = useState<any>(null)

  // Cargar datos del campo
  useEffect(() => {
    if (id) {
      // Intentar obtener el campo por ID
      const fieldData = mockFields[id as keyof typeof mockFields]
      if (fieldData) {
        setField(fieldData)
      } else {
        // Si no se encuentra, usar el primer campo como fallback
        setField(mockFields["1"])
      }
    }
  }, [id])

  // Si el campo aún no se ha cargado, mostrar un indicador de carga
  if (!field) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  // Filtrar slots de tiempo por fecha seleccionada
  const filteredTimeSlots = mockTimeSlots.filter((slot) => slot.date === selectedDate)

  // Obtener fechas únicas para el selector
  const uniqueDates = Array.from(new Set(mockTimeSlots.map((slot) => slot.date)))

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  }

  // Manejar la reserva
  const handleBooking = (timeSlotId: string) => {
    navigate(`/football/booking/${id}?date=${selectedDate}&time=${timeSlotId}`)
  }

  // Cambiar imagen
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === field.images.length - 1 ? 0 : prev + 1))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? field.images.length - 1 : prev - 1))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/football/fields")}
          className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Volver a canchas
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96">
          <img
            src={field.images[currentImageIndex] || "/placeholder.svg"}
            alt={field.name}
            className="w-full h-full object-cover"
          />
          {field.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6 transform rotate-180" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {field.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Field Info */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{field.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 text-gray-700">{field.rating}</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{field.reviews.length} reseñas</span>
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>
                  {field.location.address}, {field.location.city}, {field.location.province}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center text-emerald-600 font-bold text-xl mb-2">
                <DollarSign className="h-6 w-6 mr-1" />
                <span>${field.price.toLocaleString()}</span>
              </div>
              <div className="flex flex-col text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Duración: {field.duration} minutos</span>
                </div>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Jugadores: {field.players}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("info")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "info"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Información
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reseñas ({field.reviews.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "info" ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-600 mb-6">{field.description}</p>

              <h2 className="text-lg font-semibold text-gray-900 mb-3">Comodidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {field.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <span className="text-emerald-600">✓</span>
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-6">
                {field.reviews.map((review: any) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.user}</h3>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Availability Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-emerald-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Disponibilidad</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona una fecha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="date-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Selecciona una fecha</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedDate ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Horarios disponibles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {filteredTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && handleBooking(slot.id)}
                    disabled={!slot.available}
                    className={`py-3 px-4 rounded-lg text-center ${
                      slot.available
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {slot.time}
                    {!slot.available && <div className="text-xs mt-1">(Ocupado)</div>}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Selecciona una fecha para ver los horarios disponibles</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FieldDetails
