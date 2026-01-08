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
    { preHandler: authenticate },
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
    { preHandler: authenticate },
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
