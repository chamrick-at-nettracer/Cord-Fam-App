import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { ChannelService } from '../services/channelService';
import { MessageService } from '../services/messageService';

const createMessageSchema = z.object({
  content: z.string().min(1),
});

export async function messageRoutes(fastify: FastifyInstance) {
  const channelService = new ChannelService();
  const messageService = new MessageService();

  fastify.get(
    '/:channelId/messages',
    {
      preHandler: authenticate,
      schema: {
        description: 'Get messages for a channel',
        tags: ['messages'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            channelId: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'List of messages',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    channel_id: { type: 'number' },
                    user_id: { type: 'number' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                      },
                    },
                    content: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request: AuthenticatedRequest, reply) => {
      try {
        const channelId = parseInt((request.params as { channelId: string }).channelId, 10);
        const userId = request.userId!;

        // Auto-join public channels if not already a member
        await channelService.ensureMember(channelId, userId);

        const messages = await messageService.getChannelMessages(channelId);
        reply.code(200).send({
          success: true,
          data: messages,
        });
      } catch (error) {
        reply.code(500).send({
          success: false,
          error: {
            code: 'FETCH_FAILED',
            message: error instanceof Error ? error.message : 'Failed to fetch messages',
          },
        });
      }
    }
  );

  fastify.post(
    '/:channelId/messages',
    {
      preHandler: authenticate,
      schema: {
        description: 'Send a message to a channel',
        tags: ['messages'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            channelId: { type: 'number' },
          },
        },
        body: {
          type: 'object',
          required: ['content'],
          properties: {
            content: { type: 'string', minLength: 1 },
          },
        },
        response: {
          201: {
            description: 'Message created successfully',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  channel_id: { type: 'number' },
                  user_id: { type: 'number' },
                  content: { type: 'string' },
                  created_at: { type: 'string', format: 'date-time' },
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
        const channelId = parseInt((request.params as { channelId: string }).channelId, 10);
        const userId = request.userId!;
        const body = createMessageSchema.parse(request.body);

        // Auto-join public channels if not already a member
        await channelService.ensureMember(channelId, userId);

        const message = await messageService.createMessage(body, channelId, userId);
        reply.code(201).send({
          success: true,
          data: message,
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
            message: error instanceof Error ? error.message : 'Failed to create message',
          },
        });
      }
    }
  );
}
