import React from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { fieldId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Field</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">Booking for Field ID: {fieldId}</p>
        {/* Booking form will be implemented later */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-500 italic">Booking functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Booking;