import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'cap-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // A "main" agora aponta para o novo index.html (sua Landing Page)
        main: resolve(__dirname, 'index.html'),
        
        // Adicionamos a entrada "app" para o painel do sistema
        app: resolve(__dirname, 'app.html'),
        
        // Demais páginas
        login: resolve(__dirname, 'login.html'),
        admin: resolve(__dirname, 'admin.html'),
        adminLogin: resolve(__dirname, 'admin-login.html'),
        cliente: resolve(__dirname, 'cliente.html'),
        import: resolve(__dirname, 'import.html'),
      }
    }
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
});