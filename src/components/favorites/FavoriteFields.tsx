import React from 'react';
import { useUser } from '../../context/UserContext';
import { Star, StarOff } from 'lucide-react';

interface Field {
  id: string;
  name: string;
  image?: string;
  address: string;
}

interface FavoriteFieldsProps {
  fields: Field[];
  onFieldClick?: (fieldId: string) => void;
}

export const FavoriteFields: React.FC<FavoriteFieldsProps> = ({
  fields,
  onFieldClick,
}) => {
  const { favoriteFields, addFavoriteField, removeFavoriteField, isLoading } =
    useUser();

  const handleFavoriteClick = (fieldId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteFields.includes(fieldId)) {
      removeFavoriteField(fieldId);
    } else {
      addFavoriteField(fieldId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        <Star className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2">No tienes campos favoritos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field) => (
        <div
          key={field.id}
          onClick={() => onFieldClick?.(field.id)}
          className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        >
          {field.image && (
            <img
              src={field.image}
              alt={field.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900">{field.name}</h3>
              <button
                onClick={(e) => handleFavoriteClick(field.id, e)}
                className="p-1 rounded-full hover:bg-gray-100"
                title={
                  favoriteFields.includes(field.id)
                    ? 'Quitar de favoritos'
                    : 'Agregar a favoritos'
                }
              >
                {favoriteFields.includes(field.id) ? (
                  <Star className="h-5 w-5 text-yellow-400" />
                ) : (
                  <StarOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-600">{field.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
