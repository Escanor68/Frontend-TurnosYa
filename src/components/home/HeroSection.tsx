import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import OptimizedImage from '../common/OptimizedImage';

const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg"
          alt="Cancha de fútbol"
          className="w-full h-full object-cover"
          priority={true}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Calendar className="w-4 h-4 mr-2" />
            Reserva tu cancha en segundos
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Reserva tu cancha</span>
            <span className="block text-emerald-400">con TurnosYa</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            La forma más rápida y sencilla de reservar tu cancha deportiva. Sin
            llamadas, sin esperas, todo desde tu dispositivo.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-white">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Reserva en segundos</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Canchas cercanas</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Disponibilidad real</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="group flex items-center space-x-2 px-8 py-4 bg-emerald-600 text-white rounded-xl text-lg font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Comenzar ahora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/login"
                  className="group flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  <span>Ya tengo cuenta</span>
                </Link>
              </>
            ) : (
              <Link
                to={`/${user?.role}/dashboard`}
                className="group flex items-center space-x-2 px-8 py-4 bg-emerald-600 text-white rounded-xl text-lg font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Ir al Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-sm text-gray-300">Canchas disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                10k+
              </div>
              <div className="text-sm text-gray-300">Reservas exitosas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-300">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                4.9★
              </div>
              <div className="text-sm text-gray-300">Calificación</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroSection);
