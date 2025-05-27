import React from 'react'
import { MapPin, Search, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Map from '../common/Map'
import type { SportField } from '../../types'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const [nearbyFields, setNearbyFields] = React.useState<SportField[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  // Obtener la ubicación del usuario cuando se monta el componente
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          fetchNearbyFields(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Error getting user location:', error)
        }
      )
    }
  }, [])

  // Buscar canchas cercanas
  const fetchNearbyFields = async (lat: number, lng: number) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/fields/nearby?lat=${lat}&lng=${lng}`)
      if (!response.ok) throw new Error('Error fetching nearby fields')
      const data = await response.json()
      setNearbyFields(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar canchas por búsqueda
  const filteredFields = nearbyFields.filter(field => 
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Encuentra canchas cerca de ti
          </h1>
          <p className="text-lg text-center mb-8">
            Reserva tu cancha favorita en pocos clics
          </p>

          {/* Barra de búsqueda */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, dirección o ciudad..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de canchas */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Canchas cercanas a ti
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : filteredFields.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {filteredFields.map((field) => (
                  <div
                    key={field.id}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/fields/${field.id}`)}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={field.image || "/placeholder.svg"}
                        alt={field.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">{field.name}</h3>
                    <div className="flex items-start mt-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-emerald-600" />
                      <span>{field.location.address}, {field.location.city}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-emerald-600 font-semibold">${field.price}</span>
                      <span className="text-sm text-gray-500">{field.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {userLocation ? 'No se encontraron canchas cercanas' : 'Activá la ubicación para ver canchas cercanas'}
              </div>
            )}
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 h-[600px]">
              {userLocation ? (
                <Map
                  center={userLocation}
                  markers={filteredFields.map(field => ({
                    id: field.id,
                    position: field.location.coordinates,
                    title: field.name,
                    address: field.location.address
                  }))}
                  zoom={13}
                  height="100%"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Activá la ubicación para ver el mapa
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 