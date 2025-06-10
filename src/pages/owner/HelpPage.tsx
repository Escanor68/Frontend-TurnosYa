import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Ayuda y Soporte</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">
          Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
