import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

interface LoadingOptions {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onComplete?: () => void;
}

export const useLoading = (options: LoadingOptions = {}) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  const withLoading = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const result = await promise;
        setState((prev) => ({ ...prev, isLoading: false }));
        options.onSuccess?.();
        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error('Error inesperado');
        setState((prev) => ({ ...prev, isLoading: false, error: errorObj }));
        options.onError?.(errorObj);
        throw errorObj;
      } finally {
        options.onComplete?.();
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null });
  }, []);

  return {
    ...state,
    withLoading,
    reset,
  };
};
