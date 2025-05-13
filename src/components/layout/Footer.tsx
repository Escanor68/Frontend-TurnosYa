import React from 'react';
import { Link } from 'react-router-dom';
import { Percent as Soccer, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Soccer className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold">TurnosYa</span>
            </div>
            <p className="text-gray-400 mb-4">
              La forma más fácil de encontrar y reservar canchas de fútbol en tu ciudad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-emerald-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/fields" className="text-gray-400 hover:text-emerald-500 transition-colors">
                  Canchas
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-emerald-500 transition-colors">
                  Ingresar
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-emerald-500 transition-colors">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span className="text-gray-400">contacto@futbolya.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span className="text-gray-400">+54 11 1234 5678</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Recibe Novedades</h3>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir promociones y nuevas canchas disponibles.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-gray-700 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-r px-4 py-2"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TurnosYa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;