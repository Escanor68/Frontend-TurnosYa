import React from 'react';

const HelpSection: React.FC = () => {
  return (
    <div id="ayuda" className="bg-white py-5">
      <div className="container">
        <h2 className="display-5 fw-bold text-success text-center mb-5">
          Centro de Ayuda
        </h2>
        <div className="row justify-content-center g-4">
          {/* Para Jugadores */}
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 fw-bold text-primary mb-4">
                  <i className="bi bi-person-fill me-2"></i>Para Jugadores
                </h3>
                <div className="mb-4">
                  <h4 className="fw-semibold mb-1">
                    ¿Cómo reservo una cancha?
                  </h4>
                  <p className="text-secondary mb-0">
                    Inicia sesión, selecciona la cancha y el horario deseado, y
                    confirma tu reserva. El proceso es simple y rápido.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="fw-semibold mb-1">
                    ¿Puedo cancelar mi reserva?
                  </h4>
                  <p className="text-secondary mb-0">
                    Sí, puedes cancelar hasta 24 horas antes de tu turno sin
                    cargo alguno. Después de ese plazo, aplican políticas
                    específicas de cada establecimiento.
                  </p>
                </div>
                <div>
                  <h4 className="fw-semibold mb-1">¿Cómo pago mi reserva?</h4>
                  <p className="text-secondary mb-0">
                    Aceptamos múltiples métodos de pago seguros. Puedes pagar en
                    línea o en el establecimiento según la política de cada
                    cancha.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Para Dueños */}
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 fw-bold text-primary mb-4">
                  <i className="bi bi-people-fill me-2"></i>Para Dueños de
                  Canchas
                </h3>
                <div className="mb-4">
                  <h4 className="fw-semibold mb-1">¿Cómo agrego mi cancha?</h4>
                  <p className="text-secondary mb-0">
                    Regístrate como dueño, verifica tu cuenta y sigue el proceso
                    de alta de canchas. Nuestro equipo te guiará en cada paso.
                  </p>
                </div>
                <div>
                  <h4 className="fw-semibold mb-1">
                    ¿Cómo gestiono las reservas?
                  </h4>
                  <p className="text-secondary mb-0">
                    Desde tu dashboard podrás ver y gestionar todas las
                    reservas, horarios, precios y disponibilidad en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
