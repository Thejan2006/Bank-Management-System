const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isDevelopment
    ? 'http://127.0.0.1:8000'
    : 'https://bank-management-system-production-ee76.up.railway.app');
