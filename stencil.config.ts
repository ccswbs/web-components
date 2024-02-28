import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import tailwind, { tailwindHMR, tailwindGlobal, PluginOpts } from 'stencil-tailwind-plugin';
import tailwindConfig from './tailwind.config.js';

const twOpts = {
  ...PluginOpts.DEFAULT,
  debug: false,
  stripComments: true,
  tailwindConf: tailwindConfig,
};

export const config: Config = {
  namespace: 'uofg-web-components',
  globalStyle: 'src/styles/global.scss',
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
    sass(),
    tailwindGlobal(twOpts),
    tailwind(twOpts),
    tailwindHMR({
      ...twOpts,
      minify: false,
    }),
  ],
};
