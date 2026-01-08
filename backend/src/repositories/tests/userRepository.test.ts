import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserRepository } from '../userRepository';
import { mysqlConnection } from '../../database/mysql';

// Mock the database connection
jest.mock('../../database/mysql');

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
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

      const mockPool = {
        execute: jest.fn().mockResolvedValue([[mockUser]]),
      };

      (mysqlConnection.getPool as jest.Mock) = jest.fn().mockReturnValue(mockPool);

      const result = await repository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockPool.execute).toHaveBeenCalledWith('SELECT * FROM users WHERE email = ?', [
        'test@example.com',
      ]);
    });

    it('should return null if user not found', async () => {
      const mockPool = {
        execute: jest.fn().mockResolvedValue([[]]),
      };

      (mysqlConnection.getPool as jest.Mock) = jest.fn().mockReturnValue(mockPool);

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

      const mockPool = {
        execute: jest.fn().mockResolvedValue([[mockUser]]),
      };

      (mysqlConnection.getPool as jest.Mock) = jest.fn().mockReturnValue(mockPool);

      const result = await repository.findById(1);

      expect(result).toEqual(mockUser);
    });
  });
});
