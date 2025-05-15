"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Plus, Edit2, Trash2, X, MapPin, DollarSign, Users, Clock, AlertTriangle, Search, Check } from "lucide-react"
import { toast } from "react-toastify"

// Types
interface Field {
  id: number
  name: string
  type: string
  location: {
    address: string
    neighborhood: string
    city: string
  }
  price: number
  duration: number
  players: string
  amenities: string[]
  image: string
  active: boolean
}

const AdminFieldManagement: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Mock data for fields
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "Cancha de Fútbol 5 - El Campito",
      type: "Fútbol 5",
      location: {
        address: "Av. Siempreviva 742",
        neighborhood: "Palermo",
        city: "Buenos Aires",
      },
      price: 8000,
      duration: 60,
      players: "5 vs 5",
      amenities: ["Vestuarios", "Iluminación", "Estacionamiento"],
      image:
        "https://images.unsplash.com/photo-1508035353492-2a2a97a04a31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      active: true,
    },
    {
      id: 2,
      name: "Cancha de Tenis - Club Victoria",
      type: "Tenis",
      location: {
        address: "Calle Falsa 123",
        neighborhood: "Belgrano",
        city: "Buenos Aires",
      },
      price: 12000,
      duration: 90,
      players: "2 vs 2",
      amenities: ["Red Nueva", "Bebidas", "Profesor"],
      image:
        "https://images.unsplash.com/photo-1560275774-c945485b9336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      active: true,
    },
    {
      id: 3,
      name: "Cancha de Padel - Padel Center",
      type: "Padel",
      location: {
        address: "Avenida Siempre Viva 742",
        neighborhood: "Recoleta",
        city: "Buenos Aires",
      },
      price: 10000,
      duration: 60,
      players: "2 vs 2",
      amenities: ["Paredes de Vidrio", "Iluminación LED", "Alquiler de Paletas"],
      image:
        "https://images.unsplash.com/photo-1662299397095-c2b1549509a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      active: true,
    },
  ])

  const [editingField, setEditingField] = useState<Field | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newField, setNewField] = useState<Omit<Field, "id">>({
    name: "",
    type: "Fútbol 5",
    location: {
      address: "",
      neighborhood: "",
      city: "",
    },
    price: 0,
    duration: 60,
    players: "5 vs 5",
    amenities: [],
    image: "",
    active: true,
  })

  // Redirect if not admin
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/")
    }
  }, [user, navigate])

  if (!user?.isAdmin) {
    return null
  }

  const handleEdit = (field: Field) => {
    setEditingField(field)
    setIsAddingNew(false)
  }

  const handleSave = (field: Field) => {
    setFields(fields.map((f) => (f.id === field.id ? field : f)))
    setEditingField(null)
    toast.success("Campo actualizado correctamente")
  }

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este campo?")) {
      setFields(fields.filter((f) => f.id !== id))
      toast.success("Campo eliminado correctamente")
    }
  }

  const handleToggleActive = (id: number) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, active: !f.active } : f)))
    const field = fields.find((f) => f.id === id)
    toast.success(`Campo ${field?.active ? "desactivado" : "activado"} correctamente`)
  }

  const handleAddNew = () => {
    const newId = Math.max(...fields.map((f) => f.id)) + 1
    setFields([...fields, { ...newField, id: newId }])
    setIsAddingNew(false)
    setNewField({
      name: "",
      type: "Fútbol 5",
      location: {
        address: "",
        neighborhood: "",
        city: "",
      },
      price: 0,
      duration: 60,
      players: "5 vs 5",
      amenities: [],
      image: "",
      active: true,
    })
    toast.success("Campo agregado correctamente")
  }

  // Filter fields based on search term
  const filteredFields = fields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.location.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.location.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const FieldForm = ({
    field,
    onSave,
    isNew = false,
  }: { field: any; onSave: (field: any) => void; isNew?: boolean }) => {
    // Obtener datos del usuario para autocompletar
    const { user } = useAuth()
    const [userDataLoaded, setUserDataLoaded] = useState(false)

    const [formData, setFormData] = useState(field)
    const [newAmenity, setNewAmenity] = useState("")

    // Autocompletar campos con datos del usuario cuando se crea un nuevo campo
    useEffect(() => {
      if (isNew && !userDataLoaded && user) {
        // Aquí normalmente obtendrías los datos del usuario desde la API
        // Por ahora usamos datos de ejemplo
        const userData = {
          address: "Av. Principal 123",
          neighborhood: "Centro",
          city: "Buenos Aires",
        }

        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            address: userData.address,
            neighborhood: userData.neighborhood,
            city: userData.city,
          },
        }))

        setUserDataLoaded(true)
      }
    }, [isNew, user, userDataLoaded])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target as HTMLInputElement

      // Actualizar automáticamente el número de jugadores según el tipo de cancha
      if (name === "type") {
        let players = formData.players
        if (value === "Fútbol 5") players = "5 vs 5"
        else if (value === "Fútbol 7") players = "7 vs 7"
        else if (value === "Fútbol 11") players = "11 vs 11"

        setFormData({
          ...formData,
          [name]: value,
          players: players,
        })
        return
      }

      if (name.includes(".")) {
        const [parent, child] = name.split(".")
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: value,
          },
        })
      } else {
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        })
      }
    }

    const handleAddAmenity = () => {
      if (newAmenity && !formData.amenities.includes(newAmenity)) {
        setFormData({
          ...formData,
          amenities: [...formData.amenities, newAmenity],
        })
        setNewAmenity("")
      }
    }

    const handleRemoveAmenity = (amenity: string) => {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a: string) => a !== amenity),
      })
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Campo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Campo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Fútbol 5">Fútbol 5</option>
              <option value="Fútbol 7">Fútbol 7</option>
              <option value="Fútbol 11">Fútbol 11</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="location.neighborhood"
              value={formData.location.neighborhood}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio por hora</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duración del turno (minutos)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jugadores</label>
            <input
              type="text"
              name="players"
              value={formData.players}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de la cancha</label>
            <div className="mt-1 flex items-center">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="URL de la imagen"
              />
              <span className="mx-2 text-gray-500">o</span>
              <label className="cursor-pointer px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
                <span className="text-sm text-gray-700">Subir imagen</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // En una implementación real, aquí subirías el archivo a un servidor
                      // Por ahora, creamos una URL temporal
                      const imageUrl = URL.createObjectURL(file)
                      setFormData({
                        ...formData,
                        image: imageUrl,
                      })
                    }
                  }}
                />
              </label>
            </div>
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Vista previa"
                  className="h-32 w-auto object-cover rounded-md"
                  onError={(e) => {
                    // Si la imagen no carga, mostrar un placeholder
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=256"
                  }}
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.amenities.map((amenity: string) => (
                <span
                  key={amenity}
                  className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(amenity)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Nueva comodidad..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Cancha activa (disponible para reservas)</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => (isNew ? setIsAddingNew(false) : setEditingField(null))}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            {isNew ? "Agregar Campo" : "Guardar Cambios"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administrar Canchas</h1>
            <p className="text-gray-600">Gestiona las canchas disponibles en la plataforma</p>
          </div>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Agregar Campo
          </button>
        </div>

        {/* Search Bar */}
        {!isAddingNew && !editingField && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, tipo o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        )}

        {isAddingNew ? (
          <FieldForm field={newField} onSave={handleAddNew} isNew />
        ) : editingField ? (
          <FieldForm field={editingField} onSave={handleSave} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFields.length > 0 ? (
              filteredFields.map((field) => (
                <div
                  key={field.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${!field.active ? "opacity-70" : ""}`}
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
                    {!field.active && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Inactivo
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{field.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                        <span>
                          {field.location.address}, {field.location.neighborhood}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-400" />
                        <span>{field.players}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-400" />
                        <span>{field.duration} minutos</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                        <span>${field.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {field.amenities.map((amenity, index) => (
                        <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={() => handleToggleActive(field.id)}
                        className={`px-3 py-1 rounded-md text-sm flex items-center ${
                          field.active
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {field.active ? (
                          <>
                            <X className="h-4 w-4 mr-1" />
                            Desactivar
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Activar
                          </>
                        )}
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(field)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(field.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron canchas</h3>
                <p className="text-gray-500 mb-4">
                  No hay canchas que coincidan con tu búsqueda. Intenta con otros términos o agrega una nueva cancha.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminFieldManagement
