import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { UserProfile } from '../../types/auth';
import { MapPin, Calendar, Star, Users, Bell, Award } from 'lucide-react';

interface UserProfileProps {
  profile: UserProfile;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Profile */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={profile.profileImage || '/default-avatar.png'}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <div className="flex items-center mt-2">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              <span>{profile.points} puntos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="reservas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reservas">
            <Calendar className="w-4 h-4 mr-2" />
            Mis Reservas
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="w-4 h-4 mr-2" />
            Mis Reseñas
          </TabsTrigger>
          <TabsTrigger value="equipos">
            <Users className="w-4 h-4 mr-2" />
            Mis Equipos
          </TabsTrigger>
          <TabsTrigger value="notificaciones">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </TabsTrigger>
        </TabsList>

        {/* Reservas */}
        <TabsContent value="reservas">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Historial de Reservas
            </h2>
            <div className="space-y-4">
              {profile.bookingHistory.map((booking) => (
                <div key={booking.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{booking.fieldName}</h3>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          booking.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <p className="mt-1 font-medium">${booking.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Reseñas */}
        <TabsContent value="reviews">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mis Reseñas</h2>
            <div className="space-y-4">
              {profile.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Equipos */}
        <TabsContent value="equipos">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mis Equipos</h2>
            <div className="space-y-6">
              {profile.teams.map((team) => (
                <div key={team.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{team.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src={member.profileImage || '/default-avatar.png'}
                          alt={member.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{member.name}</span>
                      </div>
                    ))}
                  </div>
                  {team.upcomingMatches.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Próximos Partidos</h4>
                      <div className="space-y-2">
                        {team.upcomingMatches.map((match) => (
                          <div key={match.id} className="text-sm text-gray-600">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            {new Date(match.date).toLocaleDateString()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notificaciones">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
            <div className="space-y-4">
              {profile.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p
                        className={`${
                          notification.read ? 'text-gray-600' : 'text-gray-900'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(notification.date).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
