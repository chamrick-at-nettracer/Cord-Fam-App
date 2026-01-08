import api from './api';
import type { ApiResponse, AuthResponse, User } from '../types/api';

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', input);
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Registration failed');
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', input);
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Login failed');
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  async updateProfile(updates: {
    username?: string;
    first_name?: string;
    last_name?: string;
    preferred_color?: string | null;
  }): Promise<User> {
    const response = await api.put<ApiResponse<{ user: User }>>('/auth/profile', updates);
    if (response.data.success && response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    throw new Error(response.data.error?.message || 'Failed to update profile');
  },
};
