import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { config } from './config';
import { logger } from './utils/logger';
import { mysqlConnection } from './database/mysql';
import { mongoConnection } from './database/mongodb';
import { authRoutes } from './routes/auth';
import { channelRoutes } from './routes/channels';
import { messageRoutes } from './routes/messages';

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          }
        : undefined,
  },
});

async function start() {
  try {
    // Register Swagger
    await server.register(swagger, {
      openapi: {
        info: {
          title: 'Cord-Fam-App API',
          description: 'Family collaboration platform API - Communication, Tasks, and Notes',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development server',
          },
        ],
        tags: [
          { name: 'auth', description: 'Authentication endpoints' },
          { name: 'channels', description: 'Channel management endpoints' },
          { name: 'messages', description: 'Message endpoints' },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
    });

    await server.register(swaggerUi, {
      routePrefix: '/api-docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
    });

    // Register plugins
    await server.register(cors, {
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
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
