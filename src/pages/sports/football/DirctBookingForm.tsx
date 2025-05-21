"use client"

import type React from "react"
import { CheckCircle, AlertCircle, ChevronLeft, Repeat, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../../../context/AuthContext"
import type { BookingFormData, SportField } from "../../../types"
import { getFieldById, additionalServices, recurrenceOptions, paymentMethods } from "../../../services/mockData"
import { LoadingSpinner } from "../../../components/common/LoadingSpinner"
import { useFormValidation, bookingValidationSchema } from "../../../hooks/useFormValidation"

// Componente para el formulario de reserva directa (optimizado)
const DirectBookingForm: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  const [field, setField] = useState<SportField | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRecurrenceOptions, setShowRecurrenceOptions] = useState(false)
  const [showAdditionalServices, setShowAdditionalServices] = useState(true) // Mostrar por defecto
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Obtener parámetros de la URL
  const searchParams = new URLSearchParams(location.search)
  const dateParam = searchParams.get("date") || ""
  const timeParam = searchParams.get("time") || ""

  // Estado para el formulario de reserva
  const [bookingData, setBookingData] = useState<BookingFormData>({
    date: dateParam,
    time: timeParam,
    players: 10,
    contactName: user?.name || "",
    contactPhone: user?.phone || "",
    contactEmail: user?.email || "",
    paymentMethod: "mercadopago",
    termsAccepted: false,
    recurrence: "none",
    recurrenceCount: 4,
    additionalServices: [],
    additionalServicesNotes: "",
    recurrenceExceptions: [],
  })

  const { validateForm, getFieldError, hasError } = useFormValidation(bookingValidationSchema)

  // Obtener datos del campo
  useEffect(() => {
    if (fieldId) {
      // Simular llamada a API
      setTimeout(() => {
        const fieldData = getFieldById(fieldId)
        setField(fieldData || null)
        setLoading(false)
      }, 500)
    }
  }, [fieldId])

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

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.info("Debes iniciar sesión para realizar una reserva")
      navigate(`/login?redirect=/football/booking/${fieldId}${location.search}`)
    }
  }, [loading, isAuthenticated, navigate, fieldId, location.search])

  // Manejadores de eventos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
  const calculateTotalPrice = (): number => {
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

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulario
    const validationResult = validateForm({
      termsAccepted: bookingData.termsAccepted,
    })

    if (!validationResult.isValid) {
      return
    }

    if (!bookingData.termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones")
      return
    }

    // Simular envío de reserva
    setIsSubmitting(true)
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("¡Reserva realizada con éxito!")
      navigate("/profile")
    } catch (error) {
      console.error("Error submitting booking:", error)
      toast.error("Error al procesar la reserva. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString: string): string => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  }

  // Obtener fechas recurrentes basadas en la configuración
  const getRecurrenceDates = (): string[] => {
    if (bookingData.recurrence === "none" || !bookingData.date) return []

    const dates: string[] = []
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!field) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Campo no encontrado</h2>
          <button
            onClick={() => navigate("/football/fields")}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Ver todos los campos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/football/fields/${field.id}`)}
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
              <h1 className="text-xl font-bold text-white">Finalizar Reserva</h1>
              <div className="text-white font-semibold">{field.name}</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6">
              <div className="space-y-6">
                {/* Resumen de la Reserva */}
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
                            {bookingData.recurrenceCount}{" "}
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
                      <div className="mt-2">
                        <label className="text-gray-600 text-xs">Modificar cantidad:</label>
                        <input
                          type="number"
                          name="players"
                          min="1"
                          max="22"
                          value={bookingData.players}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Datos de contacto */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Datos de Contacto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Nombre:</p>
                      <p className="font-medium">{bookingData.contactName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Teléfono:</p>
                      <p className="font-medium">{bookingData.contactPhone || "No especificado"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-600 text-sm">Email:</p>
                      <p className="font-medium">{bookingData.contactEmail}</p>
                    </div>
                  </div>
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
                          name="recurrence"
                          value={bookingData.recurrence}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {recurrenceOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name} {option.discount > 0 && `(${option.discount}% descuento)`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {bookingData.recurrence && bookingData.recurrence !== "none" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Número de repeticiones</label>
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
                            <span className="ml-3 text-sm text-gray-600">
                              {bookingData.recurrence === "weekly" && "semanas"}
                              {bookingData.recurrence === "biweekly" && "quincenas"}
                              {bookingData.recurrence === "monthly" && "meses"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                        <div className="space-y-3">
                          {additionalServices.map((service) => (
                            <div
                              key={service.id}
                              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                bookingData.additionalServices.includes(service.id)
                                  ? "border-emerald-500 bg-emerald-50"
                                  : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                              }`}
                              onClick={() => handleServiceToggle(service.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div
                                    className={`p-2 rounded-full mr-3 ${
                                      bookingData.additionalServices.includes(service.id)
                                        ? "bg-emerald-100 text-emerald-600"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {service.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{service.name}</h4>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="font-semibold text-emerald-600">${service.price}</span>
                                  <div className="mt-1">
                                    <input
                                      type="checkbox"
                                      checked={bookingData.additionalServices.includes(service.id)}
                                      onChange={() => {}} // Controlado por el onClick del div padre
                                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notas adicionales sobre servicios
                        </label>
                        <textarea
                          name="additionalServicesNotes"
                          value={bookingData.additionalServicesNotes || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={3}
                          placeholder="Describe cualquier detalle adicional sobre los servicios seleccionados"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Método de Pago */}
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

                {/* Desglose de precios */}
                <div className="border-t border-gray-200 pt-4">
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

                {/* Información importante */}
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

                {/* Términos y condiciones */}
                <div className="mt-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={bookingData.termsAccepted}
                      onChange={handleInputChange}
                      className={`h-4 w-4 mt-1 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded ${
                        hasError("termsAccepted") ? "border-red-500" : ""
                      }`}
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
                  {hasError("termsAccepted") && (
                    <p className="mt-1 text-sm text-red-500">{getFieldError("termsAccepted")}</p>
                  )}
                </div>
                <p className="text-center text-sm text-gray-600 mb-4">
                  Se realizará un cargo del 10% del valor total a través de Mercado Pago o Transferencia Bancaria
                </p>

                {/* Botón de confirmación */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" color="white" className="mr-2" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Confirmar Reserva
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectBookingForm
