import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, X, MapPin, DollarSign, Users, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

interface Field {
  id: number;
  name: string;
  type: string;
  location: {
    address: string;
    neighborhood: string;
    city: string;
  };
  price: number;
  duration: number;
  players: string;
  amenities: string[];
  image: string;
}

const ManageFields: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "Complejo Deportivo Norte",
      type: "Fútbol 5",
      location: {
        address: "Av. Libertador 1234",
        neighborhood: "Belgrano",
        city: "Buenos Aires"
      },
      price: 8500,
      duration: 60,
      players: "5 vs 5",
      amenities: ["Vestuarios", "Estacionamiento", "Iluminación"],
      image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg"
    }
  ]);
  
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newField, setNewField] = useState<Omit<Field, 'id'>>({
    name: "",
    type: "Fútbol 5",
    location: {
      address: "",
      neighborhood: "",
      city: ""
    },
    price: 0,
    duration: 60,
    players: "5 vs 5",
    amenities: [],
    image: ""
  });

  useEffect(() => {
    if (!user?.hasFields) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEdit = (field: Field) => {
    setEditingField(field);
    setIsAddingNew(false);
  };

  const handleSave = (field: Field) => {
    setFields(fields.map(f => f.id === field.id ? field : f));
    setEditingField(null);
    toast.success('Campo actualizado correctamente');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este campo?')) {
      setFields(fields.filter(f => f.id !== id));
      toast.success('Campo eliminado correctamente');
    }
  };

  const handleAddNew = () => {
    const newId = Math.max(...fields.map(f => f.id)) + 1;
    setFields([...fields, { ...newField, id: newId }]);
    setIsAddingNew(false);
    setNewField({
      name: "",
      type: "Fútbol 5",
      location: {
        address: "",
        neighborhood: "",
        city: ""
      },
      price: 0,
      duration: 60,
      players: "5 vs 5",
      amenities: [],
      image: ""
    });
    toast.success('Campo agregado correctamente');
  };

  const FieldForm = ({ field, onSave, isNew = false }: { field: any, onSave: (field: any) => void, isNew?: boolean }) => {
    const [formData, setFormData] = useState(field);
    const [newAmenity, setNewAmenity] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: value
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    };

    const handleAddAmenity = () => {
      if (newAmenity && !formData.amenities.includes(newAmenity)) {
        setFormData({
          ...formData,
          amenities: [...formData.amenities, newAmenity]
        });
        setNewAmenity("");
      }
    };

    const handleRemoveAmenity = (amenity: string) => {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a: string) => a !== amenity)
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Campo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Campo
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barrio
            </label>
            <input
              type="text"
              name="location.neighborhood"
              value={formData.location.neighborhood}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad
            </label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio por hora
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración del turno (minutos)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jugadores
            </label>
            <input
              type="text"
              name="players"
              value={formData.players}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la imagen
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comodidades
            </label>
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
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => isNew ? setIsAddingNew(false) : setEditingField(null)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            {isNew ? 'Agregar Campo' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Administrar Canchas</h1>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Agregar Campo
          </button>
        </div>

        {isAddingNew ? (
          <FieldForm field={newField} onSave={handleAddNew} isNew />
        ) : editingField ? (
          <FieldForm field={editingField} onSave={handleSave} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <div key={field.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{field.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{field.location.address}, {field.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{field.type} - {field.players}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{field.duration} minutos</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                      <span>${field.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {field.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(field)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(field.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFields;