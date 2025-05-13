import React from 'react';
import { SPORTS } from '../types/sports';

interface FieldTypeSelectorProps {
  sportId: string;
  selectedType: string;
  onTypeSelect: (typeId: string) => void;
}

const FieldTypeSelector: React.FC<FieldTypeSelectorProps> = ({ sportId, selectedType, onTypeSelect }) => {
  const sport = SPORTS.find(s => s.id === sportId);
  
  if (!sport) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {sport.fieldTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeSelect(type.id)}
          className={`p-4 border rounded-lg text-left transition-colors ${
            selectedType === type.id
              ? 'border-emerald-600 bg-emerald-50'
              : 'border-gray-200 hover:border-emerald-600'
          }`}
        >
          <h3 className="font-medium text-gray-900">{type.name}</h3>
          <p className="text-sm text-gray-500">{type.players}</p>
          <p className="text-xs text-gray-500 mt-1">{type.description}</p>
        </button>
      ))}
    </div>
  );
};

export default FieldTypeSelector;