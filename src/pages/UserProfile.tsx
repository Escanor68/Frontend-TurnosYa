import type React from "react"
import type { User } from "firebase/auth"
import { Star, MessageCircle } from "react-feather"

interface UserProfileProps {
  user: User | null | undefined
}

interface Comment {
  id: string
  userName: string
  rating: number
  date: Date
  fieldName: string
  text: string
}

const mockComments: Comment[] = [
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

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Perfil de Usuario</h1>

      {/* Sección de Información del Usuario */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 bg-emerald-600">
          <h2 className="text-xl font-semibold text-white">Información Personal</h2>
        </div>
        <div className="p-6">
          <p>
            <strong>Nombre:</strong> {user?.displayName || "No especificado"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "No especificado"}
          </p>
        </div>
      </div>

      {/* Sección de Reservas (Ocultar si el usuario gestiona canchas) */}
      {!user?.hasFields && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 bg-emerald-600">
            <h2 className="text-xl font-semibold text-white">Mis Reservas</h2>
          </div>
          <div className="p-6">
            {/* Contenido de reservas */}
            <p>Aquí aparecerán tus reservas.</p>
            {/* ... resto del código de reservas ... */}
          </div>
        </div>
      )}

      {/* Sección de Comentarios */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-emerald-600">
          <h2 className="text-xl font-semibold text-white">
            {user?.hasFields ? "Comentarios de mis Canchas" : "Mis Comentarios"}
          </h2>
        </div>
        <div className="p-6">
          {user?.hasFields ? (
            // Mostrar comentarios recibidos para usuarios con campos
            <div>
              {/* Lista de comentarios recibidos */}
              {mockComments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
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
            // Mostrar comentarios hechos por usuarios normales
            <div>
              {/* Código original para usuarios normales */}
              <p>Aquí aparecerán tus comentarios.</p>
              {/* ... resto del código de comentarios ... */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
