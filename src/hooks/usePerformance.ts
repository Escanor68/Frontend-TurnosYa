import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  // cspell:disable-next-line
  ttfb: number | null; // Time to First Byte
}

// Tipos específicos para las entradas de performance
interface PerformanceEntryWithProcessing extends PerformanceEntry {
  processingStart?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
}

interface PerformanceObserver {
  observe: (entry: { entryTypes: string[] }) => void;
  disconnect: () => void;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    // cspell:disable-next-line
    ttfb: null,
  });

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar si Performance Observer está soportado
    if ('PerformanceObserver' in window) {
      setIsSupported(true);
    }
  }, []);

  const measureFCP = useCallback(() => {
    if (!isSupported) return;

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
    return observer;
  }, [isSupported]);

  const measureLCP = useCallback(() => {
    if (!isSupported) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    return observer;
  }, [isSupported]);

  const measureFID = useCallback(() => {
    if (!isSupported) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntryWithProcessing;
        if (fidEntry.processingStart && entry.startTime) {
          const fid = fidEntry.processingStart - entry.startTime;
          setMetrics((prev) => ({ ...prev, fid }));
        }
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    return observer;
  }, [isSupported]);

  const measureCLS = useCallback(() => {
    if (!isSupported) return;

    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const clsEntry = entry as LayoutShiftEntry;
        if (!clsEntry.hadRecentInput && clsEntry.value !== undefined) {
          clsValue += clsEntry.value;
          setMetrics((prev) => ({ ...prev, cls: clsValue }));
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    return observer;
  }, [isSupported]);

  const measureTTFB = useCallback(() => {
    if (!isSupported) return;

    const navigationEntry = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      // cspell:disable-next-line
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      // cspell:disable-next-line
      setMetrics((prev) => ({ ...prev, ttfb }));
    }
  }, [isSupported]);

  useEffect(() => {
    const observers: PerformanceObserver[] = [];

    // Medir TTFB inmediatamente
    measureTTFB();

    // Configurar observers para métricas web vitals
    const fcpObserver = measureFCP();
    const lcpObserver = measureLCP();
    const fidObserver = measureFID();
    const clsObserver = measureCLS();

    if (fcpObserver) observers.push(fcpObserver);
    if (lcpObserver) observers.push(lcpObserver);
    if (fidObserver) observers.push(fidObserver);
    if (clsObserver) observers.push(clsObserver);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [measureFCP, measureLCP, measureFID, measureCLS, measureTTFB]);

  const getPerformanceScore = useCallback(() => {
    let score = 100;

    // Penalizar por métricas pobres
    if (metrics.fcp && metrics.fcp > 2000) score -= 10;
    if (metrics.lcp && metrics.lcp > 4000) score -= 15;
    if (metrics.fid && metrics.fid > 100) score -= 10;
    if (metrics.cls && metrics.cls > 0.1) score -= 10;
    // cspell:disable-next-line
    if (metrics.ttfb && metrics.ttfb > 600) score -= 5;

    return Math.max(0, score);
  }, [metrics]);

  const logMetrics = useCallback(() => {
    console.group('🚀 Performance Metrics');
    console.log(`FCP: ${metrics.fcp?.toFixed(2)}ms`);
    console.log(`LCP: ${metrics.lcp?.toFixed(2)}ms`);
    console.log(`FID: ${metrics.fid?.toFixed(2)}ms`);
    console.log(`CLS: ${metrics.cls?.toFixed(3)}`);
    // cspell:disable-next-line
    console.log(`TTFB: ${metrics.ttfb?.toFixed(2)}ms`);
    console.log(`Score: ${getPerformanceScore()}/100`);
    console.groupEnd();
  }, [metrics, getPerformanceScore]);

  return {
    metrics,
    isSupported,
    getPerformanceScore,
    logMetrics,
  };
};
