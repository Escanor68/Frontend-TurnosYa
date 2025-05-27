import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              TurnosYa
            </Link>
            <p className="text-gray-500 text-base">
              La forma más fácil de reservar tu cancha deportiva
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Servicios
                </h3>
                <ul className="mt-4 space-y-4">
              <li>
                    <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                      Buscar Canchas
                </Link>
              </li>
              <li>
                    <Link to="/register" className="text-base text-gray-500 hover:text-gray-900">
                      Registrar Cancha
                </Link>
              </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Soporte
                </h3>
                <ul className="mt-4 space-y-4">
              <li>
                    <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                      Ayuda
                </Link>
              </li>
              <li>
                    <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                      Contacto
                </Link>
              </li>
            </ul>
          </div>
          </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} TurnosYa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;