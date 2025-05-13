import React from 'react';
import { SPORTS } from '../types/sports';

interface SportSelectorProps {
  selectedSport: string;
  onSportSelect: (sportId: string) => void;
}

const SportSelector: React.FC<SportSelectorProps> = ({ selectedSport, onSportSelect }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 py-2">
      {SPORTS.map((sport) => (
        <button
          key={sport.id}
          onClick={() => onSportSelect(sport.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedSport === sport.id
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">{sport.icon}</span>
          <span className="font-medium">{sport.name}</span>
        </button>
      ))}
    </div>
  );
};

export default SportSelector;