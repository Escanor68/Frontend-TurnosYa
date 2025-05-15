"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { MapPin, Star, Clock, Users } from "react-feather"

// Mock data for fields
const mockFields = [
  {
    id: 1,
    name: "Cancha de Fútbol 5 - El Campito",
    location: "Av. Siempreviva 742, Buenos Aires, CABA",
    type: "Fútbol 5",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1508035353492-2a2a97a04a31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Vestuarios", "Iluminación", "Estacionamiento"],
    duration: 60,
    players: "5 vs 5",
    price: 8000,
  },
  {
    id: 2,
    name: "Cancha de Tenis - Club Victoria",
    location: "Calle Falsa 123, Buenos Aires, CABA",
    type: "Tenis",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1560275774-c945485b9336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Red Nueva", "Bebidas", "Profesor"],
    duration: 90,
    players: "2 vs 2",
    price: 12000,
  },
  {
    id: 3,
    name: "Cancha de Padel - Padel Center",
    location: "Avenida Siempre Viva 742",
    type: "Padel",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1662299397095-c2b1549509a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Paredes de Vidrio", "Iluminación LED", "Alquiler de Paletas"],
    duration: 60,
    players: "2 vs 2",
    price: 10000,
  },
  {
    id: 4,
    name: "Cancha de Fútbol - Estadio Municipal",
    location: "Calle Principal 456",
    type: "Fútbol",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1564853431607-ff4ca65899dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Vestuarios", "Duchas", "Estacionamiento"],
    duration: 90,
    players: "11 vs 11",
    price: 18000,
  },
  {
    id: 5,
    name: "Cancha de Basquet - Polideportivo",
    location: "Avenida Central 789",
    type: "Basquet",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1554744733-649ca498a04c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Tableros Profesionales", "Marcador Electrónico", "Gradas"],
    duration: 60,
    players: "5 vs 5",
    price: 15000,
  },
  {
    id: 6,
    name: "Cancha de Voley - Club de Playa",
    location: "Calle Costanera 101",
    type: "Voley",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1568771426895-c44995018981?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Red de Voley Profesional", "Arena Blanca", "Vista al Mar"],
    duration: 60,
    players: "6 vs 6",
    price: 9000,
  },
  {
    id: 7,
    name: "Cancha de Fútbol 7 - Complejo Futbolero",
    location: "Calle de la Cancha 123",
    type: "Fútbol 7",
    rating: 4.7,
    image: "https://i.pinimg.com/originals/7d/59/19/7d591981e0bca894a99a9694189b98e1.jpg",
    amenities: ["Iluminación", "Césped Sintético", "Bar"],
    duration: 70,
    players: "7 vs 7",
    price: 11000,
  },
  {
    id: 8,
    name: "Cancha de Squash - Club Atlético",
    location: "Avenida del Deporte 456",
    type: "Squash",
    rating: 4.4,
    image: "https://www.sportbs.com/wp-content/uploads/2018/07/cancha-de-squash.jpg",
    amenities: ["Aire Acondicionado", "Raquetas Disponibles", "Clases Particulares"],
    duration: 45,
    players: "2 vs 2",
    price: 7500,
  },
  {
    id: 9,
    name: "Cancha de Badminton - Centro Deportivo",
    location: "Calle del Volante 789",
    type: "Badminton",
    rating: 4.0,
    image: "https://www.olimpiastore.com/wp-content/uploads/2023/02/cancha-de-badminton-medidas-oficiales.jpg",
    amenities: ["Red de Badminton Profesional", "Volantes Disponibles", "Iluminación"],
    duration: 60,
    players: "2 vs 2",
    price: 6000,
  },
  {
    id: 10,
    name: "Cancha de Tenis de Mesa - Salón de Juegos",
    location: "Calle del Ping Pong 101",
    type: "Tenis de Mesa",
    rating: 4.9,
    image: "https://www.ittf.com/wp-content/uploads/2023/07/table-tennis-1400x933.jpg",
    amenities: ["Mesas Profesionales", "Paletas Disponibles", "Iluminación LED"],
    duration: 30,
    players: "2 vs 2",
    price: 5000,
  },
  {
    id: 11,
    name: "Cancha de Hockey - Club de Campo",
    location: "Avenida del Stick 222",
    type: "Hockey",
    rating: 4.5,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Hockey_field_with_markings.svg/1200px-Hockey_field_with_markings.svg.png",
    amenities: ["Césped Sintético", "Arcos Profesionales", "Vestuarios"],
    duration: 75,
    players: "11 vs 11",
    price: 13000,
  },
  {
    id: 12,
    name: "Cancha de Rugby - Club de Rugby",
    location: "Calle del Tackle 333",
    type: "Rugby",
    rating: 4.2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Rugby_union_field_with_markings.svg/1200px-Rugby_union_field_with_markings.svg.png",
    amenities: ["Postes de Rugby", "Césped Natural", "Vestuarios"],
    duration: 80,
    players: "15 vs 15",
    price: 16000,
  },
]

interface Filters {
  location: string
  date: string
  fieldType: string
  priceRange: string
  amenities: string[]
}

interface Field {
  id: number
  name: string
  location: string
  type: string
  rating: number
  image: string
  amenities: string[]
  duration: number
  players: string
  price: number
}

interface FieldsProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const Fields: React.FC<FieldsProps> = ({ filters, setFilters }) => {
  // Estado para la búsqueda y paginación
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const fieldsPerPage = 6

  // Filtrar campos basados en los filtros y término de búsqueda
  const filteredFields = mockFields.filter((field) => {
    // Filtrar por término de búsqueda (nombre o ubicación)
    const matchesSearch =
      searchTerm === "" ||
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtrar por ubicación
    const matchesLocation =
      filters.location === "" || field.location.toLowerCase().includes(filters.location.toLowerCase())

    // Filtrar por tipo de cancha
    const matchesType = filters.fieldType === "" || field.type === filters.fieldType

    // Filtrar por rango de precio
    const matchesPrice =
      filters.priceRange === "" ||
      (filters.priceRange === "low" && field.price < 9000) ||
      (filters.priceRange === "medium" && field.price >= 9000 && field.price <= 15000) ||
      (filters.priceRange === "high" && field.price > 15000)

    // Filtrar por comodidades
    const matchesAmenities =
      filters.amenities.length === 0 || filters.amenities.every((amenity) => field.amenities.includes(amenity))

    return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesAmenities
  })

  // Calcular índices para paginación
  const indexOfLastField = currentPage * fieldsPerPage
  const indexOfFirstField = indexOfLastField - fieldsPerPage
  const currentFields = filteredFields.slice(indexOfFirstField, indexOfLastField)
  const totalPages = Math.ceil(filteredFields.length / fieldsPerPage)

  // Cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll hacia arriba cuando cambia la página
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Resultados</h2>
        <div className="relative mt-3 md:mt-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar canchas por nombre o ubicación"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Resetear a la primera página cuando se busca
            }}
          />
        </div>
      </div>

      {/* Field Listings */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFields.length > 0 ? (
            currentFields.map((field) => (
              <div
                key={field.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={field.image || "/placeholder.svg"}
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
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <div className="text-gray-500 mb-4">
                No se encontraron canchas que coincidan con los filtros seleccionados
              </div>
              <button
                onClick={() => {
                  setFilters({
                    location: "",
                    date: "",
                    fieldType: "",
                    priceRange: "",
                    amenities: [],
                  })
                  setSearchTerm("")
                  setCurrentPage(1)
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredFields.length > fieldsPerPage && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                Anterior
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                // Mostrar solo un número limitado de páginas
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNumber ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    >
                      {pageNumber}
                    </button>
                  )
                } else if (
                  (pageNumber === currentPage - 2 && pageNumber > 1) ||
                  (pageNumber === currentPage + 2 && pageNumber < totalPages)
                ) {
                  return (
                    <span key={pageNumber} className="px-1 text-gray-500">
                      ...
                    </span>
                  )
                }
                return null
              })}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                Siguiente
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default Fields
