"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  ImageIcon,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react"
import { toast } from "react-toastify"
import ImageUploader from "../../components/ImageUploader"

// Tipos
interface Field {
  id: string
  name: string
  type: string
  description: string
  address: string
  city: string
  province: string
  price: number
  images: string[]
  amenities: string[]
  active: boolean
}

interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  available: boolean
}

interface Reservation {
  id: string
  fieldId: string
  fieldName: string
  userName: string
  userEmail: string
  userPhone: string
  date: string
  time: string
  duration: number
  players: number
  price: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

// Datos de ejemplo
const mockFields: Field[] = [
  {
    id: "1",
    name: "Cancha Norte",
    type: "Fútbol 5",
    description: "Cancha de césped sintético con iluminación nocturna",
    address: "Av. Libertador 1234",
    city: "Buenos Aires",
    province: "CABA",
    price: 8500,
    images: [
      "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    amenities: ["Vestuarios", "Iluminación", "Estacionamiento"],
    active: true,
  },
  {
    id: "2",
    name: "Cancha Sur",
    type: "Fútbol 7",
    description: "Cancha de césped sintético techada",
    address: "Calle San Martín 567",
    city: "Córdoba",
    province: "Córdoba",
    price: 10000,
    images: [
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    amenities: ["Vestuarios", "Duchas", "Kiosco"],
    active: true,
  },
  {
    id: "3",
    name: "Cancha Este",
    type: "Fútbol 11",
    description: "Campo al aire libre con vestuarios",
    address: "Ruta 8 km 50",
    city: "Rosario",
    province: "Santa Fe",
    price: 15000,
    images: [
      "https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    amenities: ["Vestuarios", "Iluminación", "Bar"],
    active: false,
  },
]

const mockTimeSlots: Record<string, TimeSlot[]> = {
  "1": [
    { id: "1-1", day: "Lunes", startTime: "18:00", endTime: "19:00", available: true },
    { id: "1-2", day: "Lunes", startTime: "19:00", endTime: "20:00", available: true },
    { id: "1-3", day: "Lunes", startTime: "20:00", endTime: "21:00", available: true },
    { id: "1-4", day: "Lunes", startTime: "21:00", endTime: "22:00", available: true },
    { id: "1-5", day: "Martes", startTime: "18:00", endTime: "19:00", available: true },
    { id: "1-6", day: "Martes", startTime: "19:00", endTime: "20:00", available: false },
    { id: "1-7", day: "Miércoles", startTime: "18:00", endTime: "19:00", available: true },
  ],
  "2": [
    { id: "2-1", day: "Lunes", startTime: "17:00", endTime: "18:30", available: true },
    { id: "2-2", day: "Lunes", startTime: "18:30", endTime: "20:00", available: true },
    { id: "2-3", day: "Martes", startTime: "17:00", endTime: "18:30", available: false },
  ],
  "3": [
    { id: "3-1", day: "Sábado", startTime: "10:00", endTime: "12:00", available: true },
    { id: "3-2", day: "Sábado", startTime: "14:00", endTime: "16:00", available: true },
    { id: "3-3", day: "Domingo", startTime: "10:00", endTime: "12:00", available: true },
  ],
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    fieldId: "1",
    fieldName: "Cancha Norte",
    userName: "Juan Pérez",
    userEmail: "juan@example.com",
    userPhone: "11-1234-5678",
    date: "2025-03-20",
    time: "18:00",
    duration: 60,
    players: 10,
    price: 8500,
    status: "pending",
    createdAt: "2025-03-18T14:30:00",
  },
  {
    id: "2",
    fieldId: "1",
    fieldName: "Cancha Norte",
    userName: "María García",
    userEmail: "maria@example.com",
    userPhone: "11-8765-4321",
    date: "2025-03-21",
    time: "19:00",
    duration: 60,
    players: 8,
    price: 8500,
    status: "confirmed",
    createdAt: "2025-03-17T10:15:00",
  },
  {
    id: "3",
    fieldId: "2",
    fieldName: "Cancha Sur",
    userName: "Carlos López",
    userEmail: "carlos@example.com",
    userPhone: "351-123-4567",
    date: "2025-03-22",
    time: "17:00",
    duration: 90,
    players: 14,
    price: 10000,
    status: "pending",
    createdAt: "2025-03-19T09:45:00",
  },
]

// Componente principal
const ManageFields: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"fields" | "availability" | "reservations" | "statistics">("fields")
  const [fields, setFields] = useState<Field[]>(mockFields)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "cancelled">("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Formulario para campos
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    city: "",
    province: "",
    price: 0,
    images: [] as string[],
    amenities: [] as string[],
  })

  // Formulario para horarios
  const [timeSlotForm, setTimeSlotForm] = useState({
    day: "Lunes",
    startTime: "18:00",
    endTime: "19:00",
    available: true,
  })

  // Redireccionar si no es propietario de campos
  useEffect(() => {
    if (!user?.hasFields) {
      navigate("/")
    }
  }, [user, navigate])

  // Cargar horarios cuando se selecciona un campo
  useEffect(() => {
    if (selectedField) {
      setTimeSlots(mockTimeSlots[selectedField.id] || [])
    }
  }, [selectedField])

  if (!user?.hasFields) {
    return null
  }

  // Filtrar reservas
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchTerm === "" ||
      reservation.fieldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.userName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Estadísticas
  const totalReservations = reservations.length
  const confirmedReservations = reservations.filter((r) => r.status === "confirmed").length
  const pendingReservations = reservations.filter((r) => r.status === "pending").length
  const totalRevenue = reservations
    .filter((r) => r.status === "confirmed")
    .reduce((sum, reservation) => sum + reservation.price, 0)

  // Reservas por campo
  const reservationsByField = fields.map((field) => {
    const fieldReservations = reservations.filter((r) => r.fieldId === field.id)
    return {
      fieldId: field.id,
      fieldName: field.name,
      total: fieldReservations.length,
      confirmed: fieldReservations.filter((r) => r.status === "confirmed").length,
      revenue: fieldReservations
        .filter((r) => r.status === "confirmed")
        .reduce((sum, reservation) => sum + reservation.price, 0),
    }
  })

  // Abrir modal para crear campo
  const openCreateModal = () => {
    setSelectedField(null)
    setFormData({
      name: "",
      type: "",
      description: "",
      address: "",
      city: "",
      province: "",
      price: 0,
      images: [],
      amenities: [],
    })
    setIsModalOpen(true)
  }

  // Abrir modal para editar campo
  const openEditModal = (field: Field) => {
    setSelectedField(field)
    setFormData({
      name: field.name,
      type: field.type,
      description: field.description,
      address: field.address,
      city: field.city,
      province: field.province,
      price: field.price,
      images: field.images,
      amenities: field.amenities,
    })
    setIsModalOpen(true)
  }

  // Abrir modal para eliminar campo
  const openDeleteModal = (field: Field) => {
    setSelectedField(field)
    setIsDeleteModalOpen(true)
  }

  // Abrir modal para gestionar disponibilidad
  const openAvailabilityModal = (field: Field) => {
    setSelectedField(field)
    setTimeSlots(mockTimeSlots[field.id] || [])
    setIsAvailabilityModalOpen(true)
  }

  // Manejar cambios en el formulario de campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (name === "price") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number.parseInt(value) || 0,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }))
    }
  }

  // Manejar cambios en amenities
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((amenity) => amenity !== value),
      }))
    }
  }

  // Manejar cambios en el formulario de horarios
  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setTimeSlotForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  // Manejar cambio de imagen
  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl],
    }))
  }

  // Eliminar imagen
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // Guardar campo
  const handleSubmitField = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedField) {
      // Actualizar campo existente
      const updatedFields = fields.map((field) =>
        field.id === selectedField.id
          ? {
              ...field,
              ...formData,
            }
          : field,
      )
      setFields(updatedFields)
      toast.success("Campo actualizado con éxito")
    } else {
      // Crear nuevo campo
      const newField: Field = {
        id: `${fields.length + 1}`,
        ...formData,
        active: true,
      }
      setFields([...fields, newField])
      toast.success("Campo creado con éxito")
    }

    setIsModalOpen(false)
  }

  // Eliminar campo
  const handleDeleteField = () => {
    if (selectedField) {
      setFields(fields.filter((field) => field.id !== selectedField.id))
      toast.success("Campo eliminado con éxito")
      setIsDeleteModalOpen(false)
    }
  }

  // Activar/desactivar campo
  const toggleFieldStatus = (id: string) => {
    const updatedFields = fields.map((field) => (field.id === id ? { ...field, active: !field.active } : field))
    setFields(updatedFields)

    const field = fields.find((f) => f.id === id)
    if (field) {
      toast.info(`Campo ${field.active ? "desactivado" : "activado"} con éxito`)
    }
  }

  // Agregar horario
  const handleAddTimeSlot = () => {
    if (!selectedField) return

    const newTimeSlot: TimeSlot = {
      id: `${selectedField.id}-${timeSlots.length + 1}`,
      ...timeSlotForm,
    }

    setTimeSlots([...timeSlots, newTimeSlot])
    toast.success("Horario agregado con éxito")
  }

  // Eliminar horario
  const handleDeleteTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
    toast.success("Horario eliminado con éxito")
  }

  // Cambiar disponibilidad de horario
  const toggleTimeSlotAvailability = (id: string) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, available: !slot.available } : slot)))
  }

  // Guardar horarios
  const handleSaveAvailability = () => {
    if (selectedField) {
      // En una aplicación real, aquí se enviarían los datos al servidor
      mockTimeSlots[selectedField.id] = timeSlots
      toast.success("Horarios guardados con éxito")
      setIsAvailabilityModalOpen(false)
    }
  }

  // Aprobar reserva
  const handleApproveReservation = (id: string) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: "confirmed" } : reservation,
      ),
    )
    toast.success("Reserva aprobada con éxito")
  }

  // Rechazar reserva
  const handleRejectReservation = (id: string) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: "cancelled" } : reservation,
      ),
    )
    toast.success("Reserva rechazada")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Canchas</h1>
          <p className="text-gray-600 mt-2">Gestiona tus canchas, disponibilidad, precios y reservas.</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab("fields")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "fields"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Mis Canchas
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "availability"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Gestión de Disponibilidad
              </button>
              <button
                onClick={() => setActiveTab("reservations")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "reservations"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reservas
              </button>
              <button
                onClick={() => setActiveTab("statistics")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "statistics"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Estadísticas
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Mis Canchas */}
          {activeTab === "fields" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Mis Canchas</h2>
                <button
                  onClick={openCreateModal}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Plus size={20} className="mr-2" />
                  Agregar Cancha
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={`border rounded-lg overflow-hidden shadow-md ${
                      field.active ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <ImageIcon
                        src={field.images[0] || "/placeholder.svg"}
                        alt={field.name}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                          field.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {field.active ? "Activa" : "Inactiva"}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{field.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{field.type}</p>
                      <p className="mt-2 text-sm line-clamp-2">{field.description}</p>
                      <p className="text-sm text-gray-600 mt-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {field.address}, {field.city}, {field.province}
                      </p>
                      <p className="text-emerald-600 font-semibold mt-2 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />${field.price.toLocaleString()}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {field.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {amenity}
                          </span>
                        ))}
                        {field.amenities.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            +{field.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex justify-between">
                      <button
                        onClick={() => toggleFieldStatus(field.id)}
                        className={`px-3 py-1 rounded-md ${
                          field.active
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {field.active ? "Desactivar" : "Activar"}
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(field)}
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md flex items-center"
                        >
                          <Pencil size={16} className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => openDeleteModal(field)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {fields.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No tienes canchas registradas</p>
                  <button
                    onClick={openCreateModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                  >
                    <Plus size={20} className="mr-2" />
                    Agregar tu primera cancha
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Gestión de Disponibilidad */}
          {activeTab === "availability" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Disponibilidad</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fields.map((field) => (
                  <div key={field.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
                    <div className="h-32 overflow-hidden relative">
                      <ImageIcon
                        src={field.images[0] || "/placeholder.svg"}
                        alt={field.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{field.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{field.type}</p>
                      <div className="mt-3">
                        <p className="text-sm text-gray-700 mb-1">Horarios configurados:</p>
                        <p className="text-sm text-gray-600">
                          {mockTimeSlots[field.id]?.length || 0} horarios disponibles
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex justify-center">
                      <button
                        onClick={() => openAvailabilityModal(field)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                      >
                        <Calendar size={16} className="mr-2" />
                        Gestionar Disponibilidad
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {fields.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No tienes canchas registradas</p>
                  <button
                    onClick={() => setActiveTab("fields")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                  >
                    <Plus size={20} className="mr-2" />
                    Agregar tu primera cancha
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reservas */}
          {activeTab === "reservations" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-900">Reservas</h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Buscar por nombre o cancha"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64"
                    />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center justify-between w-full sm:w-48 px-4 py-2 bg-white border border-gray-300 rounded-md"
                    >
                      <div className="flex items-center">
                        <Filter size={18} className="mr-2 text-gray-500" />
                        <span>
                          {filterStatus === "all"
                            ? "Todos los estados"
                            : filterStatus === "pending"
                              ? "Pendientes"
                              : filterStatus === "confirmed"
                                ? "Confirmadas"
                                : "Canceladas"}
                        </span>
                      </div>
                      {isFilterOpen ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </button>

                    {isFilterOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                        <button
                          onClick={() => {
                            setFilterStatus("all")
                            setIsFilterOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Todos los estados
                        </button>
                        <button
                          onClick={() => {
                            setFilterStatus("pending")
                            setIsFilterOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Pendientes
                        </button>
                        <button
                          onClick={() => {
                            setFilterStatus("confirmed")
                            setIsFilterOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Confirmadas
                        </button>
                        <button
                          onClick={() => {
                            setFilterStatus("cancelled")
                            setIsFilterOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Canceladas
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cancha
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha y Hora
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{reservation.fieldName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">{reservation.userName}</div>
                          <div className="text-sm text-gray-500">{reservation.userEmail}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">{new Date(reservation.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">
                            {reservation.time} ({reservation.duration} min)
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-emerald-600">
                            ${reservation.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reservation.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : reservation.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reservation.status === "confirmed"
                              ? "Confirmada"
                              : reservation.status === "pending"
                                ? "Pendiente"
                                : "Cancelada"}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveReservation(reservation.id)}
                              disabled={reservation.status !== "pending"}
                              className={`text-green-600 hover:text-green-900 ${
                                reservation.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleRejectReservation(reservation.id)}
                              disabled={reservation.status !== "pending"}
                              className={`text-red-600 hover:text-red-900 ${
                                reservation.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              <XCircle size={18} />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredReservations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No se encontraron reservas</p>
                </div>
              )}
            </div>
          )}

          {/* Estadísticas */}
          {activeTab === "statistics" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Estadísticas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{totalReservations}</h3>
                  <p className="text-gray-600">Reservas Totales</p>
                </div>

                <div className="bg-white rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{confirmedReservations}</h3>
                  <p className="text-gray-600">Reservas Confirmadas</p>
                </div>

                <div className="bg-white rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{pendingReservations}</h3>
                  <p className="text-gray-600">Reservas Pendientes</p>
                </div>

                <div className="bg-white rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
                  <p className="text-gray-600">Ingresos Totales</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Cancha</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cancha
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reservas Totales
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reservas Confirmadas
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingresos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reservationsByField.map((fieldStat) => (
                      <tr key={fieldStat.fieldId} className="hover:bg-gray-50">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{fieldStat.fieldName}</div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{fieldStat.total}</div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{fieldStat.confirmed}</div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-emerald-600">
                            ${fieldStat.revenue.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear/editar campos */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{selectedField ? "Editar Cancha" : "Crear Nueva Cancha"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitField} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Cancha</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Cancha</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Fútbol 5">Fútbol 5</option>
                    <option value="Fútbol 7">Fútbol 7</option>
                    <option value="Fútbol 11">Fútbol 11</option>
                    <option value="Pádel">Pádel</option>
                    <option value="Tenis">Tenis</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Provincia</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Precio por hora ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="0"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Imágenes</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <ImageIcon
                        src={image || "/placeholder.svg"}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {formData.images.length < 5 && (
                    <div className="w-full">
                      <ImageUploader onImageChange={handleImageChange} />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">Puedes subir hasta 5 imágenes</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Comodidades</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Vestuarios", "Duchas", "Iluminación", "Estacionamiento", "Bar", "Kiosco", "Wifi", "Tribunas"].map(
                    (amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          value={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={handleAmenityChange}
                          className="mr-2"
                        />
                        <span>{amenity}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md">
                  {selectedField ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para eliminar campo */}
      {isDeleteModalOpen && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
              <p className="mb-6">
                ¿Estás seguro de que deseas eliminar la cancha <strong>{selectedField.name}</strong>? Esta acción no se
                puede deshacer.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteField}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para gestionar disponibilidad */}
      {isAvailabilityModalOpen && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Gestionar Disponibilidad - {selectedField.name}</h2>
              <button onClick={() => setIsAvailabilityModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Horario</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Día</label>
                    <select
                      name="day"
                      value={timeSlotForm.day}
                      onChange={handleTimeSlotChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Lunes">Lunes</option>
                      <option value="Martes">Martes</option>
                      <option value="Miércoles">Miércoles</option>
                      <option value="Jueves">Jueves</option>
                      <option value="Viernes">Viernes</option>
                      <option value="Sábado">Sábado</option>
                      <option value="Domingo">Domingo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Hora de inicio</label>
                    <input
                      type="time"
                      name="startTime"
                      value={timeSlotForm.startTime}
                      onChange={handleTimeSlotChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Hora de fin</label>
                    <input
                      type="time"
                      name="endTime"
                      value={timeSlotForm.endTime}
                      onChange={handleTimeSlotChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddTimeSlot}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md w-full"
                    >
                      Agregar Horario
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Horarios Configurados</h3>
                {timeSlots.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Día
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hora de inicio
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hora de fin
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {timeSlots.map((slot) => (
                          <tr key={slot.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{slot.day}</div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{slot.startTime}</div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{slot.endTime}</div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  slot.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {slot.available ? "Disponible" : "No disponible"}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => toggleTimeSlotAvailability(slot.id)}
                                  className={`${
                                    slot.available
                                      ? "text-yellow-600 hover:text-yellow-900"
                                      : "text-green-600 hover:text-green-900"
                                  }`}
                                >
                                  {slot.available ? "Deshabilitar" : "Habilitar"}
                                </button>
                                <button
                                  onClick={() => handleDeleteTimeSlot(slot.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No hay horarios configurados</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAvailabilityModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveAvailability}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageFields
