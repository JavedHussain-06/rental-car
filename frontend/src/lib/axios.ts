import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ─── Request interceptor – attach Bearer token from Zustand store ─── */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // We parse zustand localStorage manually here to avoid react hook rules inside standard TS file
    if (typeof window !== "undefined") {
      try {
        const storedAuth = localStorage.getItem("auth-storage");
        if (storedAuth) {
          const { state } = JSON.parse(storedAuth);
          if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
          }
        }
      } catch (err) {
        console.error("Axios request interceptor auth parse error:", err);
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* ─── Response interceptor – centralised error handling ─── */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";
      }
    }

    // Log the full error for debugging
    if (typeof window !== "undefined") {
      console.error("API ERROR:", {
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        payload: error.config?.data,
      });
    }

    // Reject with the ORIGINAL AxiosError so .response is preserved
    return Promise.reject(error);
  },
);
