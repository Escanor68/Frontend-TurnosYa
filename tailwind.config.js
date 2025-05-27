/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          light: '#dbeafe',   // Blue 100
          lighter: '#eff6ff', // Blue 50
          dark: '#1d4ed8',    // Blue 700
          darker: '#1e40af',  // Blue 800
        },
        secondary: {
          DEFAULT: '#4f46e5', // Indigo 600
          light: '#e0e7ff',   // Indigo 100
          lighter: '#eef2ff', // Indigo 50
          dark: '#4338ca',    // Indigo 700
          darker: '#3730a3',  // Indigo 800
        },
        accent: {
          DEFAULT: '#10b981', // Emerald 500
          light: '#d1fae5',   // Emerald 100
          lighter: '#ecfdf5', // Emerald 50
          dark: '#059669',    // Emerald 600
          darker: '#047857',  // Emerald 700
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
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
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero-pattern.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
