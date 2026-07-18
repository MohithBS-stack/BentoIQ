import axios, { type AxiosError, type AxiosInstance } from "axios";
import type { ApiError } from "@/types";
import { API_BASE_URL } from "@/lib/constants";

// ─── Axios Instance ───────────────────────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept:         "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Attach auth token when auth is implemented
    // const token = useAuthStore.getState().session?.accessToken;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const apiError: ApiError = {
      code:    error.response?.status?.toString() ?? "NETWORK_ERROR",
      message: "An unexpected error occurred.",
    };

    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      apiError.message = (data?.message as string) ?? apiError.message;
      apiError.code    = (data?.code    as string) ?? apiError.code;
    } else if (error.request) {
      apiError.code    = "NETWORK_ERROR";
      apiError.message = "Network error. Please check your connection.";
    }

    return Promise.reject(apiError);
  }
);

export { apiClient };
