import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (unauthorized) - token expired or invalid
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired, clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    // Improve error messages for network errors
    if (!error.response) {
      // Network error - server not reachable
      const networkError = new Error(
        error.message || 'Network Error: Could not reach server. Is the backend running?'
      );
      return Promise.reject(networkError);
    }
    return Promise.reject(error);
  }
);

export default api;
