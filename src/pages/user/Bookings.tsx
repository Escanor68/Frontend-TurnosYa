"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Plus,
  ClipboardList,
} from "lucide-react"
import { mockBookings, mockSportFields } from "../../services/mockData"
import { LoadingSpinner } from "../../components/common/LoadingSpinner"
import type { Booking } from "../../types"

// Componente para la página de reservas del usuario
const BookingsPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth()

  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)

  // Cargar reservas del usuario
  const userBookings = mockBookings.filter((booking) => booking.userId === user?.id)

  // Manejar cancelación de reserva
  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta reserva?")) return

    try {
      setLoading(true)

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Reserva cancelada correctamente")
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast.error("Error al cancelar la reserva")
    } finally {
      setLoading(false)
    }
  }

  // Formatear fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
  }

  // Obtener nombre del campo por ID
  const getFieldName = (fieldId: string): string => {
    const field = mockSportFields.find((f) => f.id === fieldId)
    return field ? field.name : "Campo desconocido"
  }

  // Obtener color según estado de reserva
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Obtener texto según estado de reserva
  const getStatusText = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelada"
      case "completed":
        return "Completada"
      default:
        return "Desconocido"
    }
  }

  // Filtrar y ordenar reservas
  const filteredAndSortedBookings = userBookings
    .filter((booking) => {
      // Filtrar por término de búsqueda
      const fieldName = getFieldName(booking.fieldId).toLowerCase()
      const searchMatch = fieldName.includes(searchTerm.toLowerCase())

      // Filtrar por estado
      const statusMatch = statusFilter === "all" || booking.status === statusFilter

      return searchMatch && statusMatch
    })
    .sort((a, b) => {
      let comparison = 0

      if (sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "field") {
        comparison = getFieldName(a.fieldId).localeCompare(getFieldName(b.fieldId))
      } else if (sortBy === "price") {
        comparison = a.totalPrice - b.totalPrice
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  // Mostrar spinner mientras se carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Verificar si el usuario está autenticado
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Debes iniciar sesión para ver tus reservas</h2>
          <Link to="/login" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Mis Reservas</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre de cancha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                Filtros
                {showFilters ? (
                  <ChevronUp className="h-4 w-4 ml-2 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                )}
              </button>
              <Link
                to="/football/fields"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nueva Reserva
              </Link>
            </div>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Todos</option>
                    <option value="pending">Pendientes</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="completed">Completadas</option>
                    <option value="cancelled">Canceladas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setSortDirection("asc")
                    }}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="date">Fecha</option>
                    <option value="field">Nombre de cancha</option>
                    <option value="price">Precio</option>
                    <option value="status">Estado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <div className="flex">
                    <button
                      onClick={() => setSortDirection("asc")}
                      className={`flex-1 py-2 px-3 border ${
                        sortDirection === "asc"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-gray-700 border-gray-300"
                      } rounded-l-lg`}
                    >
                      Ascendente
                    </button>
                    <button
                      onClick={() => setSortDirection("desc")}
                      className={`flex-1 py-2 px-3 border ${
                        sortDirection === "desc"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-gray-700 border-gray-300"
                      } rounded-r-lg`}
                    >
                      Descendente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lista de reservas */}
          {userBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredAndSortedBookings.length > 0 ? (
                filteredAndSortedBookings.map((booking) => {
                  // Asegurar que booking.status es uno de los valores permitidos
                  const typedBooking: Booking = {
                    ...booking,
                    status: booking.status as "pending" | "confirmed" | "cancelled" | "completed",
                  }

                  return (
                    <div key={typedBooking.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{getFieldName(typedBooking.fieldId)}</h3>
                            <span
                              className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                typedBooking.status,
                              )}`}
                            >
                              {getStatusText(typedBooking.status)}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              <span>
                                {formatDate(typedBooking.date)} - {typedBooking.time}hs
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>
                                Duración: {mockSportFields.find((f) => f.id === typedBooking.fieldId)?.duration || 60}{" "}
                                minutos
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              <span>
                                {mockSportFields.find((f) => f.id === typedBooking.fieldId)?.location.address},{" "}
                                {mockSportFields.find((f) => f.id === typedBooking.fieldId)?.location.city}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              <span>Jugadores: {typedBooking.players}</span>
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                              <span>
                                Método de pago:{" "}
                                {typedBooking.paymentMethod === "mercadopago"
                                  ? "Mercado Pago"
                                  : "Transferencia Bancaria"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-lg font-semibold text-emerald-600">${typedBooking.totalPrice}</div>
                          <div className="mt-4 flex space-x-2">
                            {typedBooking.status === "pending" && (
                              <button
                                onClick={() => handleCancelBooking(typedBooking.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                disabled={loading}
                              >
                                {loading ? "Cancelando..." : "Cancelar"}
                              </button>
                            )}
                            <Link
                              to={`/football/fields/${typedBooking.fieldId}`}
                              className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm"
                            >
                              Ver Cancha
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600">No se encontraron reservas con los filtros seleccionados.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <ClipboardList className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No tienes reservas</h3>
              <p className="text-gray-600 mb-6">Aún no has realizado ninguna reserva de cancha.</p>
              <Link
                to="/football/fields"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors inline-block"
              >
                Explorar Canchas Disponibles
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingsPage
