// Update the filteredFields logic in the Fields component
const filteredFields = useMemo(() => {
  let result = [...mockFields];
  
  if (filters.location) {
    result = result.filter(field => 
      field.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  // Fix field type filtering
  if (filters.fieldType) {
    result = result.filter(field => {
      // Normalize field types for comparison
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
}, [filters, mockFields]);

// Update the field type filter options
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

export default filteredFields