import { UserRole } from '../../types/user';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  disabled?: boolean;
}

export const RoleSelector = ({
  selectedRole,
  onRoleChange,
  disabled = false,
}: RoleSelectorProps) => {
  const roles = [
    {
      value: 'player' as UserRole,
      title: 'Usuario',
      description: 'Reservar canchas y jugar',
      icon: '⚽',
      features: [
        'Reservar canchas',
        'Ver disponibilidad',
        'Gestionar reservas',
        'Acceso a promociones',
      ],
    },
    {
      value: 'owner' as UserRole,
      title: 'Dueño de Cancha',
      description: 'Gestionar canchas y reservas',
      icon: '🏟️',
      features: [
        'Gestionar canchas',
        'Ver reservas',
        'Configurar precios',
        'Analytics de negocio',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Tipo de cuenta
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onRoleChange(role.value)}
            disabled={disabled}
            className={`p-6 border-2 rounded-lg text-left transition-all duration-200 ${
              selectedRole === role.value
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{role.icon}</span>
              <div>
                <div className="font-semibold text-lg">{role.title}</div>
                <div className="text-sm text-gray-500">{role.description}</div>
              </div>
            </div>
            <ul className="text-sm space-y-1">
              {role.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-primary-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
};
