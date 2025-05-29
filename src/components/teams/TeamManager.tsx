import React, { useState } from 'react';
import { Plus, Users, Calendar, MapPin, Trophy } from 'lucide-react';
import type { Team, Match, User } from '../../types/auth';

interface TeamManagerProps {
  userTeams: Team[];
  onCreateTeam: (teamName: string) => void;
  onJoinTeam: (teamId: string) => void;
  onCreateMatch: (match: Omit<Match, 'id'>) => void;
}

const TeamManager: React.FC<TeamManagerProps> = ({
  userTeams,
  onCreateTeam,
  onJoinTeam,
  onCreateMatch,
}) => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      onCreateTeam(newTeamName);
      setNewTeamName('');
      setShowCreateTeam(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Lista de Equipos */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Mis Equipos</h2>
              <button
                onClick={() => setShowCreateTeam(true)}
                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showCreateTeam && (
              <form onSubmit={handleCreateTeam} className="mb-6">
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Nombre del equipo"
                  className="w-full p-2 border rounded-lg mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateTeam(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                  >
                    Crear
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {userTeams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTeam?.id === team.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium">{team.name}</h3>
                  <div className="flex items-center text-gray-500 mt-2">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{team.members.length} miembros</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalles del Equipo */}
        <div className="md:col-span-2">
          {selectedTeam ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {selectedTeam.name}
              </h2>

              {/* Miembros */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  Miembros del Equipo
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedTeam.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <img
                        src={member.profileImage || '/default-avatar.png'}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">Jugador</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Próximos Partidos */}
              <div>
                <h3 className="text-lg font-medium mb-4">Próximos Partidos</h3>
                <div className="space-y-4">
                  {selectedTeam.upcomingMatches.map((match) => (
                    <div key={match.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(match.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            Cancha {match.fieldId}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm ${
                              match.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : match.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {match.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona un equipo
              </h3>
              <p className="text-gray-500">
                Elige un equipo para ver sus detalles y gestionar partidos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamManager;
