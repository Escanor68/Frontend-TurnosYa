import { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment debe ser usado dentro de un PaymentProvider');
  }
  return context;
};
