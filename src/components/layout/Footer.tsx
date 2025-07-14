import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Shield,
  Clock,
  Users,
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TY</span>
              </div>
              <span className="text-2xl font-bold text-white">TurnosYa</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              La forma más fácil y rápida de reservar tu cancha deportiva. Sin
              llamadas, sin esperas, todo desde tu dispositivo.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">info@turnosya.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-emerald-400" />
              Servicios
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/fields"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Buscar Canchas
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Registrar Cancha
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Hacer Reserva
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Mis Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-emerald-400" />
              Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-400" />
              Empresa
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Prensa
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Socios
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                aria-label="Síguenos en Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                aria-label="Síguenos en LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Suscríbete a nuestro newsletter:
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  aria-label="Email para newsletter"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 transition-colors duration-200 text-sm">
                  Suscribir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} TurnosYa. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                to="/cookies"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Política de Cookies
              </Link>
              <div className="flex items-center space-x-1">
                <span>Hecho con</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>en Argentina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
