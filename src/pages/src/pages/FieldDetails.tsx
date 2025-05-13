import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Users, Calendar, DollarSign, Info, ThumbsUp, MessageSquare, Image, CreditCard } from 'lucide-react';

// Mock data for a specific field
const fieldData = {
  id: 1,
  name: 'Complejo Deportivo Goleador',
  description: 'Complejo deportivo con 3 canchas de fútbol 5 con césped sintético de última generación, vestuarios amplios, estacionamiento gratuito y cantina. Ideal para partidos entre amigos o torneos.',
  location: {
    address: 'Av. del Libertador 4567',
    neighborhood: 'Palermo',
    city: 'Buenos Aires'
  },
  rating: 4.8,
  reviewsCount: 124,
  type: 'Fútbol 5',
  price: 8500,
  images: [
    'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  amenities: [
    { name: 'Césped sintético', description: 'Césped sintético profesional de 50mm con relleno de caucho' },
    { name: 'Iluminación LED', description: 'Sistema de iluminación LED de alto rendimiento' },
    { name: 'Vestuarios', description: '2 vestuarios completos con duchas de agua caliente' },
    { name: 'Estacionamiento', description: 'Estacionamiento gratuito para 20 vehículos' },
    { name: 'Cantina', description: 'Servicio de bebidas y comidas rápidas' },
    { name: 'WiFi', description: 'WiFi gratuito en todo el predio' },
  ],
  duration: 60,
  players: '5 vs 5',
  availableSlots: [
    { id: 1, date: '2025-06-01', startTime: '18:00', endTime: '19:00', available: true },
    { id: 2, date: '2025-06-01', startTime: '19:00', endTime: '20:00', available: true },
    { id: 3, date: '2025-06-01', startTime: '20:00', endTime: '21:00', available: false },
    { id: 4, date: '2025-06-01', startTime: '21:00', endTime: '22:00', available: true },
    { id: 5, date: '2025-06-01', startTime: '22:00', endTime: '23:00', available: true },
    { id: 6, date: '2025-06-02', startTime: '18:00', endTime: '19:00', available: true },
    { id: 7, date: '2025-06-02', startTime: '19:00', endTime: '20:00', available: false },
    { id: 8, date: '2025-06-02', startTime: '20:00', endTime: '21:00', available: false },
    { id: 9, date: '2025-06-02', startTime: '21:00', endTime: '22:00', available: true },
    { id: 10, date: '2025-06-02', startTime: '22:00', endTime: '23:00', available: true },
  ],
  reviews: [
    { id: 1, user: 'Juan Pérez', date: '15/05/2025', rating: 5, comment: 'Excelente cancha, el césped está impecable y las instalaciones son de primera.' },
    { id: 2, user: 'Carlos Rodríguez', date: '10/05/2025', rating: 4, comment: 'Muy buena cancha, los vestuarios limpios. La iluminación es perfecta.' },
    { id: 3, user: 'María Gómez', date: '02/05/2025', rating: 5, comment: 'El mejor complejo de la zona, siempre volvemos con mis amigas.' },
  ]
};

const FieldDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string>('2025-06-01');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  
  // Filter slots for the selected date
  const filteredSlots = fieldData.availableSlots.filter(slot => slot.date === selectedDate);
  
  // Group dates for the date picker
  const dateOptions = Array.from(new Set(fieldData.availableSlots.map(slot => slot.date)))
    .map(date => {
      const [year, month, day] = date.split('-');
      return { value: date, label: `${day}/${month}` };
    });
  
  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center text-gray-500 mb-3">
            <Link to="/fields" className="hover:text-emerald-600 transition-colors">
              Canchas
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{fieldData.name}</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{fieldData.name}</h1>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                <span className="font-semibold">{fieldData.rating}</span>
                <span className="mx-1">·</span>
                <span>{fieldData.reviewsCount} opiniones</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2 text-gray-500" />
            <span>{fieldData.location.address}, {fieldData.location.neighborhood}, {fieldData.location.city}</span>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 rounded-xl overflow-hidden h-96">
            <img
              src={fieldData.images[selectedImage]}
              alt={`${fieldData.name} - Imagen ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {fieldData.images.map((image, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden cursor-pointer h-44 ${
                  selectedImage === index ? 'ring-4 ring-emerald-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${fieldData.name} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Details Section */}
          <div className="lg:w-7/12">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center mb-4">
                <Info className="h-6 w-6 text-emerald-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
              </div>
              <p className="text-gray-700 mb-4">{fieldData.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Duración</p>
                    <p className="font-medium">{fieldData.duration} minutos</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-emerald-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Jugadores</p>
                    <p className="font-medium">{fieldData.players}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Precio</p>
                    <p className="font-medium">${fieldData.price}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center mb-6">
                <ThumbsUp className="h-6 w-6 text-emerald-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Comodidades</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{amenity.name}</p>
                      <p className="text-sm text-gray-600">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <MessageSquare className="h-6 w-6 text-emerald-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Opiniones</h2>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-current text-yellow-500 mr-1" />
                  <span className="font-semibold">{fieldData.rating}</span>
                  <span className="text-gray-500 ml-1">({fieldData.reviewsCount})</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {fieldData.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                Ver todas las opiniones
              </button>
            </div>
          </div>
          
          {/* Booking Section */}
          <div className="lg:w-5/12">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reservar Cancha</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar fecha
                </label>
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {dateOptions.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date.value)}
                      className={`flex-shrink-0 py-3 px-5 rounded-lg transition-colors ${
                        selectedDate === date.value
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs opacity-80">
                          {
                            ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'][
                              new Date(`${date.value}T00:00:00`).getDay()
                            ]
                          }
                        </span>
                        <span className="font-semibold">{date.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horarios disponibles
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {filteredSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedTime(slot.id)}
                      disabled={!slot.available}
                      className={`py-2 px-3 rounded-lg text-center transition-colors ${
                        selectedTime === slot.id
                          ? 'bg-emerald-600 text-white'
                          : slot.available
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="inline-block h-3 w-3 bg-gray-100 rounded-full mr-1"></span>
                  Disponible
                  <span className="inline-block h-3 w-3 bg-emerald-600 rounded-full ml-3 mr-1"></span>
                  Seleccionado
                  <span className="inline-block h-3 w-3 bg-gray-100 opacity-60 rounded-full ml-3 mr-1"></span>
                  Ocupado
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium">${fieldData.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Impuestos</span>
                  <span>Incluidos</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Total</span>
                  <span className="text-emerald-600">${fieldData.price}</span>
                </div>
              </div>
              
              <Link
                to={selectedTime ? `/booking/${id}?date=${selectedDate}&time=${selectedTime}` : '#'}
                className={`block w-full bg-emerald-600 text-white text-center font-semibold py-3 px-4 rounded-lg mb-4 transition-colors ${
                  selectedTime ? 'hover:bg-emerald-700' : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={(e) => !selectedTime && e.preventDefault()}
              >
                <div className="flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Reservar Ahora
                </div>
              </Link>
              
              <p className="text-center text-sm text-gray-600 mb-4">
                Se realizará un cargo de ${fieldData.price} a través de Mercado Pago
              </p>
              
              <div className="flex items-center justify-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-1" />
                <span>Pago seguro con</span>
                <span className="font-medium text-blue-500 ml-1">Mercado Pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;