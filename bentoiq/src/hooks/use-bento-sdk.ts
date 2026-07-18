"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { toastError } from "@/lib/toast";

interface UseSdkOperationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retries?: number;
}

/**
 * Custom hook to execute Bento SDK operations with built-in loading, error handling, and retry logic.
 */
export function useBentoOperation<T>() {
  const { sdk, isConnected } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (
      operation: (sdkInstance: NonNullable<typeof sdk>) => Promise<T>,
      options: UseSdkOperationOptions<T> = {}
    ): Promise<T | null> => {
      if (!sdk) {
        const err = new Error("Bento SDK is not initialized.");
        setError(err);
        toastError("SDK Error", err.message);
        return null;
      }

      const retries = options.retries ?? 2;
      setIsLoading(true);
      setError(null);

      let attempt = 0;
      while (attempt <= retries) {
        try {
          const result = await operation(sdk);
          setIsLoading(false);
          if (options.onSuccess) options.onSuccess(result);
          return result;
        } catch (err) {
          attempt++;
          const errorObj = err instanceof Error ? err : new Error(String(err));

          if (attempt > retries) {
            setIsLoading(false);
            setError(errorObj);
            toastError("Operation Failed", errorObj.message);
            if (options.onError) options.onError(errorObj);
            return null;
          }
          // Backoff before retry
          await new Promise((res) => setTimeout(res, 500 * Math.pow(2, attempt)));
        }
      }
      setIsLoading(false);
      return null;
    },
    [sdk]
  );

  return {
    execute,
    isLoading,
    error,
    isConnected,
  };
}
