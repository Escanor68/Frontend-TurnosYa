import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin } from 'lucide-react';

const Page = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const features = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Búsqueda Fácil",
      description: "Encuentra las mejores canchas deportivas cerca de ti"
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Reserva al Instante",
      description: "Agenda tu turno en segundos, sin complicaciones"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Ubicación Precisa",
      description: "Localiza las canchas con mapas integrados"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Reserva tus canchas</span>
                  <span className="block text-primary">deportivas favoritas</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Encuentra y reserva las mejores canchas deportivas de tu zona. ¡Rápido, fácil y seguro!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/football/fields')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                    >
                      Buscar Canchas
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigate('/register')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-primary-lighter md:py-4 md:text-lg md:px-10"
                    >
                      Registrarse
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Características</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Todo lo que necesitas para reservar
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
