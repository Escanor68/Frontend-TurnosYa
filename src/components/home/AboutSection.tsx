import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div id="nosotros" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-success mb-3">
            Nuestra Historia
          </h2>
          <p className="lead text-secondary mb-0">
            TurnosYa nació de una necesidad real: simplificar la reserva de
            canchas deportivas.
          </p>
        </div>
        <div className="row justify-content-center g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <p className="mb-0 text-dark fs-5">
                  Todo comenzó cuando{' '}
                  <span className="fw-bold">Ricardo Timoteo Grebosz</span> se
                  encontró con la frustrante tarea de llamar cancha por cancha
                  para encontrar un horario disponible. Junto con{' '}
                  <span className="fw-bold">Augusto Blázquez</span>, decidieron
                  crear una solución que revolucionaría la forma en que las
                  personas reservan sus espacios deportivos.
                </p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 fw-bold text-success mb-3">
                      <i className="bi bi-bullseye me-2"></i>Misión
                    </h3>
                    <p className="mb-0 text-dark">
                      Agilizar y simplificar el proceso de reserva de canchas
                      deportivas, comenzando por el fútbol y expandiéndonos a
                      otros deportes, mientras proporcionamos a los dueños de
                      canchas una herramienta eficiente para gestionar sus
                      instalaciones.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 fw-bold text-success mb-3">
                      <i className="bi bi-stars me-2"></i>Valores
                    </h3>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <span className="fw-semibold text-success">
                          Agilidad:
                        </span>{' '}
                        Buscamos hacer cada proceso lo más rápido y eficiente
                        posible.
                      </li>
                      <li className="mb-2">
                        <span className="fw-semibold text-success">
                          Simpleza:
                        </span>{' '}
                        Creemos que la mejor solución es la más simple.
                      </li>
                      <li>
                        <span className="fw-semibold text-success">
                          Innovación:
                        </span>{' '}
                        Constantemente buscamos mejorar la experiencia del
                        usuario.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
