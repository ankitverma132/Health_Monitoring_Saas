import apiClient from '@/services/apiClient';
import { LoginPayload, RegisterPayload, AuthResponse, GitHubAuthPayload } from '@/store/types/auth';

export const authAPI = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },

  githubAuth: async (payload: GitHubAuthPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.get(`/auth/github/callback`, { params: payload });
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string): Promise<{ auth_token: string; refresh_token: string }> => {
    const { data } = await apiClient.post('/auth/refresh-token', { refresh_token: refreshToken });
    return data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (resetToken: string, newPassword: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { reset_token: resetToken, new_password: newPassword });
  },

  getProfile: async () => {
    const { data } = await apiClient.get('/users/profile');
    return data;
  },

  updateProfile: async (payload: any) => {
    const { data } = await apiClient.put('/users/profile', payload);
    return data;
  },
};
