import { defineConfig } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fullReload from 'vite-plugin-full-reload';

const entries = {
  'uofg-web-components': path.resolve(__dirname, 'src/main.js'),
};

fs.readdirSync(path.resolve(__dirname, 'src', 'components'), { withFileTypes: true }).forEach(file => {
  if (file.isFile() && file.name.startsWith('uofg-') && file.name.endsWith('.svelte')) {
    entries[path.basename(file.name, '.svelte')] = path.join(file.path, file.name);
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), fullReload('src/**/*', { delay: 100 })],
  build: {
    outDir: 'dist/uofg-web-components',
    lib: {
      entry: entries,
      name: 'UofGWebComponents',
      formats: ['es'],
      fileName: (format, name) => (format === 'es' ? `${name}.esm.js` : `${name}.${format}.js`),
    },
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name == 'style.css') return 'uofg-web-components.css';
          return assetInfo.name;
        },
      },
    },
  },
  server: {
    hmr: false,
  },
});
