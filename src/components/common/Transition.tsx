import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  duration = 0.3,
  delay = 0,
  className = '',
  onEnter,
  onExit,
}) => {
  const getAnimationProps = () => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.4, 0, 0.2, 1] as const,
    };

    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: baseTransition,
        };

      case 'slide':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 },
          transition: baseTransition,
        };

      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: baseTransition,
        };

      case 'slide-up':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: baseTransition,
        };

      case 'slide-down':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
          transition: baseTransition,
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: baseTransition,
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <AnimatePresence mode="wait" onExitComplete={onExit}>
      {show && (
        <motion.div
          className={className}
          {...animationProps}
          onAnimationStart={onEnter}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
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

// Componente para animaciones de lista
export const ListTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

// Componente para animaciones de página
export const PageTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }}
  >
    {children}
  </motion.div>
);

export default Transition;
