import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { mysqlConnection } from '../database/mysql';
import { Channel, CreateChannelInput } from '../types/channel';

export class ChannelRepository {
  async findAll(): Promise<Channel[]> {
    const pool = mysqlConnection.getPool();
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM channels ORDER BY created_at DESC'
    );
    return rows as Channel[];
  }

  async findById(id: number): Promise<Channel | null> {
    const pool = mysqlConnection.getPool();
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM channels WHERE id = ?', [id]);
    return rows.length > 0 ? (rows[0] as Channel) : null;
  }

  async create(input: CreateChannelInput & { created_by: number }): Promise<Channel> {
    const pool = mysqlConnection.getPool();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO channels (name, description, created_by, is_private)
       VALUES (?, ?, ?, ?)`,
      [input.name, input.description || null, input.created_by, input.is_private || false]
    );

    const channel = await this.findById(result.insertId);
    if (!channel) {
      throw new Error('Failed to create channel');
    }

    // Add creator as member
    await pool.execute('INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)', [
      result.insertId,
      input.created_by,
    ]);

    return channel;
  }

  async isMember(channelId: number, userId: number): Promise<boolean> {
    const pool = mysqlConnection.getPool();
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?',
      [channelId, userId]
    );
    return rows.length > 0;
  }

  async addMember(channelId: number, userId: number): Promise<void> {
    const pool = mysqlConnection.getPool();
    await pool.execute('INSERT IGNORE INTO channel_members (channel_id, user_id) VALUES (?, ?)', [
      channelId,
      userId,
    ]);
  }
}
