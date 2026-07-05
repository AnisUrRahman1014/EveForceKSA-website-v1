import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";

// Central place to change the API base URL — swap via .env (VITE_API_BASE_URL)
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token (if present) to every outgoing request
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("eveforce_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Normalize error responses so components only deal with a plain message
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
