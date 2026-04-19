import * as types from '@/store/constants/actionTypes';
import { HealthMetricsState } from '@/store/types/healthMetrics';

const initialState: HealthMetricsState = {
  metrics: [],
  goals: [],
  alerts: [],
  services: [],
  loading: false,
  error: null,
};

interface Action {
  type: string;
  payload?: any;
}

export const healthMetricsReducer = (state = initialState, action: Action): HealthMetricsState => {
  switch (action.type) {
    // Fetch Metrics
    case types.HEALTH_FETCH_METRICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.HEALTH_FETCH_METRICS_SUCCESS:
      return {
        ...state,
        loading: false,
        metrics: action.payload,
        error: null,
      };
    case types.HEALTH_FETCH_METRICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch Goals
    case types.HEALTH_FETCH_GOALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.HEALTH_FETCH_GOALS_SUCCESS:
      return {
        ...state,
        loading: false,
        goals: action.payload,
        error: null,
      };
    case types.HEALTH_FETCH_GOALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Goal
    case types.HEALTH_CREATE_GOAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.HEALTH_CREATE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        goals: [...state.goals, action.payload],
        error: null,
      };
    case types.HEALTH_CREATE_GOAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch Alerts
    case types.HEALTH_FETCH_ALERTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.HEALTH_FETCH_ALERTS_SUCCESS:
      return {
        ...state,
        loading: false,
        alerts: action.payload,
        error: null,
      };
    case types.HEALTH_FETCH_ALERTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Alert
    case types.HEALTH_CREATE_ALERT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.HEALTH_CREATE_ALERT_SUCCESS:
      return {
        ...state,
        loading: false,
        alerts: [...state.alerts, action.payload],
        error: null,
      };
    case types.HEALTH_CREATE_ALERT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch Services
    case types.HEALTH_FETCH_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.HEALTH_FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload,
        error: null,
      };
    case types.HEALTH_FETCH_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Error
    case types.HEALTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
