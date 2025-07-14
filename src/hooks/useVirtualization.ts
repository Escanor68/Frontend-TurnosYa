import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface VirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  threshold?: number;
}

interface VirtualizationResult {
  virtualItems: Array<{
    index: number;
    offsetTop: number;
    height: number;
  }>;
  totalHeight: number;
  startIndex: number;
  endIndex: number;
  scrollTop: number;
  setScrollTop: (scrollTop: number) => void;
}

export function useVirtualization<T>(
  items: T[],
  options: VirtualizationOptions
): VirtualizationResult {
  const { itemHeight, containerHeight, overscan = 5 } = options;

  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Calcular índices visibles
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  // Generar items virtuales
  const virtualItems = useMemo(() => {
    const items: Array<{ index: number; offsetTop: number; height: number }> =
      [];

    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        index: i,
        offsetTop: i * itemHeight,
        height: itemHeight,
      });
    }

    return items;
  }, [startIndex, endIndex, itemHeight]);

  // Altura total del contenedor virtual
  const totalHeight = items.length * itemHeight;

  // Optimizar scroll con RAF
  const handleScroll = useCallback((event: Event) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const target = event.target as HTMLElement;
      setScrollTop(target.scrollTop);
    });
  }, []);

  // Configurar scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  // Limpiar RAF al desmontar
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    scrollTop,
    setScrollTop,
  };
}

// Hook para detectar cuando un elemento está en el viewport
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<Element | null>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    setEntry(entry);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return { ref: elementRef, isIntersecting, entry };
}

// Hook para optimizar renders con debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook para throttling de eventos
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: unknown[]) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - (now - lastRun.current));
      }
    }) as T,
    [callback, delay]
  );
}
