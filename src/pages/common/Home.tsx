import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Calendar, MapPin, Filter, ArrowRight, Trophy } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Reserva tu cancha en segundos</h1>
              <p className="text-xl mb-8 text-white/90">
                La forma más fácil de encontrar y reservar canchas deportivas cerca de ti
              </p>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar canchas..."
                    className="w-full outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <select className="w-full bg-transparent outline-none">
                      <option>Cualquier ubicación</option>
                      <option>Buenos Aires</option>
                      <option>Córdoba</option>
                      <option>Rosario</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <input type="date" className="w-full bg-transparent outline-none" placeholder="Fecha" />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded text-gray-700">
                    <Filter className="w-4 h-4 text-gray-500" />
                    /*<select className="w-full bg-transparent outline-none">
                      <option>Todos los deportes</option>
                      <option>Fútbol</option>
                      <option>Pádel</option>
                      <option>Tenis</option>
                    </select>*/
                  </div>
                </div>
                <Link
                  to="/football/fields"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  Buscar canchas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Reserva de canchas"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Explora por deporte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Football */}
            <Link
              to="/football/fields"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-green-100 relative overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Fútbol"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-2xl font-bold p-6">Fútbol</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Encuentra las mejores canchas de fútbol 5, 7 y 11 cerca de ti.</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Ver canchas disponibles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            {/* Padel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-100 relative overflow-hidden">
                <img src="/placeholder.svg?height=300&width=500" alt="Pádel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-2xl font-bold p-6">Pádel</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Reserva canchas de pádel para jugar con amigos o unirte a partidos.
                </p>
                <div className="flex items-center text-gray-400 font-medium">
                  Próximamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            {/* Tennis */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-yellow-100 relative overflow-hidden">
                <img src="/placeholder.svg?height=300&width=500" alt="Tenis" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-2xl font-bold p-6">Tenis</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Encuentra canchas de tenis de arcilla, cemento o césped para tu próximo partido.
                </p>
                <div className="flex items-center text-gray-400 font-medium">
                  Próximamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">¿Por qué elegir TurnosYa?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Reservas fáciles</h3>
              <p className="text-gray-600">
                Reserva en segundos, sin llamadas ni mensajes. Todo desde tu celular o computadora.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Canchas cercanas</h3>
              <p className="text-gray-600">
                Encuentra las mejores canchas cerca de tu ubicación con información detallada.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Múltiples deportes</h3>
              <p className="text-gray-600">Fútbol, pádel, tenis y más deportes disponibles en una sola plataforma.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para jugar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Encuentra y reserva la cancha perfecta para tu próximo partido en segundos.
          </p>
          <Link
            to="/football/fields"
            className="inline-block bg-white text-blue-600 py-3 px-8 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Explorar canchas disponibles
          </Link>
        </div>
      </section>
    </div>
  )
}
