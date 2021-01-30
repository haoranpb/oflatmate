const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/*.html', './src/**/*.{vue,ts}'],
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
