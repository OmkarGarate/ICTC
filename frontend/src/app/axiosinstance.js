import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  withCredentials: true, // send cookies (access_token, refresh_token) on every request
});

export default axiosInstance; 