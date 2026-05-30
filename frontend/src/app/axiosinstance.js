import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// A plain axios instance used ONLY for the refresh call.
// It has no interceptors, so a failed refresh can never trigger another refresh.
const refreshAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401s
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Never retry the same request twice
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Only attempt refresh on admin routes — public pages that get a 401
    // should just fail silently, never trigger a refresh or redirect loop.
    const isAdminRoute = window.location.pathname.startsWith('/ctrl');
    if (!isAdminRoute) {
      return Promise.reject(error);
    }

    // Already on the login page — don't redirect again
    if (window.location.pathname === '/ctrl/login') {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => axiosInstance(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      // refreshAxios has no interceptors — if this 401s it goes straight to catch, no loop
      await refreshAxios.post('/auth/refresh', {});
      processQueue(null);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      // Refresh token expired — force re-login
      window.location.href = '/ctrl/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;