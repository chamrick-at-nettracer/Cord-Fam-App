import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/api';
import { authService } from '../services/authService';
import type { RegisterInput, LoginInput } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: {
    username?: string;
    first_name?: string;
    last_name?: string;
    preferred_color?: string | null;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (input: LoginInput) => {
    const result = await authService.login(input);
    setUser(result.user);
    navigate('/');
  };

  const register = async (input: RegisterInput) => {
    const result = await authService.register(input);
    setUser(result.user);
    navigate('/');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const updateProfile = async (updates: {
    username?: string;
    first_name?: string;
    last_name?: string;
    preferred_color?: string | null;
  }) => {
    const updatedUser = await authService.updateProfile(updates);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
