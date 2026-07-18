"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:            60_000,
        gcTime:               5 * 60_000,
        retry:                2,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: 0 },
    },
  });
}

let browserQueryClient: QueryClient | undefined;
function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          position="bottom-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              background:    "var(--bg-elevated)",
              border:        "1px solid var(--border-default)",
              color:         "var(--text-primary)",
              fontFamily:    "var(--font-sans)",
              borderRadius:  "var(--radius-lg)",
              fontSize:      "13px",
              backdropFilter:"blur(20px)",
            },
            className: "sonner-toast",
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
