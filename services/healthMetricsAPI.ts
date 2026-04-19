import apiClient from '@/services/apiClient';
import { HealthMetric, HealthGoal, HealthAlert, HealthService } from '@/store/types/healthMetrics';

export const healthMetricsAPI = {
  // Metrics
  fetchMetrics: async (startDate?: string, endDate?: string): Promise<HealthMetric[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const { data } = await apiClient.get(`/health-metrics?${params.toString()}`);
    return data;
  },

  // Goals
  fetchGoals: async (): Promise<HealthGoal[]> => {
    const { data } = await apiClient.get('/health-goals');
    return data;
  },

  createGoal: async (payload: Omit<HealthGoal, 'goal_id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<HealthGoal> => {
    const { data } = await apiClient.post('/health-goals', payload);
    return data;
  },

  updateGoal: async (goalId: string, payload: Partial<HealthGoal>): Promise<HealthGoal> => {
    const { data } = await apiClient.put(`/health-goals/${goalId}`, payload);
    return data;
  },

  deleteGoal: async (goalId: string): Promise<void> => {
    await apiClient.delete(`/health-goals/${goalId}`);
  },

  // Alerts
  fetchAlerts: async (): Promise<HealthAlert[]> => {
    const { data } = await apiClient.get('/health-alerts');
    return data;
  },

  createAlert: async (payload: Omit<HealthAlert, 'alert_id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<HealthAlert> => {
    const { data } = await apiClient.post('/health-alerts', payload);
    return data;
  },

  updateAlert: async (alertId: string, payload: Partial<HealthAlert>): Promise<HealthAlert> => {
    const { data } = await apiClient.put(`/health-alerts/${alertId}`, payload);
    return data;
  },

  deleteAlert: async (alertId: string): Promise<void> => {
    await apiClient.delete(`/health-alerts/${alertId}`);
  },

  // Health Services
  fetchServices: async (): Promise<HealthService[]> => {
    const { data } = await apiClient.get('/health-services');
    return data;
  },

  connectService: async (serviceType: string, accessToken: string): Promise<HealthService> => {
    const { data } = await apiClient.post('/health-services', { service_type: serviceType, access_token: accessToken });
    return data;
  },

  disconnectService: async (serviceId: string): Promise<void> => {
    await apiClient.delete(`/health-services/${serviceId}`);
  },
};
