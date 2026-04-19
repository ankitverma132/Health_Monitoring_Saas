import * as types from '@/store/constants/actionTypes';
import { LoginPayload, RegisterPayload, AuthResponse, User, GitHubAuthPayload } from '@/store/types/auth';

// Login Actions
export const loginRequest = (payload: LoginPayload) => ({
  type: types.AUTH_LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: AuthResponse) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error: string) => ({
  type: types.AUTH_LOGIN_FAILURE,
  payload: error,
});

// Register Actions
export const registerRequest = (payload: RegisterPayload) => ({
  type: types.AUTH_REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (payload: AuthResponse) => ({
  type: types.AUTH_REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (error: string) => ({
  type: types.AUTH_REGISTER_FAILURE,
  payload: error,
});

// GitHub OAuth Actions
export const githubAuthRequest = (payload: GitHubAuthPayload) => ({
  type: types.AUTH_GITHUB_REQUEST,
  payload,
});

export const githubAuthSuccess = (payload: AuthResponse) => ({
  type: types.AUTH_GITHUB_SUCCESS,
  payload,
});

export const githubAuthFailure = (error: string) => ({
  type: types.AUTH_GITHUB_FAILURE,
  payload: error,
});

// Logout Actions
export const logoutRequest = () => ({
  type: types.AUTH_LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: types.AUTH_LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string) => ({
  type: types.AUTH_LOGOUT_FAILURE,
  payload: error,
});

// Update Profile Actions
export const updateProfileRequest = (payload: Partial<User>) => ({
  type: types.AUTH_UPDATE_PROFILE_REQUEST,
  payload,
});

export const updateProfileSuccess = (payload: User) => ({
  type: types.AUTH_UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileFailure = (error: string) => ({
  type: types.AUTH_UPDATE_PROFILE_FAILURE,
  payload: error,
});

// Utility Actions
export const clearAuthError = () => ({
  type: types.AUTH_CLEAR_ERROR,
});

export const restoreSession = (payload: { user: User; authToken: string; refreshToken: string }) => ({
  type: types.AUTH_RESTORE_SESSION,
  payload,
});
