export interface AuthState {
  user: User | null;
  authToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface User {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  height_cm?: number;
  current_weight_kg?: number;
  auth_provider: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
}

export interface AuthResponse {
  user_id: string;
  auth_token: string;
  refresh_token: string;
  user_info: User;
}

export interface GitHubAuthPayload {
  code: string;
  state: string;
}
