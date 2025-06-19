import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave';
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
}) => {
  const baseClasses = `bg-gray-200 dark:bg-gray-700 rounded ${
    animation === 'pulse' ? 'animate-pulse' : 'animate-pulse'
  }`;

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    card: 'h-48 rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height)
    style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Componentes específicos para casos de uso comunes
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '75%' : '100%'}
        className="h-4"
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${className}`}
  >
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" className="h-4 mb-2" />
        <Skeleton variant="text" width="40%" className="h-3" />
      </div>
    </div>
    <Skeleton variant="rectangular" height={120} className="mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton variant="text" width="30%" className="h-4" />
      <Skeleton variant="text" width="20%" className="h-4" />
    </div>
  </div>
);

export const SkeletonFieldCard: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={`bg-white rounded-xl overflow-hidden shadow-md ${className}`}>
    <Skeleton variant="rectangular" height={192} className="w-full" />
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <Skeleton variant="text" width="60%" className="h-6" />
        <div className="flex items-center">
          <Skeleton
            variant="circular"
            width={20}
            height={20}
            className="mr-1"
          />
          <Skeleton variant="text" width={20} className="h-4" />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <Skeleton variant="circular" width={20} height={20} className="mr-2" />
        <Skeleton variant="text" width="70%" className="h-4" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="text" width={60} className="h-6" />
        ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width={50} className="h-4" />
        <Skeleton variant="text" width={50} className="h-4" />
        <Skeleton variant="text" width={80} className="h-6" />
      </div>
      <Skeleton
        variant="rectangular"
        height={48}
        className="w-full rounded-lg"
      />
    </div>
  </div>
);

export default Skeleton;
