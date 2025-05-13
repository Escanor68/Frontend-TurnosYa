import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, CreditCard, Trophy, Users, Clock, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[85vh] overflow-hidden bg-gradient-to-r from-emerald-700 to-emerald-900">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Campo de fútbol" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Reserva tu cancha de fútbol en segundos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Encuentra la mejor cancha disponible para tu partido y reserva al instante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/fields" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <Search className="mr-2 h-5 w-5" /> Buscar Canchas
              </Link>
              <Link 
                to="/register" 
                className="bg-white hover:bg-gray-100 text-emerald-700 px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form Card */}
      <div className="container mx-auto px-4 -mt-24 relative z-30">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-gray-700 font-medium">
                Ubicación
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Todas las ubicaciones</option>
                  <option value="buenosaires">Buenos Aires</option>
                  <option value="cordoba">Córdoba</option>
                  <option value="rosario">Rosario</option>
                  <option value="mendoza">Mendoza</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="block text-gray-700 font-medium">
                Fecha
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors self-end"
            >
              Buscar Disponibilidad
            </button>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué elegirnos?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma te ofrece la forma más sencilla de encontrar y reservar canchas de fútbol.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Búsqueda Fácil</h3>
              <p className="text-gray-600 text-center">
                Encuentra rápidamente canchas disponibles cerca de ti con nuestros filtros avanzados.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Reserva Instantánea</h3>
              <p className="text-gray-600 text-center">
                Asegura tu horario preferido con confirmación inmediata y sin llamadas telefónicas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CreditCard className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Pago Seguro</h3>
              <p className="text-gray-600 text-center">
                Paga de forma segura y rápida con múltiples opciones, incluyendo Mercado Pago.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Trophy className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Canchas de Calidad</h3>
              <p className="text-gray-600 text-center">
                Solo trabajamos con las mejores canchas, verificadas y con buenas evaluaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Fields Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Canchas Populares</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las canchas mejor valoradas por nuestra comunidad de jugadores.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((field) => (
              <div key={field} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={`https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} 
                    alt="Campo de fútbol" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Fútbol 5
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">Cancha El Goleador {field}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-gray-700 font-medium ml-1">4.{7 + field}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Palermo, Buenos Aires</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Césped sintético</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Iluminación</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Vestuarios</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-gray-500" />
                      <span>60 min</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-gray-500" />
                      <span>5 vs 5</span>
                    </div>
                    <span className="text-emerald-600 font-bold text-xl">$8.500</span>
                  </div>
                  <Link
                    to={`/fields/${field}`}
                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
                  >
                    Ver Disponibilidad
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/fields"
              className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold rounded-lg transition-colors"
            >
              Ver Todas las Canchas
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de jugadores ya están usando TurnosYa para sus partidos semanales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alejandro Gómez",
                role: "Capitán de equipo",
                content: "Excelente aplicación para organizar nuestros partidos semanales. Ya no tenemos que preocuparnos por las llamadas y los pagos en efectivo. ¡Muy recomendable!"
              },
              {
                name: "Carolina Pérez",
                role: "Jugadora amateur",
                content: "Encontrar cancha antes era un dolor de cabeza, ahora con un par de clicks tengo todo resuelto. La interfaz es super intuitiva y los precios son los mismos que pagando directamente."
              },
              {
                name: "Martín López",
                role: "Organizador de torneos",
                content: "Como organizador de torneos, esta app me facilita enormemente la logística. Puedo reservar múltiples horarios, realizar pagos online y mantener todo organizado en un solo lugar."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
                <div className="flex mt-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para jugar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de jugadores que ya están disfrutando de la forma más fácil de reservar canchas de fútbol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-colors"
            >
              Crear Cuenta
            </Link>
            <Link
              to="/fields"
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-colors"
            >
              Explorar Canchas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;