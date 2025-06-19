import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Card } from '../../components/ui/card';
import { NotificationList } from '../../components/notifications/NotificationList';
import PaymentHistory from '../../components/payments/PaymentHistory';
import { FavoriteFields } from '../../components/favorites/FavoriteFields';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { User, Bell, CreditCard, Star, Settings } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { notifications } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">
          Por favor, inicia sesión para ver tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado del perfil */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-emerald-600" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Pestañas de contenido */}
      <Tabs defaultValue="notificaciones" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger
            value="notificaciones"
            className="flex items-center space-x-2"
          >
            <Bell className="w-4 h-4" />
            <span>Notificaciones</span>
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pagos" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Pagos</span>
          </TabsTrigger>
          <TabsTrigger
            value="favoritos"
            className="flex items-center space-x-2"
          >
            <Star className="w-4 h-4" />
            <span>Favoritos</span>
          </TabsTrigger>
          <TabsTrigger
            value="configuracion"
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </TabsTrigger>
        </TabsList>

        {/* Contenido de las pestañas */}
        <TabsContent value="notificaciones">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
            <NotificationList />
          </Card>
        </TabsContent>

        <TabsContent value="pagos">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Historial de Pagos</h2>
            <PaymentHistory />
          </Card>
        </TabsContent>

        <TabsContent value="favoritos">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Campos Favoritos</h2>
            <FavoriteFields
              fields={[]} // Aquí deberías pasar los campos favoritos desde tu servicio
              onFieldClick={(fieldId) => {
                // Manejar el clic en un campo
                console.log('Campo seleccionado:', fieldId);
              }}
            />
          </Card>
        </TabsContent>

        <TabsContent value="configuracion">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuración</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Notificaciones por correo</h3>
                  <p className="text-sm text-gray-600">
                    Recibe actualizaciones sobre tus reservas
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    aria-label="Activar notificaciones por correo"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Notificaciones push</h3>
                  <p className="text-sm text-gray-600">
                    Recibe notificaciones en tiempo real
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    aria-label="Activar notificaciones push"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
