import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Compresión automática para producción
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Solo comprimir archivos > 10KB
      deleteOriginFile: false,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    // PWA para mejor caching
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 4000,
    host: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
      '/api/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/api/users': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Optimización de chunks mejorada
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React
          if (id.includes('react') && !id.includes('react-router')) {
            return 'react-vendor';
          }
          // Routing
          if (id.includes('react-router')) {
            return 'router';
          }
          // State management
          if (id.includes('zustand') || id.includes('@tanstack/react-query')) {
            return 'state';
          }
          // UI Libraries
          if (id.includes('lucide-react') || id.includes('framer-motion')) {
            return 'ui-core';
          }
          if (id.includes('@radix-ui') || id.includes('react-modal')) {
            return 'ui-components';
          }
          // HTTP & Utils
          if (
            id.includes('axios') ||
            id.includes('react-toastify') ||
            id.includes('react-hot-toast')
          ) {
            return 'http-utils';
          }
          // Forms & Validation
          if (
            id.includes('react-hook-form') ||
            id.includes('@hookform/resolvers') ||
            id.includes('zod') ||
            id.includes('yup')
          ) {
            return 'forms';
          }
          // Maps & External
          if (id.includes('@react-google-maps')) {
            return 'maps';
          }
          if (
            id.includes('socket.io-client') ||
            id.includes('react-intersection-observer')
          ) {
            return 'external';
          }
          // Utilities
          if (
            id.includes('clsx') ||
            id.includes('tailwind-merge') ||
            id.includes('date-fns')
          ) {
            return 'utils';
          }
          // Vendor chunks para node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimizar nombres de archivos para cache
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split('/')
                .pop()
                ?.replace('.tsx', '')
                .replace('.ts', '') || 'chunk'
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `css/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|eot/i.test(ext || '')) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    // Optimizaciones de build mejoradas
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 3, // Más pasos para mejor compresión
        toplevel: true, // Optimizar variables de nivel superior
        unsafe: true, // Optimizaciones "unsafe" para mejor compresión
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        safari10: true,
        toplevel: true, // Mangle variables de nivel superior
      },
      format: {
        comments: false,
      },
    },
    // Generar source maps solo en desarrollo
    sourcemap: false,
    // Optimizar CSS
    cssCodeSplit: true,
    // Optimizar assets
    assetsInlineLimit: 4096,
    // Chunk size warnings más permisivos
    chunkSizeWarningLimit: 2000,
    // Reporte de bundle size
    reportCompressedSize: true,
  },
  optimizeDeps: {
    // Excluir dependencias que no necesitan pre-bundling
    exclude: ['lucide-react', '@react-google-maps/api', 'socket.io-client'],
    // Incluir dependencias que sí necesitan pre-bundling
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'react-toastify',
      'framer-motion',
      'zustand',
      '@tanstack/react-query',
      'react-hook-form',
      'zod',
    ],
    // Force pre-bundling para dependencias problemáticas
    force: true,
    // Optimización de esbuild
    esbuildOptions: {
      target: 'es2015',
      minify: true,
      treeShaking: true,
    },
  },
  // Optimización de CSS
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [autoprefixer],
    },
  },
  // Configuración de assets
  assetsInclude: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.svg',
    '**/*.webp',
    '**/*.avif',
  ],
  // Configuración de resolución
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Configuración para desarrollo
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  // Optimización de preview
  preview: {
    port: 4000,
    host: true,
  },
});
