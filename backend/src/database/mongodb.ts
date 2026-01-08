import { MongoClient, Db } from 'mongodb';
import { config } from '../config';
import { logger } from '../utils/logger';

class MongoDBConnection {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    try {
      this.client = new MongoClient(config.mongodb.uri);
      await this.client.connect();
      this.db = this.client.db();
      logger.info('MongoDB connected');
    } catch (error) {
      logger.error('MongoDB connection failed:', error);
      throw error;
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('MongoDB not initialized. Call connect() first.');
    }
    return this.db;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      logger.info('MongoDB disconnected');
    }
  }
}

export const mongoConnection = new MongoDBConnection();
