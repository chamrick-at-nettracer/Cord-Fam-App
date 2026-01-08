import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { ChannelService } from '../services/channelService';

const createChannelSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  is_private: z.boolean().optional(),
});

export async function channelRoutes(fastify: FastifyInstance) {
  const channelService = new ChannelService();

  fastify.get(
    '/',
    {
      preHandler: authenticate,
      schema: {
        description: 'Get all channels',
        tags: ['channels'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of channels',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    created_by: { type: 'number' },
                    is_private: { type: 'boolean' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (_request: AuthenticatedRequest, reply) => {
      try {
        const channels = await channelService.getAllChannels();
        reply.code(200).send({
          success: true,
          data: channels,
        });
      } catch (error) {
        reply.code(500).send({
          success: false,
          error: {
            code: 'FETCH_FAILED',
            message: error instanceof Error ? error.message : 'Failed to fetch channels',
          },
        });
      }
    }
  );

  fastify.get(
    '/:id',
    {
      preHandler: authenticate,
      schema: {
        description: 'Get channel by ID',
        tags: ['channels'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Channel details',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
          404: {
            description: 'Channel not found',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  code: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    async (request: AuthenticatedRequest, reply) => {
      try {
        const id = parseInt((request.params as { id: string }).id, 10);
        const channel = await channelService.getChannelById(id);
        reply.code(200).send({
          success: true,
          data: channel,
        });
      } catch (error) {
        reply.code(404).send({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: error instanceof Error ? error.message : 'Channel not found',
          },
        });
      }
    }
  );

  fastify.post(
    '/',
    {
      preHandler: authenticate,
      schema: {
        description: 'Create a new channel',
        tags: ['channels'],
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            description: { type: 'string' },
            is_private: { type: 'boolean' },
          },
        },
        response: {
          201: {
            description: 'Channel created successfully',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  code: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    async (request: AuthenticatedRequest, reply) => {
      try {
        const body = createChannelSchema.parse(request.body);
        const userId = request.userId!;
        const channel = await channelService.createChannel(body, userId);
        reply.code(201).send({
          success: true,
          data: channel,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          reply.code(400).send({
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid input',
              details: error.issues,
            },
          });
          return;
        }
        reply.code(400).send({
          success: false,
          error: {
            code: 'CREATE_FAILED',
            message: error instanceof Error ? error.message : 'Failed to create channel',
          },
        });
      }
    }
  );
}
