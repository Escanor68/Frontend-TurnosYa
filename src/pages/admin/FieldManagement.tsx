import type React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Field {
  id: number;
  name: string;
  fieldType: string;
  description: string;
  address: string;
  city: string;
  province: string;
  active: boolean;
}

// Datos de ejemplo para desarrollo
const exampleFields: Field[] = [
  {
    id: 1,
    name: 'Campo Norte',
    fieldType: 'Fútbol 11',
    description: 'Campo de césped natural con iluminación nocturna',
    address: 'Av. Libertador 1234',
    city: 'Buenos Aires',
    province: 'Buenos Aires',
    active: true,
  },
  {
    id: 2,
    name: 'Campo Sur',
    fieldType: 'Fútbol 5',
    description: 'Campo de césped sintético techado',
    address: 'Calle San Martín 567',
    city: 'Córdoba',
    province: 'Córdoba',
    active: true,
  },
  {
    id: 3,
    name: 'Campo Este',
    fieldType: 'Fútbol 7',
    description: 'Campo al aire libre con vestuarios',
    address: 'Ruta 8 km 50',
    city: 'Rosario',
    province: 'Santa Fe',
    active: false,
  },
];

const FieldManagement: React.FC = () => {
  const [fields, setFields] = useState<Field[]>(exampleFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    fieldType: '',
    description: '',
    address: '',
    city: '',
    province: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // En una implementación real, aquí se cargarían los datos desde la API
    // fetchFields();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      fieldType: '',
      description: '',
      address: '',
      city: '',
      province: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (field: Field) => {
    setIsEditMode(true);
    setSelectedField(field);
    setFormData({
      name: field.name,
      fieldType: field.fieldType,
      description: field.description,
      address: field.address,
      city: field.city,
      province: field.province,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && selectedField) {
      // Actualizar campo existente
      const updatedFields = fields.map((field) =>
        field.id === selectedField.id ? { ...field, ...formData } : field
      );
      setFields(updatedFields);
      toast.success('Campo actualizado con éxito');
    } else {
      // Crear nuevo campo
      const newField: Field = {
        id: Math.max(0, ...fields.map((f) => f.id)) + 1,
        ...formData,
        active: true,
      };
      setFields([...fields, newField]);
      toast.success('Campo creado con éxito');
    }

    closeModal();
  };

  const toggleFieldStatus = (id: number) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, active: !field.active } : field
    );
    setFields(updatedFields);

    const field = fields.find((f) => f.id === id);
    if (field) {
      toast.info(
        `Campo ${field.active ? 'desactivado' : 'activado'} con éxito`
      );
    }
  };

  const deleteField = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este campo?')) {
      setFields(fields.filter((field) => field.id !== id));
      toast.success('Campo eliminado con éxito');
    }
  };

  const filteredFields = fields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.fieldType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Campos</h1>
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Agregar Campo
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar campos..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFields.map((field) => (
          <div
            key={field.id}
            className={`border rounded-lg overflow-hidden shadow-md ${
              field.active ? 'bg-white' : 'bg-gray-100'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{field.name}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    field.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {field.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{field.fieldType}</p>
              <p className="mt-2">{field.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                {field.address}, {field.city}, {field.province}
              </p>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
              <button
                onClick={() => toggleFieldStatus(field.id)}
                className={`px-3 py-1 rounded-md ${
                  field.active
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {field.active ? 'Desactivar' : 'Activar'}
              </button>
              <button
                onClick={() => openEditModal(field)}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md flex items-center"
              >
                <Pencil size={16} className="mr-1" />
                Editar
              </button>
              <button
                onClick={() => deleteField(field.id)}
                className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFields.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron campos que coincidan con la búsqueda.
        </div>
      )}

      {/* Modal para crear/editar campos */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditMode ? 'Editar Campo' : 'Crear Nuevo Campo'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tipo de Campo
                </label>
                <input
                  type="text"
                  name="fieldType"
                  value={formData.fieldType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ciudad
                  </label>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Provincia
                  </label>
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

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  {isEditMode ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldManagement;
