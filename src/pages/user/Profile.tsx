import type React from "react"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Star, MessageCircle, Eye, Key } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("reservations")
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetPasswordData, setResetPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Mock data for reservations
  const mockReservations = [
    {
      id: "1",
      fieldName: "Cancha de Fútbol 5 - El Campito",
      date: new Date("2025-03-20T18:00:00"),
      duration: 60,
      price: 8000,
      status: "confirmed",
      details: {
        players: 10,
        services: ["Arbitro", "Pelotas"],
        paymentMethod: "MercadoPago",
        transactionId: "MP123456789"
      }
    },
    {
      id: "2",
      fieldName: "Cancha de Tenis - Club Victoria",
      date: new Date("2025-03-22T16:00:00"),
      duration: 90,
      price: 12000,
      status: "pending",
      details: {
        players: 2,
        services: ["Pelotas"],
        paymentMethod: "Pending",
        transactionId: null
      }
    },
  ]

  // Mock data for comments
  const mockComments = [
    {
      id: "1",
      fieldName: "Cancha de Fútbol 5 - El Campito",
      date: new Date(),
      rating: 4,
      text: "Excelente cancha, muy bien cuidada.",
    },
    {
      id: "2",
      fieldName: "Cancha de Tenis - Club Victoria",
      date: new Date(),
      rating: 5,
      text: "La mejor cancha de la ciudad!",
    },
  ]

  // Mock data for received comments (for field owners)
  const mockReceivedComments = [
    {
      id: "1",
      userName: "John Doe",
      rating: 4,
      date: new Date(),
      fieldName: "Cancha Central",
      text: "Excelente cancha, muy bien cuidada.",
    },
    {
      id: "2",
      userName: "Jane Smith",
      rating: 5,
      date: new Date(),
      fieldName: "Cancha Norte",
      text: "La mejor cancha de la ciudad!",
    },
  ]

  const [selectedReservation, setSelectedReservation] = useState<any>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    try {
      // Here you would make an API call to update the password
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast.success("Contraseña actualizada exitosamente")
      setShowResetPassword(false)
      setResetPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error) {
      toast.error("Error al actualizar la contraseña")
    }
  }

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResetPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-gray-600">Debes iniciar sesión para ver tu perfil.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi Perfil</h1>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 bg-emerald-600">
            <h2 className="text-xl font-semibold text-white">Información Personal</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Tipo de cuenta</p>
                <p className="font-medium">
                  {user.isAdmin ? "Super Administrador" : user.isOwner ? "Propietario de Canchas" : "Jugador"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button 
                onClick={() => setShowResetPassword(true)}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
              >
                <Key className="h-4 w-4 mr-1" />
                Cambiar contraseña
              </button>
            </div>

            {/* Reset Password Modal */}
            {showResetPassword && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Cambiar Contraseña</h3>
                  <form onSubmit={handleResetPassword}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña actual</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={resetPasswordData.currentPassword}
                          onChange={handlePasswordInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={resetPasswordData.newPassword}
                          onChange={handlePasswordInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={resetPasswordData.confirmPassword}
                          onChange={handlePasswordInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowResetPassword(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
                      >
                        Actualizar Contraseña
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {!user.isOwner && (
                <button
                  onClick={() => setActiveTab("reservations")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "reservations"
                      ? "border-b-2 border-emerald-500 text-emerald-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Mis Reservas
                </button>
              )}
              <button
                onClick={() => setActiveTab("comments")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "comments"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {user.isOwner ? "Comentarios Recibidos" : "Mis Comentarios"}
              </button>
              {user.isOwner && (
                <button
                  onClick={() => setActiveTab("fields")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "fields"
                      ? "border-b-2 border-emerald-500 text-emerald-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Mis Canchas
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Reservations Tab */}
          {activeTab === "reservations" && !user.isOwner && (
            <div>
              <div className="px-6 py-4 bg-emerald-600">
                <h2 className="text-xl font-semibold text-white">Mis Reservas</h2>
              </div>
              <div className="p-6">
                {mockReservations.length > 0 ? (
                  <div className="space-y-4">
                    {mockReservations.map((reservation) => (
                      <div key={reservation.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{reservation.fieldName}</h3>
                            <p className="text-sm text-gray-600">
                              {reservation.date.toLocaleDateString()} -{" "}
                              {reservation.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <p className="text-sm text-gray-600">Duración: {reservation.duration} minutos</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                reservation.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : reservation.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {reservation.status === "confirmed"
                                ? "Confirmada"
                                : reservation.status === "pending"
                                  ? "Pendiente"
                                  : "Cancelada"}
                            </span>
                            <p className="mt-1 font-semibold text-emerald-600">${reservation.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button 
                            onClick={() => setSelectedReservation(reservation)}
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver detalles
                          </button>
                          {reservation.status !== "cancelled" && (
                            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                              Cancelar
                            </button>
                          )}
                        </div>

                        {/* Reservation Details Modal */}
                        {selectedReservation?.id === reservation.id && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                              <h3 className="text-lg font-semibold mb-4">Detalles de la Reserva</h3>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-gray-700">Información General</h4>
                                  <div className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Cancha</p>
                                      <p className="font-medium">{reservation.fieldName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Fecha y Hora</p>
                                      <p className="font-medium">
                                        {reservation.date.toLocaleDateString()} -{" "}
                                        {reservation.date.toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Duración</p>
                                      <p className="font-medium">{reservation.duration} minutos</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Jugadores</p>
                                      <p className="font-medium">{reservation.details.players}</p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-gray-700">Servicios Adicionales</h4>
                                  <div className="mt-2">
                                    {reservation.details.services.length > 0 ? (
                                      <ul className="list-disc list-inside">
                                        {reservation.details.services.map((service: string, index: number) => (
                                          <li key={index} className="text-gray-600">{service}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-gray-500">Sin servicios adicionales</p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-gray-700">Información de Pago</h4>
                                  <div className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Método de Pago</p>
                                      <p className="font-medium">{reservation.details.paymentMethod}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Total</p>
                                      <p className="font-medium text-emerald-600">
                                        ${reservation.price.toLocaleString()}
                                      </p>
                                    </div>
                                    {reservation.details.transactionId && (
                                      <div className="col-span-2">
                                        <p className="text-sm text-gray-500">ID de Transacción</p>
                                        <p className="font-medium">{reservation.details.transactionId}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-6 flex justify-end">
                                <button
                                  onClick={() => setSelectedReservation(null)}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                  Cerrar
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No tienes reservas activas.</p>
                    <Link
                      to="/football/fields"
                      className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium inline-block"
                    >
                      Explorar canchas disponibles
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div>
              <div className="px-6 py-4 bg-emerald-600">
                <h2 className="text-xl font-semibold text-white">
                  {user.isOwner ? "Comentarios Recibidos" : "Mis Comentarios"}
                </h2>
              </div>
              <div className="p-6">
                {user.isOwner ? (
                  // Mostrar comentarios recibidos para usuarios con campos
                  <div>
                    {mockReceivedComments.length > 0 ? (
                      <div className="space-y-6">
                        {mockReceivedComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold mr-3">
                                  {comment.userName.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{comment.userName}</h4>
                                  <div className="flex items-center">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {new Date(comment.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{comment.fieldName}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{comment.text}</p>

                            {/* Opción para responder */}
                            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Responder
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No has recibido comentarios todavía.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Mostrar comentarios hechos por usuarios normales
                  <div>
                    {mockComments.length > 0 ? (
                      <div className="space-y-6">
                        {mockComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{comment.fieldName}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No has realizado comentarios todavía.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fields Tab (for field owners) */}
          {activeTab === "fields" && user.isOwner && (
            <div>
              <div className="px-6 py-4 bg-emerald-600">
                <h2 className="text-xl font-semibold text-white">Mis Canchas</h2>
              </div>
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <Link
                    to="/manage-fields"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    Administrar Canchas
                  </Link>
                </div>
                <p className="text-gray-600">Aquí podrás ver y gestionar tus canchas.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile