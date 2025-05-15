import { useMemo } from 'react';

interface Filters {
  location: string;
  date: string;
  fieldType: string;
  priceRange: string;
  amenities: string[];
}

interface FieldsProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

// Mock data with complete field information including location
const mockFields = [
  {
    id: 1,
    location: "Buenos Aires",
    type: "Fútbol 5",
    price: 8000,
    amenities: ["parking", "lights"]
  },
  {
    id: 2,
    location: "Córdoba",
    type: "Fútbol 7",
    price: 12000,
    amenities: ["parking", "lights", "locker_room"]
  },
  {
    id: 3,
    location: "Rosario",
    type: "Fútbol 11",
    price: 16000,
    amenities: ["parking", "lights", "locker_room", "cafeteria"]
  }
];

const Fields: React.FC<FieldsProps> = ({ filters, setFilters }) => {
  const filteredFields = useMemo(() => {
    let result = [...mockFields];
    
    if (filters.location) {
      result = result.filter(field => 
        field.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.fieldType) {
      result = result.filter(field => {
        const normalizedFieldType = field.type.toLowerCase().replace(/\s+/g, '');
        const normalizedFilter = filters.fieldType.toLowerCase().replace(/\s+/g, '');
        return normalizedFieldType === normalizedFilter;
      });
    }
    
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'low':
          result = result.filter(field => field.price < 9000);
          break;
        case 'medium':
          result = result.filter(field => field.price >= 9000 && field.price <= 15000);
          break;
        case 'high':
          result = result.filter(field => field.price > 15000);
          break;
      }
    }
    
    if (filters.amenities.length > 0) {
      result = result.filter(field =>
        filters.amenities.every(amenity =>
          field.amenities.includes(amenity)
        )
      );
    }
    
    return result;
  }, [filters]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          value={filters.fieldType}
          onChange={(e) => setFilters({...filters, fieldType: e.target.value})}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Todos los tipos</option>
          <option value="Fútbol 5">Fútbol 5</option>
          <option value="Fútbol 7">Fútbol 7</option>
          <option value="Fútbol 11">Fútbol 11</option>
        </select>
      </div>
      
      {/* Display filtered fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFields.map(field => (
          <div key={field.id} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{field.type}</h3>
            <p>{field.location}</p>
            <p>Precio: ${field.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fields;