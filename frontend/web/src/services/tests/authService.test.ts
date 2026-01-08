import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '../authService';
import type { AuthResponse, User } from '../../types/api';

// Mock the api module
vi.mock('../api', () => {
  return {
    default: {
      post: vi.fn(),
      put: vi.fn(),
    },
  };
});

import api from '../api';

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('should login successfully and store token and user', async () => {
      const mockResponse: AuthResponse = {
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
        },
        token: 'mock_token',
      };

      (api.post as any).mockResolvedValue({
        data: {
          success: true,
          data: mockResponse,
        },
      });

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('mock_token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
    });

    it('should throw error on failed login', async () => {
      (api.post as any).mockResolvedValue({
        data: {
          success: false,
          error: {
            message: 'Invalid credentials',
          },
        },
      });

      await expect(
        authService.login({ email: 'test@example.com', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should register successfully and store token and user', async () => {
      const mockResponse: AuthResponse = {
        user: {
          id: 1,
          email: 'new@example.com',
          username: 'newuser',
        },
        token: 'mock_token',
      };

      (api.post as any).mockResolvedValue({
        data: {
          success: true,
          data: mockResponse,
        },
      });

      const result = await authService.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('mock_token');
    });
  });

  describe('logout', () => {
    it('should clear token and user from localStorage', () => {
      localStorage.setItem('token', 'test_token');
      localStorage.setItem('user', JSON.stringify({ id: 1 }));

      authService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('should return user from localStorage', () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));

      const result = authService.getCurrentUser();

      expect(result).toEqual(mockUser);
    });

    it('should return null if no user in localStorage', () => {
      const result = authService.getCurrentUser();
      expect(result).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('should update profile and store updated user', async () => {
      const updatedUser: User = {
        id: 1,
        email: 'test@example.com',
        username: 'updateduser',
        first_name: 'Updated',
        preferred_color: '#1177EE',
      };

      (api.put as any).mockResolvedValue({
        data: {
          success: true,
          data: { user: updatedUser },
        },
      });

      const result = await authService.updateProfile({
        username: 'updateduser',
        first_name: 'Updated',
        preferred_color: '#1177EE',
      });

      expect(result).toEqual(updatedUser);
      expect(localStorage.getItem('user')).toBe(JSON.stringify(updatedUser));
    });
  });
});
