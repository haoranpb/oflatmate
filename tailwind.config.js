const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./*.html', './src/**/*.{vue,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
