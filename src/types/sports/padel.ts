import type { Sport } from './index';
import type { Booking } from '../booking';

export const PADEL_SPORT: Sport = {
  id: 'paddle',
  name: 'Pádel',
  icon: '🎾',
  fieldTypes: [
    {
      id: 'paddle-single',
      name: 'Single',
      players: '1 vs 1',
      description: 'Cancha de pádel para 2 jugadores',
    },
    {
      id: 'paddle-doubles',
      name: 'Dobles',
      players: '2 vs 2',
      description: 'Cancha de pádel para 4 jugadores',
    },
  ],
};

// Tipos específicos para pádel
export type PadelFieldType = 'paddle-single' | 'paddle-doubles';
export type PadelSkillLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'professional';
export type PadelTournamentType = 'single' | 'doubles' | 'mixed' | 'league';

export interface PadelField {
  id: string;
  name: string;
  type: PadelFieldType;
  surface: 'artificial' | 'cement' | 'grass';
  size: {
    width: number;
    length: number;
  };
  amenities: string[];
  hasGlass: boolean;
  hasNet: boolean;
  hasLights: boolean;
  hasChangingRooms: boolean;
  hasEquipmentRental: boolean;
}

export interface PadelPlayer {
  id: string;
  name: string;
  skillLevel: PadelSkillLevel;
  preferredSide: 'left' | 'right' | 'both';
  stats: {
    matches: number;
    wins: number;
    tournaments: number;
    ranking: number;
  };
  equipment: {
    racket: string;
    grip: string;
  };
}

export interface PadelTeam {
  id: string;
  name: string;
  players: PadelPlayer[];
  captain: PadelPlayer;
  formation: 'single' | 'doubles';
  stats: {
    wins: number;
    losses: number;
    tournaments: number;
    ranking: number;
  };
}

export interface PadelMatch {
  id: string;
  homeTeam: PadelTeam;
  awayTeam: PadelTeam;
  date: string;
  time: string;
  field: PadelField;
  score?: {
    home: number;
    away: number;
    sets: Array<{ home: number; away: number }>;
  };
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  events: PadelMatchEvent[];
  matchType: 'single' | 'doubles' | 'mixed';
}

export interface PadelMatchEvent {
  id: string;
  type: 'point' | 'set' | 'game' | 'break' | 'timeout';
  player?: PadelPlayer;
  minute: number;
  description: string;
  score?: string;
}

export interface PadelTournament {
  id: string;
  name: string;
  type: PadelTournamentType;
  teams: PadelTeam[];
  matches: PadelMatch[];
  standings: PadelStanding[];
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  prizePool?: number;
  category: 'amateur' | 'professional' | 'mixed';
}

export interface PadelStanding {
  team: PadelTeam;
  position: number;
  played: number;
  won: number;
  lost: number;
  setsWon: number;
  setsLost: number;
  points: number;
}

export interface PadelBooking extends Omit<Booking, 'sport'> {
  sport: 'paddle';
  fieldType: PadelFieldType;
  playerCount: number;
  isDoubles: boolean;
  team?: PadelTeam;
  tournament?: PadelTournament;
  matchType: 'friendly' | 'competitive' | 'training';
  equipmentRental?: boolean;
}

export interface PadelRanking {
  id: string;
  player: PadelPlayer;
  position: number;
  points: number;
  category: 'single' | 'doubles' | 'mixed';
  season: string;
  previousPosition?: number;
}
