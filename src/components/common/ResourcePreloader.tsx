import React, { useEffect } from 'react';

interface ResourcePreloaderProps {
  fonts?: string[];
  images?: string[];
  scripts?: string[];
  stylesheets?: string[];
}

const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  fonts = [],
  images = [],
  scripts = [],
  stylesheets = [],
}) => {
  useEffect(() => {
    // Preload fonts
    fonts.forEach((font) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = font;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical images
    images.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image;
      document.head.appendChild(link);
    });

    // Preload critical scripts
    scripts.forEach((script) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = script;
      document.head.appendChild(link);
    });

    // Preload critical stylesheets
    stylesheets.forEach((stylesheet) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = stylesheet;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove preload links when component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [fonts, images, scripts, stylesheets]);

  // This component doesn't render anything
  return null;
};

export default ResourcePreloader;
