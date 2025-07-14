// Configuración de optimizaciones de performance

export const PERFORMANCE_CONFIG = {
  // Configuración de lazy loading
  lazyLoading: {
    // Tiempo de debounce para búsquedas
    searchDebounceMs: 300,
    // Tiempo de throttle para scroll
    scrollThrottleMs: 16,
    // Overscan para virtualización
    virtualizationOverscan: 5,
  },

  // Configuración de imágenes
  images: {
    // Tamaños de imagen para diferentes dispositivos
    sizes: {
      mobile: {
        width: 400,
        quality: 80,
      },
      tablet: {
        width: 600,
        quality: 85,
      },
      desktop: {
        width: 800,
        quality: 90,
      },
    },
    // Formato preferido para imágenes
    preferredFormat: 'webp',
    // Fallback format
    fallbackFormat: 'jpeg',
  },

  // Configuración de cache
  cache: {
    // Tiempo de cache para datos estáticos (en segundos)
    staticData: 3600, // 1 hora
    // Tiempo de cache para datos dinámicos (en segundos)
    dynamicData: 300, // 5 minutos
    // Tiempo de cache para imágenes (en segundos)
    images: 86400, // 24 horas
  },

  // Configuración de bundle splitting
  bundleSplitting: {
    // Tamaño máximo de chunk (en KB)
    maxChunkSize: 1000,
    // Tamaño de advertencia de chunk (en KB)
    chunkSizeWarningLimit: 1000,
  },

  // Configuración de métricas de performance
  metrics: {
    // Umbrales para métricas de Core Web Vitals
    thresholds: {
      fcp: 2000, // First Contentful Paint (ms)
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100, // First Input Delay (ms)
      cls: 0.1, // Cumulative Layout Shift
      tbt: 300, // Total Blocking Time (ms)
      si: 3400, // Speed Index (ms)
    },
    // Puntuaciones mínimas de Lighthouse
    lighthouse: {
      performance: 90,
      accessibility: 90,
      bestPractices: 90,
      seo: 90,
    },
  },

  // Configuración de optimizaciones específicas
  optimizations: {
    // Habilitar compresión de imágenes
    imageCompression: true,
    // Habilitar lazy loading de imágenes
    imageLazyLoading: true,
    // Habilitar virtualización de listas
    listVirtualization: true,
    // Habilitar memoización de componentes
    componentMemoization: true,
    // Habilitar debounce en búsquedas
    searchDebounce: true,
    // Habilitar throttle en scroll
    scrollThrottle: true,
  },
};

// Configuración de preload de recursos críticos
export const CRITICAL_RESOURCES = [
  // Fuentes críticas
  '/fonts/inter-var.woff2',
  // CSS crítico
  '/src/index.css',
  // JavaScript crítico
  '/src/main.tsx',
];

// Configuración de precarga de rutas
export const PRELOAD_ROUTES = ['/dashboard', '/profile', '/bookings', '/admin'];

// Configuración de service worker
export const SERVICE_WORKER_CONFIG = {
  // Estrategias de cache
  cacheStrategies: {
    // Cache first para recursos estáticos
    static: 'cache-first',
    // Network first para datos dinámicos
    dynamic: 'network-first',
    // Stale while revalidate para imágenes
    images: 'stale-while-revalidate',
  },
  // Recursos para cache offline
  offlineResources: ['/', '/offline.html', '/manifest.json'],
};

// Configuración de optimizaciones de red
export const NETWORK_OPTIMIZATIONS = {
  // Compresión de respuestas
  compression: true,
  // HTTP/2 push
  http2Push: true,
  // DNS prefetch
  dnsPrefetch: [
    '//fonts.googleapis.com',
    '//maps.googleapis.com',
    '//api.mercadopago.com',
  ],
  // Preconnect
  preconnect: [
    'https://fonts.googleapis.com',
    'https://maps.googleapis.com',
    'https://api.mercadopago.com',
  ],
};

// Configuración de monitoreo de performance
export const PERFORMANCE_MONITORING = {
  // Habilitar monitoreo de métricas
  enabled: true,
  // Intervalo de reporte (en ms)
  reportInterval: 5000,
  // Umbral para reportar métricas lentas
  slowThreshold: 3000,
  // Endpoint para enviar métricas
  endpoint: '/api/metrics',
};
