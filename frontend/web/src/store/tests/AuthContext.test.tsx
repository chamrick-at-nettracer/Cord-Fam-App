import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext';
import { authService } from '../../services/authService';

vi.mock('../../services/authService');

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

  it('should show loading state initially', () => {
    (authService.getCurrentUser as any) = vi.fn().mockReturnValue(null);

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
