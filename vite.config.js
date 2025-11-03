import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // указывает, что index.html в корне
  server: {
    open: true, // автоматически открывает браузер при запуске
  },
});