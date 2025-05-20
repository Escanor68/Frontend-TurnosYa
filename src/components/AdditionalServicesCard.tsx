"use client"

import React from "react"
import { Utensils, BellIcon as Whistle, Video, Award } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price: number
  icon: React.ReactNode
}

interface AdditionalServicesCardProps {
  fieldId: string
  onServiceSelect: (services: string[]) => void
}

const AdditionalServicesCard: React.FC<AdditionalServicesCardProps> = ({ fieldId, onServiceSelect }) => {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([])

  // Servicios disponibles según el campo
  const availableServices: Service[] = [
    {
      id: "equipment",
      name: "Alquiler de Equipamiento",
      description: "Pelotas, pecheras, conos",
      price: 1500,
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: "referee",
      name: "Árbitro",
      description: "Árbitro profesional para tu partido",
      price: 3000,
      icon: <Whistle className="h-5 w-5" />,
    },
    {
      id: "recording",
      name: "Grabación del Partido",
      description: "Video HD del partido completo",
      price: 2500,
      icon: <Video className="h-5 w-5" />,
    },
    {
      id: "grill",
      name: "Parrilla",
      description: "Acceso a zona de parrilla con equipamiento",
      price: 2000,
      icon: <Utensils className="h-5 w-5" />,
    },
  ]

  // Filtrar servicios según el campo (en una implementación real, esto vendría de la API)
  const fieldServices = availableServices.filter((service) => {
    // Ejemplo: algunos campos no tienen parrilla
    if (service.id === "grill" && ["3", "6"].includes(fieldId)) {
      return false
    }
    return true
  })

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSelection = prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]

      // Notificar al componente padre sobre los cambios
      onServiceSelect(newSelection)
      return newSelection
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Servicios Adicionales</h3>

      <div className="space-y-3">
        {fieldServices.map((service) => (
          <div
            key={service.id}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              selectedServices.includes(service.id)
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
            }`}
            onClick={() => handleServiceToggle(service.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    selectedServices.includes(service.id)
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-emerald-600">${service.price}</span>
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => {}} // Controlado por el onClick del div padre
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fieldServices.length === 0 && (
        <p className="text-gray-500 text-center py-4">No hay servicios adicionales disponibles para esta cancha</p>
      )}
    </div>
  )
}

export default AdditionalServicesCard
