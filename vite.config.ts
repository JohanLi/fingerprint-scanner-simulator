import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
      },
    }),
  ],
  base: process.env.BASE_PATH ? process.env.BASE_PATH : undefined,
});
