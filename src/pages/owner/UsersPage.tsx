import React from 'react';

const UsersPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Juan Pérez</td>
              <td className="px-6 py-4 whitespace-nowrap">juan@email.com</td>
              <td className="px-6 py-4 whitespace-nowrap">player</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Ana Dueña</td>
              <td className="px-6 py-4 whitespace-nowrap">ana@email.com</td>
              <td className="px-6 py-4 whitespace-nowrap">owner</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
