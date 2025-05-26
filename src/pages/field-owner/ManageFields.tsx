"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  ImageIcon,
} from "lucide-react"
import { mockSportFields } from "../../services/mockData"
import type { SportField } from "../../types"
import { LoadingSpinner } from "../../components/common/LoadingSpinner"
import { FormField } from "../../components/ui/FormField"
import React from "react"

// Componente para gestionar campos deportivos (para propietarios)
const ManageFields: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [fields, setFields] = useState<SportField[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [currentField, setCurrentField] = useState<SportField | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [expandedField, setExpandedField] = useState<string | null>(null)

  // Estado para el formulario de campo
  const [formData, setFormData] = useState({
    name: "",
    type: "Fútbol 5",
    price: 0,
    duration: 60,
    players: "",
    image: "",
    hasAdditionalServices: false,
    address: "",
    city: "",
    province: "",
    amenities: [] as string[],
    description: "",
  })

  // Opciones para el formulario
  const fieldTypes = ["Fútbol 5", "Fútbol 7", "Fútbol 11", "Futsal", "Fútbol Playa"]
  const amenitiesOptions = [
    "Vestuarios",
    "Duchas",
    "Estacionamiento",
    "Bar",
    "WiFi",
    "Iluminación",
    "Césped sintético",
    "Césped natural",
    "Tribunas",
    "Parrilla",
  ]

  // Cargar campos del propietario
  useEffect(() => {
    const loadFields = async () => {
      try {
        setLoading(true)
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 800))

        // En una app real, esto sería una llamada a API para obtener los campos del propietario
        const ownerFields = mockSportFields.filter((field) => field.ownerId === user?.id)
        setFields(ownerFields)
      } catch (error) {
        console.error("Error loading fields:", error)
        toast.error("Error al cargar los campos")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadFields()
    }
  }, [user])

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      })
    } else if (name === "price" || name === "duration") {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : Number.parseInt(value, 10),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Manejar selección de amenidades
  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== amenity),
        }
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity],
        }
      }
    })
  }

  // Abrir formulario para añadir campo
  const handleAddField = () => {
    setFormData({
      name: "",
      type: "Fútbol 5",
      price: 0,
      duration: 60,
      players: "",
      image: "",
      hasAdditionalServices: false,
      address: "",
      city: "",
      province: "",
      amenities: [],
      description: "",
    })
    setShowAddForm(true)
    setShowEditForm(false)
  }

  // Abrir formulario para editar campo
  const handleEditField = (field: SportField) => {
    setCurrentField(field)
    setFormData({
      name: field.name,
      type: field.type,
      price: field.price,
      duration: field.duration,
      players: field.players,
      image: field.image,
      hasAdditionalServices: field.hasAdditionalServices,
      address: field.location.address,
      city: field.location.city,
      province: field.location.province,
      amenities: field.amenities || [],
      description: field.description || "",
    })
    setShowEditForm(true)
    setShowAddForm(false)
  }

  // Manejar envío del formulario para añadir campo
  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validar formulario
      if (!formData.name || !formData.type || !formData.price || !formData.address || !formData.city) {
        toast.error("Por favor completa todos los campos obligatorios")
        return
      }

      setLoading(true)

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Crear nuevo campo
      const newField: SportField = {
        id: `field-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        price: formData.price,
        duration: formData.duration,
        players:
          formData.players ||
          `${formData.type === "Fútbol 5" ? "5 vs 5" : formData.type === "Fútbol 7" ? "7 vs 7" : "11 vs 11"}`,
        image:
          formData.image || "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg",
        hasAdditionalServices: formData.hasAdditionalServices,
        location: {
          address: formData.address,
          city: formData.city,
          province: formData.province,
        },
        ownerId: user?.id,
        amenities: formData.amenities,
        description: formData.description,
      }

      // Actualizar estado
      setFields((prev) => [...prev, newField])
      setShowAddForm(false)
      toast.success("Campo añadido correctamente")
    } catch (error) {
      console.error("Error adding field:", error)
      toast.error("Error al añadir el campo")
    } finally {
      setLoading(false)
    }
  }

  // Manejar envío del formulario para editar campo
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentField) return

    try {
      // Validar formulario
      if (!formData.name || !formData.type || !formData.price || !formData.address || !formData.city) {
        toast.error("Por favor completa todos los campos obligatorios")
        return
      }

      setLoading(true)

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar campo
      const updatedField: SportField = {
        ...currentField,
        name: formData.name,
        type: formData.type,
        price: formData.price,
        duration: formData.duration,
        players: formData.players,
        image: formData.image,
        hasAdditionalServices: formData.hasAdditionalServices,
        location: {
          address: formData.address,
          city: formData.city,
          province: formData.province,
        },
        amenities: formData.amenities,
        description: formData.description,
      }

      // Actualizar estado
      setFields((prev) => prev.map((field) => (field.id === currentField.id ? updatedField : field)))
      setShowEditForm(false)
      setCurrentField(null)
      toast.success("Campo actualizado correctamente")
    } catch (error) {
      console.error("Error updating field:", error)
      toast.error("Error al actualizar el campo")
    } finally {
      setLoading(false)
    }
  }

  // Manejar eliminación de campo
  const handleDeleteField = async (fieldId: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este campo?")) return

    try {
      setLoading(true)

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar estado
      setFields((prev) => prev.filter((field) => field.id !== fieldId))
      toast.success("Campo eliminado correctamente")
    } catch (error) {
      console.error("Error deleting field:", error)
      toast.error("Error al eliminar el campo")
    } finally {
      setLoading(false)
    }
  }

  // Manejar ordenamiento
  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(key)
      setSortDirection("asc")
    }
  }

  // Filtrar y ordenar campos
  const filteredAndSortedFields = fields
    .filter((field) => field.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "type") {
        comparison = a.type.localeCompare(b.type)
      } else if (sortBy === "price") {
        comparison = a.price - b.price
      } else if (sortBy === "location") {
        comparison = a.location.city.localeCompare(b.location.city)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  // Verificar si el usuario tiene campos
  const hasFields = fields.length > 0

  // Renderizar contenido basado en el estado
  if (loading && fields.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Si el usuario no tiene campos, mostrar mensaje
  if (!hasFields && !showAddForm) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center py-8">
          <div className="bg-emerald-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <MapPin className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Aún no tienes canchas registradas</h2>
          <p className="text-gray-600 mb-6">
            Comienza a registrar tus canchas para que los usuarios puedan reservarlas.
          </p>
          <button
            onClick={handleAddField}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Añadir mi primera cancha
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Mis Canchas</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cancha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
            />
          </div>
          <button
            onClick={handleAddField}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Añadir Cancha
          </button>
        </div>
      </div>

      {/* Formulario para añadir cancha */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Añadir Nueva Cancha</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmitAdd} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Nombre de la cancha"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <FormField
                label="Tipo de cancha"
                name="type"
                as="select"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </FormField>

              <FormField
                label="Precio por turno (ARS)"
                name="price"
                type="number"
                value={formData.price.toString()}
                onChange={handleInputChange}
                required
                min={0}
              />

              <FormField
                label="Duración del turno (minutos)"
                name="duration"
                type="number"
                value={formData.duration.toString()}
                onChange={handleInputChange}
                required
                min={30}
                max={180}
              />

              <FormField
                label="Jugadores"
                name="players"
                value={formData.players}
                onChange={handleInputChange}
                placeholder="Ej: 5 vs 5"
                helpText="Formato recomendado (ej: 5 vs 5, 7 vs 7, 11 vs 11)"
              />

              <FormField
                label="URL de imagen"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                icon={<ImageIcon className="h-5 w-5" />}
              />

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasAdditionalServices"
                    checked={formData.hasAdditionalServices}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Ofrece servicios adicionales</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <FormField
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    icon={<MapPin className="h-5 w-5" />}
                  />
                </div>

                <FormField label="Ciudad" name="city" value={formData.city} onChange={handleInputChange} required />

                <FormField
                  label="Provincia"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comodidades</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <FormField
                label="Descripción"
                name="description"
                as="textarea"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                helpText="Describe las características de tu cancha, reglas especiales, etc."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="white" className="mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Guardar Cancha
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario para editar cancha */}
      {showEditForm && currentField && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Editar Cancha</h2>
            <button
              onClick={() => setShowEditForm(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmitEdit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Nombre de la cancha"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <FormField
                label="Tipo de cancha"
                name="type"
                as="select"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </FormField>

              <FormField
                label="Precio por turno (ARS)"
                name="price"
                type="number"
                value={formData.price.toString()}
                onChange={handleInputChange}
                required
                min={0}
              />

              <FormField
                label="Duración del turno (minutos)"
                name="duration"
                type="number"
                value={formData.duration.toString()}
                onChange={handleInputChange}
                required
                min={30}
                max={180}
              />

              <FormField
                label="Jugadores"
                name="players"
                value={formData.players}
                onChange={handleInputChange}
                placeholder="Ej: 5 vs 5"
                helpText="Formato recomendado (ej: 5 vs 5, 7 vs 7, 11 vs 11)"
              />

              <FormField
                label="URL de imagen"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                icon={<ImageIcon className="h-5 w-5" />}
              />

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasAdditionalServices"
                    checked={formData.hasAdditionalServices}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Ofrece servicios adicionales</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <FormField
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    icon={<MapPin className="h-5 w-5" />}
                  />
                </div>

                <FormField label="Ciudad" name="city" value={formData.city} onChange={handleInputChange} required />

                <FormField
                  label="Provincia"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comodidades</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <FormField
                label="Descripción"
                name="description"
                as="textarea"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                helpText="Describe las características de tu cancha, reglas especiales, etc."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="white" className="mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de canchas */}
      {hasFields && !showAddForm && !showEditForm && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Nombre
                      {sortBy === "name" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("type")}
                  >
                    <div className="flex items-center">
                      Tipo
                      {sortBy === "type" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center">
                      Precio
                      {sortBy === "price" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("location")}
                  >
                    <div className="flex items-center">
                      Ubicación
                      {sortBy === "location" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedFields.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron canchas con ese nombre
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedFields.map((field) => (
                    <React.Fragment key={field.id}>
                      <tr
                        className={`hover:bg-gray-50 ${expandedField === field.id ? "bg-gray-50" : ""}`}
                        onClick={() => setExpandedField(expandedField === field.id ? null : field.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={field.image || "/placeholder.svg"}
                                alt={field.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{field.name}</div>
                              <div className="text-sm text-gray-500">{field.players}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{field.type}</div>
                          <div className="text-sm text-gray-500">{field.duration} min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-emerald-600">${field.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{field.location.city}</div>
                          <div className="text-sm text-gray-500">{field.location.province}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditField(field)
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteField(field.id)
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedField === field.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Detalles</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                    Duración: {field.duration} minutos
                                  </li>
                                  <li className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                                    Jugadores: {field.players}
                                  </li>
                                  {field.rating && (
                                    <li className="flex items-center">
                                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                                      Calificación: {field.rating}/5
                                    </li>
                                  )}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Ubicación</h4>
                                <p className="text-sm text-gray-600">{field.location.address}</p>
                                <p className="text-sm text-gray-600">
                                  {field.location.city}, {field.location.province}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Comodidades</h4>
                                {field.amenities && field.amenities.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {field.amenities.map((amenity) => (
                                      <span
                                        key={amenity}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500">No se especificaron comodidades</p>
                                )}
                              </div>
                              {field.description && (
                                <div className="md:col-span-3 mt-2">
                                  <h4 className="text-sm font-medium text-gray-900 mb-1">Descripción</h4>
                                  <p className="text-sm text-gray-600">{field.description}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageFields
