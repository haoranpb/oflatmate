const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/*.html', './src/**/*.{vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
