import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.png'],
      manifest: {
        name: 'Inventory Control System',
        short_name: 'InventoryCtrl',
        description: 'Sistema Inteligente de Control de Inventarios',
        theme_color: '#0d0f14',
        background_color: '#0d0f14',
        display: 'standalone',
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
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      /* Offline con Workbox*/
      workbox: {
        // extensiones de archivos debe cachear localmente
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Esto redirige cualquier ruta de navegación al index que ya está en caché
        navigateFallback: 'index.html',
        //Evita problemas si el usuario tiene una sesión muy vieja en caché
        cleanupOutdatedCaches: true,
      }
    })
  ],
  base: '/inventory-control-front/',
})