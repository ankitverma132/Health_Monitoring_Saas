import { User, AuthResponse } from '@/store/types/auth';
import { HealthMetric, HealthGoal, HealthAlert, HealthService } from '@/store/types/healthMetrics';

// Single user profile for all users
const defaultUser = {
  name: 'John Doe',
  email: 'user@example.com',
  age: 34,
  height: 180,
  weight: 75,
};

// Factory function to generate user data
export function generateMockUser(userId: string = '1'): User {
  return {
    user_id: userId,
    email: defaultUser.email,
    first_name: defaultUser.name.split(' ')[0],
    last_name: defaultUser.name.split(' ')[1],
    date_of_birth: `${new Date().getFullYear() - defaultUser.age}-05-15`,
    gender: 'M',
    height_cm: defaultUser.height,
    current_weight_kg: defaultUser.weight,
    auth_provider: 'email',
  };
}

// Factory function to generate auth response
export function generateMockAuthResponse(userId: string = '1'): AuthResponse {
  const user = generateMockUser(userId);

  return {
    user_id: userId,
    auth_token: `mock_auth_token_${userId}_${Date.now()}`,
    refresh_token: `mock_refresh_token_${userId}_${Date.now()}`,
    user_info: user,
  };
}

// Factory function to generate health metrics for a user
export function generateMockMetrics(userId: string = '1'): HealthMetric[] {
  return [
    {
      metric_id: `${userId}_1`,
      user_id: userId,
      service_id: `${userId}_1`,
      metric_type: 'heart_rate',
      value: 72 + Math.random() * 20,
      unit: 'bpm',
      recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      created_at: new Date().toISOString(),
      metadata: { source: 'Fitbit' },
    },
    {
      metric_id: `${userId}_2`,
      user_id: userId,
      service_id: `${userId}_1`,
      metric_type: 'steps',
      value: 8245 + Math.random() * 2000,
      unit: 'steps',
      recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
      created_at: new Date().toISOString(),
      metadata: { source: 'Fitbit' },
    },
    {
      metric_id: `${userId}_3`,
      user_id: userId,
      service_id: `${userId}_2`,
      metric_type: 'sleep_duration',
      value: 7.5 + Math.random() * 1.5,
      unit: 'hours',
      recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      created_at: new Date().toISOString(),
      metadata: { source: 'Apple Health', quality: 'good' },
    },
    {
      metric_id: `${userId}_4`,
      user_id: userId,
      service_id: `${userId}_1`,
      metric_type: 'weight',
      value: defaultUser.weight,
      unit: 'kg',
      recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      created_at: new Date().toISOString(),
      metadata: { source: 'Manual Entry' },
    },
    {
      metric_id: `${userId}_5`,
      user_id: userId,
      service_id: `${userId}_1`,
      metric_type: 'blood_pressure',
      value: 120,
      unit: 'mmHg',
      recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      created_at: new Date().toISOString(),
      metadata: {
        source: 'Manual Entry',
        systolic: 120,
        diastolic: 80,
      },
    },
  ];
}

// Factory function to generate health goals
export function generateMockGoals(userId: string = '1'): HealthGoal[] {
  return [
    {
      goal_id: `${userId}_1`,
      user_id: userId,
      goal_name: 'Walk 10,000 steps daily',
      metric_type: 'steps',
      target_value: 10000,
      unit: 'steps',
      target_unit_period: 'daily',
      start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
      end_date: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      goal_id: `${userId}_2`,
      user_id: userId,
      goal_name: 'Sleep 8 hours per night',
      metric_type: 'sleep_duration',
      target_value: 8,
      unit: 'hours',
      target_unit_period: 'daily',
      start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
      end_date: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      goal_id: `${userId}_3`,
      user_id: userId,
      goal_name: 'Maintain healthy heart rate',
      metric_type: 'heart_rate',
      target_value: 70,
      unit: 'bpm',
      target_unit_period: 'daily',
      start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
      end_date: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

// Factory function to generate health alerts
export function generateMockAlerts(userId: string = '1'): HealthAlert[] {
  return [
    {
      alert_id: `${userId}_1`,
      user_id: userId,
      goal_id: `${userId}_1`,
      alert_type: 'low_steps',
      message: 'You have not reached your daily step goal',
      is_triggered: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      alert_name: '',
      metric_type: '',
      condition: 'greater_than',
      threshold_value: 0,
      is_active: false,
      notification_type: 'email'
    },
    {
      alert_id: `${userId}_2`,
      user_id: userId,
      goal_id: `${userId}_2`,
      alert_type: 'insufficient_sleep',
      message: 'You got less than 7 hours of sleep last night',
      is_triggered: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      alert_name: '',
      metric_type: '',
      condition: 'greater_than',
      threshold_value: 0,
      is_active: false,
      notification_type: 'email'
    },
  ];
}

// Factory function to generate health services
export function generateMockServices(userId: string = '1'): HealthService[] {
  return [
    {
      service_id: `${userId}_1`,
      user_id: userId,
      service_type: 'Fitbit',
      display_name: 'Fitbit Charge 5',
      is_connected: true,
      access_token: `mock_fitbit_token_${userId}`,
      refresh_token: `mock_fitbit_refresh_${userId}`,
      last_sync_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      sync_frequency: 'hourly',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      service_id: `${userId}_2`,
      user_id: userId,
      service_type: 'AppleHealth',
      display_name: 'Apple Health',
      is_connected: true,
      access_token: `mock_apple_token_${userId}`,
      refresh_token: null,
      last_sync_time: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      sync_frequency: 'real-time',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
      updated_at: new Date().toISOString()
    },
  ];
}

// Export all factory functions as an object for easier access
export const mockDataFactory = {
  generateMockUser,
  generateMockAuthResponse,
  generateMockMetrics,
  generateMockGoals,
  generateMockAlerts,
  generateMockServices,
};
