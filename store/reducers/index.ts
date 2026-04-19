import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { healthMetricsReducer } from './healthMetricsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  healthMetrics: healthMetricsReducer,
});
