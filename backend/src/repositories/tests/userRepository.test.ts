import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserRepository } from '../userRepository';

// Mock the database connection module
jest.mock('../../database/mysql', () => ({
  mysqlConnection: {
    getPool: jest.fn(),
  },
}));

import { mysqlConnection } from '../../database/mysql';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockExecute: any;

  beforeEach(() => {
    repository = new UserRepository();
    // Use any to bypass strict typing - acceptable in tests
    mockExecute = jest.fn();
    (mysqlConnection.getPool as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password_hash: 'hashed',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockExecute.mockResolvedValue([[mockUser], []]);

      const result = await repository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM users WHERE email = ?', [
        'test@example.com',
      ]);
    });

    it('should return null if user not found', async () => {
      mockExecute.mockResolvedValue([[], []]);

      const result = await repository.findByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password_hash: 'hashed',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockExecute.mockResolvedValue([[mockUser], []]);

      const result = await repository.findById(1);

      expect(result).toEqual(mockUser);
      expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', [1]);
    });

    it('should return null if user not found by id', async () => {
      mockExecute.mockResolvedValue([[], []]);

      const result = await repository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password_hash: 'hashed',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockExecute.mockResolvedValue([[mockUser], []]);

      const result = await repository.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?', [
        'testuser',
      ]);
    });
  });
});
