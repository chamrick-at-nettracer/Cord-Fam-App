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

  fastify.post(
    '/register',
    {
      schema: {
        description: 'Register a new user account',
        tags: ['auth'],
        body: {
          type: 'object',
          required: ['email', 'username', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            username: { type: 'string', minLength: 3, maxLength: 50 },
            password: { type: 'string', minLength: 6 },
            first_name: { type: 'string', maxLength: 100 },
            last_name: { type: 'string', maxLength: 100 },
          },
        },
        response: {
          201: {
            description: 'User registered successfully',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      email: { type: 'string' },
                      username: { type: 'string' },
                      first_name: { type: 'string' },
                      last_name: { type: 'string' },
                    },
                  },
                  token: { type: 'string' },
                },
              },
            },
          },
          '4xx': {
            description: 'Validation error or registration failed',
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
    async (request, reply) => {
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
    }
  );

  fastify.post(
    '/login',
    {
      schema: {
        description: 'Login with email and password',
        tags: ['auth'],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Login successful',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      email: { type: 'string' },
                      username: { type: 'string' },
                    },
                  },
                  token: { type: 'string' },
                },
              },
            },
          },
          '4xx': {
            description: 'Invalid credentials or validation error',
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
    async (request, reply) => {
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
    }
  );

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
    {
      preHandler: authenticate,
      schema: {
        description: 'Update user profile (username, name, preferred color)',
        tags: ['auth'],
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            username: { type: 'string', minLength: 3, maxLength: 50 },
            first_name: { type: 'string', maxLength: 100 },
            last_name: { type: 'string', maxLength: 100 },
            preferred_color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
          },
        },
        response: {
          200: {
            description: 'Profile updated successfully',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      email: { type: 'string' },
                      username: { type: 'string' },
                      first_name: { type: 'string' },
                      last_name: { type: 'string' },
                      preferred_color: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          '4xx': {
            description: 'Validation error or update failed',
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
