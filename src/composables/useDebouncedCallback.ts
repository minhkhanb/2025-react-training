/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useRef } from 'react';

type UseDebouncedFunction<T extends (...args: any[]) => void> = {
  (this: void, ...args: Parameters<T>): void;
  cancel: () => void;
};

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay = 800,
  deps: React.DependencyList = []
): UseDebouncedFunction<T> {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef<T>(callback);

  // Always keep latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const debounced = useCallback((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, deps) as UseDebouncedFunction<T>;

  debounced.cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return debounced;
}
