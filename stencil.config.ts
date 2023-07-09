import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'uofg-web-components',
  globalStyle: 'src/global.scss',
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
  },
  validatePrimaryPackageOutputTarget: true,
  plugins: [inlineSvg(), sass()],
};
