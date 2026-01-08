import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { mysqlConnection } from '../database/mysql';
import { User, CreateUserInput } from '../types/user';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const pool = mysqlConnection.getPool();
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const pool = mysqlConnection.getPool();
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [
      username,
    ]);
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  async findById(id: number): Promise<User | null> {
    const pool = mysqlConnection.getPool();
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  async create(input: CreateUserInput & { password_hash: string }): Promise<User> {
    const pool = mysqlConnection.getPool();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (email, username, password_hash, first_name, last_name)
       VALUES (?, ?, ?, ?, ?)`,
      [
        input.email,
        input.username,
        input.password_hash,
        input.first_name || null,
        input.last_name || null,
      ]
    );

    const user = await this.findById(result.insertId);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async update(
    id: number,
    updates: {
      username?: string;
      first_name?: string;
      last_name?: string;
      preferred_color?: string;
    }
  ): Promise<User> {
    const pool = mysqlConnection.getPool();
    const fields: string[] = [];
    const values: unknown[] = [];

    if (updates.username !== undefined) {
      fields.push('username = ?');
      values.push(updates.username);
    }
    if (updates.first_name !== undefined) {
      fields.push('first_name = ?');
      values.push(updates.first_name || null);
    }
    if (updates.last_name !== undefined) {
      fields.push('last_name = ?');
      values.push(updates.last_name || null);
    }
    if (updates.preferred_color !== undefined) {
      fields.push('preferred_color = ?');
      values.push(updates.preferred_color || null);
    }

    if (fields.length === 0) {
      const user = await this.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }

    values.push(id);
    await pool.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);

    const user = await this.findById(id);
    if (!user) {
      throw new Error('Failed to update user');
    }
    return user;
  }
}
