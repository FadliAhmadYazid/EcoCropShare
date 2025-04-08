/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6BCB77',
          DEFAULT: '#4CAF50',
          dark: '#2E7D32',
        },
        secondary: {
          light: '#FFD166',
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#E0E0E0',
          dark: '#9E9E9E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}