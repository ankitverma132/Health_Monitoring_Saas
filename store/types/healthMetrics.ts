export interface HealthMetric {
  metric_id: string;
  user_id: string;
  service_id: string;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface HealthGoal {
  goal_id: string;
  user_id: string;
  goal_name: string;
  metric_type: string;
  target_value: number;
  unit: string;
  target_unit_period: 'daily' | 'weekly' | 'monthly';
  start_date: string;
  end_date?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HealthAlert {
  alert_id: string;
  user_id: string;
  alert_name: string;
  metric_type: string;
  condition: 'greater_than' | 'less_than' | 'equals';
  threshold_value: number;
  is_active: boolean;
  notification_type: 'email' | 'webhook' | 'in_app';
  created_at: string;
  updated_at: string;
  goal_id: string;
  alert_type: string;
  message: string;
  is_triggered: boolean;
}

export interface HealthService {
  service_id: string;
  user_id: string;
  service_type: string;
  display_name: string;
  is_connected: boolean;
  last_sync_time?: string;
  sync_frequency: 'real-time' | 'hourly' | 'daily';
  created_at: string;
  updated_at: string;
  access_token?: string;
  refresh_token?: string | null;
}

export interface HealthMetricsState {
  metrics: HealthMetric[];
  goals: HealthGoal[];
  alerts: HealthAlert[];
  services: HealthService[];
  loading: boolean;
  error: string | null;
}
