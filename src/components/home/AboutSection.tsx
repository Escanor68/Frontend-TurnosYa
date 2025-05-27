import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div id="nosotros" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Nuestra Historia
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            TurnosYa nació de una necesidad real: simplificar la reserva de canchas deportivas.
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              Todo comenzó cuando Ricardo Timoteo Grebosz se encontró con la frustrante tarea de llamar 
              cancha por cancha para encontrar un horario disponible. Junto con Augusto Blázquez, 
              decidieron crear una solución que revolucionaría la forma en que las personas reservan 
              sus espacios deportivos.
            </p>
            <h3>Misión</h3>
            <p>
              Agilizar y simplificar el proceso de reserva de canchas deportivas, comenzando por el fútbol 
              y expandiéndonos a otros deportes, mientras proporcionamos a los dueños de canchas una 
              herramienta eficiente para gestionar sus instalaciones.
            </p>
            <h3>Valores</h3>
            <ul>
              <li>Agilidad: Buscamos hacer cada proceso lo más rápido y eficiente posible.</li>
              <li>Simpleza: Creemos que la mejor solución es la más simple.</li>
              <li>Innovación: Constantemente buscamos mejorar la experiencia del usuario.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 