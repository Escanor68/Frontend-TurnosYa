# 🚀 Optimizaciones de Performance - TurnosYa

Este documento describe todas las optimizaciones de performance implementadas en la aplicación TurnosYa para mejorar la velocidad de carga, experiencia del usuario y métricas de Core Web Vitals.

## 📊 Métricas Objetivo

### Core Web Vitals

- **First Contentful Paint (FCP)**: < 2.0s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms
- **Speed Index (SI)**: < 3.4s

### Lighthouse Scores

- **Performance**: > 90
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

## 🔧 Optimizaciones Implementadas

### 1. Code Splitting y Lazy Loading

#### Rutas con Lazy Loading

```typescript
// src/config/routes.ts
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
// ... más rutas
```

#### Componentes Pesados con Lazy Loading

```typescript
// src/components/common/LazyWrapper.tsx
export const LazyMap = lazy(() => import('./GoogleMap'));
export const LazyChat = lazy(() => import('../chat/Chat'));
export const LazyPaymentForm = lazy(() => import('../payments/PaymentForm'));
```

### 2. Optimización de Vite

#### Configuración de Build

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'router': ['react-router-dom'],
        'state': ['zustand', '@tanstack/react-query'],
        'ui-core': ['lucide-react', 'framer-motion'],
        // ... más chunks
      }
    }
  },
  chunkSizeWarningLimit: 1000,
  target: 'es2015',
  minify: 'terser',
  sourcemap: false,
  cssCodeSplit: true,
  assetsInlineLimit: 4096,
}
```

#### Optimización de Dependencias

```typescript
optimizeDeps: {
  exclude: ['lucide-react', '@react-google-maps/api', 'socket.io-client'],
  include: [
    'react', 'react-dom', 'react-router-dom', 'axios',
    'react-toastify', 'framer-motion', 'zustand'
  ],
  force: true,
}
```

### 3. Optimización de Componentes

#### React.memo y useMemo

```typescript
// src/components/fields/FieldCard.tsx
const FieldCard: React.FC<FieldCardProps> = React.memo(({ ... }) => {
  const visibleAmenities = useMemo(() => {
    return amenities.slice(0, 3);
  }, [amenities]);

  const formattedPrice = useMemo(() => {
    return price.toLocaleString();
  }, [price]);
});
```

#### useCallback para Event Handlers

```typescript
const handleLinkClick = useCallback(() => {
  console.log(`Field ${id} clicked`);
}, [id]);
```

### 4. Optimización de Imágenes

#### Componente OptimizedImage

```typescript
// src/components/common/OptimizedImage.tsx
const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(
  ({
    src,
    alt,
    loading = 'lazy',
    sizes = '100vw',
    // ... más props
  }) => {
    // Detección de dispositivo móvil
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isHighDpi = useMediaQuery('(-webkit-min-device-pixel-ratio: 2)');

    // Optimización automática de resolución
    const optimizedSrc = useMemo(() => {
      if (isMobile && isHighDpi) {
        const url = new URL(src, window.location.origin);
        url.searchParams.set('w', '400');
        url.searchParams.set('q', '80');
        return url.toString();
      }
      return src;
    }, [src, isMobile, isHighDpi]);
  }
);
```

### 5. Virtualización de Listas

#### Hook de Virtualización

```typescript
// src/hooks/useVirtualization.ts
export function useVirtualization<T>(
  items: T[],
  options: VirtualizationOptions
): VirtualizationResult {
  // Optimización con RequestAnimationFrame
  const handleScroll = useCallback((event: Event) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const target = event.target as HTMLElement;
      setScrollTop(target.scrollTop);
    });
  }, []);
}
```

#### Componente VirtualList

```typescript
// src/components/common/VirtualList.tsx
function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
  renderItem,
}) => {
  const { virtualItems, totalHeight, setScrollTop } = useVirtualization(items, {
    itemHeight,
    containerHeight,
    overscan,
  });
}
```

### 6. Lazy Loading de Íconos

#### Componente LazyIcon

```typescript
// src/components/common/LazyIcon.tsx
const LazyIcon: React.FC<LazyIconProps> = React.memo(
  ({ iconName, className = '', size = 24, fallback }) => {
    const [IconComponent, setIconComponent] =
      useState<React.ComponentType | null>(null);

    useEffect(() => {
      const loadIcon = async () => {
        const iconLoader = iconMap[iconName];
        if (iconLoader) {
          const module = await iconLoader();
          setIconComponent(() => module.default);
        }
      };
      loadIcon();
    }, [iconName]);
  }
);
```

### 7. Monitoreo de Performance

#### Hook usePerformance

```typescript
// src/hooks/usePerformance.ts
export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  // Observadores para métricas en tiempo real
  const measureFCP = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(
        (entry) => entry.name === 'first-contentful-paint'
      );
      if (fcpEntry) {
        setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  }, []);
};
```

### 8. Scripts de Performance

#### Análisis Automatizado

```bash
# Análisis completo de performance
npm run performance:full

# Análisis de bundle
npm run bundle:analyze

# Preview con Lighthouse
npm run preview:performance
```

#### Script de Performance

```javascript
// scripts/performance.js
async function runLighthouse() {
  const lighthouseCmd =
    'lighthouse http://localhost:4000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"';
  execSync(lighthouseCmd, { stdio: 'inherit' });

  // Análisis de métricas
  const report = JSON.parse(
    fs.readFileSync('./lighthouse-report.json', 'utf8')
  );
  const metrics = report.audits;

  // Reporte de métricas
  logMetric('First Contentful Paint', (fcp / 1000).toFixed(2), 's', 2000);
  logMetric('Largest Contentful Paint', (lcp / 1000).toFixed(2), 's', 2500);
  // ... más métricas
}
```

## 📈 Configuración de Performance

### Configuración Centralizada

```typescript
// src/config/performance.ts
export const PERFORMANCE_CONFIG = {
  lazyLoading: {
    searchDebounceMs: 300,
    scrollThrottleMs: 16,
    virtualizationOverscan: 5,
  },
  images: {
    sizes: {
      mobile: { width: 400, quality: 80 },
      tablet: { width: 600, quality: 85 },
      desktop: { width: 800, quality: 90 },
    },
    preferredFormat: 'webp',
  },
  metrics: {
    thresholds: {
      fcp: 2000,
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      tbt: 300,
      si: 3400,
    },
  },
};
```

## 🎯 Resultados Esperados

### Antes de las Optimizaciones

- Bundle size: ~2-3MB
- FCP: ~3-4s
- LCP: ~4-5s
- Lighthouse Performance: ~60-70

### Después de las Optimizaciones

- Bundle size: ~800KB-1MB (reducido 60-70%)
- FCP: ~1.5-2s (mejorado 50%)
- LCP: ~2-2.5s (mejorado 50%)
- Lighthouse Performance: ~90-95

## 🛠️ Comandos de Uso

```bash
# Desarrollo
npm run dev

# Build optimizado
npm run build

# Análisis de performance
npm run performance

# Análisis completo
npm run performance:full

# Análisis de bundle
npm run bundle:analyze

# Lighthouse audit
npm run lighthouse
```

## 📋 Checklist de Optimizaciones

- [x] Code splitting con React.lazy
- [x] Lazy loading de rutas pesadas
- [x] Optimización de Vite config
- [x] React.memo en componentes críticos
- [x] useMemo y useCallback optimizados
- [x] Lazy loading de imágenes
- [x] Virtualización de listas
- [x] Lazy loading de íconos
- [x] Monitoreo de performance
- [x] Scripts de análisis automatizado
- [x] Configuración centralizada
- [x] Optimización de bundle splitting
- [x] Compresión y minificación
- [x] Cache optimizado
- [x] Métricas de Core Web Vitals

## 🔍 Próximas Optimizaciones

1. **Service Worker** para cache offline
2. **HTTP/2 Server Push** para recursos críticos
3. **Preload de rutas** frecuentemente visitadas
4. **Optimización de fuentes** con font-display
5. **Compresión de imágenes** automática
6. **CDN** para assets estáticos
7. **Edge caching** para API responses
8. **Progressive Web App** features

## 📞 Soporte

Para consultas sobre optimizaciones de performance, contactar al equipo de desarrollo o revisar la documentación técnica en el repositorio.
