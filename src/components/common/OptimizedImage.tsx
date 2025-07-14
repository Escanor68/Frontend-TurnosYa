import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean; // Para imágenes críticas (above the fold)
  sizes?: string; // Para responsive images
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(
  ({
    src,
    alt,
    className,
    fallbackSrc = '/placeholder.svg',
    placeholder,
    onLoad,
    onError,
    priority = false,
    sizes = '100vw',
    loading = 'lazy',
  }) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const imgRef = useRef<HTMLImageElement>(null);

    // Preload critical images
    useEffect(() => {
      if (priority && src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    }, [priority, src]);

    const handleLoad = useCallback(() => {
      setIsLoading(false);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      setIsLoading(false);

      if (imageSrc !== fallbackSrc) {
        setImageSrc(fallbackSrc);
      } else {
        onError?.();
      }
    }, [imageSrc, fallbackSrc, onError]);

    // Reset state when src changes
    useEffect(() => {
      setImageSrc(src);
      setIsLoading(true);
    }, [src]);

    // Intersection Observer para lazy loading mejorado
    useEffect(() => {
      if (!imgRef.current || priority || loading === 'eager') return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
          threshold: 0.01,
        }
      );

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }, [priority, loading]);

    // Mostrar placeholder mientras carga
    if (isLoading && placeholder) {
      return <>{placeholder}</>;
    }

    return (
      <img
        ref={imgRef}
        src={priority || loading === 'eager' ? imageSrc : undefined}
        data-src={!priority && loading === 'lazy' ? imageSrc : undefined}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        sizes={sizes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        // Optimizaciones adicionales
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
