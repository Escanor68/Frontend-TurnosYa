import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, Users, CalendarDays } from 'lucide-react';

// Mock data for soccer fields
const mockFields = [
  {
    id: 1,
    name: 'Complejo Deportivo Goleador',
    location: 'Palermo, Buenos Aires',
    rating: 4.8,
    type: 'Fútbol 5',
    price: 8500,
    image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    amenities: ['Césped sintético', 'Iluminación', 'Vestuarios', 'Estacionamiento'],
    duration: 60,
    players: '5 vs 5'
  },
  {
    id: 2,
    name: 'Complejo Messi',
    location: 'Belgrano, Buenos Aires',
    rating: 4.6,
    type: 'Fútbol 7',
    price: 12000,
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    amenities: ['Césped sintético', 'Iluminación', 'Vestuarios', 'Bar'],
    duration: 60,
    players: '7 vs 7'
  },
  {
    id: 3,
    name: 'La Bombonerita',
    location: 'La Boca, Buenos Aires',
    rating: 4.7,
    type: 'Fútbol 11',
    price: 18000,
    image: 'https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    amenities: ['Césped natural', 'Iluminación', 'Vestuarios', 'Estacionamiento', 'Cafetería'],
    duration: 90,
    players: '11 vs 11'
  },
  {
    id: 4,
    name: 'Complejo River',
    location: 'Núñez, Buenos Aires',
    rating: 4.9,
    type: 'Fútbol 5',
    price: 9000,
    image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    amenities: ['Césped sintético premium', 'Iluminación LED', 'Vestuarios', 'Duchas'],
    duration: 60,
    players: '5 vs 5'
  },
  {
    id: 5,
    name: 'Cancha El Monumental',
    location: 'Caballito, Buenos Aires',
    rating: 4.5,
    type: 'Fútbol 7',
    price: 11500,
    image: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    amenities: ['Césped sintético', 'Iluminación', 'Vestuarios', 'Cantina'],
    duration: 60,
    players: '7 vs 7'
  },
  {
    id: 6,
    name: 'Complejo Maradona',
    location: 'Villa Crespo, Buenos Aires',
    rating: 4.4,
    type: 'Fútbol 5',
    price: 8200,
    image: 'https://images.pexels.com/photos/186230/pexels-photo-186230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    amenities: ['Césped sintético', 'Iluminación', 'Bebidas'],
    duration: 60,
    players: '5 vs 5'
  }
];

const Fields: React.FC = () => {
  const [filters, setFilters] = useState({
    location: '',
    date: '',
    fieldType: '',
    priceRange: '',
    amenities: [] as string[]
  });
  
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  const toggleAmenity = (amenity: string) => {
    setFilters(prev => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...amenities, amenity]
        };
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Canchas de Fútbol</h1>
          <p className="text-gray-600">Encuentra y reserva la cancha perfecta para tu partido</p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar canchas por nombre o ubicación"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                >
                  <option value="">Todas las ubicaciones</option>
                  <option value="palermo">Palermo</option>
                  <option value="belgrano">Belgrano</option>
                  <option value="nuñez">Núñez</option>
                  <option value="caballito">Caballito</option>
                  <option value="villacrespo">Villa Crespo</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarDays className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({...filters, date: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 md:hidden"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </button>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFiltersMobile && (
            <div className="mt-4 md:hidden border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tipo de Cancha</label>
                  <select
                    value={filters.fieldType}
                    onChange={(e) => setFilters({...filters, fieldType: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="futbol5">Fútbol 5</option>
                    <option value="futbol7">Fútbol 7</option>
                    <option value="futbol11">Fútbol 11</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Rango de Precio</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Cualquier precio</option>
                    <option value="low">Menos de $9.000</option>
                    <option value="medium">$9.000 - $15.000</option>
                    <option value="high">Más de $15.000</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                <div className="flex flex-wrap gap-2">
                  {['Césped sintético', 'Iluminación', 'Vestuarios', 'Estacionamiento', 'Bar'].map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.amenities.includes(amenity)
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 bg-white rounded-xl shadow-md p-4 self-start sticky top-20">
            <h2 className="font-semibold text-lg text-gray-900 mb-4">Filtros</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tipo de Cancha</h3>
                <div className="space-y-2">
                  {['Fútbol 5', 'Fútbol 7', 'Fútbol 11'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type}`}
                        name="field-type"
                        type="radio"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        checked={filters.fieldType === type}
                        onChange={() => setFilters({...filters, fieldType: type})}
                      />
                      <label htmlFor={`type-${type}`} className="ml-3 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Rango de Precio</h3>
                <div className="space-y-2">
                  {[
                    { value: 'low', label: 'Menos de $9.000' },
                    { value: 'medium', label: '$9.000 - $15.000' },
                    { value: 'high', label: 'Más de $15.000' }
                  ].map((range) => (
                    <div key={range.value} className="flex items-center">
                      <input
                        id={`price-${range.value}`}
                        name="price-range"
                        type="radio"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        checked={filters.priceRange === range.value}
                        onChange={() => setFilters({...filters, priceRange: range.value})}
                      />
                      <label htmlFor={`price-${range.value}`} className="ml-3 text-sm text-gray-700">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Comodidades</h3>
                <div className="space-y-2">
                  {['Césped sintético', 'Iluminación', 'Vestuarios', 'Estacionamiento', 'Bar'].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        id={`amenity-${amenity}`}
                        name={`amenity-${amenity}`}
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      <label htmlFor={`amenity-${amenity}`} className="ml-3 text-sm text-gray-700">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Field Listings */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFields.map((field) => (
                <div key={field.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={field.image} 
                      alt={field.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {field.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{field.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-gray-700 font-medium ml-1">{field.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{field.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {field.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                      {field.amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          +{field.amenities.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2 text-gray-500" />
                        <span>{field.duration} min</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                        <span>{field.players}</span>
                      </div>
                      <span className="text-emerald-600 font-bold text-xl">${field.price.toLocaleString()}</span>
                    </div>
                    <Link
                      to={`/fields/${field.id}`}
                      className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
                    >
                      Ver Disponibilidad
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <a
                  href="#"
                  className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Anterior
                </a>
                <a
                  href="#"
                  className="px-3 py-1 rounded-md bg-emerald-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  3
                </a>
                <span className="px-3 py-1 text-gray-500">...</span>
                <a
                  href="#"
                  className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  8
                </a>
                <a
                  href="#"
                  className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Siguiente
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fields;