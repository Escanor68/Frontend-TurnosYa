import React from 'react';
import { FadeTransition } from './Transition';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  fullScreen?: boolean;
  text?: string;
  showText?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = React.memo(
  ({
    size = 'md',
    color = 'border-primary-500',
    className = '',
    fullScreen = false,
    text = 'Cargando...',
    showText = false,
  }) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };

    const spinner = (
      <div className="flex flex-col items-center justify-center">
        <div
          className={`animate-spin rounded-full border-2 border-t-transparent ${color} ${sizeClasses[size]} ${className}`}
        />
        {showText && text && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    );

    if (fullScreen) {
      return (
        <FadeTransition show={true}>
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            {spinner}
          </div>
        </FadeTransition>
      );
    }

    return <FadeTransition show={true}>{spinner}</FadeTransition>;
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
