import * as types from '@/store/constants/actionTypes';
import { AuthState } from '@/store/types/auth';

const initialState: AuthState = {
  user: null,
  authToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

interface Action {
  type: string;
  payload?: any;
}

export const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    // Login
    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user_info,
        authToken: action.payload.auth_token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        error: null,
      };
    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    // Register
    case types.AUTH_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user_info,
        authToken: action.payload.auth_token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        error: null,
      };
    case types.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    // GitHub Auth
    case types.AUTH_GITHUB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.AUTH_GITHUB_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user_info,
        authToken: action.payload.auth_token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        error: null,
      };
    case types.AUTH_GITHUB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    // Logout
    case types.AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        authToken: null,
        refreshToken: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      };
    case types.AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Profile
    case types.AUTH_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.AUTH_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case types.AUTH_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Error
    case types.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // Restore Session
    case types.AUTH_RESTORE_SESSION:
      return {
        ...state,
        user: action.payload.user,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
