import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Calendar, MapPin, Edit2, Save, X, MessageSquare, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Types
interface Booking {
  id: number;
  field: string;
  fieldId: number;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  hasReview: boolean;
}

interface Review {
  id: number;
  fieldId: number;
  fieldName: string;
  date: string;
  rating: number;
  comment: string;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'bookings' | 'reviews' | 'fields'>('info');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<number | null>(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
  });
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '11-1234-5678',
    address: 'Av. del Libertador 4567, Buenos Aires',
    birthdate: '1990-01-01'
  });

  // Mock data for bookings and reviews
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      field: 'Complejo Deportivo Goleador',
      fieldId: 1,
      date: '2025-06-01',
      time: '19:00',
      status: 'confirmed',
      hasReview: false
    },
    {
      id: 2,
      field: 'La Bombonerita',
      fieldId: 3,
      date: '2025-05-25',
      time: '20:00',
      status: 'completed',
      hasReview: false
    },
    {
      id: 3,
      field: 'Complejo River',
      fieldId: 4,
      date: '2025-05-18',
      time: '18:00',
      status: 'completed',
      hasReview: true
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      fieldId: 4,
      fieldName: 'Complejo River',
      date: '2025-05-19',
      rating: 4,
      comment: 'Excelente cancha, muy bien mantenida. El personal es muy amable.'
    }
  ]);

  const [ownedFields, setOwnedFields] = useState([
    {
      id: 5,
      name: 'Cancha El Monumental',
      location: 'Caballito, Buenos Aires',
      type: 'Fútbol 7',
      bookingsThisMonth: 24,
      revenue: 276000,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      name: 'Complejo Maradona',
      location: 'Villa Crespo, Buenos Aires',
      type: 'Fútbol 5',
      bookingsThisMonth: 18,
      revenue: 147600,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/186230/pexels-photo-186230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  ]);

  useEffect(() => {
    // Check if user has fields and set the relevant tab
    if (user?.hasFields && window.location.hash === '#fields') {
      setActiveTab('fields');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the user profile
    toast.success('Perfil actualizado correctamente');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '11-1234-5678',
      address: 'Av. del Libertador 4567, Buenos Aires',
      birthdate: '1990-01-01'
    });
    setIsEditing(false);
  };

  const openReviewModal = (bookingId: number) => {
    setCurrentBookingId(bookingId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setCurrentBookingId(null);
    setReviewData({ rating: 5, comment: '' });
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmit = () => {
    // Find the booking
    const booking = bookings.find(b => b.id === currentBookingId);
    if (!booking) return;

    // Create a new review
    const newReview: Review = {
      id: reviews.length + 1,
      fieldId: booking.fieldId,
      fieldName: booking.field,
      date: new Date().toISOString().split('T')[0],
      rating: reviewData.rating,
      comment: reviewData.comment,
    };

    // Update bookings to mark this one as having a review
    setBookings(bookings.map(b => 
      b.id === currentBookingId ? { ...b, hasReview: true } : b
    ));

    // Add the new review
    setReviews([...reviews, newReview]);
    
    toast.success('¡Gracias por tu opinión!');
    closeReviewModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-emerald-600 px-6 py-8">
              <div className="flex items-center">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                  <User className="h-12 w-12 text-emerald-600" />
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
                  <p className="text-emerald-100">{formData.email}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                    activeTab === 'info'
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Información Personal
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                    activeTab === 'bookings'
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mis Reservas
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                    activeTab === 'reviews'
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mis Opiniones
                </button>
                {user?.hasFields && (
                  <button
                    onClick={() => setActiveTab('fields')}
                    className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                      activeTab === 'fields'
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Mis Canchas
                  </button>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Personal Information */}
              {activeTab === 'info' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <Edit2 className="h-5 w-5 mr-1" />
                        Editar
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSubmit}
                          className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <Save className="h-5 w-5 mr-1" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          <X className="h-5 w-5 mr-1" />
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Correo Electrónico
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Nacimiento
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            value={formData.birthdate}
                            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {/* Bookings */}
              {activeTab === 'bookings' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Mis Reservas</h2>
                  
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{booking.field}</h3>
                            <p className="text-gray-600">
                              {new Date(booking.date).toLocaleDateString('es-AR')} - {booking.time}hs
                            </p>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : booking.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status === 'confirmed' 
                                ? 'Confirmada' 
                                : booking.status === 'completed'
                                ? 'Completada'
                                : 'Cancelada'}
                            </span>
                            
                            {booking.status === 'completed' && !booking.hasReview && (
                              <button
                                onClick={() => openReviewModal(booking.id)}
                                className="ml-3 flex items-center text-emerald-600 hover:text-emerald-700 transition-colors text-sm"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Dejar comentario
                              </button>
                            )}
                            
                            {booking.status === 'completed' && booking.hasReview && (
                              <span className="ml-3 flex items-center text-gray-500 text-sm">
                                <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                                Comentario enviado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Mis Opiniones</h2>
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">{review.fieldName}</h3>
                              <p className="text-gray-600 text-sm">
                                {new Date(review.date).toLocaleDateString('es-AR')}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <div className="mt-4 flex justify-end">
                            <button
                              className="text-emerald-600 hover:text-emerald-700 transition-colors text-sm"
                            >
                              Editar comentario
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600">Aún no has dejado ninguna opinión</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Después de completar una reserva, podrás dejar tu opinión sobre la cancha
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Fields Management */}
              {activeTab === 'fields' && user?.hasFields && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Mis Canchas</h2>
                    <Link 
                      to="/manage-fields" 
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                    >
                      Administrar Canchas
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {ownedFields.map((field) => (
                      <div key={field.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-40 relative">
                          <img 
                            src={field.image} 
                            alt={field.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                            {field.type}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">{field.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{field.location}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm text-blue-600 font-medium">Reservas (este mes)</p>
                              <p className="text-xl font-bold text-blue-700">{field.bookingsThisMonth}</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <p className="text-sm text-green-600 font-medium">Ingresos (ARS)</p>
                              <p className="text-xl font-bold text-green-700">${field.revenue.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 fill-current text-yellow-500 mr-1" />
                              <span className="font-medium">{field.rating}</span>
                            </div>
                            <Link
                              to={`/manage-fields?fieldId=${field.id}`}
                              className="text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium"
                            >
                              Editar cancha
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Dejar un comentario</h3>
                <button
                  onClick={closeReviewModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cómo calificarías esta cancha?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-8 w-8 ${
                          star <= reviewData.rating 
                            ? 'fill-current text-yellow-500' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Tu comentario
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  placeholder="Comparte tu experiencia con esta cancha..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleReviewSubmit}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Enviar comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;