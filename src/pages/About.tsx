"use client"

import type React from "react"
import { MapPin, Mail, Phone, Clock, Users, Award } from 'lucide-react'

// Página de Acerca de nosotros
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sobre TurnosYa</h1>
            <p className="text-lg text-gray-600">
              Conectamos a deportistas con los mejores espacios deportivos de la ciudad
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Equipo TurnosYa"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestra Misión</h2>
                <p className="text-gray-600 mb-6">
                  En TurnosYa, nos dedicamos a simplificar el proceso de reserva de espacios deportivos. Nuestra
                  plataforma conecta a deportistas con los mejores campos y canchas de la ciudad, permitiendo reservas
                  rápidas y sin complicaciones.
                </p>
                <p className="text-gray-600">
                  Creemos que el deporte debe ser accesible para todos, y nuestra misión es eliminar las barreras que
                  dificultan la práctica deportiva, facilitando el acceso a instalaciones de calidad.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Todas las instalaciones deportivas en nuestra plataforma cumplen con estándares de calidad y seguridad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reservas Instantáneas</h3>
              <p className="text-gray-600">
                Nuestro sistema permite realizar reservas en tiempo real, confirmando tu espacio de inmediato.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidad Deportiva</h3>
              <p className="text-gray-600">
                Formamos parte de una comunidad que promueve el deporte, la salud y el bienestar social.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
                TurnosYa nació en 2022 cuando un grupo de apasionados por el deporte se encontró con la dificultad de
                encontrar y reservar canchas de fútbol en Buenos Aires. Lo que comenzó como una solución a un problema
                personal, rápidamente se convirtió en una plataforma integral para la gestión de espacios deportivos.
              </p>
              <p className="text-gray-600 mb-4">
                En nuestro primer año, conectamos más de 100 canchas con miles de deportistas, y seguimos creciendo para
                incluir más deportes y servicios adicionales que mejoren la experiencia de nuestros usuarios.
              </p>
              <p className="text-gray-600">
                Hoy, TurnosYa es la plataforma preferida por deportistas y propietarios de instalaciones deportivas,
                gracias a nuestra facilidad de uso, transparencia y compromiso con la calidad.
              </p>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-6">Contáctanos</h2>
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-emerald-200 mr-2" />
                  <span className="text-white">Av. Corrientes 1234, CABA</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 text-emerald-200 mr-2" />
                  <span className="text-white">info@turnosya.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 text-emerald-200 mr-2" />
                  <span className="text-white">+54 11 1234-5678</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
