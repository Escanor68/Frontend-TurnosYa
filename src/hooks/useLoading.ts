import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  loadingStates: Record<string, boolean>;
}

export const useLoading = (initialState = false) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: initialState,
    loadingStates: {},
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const setLoadingState = useCallback((key: string, loading: boolean) => {
    setState((prev) => ({
      ...prev,
      loadingStates: { ...prev.loadingStates, [key]: loading },
    }));
  }, []);

  const withLoading = useCallback(
    async <T>(asyncFn: () => Promise<T>, loadingKey?: string): Promise<T> => {
      try {
        if (loadingKey) {
          setLoadingState(loadingKey, true);
        } else {
          setLoading(true);
        }

        const result = await asyncFn();
        return result;
      } finally {
        if (loadingKey) {
          setLoadingState(loadingKey, false);
        } else {
          setLoading(false);
        }
      }
    },
    [setLoading, setLoadingState]
  );

  const isAnyLoading = useCallback(() => {
    return state.isLoading || Object.values(state.loadingStates).some(Boolean);
  }, [state.isLoading, state.loadingStates]);

  const clearLoadingStates = useCallback(() => {
    setState({
      isLoading: false,
      loadingStates: {},
    });
  }, []);

  return {
    isLoading: state.isLoading,
    loadingStates: state.loadingStates,
    setLoading,
    setLoadingState,
    withLoading,
    isAnyLoading,
    clearLoadingStates,
  };
};
