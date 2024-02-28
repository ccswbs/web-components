module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-combine-duplicated-selectors'),
    require('cssnano'),
  ],
};