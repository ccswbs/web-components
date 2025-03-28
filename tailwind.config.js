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
        condensed: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'red': {
          50: '#fff0f1',
          100: '#ffe2e4',
          200: '#ffc9cf',
          300: '#ff9da9',
          400: '#ff667b',
          500: '#ff3051',
          600: '#f10d3c',
          700: '#c20430',
          800: '#aa0732',
          900: '#910a31',
          950: '#520016',
          DEFAULT: '#c20430',
        },
        'yellow': {
          50: '#fffbeb',
          100: '#fff5c6',
          200: '#ffe988',
          300: '#ffd84a',
          400: '#ffc72a',
          500: '#f9a307',
          600: '#dd7b02',
          700: '#b75606',
          800: '#94410c',
          900: '#7a360d',
          950: '#461b02',
          DEFAULT: '#ffc72a',
        },
        'blue': {
          50: '#f1f8fa',
          100: '#ddecf0',
          200: '#bedae3',
          300: '#91bfcf',
          400: '#69a3b9',
          500: '#417f99',
          600: '#396981',
          700: '#33576b',
          800: '#314a59',
          900: '#2c3f4d',
          950: '#192833',
          DEFAULT: '#69a3b9',
        },
        'green': {
          50: '#f1fbea',
          100: '#def5d2',
          200: '#c1ebab',
          300: '#99dd79',
          400: '#77cb50',
          500: '#57b131',
          600: '#3c8221',
          700: '#336c1f',
          800: '#2c561e',
          900: '#28491e',
          950: '#11280b',
          DEFAULT: '#3c8221',
        },
        'light-grey': {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#dddddd',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
          950: '#282828',
          DEFAULT: '#dddddd',
        },
        'dark-grey': {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#333333',
          950: '#1a1a1a',
          DEFAULT: '#333333',
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  important: true,
};
