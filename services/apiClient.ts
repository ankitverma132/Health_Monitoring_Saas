import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refresh_token: refreshToken,
          });
          localStorage.setItem('authToken', data.auth_token);
          apiClient.defaults.headers.common.Authorization = `Bearer ${data.auth_token}`;
          return apiClient(originalRequest);
        } catch {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
