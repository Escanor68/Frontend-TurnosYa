import { useState, useEffect, useMemo } from 'react';

interface UseVirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface UseVirtualizationReturn {
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

export const useVirtualization = (
  itemsCount: number,
  options: UseVirtualizationOptions
): UseVirtualizationReturn => {
  const { itemHeight, containerHeight, overscan = 3 } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = useMemo(
    () => itemsCount * itemHeight,
    [itemsCount, itemHeight]
  );

  const startIndex = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    return Math.max(0, start - overscan);
  }, [scrollTop, itemHeight, overscan]);

  const endIndex = useMemo(() => {
    const end = Math.ceil((scrollTop + containerHeight) / itemHeight);
    return Math.min(itemsCount - 1, end + overscan);
  }, [scrollTop, containerHeight, itemHeight, overscan, itemsCount]);

  const virtualItems = useMemo(() => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        index: i,
        offsetTop: i * itemHeight,
        height: itemHeight,
      });
    }
    return items;
  }, [startIndex, endIndex, itemHeight]);

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    scrollTop,
    setScrollTop,
  };
};

// Hook para debounce de scroll
export const useScrollDebounce = (delay: number = 16) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [debouncedScrollTop, setDebouncedScrollTop] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedScrollTop(scrollTop);
    }, delay);

    return () => clearTimeout(timer);
  }, [scrollTop, delay]);

  return { scrollTop, setScrollTop, debouncedScrollTop };
};
