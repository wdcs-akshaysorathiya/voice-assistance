/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './app/***/**/*.{ts,tsx}',
    './components/***/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkblue: '#1C1C1C',
        primary: '#DD1E3A',
        secondary: '#9EABB5',
        midnight: '#1D2A3A',
        'midnight-hover': '#4a5461',
        'dark-midnight': '#17202a',
        'header-gray': '#9EABB5',
        'light-gray': '#F2F5F5',
        'dark-gray': '#87929D',
        'light-blue': '#10B7FF',
        'white-hover': '#D1D3D5',
        violet: '#373593',
        header: '#101821',
        gray: '#6a737c',
        input: '#8EA3B8',
        divider: 'rgb(106, 115, 124)',
        success: '#17E299',
        warning: '#F7931A'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'auto-fill-5': 'repeat(auto-fill, 20px)',
      },

    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}