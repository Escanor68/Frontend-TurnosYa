import { useState } from 'react';

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);
      return await fn();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, withLoading };
};