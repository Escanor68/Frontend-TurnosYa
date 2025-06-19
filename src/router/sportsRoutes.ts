import { RouteObject } from 'react-router-dom';
import React from 'react';
import FootballHomePage from '../pages/sports/football/FootballHomePage';
import PadelHomePage from '../pages/sports/padel/PadelHomePage';

// Rutas específicas para fútbol
export const footballRoutes: RouteObject[] = [
  {
    path: '/football',
    children: [
      {
        index: true,
        element: React.createElement(FootballHomePage),
      },
      {
        path: 'fields',
        children: [
          {
            index: true,
            element: React.createElement(
              'div',
              null,
              'Lista de campos de fútbol'
            ),
          },
          {
            path: ':fieldId',
            element: React.createElement(
              'div',
              null,
              'Detalle de campo de fútbol'
            ),
          },
        ],
      },
      {
        path: 'tournaments',
        children: [
          {
            index: true,
            element: React.createElement('div', null, 'Torneos de fútbol'),
          },
          {
            path: ':tournamentId',
            element: React.createElement('div', null, 'Detalle de torneo'),
          },
        ],
      },
      {
        path: 'teams',
        children: [
          {
            index: true,
            element: React.createElement('div', null, 'Equipos de fútbol'),
          },
          {
            path: ':teamId',
            element: React.createElement('div', null, 'Detalle de equipo'),
          },
        ],
      },
      {
        path: 'matches',
        children: [
          {
            index: true,
            element: React.createElement('div', null, 'Partidos de fútbol'),
          },
          {
            path: ':matchId',
            element: React.createElement('div', null, 'Detalle de partido'),
          },
        ],
      },
      {
        path: 'rankings',
        element: React.createElement('div', null, 'Rankings de fútbol'),
      },
      {
        path: 'stats',
        element: React.createElement('div', null, 'Estadísticas de fútbol'),
      },
    ],
  },
];

// Rutas específicas para pádel
export const padelRoutes: RouteObject[] = [
  {
    path: '/padel',
    children: [
      {
        index: true,
        element: React.createElement(PadelHomePage),
      },
      {
        path: 'fields',
        children: [
          {
            index: true,
            element: React.createElement(
              'div',
              null,
              'Lista de campos de pádel'
            ),
          },
          {
            path: ':fieldId',
            element: React.createElement(
              'div',
              null,
              'Detalle de campo de pádel'
            ),
          },
        ],
      },
      {
        path: 'tournaments',
        children: [
          {
            index: true,
            element: React.createElement('div', null, 'Torneos de pádel'),
          },
          {
            path: ':tournamentId',
            element: React.createElement('div', null, 'Detalle de torneo'),
          },
        ],
      },
      {
        path: 'rankings',
        children: [
          {
            index: true,
            element: React.createElement('div', null, 'Rankings de pádel'),
          },
          {
            path: 'single',
            element: React.createElement('div', null, 'Ranking Single'),
          },
          {
            path: 'doubles',
            element: React.createElement('div', null, 'Ranking Dobles'),
          },
        ],
      },
      {
        path: 'players',
        children: [
          {
            index: true,
            element: React.createElement('div', null, 'Jugadores de pádel'),
          },
          {
            path: ':playerId',
            element: React.createElement('div', null, 'Perfil de jugador'),
          },
        ],
      },
      {
        path: 'equipment',
        element: React.createElement('div', null, 'Alquiler de equipos'),
      },
      {
        path: 'lessons',
        element: React.createElement('div', null, 'Clases particulares'),
      },
    ],
  },
];

// Rutas generales de deportes
export const sportsRoutes: RouteObject[] = [
  {
    path: '/sports',
    children: [
      {
        index: true,
        element: React.createElement('div', null, 'Selección de deportes'),
      },
      ...footballRoutes,
      ...padelRoutes,
    ],
  },
];
