import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock the authService
vi.mock('../../services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    updateProfile: vi.fn(),
  },
}));

import { authService } from '../../services/authService';

const TestComponent = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return <div>{user ? `Logged in as ${user.username}` : 'Not logged in'}</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should provide user from localStorage on mount', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
    };

    (authService.getCurrentUser as any) = vi.fn().mockReturnValue(mockUser);

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Logged in as testuser')).toBeInTheDocument();
    });
  });

  it('should show loading state initially then update', async () => {
    (authService.getCurrentUser as any) = vi.fn().mockReturnValue(null);

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    // After useEffect runs, loading should be false and user should be null
    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });
  });
});
