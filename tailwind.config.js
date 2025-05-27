/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          light: '#dbeafe',   // Blue 100
          lighter: '#eff6ff', // Blue 50
          dark: '#1d4ed8',    // Blue 700
        },
        secondary: {
          DEFAULT: '#4f46e5', // Indigo 600
          light: '#e0e7ff',   // Indigo 100
          lighter: '#eef2ff', // Indigo 50
          dark: '#4338ca',    // Indigo 700
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
