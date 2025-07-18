import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart, Shield, Clock, Users } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-4">
              <div
                className="bg-success text-white rounded-3 d-flex align-items-center justify-content-center me-3"
                style={{ width: '40px', height: '40px' }}
              >
                <span className="fw-bold">TY</span>
              </div>
              <span className="h4 mb-0 fw-bold">TurnosYa</span>
            </div>
            <p className="text-light mb-4">
              La forma más fácil y rápida de reservar tu cancha deportiva. Sin
              llamadas, sin esperas, todo desde tu dispositivo.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="d-flex align-items-center text-light">
                <span className="small">Buenos Aires, Argentina</span>
              </div>
              <div className="d-flex align-items-center text-light">
                <span className="small">+54 11 1234-5678</span>
              </div>
              <div className="d-flex align-items-center text-light">
                <span className="small">info@turnosya.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 d-flex align-items-center">
              <Users className="me-2 text-success" size={18} />
              Servicios
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/fields"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Buscar Canchas
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/register"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Registrar Cancha
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/booking"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Hacer Reserva
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/favorites"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Mis Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 d-flex align-items-center">
              <Shield className="me-2 text-success" size={18} />
              Soporte
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/help"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/faq"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/terms"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 d-flex align-items-center">
              <Clock className="me-2 text-success" size={18} />
              Empresa
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/careers"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/press"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Prensa
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/partners"
                  className="text-light text-decoration-none hover:text-success transition-colors"
                >
                  Socios
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4">Newsletter</h5>
            <p className="text-light small mb-3">
              Suscríbete para recibir novedades y ofertas especiales.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="tu@email.com"
                aria-label="Email para newsletter"
              />
              <button
                className="btn btn-success btn-sm"
                aria-label="Suscribirse al newsletter"
              >
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted small mb-0">
                &copy; {currentYear} TurnosYa. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end gap-4 text-muted small">
                <Link
                  to="/privacy"
                  className="text-decoration-none hover:text-success transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link
                  to="/cookies"
                  className="text-decoration-none hover:text-success transition-colors"
                >
                  Política de Cookies
                </Link>
                <div className="d-flex align-items-center gap-1">
                  <span>Hecho con</span>
                  <Heart
                    className="text-danger"
                    size={16}
                    fill="currentColor"
                  />
                  <span>en Argentina</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
