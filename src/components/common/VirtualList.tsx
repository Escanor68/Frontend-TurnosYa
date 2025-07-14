import React, { useRef, useCallback } from 'react';
import { useVirtualization } from '../../hooks/useVirtualization';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  onScroll?: (scrollTop: number) => void;
}

function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
  renderItem,
  className = '',
  onScroll,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, totalHeight, setScrollTop } = useVirtualization(items, {
    itemHeight,
    containerHeight,
    overscan,
  });

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      setScrollTop(target.scrollTop);
      onScroll?.(target.scrollTop);
    },
    [setScrollTop, onScroll]
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-auto w-full ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div className="relative w-full" style={{ height: totalHeight }}>
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index];
          if (!item) return null;

          return (
            <div
              key={virtualItem.index}
              // Nota: top y height deben ser dinámicos para la virtualización eficiente
              className="absolute left-0 w-full"
              style={{
                top: virtualItem.offsetTop,
                height: virtualItem.height,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(VirtualList) as <T>(
  props: VirtualListProps<T>
) => React.ReactElement;
