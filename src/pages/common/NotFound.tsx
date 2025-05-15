import type React from "react"
import { Link } from "react-router-dom"
import { Home, Search } from "lucide-react"

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-emerald-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Página no encontrada</h2>
        <p className="text-gray-600 mt-2 mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Ir al inicio
          </Link>
          <Link
            to="/fields"
            className="flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            Buscar canchas
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
