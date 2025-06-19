import { useState, useCallback, useRef } from 'react';

interface RateLimitOptions {
  maxAttempts: number;
  timeWindow: number; // en milisegundos
  cooldownPeriod?: number; // en milisegundos
}

interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  isBlocked: boolean;
  remainingTime: number;
}

export const useRateLimit = (options: RateLimitOptions) => {
  const { maxAttempts, timeWindow, cooldownPeriod = 0 } = options;
  const [state, setState] = useState<RateLimitState>({
    attempts: 0,
    lastAttempt: 0,
    isBlocked: false,
    remainingTime: 0,
  });
  const intervalRef = useRef<NodeJS.Timeout>();

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const timeSinceLastAttempt = now - state.lastAttempt;

    // Si ha pasado el tiempo de ventana, resetear intentos
    if (timeSinceLastAttempt > timeWindow) {
      setState((prev) => ({
        ...prev,
        attempts: 0,
        isBlocked: false,
        remainingTime: 0,
      }));
      return true;
    }

    // Si está en cooldown, verificar si ya pasó
    if (state.isBlocked && timeSinceLastAttempt > cooldownPeriod) {
      setState((prev) => ({
        ...prev,
        attempts: 0,
        isBlocked: false,
        remainingTime: 0,
      }));
      return true;
    }

    // Si no ha excedido el límite, permitir
    if (state.attempts < maxAttempts) {
      return true;
    }

    // Si excedió el límite, bloquear
    if (!state.isBlocked) {
      setState((prev) => ({
        ...prev,
        isBlocked: true,
        remainingTime: cooldownPeriod,
      }));

      // Iniciar countdown
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const newRemainingTime = Math.max(0, prev.remainingTime - 1000);
          if (newRemainingTime === 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return {
              ...prev,
              attempts: 0,
              isBlocked: false,
              remainingTime: 0,
            };
          }
          return {
            ...prev,
            remainingTime: newRemainingTime,
          };
        });
      }, 1000);
    }

    return false;
  }, [maxAttempts, timeWindow, cooldownPeriod, state]);

  const attempt = useCallback(() => {
    if (!checkRateLimit()) {
      return false;
    }

    const now = Date.now();
    setState((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
      lastAttempt: now,
    }));

    return true;
  }, [checkRateLimit]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState({
      attempts: 0,
      lastAttempt: 0,
      isBlocked: false,
      remainingTime: 0,
    });
  }, []);

  const formatRemainingTime = useCallback(() => {
    const minutes = Math.floor(state.remainingTime / 60000);
    const seconds = Math.floor((state.remainingTime % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [state.remainingTime]);

  return {
    attempt,
    reset,
    isBlocked: state.isBlocked,
    remainingTime: state.remainingTime,
    formatRemainingTime,
    attempts: state.attempts,
    maxAttempts,
  };
};

// Hook específico para formularios
export const useFormRateLimit = (options?: Partial<RateLimitOptions>) => {
  const defaultOptions: RateLimitOptions = {
    maxAttempts: 5,
    timeWindow: 60000, // 1 minuto
    cooldownPeriod: 300000, // 5 minutos
    ...options,
  };

  return useRateLimit(defaultOptions);
};

// Hook específico para login
export const useLoginRateLimit = () => {
  return useRateLimit({
    maxAttempts: 3,
    timeWindow: 300000, // 5 minutos
    cooldownPeriod: 900000, // 15 minutos
  });
};
