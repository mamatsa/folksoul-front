/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '420px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'main-gradient':
          'radial-gradient(50% 50% at 50% 50%, #534571 0%, #342C46 100%)',
        'login-gradient': 'linear-gradient(180deg, #345161 0%, #7B5A5A 100%)',
      },
      colors: {
        'red-bg': '#EB5757',
        'login-black': '#272727',
        'placeholder-color': '#501C1C',
        'input-bg': '#C4B6B2',
        'login-button': '#345161',
        'error-red': '#CC1E1E',
        'dashboard-bg': '#FBFBFB',
        'dashboard-shadow': '#4D4D4D',
        'nav-bg': '#333333',
        'nav-border': '#898989',
      },
      boxShadow: {
        inside: 'inset 4px 4px 20px #4D4D4D;',
      },
    },
  },
  plugins: [],
};
