import React, { useState, useEffect } from 'react';
// import { useEnterAnimation } from '../../hooks/useEnterAnimation';

interface TransitionProps {
  show: boolean;
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down';
  duration?: number;
  delay?: number;
  className?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

const Transition: React.FC<TransitionProps> = ({
  show,
  children,
  type = 'fade',
  duration = 300,
  delay = 0,
  className = '',
  onEnter,
  onExit,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        onEnter?.();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onExit?.();
      }, duration + delay);
      return () => clearTimeout(timer);
    }
  }, [show, duration, delay, onEnter, onExit]);

  if (!isVisible) return null;

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out';

    switch (type) {
      case 'fade':
        return `${baseClasses} ${show ? 'opacity-100' : 'opacity-0'}`;

      case 'slide':
        return `${baseClasses} ${show ? 'translate-x-0' : '-translate-x-full'}`;

      case 'scale':
        return `${baseClasses} ${show ? 'scale-100' : 'scale-95 opacity-0'}`;

      case 'slide-up':
        return `${baseClasses} ${
          show ? 'translate-y-0' : 'translate-y-4 opacity-0'
        }`;

      case 'slide-down':
        return `${baseClasses} ${
          show ? 'translate-y-0' : '-translate-y-4 opacity-0'
        }`;

      default:
        return baseClasses;
    }
  };

  return (
    <div
      className={`${getTransitionClasses()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Componentes específicos para casos de uso comunes
export const FadeTransition: React.FC<Omit<TransitionProps, 'type'>> = (
  props
) => <Transition {...props} type="fade" />;

export const SlideTransition: React.FC<Omit<TransitionProps, 'type'>> = (
  props
) => <Transition {...props} type="slide" />;

export const ScaleTransition: React.FC<Omit<TransitionProps, 'type'>> = (
  props
) => <Transition {...props} type="scale" />;

export const SlideUpTransition: React.FC<Omit<TransitionProps, 'type'>> = (
  props
) => <Transition {...props} type="slide-up" />;

export const SlideDownTransition: React.FC<Omit<TransitionProps, 'type'>> = (
  props
) => <Transition {...props} type="slide-down" />;

export default Transition;
