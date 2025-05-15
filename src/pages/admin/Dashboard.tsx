import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Users, Calendar, DollarSign, Settings, AlertTriangle } from "lucide-react"
import { toast } from "react-toastify"

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/")
    }
  }, [user, navigate])

  if (!user?.isAdmin) {
    return null
  }

  const stats = [
    { name: "Reservas Totales", value: "156", icon: Calendar, change: "+12.5%", changeType: "increase" },
    { name: "Usuarios Activos", value: "2,345", icon: Users, change: "+5.2%", changeType: "increase" },
    { name: "Ingresos Mensuales", value: "$45,678", icon: DollarSign, change: "+8.1%", changeType: "increase" },
    { name: "Canchas Activas", value: "24", icon: Settings, change: "0", changeType: "neutral" },
  ]

  const recentBookings = [
    { id: 1, user: "Juan Pérez", field: "Cancha 1", date: "2025-03-15", time: "18:00", status: "confirmed" },
    { id: 2, user: "María García", field: "Cancha 3", date: "2025-03-15", time: "19:00", status: "pending" },
    { id: 3, user: "Carlos López", field: "Cancha 2", date: "2025-03-16", time: "20:00", status: "confirmed" },
    { id: 4, user: "Ana Martínez", field: "Cancha 1", date: "2025-03-16", time: "21:00", status: "cancelled" },
  ]

  const alerts = [
    { id: 1, message: "Mantenimiento programado para Cancha 2 el 20/03", severity: "warning" },
    { id: 2, message: "Alta demanda de reservas para el fin de semana", severity: "info" },
    { id: 3, message: "Actualización de precios pendiente", severity: "warning" },
  ]

  const handleViewAllAlerts = () => {
    toast.info("Función de alertas en desarrollo")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Bienvenido de nuevo, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : stat.changeType === "decrease"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.name}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reservas Recientes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Usuario</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Cancha</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Fecha</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Hora</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-4">{booking.user}</td>
                        <td className="py-3 px-4">{booking.field}</td>
                        <td className="py-3 px-4">{booking.date}</td>
                        <td className="py-3 px-4">{booking.time}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <Link to="/admin/fields" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Gestionar Canchas
                </Link>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas</h2>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg flex items-start ${
                      alert.severity === "warning" ? "bg-yellow-50" : "bg-blue-50"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.severity === "warning" ? "text-yellow-400" : "text-blue-400"
                      } mr-3 flex-shrink-0 mt-0.5`}
                    />
                    <p className={`text-sm ${alert.severity === "warning" ? "text-yellow-700" : "text-blue-700"}`}>
                      {alert.message}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button onClick={handleViewAllAlerts} className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Ver todas las alertas
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/admin/fields"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
          >
            <Settings className="h-5 w-5 mr-2" />
            Administrar Canchas
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
