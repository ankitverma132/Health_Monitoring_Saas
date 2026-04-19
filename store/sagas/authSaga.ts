import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '@/store/actions/authActions';
import * as types from '@/store/constants/actionTypes';
import { authAPI } from '@/services/authAPI';
import { AuthResponse, LoginPayload, RegisterPayload, GitHubAuthPayload } from '@/store/types/auth';

function* loginSaga(action: any): any {
  try {
    const response: AuthResponse = yield call(authAPI.login, action.payload);
    yield put(actions.loginSuccess(response));
    
    // Persist tokens
    localStorage.setItem('authToken', response.auth_token);
    localStorage.setItem('refreshToken', response.refresh_token);
  } catch (error: any) {
    yield put(actions.loginFailure(error.response?.data?.message || 'Login failed'));
  }
}

function* registerSaga(action: any): any {
  try {
    const response: AuthResponse = yield call(authAPI.register, action.payload);
    yield put(actions.registerSuccess(response));
    
    // Persist tokens
    localStorage.setItem('authToken', response.auth_token);
    localStorage.setItem('refreshToken', response.refresh_token);
  } catch (error: any) {
    yield put(actions.registerFailure(error.response?.data?.message || 'Registration failed'));
  }
}

function* githubAuthSaga(action: any): any {
  try {
    const response: AuthResponse = yield call(authAPI.githubAuth, action.payload);
    yield put(actions.githubAuthSuccess(response));
    
    // Persist tokens
    localStorage.setItem('authToken', response.auth_token);
    localStorage.setItem('refreshToken', response.refresh_token);
  } catch (error: any) {
    yield put(actions.githubAuthFailure(error.response?.data?.message || 'GitHub auth failed'));
  }
}

function* logoutSaga(): any {
  try {
    yield call(authAPI.logout);
    yield put(actions.logoutSuccess());
    
    // Clear tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  } catch (error: any) {
    yield put(actions.logoutFailure(error.response?.data?.message || 'Logout failed'));
  }
}

function* updateProfileSaga(action: any): any {
  try {
    const response = yield call(authAPI.updateProfile, action.payload);
    yield put(actions.updateProfileSuccess(response));
  } catch (error: any) {
    yield put(actions.updateProfileFailure(error.response?.data?.message || 'Profile update failed'));
  }
}

export function* authSaga(): any {
  yield takeEvery(types.AUTH_LOGIN_REQUEST, loginSaga);
  yield takeEvery(types.AUTH_REGISTER_REQUEST, registerSaga);
  yield takeEvery(types.AUTH_GITHUB_REQUEST, githubAuthSaga);
  yield takeEvery(types.AUTH_LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(types.AUTH_UPDATE_PROFILE_REQUEST, updateProfileSaga);
}
