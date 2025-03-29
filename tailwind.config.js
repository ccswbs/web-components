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
        black: {
          DEFAULT: '#000',
          focus: '#353636',
          text: '#000',
          contrast: '#fff',
          muted: {
            DEFAULT: '#000',
            focus: '#353636',
            text: '#000',
            contrast: '#fff',
          },
          light: {
            DEFAULT: '#000',
            focus: '#353636',
            text: '#000',
            contrast: '#fff',
          },
          dark: {
            DEFAULT: '#000',
            focus: '#353636',
            text: '#000',
            contrast: '#fff',
          },
        },
        red: {
          DEFAULT: '#e51937',
          focus: '#bd2e35',
          text: '#cf1732',
          contrast: '#fff',
          muted: {
            DEFAULT: '#e51937',
            focus: '#bd2e35',
            text: '#cf1732',
            contrast: '#fff',
          },
          light: {
            DEFAULT: '#e51937',
            focus: '#bd2e35',
            text: '#cf1732',
            contrast: '#fff',
          },
          dark: {
            DEFAULT: '#e51937',
            focus: '#bd2e35',
            text: '#cf1732',
            contrast: '#fff',
          },
        },
        yellow: {
          DEFAULT: '#ffc429',
          focus: '#ffe299',
          text: '#ffc429',
          contrast: '#000',
          muted: {
            DEFAULT: '#ffc429',
            focus: '#ffe299',
            text: '#ffc429',
            contrast: '#000',
          },
          light: {
            DEFAULT: '#ffc429',
            focus: '#ffe299',
            text: '#ffc429',
            contrast: '#000',
          },
          dark: {
            DEFAULT: '#ffc429',
            focus: '#ffe299',
            text: '#ffc429',
            contrast: '#000',
          },
        },
        blue: {
          DEFAULT: '#187bb4',
          focus: '#156b9d',
          text: '#166ea2',
          contrast: '#fff',
          muted: {
            DEFAULT: '#e1edf1',
            focus: '#e1edf1',
            text: '#e1edf1',
            contrast: '#000',
          },
          light: {
            DEFAULT: '#187bb4',
            focus: '#156b9d',
            text: '#166ea2',
            contrast: '#fff',
          },
          dark: {
            DEFAULT: '#187bb4',
            focus: '#156b9d',
            text: '#166ea2',
            contrast: '#fff',
          },
        },
        green: {
          DEFAULT: '#318738',
          focus: '#2a7430',
          text: '#2b7832',
          contrast: '#fff',
          muted: {
            DEFAULT: '#318738',
            focus: '#2a7430',
            text: '#2b7832',
            contrast: '#fff',
          },
          light: {
            DEFAULT: '#318738',
            focus: '#2a7430',
            text: '#2b7832',
            contrast: '#fff',
          },
          dark: {
            DEFAULT: '#318738',
            focus: '#2a7430',
            text: '#2b7832',
            contrast: '#fff',
          },
        },
        grey: {
          DEFAULT: '#686764',
          focus: '#686764',
          text: '#686764',
          contrast: '#fff',
          muted: {
            DEFAULT: '#DDDDDD',
            focus: '#DDDDDD',
            text: '#DDDDDD',
            contrast: '#000',
          },
          light: {
            DEFAULT: '#d8d8d8',
            focus: '#bfbfbf',
            text: '#d8d8d8',
            contrast: '#000',
          },
          dark: {
            DEFAULT: '#747676',
            focus: '#63625f',
            text: '#747676',
            contrast: '#fff',
          },
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  important: true,
};
