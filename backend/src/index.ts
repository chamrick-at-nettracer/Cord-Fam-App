import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { config } from './config';
import { logger } from './utils/logger';
import { mysqlConnection } from './database/mysql';
import { mongoConnection } from './database/mongodb';
import { authRoutes } from './routes/auth';
import { channelRoutes } from './routes/channels';
import { messageRoutes } from './routes/messages';

const server = Fastify({
  logger: logger,
});

async function start() {
  try {
    // Register plugins
    await server.register(cors, {
      origin: true,
      credentials: true,
    });

    await server.register(helmet);

    await server.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute',
    });

    // Connect to databases
    await mysqlConnection.connect();
    logger.info('MySQL connected');

    await mongoConnection.connect();
    logger.info('MongoDB connected');

    // Register routes
    await server.register(authRoutes, { prefix: '/api/v1/auth' });
    await server.register(channelRoutes, { prefix: '/api/v1/channels' });
    await server.register(messageRoutes, { prefix: '/api/v1/channels' });

    // Health check
    server.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // Start server
    const address = await server.listen({ port: config.port, host: '0.0.0.0' });
    logger.info(`Server listening on ${address}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

start();
