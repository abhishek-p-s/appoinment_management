/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#25408F',
        secondary: '#E5F5FB',
        tertiary: '#ED1D35',
        tertiary_1: '#FFC7C7',
        success: '#C1EFC3',
        success_dark: '#3B923E',
      },
    },
  },
  plugins: [],
};
