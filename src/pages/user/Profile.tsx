import type React from "react"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Star, MessageCircle } from "lucide-react"

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("reservations")

  // Mock data for reservations
  const mockReservations = [
    {
      id: "1",
      fieldName: "Cancha de Fútbol 5 - El Campito",
      date: new Date("2025-03-20T18:00:00"),
      duration: 60,
      price: 8000,
      status: "confirmed",
    },
    {
      id: "2",
      fieldName: "Cancha de Tenis - Club Victoria",
      date: new Date("2025-03-22T16:00:00"),
      duration: 90,
      price: 12000,
      status: "pending",
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
              <div>
                <p className="text-sm text-gray-500">Tipo de cuenta</p>
                <p className="font-medium">
                  {user.isAdmin ? "Administrador" : user.hasFields ? "Propietario de Canchas" : "Usuario"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Editar información
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {!user.hasFields && (
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
                {user.hasFields ? "Comentarios Recibidos" : "Mis Comentarios"}
              </button>
              {user.hasFields && (
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
          {activeTab === "reservations" && !user.hasFields && (
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
                          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                            Ver detalles
                          </button>
                          {reservation.status !== "cancelled" && (
                            <button className="text-sm text-red-600 hover:text-red-700 font-medium">Cancelar</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No tienes reservas activas.</p>
                    <button className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium">
                      Explorar canchas disponibles
                    </button>
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
                  {user.hasFields ? "Comentarios Recibidos" : "Mis Comentarios"}
                </h2>
              </div>
              <div className="p-6">
                {user.hasFields ? (
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
          {activeTab === "fields" && user.hasFields && (
            <div>
              <div className="px-6 py-4 bg-emerald-600">
                <h2 className="text-xl font-semibold text-white">Mis Canchas</h2>
              </div>
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
                    Administrar Canchas
                  </button>
                </div>
                <p className="text-gray-600">Aquí podrás ver y gestionar tus canchas.</p>
                {/* Aquí iría el listado de canchas del propietario */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
