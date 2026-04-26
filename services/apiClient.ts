import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import * as mockData from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock interceptor - intercepts requests and returns mock data
if (USE_MOCK_DATA) {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config as InternalAxiosRequestConfig;
      const url = config.url || '';
      const method = config.method?.toUpperCase();

      // Mock login
      if (url.includes('/auth/login') && method === 'POST') {
        return {
          data: mockData.mockAuthResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock register
      if (url.includes('/auth/register') && method === 'POST') {
        return {
          data: mockData.mockAuthResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock get profile
      if (url.includes('/users/profile') && method === 'GET') {
        return {
          data: mockData.mockUser,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock fetch metrics
      if (url.includes('/health-metrics') && method === 'GET') {
        return {
          data: mockData.mockMetrics,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock fetch goals
      if (url.includes('/health-goals') && method === 'GET') {
        return {
          data: mockData.mockGoals,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock create goal
      if (url.includes('/health-goals') && method === 'POST') {
        const newGoal = {
          goal_id: String(mockData.mockGoals.length + 1),
          user_id: '1',
          ...config.data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        return {
          data: newGoal,
          status: 201,
          statusText: 'Created',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock fetch alerts
      if (url.includes('/health-alerts') && method === 'GET') {
        return {
          data: mockData.mockAlerts,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock fetch services
      if (url.includes('/health-services') && method === 'GET') {
        return {
          data: mockData.mockServices,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      // Mock logout
      if (url.includes('/auth/logout') && method === 'POST') {
        return {
          data: { message: 'Logged out successfully' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        } as AxiosResponse;
      }

      return Promise.reject(error);
    }
  );
}

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Handle token refresh on 401 (skip if using mock data)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (USE_MOCK_DATA) return Promise.reject(error);

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
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
