import { useCallback, useRef } from 'react';

interface TestUtilsOptions {
  enableMocking?: boolean;
  enableSpying?: boolean;
  enableTiming?: boolean;
}

interface MockFunction<T = unknown> {
  (...args: unknown[]): T;
  calls: Array<{ args: unknown[]; result: T; timestamp: number }>;
  reset: () => void;
  getCallCount: () => number;
  getLastCall: () => { args: unknown[]; result: T; timestamp: number } | null;
}

interface SpyFunction<T = unknown> {
  (...args: unknown[]): T;
  calls: Array<{ args: unknown[]; result: T; timestamp: number }>;
  reset: () => void;
  getCallCount: () => number;
  getLastCall: () => { args: unknown[]; result: T; timestamp: number } | null;
  getCallHistory: () => Array<{
    args: unknown[];
    result: T;
    timestamp: number;
  }>;
}

export const useTestUtils = (options: TestUtilsOptions = {}) => {
  const {
    enableMocking = true,
    enableSpying = true,
    enableTiming = true,
  } = options;

  const mocks = useRef<Map<string, MockFunction>>(new Map());
  const spies = useRef<Map<string, SpyFunction>>(new Map());
  const timers = useRef<Map<string, number>>(new Map());

  // Crear función mock
  const createMock = useCallback(
    <T>(
      name: string,
      implementation?: (...args: unknown[]) => T
    ): MockFunction<T> => {
      if (!enableMocking) {
        throw new Error('Mocking is disabled');
      }

      const calls: Array<{ args: unknown[]; result: T; timestamp: number }> =
        [];

      const mockFn = ((...args: unknown[]) => {
        const timestamp = Date.now();
        const result = implementation
          ? implementation(...args)
          : (undefined as T);
        calls.push({ args, result, timestamp });
        return result;
      }) as MockFunction<T>;

      mockFn.calls = calls;
      mockFn.reset = () => {
        calls.length = 0;
      };
      mockFn.getCallCount = () => calls.length;
      mockFn.getLastCall = () => calls[calls.length - 1] || null;

      mocks.current.set(name, mockFn);
      return mockFn;
    },
    [enableMocking]
  );

  // Crear función spy
  const createSpy = useCallback(
    <T>(
      name: string,
      originalFn: (...args: unknown[]) => T
    ): SpyFunction<T> => {
      if (!enableSpying) {
        throw new Error('Spying is disabled');
      }

      const calls: Array<{ args: unknown[]; result: T; timestamp: number }> =
        [];

      const spyFn = ((...args: unknown[]) => {
        const timestamp = Date.now();
        const result = originalFn(...args);
        calls.push({ args, result, timestamp });
        return result;
      }) as SpyFunction<T>;

      spyFn.calls = calls;
      spyFn.reset = () => {
        calls.length = 0;
      };
      spyFn.getCallCount = () => calls.length;
      spyFn.getLastCall = () => calls[calls.length - 1] || null;
      spyFn.getCallHistory = () => [...calls];

      spies.current.set(name, spyFn);
      return spyFn;
    },
    [enableSpying]
  );

  // Medir tiempo de ejecución
  const measureTime = useCallback(
    <T>(name: string, fn: () => T): T => {
      if (!enableTiming) {
        return fn();
      }

      const startTime = performance.now();
      try {
        const result = fn();
        const endTime = performance.now();
        const duration = endTime - startTime;
        timers.current.set(name, duration);
        return result;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        timers.current.set(`${name}-error`, duration);
        throw error;
      }
    },
    [enableTiming]
  );

  // Medir tiempo de ejecución asíncrona
  const measureTimeAsync = useCallback(
    async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
      if (!enableTiming) {
        return fn();
      }

      const startTime = performance.now();
      try {
        const result = await fn();
        const endTime = performance.now();
        const duration = endTime - startTime;
        timers.current.set(name, duration);
        return result;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        timers.current.set(`${name}-error`, duration);
        throw error;
      }
    },
    [enableTiming]
  );

  // Simular delay
  const delay = useCallback((ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }, []);

  // Simular error
  const simulateError = useCallback(
    (message: string = 'Simulated error'): never => {
      throw new Error(message);
    },
    []
  );

  // Simular datos
  const createMockData = useCallback(
    <T>(template: Partial<T>, count: number = 1): T[] => {
      const data: T[] = [];
      for (let i = 0; i < count; i++) {
        const item = { ...template } as T;
        // Agregar ID único si no existe
        if (!(item as Record<string, unknown>).id) {
          (item as Record<string, unknown>).id = `mock-${i + 1}`;
        }
        data.push(item);
      }
      return data;
    },
    []
  );

  // Validar estructura de datos
  const validateDataStructure = useCallback(
    <T>(data: unknown, schema: Record<string, string>): data is T => {
      if (typeof data !== 'object' || data === null) {
        return false;
      }

      const obj = data as Record<string, unknown>;

      for (const [key, expectedType] of Object.entries(schema)) {
        if (!(key in obj)) {
          return false;
        }

        const value = obj[key];
        const actualType = typeof value;

        if (actualType !== expectedType) {
          return false;
        }
      }

      return true;
    },
    []
  );

  // Limpiar todos los mocks y spies
  const cleanup = useCallback(() => {
    mocks.current.clear();
    spies.current.clear();
    timers.current.clear();
  }, []);

  // Obtener estadísticas
  const getStats = useCallback(() => {
    const mockStats = Array.from(mocks.current.entries()).map(
      ([name, mock]) => ({
        name,
        type: 'mock',
        callCount: mock.getCallCount(),
        lastCall: mock.getLastCall(),
      })
    );

    const spyStats = Array.from(spies.current.entries()).map(([name, spy]) => ({
      name,
      type: 'spy',
      callCount: spy.getCallCount(),
      lastCall: spy.getLastCall(),
    }));

    const timerStats = Array.from(timers.current.entries()).map(
      ([name, duration]) => ({
        name,
        type: 'timer',
        duration,
      })
    );

    return {
      mocks: mockStats,
      spies: spyStats,
      timers: timerStats,
      totalMocks: mocks.current.size,
      totalSpies: spies.current.size,
      totalTimers: timers.current.size,
    };
  }, []);

  return {
    // Funciones principales
    createMock,
    createSpy,
    measureTime,
    measureTimeAsync,
    delay,
    simulateError,
    createMockData,
    validateDataStructure,

    // Utilidades
    cleanup,
    getStats,

    // Acceso directo a mocks y spies
    getMock: (name: string) => mocks.current.get(name),
    getSpy: (name: string) => spies.current.get(name),
    getTimer: (name: string) => timers.current.get(name),

    // Estado
    mockCount: mocks.current.size,
    spyCount: spies.current.size,
    timerCount: timers.current.size,
  };
};
