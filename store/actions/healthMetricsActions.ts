import * as types from '@/store/constants/actionTypes';
import { HealthMetric, HealthGoal, HealthAlert, HealthService } from '@/store/types/healthMetrics';

// Fetch Metrics Actions
export const fetchMetricsRequest = (payload?: { startDate?: string; endDate?: string }) => ({
  type: types.HEALTH_FETCH_METRICS_REQUEST,
  payload,
});

export const fetchMetricsSuccess = (payload: HealthMetric[]) => ({
  type: types.HEALTH_FETCH_METRICS_SUCCESS,
  payload,
});

export const fetchMetricsFailure = (error: string) => ({
  type: types.HEALTH_FETCH_METRICS_FAILURE,
  payload: error,
});

// Fetch Goals Actions
export const fetchGoalsRequest = () => ({
  type: types.HEALTH_FETCH_GOALS_REQUEST,
});

export const fetchGoalsSuccess = (payload: HealthGoal[]) => ({
  type: types.HEALTH_FETCH_GOALS_SUCCESS,
  payload,
});

export const fetchGoalsFailure = (error: string) => ({
  type: types.HEALTH_FETCH_GOALS_FAILURE,
  payload: error,
});

// Create Goal Actions
export const createGoalRequest = (payload: Omit<HealthGoal, 'goal_id' | 'user_id' | 'created_at' | 'updated_at'>) => ({
  type: types.HEALTH_CREATE_GOAL_REQUEST,
  payload,
});

export const createGoalSuccess = (payload: HealthGoal) => ({
  type: types.HEALTH_CREATE_GOAL_SUCCESS,
  payload,
});

export const createGoalFailure = (error: string) => ({
  type: types.HEALTH_CREATE_GOAL_FAILURE,
  payload: error,
});

// Fetch Alerts Actions
export const fetchAlertsRequest = () => ({
  type: types.HEALTH_FETCH_ALERTS_REQUEST,
});

export const fetchAlertsSuccess = (payload: HealthAlert[]) => ({
  type: types.HEALTH_FETCH_ALERTS_SUCCESS,
  payload,
});

export const fetchAlertsFailure = (error: string) => ({
  type: types.HEALTH_FETCH_ALERTS_FAILURE,
  payload: error,
});

// Create Alert Actions
export const createAlertRequest = (payload: Omit<HealthAlert, 'alert_id' | 'user_id' | 'created_at' | 'updated_at'>) => ({
  type: types.HEALTH_CREATE_ALERT_REQUEST,
  payload,
});

export const createAlertSuccess = (payload: HealthAlert) => ({
  type: types.HEALTH_CREATE_ALERT_SUCCESS,
  payload,
});

export const createAlertFailure = (error: string) => ({
  type: types.HEALTH_CREATE_ALERT_FAILURE,
  payload: error,
});

// Fetch Services Actions
export const fetchServicesRequest = () => ({
  type: types.HEALTH_FETCH_SERVICES_REQUEST,
});

export const fetchServicesSuccess = (payload: HealthService[]) => ({
  type: types.HEALTH_FETCH_SERVICES_SUCCESS,
  payload,
});

export const fetchServicesFailure = (error: string) => ({
  type: types.HEALTH_FETCH_SERVICES_FAILURE,
  payload: error,
});

// Utility Actions
export const clearHealthError = () => ({
  type: types.HEALTH_CLEAR_ERROR,
});
