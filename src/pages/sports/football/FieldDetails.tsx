"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { mockSportFields } from "../../../services/mockData"
import type { SportField, Review } from "../../../types"
import { LoadingSpinner } from "../../../components/common/LoadingSpinner"

// Componente para mostrar un mapa (simulado)
interface MapViewProps {
  location: {
    lat: number
    lng: number
  }
  name: string
}

const MapView: React.FC<MapViewProps> = ({ location, name }) => {
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden h-64 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">
            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Mapa simulado - Integración real pendiente</p>
        </div>
      </div>
    </div>
  )
}

// Componente para mostrar los detalles de un campo deportivo
const FieldDetailPage: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>()
  const navigate = useNavigate()

  const [field, setField] = useState<SportField | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    comment: "",
  })

  // Fechas disponibles (próximos 14 días)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split("T")[0]
  })

  // Cargar datos del campo
  useEffect(() => {
    const loadFieldData = async () => {
      try {
        setLoading(true)
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (fieldId) {
          const fieldData = mockSportFields.find((f) => f.id === fieldId)
          if (fieldData) {
            setField(fieldData)
            // Seleccionar la primera fecha disponible por defecto
            if (availableDates.length > 0) {
              handleDateSelect(availableDates[0])
            }
          } else {
            // Campo no encontrado
            navigate("/football/fields")
          }
        }
      } catch (error) {
        console.error("Error loading field data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFieldData()
  }, [fieldId, navigate])

  // Generar franjas horarias disponibles para la fecha seleccionada
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTimeSlot("")

    // Simular disponibilidad de horarios
    // En una app real, esto vendría de una API basada en la fecha seleccionada
    const today = new Date().toISOString().split("T")[0]
    const isToday = date === today

    // Horarios base
    let slots = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ]

    // Si es hoy, filtrar horarios pasados
    if (isToday) {
      const currentHour = new Date().getHours()
      slots = slots.filter((slot) => Number.parseInt(slot.split(":")[0], 10) > currentHour)
    }

    // Simular algunos horarios ya reservados
    const reservedSlots: string[] = []
    if (date.endsWith("5") || date.endsWith("0")) {
      reservedSlots.push("18:00", "19:00")
    }
    if (date.endsWith("2") || date.endsWith("7")) {
      reservedSlots.push("12:00", "20:00")
    }

    const availableSlots = slots.filter((slot) => !reservedSlots.includes(slot))
    setAvailableTimeSlots(availableSlots)
  }

  // Manejar selección de horario
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
  }

  // Manejar clic en botón de reserva
  const handleBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      navigate(`/football/booking/${fieldId}?date=${selectedDate}&time=${selectedTimeSlot}&directPayment=true`)
    }
  }

  // Manejar navegación de imágenes
  const handlePrevImage = () => {
    if (!field) return
    setCurrentImageIndex((prev) => (prev === 0 ? 0 : prev - 1))
  }

  const handleNextImage = () => {
    if (!field) return
    // Aquí asumo que hay más imágenes, en una app real tendrías un array de imágenes
    setCurrentImageIndex((prev) => (prev === 2 ? 2 : prev + 1))
  }

  // Manejar cambios en el formulario de reseñas
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReviewFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value, 10) : value,
    }))
  }

  // Enviar reseña
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí irían las llamadas a la API para guardar la reseña
    console.log("Review submitted:", reviewFormData)
    setShowReviewForm(false)
    // Simular actualización de reseñas
    if (field && field.reviews) {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        userId: "current-user",
        userName: "Usuario Actual",
        rating: reviewFormData.rating,
        comment: reviewFormData.comment,
        date: new Date().toISOString(),
      }
      setField({
        ...field,
        reviews: [...field.reviews, newReview],
        rating: calculateAverageRating([...field.reviews, newReview]),
      })
    }
    // Resetear formulario
    setReviewFormData({ rating: 5, comment: "" })
  }

  // Calcular rating promedio
  const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0
    const sum = reviews.reduce((total, review) => total + review.rating, 0)
    return Number.parseFloat((sum / reviews.length).toFixed(1))
  }

  // Formatear fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })
  }

  // Mostrar spinner mientras se carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Si no se encuentra el campo
  if (!field) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Campo no encontrado</h2>
          <Link to="/football/fields" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Ver todos los campos
          </Link>
        </div>
      </div>
    )
  }

  // Imágenes del campo (en una app real, esto vendría del backend)
  const fieldImages = [
    field.image,
    "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
    "https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate("/football/fields")}
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Volver a la lista de canchas
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Detalles del campo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Galería de imágenes */}
              <div className="relative h-80">
                <img
                  src={fieldImages[currentImageIndex] || "/placeholder.svg"}
                  alt={field.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-bold text-white mb-1">{field.name}</h1>
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {field.location.address}, {field.location.city}
                    </span>
                  </div>
                </div>
                {/* Controles de navegación de imágenes */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                  disabled={currentImageIndex === fieldImages.length - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Indicador de imágenes */}
                <div className="absolute bottom-4 right-4 flex space-x-1">
                  {fieldImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Información del campo */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-gray-600 mr-1" />
                    <span className="text-sm font-medium">{field.type}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 text-gray-600 mr-1" />
                    <span className="text-sm font-medium">{field.duration} minutos</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{field.rating || "Sin calificaciones"}</span>
                  </div>
                  <div className="flex items-center bg-emerald-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-emerald-700">${field.price}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-600 mb-6">
                  {field.description ||
                    `Cancha de ${field.type} en excelente estado. Cuenta con césped sintético de alta calidad, iluminación LED y vestuarios equipados. Ideal para partidos amistosos o torneos.`}
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {field.amenities && field.amenities.length > 0 ? (
                    field.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Check className="h-5 w-5 text-emerald-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-3">No se especificaron comodidades</p>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ubicación</h2>
                <MapView
                  location={field.location.coordinates || { lat: -34.603722, lng: -58.381592 }}
                  name={field.name}
                />
              </div>
            </div>

            {/* Reseñas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Reseñas</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Escribir reseña
                </button>
              </div>

              {/* Formulario de reseña */}
              {showReviewForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tu opinión</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calificación</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewFormData((prev) => ({ ...prev, rating: star }))}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= reviewFormData.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{reviewFormData.rating} de 5</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Comentario
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        value={reviewFormData.comment}
                        onChange={handleReviewChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Comparte tu experiencia en esta cancha..."
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Publicar reseña
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Lista de reseñas */}
              {field.reviews && field.reviews.length > 0 ? (
                <div className="space-y-6">
                  {field.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900">{review.userName}</h3>
                            <div className="flex ml-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{formatDate(review.date)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Sin reseñas aún</h3>
                  <p className="text-gray-500">Sé el primero en dejar una reseña para esta cancha.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: Reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Reservar Cancha</h2>

                {/* Selección de fecha */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {availableDates.slice(0, 8).map((date) => (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`py-2 px-1 rounded-lg text-center transition-colors ${
                          selectedDate === date
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        <div className="text-xs">{formatDate(date).split(" ")[0]}</div>
                        <div className="font-medium">{formatDate(date).split(" ")[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selección de horario */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horario</label>
                  {selectedDate ? (
                    availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimeSlots.map((timeSlot) => (
                          <button
                            key={timeSlot}
                            onClick={() => handleTimeSlotSelect(timeSlot)}
                            className={`py-2 px-3 rounded-lg text-center transition-colors ${
                              selectedTimeSlot === timeSlot
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-yellow-700">
                            No hay horarios disponibles para esta fecha. Por favor selecciona otra fecha.
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <p className="text-sm text-gray-500">Selecciona una fecha para ver los horarios disponibles</p>
                  )}
                </div>

                {/* Resumen de reserva */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Resumen</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cancha:</span>
                      <span className="font-medium">{field.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">{selectedDate ? formatDate(selectedDate) : "No seleccionada"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-medium">{selectedTimeSlot || "No seleccionada"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium">{field.duration} minutos</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span className="font-semibold text-emerald-600">${field.price}</span>
                    </div>
                  </div>
                </div>

                {/* Botón de reserva */}
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className={`w-full py-3 rounded-lg flex items-center justify-center ${
                    selectedDate && selectedTimeSlot
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Reservar Ahora
                </button>

                {/* Información adicional */}
                <div className="mt-6">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Al reservar, se te solicitará un pago del 10% para confirmar tu turno. El resto se abona en el
                      lugar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FieldDetailPage
