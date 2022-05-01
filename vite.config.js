import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import config from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '/@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: config.name,
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: { vue: 'Vue' },
      },
    },
  },
});
