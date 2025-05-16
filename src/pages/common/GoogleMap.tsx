import type React from "react"
import { useState, useCallback } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"

interface MapProps {
  address: string
  name: string
  lat?: number
  lng?: number
}

// Estilos para el mapa
const mapContainerStyle = {
  width: "100%",
  height: "400px",
}

// Opciones del mapa
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: true,
  fullscreenControl: true,
}

// Componente de Google Maps
const GoogleMapComponent: React.FC<MapProps> = ({ address, name, lat, lng }) => {
  // Estado para el InfoWindow
  const [infoOpen, setInfoOpen] = useState(false)

  // Si tenemos coordenadas exactas, las usamos
  // De lo contrario, usamos coordenadas predeterminadas para Buenos Aires
  const center = lat && lng ? { lat, lng } : { lat: -34.603722, lng: -58.381592 }

  // Función para abrir/cerrar el InfoWindow
  const handleMarkerClick = useCallback(() => {
    setInfoOpen(!infoOpen)
  }, [infoOpen])

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <div className="rounded-lg overflow-hidden shadow-md">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15} options={options}>
          <Marker position={center} onClick={handleMarkerClick}>
            {infoOpen && (
              <InfoWindow onCloseClick={() => setInfoOpen(false)}>
                <div className="p-2">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm">{address}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <p>
          Nota: Para ver el mapa correctamente, reemplaza "YOUR_GOOGLE_MAPS_API_KEY" con una clave de API válida de
          Google Maps en el archivo GoogleMap.tsx
        </p>
      </div>
    </LoadScript>
  )
}

export default GoogleMapComponent
