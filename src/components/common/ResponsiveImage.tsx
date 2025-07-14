import React, { useState, useCallback, useMemo } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = React.memo(
  ({
    src,
    alt,
    className = '',
    mobileSrc,
    tabletSrc,
    desktopSrc,
    sizes = '100vw',
    loading = 'lazy',
    onLoad,
    onError,
    fallbackSrc = '/placeholder.svg',
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Detectar tipo de dispositivo
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery(
      '(min-width: 769px) and (max-width: 1024px)'
    );
    const isDesktop = useMediaQuery('(min-width: 1025px)');

    // Seleccionar la imagen apropiada según el dispositivo
    const imageSrc = useMemo(() => {
      if (imageError) return fallbackSrc;

      // Si hay imágenes específicas para cada dispositivo, usarlas
      if (isMobile && mobileSrc) return mobileSrc;
      if (isTablet && tabletSrc) return tabletSrc;
      if (isDesktop && desktopSrc) return desktopSrc;

      // Si no hay imágenes específicas, usar la original
      return src;
    }, [
      src,
      mobileSrc,
      tabletSrc,
      desktopSrc,
      isMobile,
      isTablet,
      isDesktop,
      imageError,
      fallbackSrc,
    ]);

    // Generar srcSet para diferentes resoluciones
    const srcSet = useMemo(() => {
      const baseSrc = imageSrc;
      if (!baseSrc || baseSrc === fallbackSrc) return undefined;

      // Crear srcSet para diferentes densidades de píxeles
      const densities = [1, 1.5, 2, 3];
      return densities
        .map((density) => {
          // En una implementación real, aquí generarías URLs con diferentes resoluciones
          // Por ahora, usamos la misma imagen
          return `${baseSrc} ${density}x`;
        })
        .join(', ');
    }, [imageSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
      setImageLoaded(true);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      setImageError(true);
      setImageLoaded(true);
      onError?.();
    }, [onError]);

    const imageClasses = useMemo(() => {
      return `transition-opacity duration-300 ${className} ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      }`;
    }, [imageLoaded, className]);

    return (
      <img
        src={imageSrc}
        alt={alt}
        className={imageClasses}
        loading={loading}
        sizes={sizes}
        srcSet={srcSet}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          // Optimizaciones adicionales
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />
    );
  }
);

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
