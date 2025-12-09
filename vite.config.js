import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // указывает, что index.html в корне
  base: './', // Use relative paths for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    open: true, // автоматически открывает браузер при запуске
  },
});