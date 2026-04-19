import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '@/store/actions/healthMetricsActions';
import * as types from '@/store/constants/actionTypes';
import { healthMetricsAPI } from '@/services/healthMetricsAPI';

function* fetchMetricsSaga(action: any): any {
  try {
    const metrics = yield call(healthMetricsAPI.fetchMetrics, action.payload?.startDate, action.payload?.endDate);
    yield put(actions.fetchMetricsSuccess(metrics));
  } catch (error: any) {
    yield put(actions.fetchMetricsFailure(error.response?.data?.message || 'Failed to fetch metrics'));
  }
}

function* fetchGoalsSaga(): any {
  try {
    const goals = yield call(healthMetricsAPI.fetchGoals);
    yield put(actions.fetchGoalsSuccess(goals));
  } catch (error: any) {
    yield put(actions.fetchGoalsFailure(error.response?.data?.message || 'Failed to fetch goals'));
  }
}

function* createGoalSaga(action: any): any {
  try {
    const goal = yield call(healthMetricsAPI.createGoal, action.payload);
    yield put(actions.createGoalSuccess(goal));
  } catch (error: any) {
    yield put(actions.createGoalFailure(error.response?.data?.message || 'Failed to create goal'));
  }
}

function* fetchAlertsSaga(): any {
  try {
    const alerts = yield call(healthMetricsAPI.fetchAlerts);
    yield put(actions.fetchAlertsSuccess(alerts));
  } catch (error: any) {
    yield put(actions.fetchAlertsFailure(error.response?.data?.message || 'Failed to fetch alerts'));
  }
}

function* createAlertSaga(action: any): any {
  try {
    const alert = yield call(healthMetricsAPI.createAlert, action.payload);
    yield put(actions.createAlertSuccess(alert));
  } catch (error: any) {
    yield put(actions.createAlertFailure(error.response?.data?.message || 'Failed to create alert'));
  }
}

function* fetchServicesSaga(): any {
  try {
    const services = yield call(healthMetricsAPI.fetchServices);
    yield put(actions.fetchServicesSuccess(services));
  } catch (error: any) {
    yield put(actions.fetchServicesFailure(error.response?.data?.message || 'Failed to fetch services'));
  }
}

export function* healthMetricsSaga(): any {
  yield takeEvery(types.HEALTH_FETCH_METRICS_REQUEST, fetchMetricsSaga);
  yield takeEvery(types.HEALTH_FETCH_GOALS_REQUEST, fetchGoalsSaga);
  yield takeEvery(types.HEALTH_CREATE_GOAL_REQUEST, createGoalSaga);
  yield takeEvery(types.HEALTH_FETCH_ALERTS_REQUEST, fetchAlertsSaga);
  yield takeEvery(types.HEALTH_CREATE_ALERT_REQUEST, createAlertSaga);
  yield takeEvery(types.HEALTH_FETCH_SERVICES_REQUEST, fetchServicesSaga);
}
