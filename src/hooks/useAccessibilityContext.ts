import { useContext } from 'react';
import { AccessibilityContext } from '../components/common/AccessibilityProvider';

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      'useAccessibilityContext debe ser usado dentro de un AccessibilityProvider'
    );
  }
  return context;
};
