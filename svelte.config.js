import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  extensions: ['.svelte', '.svg', '.svx'],
  compilerOptions: {
    customElement: true,
  },
};
