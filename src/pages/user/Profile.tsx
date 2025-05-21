"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import {
  UserIcon,
  Mail,
  Phone,
  Camera,
  Edit,
  Save,
  X,
  Calendar,
  MapPin,
  ClipboardList,
  Settings,
  Shield,
  LogOut,
  Plus,
  Users,
} from "lucide-react"
import { mockBookings, mockSportFields } from "../../services/mockData"
import { LoadingSpinner } from "../../components/common/LoadingSpinner"
import type { Booking } from "../../types"

// Componente para la página de perfil del usuario
const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading, updateProfile, logout } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"profile" | "bookings" | "settings">("profile")

  // Cargar reservas del usuario
  const userBookings = mockBookings.filter((booking) => booking.userId === user?.id)

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Error al actualizar el perfil")
    } finally {
      setLoading(false)
    }
  }

  // Cancelar edición
  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
    setIsEditing(false)
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Debes iniciar sesión para ver tu perfil</h2>
          <Link to="/login" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  // Verificar si el usuario es administrador o propietario
  const isAdmin = user.role === "admin"
  const isOwner = user.role === "owner"

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Encabezado del perfil */}
            <div className="bg-emerald-600 px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserIcon className="h-8 w-8 text-emerald-600" />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                      <Camera className="h-4 w-4 text-emerald-600" />
                    </button>
                  </div>
                  <div className="ml-4">
                    <h1 className="text-xl font-bold text-white">{user.name}</h1>
                    <p className="text-emerald-100">
                      {isAdmin ? "Administrador" : isOwner ? "Propietario de Canchas" : "Usuario"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {(isAdmin || isOwner) && (
                    <Link
                      to={isAdmin ? "/admin/dashboard" : "/field-owner/dashboard"}
                      className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Pestañas */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <UserIcon className="h-5 w-5 mb-1 mx-auto" />
                  <span>Perfil</span>
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "bookings"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Calendar className="h-5 w-5 mb-1 mx-auto" />
                  <span>Mis Reservas</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "settings"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Settings className="h-5 w-5 mb-1 mx-auto" />
                  <span>Configuración</span>
                </button>
              </nav>
            </div>

            {/* Contenido de las pestañas */}
            <div className="p-6">
              {/* Pestaña de Perfil */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-emerald-600 hover:text-emerald-700 flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button onClick={handleCancel} className="text-gray-600 hover:text-gray-700 flex items-center">
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="text-emerald-600 hover:text-emerald-700 flex items-center"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Guardar
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre completo
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Correo electrónico
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="11-1234-5678"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <LoadingSpinner size="sm" color="white" className="mr-2" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="h-5 w-5 mr-2" />
                              Guardar Cambios
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-1">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-700">Nombre</h3>
                          </div>
                          <p className="text-gray-900 ml-7">{user.name}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-1">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-700">Email</h3>
                          </div>
                          <p className="text-gray-900 ml-7">{user.email}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-1">
                            <Phone className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-700">Teléfono</h3>
                          </div>
                          <p className="text-gray-900 ml-7">{user.phone || "No especificado"}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-1">
                            <Shield className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-700">Rol</h3>
                          </div>
                          <p className="text-gray-900 ml-7">
                            {user.role === "admin"
                              ? "Administrador"
                              : user.role === "owner"
                                ? "Propietario de Canchas"
                                : "Usuario"}
                          </p>
                        </div>
                      </div>

                      {isOwner && (
                        <div className="mt-8">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Mis Canchas</h3>
                            <Link
                              to="/field-owner/dashboard"
                              className="text-emerald-600 hover:text-emerald-700 text-sm"
                            >
                              Ver todas
                            </Link>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-center py-6">
                              <Link
                                to="/field-owner/dashboard"
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                              >
                                <MapPin className="h-5 w-5 mr-2" />
                                Administrar Mis Canchas
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Reservas Recientes</h3>
                          <Link to="/profile/bookings" className="text-emerald-600 hover:text-emerald-700 text-sm">
                            Ver todas
                          </Link>
                        </div>

                        {userBookings.length > 0 ? (
                          <div className="space-y-4">
                            {userBookings.slice(0, 2).map((booking: Booking) => (
                              <div key={booking.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-gray-900">{getFieldName(booking.fieldId)}</h4>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      {formatDate(booking.date)} - {booking.time}hs
                                    </div>
                                  </div>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                      booking.status,
                                    )}`}
                                  >
                                    {getStatusText(booking.status)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <h4 className="text-gray-900 font-medium mb-1">No tienes reservas</h4>
                            <p className="text-gray-600 text-sm mb-4">
                              Aún no has realizado ninguna reserva de cancha.
                            </p>
                            <Link
                              to="/football/fields"
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors inline-block"
                            >
                              Explorar Canchas
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pestaña de Reservas */}
              {activeTab === "bookings" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Mis Reservas</h2>
                    <Link
                      to="/football/fields"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Nueva Reserva
                    </Link>
                  </div>

                  {userBookings.length > 0 ? (
                    <div className="space-y-6">
                      {userBookings.map((booking: Booking) => (
                        <div key={booking.id} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{getFieldName(booking.fieldId)}</h3>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>
                                    {formatDate(booking.date)} - {booking.time}hs
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>
                                    {mockSportFields.find((f) => f.id === booking.fieldId)?.location.address},{" "}
                                    {mockSportFields.find((f) => f.id === booking.fieldId)?.location.city}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-4 w-4 mr-2" />
                                  <span>Jugadores: {booking.players}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  booking.status,
                                )}`}
                              >
                                {getStatusText(booking.status)}
                              </span>
                              <div className="mt-2 text-lg font-semibold text-emerald-600">${booking.totalPrice}</div>
                              <div className="mt-4 flex space-x-2">
                                {booking.status === "pending" && (
                                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                                    Cancelar
                                  </button>
                                )}
                                <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                                  Ver Detalles
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
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
              )}

              {/* Pestaña de Configuración */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Configuración de la Cuenta</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Preferencias de Notificaciones</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <span className="ml-2 text-gray-700">Notificaciones por email</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <span className="ml-2 text-gray-700">Recordatorios de reservas</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">Ofertas y promociones</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña actual
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Nueva contraseña
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar nueva contraseña
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Cambiar Contraseña
                        </button>
                      </form>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Eliminar Cuenta</h3>
                      <p className="text-gray-600 mb-4">
                        Al eliminar tu cuenta, se borrarán todos tus datos y no podrás recuperarlos.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Eliminar mi cuenta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
