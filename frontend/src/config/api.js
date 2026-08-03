/**
 * Centralized API configuration for VERITAS frontend.
 * Resolves API URL from environment variables without hardcoding localhost in production.
 */
export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE;
  if (envUrl) {
    const cleanUrl = envUrl.replace(/\/$/, "");
    return cleanUrl.endsWith("/api/v1") ? cleanUrl : `${cleanUrl}/api/v1`;
  }
  return import.meta.env.PROD
    ? "/api/v1"
    : "http://localhost:8000/api/v1";
};

export const API_BASE_URL = getApiBaseUrl();
