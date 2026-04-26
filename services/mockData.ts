// Mock user data
export const mockUser = {
  user_id: '1',
  email: 'demo@example.com',
  first_name: 'John',
  last_name: 'Doe',
  date_of_birth: '1990-05-15',
  gender: 'M',
  height_cm: 180,
  current_weight_kg: 75,
  auth_provider: 'email',
};

// Mock auth response
export const mockAuthResponse = {
  user_id: '1',
  auth_token: 'mock_auth_token_12345',
  refresh_token: 'mock_refresh_token_12345',
  user_info: mockUser,
};

// Mock health metrics
export const mockMetrics = [
  {
    metric_id: '1',
    user_id: '1',
    service_id: '1',
    metric_type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    created_at: new Date().toISOString(),
    metadata: { source: 'Fitbit' },
  },
  {
    metric_id: '2',
    user_id: '1',
    service_id: '1',
    metric_type: 'steps',
    value: 8245,
    unit: 'steps',
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    created_at: new Date().toISOString(),
    metadata: { source: 'Fitbit' },
  },
  {
    metric_id: '3',
    user_id: '1',
    service_id: '2',
    metric_type: 'sleep_duration',
    value: 7.5,
    unit: 'hours',
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    created_at: new Date().toISOString(),
    metadata: { source: 'Apple Health', quality: 'good' },
  },
  {
    metric_id: '4',
    user_id: '1',
    service_id: '1',
    metric_type: 'weight',
    value: 75,
    unit: 'kg',
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: new Date().toISOString(),
    metadata: { source: 'Manual Entry' },
  },
  {
    metric_id: '5',
    user_id: '1',
    service_id: '1',
    metric_type: 'blood_pressure',
    value: 120,
    unit: 'mmHg',
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: new Date().toISOString(),
    metadata: { source: 'Manual Entry', systolic: 120, diastolic: 80 },
  },
];

// Mock health goals
export const mockGoals = [
  {
    goal_id: '1',
    user_id: '1',
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
    goal_id: '2',
    user_id: '1',
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
    goal_id: '3',
    user_id: '1',
    goal_name: 'Maintain healthy heart rate',
    metric_type: 'heart_rate',
    target_value: 60,
    unit: 'bpm',
    target_unit_period: 'daily',
    start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    end_date: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock health alerts
export const mockAlerts = [
  {
    alert_id: '1',
    user_id: '1',
    goal_id: '1',
    alert_type: 'low_steps',
    message: 'You have not reached your daily step goal',
    is_triggered: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    alert_id: '2',
    user_id: '1',
    goal_id: '2',
    alert_type: 'insufficient_sleep',
    message: 'You got less than 7 hours of sleep last night',
    is_triggered: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock health services
export const mockServices = [
  {
    service_id: '1',
    user_id: '1',
    service_type: 'Fitbit',
    display_name: 'Fitbit Charge 5',
    is_connected: true,
    access_token: 'mock_fitbit_token',
    refresh_token: 'mock_fitbit_refresh',
    last_sync_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    sync_frequency: 'hourly',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    service_id: '2',
    user_id: '1',
    service_type: 'AppleHealth',
    display_name: 'Apple Health',
    is_connected: true,
    access_token: 'mock_apple_token',
    refresh_token: null,
    last_sync_time: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    sync_frequency: 'real-time',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    updated_at: new Date().toISOString(),
  },
];
