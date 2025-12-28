import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: './',
  build: {
    outDir: 'cap-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
        login: resolve(__dirname, 'login.html'),
        admin: resolve(__dirname, 'admin.html'),
        adminLogin: resolve(__dirname, 'admin-login.html'),
        cliente: resolve(__dirname, 'cliente.html'),
        import: resolve(__dirname, 'import.html'),
        publicRegister: resolve(__dirname, 'publicRegister.html'),
        // Se você tiver o arquivo install.html, descomente a linha abaixo:
         install: resolve(__dirname, 'install.html'),
      }
    }
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'assets/*'],
      manifest: {
        name: 'Kairos Gestão',
        short_name: 'Kairos',
        description: 'Gestão Profissional para o seu negócio',
        theme_color: '#ffffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/login.html',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: null,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        // AUMENTADO PARA 5MB PARA ACEITAR SUAS IMAGENS DE FUNDO
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 
      }
    })
  ]
});