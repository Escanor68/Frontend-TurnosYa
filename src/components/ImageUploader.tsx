import React, { useState, useCallback, useMemo } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
  maxSize?: number; // en MB
  quality?: number; // 0-1
  lazy?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = React.memo(
  ({
    initialImage,
    onImageChange,
    className = '',
    maxSize = 5, // 5MB por defecto
    quality = 0.8, // 80% de calidad
    lazy = true,
  }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(
      initialImage || null
    );
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Función para comprimir imagen
    const compressImage = useCallback(
      (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();

          img.onload = () => {
            // Calcular nuevas dimensiones manteniendo aspect ratio
            const maxWidth = 1200;
            const maxHeight = 800;
            let { width, height } = img;

            if (width > height) {
              if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Dibujar imagen comprimida
            ctx?.drawImage(img, 0, 0, width, height);

            // Convertir a blob con calidad especificada
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedUrl = URL.createObjectURL(blob);
                  resolve(compressedUrl);
                } else {
                  reject(new Error('Error al comprimir imagen'));
                }
              },
              'image/jpeg',
              quality
            );
          };

          img.onerror = () => reject(new Error('Error al cargar imagen'));
          img.src = URL.createObjectURL(file);
        });
      },
      [quality]
    );

    const handleFile = useCallback(
      async (file: File) => {
        // Verificar que sea una imagen
        if (!file.type.startsWith('image/')) {
          alert('Por favor selecciona un archivo de imagen válido');
          return;
        }

        // Verificar tamaño
        if (file.size > maxSize * 1024 * 1024) {
          alert(`La imagen debe ser menor a ${maxSize}MB`);
          return;
        }

        setIsLoading(true);

        try {
          // Comprimir imagen
          const compressedUrl = await compressImage(file);
          setPreviewUrl(compressedUrl);
          onImageChange(compressedUrl);
        } catch (error) {
          console.error('Error al procesar imagen:', error);
          alert('Error al procesar la imagen. Intenta con otra imagen.');
        } finally {
          setIsLoading(false);
        }
      },
      [maxSize, compressImage, onImageChange]
    );

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          handleFile(file);
        }
      },
      [handleFile]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
          handleFile(file);
        }
      },
      [handleFile]
    );

    const handleRemoveImage = useCallback(() => {
      setPreviewUrl(null);
      onImageChange('');
    }, [onImageChange]);

    const handleImageError = useCallback(() => {
      setPreviewUrl('/placeholder.svg?height=192&width=384');
    }, []);

    const dragClasses = useMemo(() => {
      return `border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-48 transition-colors ${
        isDragging
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-gray-300 hover:border-emerald-400'
      }`;
    }, [isDragging]);

    return (
      <div className={`w-full ${className}`}>
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl || '/placeholder.svg'}
              alt="Vista previa"
              className="w-full h-48 object-cover rounded-md"
              loading={lazy ? 'lazy' : 'eager'}
              onError={handleImageError}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Eliminar imagen"
            >
              <X className="h-4 w-4" />
            </button>
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={dragClasses}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center mb-2">
              Arrastra y suelta una imagen aquí o
            </p>
            <label className="cursor-pointer px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
              <span>Seleccionar archivo</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-xs text-gray-400 mt-2">
              Máximo {maxSize}MB, se comprimirá automáticamente
            </p>
          </div>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
