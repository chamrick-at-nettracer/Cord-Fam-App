import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { AuthService } from '../services/authService';

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService();

  fastify.post('/register', async (request, reply) => {
    try {
      const body = registerSchema.parse(request.body);
      const result = await authService.register(body);
      reply.code(201).send({
        success: true,
        data: result,
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
          code: 'REGISTRATION_FAILED',
          message: error instanceof Error ? error.message : 'Registration failed',
        },
      });
    }
  });

  fastify.post('/login', async (request, reply) => {
    try {
      const body = loginSchema.parse(request.body);
      const result = await authService.login(body);
      reply.code(200).send({
        success: true,
        data: result,
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
      reply.code(401).send({
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          message: error instanceof Error ? error.message : 'Login failed',
        },
      });
    }
  });

  const updateProfileSchema = z.object({
    username: z.string().min(3).max(50).optional(),
    first_name: z.string().max(100).optional(),
    last_name: z.string().max(100).optional(),
    preferred_color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .nullable(),
  });

  fastify.put(
    '/profile',
    { preHandler: authenticate },
    async (request: AuthenticatedRequest, reply) => {
      try {
        const userId = request.userId!;
        const body = updateProfileSchema.parse(request.body);
        const user = await authService.updateProfile(userId, body);
        reply.code(200).send({
          success: true,
          data: { user },
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
            code: 'UPDATE_FAILED',
            message: error instanceof Error ? error.message : 'Failed to update profile',
          },
        });
      }
    }
  );
}
