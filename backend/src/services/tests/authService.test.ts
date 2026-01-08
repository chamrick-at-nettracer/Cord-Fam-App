import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthService } from '../authService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../../repositories/userRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../config', () => ({
  config: {
    jwt: {
      secret: 'test-secret',
      expiresIn: '7d',
    },
  },
}));

import { UserRepository } from '../../repositories/userRepository';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Create mock repository instance
    mockUserRepository = {
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as any;

    // Mock the UserRepository constructor
    (UserRepository as jest.Mock).mockImplementation(() => mockUserRepository);
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const input = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        first_name: 'Test',
        last_name: 'User',
      };

      const hashedPassword = 'hashed_password';
      const createdUser = {
        id: 1,
        email: input.email,
        username: input.username,
        password_hash: hashedPassword,
        first_name: input.first_name,
        last_name: input.last_name,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.findByUsername.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserRepository.create.mockResolvedValue(createdUser);
      (jwt.sign as jest.Mock).mockReturnValue('mock_token');

      const result = await authService.register(input);

      expect(result.user).toMatchObject({
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
      });
      expect(result.token).toBe('mock_token');
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
    });

    it('should throw error if email already exists', async () => {
      const input = {
        email: 'existing@example.com',
        username: 'testuser',
        password: 'password123',
      };

      mockUserRepository.findByEmail.mockResolvedValue({
        id: 1,
        email: input.email,
        username: 'existing',
        password_hash: 'hash',
        created_at: new Date(),
        updated_at: new Date(),
      } as any);

      await expect(authService.register(input)).rejects.toThrow('Email already registered');
    });

    it('should throw error if username already exists', async () => {
      const input = {
        email: 'new@example.com',
        username: 'existinguser',
        password: 'password123',
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.findByUsername.mockResolvedValue({
        id: 1,
        email: 'other@example.com',
        username: input.username,
        password_hash: 'hash',
        created_at: new Date(),
        updated_at: new Date(),
      } as any);

      await expect(authService.register(input)).rejects.toThrow('Username already taken');
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const input = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: 1,
        email: input.email,
        username: 'testuser',
        password_hash: 'hashed_password',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(user as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mock_token');

      const result = await authService.login(input);

      expect(result.user.email).toBe(input.email);
      expect(result.token).toBe('mock_token');
      expect(bcrypt.compare).toHaveBeenCalledWith(input.password, user.password_hash);
    });

    it('should throw error for invalid email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'wrong@example.com', password: 'password123' })
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error for invalid password', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password_hash: 'hashed_password',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(user as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login({ email: 'test@example.com', password: 'wrongpassword' })
      ).rejects.toThrow('Invalid email or password');
    });
  });
});
