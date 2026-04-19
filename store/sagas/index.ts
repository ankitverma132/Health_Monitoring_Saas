import { fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { healthMetricsSaga } from './healthMetricsSaga';

export function* rootSaga(): any {
  yield fork(authSaga);
  yield fork(healthMetricsSaga);
}
