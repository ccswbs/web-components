import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';
import { postcss } from '@stencil-community/postcss';
import tailwindcss from 'tailwindcss';
import nesting from 'tailwindcss/nesting';
import combine from 'postcss-combine-duplicated-selectors';
import autoprefixer from 'autoprefixer'

export const config: Config = {
  namespace: 'uofg-web-components',
  globalStyle: 'src/styles/global.css',
  sourceMap: process.env.NODE_ENV !== 'production',
  taskQueue: 'congestionAsync',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-readme',
      dir: 'docs',
      footer: '[University of Guelph Web Components](https://github.com/ccswbs/web-components)',
    },
    {
      type: 'docs-vscode',
      file: '.vscode/vscode-data.json',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  devServer: {
    reloadStrategy: 'hmr',
    openBrowser: false,
  },
  validatePrimaryPackageOutputTarget: true,
  plugins: [
    inlineSvg(),
    postcss({
      plugins: [
        nesting(),
        tailwindcss(),
        combine(),
        autoprefixer()
      ]
    })
  ]
};
