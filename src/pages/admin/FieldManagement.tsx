import type React from 'react';
import { useState, useEffect } from 'react';
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

const FieldManagement: React.FC = () => {
  console.log('FieldManagement montado');
  const [fields, setFields] = useState<Field[]>([]);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFields() {
      console.log('Cargando canchas...');
      try {
        const response = await fetch('/api/fields');
        const data = await response.json();
        console.log('Canchas recibidas:', data);
        setFields(data);
      } catch (error) {
        console.log('Error al cargar canchas:', error);
        toast.error('Error al cargar las canchas');
      } finally {
        console.log('Finalizó la carga, setLoading(false)');
        setLoading(false);
      }
    }
    fetchFields();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode && selectedField) {
        response = await fetch(`/api/fields/${selectedField.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch('/api/fields', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      if (!response.ok) throw new Error('Error en la operación');
      // Recargar la lista de campos
      const fieldsRes = await fetch('/api/fields');
      setFields(await fieldsRes.json());
      toast.success(isEditMode ? 'Campo actualizado' : 'Campo creado');
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error('Error al guardar el campo');
    }
  };

  const deleteField = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este campo?')) {
      try {
        const response = await fetch(`/api/fields/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');
        setFields(fields.filter((field) => field.id !== id));
        toast.success('Campo eliminado con éxito');
      } catch (error) {
        console.log(error);
        toast.error('Error al eliminar el campo');
      }
    }
  };

  const toggleFieldStatus = async (id: number, active: boolean) => {
    try {
      const response = await fetch(`/api/fields/${id}/activate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      if (!response.ok) throw new Error('Error al cambiar estado');
      // Recargar la lista de campos
      const fieldsRes = await fetch('/api/fields');
      setFields(await fieldsRes.json());
      toast.info(`Campo ${active ? 'desactivado' : 'activado'} con éxito`);
    } catch (error) {
      console.log(error);
      toast.error('Error al cambiar el estado del campo');
    }
  };

  const filteredFields = fields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.fieldType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Campos</h1>
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          title="Agregar Campo"
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
          title="Buscar campos por nombre, tipo, ciudad o provincia"
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
            <div className="p-4 flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{field.name}</h2>
                <p className="text-gray-600 mb-1">{field.fieldType}</p>
                <p className="text-gray-500 mb-1">{field.description}</p>
                <p className="text-gray-500 text-sm mb-1">
                  {field.address}, {field.city}, {field.province}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-2 ${
                    field.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {field.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => openEditModal(field)}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md flex items-center"
                  title="Editar campo"
                >
                  <Pencil size={16} className="mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => toggleFieldStatus(field.id, field.active)}
                  className={`$${
                    field.active
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  } px-3 py-1 rounded-md flex items-center`}
                  title={field.active ? 'Desactivar campo' : 'Activar campo'}
                >
                  {field.active ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => deleteField(field.id)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md flex items-center"
                  title="Eliminar campo"
                >
                  <Trash2 size={16} className="mr-1" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear/editar campo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              title="Cerrar"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Editar Campo' : 'Agregar Campo'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  title="Nombre del campo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Tipo de campo
                </label>
                <input
                  type="text"
                  name="fieldType"
                  value={formData.fieldType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  title="Tipo de campo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                  title="Descripción del campo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  title="Dirección del campo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  title="Ciudad del campo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Provincia</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  title="Provincia del campo"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
                >
                  {isEditMode ? 'Guardar Cambios' : 'Agregar Campo'}
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
