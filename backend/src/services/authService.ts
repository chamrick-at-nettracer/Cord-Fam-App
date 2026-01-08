import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserInput, LoginInput, UserResponse } from '../types/user';

export class AuthService {
  private userRepository = new UserRepository();

  async register(input: CreateUserInput): Promise<{ user: UserResponse; token: string }> {
    // Check if user exists
    const existingEmail = await this.userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    const existingUsername = await this.userRepository.findByUsername(input.username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Hash password
    const password_hash = await bcrypt.hash(input.password, 10);

    // Create user
    const user = await this.userRepository.create({
      ...input,
      password_hash,
    });

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: this.toUserResponse(user),
      token,
    };
  }

  async login(input: LoginInput): Promise<{ user: UserResponse; token: string }> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(input.password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user.id);

    return {
      user: this.toUserResponse(user),
      token,
    };
  }

  private generateToken(userId: number): string {
    const secret = config.jwt.secret;
    const expiresIn = config.jwt.expiresIn;
    if (typeof secret !== 'string') {
      throw new Error('JWT secret must be a string');
    }
    // Type assertion needed because config types are inferred as string | undefined
    // jwt.SignOptions.expiresIn accepts StringValue | number
    const expiresInValue = typeof expiresIn === 'string' ? expiresIn : '7d';
    return jwt.sign({ userId }, secret, {
      expiresIn: expiresInValue,
    } as jwt.SignOptions);
  }

  async updateProfile(
    userId: number,
    updates: {
      username?: string;
      first_name?: string;
      last_name?: string;
      preferred_color?: string | null;
    }
  ): Promise<UserResponse> {
    // Check username uniqueness if updating username
    if (updates.username) {
      const existing = await this.userRepository.findByUsername(updates.username);
      if (existing && existing.id !== userId) {
        throw new Error('Username already taken');
      }
    }

    const user = await this.userRepository.update(userId, updates);
    return this.toUserResponse(user);
  }

  private toUserResponse(user: {
    id: number;
    email: string;
    username: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    preferred_color?: string;
  }): UserResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar_url: user.avatar_url,
      preferred_color: user.preferred_color,
    };
  }
}
