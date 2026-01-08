import mysql from 'mysql2/promise';
import { config } from '../config';
import { logger } from '../utils/logger';

class MySQLConnection {
  private pool: mysql.Pool | null = null;

  async connect(): Promise<void> {
    this.pool = mysql.createPool({
      host: config.mysql.host,
      port: config.mysql.port,
      database: config.mysql.database,
      user: config.mysql.user,
      password: config.mysql.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      logger.info('MySQL connection pool created');
    } catch (error) {
      logger.error('MySQL connection failed:', error);
      throw error;
    }
  }

  getPool(): mysql.Pool {
    if (!this.pool) {
      throw new Error('MySQL pool not initialized. Call connect() first.');
    }
    return this.pool;
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      logger.info('MySQL connection pool closed');
    }
  }
}

export const mysqlConnection = new MySQLConnection();
