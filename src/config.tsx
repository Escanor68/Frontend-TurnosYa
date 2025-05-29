export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://turnosya.com/api' // Replace with your production API URL
    : 'http://localhost:3001'; // Your local development API URL
