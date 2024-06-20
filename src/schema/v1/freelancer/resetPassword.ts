/**
 * File: resetPassword.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 30-04-2024
 * Description:schema for API for Reset Password
 */

import { FastifySchema } from 'fastify';

export const resetPasswordSchema: FastifySchema = {
  description: 'API for Reset Password',
  tags: ['Freelancer'],

  body: {
    type: 'object',
    properties: {
      password: { type: 'string' },
    },
    required: ['password'],
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
    404: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
    },
    403: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
