import type { Sport } from '../sports';
import type { Booking } from '../booking';

export const FOOTBALL_SPORT: Sport = {
  id: 'soccer',
  name: 'Fútbol',
  icon: '⚽',
  fieldTypes: [
    {
      id: 'soccer-5',
      name: 'Fútbol 5',
      players: '5 vs 5',
      description: 'Cancha de fútbol para 10 jugadores',
    },
    {
      id: 'soccer-7',
      name: 'Fútbol 7',
      players: '7 vs 7',
      description: 'Cancha de fútbol para 14 jugadores',
    },
    {
      id: 'soccer-11',
      name: 'Fútbol 11',
      players: '11 vs 11',
      description: 'Cancha de fútbol profesional',
    },
  ],
};

// Tipos específicos para fútbol
export type FootballFieldType = 'soccer-5' | 'soccer-7' | 'soccer-11';
export type FootballPosition =
  | 'goalkeeper'
  | 'defender'
  | 'midfielder'
  | 'forward';
export type FootballTournamentType =
  | 'league'
  | 'cup'
  | 'friendly'
  | 'championship';

export interface FootballField {
  id: string;
  name: string;
  type: FootballFieldType;
  surface: 'grass' | 'artificial' | 'indoor';
  size: {
    width: number;
    length: number;
  };
  amenities: string[];
  hasGoals: boolean;
  hasLines: boolean;
  hasLights: boolean;
  hasChangingRooms: boolean;
}

export interface FootballPlayer {
  id: string;
  name: string;
  position: FootballPosition;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  preferredFoot: 'left' | 'right' | 'both';
  stats: {
    goals: number;
    assists: number;
    matches: number;
    wins: number;
  };
}

export interface FootballTeam {
  id: string;
  name: string;
  players: FootballPlayer[];
  captain: FootballPlayer;
  formation: string; // "4-4-2", "3-5-2", etc.
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

export interface FootballMatch {
  id: string;
  homeTeam: FootballTeam;
  awayTeam: FootballTeam;
  date: string;
  time: string;
  field: FootballField;
  score?: {
    home: number;
    away: number;
  };
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  events: FootballMatchEvent[];
}

export interface FootballMatchEvent {
  id: string;
  type: 'goal' | 'assist' | 'yellow-card' | 'red-card' | 'substitution';
  player: FootballPlayer;
  minute: number;
  description: string;
}

export interface FootballTournament {
  id: string;
  name: string;
  type: FootballTournamentType;
  teams: FootballTeam[];
  matches: FootballMatch[];
  standings: FootballStanding[];
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface FootballStanding {
  team: FootballTeam;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface FootballBooking extends Omit<Booking, 'sport'> {
  sport: 'soccer';
  fieldType: FootballFieldType;
  teamSize: number;
  isTeamBooking: boolean;
  team?: FootballTeam;
  tournament?: FootballTournament;
  matchType: 'friendly' | 'competitive' | 'training';
}
