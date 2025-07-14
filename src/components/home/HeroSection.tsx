import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Star,
  Users,
  Award,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import OptimizedImage from '../common/OptimizedImage';

const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden position-relative">
      {/* Background Image with Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 0 }}
      >
        <OptimizedImage
          src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg"
          alt="Cancha de fútbol profesional"
          className="w-100 h-100 object-fit-cover"
          priority={true}
          loading="eager"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-60"></div>
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-bottom from-transparent to-dark"></div>
      </div>

      {/* Content */}
      <motion.div
        className="position-relative text-center text-white px-3"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              {/* Badge */}
              <motion.div
                className="badge bg-success bg-opacity-90 text-white px-4 py-2 rounded-pill mb-4 d-inline-flex align-items-center"
                variants={itemVariants}
              >
                <Zap className="me-2" size={16} />
                <span className="fw-bold">Reserva tu cancha en segundos</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="display-1 fw-bold mb-4 text-white"
                variants={itemVariants}
              >
                <span className="d-block">Reserva tu cancha</span>
                <span className="d-block text-success">con TurnosYa</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="lead mb-5 text-light opacity-90"
                variants={itemVariants}
              >
                La forma más rápida y sencilla de reservar tu cancha deportiva.
                Sin llamadas, sin esperas, todo desde tu dispositivo.
              </motion.p>

              {/* Features */}
              <motion.div
                className="row g-4 mb-5 justify-content-center"
                variants={itemVariants}
              >
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center text-white">
                    <div
                      className="bg-success bg-opacity-75 rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: '50px', height: '50px' }}
                    >
                      <Clock size={24} />
                    </div>
                    <span className="fw-medium">Reserva en segundos</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center text-white">
                    <div
                      className="bg-success bg-opacity-75 rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: '50px', height: '50px' }}
                    >
                      <MapPin size={24} />
                    </div>
                    <span className="fw-medium">Canchas cercanas</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center text-white">
                    <div
                      className="bg-success bg-opacity-75 rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: '50px', height: '50px' }}
                    >
                      <Calendar size={24} />
                    </div>
                    <span className="fw-medium">Disponibilidad real</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5"
                variants={itemVariants}
              >
                {!isAuthenticated ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/register"
                        className="btn btn-success btn-lg px-5 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg"
                      >
                        <span>Comenzar ahora</span>
                        <ArrowRight size={20} />
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/login"
                        className="btn btn-outline-light btn-lg px-5 py-3 fw-bold"
                      >
                        Ya tengo cuenta
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/${user?.role}/dashboard`}
                      className="btn btn-success btn-lg px-5 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg"
                    >
                      <span>Ir al Dashboard</span>
                      <ArrowRight size={20} />
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="row g-4 justify-content-center"
                variants={itemVariants}
              >
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <div className="display-6 fw-bold text-success mb-2">
                      500+
                    </div>
                    <div className="text-light opacity-75">
                      Canchas disponibles
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <div className="display-6 fw-bold text-success mb-2">
                      10k+
                    </div>
                    <div className="text-light opacity-75">
                      Reservas exitosas
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <div className="display-6 fw-bold text-success mb-2">
                      24/7
                    </div>
                    <div className="text-light opacity-75">Disponibilidad</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <div className="display-6 fw-bold text-warning mb-2 d-flex align-items-center justify-content-center gap-1">
                      <span>4.9</span>
                      <Star size={20} fill="currentColor" />
                    </div>
                    <div className="text-light opacity-75">Calificación</div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Trust Elements */}
              <motion.div
                className="row g-3 mt-4 justify-content-center"
                variants={itemVariants}
              >
                <div className="col-auto">
                  <div className="badge bg-light bg-opacity-20 text-white px-3 py-2 rounded-pill">
                    <Users size={16} className="me-1" />
                    +50,000 usuarios
                  </div>
                </div>
                <div className="col-auto">
                  <div className="badge bg-light bg-opacity-20 text-white px-3 py-2 rounded-pill">
                    <Award size={16} className="me-1" />
                    Certificado SSL
                  </div>
                </div>
                <div className="col-auto">
                  <div className="badge bg-light bg-opacity-20 text-white px-3 py-2 rounded-pill">
                    <Zap size={16} className="me-1" />
                    Pago seguro
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        style={{ zIndex: 10 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="d-flex flex-column align-items-center text-white opacity-75">
          <span className="small mb-2">Desliza para explorar</span>
          <div
            className="border border-white border-2 rounded-pill d-flex justify-content-center"
            style={{ width: '30px', height: '50px' }}
          >
            <div
              className="bg-white rounded-pill mt-3"
              style={{ width: '4px', height: '8px' }}
            ></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(HeroSection);
