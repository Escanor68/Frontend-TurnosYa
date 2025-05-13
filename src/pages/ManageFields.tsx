import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, Users, Trash2, Plus, Edit2, Eye, X, Save, Upload, MapPin, DollarSign } from "lucide-react";
import { toast } from "react-toastify";

// Types
interface Field {
  id: number;
  name: string;
  description: string;
  location: {
    address: string;
    neighborhood: string;
    city: string;
  };
  type: string;
  price: number;
  image: string;
  amenities: string[];
  duration: number;
  players: string;
  availability?: {
    day: string;
    slots: {
      time: string;
      available: boolean;
    }[];
  }[];
}

interface Booking {
  id: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: number;
  paymentMethod: string;
  createdAt: string;
}

const ManageFields: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"fields" | "bookings" | "settings">("fields");
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [isEditFieldModalOpen, setIsEditFieldModalOpen] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<number | null>(null);

  // Form state
  const [fieldForm, setFieldForm] = useState<Omit<Field, "id">>({
    name: "",
    description: "",
    location: {
      address: "",
      neighborhood: "",
      city: "",
    },
    type: "Fútbol 5",
    price: 9000,
    image: "",
    amenities: [],
    duration: 60,
    players: "5 vs 5",
  });

  // Mock data
  const [fields, setFields] = useState<Field[]>([
    {
      id: 5,
      name: "Cancha El Monumental",
      description: "Cancha de fútbol 7 con césped sintético de alta calidad, iluminación LED y vestuarios amplios.",
      location: {
        address: "Av. Rivadavia 5000",
        neighborhood: "Caballito",
        city: "Buenos Aires",
      },
      type: "Fútbol 7",
      price: 11500,
      image: "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      amenities: ["Césped sintético", "Iluminación", "Vestuarios", "Cantina"],
      duration: 60,
      players: "7 vs 7",
      availability: [
        {
          day: "2025-06-01",
          slots: [
            { time: "18:00", available: true },
            { time: "19:00", available: false },
            { time: "20:00", available: true },
            { time: "21:00", available: false },
            { time: "22:00", available: true },
          ],
        },
        {
          day: "2025-06-02",
          slots: [
            { time: "18:00", available: true },
            { time: "19:00", available: true },
            { time: "20:00", available: false },
            { time: "21:00", available: true },
            { time: "22:00", available: true },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Complejo Maradona",
      description: "Complejo deportivo con 2 canchas de fútbol 5, césped sintético y excelente iluminación para partidos nocturnos.",
      location: {
        address: "Av. Corrientes 3200",
        neighborhood: "Villa Crespo",
        city: "Buenos Aires",
      },
      type: "Fútbol 5",
      price: 8200,
      image: "https://images.pexels.com/photos/186230/pexels-photo-186230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      amenities: ["Césped sintético", "Iluminación", "Bebidas"],
      duration: 60,
      players: "5 vs 5",
      availability: [
        {
          day: "2025-06-01",
          slots: [
            { time: "18:00", available: false },
            { time: "19:00", available: true },
            { time: "20:00", available: true },
            { time: "21:00", available: true },
            { time: "22:00", available: false },
          ],
        },
      ],
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      userId: "user1",
      userName: "Juan Pérez",
      userEmail: "juan@example.com",
      userPhone: "11-1234-5678",
      date: "2025-06-01",
      time: "20:00",
      status: "confirmed",
      price: 11500,
      paymentMethod: "mercadopago",
      createdAt: "2025-05-30T15:30:00",
    },
    {
      id: 2,
      userId: "user2",
      userName: "María García",
      userEmail: "maria@example.com",
      userPhone: "11-8765-4321",
      date: "2025-06-01",
      time: "22:00",
      status: "pending",
      price: 11500,
      paymentMethod: "transfer",
      createdAt: "2025-05-30T16:45:00",
    },
    {
      id: 3,
      userId: "user3",
      userName: "Carlos López",
      userEmail: "carlos@example.com",
      userPhone: "11-5555-5555",
      date: "2025-06-02",
      time: "19:00",
      status: "confirmed",
      price: 8200,
      paymentMethod: "mercadopago",
      createdAt: "2025-05-29T10:15:00",
    },
    {
      id: 4,
      userId: "user4",
      userName: "Ana Martínez",
      userEmail: "ana@example.com",
      userPhone: "11-4444-4444",
      date: "2025-05-30",
      time: "21:00",
      status: "completed",
      price: 8200,
      paymentMethod: "mercadopago",
      createdAt: "2025-05-28T14:20:00",
    },
  ]);

  // Filter bookings by field if a field is selected
  const filteredBookings = selectedFieldId
    ? bookings.filter((booking) => {
        const field = fields.find((f) => f.id === selectedFieldId);
        return booking.price === field?.price; // This is a mock logic since we don't have fieldId in bookings
      })
    : bookings;

  useEffect(() => {
    // Check if user has fields
    if (!user?.hasFields) {
      navigate("/");
      return;
    }

    // Check URL params for field editing
    const params = new URLSearchParams(location.search);
    const fieldId = params.get("fieldId");
    if (fieldId) {
      const id = parseInt(fieldId);
      setSelectedFieldId(id);
      const field = fields.find((f) => f.id === id);
      if (field) {
        setFieldForm({
          name: field.name,
          description: field.description,
          location: { ...field.location },
          type: field.type,
          price: field.price,
          image: field.image,
          amenities: [...field.amenities],
          duration: field.duration,
          players: field.players,
        });
        setIsEditFieldModalOpen(true);
      }
    }
  }, [user, navigate, location.search, fields]);

  const openAddFieldModal = () => {
    setFieldForm({
      name: "",
      description: "",
      location: {
        address: "",
        neighborhood: "",
        city: "Buenos Aires",
      },
      type: "Fútbol 5",
      price: 9000,
      image: "",
      amenities: [],
      duration: 60,
      players: "5 vs 5",
    });
    setIsAddFieldModalOpen(true);
  };

  const openEditFieldModal = (fieldId: number) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      setSelectedFieldId(fieldId);
      setFieldForm({
        name: field.name,
        description: field.description,
        location: { ...field.location },
        type: field.type,
        price: field.price,
        image: field.image,
        amenities: [...field.amenities],
        duration: field.duration,
        players: field.players,
      });
      setIsEditFieldModalOpen(true);
    }
  };

  const openAvailabilityModal = (fieldId: number) => {
    setSelectedFieldId(fieldId);
    setIsAvailabilityModalOpen(true);
  };

  const closeModals = () => {
    setIsAddFieldModalOpen(false);
    setIsEditFieldModalOpen(false);
    setIsAvailabilityModalOpen(false);
    setIsConfirmationModalOpen(false);
    setSelectedFieldId(null);
    setFieldToDelete(null);
  };

  const confirmDeleteField = (fieldId: number) => {
    setFieldToDelete(fieldId);
    setIsConfirmationModalOpen(true);
  };

  const deleteField = () => {
    if (fieldToDelete) {
      setFields(fields.filter((field) => field.id !== fieldToDelete));
      toast.success("Cancha eliminada correctamente");
      closeModals();
    }
  };

  const handleFieldFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFieldForm({
        ...fieldForm,
        [parent]: {
          ...fieldForm[parent as keyof typeof fieldForm],
          [child]: value,
        },
      });
    } else {
      setFieldForm({
        ...fieldForm,
        [name]: value,
      });
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (fieldForm.amenities.includes(amenity)) {
      setFieldForm({
        ...fieldForm,
        amenities: fieldForm.amenities.filter((a) => a !== amenity),
      });
    } else {
      setFieldForm({
        ...fieldForm,
        amenities: [...fieldForm.amenities, amenity],
      });
    }
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    const newField: Field = {
      id: Math.max(...fields.map((f) => f.id), 0) + 1,
      ...fieldForm,
    };
    setFields([...fields, newField]);
    toast.success("Cancha agregada correctamente");
    closeModals();
  };

  const handleUpdateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFieldId) {
      setFields(
        fields.map((field) =>
          field.id === selectedFieldId
            ? {
                ...field,
                ...fieldForm,
              }
            : field
        )
      );
      toast.success("Cancha actualizada correctamente");
      closeModals();
    }
  };

  const toggleAvailability = (day: string, time: string) => {
    if (!selectedFieldId) return;

    setFields(
      fields.map((field) => {
        if (field.id !== selectedFieldId) return field;

        const updatedAvailability = field.availability ? [...field.availability] : [];
        const dayIndex = updatedAvailability.findIndex((d) => d.day === day);

        if (dayIndex === -1) {
          // If day doesn't exist, add it
          updatedAvailability.push({
            day,
            slots: [{ time, available: true }],
          });
        } else {
          const slotIndex = updatedAvailability[dayIndex].slots.findIndex((s) => s.time === time);
          if (slotIndex === -1) {
            // If slot doesn't exist, add it
            updatedAvailability[dayIndex].slots.push({ time, available: true });
          } else {
            // Toggle availability
            updatedAvailability[dayIndex].slots[slotIndex].available = !updatedAvailability[dayIndex].slots[slotIndex].available;
          }
        }

        return {
          ...field,
          availability: updatedAvailability,
        };
      })
    );
  };

  const updateBookingStatus = (bookingId: number, status: "confirmed" | "completed" | "cancelled") => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status,
            }
          : booking
      )
    );
    toast.success(`Estado de la reserva actualizado a: ${status}`);
  };

  if (!user?.hasFields) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Canchas</h1>
          <p className="text-gray-600 mt-2">Gestiona tus canchas, disponibilidad y reservas.</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("fields")}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === "fields"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mis Canchas
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === "bookings"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reservas
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === "settings"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Configuración
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Fields Tab */}
            {activeTab === "fields" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Mis Canchas</h2>
                  <button
                    onClick={openAddFieldModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Agregar Cancha
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48">
                        <img src={field.image} alt={field.name} className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                          {field.type}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{field.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{field.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {field.amenities.map((amenity, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Duración</p>
                              <p className="font-medium">{field.duration} min</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-emerald-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Jugadores</p>
                              <p className="font-medium">{field.players}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Ubicación</p>
                              <p className="font-medium">{field.location.neighborhood}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Precio</p>
                              <p className="font-medium">${field.price}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openEditFieldModal(field.id)}
                            className="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Editar
                          </button>
                          <button
                            onClick={() => openAvailabilityModal(field.id)}
                            className="flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Disponibilidad
                          </button>
                          <button
                            onClick={() => confirmDeleteField(field.id)}
                            className="flex items-center px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {fields.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Plus className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">No tienes canchas registradas</p>
                    <button
                      onClick={openAddFieldModal}
                      className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Agregar tu primera cancha
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Reservas</h2>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por cancha</label>
                      <select
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 px-3"
                        value={selectedFieldId || ""}
                        onChange={(e) => setSelectedFieldId(e.target.value ? parseInt(e.target.value) : null)}
                      >
                        <option value="">Todas las canchas</option>
                        {fields.map((field) => (
                          <option key={field.id} value={field.id}>
                            {field.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-64">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                      <select
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 px-3"
                      >
                        <option value="">Todos los estados</option>
                        <option value="pending">Pendiente</option>
                        <option value="confirmed">Confirmada</option>
                        <option value="completed">Completada</option>
                        <option value="cancelled">Cancelada</option>
                      </select>
                    </div>
                    <div className="w-full md:w-64">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 px-3"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha / Hora
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cancha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBookings.map((booking) => {
                          const field = fields.find((f) => f.price === booking.price); // Mock relationship
                          return (
                            <tr key={booking.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                                <div className="text-sm text-gray-500">{booking.userEmail}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(booking.date).toLocaleDateString("es-AR")}
                                </div>
                                <div className="text-sm text-gray-500">{booking.time}hs</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{field?.name || "Cancha no disponible"}</div>
                                <div className="text-sm text-gray-500">{field?.type || ""}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">${booking.price}</div>
                                <div className="text-xs text-gray-500">
                                  {booking.paymentMethod === "mercadopago" ? "Mercado Pago" : "Transferencia"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : booking.status === "completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {booking.status === "confirmed"
                                    ? "Confirmada"
                                    : booking.status === "pending"
                                    ? "Pendiente"
                                    : booking.status === "completed"
                                    ? "Completada"
                                    : "Cancelada"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  {booking.status === "pending" && (
                                    <button
                                      onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                      className="text-green-600 hover:text-green-900"
                                    >
                                      Confirmar
                                    </button>
                                  )}
                                  {(booking.status === "pending" || booking.status === "confirmed") && (
                                    <button
                                      onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      Cancelar
                                    </button>
                                  )}
                                  {booking.status === "confirmed" && (
                                    <button
                                      onClick={() => updateBookingStatus(booking.id, "completed")}
                                      className="text-blue-600 hover:text-blue-900"
                                    >
                                      Completar
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {filteredBookings.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg mt-4">
                      <p className="text-gray-600">No hay reservas para mostrar</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración</h2>
                <p className="text-gray-600">Proximamente: Configuración de horarios, precios y notificaciones.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Field Modal */}
      {isAddFieldModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Agregar Nueva Cancha</h3>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddField}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Cancha
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={fieldForm.name}
                      onChange={handleFieldFormChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ej: Complejo Deportivo El Goleador"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={fieldForm.description}
                      onChange={handleFieldFormChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Describe tu cancha, instalaciones, etc."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="location.address"
                        name="location.address"
                        required
                        value={fieldForm.location.address}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Av. Ejemplo 1234"
                      />
                    </div>
                    <div>
                      <label htmlFor="location.neighborhood" className="block text-sm font-medium text-gray-700 mb-2">
                        Barrio
                      </label>
                      <input
                        type="text"
                        id="location.neighborhood"
                        name="location.neighborhood"
                        required
                        value={fieldForm.location.neighborhood}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Ej: Palermo"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Cancha
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={fieldForm.type}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Fútbol 5">Fútbol 5</option>
                        <option value="Fútbol 7">Fútbol 7</option>
                        <option value="Fútbol 11">Fútbol 11</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Precio (ARS)
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        min="0"
                        value={fieldForm.price}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duración (minutos)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        required
                        min="30"
                        step="30"
                        value={fieldForm.duration}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      URL de la Imagen
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      required
                      value={fieldForm.image}
                      onChange={handleFieldFormChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ingresa la URL de una imagen representativa de tu cancha
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Césped sintético",
                        "Iluminación",
                        "Vestuarios",
                        "Estacionamiento",
                        "Bar",
                        "WiFi",
                        "Duchas",
                        "Cantina",
                      ].map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            fieldForm.amenities.includes(amenity)
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModals}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Guardar Cancha
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Field Modal - Same as Add but with different title and submit handler */}
      {isEditFieldModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Editar Cancha</h3>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateField}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Cancha
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      name="name"
                      required
                      value={fieldForm.name}
                      onChange={handleFieldFormChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      id="edit-description"
                      name="description"
                      required
                      value={fieldForm.description}
                      onChange={handleFieldFormChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-location.address" className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="edit-location.address"
                        name="location.address"
                        required
                        value={fieldForm.location.address}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-location.neighborhood" className="block text-sm font-medium text-gray-700 mb-2">
                        Barrio
                      </label>
                      <input
                        type="text"
                        id="edit-location.neighborhood"
                        name="location.neighborhood"
                        required
                        value={fieldForm.location.neighborhood}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="edit-type" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Cancha
                      </label>
                      <select
                        id="edit-type"
                        name="type"
                        required
                        value={fieldForm.type}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Fútbol 5">Fútbol 5</option>
                        <option value="Fútbol 7">Fútbol 7</option>
                        <option value="Fútbol 11">Fútbol 11</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-2">
                        Precio (ARS)
                      </label>
                      <input
                        type="number"
                        id="edit-price"
                        name="price"
                        required
                        min="0"
                        value={fieldForm.price}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duración (minutos)
                      </label>
                      <input
                        type="number"
                        id="edit-duration"
                        name="duration"
                        required
                        min="30"
                        step="30"
                        value={fieldForm.duration}
                        onChange={handleFieldFormChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mb-2">
                      URL de la Imagen
                    </label>
                    <input
                      type="url"
                      id="edit-image"
                      name="image"
                      required
                      value={fieldForm.image}
                      onChange={handleFieldFormChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Césped sintético",
                        "Iluminación",
                        "Vestuarios",
                        "Estacionamiento",
                        "Bar",
                        "WiFi",
                        "Duchas",
                        "Cantina",
                      ].map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            fieldForm.amenities.includes(amenity)
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModals}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {isAvailabilityModalOpen && selectedFieldId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Gestionar Disponibilidad
                  <span className="text-emerald-600 ml-2">
                    {fields.find((f) => f.id === selectedFieldId)?.name}
                  </span>
                </h3>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    defaultValue="2025-06-01"
                  />
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                    Agregar Fecha
                  </button>
                </div>

                <div className="space-y-6">
                  {fields
                    .find((f) => f.id === selectedFieldId)
                    ?.availability?.map((day) => (
                      <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium text-gray-800">
                            {new Date(day.day).toLocaleDateString("es-AR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h4>
                          <button className="text-gray-500 hover:text-gray-700">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {["18:00", "19:00", "20:00", "21:00", "22:00"].map((time) => {
                            const slot = day.slots.find((s) => s.time === time);
                            const isAvailable = slot ? slot.available : false;

                            return (
                              <button
                                key={time}
                                onClick={() => toggleAvailability(day.day, time)}
                                className={`py-2 px-3 rounded-lg text-center transition-colors ${
                                  isAvailable
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
                <p className="text-gray-600">
                  ¿Estás seguro de que deseas eliminar esta cancha? Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={deleteField}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFields;