/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const baseFontSize = 10;

module.exports = {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  darkMode: 'selector',
  theme: {
    extend: {
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter(i => i)
          .reduce((acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` }), {}),
      }),
      fontSize: {
        'xs': [
          `${(16 * 0.75) / baseFontSize}rem`,
          {
            lineHeight: `${16 / baseFontSize}rem`,
          },
        ],
        'sm': [
          `${(16 * 0.875) / baseFontSize}rem`,
          {
            lineHeight: `${(16 * 1.25) / baseFontSize}rem`,
          },
        ],
        'base': [
          `${16 / baseFontSize}rem`,
          {
            lineHeight: `${(16 * 1.5) / baseFontSize}rem`,
          },
        ],
        'lg': [
          `${(16 * 1.125) / baseFontSize}rem`,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem`,
          },
        ],
        'xl': [
          `${(16 * 1.25) / baseFontSize}rem`,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem`,
          },
        ],
        '2xl': [
          `${(16 * 1.5) / baseFontSize}rem`,
          {
            ineHeight: `${(16 * 2) / baseFontSize}rem`,
          },
        ],
        '3xl': [
          `${(16 * 1.875) / baseFontSize}rem`,
          {
            lineHeight: `${(16 * 2.25) / baseFontSize}rem`,
          },
        ],
        '4xl': [
          `${(16 * 2.25) / baseFontSize}rem`,
          {
            lineHeight: `${(16 * 2.5) / baseFontSize}rem`,
          },
        ],
        '5xl': [
          `${(16 * 3) / baseFontSize}rem`,
          {
            lineHeight: 16 / baseFontSize,
          },
        ],
        '6xl': [
          `${(16 * 3.75) / baseFontSize}rem`,
          {
            lineHeight: 16 / baseFontSize,
          },
        ],
        '7xl': [
          `${(16 * 4.5) / baseFontSize}rem`,
          {
            lineHeight: 16 / baseFontSize,
          },
        ],
        '8xl': [
          `${(16 * 6) / baseFontSize}rem`,
          {
            lineHeight: 16 / baseFontSize,
          },
        ],
        '9xl': [
          `${(16 * 8) / baseFontSize}rem`,
          {
            lineHeight: 16 / baseFontSize,
          },
        ],
      },
      fontFamily: {
        serif: ['Bitter', ...defaultTheme.fontFamily.serif],
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'red': {
          50: '#fff1f1',
          100: '#ffe3e4',
          200: '#ffccce',
          300: '#ffa2a7',
          400: '#fe6e79',
          500: '#f83b4e',
          600: '#e51937',
          700: '#c20e2d',
          800: '#a20f2d',
          900: '#8a112d',
          950: '#4d0413',
          DEFAULT: '#e51937',
        },
        'yellow': {
          50: '#fffbeb',
          100: '#fff4c6',
          200: '#ffe788',
          300: '#ffd64a',
          400: '#ffc429',
          500: '#f9a007',
          600: '#dd7802',
          700: '#b75406',
          800: '#943f0c',
          900: '#7a340d',
          950: '#461a02',
          DEFAULT: '#ffc429',
        },
        'blue': {
          50: '#f2f9fd',
          100: '#e3f0fb',
          200: '#c1e3f6',
          300: '#8bcbee',
          400: '#4db1e3',
          500: '#2698d1',
          600: '#187bb4',
          700: '#146190',
          800: '#155377',
          900: '#174563',
          950: '#0f2d42',
          DEFAULT: '#187bb4',
        },
        'green': {
          50: '#f3faf3',
          100: '#e2f6e3',
          200: '#c7ebc9',
          300: '#9adb9f',
          400: '#67c16e',
          500: '#42a54a',
          600: '#318738',
          700: '#2a6b2f',
          800: '#25562a',
          900: '#204725',
          950: '#0d2610',
          DEFAULT: '#318738',
        },
        'light-grey': {
          50: '#f5f6f4',
          100: '#dadcd4',
          200: '#c7cabd',
          300: '#aaae9b',
          400: '#979b84',
          500: '#8a8c74',
          600: '#7b7a64',
          700: '#686655',
          800: '#575449',
          900: '#49473e',
          950: '#282720',
          DEFAULT: '#dadcd4',
        },
        'dark-grey': {
          50: '#f6f5f5',
          100: '#e7e6e6',
          200: '#d1d0d0',
          300: '#b2b1ae',
          400: '#8a8886',
          500: '#787673',
          600: '#5f5e5b',
          700: '#504f4e',
          800: '#464544',
          900: '#3d3c3c',
          950: '#272725',
          DEFAULT: '#787673',
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  important: true,
};
