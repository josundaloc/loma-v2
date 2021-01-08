const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      se: '315px',
      ipx: '370px',
      psm: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      coolGray: colors.coolGray,
      gray: colors.gray,
      warmGray: colors.warmGray,
      red: colors.red,
      lime: colors.lime,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
    },
    extend: {
      inset: {
        '1/6': '16.66%',
        '1/8': '12.5%',
        '1/24': '4.17%'
      },
      screens: {
        se: '315px',
        ipx: '370px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@jinsung.lim/tailwindcss-filters'),
  ],
}
