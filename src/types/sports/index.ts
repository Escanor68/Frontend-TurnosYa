// Tipos base para deportes
export type Sport = {
  id: string;
  name: string;
  icon: string;
  fieldTypes: {
    id: string;
    name: string;
    players: string;
    description: string;
  }[];
};

// Lista completa de deportes (por ahora solo fútbol y pádel)
export const SPORTS: Sport[] = [
  {
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
  },
  {
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
  },
];
