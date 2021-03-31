const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './**/*.{vue,js}', '../felafel/*.{vue,js}'],
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
